import { useTheme } from './ThemeContext';
import './ColorSwatches.css';

export default function ColorSwatches() {
    const { theme } = useTheme();

    return (
        <div className="panel panel-swatches">
            <div className="swatch" style={{ background: theme.ink }}>
                <span className="swatch-label" style={{ color: 'rgba(240,234,216,0.4)' }}>Ink</span>
                <span className="swatch-hex" style={{ color: 'rgba(240,234,216,0.25)' }}>{theme.ink}</span>
            </div>
            <div className="swatch" style={{ background: theme.rust }}>
                <span className="swatch-label" style={{ color: 'rgba(240,234,216,0.7)' }}>Rust</span>
                <span className="swatch-hex" style={{ color: 'rgba(240,234,216,0.4)' }}>{theme.rust}</span>
            </div>
            <div className="swatch" style={{ background: theme.warmMid }}>
                <span className="swatch-label" style={{ color: theme.ink }}>Parchment Mid</span>
                <span className="swatch-hex" style={{ color: 'rgba(26,22,18,0.5)' }}>{theme.warmMid}</span>
            </div>
            <div className="swatch" style={{ background: theme.moss }}>
                <span className="swatch-label" style={{ color: 'rgba(240,234,216,0.7)' }}>Moss</span>
                <span className="swatch-hex" style={{ color: 'rgba(240,234,216,0.4)' }}>{theme.moss}</span>
            </div>
            <div className="swatch" style={{ background: theme.glow }}>
                <span className="swatch-label" style={{ color: theme.ink }}>Glow</span>
                <span className="swatch-hex" style={{ color: 'rgba(26,22,18,0.5)' }}>{theme.glow}</span>
            </div>
            <div className="swatch" style={{ background: theme.parchment }}>
                <span className="swatch-label" style={{ color: theme.ink }}>Parchment</span>
                <span className="swatch-hex" style={{ color: 'rgba(26,22,18,0.4)' }}>{theme.parchment}</span>
            </div>
        </div>
    );
}
