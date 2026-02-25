import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import './WebGLCanvas.css';

const fragmentShader = `
  uniform float u_time;
  uniform vec2 u_resolution;
  varying vec2 vUv;

  // Pseudo-random generator
  float random (in vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  // 2D Noise based on Morgan McGuire @morgan3d
  float noise (in vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);

      // Four corners in 2D of a tile
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));

      // Smooth Interpolation
      vec2 u = f*f*(3.0-2.0*f);

      return mix(a, b, u.x) +
              (c - a)* u.y * (1.0 - u.x) +
              (d - b) * u.x * u.y;
  }

  // Fractional Brownian Motion
  #define OCTAVES 6
  float fbm (in vec2 st) {
      float value = 0.0;
      float amplitude = .5;
      float frequency = 0.;
      // Loop of octaves
      for (int i = 0; i < OCTAVES; i++) {
          value += amplitude * noise(st);
          st *= 2.;
          amplitude *= .5;
      }
      return value;
  }

  void main() {
      vec2 st = gl_FragCoord.xy / u_resolution.xy;
      st.x *= u_resolution.x / u_resolution.y; // Aspect ratio correction

      // Move the space itself
      vec2 q = vec2(0.);
      q.x = fbm( st + 0.00 * u_time);
      q.y = fbm( st + vec2(1.0));

      vec2 r = vec2(0.);
      r.x = fbm( st + 1.0 * q + vec2(1.7, 9.2) + 0.15 * u_time );
      r.y = fbm( st + 1.0 * q + vec2(8.3, 2.8) + 0.126 * u_time);

      float f = fbm(st + r);

      // Map to colors (Warm parchment/ink aesthetic)
      vec3 color = mix(vec3(0.05, 0.04, 0.03), // void-ish
                       vec3(0.76, 0.65, 0.50), // warmMid 
                       clamp((f*f)*4.0,0.0,1.0));

      color = mix(color,
                  vec3(0.1, 0.08, 0.07), // ink
                  clamp(length(q),0.0,1.0));

      color = mix(color,
                  vec3(0.9, 0.88, 0.82), // parchment highlights
                  clamp(length(r.x),0.0,1.0));
      
      // Add fine grain
      float grain = random(st * u_time) * 0.08;

      // Vignette
      vec2 center = vec2(0.5);
      // Normalized coordinates back for vignette
      vec2 normSt = gl_FragCoord.xy / u_resolution.xy;
      float dist = distance(normSt, center);
      float vignette = smoothstep(0.9, 0.2, dist);

      gl_FragColor = vec4((f * f * f + 0.6 * f * f + 0.5 * f) * color + grain, 1.0) * vec4(vec3(vignette), 0.85);
  }
`;

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

function ShaderPlane() {
    const meshRef = useRef();

    const uniforms = useMemo(() => ({
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
    }), []);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.material.uniforms.u_time.value = state.clock.elapsedTime;
        }
    });

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
            />
        </mesh>
    );
}

export default function WebGLCanvas() {
    return (
        <div className="panel panel-texture">
            <div className="texture-canvas-container">
                <Canvas camera={{ position: [0, 0, 1] }}>
                    <ShaderPlane />
                </Canvas>
            </div>
            <div className="texture-label">WebGL / Organic Texture</div>
        </div>
    );
}
