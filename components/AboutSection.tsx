import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
        }
      });

      // Scale text down and reveal content
      tl.to(textRef.current, {
        scale: 0.45,
        opacity: 0.15,
        y: -140,
        rotation: -3,
        filter: 'blur(12px)'
      })
      .to(textRef.current, {
        letterSpacing: '0.15em',
        duration: 0.6,
      }, "<")
      .from(cardRef.current, {
        y: 900,
        rotation: 18,
        scale: 0.75,
        opacity: 0,
        clipPath: 'inset(0 0 100% 0)',
      }, "<")
      .to(cardRef.current, {
        rotation: -6,
        y: -80,
        boxShadow: '28px 28px 0px 0px rgba(0,0,0,0.5)',
      }, "<+=0.15");

      gsap.to(".about-warning", {
        x: () => gsap.utils.random(-6, 6),
        rotation: () => gsap.utils.random(-4, 4),
        duration: 0.2,
        repeat: -1,
        repeatDelay: 1.1,
        yoyo: true
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="manifesto"
      data-scene="manifesto"
      className="h-screen w-full bg-acid text-black overflow-hidden relative flex items-center justify-center scroll-mt-24"
    >
      {/* Huge Background Text */}
      <div ref={textRef} className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h2 className="text-[30vw] font-black uppercase tracking-tighter leading-none opacity-80 whitespace-nowrap">
          Manifesto
        </h2>
      </div>

      {/* Foreground Content Card */}
      <div ref={cardRef} className="relative z-10 bg-black text-white p-8 md:p-16 max-w-2xl border-4 border-white shadow-[16px_16px_0px_0px_rgba(255,255,255,0.2)] transform -rotate-2">
        <div className="about-warning absolute -top-6 -left-6 bg-white text-black px-4 py-2 font-black text-xl transform rotate-3 border-2 border-black">
          TRUTH_01
        </div>
        
        <h3 className="text-4xl md:text-5xl font-bold uppercase mb-8 leading-tight">
          We reject the clean. <br/>
          We embrace the <span className="text-acid italic">raw</span>.
        </h3>
        
        <p className="font-mono text-lg leading-relaxed mb-6">
          Modern web design is asleep. We are the alarm. Utilizing physics-based motion, raw WebGL rendering, and brutalist typography to create digital experiences that don't just sit there—they attack.
        </p>

        <div className="flex gap-4 mt-8">
            <div className="w-full h-2 bg-gray-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-acid animate-pulse w-2/3"></div>
            </div>
            <span className="font-mono text-xs self-center text-acid">LOADING_TRUTH...</span>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
