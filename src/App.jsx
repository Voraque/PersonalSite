import { motion } from 'framer-motion';
import './App.css';
import { ThemeProvider } from './components/ThemeContext';
import Cursor from './components/Cursor';
import ThemeCustomizer from './components/ThemeCustomizer';
import Hero from './components/Hero';
import ColorSwatches from './components/ColorSwatches';
import TypographySpecimen from './components/TypographySpecimen';
import WebGLCanvas from './components/WebGLCanvas';
import GlitchDemo from './components/GlitchDemo';
import MotionDemo from './components/MotionDemo';
import PhilosophyDemo from './components/PhilosophyDemo';
import ComponentsDemo from './components/ComponentsDemo';
import LightLeakPanel from './components/LightLeakPanel';
import GalleryDemo from './components/GalleryDemo';
import PrismDemo from './components/PrismDemo';
import NodeGraph from './components/NodeGraph';
import LiquidDemo from './components/LiquidDemo';
import TerminalDemo from './components/TerminalDemo';

// Simple wrapper for elegant, tasteful scroll reveal animations
const FadeInScroll = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }} // smooth "tasteful" ease-out
  >
    {children}
  </motion.div>
);

function App() {
  return (
    <ThemeProvider>
      <Cursor />
      <div className="moodboard">
        {/* Header */}
        <div className="moodboard-header">
          <div className="moodboard-title">NicholasDvorak.com — Visual Direction / Moodboard v0.2</div>
          <div className="moodboard-meta">Harmonics × WebGL Refraction</div>
        </div>

        {/* Top level panels */}
        <Hero />
        <ColorSwatches />

        {/* Middle level panels */}
        <TypographySpecimen />
        <WebGLCanvas />
        <GlitchDemo />

        {/* Lower panels - Animated reveals */}
        <div style={{ gridColumn: '1 / 4' }}>
          <FadeInScroll>
            <MotionDemo />
          </FadeInScroll>
        </div>

        <PhilosophyDemo />

        {/* New Prism Refraction Panel wrapped in grid context manually to span */}
        <div style={{ gridColumn: '2 / 4' }}>
          <FadeInScroll delay={0.1}>
            <PrismDemo />
          </FadeInScroll>
        </div>

        {/* Phase 3: Liquid Glass Refraction */}
        <div style={{ gridColumn: '1 / 3' }}>
          <FadeInScroll delay={0.2}>
            <LiquidDemo />
          </FadeInScroll>
        </div>

        {/* Phase 3: Machine Vision / Node Graph */}
        <NodeGraph />

        {/* Gallery */}
        <GalleryDemo />

        {/* Phase 3: Terminal Aesthetic */}
        <TerminalDemo />

        {/* Footers */}
        <ComponentsDemo />
        <LightLeakPanel />

      </div>
      <ThemeCustomizer />
    </ThemeProvider>
  );
}

export default App;
