import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const BrutalCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Setup physics
    const cursor = cursorRef.current;
    const ring = ringRef.current;

    if (!cursor || !ring) return;

    // Use quickSetter for performance
    const setCursorX = gsap.quickSetter(cursor, "x", "px");
    const setCursorY = gsap.quickSetter(cursor, "y", "px");
    const setRingX = gsap.quickSetter(ring, "x", "px");
    const setRingY = gsap.quickSetter(ring, "y", "px");

    const onMouseMove = (e: MouseEvent) => {
      setCursorX(e.clientX);
      setCursorY(e.clientY);
      
      // Ring lags behind slightly using GSAP interpolation in the animation loop
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out"
      });
    };

    const onMouseDown = () => {
      gsap.to([cursor, ring], { scale: 0.8, duration: 0.1 });
    };

    const onMouseUp = () => {
      gsap.to([cursor, ring], { scale: 1, duration: 0.1 });
    };

    const onHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering interactive elements
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', onHoverStart);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onHoverStart);
    };
  }, []);

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;

    if (isHovering) {
      gsap.to(ring, { 
        width: 88, 
        height: 88, 
        backgroundColor: 'rgba(204,255,0,0.18)',
        borderColor: '#CCFF00',
        boxShadow: '0 0 18px rgba(204,255,0,0.75), 0 0 0 2px rgba(0,0,0,0.8)',
        opacity: 0.95,
        duration: 0.25 
      });
    } else {
      gsap.to(ring, { 
        width: 40, 
        height: 40, 
        backgroundColor: 'transparent',
        borderColor: '#CCFF00',
        boxShadow: '0 0 12px rgba(204,255,0,0.6), 0 0 0 2px rgba(0,0,0,0.8)',
        opacity: 1,
        duration: 0.25 
      });
    }
  }, [isHovering]);

  return (
    <>
      <div 
        ref={ringRef} 
        className="fixed top-0 left-0 w-10 h-10 border-2 border-acid rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_12px_rgba(204,255,0,0.6),0_0_0_2px_rgba(0,0,0,0.8)]"
      />
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-acid rounded-none pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(204,255,0,0.9),0_0_0_2px_rgba(0,0,0,0.9)]"
      />
    </>
  );
};

export default BrutalCursor;
