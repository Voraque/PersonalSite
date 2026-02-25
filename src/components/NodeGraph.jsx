import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTheme } from './ThemeContext';
import * as THREE from 'three';
import './NodeGraph.css';

// A beautifully connected node graph visualization
function PointsGroup({ count = 200 }) {
    const pointsRef = useRef();
    const linesRef = useRef();
    const { theme } = useTheme();

    // Generate random points in a sphere
    const [positions, connections] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const conns = [];
        for (let i = 0; i < count; i++) {
            // Golden spiral or random spherical distribution
            const theta = 2 * Math.PI * Math.random();
            const phi = Math.acos(2 * Math.random() - 1);
            const r = Math.cbrt(Math.random()) * 2.5; // radius 2.5

            pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = r * Math.cos(phi);
        }

        // Connect close points
        let linesCount = 0;
        const maxConnections = 4;
        for (let i = 0; i < count; i++) {
            let degree = 0;
            for (let j = i + 1; j < count; j++) {
                if (degree >= maxConnections) break;
                const dx = pos[i * 3] - pos[j * 3];
                const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
                const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
                const distSq = dx * dx + dy * dy + dz * dz;

                if (distSq < 1.0) { // threshold for connection
                    conns.push(
                        pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2],
                        pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]
                    );
                    degree++;
                    linesCount++;
                }
            }
        }
        return [pos, new Float32Array(conns)];
    }, [count]);

    useFrame((state, delta) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += delta * 0.05;
            pointsRef.current.rotation.x += delta * 0.02;
        }
        if (linesRef.current) {
            linesRef.current.rotation.y += delta * 0.05;
            linesRef.current.rotation.x += delta * 0.02;
        }
    });

    return (
        <group>
            {/* The Nodes */}
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={positions.length / 3}
                        array={positions}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.05}
                    color={theme.warmMid}
                    transparent
                    opacity={0.8}
                    sizeAttenuation
                />
            </points>

            {/* The Connections */}
            <lineSegments ref={linesRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={connections.length / 3}
                        array={connections}
                        itemSize={3}
                    />
                </bufferGeometry>
                <lineBasicMaterial
                    color={theme.chrome}
                    transparent
                    opacity={0.15}
                />
            </lineSegments>
        </group>
    );
}

export default function NodeGraph() {
    return (
        <div className="panel panel-nodegraph">
            <div className="nodegraph-header">
                <h3 className="nodegraph-title">Machine Vision / Structural Topology</h3>
                <span className="type-meta">Interactive Node Graph</span>
            </div>

            <div className="nodegraph-canvas-container">
                <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                    <PointsGroup count={300} />
                </Canvas>
            </div>
        </div>
    );
}
