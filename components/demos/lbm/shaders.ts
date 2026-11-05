import { NX, NY } from "./config";

// The cylinder, a little off-centre so the wake starts to swing on its own.
const CX = Math.round(NX / 5);
const CY = NY / 2 + 1.5;
const R = Math.round(NY / 10);

const common = /* glsl */ `#version 300 es
precision highp float;
precision highp int;
uniform sampler2D f0, f1, f2;
const int NX = ${NX};
const int NY = ${NY};
const ivec2 C[9] = ivec2[9](ivec2(0, 0), ivec2(1, 0), ivec2(0, 1), ivec2(-1, 0), ivec2(0, -1),
                            ivec2(1, 1), ivec2(-1, 1), ivec2(-1, -1), ivec2(1, -1));

bool solid(ivec2 p) {
  vec2 d = vec2(p) - vec2(${CX}.0, ${CY.toFixed(1)});
  return dot(d, d) < ${R * R}.0;
}

void load(ivec2 p, out float f[9]) {
  vec4 a = texelFetch(f0, p, 0);
  vec4 b = texelFetch(f1, p, 0);
  vec4 c = texelFetch(f2, p, 0);
  f = float[9](a.x, a.y, a.z, a.w, b.x, b.y, b.z, b.w, c.x);
}
`;

export const vertexShader = /* glsl */ `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

/** Pull streaming (with bounce-back on the cylinder), then BGK collision. */
export const simulateShader = /* glsl */ `${common}
uniform float uIn;
uniform float omega;
uniform bool init;
uniform vec2 stir;
uniform vec2 stirVelocity;
layout(location = 0) out vec4 out0;
layout(location = 1) out vec4 out1;
layout(location = 2) out vec4 out2;

const int OPP[9] = int[9](0, 3, 4, 1, 2, 7, 8, 5, 6);
const float W[9] = float[9](4.0 / 9.0, 1.0 / 9.0, 1.0 / 9.0, 1.0 / 9.0, 1.0 / 9.0,
                            1.0 / 36.0, 1.0 / 36.0, 1.0 / 36.0, 1.0 / 36.0);

float equilibrium(int i, float rho, vec2 u) {
  float cu = dot(vec2(C[i]), u);
  return W[i] * rho * (1.0 + 3.0 * cu + 4.5 * cu * cu - 1.5 * dot(u, u));
}

void write(float f[9]) {
  out0 = vec4(f[0], f[1], f[2], f[3]);
  out1 = vec4(f[4], f[5], f[6], f[7]);
  out2 = vec4(f[8], 0.0, 0.0, 0.0);
}

void main() {
  ivec2 p = ivec2(gl_FragCoord.xy);
  float f[9];

  // Start, inlet column and inside the cylinder: equilibrium.
  if (init || p.x == 0 || solid(p)) {
    // A small transverse wave at the start breaks the symmetry, so the vortices shed sooner.
    vec2 u = solid(p) ? vec2(0.0) : vec2(uIn, init ? 0.2 * uIn * sin(6.2832 * float(p.x) / float(NX)) : 0.0);
    for (int i = 0; i < 9; i++) f[i] = equilibrium(i, 1.0, u);
    write(f);
    return;
  }

  float here[9];
  load(p, here);
  for (int i = 0; i < 9; i++) {
    ivec2 q = p - C[i];
    q.y = (q.y + NY) % NY;          // periodic top and bottom
    if (q.x >= NX) q.x = NX - 2;    // outlet: zero gradient
    if (solid(q)) {
      f[i] = here[OPP[i]];          // bounce-back
    } else {
      float there[9];
      load(q, there);
      f[i] = there[i];
    }
  }

  float rho = 0.0;
  vec2 u = vec2(0.0);
  for (int i = 0; i < 9; i++) {
    rho += f[i];
    u += f[i] * vec2(C[i]);
  }
  u /= rho;

  // The pointer shifts the equilibrium velocity around it.
  float near = 1.0 - smoothstep(2.0, 7.0, distance(vec2(p), stir));
  vec2 target = u + stirVelocity * near;
  float speed = length(target);
  if (speed > 0.2) target *= 0.2 / speed;

  for (int i = 0; i < 9; i++) f[i] += omega * (equilibrium(i, rho, target) - f[i]);
  write(f);
}
`;

/** Vorticity as screentone: one dot per screen cell, its area set by |curl|, its colour by the sign. */
export const renderShader = /* glsl */ `${common}
uniform vec3 paper;
uniform vec3 ink;
uniform vec3 ball;
uniform float cell;
uniform vec2 resolution;
out vec4 color;

vec2 velocity(ivec2 p) {
  p = clamp(p, ivec2(0), ivec2(NX - 1, NY - 1));
  float f[9];
  load(p, f);
  float rho = 0.0;
  vec2 u = vec2(0.0);
  for (int i = 0; i < 9; i++) {
    rho += f[i];
    u += f[i] * vec2(C[i]);
  }
  return u / rho;
}

void main() {
  vec2 centre = (floor(gl_FragCoord.xy / cell) + 0.5) * cell;
  ivec2 p = ivec2(centre / resolution * vec2(NX, NY));

  if (solid(ivec2(gl_FragCoord.xy / resolution * vec2(NX, NY)))) {
    color = vec4(ink, 1.0);
    return;
  }

  float curl = (velocity(p + ivec2(1, 0)).y - velocity(p - ivec2(1, 0)).y)
             - (velocity(p + ivec2(0, 1)).x - velocity(p - ivec2(0, 1)).x);
  float radius = sqrt(clamp((abs(curl) - 0.0015) * 24.0, 0.0, 1.0)) * cell * 0.52;
  float d = distance(gl_FragCoord.xy, centre);
  float amount = 1.0 - smoothstep(radius - 0.75, radius + 0.75, d);
  color = vec4(mix(paper, curl > 0.0 ? ink : ball, amount), 1.0);
}
`;
