import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Environment, Center } from '@react-three/drei';
import { useTheme } from '../components/ThemeContext';

export default function PrismGlass() {
    const meshRef = useRef();
    const { theme } = useTheme();

    // Rotate the prism slowly
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.3;
        }
    });

    return (
        <group position={[0, -0.5, 0]}>
            {/* Abstract geometry (Icosahedron looks crystal-like) */}
            <mesh ref={meshRef} position={[0, 0, 0]} scale={1.8}>
                <icosahedronGeometry args={[1, 0]} />
                <MeshTransmissionMaterial
                    background={theme.void} // Pass theme bg so refraction blends correctly
                    thickness={1.5}        // Volume thickness for refraction
                    roughness={0.1}        // Slight frosting
                    transmission={1}       // Fully transmissive glass
                    ior={1.4}              // Index of Refraction (glass/water)
                    chromaticAberration={0.06} // RGB split
                    color={theme.parchment} // Tint the glass
                    anisotropy={0.3}
                    distortion={0.2}
                    distortionScale={0.5}
                />
            </mesh>

            {/* Lighting & reflections for the glass */}
            <Environment preset="city" />
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} intensity={1.5} angle={0.2} penumbra={1} color={theme.glow} />
            <spotLight position={[-10, -10, -10]} intensity={1} angle={0.2} penumbra={1} color={theme.rust} />
            <spotLight position={[0, 10, -10]} intensity={2} angle={0.2} penumbra={1} color={theme.moss} />
        </group>
    );
}
