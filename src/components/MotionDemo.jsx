import './MotionDemo.css';

export default function MotionDemo() {
    return (
        <div className="panel panel-motion">
            <div className="motion-line"></div>
            <div className="motion-item">
                <div className="motion-label">Principle 01</div>
                <div className="motion-description"><em>Slow</em> by default.<br />Glitch is the interrupt.</div>
            </div>
            <div className="motion-divider"></div>
            <div className="motion-item">
                <div className="motion-label">Principle 02</div>
                <div className="motion-description">Photography breathes.<br /><em>Form</em> does not compete.</div>
            </div>
            <div className="motion-divider"></div>
            <div className="motion-item">
                <div className="motion-label">Principle 03</div>
                <div className="motion-description">Anchor scroll.<br /><em>Time</em> is a design material.</div>
            </div>
            <div className="motion-divider"></div>
            <div className="motion-item">
                <div className="motion-label">Principle 04</div>
                <div className="motion-description">Grain is honest.<br />Perfect is <em>suspect</em>.</div>
            </div>
        </div>
    );
}
