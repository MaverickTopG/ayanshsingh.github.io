import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const DOT_COUNT = 14;

const CursorTrail: React.FC = () => {
  const dotsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const dots = dotsRef.current;
    if (!dots.length) return;

    const startX = window.innerWidth / 2;
    const startY = window.innerHeight / 2;

    const positions = dots.map(() => ({ x: startX, y: startY }));
    const mouse = { x: startX, y: startY };

    const onMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const onLeave = () => {
      mouse.x = window.innerWidth / 2;
      mouse.y = window.innerHeight / 2;
    };

    const tick = () => {
      positions[0].x += (mouse.x - positions[0].x) * 0.35;
      positions[0].y += (mouse.y - positions[0].y) * 0.35;

      for (let i = 1; i < positions.length; i += 1) {
        positions[i].x += (positions[i - 1].x - positions[i].x) * 0.35;
        positions[i].y += (positions[i - 1].y - positions[i].y) * 0.35;
      }

      positions.forEach((pos, index) => {
        const scale = 1 - index * 0.045;
        const opacity = 0.65 - index * 0.04;
        gsap.set(dots[index], {
          x: pos.x,
          y: pos.y,
          scale,
          opacity: Math.max(opacity, 0),
        });
      });
    };

    dots.forEach((dot) => gsap.set(dot, { x: startX, y: startY }));

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    gsap.ticker.add(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {Array.from({ length: DOT_COUNT }).map((_, index) => (
        <div
          key={`trail-${index}`}
          ref={(el) => {
            if (el) dotsRef.current[index] = el;
          }}
          className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: `${10 - index * 0.3}px`,
            height: `${10 - index * 0.3}px`,
            background: 'radial-gradient(circle, rgba(201,255,59,0.9) 0%, rgba(201,255,59,0.2) 60%, rgba(201,255,59,0) 100%)',
            mixBlendMode: 'multiply',
          }}
        />
      ))}
    </div>
  );
};

export default CursorTrail;
