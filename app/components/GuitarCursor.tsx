"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const GuitarCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    
    if (!cursor || !dot) return;

    // ultra-smooth GSAP physics
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3.out" });
    
    const dotXTo = gsap.quickTo(dot, "x", { duration: 0.05, ease: "none" });
    const dotYTo = gsap.quickTo(dot, "y", { duration: 0.05, ease: "none" });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      dotXTo(e.clientX);
      dotYTo(e.clientY);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-pointer")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHover);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        body {
          cursor: none !important;
        }
        a, button, [role="button"], .cursor-pointer {
          cursor: none !important;
        }
      `}</style>
      
      {/* Precision Core Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-gold rounded-full z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 hidden md:block shadow-[0_0_15px_#C9A84C]"
      />

      {/* Luxury Glass Circle Follower */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2 hidden md:block"
      >
        <div 
          className={`relative flex items-center justify-center transition-all duration-700 ease-[0.16,1,0.3,1] ${isHovering ? "w-28 h-28" : "w-12 h-12"}`}
        >
          {/* Main Glass Body */}
          <div className={`absolute inset-0 rounded-full border border-white/30 backdrop-blur-xl bg-white/5 transition-all duration-700 ${isHovering ? "bg-gold/10 border-gold/60 shadow-[0_0_30px_rgba(201,168,76,0.3)]" : "shadow-2xl"}`}></div>
          
          {/* Subtle Inner Glow */}
          <div className={`absolute inset-2 rounded-full border border-white/5 transition-opacity duration-700 ${isHovering ? "opacity-100" : "opacity-0"}`}></div>
          
          {/* Outer Aura */}
          <div className={`absolute -inset-4 rounded-full border border-gold/5 transition-all duration-1000 ${isHovering ? "scale-110 opacity-100" : "scale-50 opacity-0"}`}></div>
        </div>
      </div>
    </>
  );
};

export default GuitarCursor;
