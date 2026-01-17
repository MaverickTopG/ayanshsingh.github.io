import React, { useEffect, useRef } from 'react';

const NoiseOverlay: React.FC = () => {
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    let targetFx = 0.85;
    let targetFy = 0.85;
    let currentFx = 0.85;
    let currentFy = 0.85;
    let lastX = 0;
    let lastY = 0;

    const onMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth;
      const ny = e.clientY / window.innerHeight;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const speed = Math.min(Math.hypot(dx, dy), 80) / 80;

      targetFx = 0.5 + nx * 0.6 + speed * 0.2;
      targetFy = 0.5 + ny * 0.6 + speed * 0.2;
      lastX = e.clientX;
      lastY = e.clientY;
    };

    const tick = () => {
      currentFx += (targetFx - currentFx) * 0.08;
      currentFy += (targetFy - currentFy) * 0.08;
      if (turbulenceRef.current) {
        turbulenceRef.current.setAttribute(
          'baseFrequency',
          `${currentFx.toFixed(3)} ${currentFy.toFixed(3)}`
        );
      }
      frameRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    frameRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 opacity-[0.03] mix-blend-multiply">
      <svg className="w-full h-full">
        <filter id="noiseFilter">
          <feTurbulence 
            ref={turbulenceRef}
            type="fractalNoise" 
            baseFrequency="0.85" 
            numOctaves="3" 
            stitchTiles="stitch" 
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
};

export default NoiseOverlay;
