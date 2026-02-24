import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import './WebGLCanvas.css';

const fragmentShader = `
  uniform float u_time;
  uniform vec2 u_resolution;
  varying vec2 vUv;

  float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  void main() {
      vec2 st = gl_FragCoord.xy / u_resolution.xy;
      
      // Organic noise simulation
      float n1 = sin(st.x * 10.0 + u_time * 0.5) * cos(st.y * 10.0 + u_time * 0.3);
      float n2 = sin(st.x * 20.0 - u_time * 0.2) * cos(st.y * 15.0 + u_time * 0.4);
      
      float noise = random(st * u_time) * 0.15;
      
      float base = (n1 * 0.3 + n2 * 0.3 + 0.5);
      
      vec3 color = vec3(
          base * 0.8 + noise, // Warm
          base * 0.65 + noise, // Green
          base * 0.5 + noise  // Blue
      );
      
      // Vignette
      vec2 center = vec2(0.5);
      float dist = distance(st, center);
      float vignette = smoothstep(0.8, 0.2, dist);
      
      gl_FragColor = vec4(color * vignette, 0.7);
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
