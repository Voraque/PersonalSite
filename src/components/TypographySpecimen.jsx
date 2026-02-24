import './TypographySpecimen.css';

export default function TypographySpecimen() {
    return (
        <div className="panel panel-type">
            <div>
                <div className="type-meta">Display — Cormorant Garamond 300</div>
                <div className="type-specimen">Aa <span>Bb</span></div>
                <div className="type-body-specimen">
                    The intersection of ancient attention and machine intelligence —
                    not as contradiction, but as the same inquiry wearing different clothes.
                </div>
                <div className="type-mono-specimen">
                    &gt; const self = await observe(mind);<br />
                    &gt; // lindy wins again
                </div>
            </div>
            <div>
                <div className="type-meta">Body — Crimson Pro 300 / Mono — JetBrains Mono 300</div>
            </div>
        </div>
    );
}
