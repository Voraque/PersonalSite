import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import LiquidGlass from './LiquidGlass';
import { useTheme } from './ThemeContext';
import './PrismDemo.css';

export default function LiquidDemo() {
    const { theme } = useTheme();

    return (
        <div className="panel panel-prism">
            {/* Title sits inside the DOM to layer underneath the canvas */}
            <h2 className="prism-bg-text" style={{ fontSize: '14vw' }}>LIQUID / OIL</h2>

            <div className="prism-canvas-container">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                    <Suspense fallback={null}>
                        <Text
                            position={[0, 0, -2]}
                            fontSize={1.2}
                            color={theme.parchment}
                            font={
                                theme.typography === 'modern' ? "https://fonts.gstatic.com/s/syne/v22/8vIJ7w4qzjYvM2jwcjM.woff" :
                                    theme.typography === 'soft' ? "https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtM.woff" :
                                        "https://fonts.gstatic.com/s/cormorantgaramond/v16/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYpntPbaGZ_A.woff"
                            }
                            letterSpacing={-0.05}
                        >
                            Organism
                        </Text>

                        <LiquidGlass />
                    </Suspense>
                </Canvas>
            </div>

            <div className="prism-label">
                <div className="type-meta" style={{ color: 'var(--parchment)' }}>WebGL / Rainbow Shimmer</div>
                <div className="type-meta" style={{ marginTop: 4 }}>Index of Refraction: 1.8</div>
            </div>
        </div>
    );
}
