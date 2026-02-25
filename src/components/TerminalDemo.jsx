import React, { useState, useEffect } from 'react';
import './TerminalDemo.css';

const COMMANDS = [
    { text: "> init system...", delay: 500 },
    { text: "> loading organic interface", delay: 1500 },
    { text: "> bypass optical limits", delay: 2800 },
    { text: "> [OK] visual cortex engaged", delay: 3500 },
];

export default function TerminalDemo() {
    const [lines, setLines] = useState([]);

    useEffect(() => {
        // Simulate a simple typing sequence
        const timers = COMMANDS.map((cmd, idx) =>
            setTimeout(() => {
                setLines(prev => [...prev, cmd.text]);
            }, cmd.delay)
        );

        return () => timers.forEach(t => clearTimeout(t));
    }, []);

    return (
        <div className="panel panel-terminal">
            <div className="terminal-header">
                <span className="terminal-title">TERMINAL SESSION v2.0.26</span>
                <span className="terminal-status">ONLINE</span>
            </div>

            <div className="terminal-body">
                {lines.map((line, idx) => (
                    <div key={idx} className="terminal-line">{line}</div>
                ))}
                {/* Blinking cursor */}
                <div className="terminal-line terminal-cursor-line">
                    <span className="prompt">&gt; </span>
                    <span className="cursor">█</span>
                </div>
            </div>

            <div className="terminal-overlay"></div>
        </div>
    );
}
