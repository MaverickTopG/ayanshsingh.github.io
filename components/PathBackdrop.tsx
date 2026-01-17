import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);

const PathBackdrop: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const paths = gsap.utils.toArray<SVGPathElement>('.path-line');
      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: 'none',
        });
      });

      gsap.to('.path-runner', {
        duration: 10,
        repeat: -1,
        ease: 'none',
        motionPath: {
          path: '#path-main',
          align: '#path-main',
          autoRotate: false,
          alignOrigin: [0.5, 0.5],
        },
      });

      gsap.to('.path-runner-secondary', {
        duration: 12,
        repeat: -1,
        ease: 'none',
        motionPath: {
          path: '#path-secondary',
          align: '#path-secondary',
          autoRotate: false,
          alignOrigin: [0.5, 0.5],
        },
      });

      gsap.to('.path-blob', {
        x: (index) => (index % 2 === 0 ? 40 : -40),
        y: (index) => (index % 2 === 0 ? -30 : 30),
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.4,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="fixed inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-paper to-mist" />
      <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-3xl" />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
      >
        <path
          id="path-main"
          className="path-line"
          d="M -50 200 C 200 100 360 260 520 180 C 700 80 900 120 1250 60"
          fill="none"
          stroke="rgba(16,17,17,0.12)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          id="path-secondary"
          className="path-line"
          d="M -80 520 C 180 560 380 420 600 520 C 820 620 980 560 1240 600"
          fill="none"
          stroke="rgba(16,17,17,0.08)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          className="path-line"
          d="M -40 360 C 240 320 360 380 520 340 C 720 280 900 320 1240 260"
          fill="none"
          stroke="rgba(16,17,17,0.06)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle className="path-runner" r="8" fill="rgba(201,255,59,0.6)" />
        <circle className="path-runner-secondary" r="6" fill="rgba(16,17,17,0.35)" />
      </svg>
      <div className="absolute inset-0">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={`blob-${index}`}
            className="path-blob absolute rounded-full bg-white/60 border border-white/40 shadow-[0_20px_60px_rgba(16,17,17,0.08)]"
            style={{
              width: `${120 + index * 12}px`,
              height: `${120 + index * 12}px`,
              top: `${8 + index * 12}%`,
              left: `${10 + index * 12}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default PathBackdrop;
