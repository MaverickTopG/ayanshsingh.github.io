import React from 'react';
import { motion } from 'framer-motion';

interface IntroOverlayProps {
  onComplete: () => void;
}

const IntroOverlay: React.FC<IntroOverlayProps> = ({ onComplete }) => {
  return (
    <motion.div
      className="fixed inset-0 z-[999] bg-acid flex items-center justify-center overflow-hidden"
      initial={{ y: 0 }}
      animate={{ y: '-100%' }}
      transition={{ 
        duration: 0.8, 
        ease: [0.76, 0, 0.24, 1], 
        delay: 2.5 
      }}
      onAnimationComplete={onComplete}
    >
      <div className="relative">
        <motion.div
          className="text-9xl font-black text-black tracking-tighter uppercase"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "backOut" }}
        >
          Brutal
        </motion.div>
        
        <motion.div
          className="absolute -bottom-8 right-0 bg-black text-white px-4 py-1 text-xl font-mono font-bold transform -rotate-2"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
        >
          ENGINE_V1
        </motion.div>

        {/* Loading Bar */}
        <motion.div 
          className="absolute -bottom-20 left-0 h-4 bg-black w-full"
          initial={{ scaleX: 0, transformOrigin: "left" }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, ease: "circInOut" }}
        />
        
        {/* Scramble Text Effect */}
        <motion.div
           className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none"
           initial={{ opacity: 0 }}
           animate={{ opacity: [0, 1, 0, 1, 0] }}
           transition={{ duration: 0.5, times: [0, 0.2, 0.4, 0.6, 1] }}
        >
            <div className="w-full h-[2px] bg-white opacity-50 mix-blend-difference"></div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default IntroOverlay;