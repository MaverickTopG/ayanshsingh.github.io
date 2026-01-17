import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const comp = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Slam Title
      tl.from(".hero-title-line", {
        y: 200,
        skewY: 10,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.5 // Wait for intro
      });

      // Subhead scramble (simulated with opacity/x jitter)
      tl.from(".hero-subhead", {
        x: -20,
        opacity: 0,
        duration: 0.8,
        ease: "rough({ template: none.out, strength: 1, points: 20, taper: 'none', randomize: true, clamp: false})",
        clearProps: "all"
      }, "-=0.5");

      // CTA Button
      tl.from(".hero-cta", {
        scale: 0,
        rotation: -45,
        duration: 0.5,
        ease: "back.out(1.7)"
      }, "-=0.3");

      gsap.to(".hero-scan", {
        xPercent: 140,
        duration: 2.6,
        repeat: -1,
        ease: "none"
      });

      gsap.to(".hero-grid", {
        backgroundPosition: "160px 220px",
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "none"
      });

      gsap.to(".hero-title-line", {
        yPercent: -18,
        rotation: -1,
        scrollTrigger: {
          trigger: comp.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6
        }
      });

      gsap.to(".hero-subhead", {
        yPercent: 10,
        opacity: 0.6,
        scrollTrigger: {
          trigger: comp.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6
        }
      });

    }, comp);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={comp}
      id="hero"
      data-scene="hero"
      className="min-h-screen flex flex-col justify-center px-6 md:px-12 pt-32 relative overflow-hidden bg-void scroll-mt-24"
    >
       {/* Background Grid */}
       <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="hero-grid w-full h-full"
               style={{ 
                 backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', 
                 backgroundSize: '40px 40px' 
               }}>
          </div>
       </div>

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="hero-scan absolute -left-full top-1/3 h-[2px] w-1/2 bg-acid/60 mix-blend-screen" />
      </div>

      <div className="z-10 max-w-7xl mx-auto w-full">
        <div className="overflow-hidden mb-2">
            <h1 className="hero-title-line text-[15vw] leading-[0.8] font-black uppercase tracking-tighter mix-blend-difference text-white">
                Creative
            </h1>
        </div>
        <div className="overflow-hidden mb-2">
            <h1 className="hero-title-line text-[15vw] leading-[0.8] font-black uppercase tracking-tighter text-transparent text-stroke hover:text-acid transition-colors duration-300">
                Violence
            </h1>
        </div>
        <div className="overflow-hidden mb-12">
            <h1 className="hero-title-line text-[15vw] leading-[0.8] font-black uppercase tracking-tighter text-white">
                Studio
            </h1>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-t-2 border-white pt-8">
            <p className="hero-subhead font-mono text-xl md:text-2xl max-w-lg mb-8 md:mb-0">
                // SYSTEM_READY<br/>
                // DEPLOYING_CHAOS_ENGINES...<br/>
                // WE BREAK GRIDS TO FIX BOREDOM.
            </p>

            <button className="hero-cta group relative px-12 py-6 bg-white text-black font-black text-2xl uppercase tracking-tighter border-2 border-transparent hover:border-acid hover:text-acid hover:bg-black transition-all duration-100 shadow-[8px_8px_0px_0px_rgba(204,255,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none">
                <span className="relative z-10">Initiate Project</span>
                <div className="absolute inset-0 bg-acid scale-x-0 group-hover:scale-x-100 transition-transform origin-left z-0 mix-blend-difference"></div>
            </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
