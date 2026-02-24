import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import PrismGlass from './PrismGlass';
import { useTheme } from './ThemeContext';
import './PrismDemo.css';

export default function PrismDemo() {
    const { theme, autoHarmony } = useTheme();

    return (
        <div className="panel panel-prism">
            {/* Title sits inside the DOM to layer underneath the canvas */}
            <h2 className="prism-bg-text">REFRACT</h2>

            <div className="prism-canvas-container">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                    <Suspense fallback={null}>
                        {/* The Text component lives IN the 3D scene, behind the prism, so the glass actually refracts it */}
                        <Text
                            position={[0, 0, -2]}
                            fontSize={1.5}
                            color={theme.warmMid}
                            font={
                                // Map the CSS fonts roughly to their google font URLs for Drei Text
                                theme.typography === 'modern' ? "https://fonts.gstatic.com/s/syne/v22/8vIJ7w4qzjYvM2jwcjM.woff" :
                                    theme.typography === 'soft' ? "https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtM.woff" :
                                        "https://fonts.gstatic.com/s/cormorantgaramond/v16/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYpntPbaGZ_A.woff"
                            }
                            letterSpacing={-0.05}
                        >
                            Presence
                        </Text>

                        <PrismGlass />
                    </Suspense>
                </Canvas>
            </div>

            <div className="prism-label">
                <div className="type-meta" style={{ color: 'var(--parchment)' }}>WebGL / Mesh Transmission</div>
                <div className="type-meta" style={{ marginTop: 4 }}>Index of Refraction: 1.4</div>
            </div>
        </div>
    );
}
