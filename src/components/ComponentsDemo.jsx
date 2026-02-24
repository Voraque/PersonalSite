import './ComponentsDemo.css';

export default function ComponentsDemo() {
    return (
        <div className="panel panel-components">
            <div className="component-group">
                <div className="component-label">Navigation</div>
                <span className="demo-nav-link">Writing</span>
                <span className="demo-nav-link">Photography</span>
                <span className="demo-nav-link">Projects</span>
                <span className="demo-nav-link">About</span>
            </div>

            <div className="component-group">
                <div className="component-label">Buttons</div>
                <button className="demo-btn">Read essay →</button>
                <button className="demo-btn demo-btn-solid">View gallery</button>
            </div>

            <div className="component-group">
                <div className="component-label">Input</div>
                <input className="demo-input" placeholder="Search writing..." />
                <div className="demo-rule" style={{ marginTop: '8px' }}></div>
            </div>

            <div className="component-group">
                <div className="component-label">Tags / Progress</div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', maxWidth: '200px' }}>
                    <span className="demo-tag">AI</span>
                    <span className="demo-tag">Photography</span>
                    <span className="demo-tag">Zen</span>
                </div>
                <div style={{ marginTop: '12px' }}>
                    <div className="type-meta" style={{ marginBottom: '8px' }}>Reading progress</div>
                    <div className="demo-progress"></div>
                </div>
            </div>

            <div className="component-group" style={{ marginLeft: 'auto' }}>
                <div className="component-label">Light leak / prismatic</div>
                <div className="prismatic-demo">
                    <div className="prismatic-blur"></div>
                    <div className="prismatic-texture"></div>
                </div>
                <div className="type-meta" style={{ marginTop: '8px' }}>Prismatic / refraction accent</div>
            </div>
        </div>
    );
}
