import React, { useLayoutEffect, useRef } from 'react';
import { createLaunchAnimations } from '../animations/launchAnimations';

const LaunchPage: React.FC = () => {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    return createLaunchAnimations(rootRef.current);
  }, []);

  return (
    <section
      ref={rootRef}
      data-scene="launch"
      className="min-h-screen relative overflow-hidden bg-paper text-ink px-6 md:px-12 pt-36 pb-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(201,255,59,0.18),_transparent_55%)]" />
      <div className="absolute -top-32 right-0 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-white/60 blur-3xl" />
      <div className="launch-grid absolute inset-0 opacity-25 pointer-events-none"
           style={{
             backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)',
             backgroundSize: '80px 80px',
           }}
      />

      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={`stripe-${index}`}
            className="launch-stripe absolute top-0 h-full w-1 rounded-full bg-black/5"
            style={{ left: `${index * 10}%` }}
          />
        ))}
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={`raster-${index}`}
            className="launch-raster absolute left-0 right-0 h-[2px] rounded-full bg-black/5"
            style={{ top: `${12 + index * 12}%` }}
          />
        ))}
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={`spark-${index}`}
            className="launch-spark absolute w-2 h-2 rounded-full bg-accent/70"
            style={{
              top: `${15 + index * 12}%`,
              left: `${8 + index * 14}%`,
            }}
          />
        ))}
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={`drift-${index}`}
            className="launch-drift absolute w-20 h-6 border border-black/10 rounded-full"
            style={{ top: `${8 + index * 16}%`, right: `${10 + index * 12}%` }}
          />
        ))}
        <div className="launch-sweep absolute -left-full top-1/3 h-[2px] w-1/2 rounded-full bg-accent/50 mix-blend-multiply" />
        <div className="launch-flare absolute top-20 right-24 w-28 h-28 border border-black/10 rounded-full" />
        <div className="launch-shimmer absolute bottom-10 left-10 w-48 h-[2px] rounded-full bg-black/10" />
        <div className="launch-edge-blink absolute top-8 left-6 h-10 w-10 border border-black/10 rounded-2xl" />
        <div className="launch-edge-blink absolute bottom-8 right-6 h-10 w-10 border border-black/10 rounded-2xl" />
      </div>

      <div className="launch-orbit absolute inset-0 pointer-events-none">
        <div className="launch-orbit-ring absolute top-20 right-10 w-64 h-64 rounded-full border border-black/10" />
        <div className="launch-orbit-ring absolute bottom-10 left-20 w-80 h-80 rounded-full border border-black/5" />
        <div className="launch-orbit-ring absolute top-1/2 left-1/2 w-[520px] h-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/5" />
      </div>

      <div className="absolute top-28 left-6 md:left-12 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.4em] text-ink/60">
        <span className="launch-kicker">Ayansh Singh Studio</span>
        <span className="launch-glitch text-ink/40">2024</span>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="space-y-2">
          <h1 className="launch-title-line text-[11vw] leading-[0.9] font-black tracking-tight text-ink drop-shadow-[0_16px_30px_rgba(16,17,17,0.12)]">
            Designing
          </h1>
          <h1 className="launch-title-line text-[11vw] leading-[0.9] font-black tracking-tight text-transparent text-stroke drop-shadow-[0_16px_30px_rgba(16,17,17,0.12)]">
            Curved
          </h1>
          <h1 className="launch-title-line text-[11vw] leading-[0.9] font-black tracking-tight text-ink drop-shadow-[0_16px_30px_rgba(16,17,17,0.12)]">
            Digital
          </h1>
        </div>

        <p className="launch-subtitle mt-8 max-w-2xl font-mono text-lg md:text-2xl text-ink/70">
          Ayansh Singh builds modern, rounded interfaces and motion-first brand systems for bold teams.
        </p>

        <div className="mt-12 flex flex-wrap gap-6">
          <button className="launch-action rounded-full px-10 py-4 bg-accent text-ink font-semibold tracking-tight shadow-[0_16px_30px_rgba(201,255,59,0.25)]">
            Start a project
          </button>
          <button className="launch-action rounded-full px-10 py-4 border border-black/10 text-ink font-semibold tracking-tight bg-white/70">
            View studio deck
          </button>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {['Product Design', 'Motion Systems', 'Brand Direction'].map((label, index) => (
            <div
              key={label}
              className="launch-stat launch-parallax rounded-3xl border border-black/5 bg-white/70 p-5 backdrop-blur"
              data-depth={0.12 + index * 0.06}
            >
              <div className="flex items-center justify-between text-xs uppercase font-mono text-ink/60">
                <span>{label}</span>
                <span className="text-ink/50">{`0${index + 1}`}</span>
              </div>
              <div className="mt-4 h-1.5 bg-black/10 rounded-full overflow-hidden">
                <div className="launch-meter-fill h-full bg-accent rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="launch-rail absolute bottom-8 left-6 right-6 h-[2px] bg-black/10 rounded-full">
        <div className="launch-rail-dot absolute -top-2 left-0 w-2.5 h-2.5 rounded-full bg-accent" />
        <div className="launch-rail-dot absolute -top-2 left-1/3 w-2.5 h-2.5 rounded-full bg-accent" />
        <div className="launch-rail-dot absolute -top-2 left-2/3 w-2.5 h-2.5 rounded-full bg-accent" />
        <div className="launch-rail-dot absolute -top-2 right-0 w-2.5 h-2.5 rounded-full bg-accent" />
      </div>
    </section>
  );
};

export default LaunchPage;
