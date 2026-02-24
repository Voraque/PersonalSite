import { useEffect, useState } from 'react';
import './Cursor.css';

export default function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trailPos, setTrailPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let mx = 0, my = 0;
    
    const handleMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      setPosition({ x: mx, y: my });
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId;
    let tx = 0, ty = 0;

    const animateTrail = () => {
      tx += (mx - tx) * 0.12;
      ty += (my - ty) * 0.12;
      setTrailPos({ x: tx, y: ty });
      animationFrameId = requestAnimationFrame(animateTrail);
    };
    
    animateTrail();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div 
        className="cursor" 
        style={{ left: `${position.x}px`, top: `${position.y}px` }} 
      />
      <div 
        className="cursor-trail" 
        style={{ left: `${trailPos.x}px`, top: `${trailPos.y}px` }} 
      />
    </>
  );
}
