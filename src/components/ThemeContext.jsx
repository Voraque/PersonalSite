import React, { createContext, useContext, useState, useEffect } from 'react';
import chroma from 'chroma-js';

// Typography presets
export const typographyOptions = {
    classic: {
        name: 'Classic Editorial',
        display: "'Cormorant Garamond', Georgia, serif",
        body: "'Crimson Pro', Georgia, serif",
        mono: "'JetBrains Mono', monospace"
    },
    modern: {
        name: 'Modern Brutalist',
        display: "'Syne', sans-serif",
        body: "'Inter', sans-serif",
        mono: "'Space Mono', monospace"
    },
    soft: {
        name: 'Soft Serif',
        display: "'Playfair Display', serif",
        body: "'DM Sans', sans-serif",
        mono: "'JetBrains Mono', monospace"
    }
};

// Default theme matches moodboard.html initial values
export const initialTheme = {
    baseColor: '#c4a882', // warmMid
    typography: 'classic',
    // Derived colors (will be populated dynamically if baseColor changes)
    ink: '#1a1612',
    parchment: '#f0ead8',
    warmMid: '#c4a882',
    rust: '#8b4a2b',
    moss: '#4a5240',
    chrome: '#d4c9b8',
    void: '#0d0b09',
    glow: '#e8c87a'
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(initialTheme);
    const [autoHarmony, setAutoHarmony] = useState(true);

    // Generate harmonic palette when baseColor changes (and autoHarmony is on)
    useEffect(() => {
        if (!autoHarmony) return;

        try {
            const base = chroma(theme.baseColor);

            // Calculate harmonies based on HSL relationships to the provided base color
            // E.g., if base is a warm beige, ink should be a very dark, slightly desaturated version
            const h = isNaN(base.get('hsl.h')) ? 0 : base.get('hsl.h');
            const s = isNaN(base.get('hsl.s')) ? 0 : base.get('hsl.s');

            const ink = base.set('hsl.l', 0.1).set('hsl.s', s * 0.5).hex();
            const parchment = base.set('hsl.l', 0.9).set('hsl.s', s * 0.3).hex();
            const rust = base.set('hsl.h', h - 20).set('hsl.l', 0.4).set('hsl.s', Math.min(1, s * 1.5)).hex();
            const moss = base.set('hsl.h', h + 90).set('hsl.l', 0.3).set('hsl.s', s * 0.4).hex();
            const chrome = base.set('hsl.l', 0.8).desaturate(2).hex();
            const voidColor = base.set('hsl.l', 0.05).desaturate(1).hex();
            const glow = base.set('hsl.l', 0.7).saturate(1).hex();

            setTheme(prev => ({
                ...prev,
                ink,
                parchment,
                warmMid: theme.baseColor,
                rust,
                moss,
                chrome,
                void: voidColor,
                glow
            }));
        } catch (e) {
            console.error('Invalid color', e);
        }
    }, [theme.baseColor, autoHarmony]);

    // Apply Variables to CSS Root
    useEffect(() => {
        const root = document.documentElement;
        // Colors
        root.style.setProperty('--ink', theme.ink);
        root.style.setProperty('--parchment', theme.parchment);
        root.style.setProperty('--warm-mid', theme.warmMid);
        root.style.setProperty('--rust', theme.rust);
        root.style.setProperty('--moss', theme.moss);
        root.style.setProperty('--chrome', theme.chrome);
        root.style.setProperty('--void', theme.void);
        root.style.setProperty('--glow', theme.glow);

        // Typography
        const activeTypography = typographyOptions[theme.typography];
        if (activeTypography) {
            root.style.setProperty('--font-display', activeTypography.display);
            root.style.setProperty('--font-body', activeTypography.body);
            root.style.setProperty('--font-mono', activeTypography.mono);
        }

    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, autoHarmony, setAutoHarmony }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
