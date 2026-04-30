"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3200); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
          className="fixed inset-0 z-[10000] bg-[#030304] flex flex-col justify-center items-center overflow-hidden"
        >
          {/* Focused Spotlight */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 0.3, 0.2], scale: 1.2 }}
            transition={{ duration: 2 }}
            className="absolute w-[500px] h-[500px] bg-gold/40 rounded-full blur-[100px]"
          />

          <div className="relative flex flex-col items-center max-w-[120px] w-full">
            {/* Elegant Miniature 'Sahi Wala' Stratocaster */}
            <motion.div
              initial={{ y: 30, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full aspect-[1/3.5] flex items-center justify-center"
            >
              <svg viewBox="0 0 100 350" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_30px_rgba(201,168,76,0.6)]">
                <rect x="46" y="30" width="8" height="200" fill="#111" />
                <path d="M44,30 C40,20 40,5 50,0 C60,5 60,20 56,30 Z" fill="#111" />
                
                {Array.from({ length: 6 }).map((_, i) => (
                  <circle key={i} cx={58} cy={5 + (i * 5)} r="1.5" fill="#C9A84C" />
                ))}

                <motion.path 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.4, ease: "easeInOut" }}
                  d="M50,210 C75,210 95,235 95,270 C95,310 70,340 50,340 C30,340 5,310 5,270 C5,235 25,210 50,210" 
                  fill="#000" stroke="#C9A84C" strokeWidth="1.2" 
                />
                
                <motion.path 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  d="M45,220 C55,220 75,235 75,275 C75,310 60,330 45,330 C30,330 20,310 20,275 C20,235 35,220 45,220" 
                  fill="#F5F5F5" opacity="0.95" 
                />

                {[245, 265, 285].map((y, i) => (
                  <rect key={i} x="38" y={y} width="24" height="6" rx="3" fill="#111" stroke="#C9A84C" strokeWidth="0.5" />
                ))}

                <rect x="42" y="305" width="16" height="12" rx="2" fill="#555" stroke="#C9A84C" strokeWidth="0.5" />

                <circle cx="70" cy="295" r="4" fill="#111" stroke="#C9A84C" strokeWidth="0.5" />
                <circle cx="65" cy="315" r="4" fill="#111" stroke="#C9A84C" strokeWidth="0.5" />

                {Array.from({ length: 21 }).map((_, i) => (
                  <line key={i} x1="46" y1={40 + (i * 8)} x2="54" y2={40 + (i * 8)} stroke="#C9A84C" strokeWidth="0.3" opacity="0.4" />
                ))}

                {[-2, -1, -0.3, 0.3, 1, 2].map((offset, i) => (
                  <motion.line 
                    key={i}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 0.8 }}
                    x1={50 + offset} y1="10" x2={50 + offset} y2="310" stroke="#FFF" strokeWidth="0.1" opacity="0.5" 
                  />
                ))}
              </svg>

              {/* Energy Pulse */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1.8, opacity: [0, 0.25, 0] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="absolute inset-0 border border-gold/40 rounded-full"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="mt-12 text-center"
            >
              <div className="flex flex-col items-center">
                <h2 className="font-display text-2xl font-bold text-gold tracking-[0.6em] uppercase leading-none">NextNote</h2>
                <h3 className="font-display text-xl font-light text-silver/60 tracking-[0.4em] uppercase mt-2">Studio</h3>
              </div>
              <div className="h-[1px] w-12 bg-gold/30 mx-auto mt-6"></div>
            </motion.div>
          </div>
          
          {/* Minimalist Progress Trace */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-40 h-[1px] bg-white/5">
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 3.2, ease: "linear" }}
              className="w-full h-full bg-gold/40 origin-left"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
