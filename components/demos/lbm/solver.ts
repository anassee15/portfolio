/**
 * A small D2Q9 Lattice Boltzmann solver on the GPU (WebGL 2): flow past a cylinder.
 * The 9 populations live in three RGBA float textures, ping-ponged each step;
 * streaming, bounce-back and BGK collision happen in one fragment pass.
 * The view draws the vorticity as screentone dots, ink one way, orange the other.
 */

import { NX, NY, TAU, U_IN } from "./config";
import { renderShader, simulateShader, vertexShader } from "./shaders";

type Rgb = [number, number, number];
export type Colors = { paper: Rgb; ink: Rgb; ball: Rgb };

type State = { textures: WebGLTexture[]; framebuffer: WebGLFramebuffer };

export type Solver = {
  step(count: number): void;
  draw(colors: Colors, cell: number): void;
  /** Stirs the flow around (x, y), in lattice cells, with a velocity in cells per step. */
  stir(x: number, y: number, vx: number, vy: number): void;
  reset(): void;
  dispose(): void;
};

export function createSolver(canvas: HTMLCanvasElement): Solver | null {
  const gl = canvas.getContext("webgl2", { antialias: false, premultipliedAlpha: false });
  if (!gl) return null;
  // Float render targets: full precision if possible, half otherwise.
  const full = !!gl.getExtension("EXT_color_buffer_float");
  if (!full && !gl.getExtension("EXT_color_buffer_half_float")) return null;
  const internalFormat = full ? gl.RGBA32F : gl.RGBA16F;

  const simulate = program(gl, vertexShader, simulateShader);
  const render = program(gl, vertexShader, renderShader);
  if (!simulate || !render) return null;

  // One triangle that covers the viewport.
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

  const makeTexture = () => {
    const texture = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texStorage2D(gl.TEXTURE_2D, 1, internalFormat, NX, NY);
    for (const [key, value] of [
      [gl.TEXTURE_MIN_FILTER, gl.NEAREST],
      [gl.TEXTURE_MAG_FILTER, gl.NEAREST],
      [gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE],
      [gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE],
    ]) {
      gl.texParameteri(gl.TEXTURE_2D, key, value);
    }
    return texture;
  };

  const makeState = (): State => {
    const textures = [makeTexture(), makeTexture(), makeTexture()];
    const framebuffer = gl.createFramebuffer()!;
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    textures.forEach((texture, i) => gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + i, gl.TEXTURE_2D, texture, 0));
    gl.drawBuffers([gl.COLOR_ATTACHMENT0, gl.COLOR_ATTACHMENT1, gl.COLOR_ATTACHMENT2]);
    return { textures, framebuffer };
  };

  const states = [makeState(), makeState()];
  if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) return null;
  let current = 0;
  let stirring = { x: -100, y: -100, vx: 0, vy: 0 };

  const uniforms = (prog: WebGLProgram, names: string[]) =>
    Object.fromEntries(names.map((name) => [name, gl.getUniformLocation(prog, name)]));
  const su = uniforms(simulate, ["f0", "f1", "f2", "uIn", "omega", "init", "stir", "stirVelocity"]);
  const ru = uniforms(render, ["f0", "f1", "f2", "paper", "ink", "ball", "cell", "resolution"]);

  const bindState = (prog: Record<string, WebGLUniformLocation | null>, state: State) => {
    state.textures.forEach((texture, i) => {
      gl.activeTexture(gl.TEXTURE0 + i);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.uniform1i(prog[`f${i}`], i);
    });
  };

  const runStep = (init: boolean) => {
    const source = states[current];
    const target = states[1 - current];
    gl.useProgram(simulate);
    gl.bindFramebuffer(gl.FRAMEBUFFER, target.framebuffer);
    gl.viewport(0, 0, NX, NY);
    bindState(su, source);
    gl.uniform1f(su.uIn, U_IN);
    gl.uniform1f(su.omega, 1 / TAU);
    gl.uniform1i(su.init, init ? 1 : 0);
    gl.uniform2f(su.stir, stirring.x, stirring.y);
    gl.uniform2f(su.stirVelocity, stirring.vx, stirring.vy);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    current = 1 - current;
  };

  const reset = () => runStep(true);
  reset();

  return {
    step(count) {
      for (let i = 0; i < count; i++) runStep(false);
      // A stir lasts one frame.
      stirring = { x: -100, y: -100, vx: 0, vy: 0 };
    },
    draw(colors, cell) {
      gl.useProgram(render);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, canvas.width, canvas.height);
      bindState(ru, states[current]);
      gl.uniform3fv(ru.paper, colors.paper);
      gl.uniform3fv(ru.ink, colors.ink);
      gl.uniform3fv(ru.ball, colors.ball);
      gl.uniform1f(ru.cell, cell);
      gl.uniform2f(ru.resolution, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
    stir(x, y, vx, vy) {
      stirring = { x, y, vx, vy };
    },
    reset,
    dispose() {
      for (const state of states) {
        state.textures.forEach((texture) => gl.deleteTexture(texture));
        gl.deleteFramebuffer(state.framebuffer);
      }
      gl.deleteProgram(simulate);
      gl.deleteProgram(render);
      gl.deleteBuffer(buffer);
      gl.deleteVertexArray(vao);
    },
  };
}

function program(gl: WebGL2RenderingContext, vertex: string, fragment: string) {
  const compile = (kind: number, source: string) => {
    const shader = gl.createShader(kind)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(shader));
      return null;
    }
    return shader;
  };
  const vs = compile(gl.VERTEX_SHADER, vertex);
  const fs = compile(gl.FRAGMENT_SHADER, fragment);
  if (!vs || !fs) return null;
  const prog = gl.createProgram()!;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.bindAttribLocation(prog, 0, "position");
  gl.linkProgram(prog);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(prog));
    return null;
  }
  return prog;
}

/** "#d6500a" → [0.84, 0.31, 0.04] */
export function hexToRgb(hex: string): Rgb {
  const value = parseInt(hex.replace("#", ""), 16);
  return [((value >> 16) & 255) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255];
}
