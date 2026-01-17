import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MARQUEE_TEXT } from '../constants';

gsap.registerPlugin(ScrollTrigger);

const Marquee: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      let xPercent = 0;
      let direction = -1;

      // Base speed
      const speed = 0.1;

      const animate = () => {
        if (xPercent <= -100) {
          xPercent = 0;
        }
        if (xPercent > 0) {
          xPercent = -100;
        }
        
        if(textRef.current) {
             gsap.set(textRef.current, { xPercent: xPercent });
        }
        
        requestAnimationFrame(animate);
        xPercent += speed * direction;
      };
      
      requestAnimationFrame(animate);

      // Scroll interaction to speed up
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          // Add velocity to xPercent temporarily or adjust direction
          // Here we create a simple skew effect on the container based on velocity
          gsap.to(containerRef.current, {
             skewX: velocity / 300,
             overwrite: true,
             duration: 0.1
          });
          
           // Adjust direction based on scroll direction
           direction = self.direction === 1 ? -1 : 1;
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden bg-acid py-4 border-y-4 border-black">
      <div ref={textRef} className="whitespace-nowrap flex w-[200%]">
        <span className="text-6xl md:text-8xl font-black text-black uppercase tracking-tighter mr-8">
           {MARQUEE_TEXT.repeat(4)}
        </span>
      </div>
    </div>
  );
};

export default Marquee;