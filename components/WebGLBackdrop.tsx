import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type SceneConfig = {
  id: string;
  colorA: string;
  colorB: string;
  warp: number;
  intensity: number;
  band: number;
  grain: number;
};

const SCENES: SceneConfig[] = [
  { id: 'launch', colorA: '#CCFF00', colorB: '#050505', warp: 0.7, intensity: 0.85, band: 0.5, grain: 0.22 },
  { id: 'works', colorA: '#FFFFFF', colorB: '#1A1A1A', warp: 0.4, intensity: 0.7, band: 0.3, grain: 0.18 },
  { id: 'manifesto', colorA: '#050505', colorB: '#CCFF00', warp: 0.85, intensity: 0.88, band: 0.55, grain: 0.24 },
  { id: 'contact', colorA: '#F5F5F5', colorB: '#0A0A0A', warp: 0.45, intensity: 0.68, band: 0.22, grain: 0.2 },
];

const vertexShaderSource = `
  attribute vec2 a_position;
  varying vec2 vUv;
  void main() {
    vUv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uResolution;
  uniform float uWarp;
  uniform float uIntensity;
  uniform float uBand;
  uniform float uGrain;
  uniform vec3 uColorA;
  uniform vec3 uColorB;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = m * p;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = uv - 0.5;
    p.x *= uResolution.x / uResolution.y;

    float t = uTime * 0.35;
    vec2 warp = vec2(
      fbm(p * (2.0 + uWarp) + t),
      fbm(p * (2.0 + uWarp) - t)
    );
    p += (warp - 0.5) * uWarp;

    float n = fbm(p * 2.8 + t);
    float flow = fbm(p * 5.2 - t * 0.6);

    float bands = sin((uv.y + flow + uScroll * 0.2) * 22.0) * 0.5 + 0.5;
    bands = smoothstep(0.25, 0.75, bands);

    float grid = step(0.94, abs(sin((p.x + n) * 14.0))) + step(0.94, abs(sin((p.y + flow) * 14.0)));
    float glitch = step(0.985, noise(vec2(uv.y * 120.0, t * 2.0))) * (0.4 + n);

    float mixv = smoothstep(0.15, 0.85, n);
    vec3 col = mix(uColorA, uColorB, mixv);
    col = mix(col, col + vec3(bands) * 0.35, uBand);
    col += glitch * vec3(0.8, 0.9, 0.6);
    col += grid * 0.06;

    float grain = (noise(uv * uResolution * 0.5 + t * 2.0) - 0.5) * uGrain;
    col += grain;

    float vignette = smoothstep(0.9, 0.35, length(p));
    col *= vignette;

    gl_FragColor = vec4(col * uIntensity, 1.0);
  }
`;

const hexToRgb = (hex: string) => {
  const normalized = hex.replace('#', '');
  const full = normalized.length === 3
    ? normalized.split('').map((c) => c + c).join('')
    : normalized;
  const value = parseInt(full, 16);
  return {
    r: ((value >> 16) & 255) / 255,
    g: ((value >> 8) & 255) / 255,
    b: (value & 255) / 255,
  };
};

const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
};

const createProgram = (gl: WebGLRenderingContext, vertexSource: string, fragmentSource: string) => {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  if (!vertexShader || !fragmentShader) return null;
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.warn(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
};

interface WebGLBackdropProps {
  sceneKey: string;
}

const WebGLBackdrop: React.FC<WebGLBackdropProps> = ({ sceneKey }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance',
    });
    if (!gl) return;

    const program = createProgram(gl, vertexShaderSource, fragmentShaderSource);
    if (!program) return;

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    gl.useProgram(program);

    const uniforms = {
      time: 0,
      scroll: 0,
      warp: SCENES[0].warp,
      intensity: SCENES[0].intensity,
      band: SCENES[0].band,
      grain: SCENES[0].grain,
      colorA: hexToRgb(SCENES[0].colorA),
      colorB: hexToRgb(SCENES[0].colorB),
    };

    const uTime = gl.getUniformLocation(program, 'uTime');
    const uScroll = gl.getUniformLocation(program, 'uScroll');
    const uResolution = gl.getUniformLocation(program, 'uResolution');
    const uWarp = gl.getUniformLocation(program, 'uWarp');
    const uIntensity = gl.getUniformLocation(program, 'uIntensity');
    const uBand = gl.getUniformLocation(program, 'uBand');
    const uGrain = gl.getUniformLocation(program, 'uGrain');
    const uColorA = gl.getUniformLocation(program, 'uColorA');
    const uColorB = gl.getUniformLocation(program, 'uColorB');

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth * dpr;
      const height = canvas.clientHeight * dpr;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const setScene = (scene: SceneConfig) => {
      const targetA = hexToRgb(scene.colorA);
      const targetB = hexToRgb(scene.colorB);
      gsap.to(uniforms, {
        warp: scene.warp,
        intensity: scene.intensity,
        band: scene.band,
        grain: scene.grain,
        duration: 1.2,
        ease: 'power3.out',
      });
      gsap.to(uniforms.colorA, { ...targetA, duration: 1.2, ease: 'power3.out' });
      gsap.to(uniforms.colorB, { ...targetB, duration: 1.2, ease: 'power3.out' });
    };

    const triggers: ScrollTrigger[] = [];
    SCENES.forEach((scene) => {
      const triggerEl = document.querySelector(`[data-scene="${scene.id}"]`);
      if (!triggerEl) return;
      triggers.push(
        ScrollTrigger.create({
          trigger: triggerEl,
          start: 'top 70%',
          end: 'bottom 30%',
          onEnter: () => setScene(scene),
          onEnterBack: () => setScene(scene),
        })
      );
    });

    ScrollTrigger.refresh();

    const render = (time: number) => {
      resize();
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      uniforms.scroll = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      uniforms.time = time * 0.001;

      if (uTime) gl.uniform1f(uTime, uniforms.time);
      if (uScroll) gl.uniform1f(uScroll, uniforms.scroll);
      if (uResolution) gl.uniform2f(uResolution, canvas.width, canvas.height);
      if (uWarp) gl.uniform1f(uWarp, uniforms.warp);
      if (uIntensity) gl.uniform1f(uIntensity, uniforms.intensity);
      if (uBand) gl.uniform1f(uBand, uniforms.band);
      if (uGrain) gl.uniform1f(uGrain, uniforms.grain);
      if (uColorA) gl.uniform3f(uColorA, uniforms.colorA.r, uniforms.colorA.g, uniforms.colorA.b);
      if (uColorB) gl.uniform3f(uColorB, uniforms.colorB.r, uniforms.colorB.g, uniforms.colorB.b);

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafRef.current = requestAnimationFrame(render);
    };

    resize();
    rafRef.current = requestAnimationFrame(render);

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [sceneKey]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-10 mix-blend-soft-light"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/50" />
    </div>
  );
};

export default WebGLBackdrop;
