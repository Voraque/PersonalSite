import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Environment } from '@react-three/drei';
import { useTheme } from './ThemeContext';

export default function LiquidGlass() {
    const meshRef = useRef();
    const { theme } = useTheme();

    // Rotate and slowly deform the liquid glass
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.1;
            meshRef.current.rotation.y += delta * 0.15;
            meshRef.current.rotation.z += delta * 0.05;
        }
    });

    return (
        <group position={[0, -0.5, 0]}>
            {/* Organic/blob-like geometry for liquid */}
            <mesh ref={meshRef} position={[0, 0, 0]} scale={1.8}>
                {/* A sphere with lots of segments to show off refraction */}
                <sphereGeometry args={[1, 64, 64]} />
                <MeshTransmissionMaterial
                    background={theme.void} // Pass theme bg so refraction blends correctly
                    thickness={2.5}        // Thicker volume for deeper refraction
                    roughness={0.0}        // Smooth, oily surface
                    transmission={1.0}     // Fully transmissive glass
                    ior={1.8}              // High Index of Refraction (Heavy glass/oil)
                    chromaticAberration={0.3} // High RGB split for the rainbow shimmer effect
                    color={theme.parchment} // Base tint
                    anisotropy={0.5}
                    distortion={0.8}       // High distortion for liquid feel
                    distortionScale={0.3}
                    clearcoat={1}          // Extra shiny specular highlight
                    clearcoatRoughness={0.1}
                />
            </mesh>

            {/* Lighting & reflections for the glass */}
            <Environment preset="night" /> {/* Darker env map looks better for oil */}

            {/* Colored lights passing through the glass highly accentuate chromatic aberration */}
            <ambientLight intensity={0.2} />
            <directionalLight position={[5, 5, 5]} intensity={2} color={theme.glow} />
            <pointLight position={[-5, -5, -5]} intensity={3} color={theme.rust} />
            <pointLight position={[0, 5, -5]} intensity={2.5} color={"#00ffcc"} /> {/* Add some cyan to force rainbow refraction */}
            <pointLight position={[5, -5, 0]} intensity={2.5} color={"#ff00ff"} /> {/* Add some magenta */}
        </group>
    );
}
