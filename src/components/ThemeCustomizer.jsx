import './ThemeCustomizer.css';
import { useTheme, initialTheme, typographyOptions } from './ThemeContext';

export default function ThemeCustomizer() {
    const { theme, setTheme, autoHarmony, setAutoHarmony } = useTheme();

    const handleColorChange = (key, value) => {
        setTheme(prev => ({ ...prev, [key]: value }));
    };

    const handleTypographyChange = (e) => {
        setTheme(prev => ({ ...prev, typography: e.target.value }));
    };

    const resetTheme = () => {
        setTheme(initialTheme);
    };

    const colorKeys = ['baseColor', 'ink', 'parchment', 'rust', 'moss', 'glow', 'void', 'chrome'];

    return (
        <div className="theme-customizer">
            <div className="customizer-header">
                <span>Theme Engine</span>
                <button onClick={resetTheme} className="reset-btn">Reset</button>
            </div>
            <div className="customizer-body">

                {/* Typography Selector */}
                <div className="control-group">
                    <label className="section-label">Typography Preset</label>
                    <select
                        value={theme.typography}
                        onChange={handleTypographyChange}
                        className="theme-select"
                    >
                        {Object.entries(typographyOptions).map(([key, opt]) => (
                            <option key={key} value={key}>{opt.name}</option>
                        ))}
                    </select>
                </div>

                {/* Color Mode Toggle */}
                <div className="control-group harmony-toggle">
                    <label className="section-label" style={{ marginBottom: 0 }}>Auto-Harmony Palette</label>
                    <input
                        type="checkbox"
                        checked={autoHarmony}
                        onChange={(e) => setAutoHarmony(e.target.checked)}
                    />
                </div>

                {/* Colors */}
                <div className="color-grid">
                    {colorKeys.map((key) => {
                        // If auto-harmony is on, only baseColor is editable. The rest are disabled visually.
                        const isDisabled = autoHarmony && key !== 'baseColor';
                        return (
                            <div
                                className={`color-control ${isDisabled ? 'disabled' : ''}`}
                                key={key}
                                title={isDisabled ? "Calculated by Auto-Harmony" : ""}
                            >
                                <label>{key === 'baseColor' ? 'Base' : key}</label>
                                <input
                                    type="color"
                                    value={theme[key] || '#000000'}
                                    onChange={(e) => handleColorChange(key, e.target.value)}
                                    disabled={isDisabled}
                                />
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}
