import React, { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const TopBar: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(barRef.current, {
        y: -24,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        delay: 0.15,
      }).from(
        '.topbar-item',
        {
          y: -10,
          opacity: 0,
          stagger: 0.06,
          duration: 0.5,
          ease: 'power3.out',
        },
        '-=0.4'
      );

      gsap.to(barRef.current, {
        backgroundColor: 'rgba(5,5,5,0.85)',
        borderBottomColor: 'rgba(204,255,0,0.6)',
        boxShadow: '0 8px 20px rgba(0,0,0,0.35)',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top+=20',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      });
    }, barRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const tick = () => {
      if (!timeRef.current) return;
      timeRef.current.textContent = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
    };
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <header ref={barRef} className="fixed top-4 left-0 right-0 z-40 px-4">
      <div className="relative mx-auto max-w-6xl rounded-full border border-black/5 bg-white/70 backdrop-blur-xl shadow-[0_20px_40px_rgba(16,17,17,0.08)]">
        <div className="px-5 md:px-8 py-3 flex items-center justify-between gap-6">
          <div className="topbar-item flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em]">
            <span className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_12px_rgba(201,255,59,0.8)]" />
            <span className="text-ink font-semibold">Ayansh Singh</span>
            <span className="text-ink/60">Studio</span>
          </div>

          <div className="hidden md:flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-ink/50">
            <span>Design</span>
            <span>·</span>
            <span>Motion</span>
            <span>·</span>
            <span>Brand</span>
          </div>

          <div className="topbar-item flex items-center gap-3 font-mono text-[11px] text-ink/60">
            <span className="text-ink/60">UTC</span>
            <span ref={timeRef} className="text-ink">--:--:--</span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(201,255,59,0.6)]" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
