import './Hero.css';

export default function Hero() {
    return (
        <div className="panel panel-hero">
            <div className="hero-bg"></div>
            <div className="hero-photo"></div>
            <div className="scanlines"></div>
            <div style={{ position: 'relative', zIndex: 2 }}>
                <div className="hero-title">
                    <div className="glitch-word" data-text="Nicholas">Nicholas</div><br />
                    <em style={{ fontStyle: 'italic', color: 'var(--warm-mid)' }}>Dvorak</em>
                </div>
            </div>
            <div className="hero-sub">
                Marketing · Photography · AI<br />
                Seattle, WA · 47°N
            </div>
        </div>
    );
}
