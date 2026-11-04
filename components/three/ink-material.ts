import * as THREE from "three";

/**
 * "Ink screentone" shading: each screen cell holds an ink dot whose size follows
 * the lighting, like a manga halftone. While `uNoise` > 0 the dots are random,
 * so the scene appears to be denoised into the drawing.
 */

export type InkUniforms = {
  uInk: { value: THREE.Color };
  uNoise: { value: number };
  uSeed: { value: number };
  uCell: { value: number };
  uLight: { value: THREE.Vector3 };
};

export function createInkUniforms(): InkUniforms {
  return {
    uInk: { value: new THREE.Color() },
    uNoise: { value: 1 },
    uSeed: { value: 0 },
    uCell: { value: 5 },
    uLight: { value: new THREE.Vector3(-0.45, 1, 0.55).normalize() },
  };
}

/** `noise` goes from 1 (random dots) to 0 (shaded drawing). Dot cells stay 5 CSS pixels wide. */
export function updateInk(uniforms: InkUniforms, { noise, time, dpr }: { noise: number; time: number; dpr: number }) {
  uniforms.uNoise.value = noise;
  // Re-roll the dots ~14 times per second while the noise is visible.
  if (noise > 0.001) uniforms.uSeed.value = Math.floor(time / 0.07) % 97;
  uniforms.uCell.value = 5 * dpr;
}

const HASH = /* glsl */ `
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
`;

const toneVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec2 vUv;
  void main() {
    vNormal = normalize(mat3(modelMatrix) * normal);
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const toneFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uInk;
  uniform vec3 uLight;
  uniform float uNoise;
  uniform float uCell;
  uniform float uSeed;
  uniform float uBias;
  uniform float uUseMap;
  uniform sampler2D uMap;
  varying vec3 vNormal;
  varying vec2 vUv;
  ${HASH}
  void main() {
    float light = max(dot(normalize(vNormal), uLight), 0.0);
    float tone = clamp(0.62 - 0.62 * light + uBias, 0.0, 1.0);

    vec2 cell = floor(gl_FragCoord.xy / uCell);
    float random = hash(cell + uSeed);
    float t = mix(tone, random * random * 0.85, uNoise);

    float dist = length(fract(gl_FragCoord.xy / uCell) - 0.5) * 2.0;
    float radius = sqrt(t) * 1.05;
    float ink = t < 0.02 ? 0.0 : 1.0 - smoothstep(radius - 0.15, radius + 0.15, dist);

    // Court lines are drawn from a texture once the noise has settled.
    if (uUseMap > 0.5) ink = max(ink, (1.0 - texture2D(uMap, vUv).r) * (1.0 - uNoise));

    gl_FragColor = vec4(mix(uColor, uInk, ink), 1.0);
  }
`;

type ToneOptions = {
  color: { value: THREE.Color };
  bias?: number;
  map?: THREE.Texture;
};

export function createToneMaterial(shared: InkUniforms, { color, bias = 0, map }: ToneOptions) {
  return new THREE.ShaderMaterial({
    vertexShader: toneVertex,
    fragmentShader: toneFragment,
    uniforms: {
      ...shared,
      uColor: color,
      uBias: { value: bias },
      uUseMap: { value: map ? 1 : 0 },
      uMap: { value: map ?? null },
    },
  });
}

/** Outline drawn with the inverted-hull trick: back faces pushed along their normals. */
export function createOutlineMaterial(shared: InkUniforms, thickness = 0.03) {
  return new THREE.ShaderMaterial({
    side: THREE.BackSide,
    uniforms: { ...shared, uThick: { value: thickness } },
    vertexShader: /* glsl */ `
      uniform float uThick;
      void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position + normal * uThick, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uInk;
      uniform float uNoise;
      uniform float uSeed;
      uniform float uCell;
      ${HASH}
      void main() {
        if (hash(floor(gl_FragCoord.xy / uCell) + uSeed + 3.1) < uNoise) discard;
        gl_FragColor = vec4(uInk, 1.0);
      }
    `,
  });
}
