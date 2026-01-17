import React, { useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { AnimatePresence, motion } from 'framer-motion';

const ProjectList: React.FC = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from('.project-heading', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });

      gsap.to('.project-scan', {
        xPercent: 140,
        duration: 3.2,
        repeat: -1,
        ease: 'none',
      });

      const items = gsap.utils.toArray<HTMLElement>('.project-item');
      items.forEach((item, index) => {
        gsap.from(item, {
          x: -80,
          opacity: 0,
          skewX: 8,
          duration: 0.9,
          ease: 'power3.out',
          delay: index * 0.05,
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Setup Image Follower logic
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const preview = previewRef.current;
      
      const xSet = gsap.quickSetter(preview, "x", "px");
      const ySet = gsap.quickSetter(preview, "y", "px");
      const rSet = gsap.quickSetter(preview, "rotation", "deg");
      const sSet = gsap.quickSetter(preview, "scale");
      let lastX = 0;
      let lastY = 0;

      const onMove = (e: MouseEvent) => {
        if (!activeProject) return;
        
        // Offset logic to place image near cursor but not under it
        xSet(e.clientX + 20);
        ySet(e.clientY - 100);
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        rSet(gsap.utils.clamp(-12, 12, dx * 0.12));
        sSet(1 + Math.min(Math.abs(dy) / 400, 0.06));
        lastX = e.clientX;
        lastY = e.clientY;
      };

      window.addEventListener("mousemove", onMove);

      return () => {
        window.removeEventListener("mousemove", onMove);
      };
    }, listRef);

    return () => ctx.revert();
  }, [activeProject]);

  return (
    <section
      ref={sectionRef}
      id="works"
      data-scene="works"
      className="py-24 px-6 md:px-12 bg-concrete relative z-20 scroll-mt-24 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="project-scan absolute -left-full top-20 h-[2px] w-1/2 bg-acid/50 mix-blend-screen" />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center gap-4 mb-12 project-heading">
            <div className="w-8 h-8 bg-acid"></div>
            <h2 className="text-6xl font-black uppercase tracking-tighter">Selected Works</h2>
        </div>

        <ul ref={listRef} className="space-y-0">
          {PROJECTS.map((project) => (
            <li 
              key={project.id}
              className="project-item relative group border-t-2 border-white/20 hover:border-acid transition-colors duration-300"
              onMouseEnter={() => setActiveProject(project)}
              onMouseLeave={() => setActiveProject(null)}
            >
              <div className="flex flex-col md:flex-row items-baseline justify-between py-12 px-4 cursor-pointer">
                <h3 className="text-4xl md:text-7xl font-bold uppercase tracking-tighter group-hover:text-acid group-hover:pl-8 transition-all duration-300 ease-out">
                  {project.title}
                </h3>
                <div className="flex items-center gap-8 font-mono text-sm md:text-lg text-gray-400 group-hover:text-white mt-4 md:mt-0">
                   <span>{project.category}</span>
                   <span>{project.year}</span>
                </div>
              </div>
            </li>
          ))}
          <li className="border-t-2 border-white/20"></li>
        </ul>

        {/* Floating Preview Image */}
        <AnimatePresence>
            {activeProject && (
                <div 
                    ref={previewRef}
                    className="fixed top-0 left-0 w-[400px] h-[300px] pointer-events-none z-50 overflow-hidden border-4 border-acid bg-black hidden md:block"
                >
                    <motion.div
                         initial={{ scale: 1.5, opacity: 0 }}
                         animate={{ scale: 1, opacity: 1 }}
                         exit={{ scale: 0.8, opacity: 0 }}
                         transition={{ duration: 0.3 }}
                         className="w-full h-full"
                    >
                         <img 
                            src={activeProject.image} 
                            alt={activeProject.title} 
                            className="w-full h-full object-cover filter grayscale contrast-125"
                         />
                         <div className="absolute inset-0 bg-acid mix-blend-multiply opacity-40"></div>
                         <div className="absolute bottom-2 right-2 bg-black text-white px-2 font-mono text-xs">
                             IMG_PREV_0{activeProject.id}
                         </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectList;
