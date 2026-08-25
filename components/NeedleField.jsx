"use client";

import { useEffect, useRef } from "react";
import styles from "./NeedleField.module.css";

const SPACING = 34; // distância entre agulhas, em px de CSS
const EASE = 0.08;

const VERTEX_SHADER = `
attribute vec2 aPos;

void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision mediump float;

uniform vec2 uMouse;
uniform float uSpacing;
uniform vec3 uBase;
uniform vec3 uAccent;

void main() {
  vec2 p = gl_FragCoord.xy;

  // Cada célula da grade carrega uma agulha, centrada nela.
  vec2 center = (floor(p / uSpacing) + 0.5) * uSpacing;
  vec2 toMouse = uMouse - center;
  float dist = length(toMouse);

  // Gira o ponto para o referencial da agulha, onde +x aponta para o cursor.
  float ang = atan(toMouse.y, toMouse.x);
  float c = cos(ang);
  float s = sin(ang);
  vec2 d = p - center;
  vec2 local = vec2(dot(d, vec2(c, s)), dot(d, vec2(-s, c)));

  float len = uSpacing * 0.34;
  float thick = max(uSpacing * 0.038, 0.9);

  // Afina da base até a ponta para dar o formato de agulha.
  float t = clamp((local.x + len) / (2.0 * len), 0.0, 1.0);
  float w = thick * mix(1.0, 0.06, t * t);
  float sd = max(abs(local.y) - w, max(-local.x - len, local.x - len));
  float shape = 1.0 - smoothstep(-1.0, 1.0, sd);

  // Agulhas perto do cursor acendem na cor de destaque.
  float prox = exp(-dist / (uSpacing * 10.0));
  // Some com as que ficam debaixo do cursor, onde a direção vira ruído.
  float core = smoothstep(0.0, uSpacing * 0.9, dist);

  vec3 color = mix(uBase, uAccent, prox);
  float alpha = shape * core * (0.20 + 1.05 * prox);

  gl_FragColor = vec4(color, clamp(alpha, 0.0, 1.0));
}
`;

function hexToRgb(value, fallback) {
  const match = /^#?([0-9a-f]{6})$/i.exec(value.trim());
  if (!match) return fallback;
  const n = parseInt(match[1], 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

export default function NeedleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: false,
    });
    if (!gl) return;

    const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vertex || !fragment) return;

    const program = gl.createProgram();
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    gl.useProgram(program);

    // Triângulo único cobrindo a tela inteira.
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );

    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uMouse = gl.getUniformLocation(program, "uMouse");
    const uSpacing = gl.getUniformLocation(program, "uSpacing");

    const theme = getComputedStyle(document.documentElement);
    gl.uniform3fv(
      gl.getUniformLocation(program, "uBase"),
      hexToRgb(theme.getPropertyValue("--muted"), [0.54, 0.54, 0.54]),
    );
    gl.uniform3fv(
      gl.getUniformLocation(program, "uAccent"),
      hexToRgb(theme.getPropertyValue("--accent"), [1, 0.3, 0.12]),
    );

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { ...target };
    let dpr = 1;

    function draw() {
      gl.clear(gl.COLOR_BUFFER_BIT);
      // gl_FragCoord tem origem embaixo à esquerda; o ponteiro, em cima.
      gl.uniform2f(uMouse, current.x * dpr, canvas.height - current.y * dpr);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(uSpacing, SPACING * dpr);
      draw();
    }

    let frameId = 0;

    function loop() {
      const dx = target.x - current.x;
      const dy = target.y - current.y;

      current.x += dx * EASE;
      current.y += dy * EASE;
      draw();

      // Para de desenhar quando as agulhas já alcançaram o cursor.
      if (Math.abs(dx) < 0.3 && Math.abs(dy) < 0.3) {
        frameId = 0;
        return;
      }

      frameId = requestAnimationFrame(loop);
    }

    function handleMove(event) {
      target.x = event.clientX;
      target.y = event.clientY;
      if (!frameId) frameId = requestAnimationFrame(loop);
    }

    resize();

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("resize", resize);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
