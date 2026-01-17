import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [shake, setShake] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from('.contact-title-line', {
        y: 80,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });

      gsap.from('.contact-field', {
        x: -80,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });

      gsap.to('.contact-sweep', {
        xPercent: 140,
        duration: 3.1,
        repeat: -1,
        ease: 'none',
      });

      gsap.to('.contact-grid', {
        backgroundPosition: '120px 200px',
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'none',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    
    // Simulate API
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      data-scene="contact"
      className="min-h-screen bg-black text-white px-6 md:px-12 py-24 flex flex-col justify-between border-t-8 border-acid relative scroll-mt-24 overflow-hidden"
    >
      <div className="contact-grid absolute inset-0 opacity-20 pointer-events-none"
           style={{
             backgroundImage: 'linear-gradient(#222 1px, transparent 1px), linear-gradient(90deg, #222 1px, transparent 1px)',
             backgroundSize: '48px 48px'
           }}
      />
      <div className="absolute inset-0 pointer-events-none">
        <div className="contact-sweep absolute -left-full top-24 h-[2px] w-1/2 bg-acid/40 mix-blend-screen" />
      </div>
      <div className="absolute top-0 left-0 bg-acid text-black px-4 py-1 font-bold font-mono">
        CONTACT_PROTOCOL
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10">
        <h2 className="text-7xl md:text-9xl font-black uppercase mb-12 tracking-tighter">
          <span className="contact-title-line block">Get</span>
          <span className="contact-title-line block">
            <span className="text-stroke-black text-transparent md:text-stroke">Loud</span>
          </span>
        </h2>

        <AnimatePresence mode="wait">
          {formState === 'success' ? (
             <motion.div
                key="success"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-acid text-black p-12 border-4 border-white transform rotate-2 text-center"
             >
                <h3 className="text-6xl font-black uppercase mb-4">STAMPED: SENT</h3>
                <p className="font-mono text-xl">We will invade your inbox shortly.</p>
                <button 
                  onClick={() => setFormState('idle')}
                  className="mt-8 px-8 py-3 bg-black text-white font-bold uppercase hover:bg-white hover:text-black transition-colors"
                >
                  Reset Form
                </button>
             </motion.div>
          ) : (
            <motion.form 
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 50 }}
                animate={{ 
                    opacity: 1, 
                    y: 0, 
                    x: shake ? [-10, 10, -10, 10, 0] : 0 
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring" }}
                className="space-y-8"
            >
              <div className="contact-field group relative">
                <label className="block font-mono text-xs uppercase mb-2 text-gray-500 group-focus-within:text-acid">Identity</label>
                <input 
                  type="text" 
                  required 
                  className="w-full bg-transparent border-b-4 border-gray-800 py-4 text-2xl font-bold uppercase focus:outline-none focus:border-acid transition-colors rounded-none placeholder-gray-800"
                  placeholder="NAME OR ALIAS"
                />
              </div>

              <div className="contact-field group relative">
                <label className="block font-mono text-xs uppercase mb-2 text-gray-500 group-focus-within:text-acid">Signal Frequency</label>
                <input 
                  type="email" 
                  required 
                  className="w-full bg-transparent border-b-4 border-gray-800 py-4 text-2xl font-bold uppercase focus:outline-none focus:border-acid transition-colors rounded-none placeholder-gray-800"
                  placeholder="EMAIL_ADDRESS"
                />
              </div>

              <div className="contact-field group relative">
                <label className="block font-mono text-xs uppercase mb-2 text-gray-500 group-focus-within:text-acid">Transmission</label>
                <textarea 
                  rows={4} 
                  required 
                  className="w-full bg-transparent border-b-4 border-gray-800 py-4 text-2xl font-bold uppercase focus:outline-none focus:border-acid transition-colors rounded-none resize-none placeholder-gray-800"
                  placeholder="YOUR_MESSAGE"
                />
              </div>

              <div className="pt-8 flex justify-end">
                <button 
                  type="submit" 
                  onClick={() => !document.querySelector('form')?.checkValidity() && triggerShake()}
                  className="relative px-16 py-6 bg-white text-black font-black text-2xl uppercase tracking-tighter border-2 border-transparent hover:bg-acid hover:border-black transition-all shadow-[8px_8px_0px_0px_#333] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[6px_6px_0px_0px_#333] active:translate-x-[8px] active:translate-y-[8px] active:shadow-none"
                >
                    {formState === 'submitting' ? 'TRANSMITTING...' : 'INITIATE CONTACT'}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
      
      <div className="absolute bottom-6 left-6 font-mono text-xs text-gray-600">
        LAT: 34.0522 N / LON: 118.2437 W
      </div>
    </section>
  );
};

export default ContactSection;
