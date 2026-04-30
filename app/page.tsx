"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Menu, ArrowRight, Music, MicVocal, SlidersHorizontal, 
  Users, GraduationCap, MapPin, Phone, Mail, MessageCircle, 
  Loader2, Mic, Laptop, Sliders, Speaker, Star, Film,
  Play, Volume2, Headphones, Activity, Disc
} from "lucide-react";
import type { Variants } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success">("idle");
  const [equalizerBars, setEqualizerBars] = useState<Array<{h: number, dur: number, dly: number, op: number}>>([]);

  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    
    // Generate equalizer bars on client mount
    const bars = Array.from({ length: 60 }, () => ({
      h: 10 + Math.random() * 90,
      dur: 0.5 + Math.random() * 1.5,
      dly: Math.random() * 2,
      op: Math.random() * 0.6 + 0.1
    }));
    setEqualizerBars(bars);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");
    setTimeout(() => {
      setFormStatus("success");
      setTimeout(() => setFormStatus("idle"), 5000);
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  const revealVariant: Variants = {
    hidden: { opacity: 0, y: 100 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 1.2, 
        ease: [0.16, 1, 0.3, 1], // Custom liquid cubic-bezier
        staggerChildren: 0.1
      } 
    }
  };

  return (
    <main className="relative overflow-hidden">
      {/* Global Noise Overlay */}
      <div className="bg-noise"></div>
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-700 py-6 px-10 flex justify-between items-center ${isScrolled ? "bg-primary/40 backdrop-blur-3xl py-4 shadow-2xl" : "bg-transparent"}`}>
        <a href="#" className="flex items-center gap-6 group">
          <div className="relative">
            <Image 
              src="/NextNote_Studio_Logo_Transparent.png" 
              alt="NextNote Studio Logo" 
              width={140} 
              height={60} 
              className="object-contain transition-all duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gold/5 blur-2xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-1000"></div>
          </div>
          <div className="flex flex-col border-l border-white/10 pl-6 hidden sm:flex">
            <div className="flex flex-col">
              <span className="font-display font-bold text-3xl tracking-[0.05em] uppercase text-gold group-hover:text-white transition-colors duration-500 leading-none">NextNote</span>
              <span className="font-display font-bold text-xl tracking-[0.3em] uppercase text-silver/80 mt-1">Studio</span>
            </div>
            <span className="text-[0.5rem] uppercase tracking-[0.6em] text-silver/30 font-sans mt-2">The Gold Standard</span>
          </div>
        </a>
        
        <div className="hidden md:flex gap-12 items-center text-[0.7rem] uppercase font-bold tracking-[0.25em]">
          {["Services", "About", "Lessons", "Team"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="relative group overflow-hidden py-1">
              <span className="relative z-10 hover:text-gold transition-colors duration-500">{item}</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
            </a>
          ))}
          <a href="#contact" className="btn-primary scale-90">Book Session</a>
        </div>

        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-gold focus:outline-none z-50">
          <Menu className="w-8 h-8" />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-primary/95 backdrop-blur-xl z-40 flex flex-col justify-center items-center gap-8 text-2xl font-display transform transition-transform duration-500 ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        {["Services", "About", "Lessons", "Team", "Contact"].map(item => (
          <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="mobile-link">{item}</a>
        ))}
      </div>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-primary">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-40 grayscale"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-recording-studio-with-a-man-singing-4328-large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/40 to-primary"></div>
        </div>
        
        <div className="absolute inset-0 bg-noise pointer-events-none z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(201,168,76,0.1),_transparent_70%)] animate-pulse pointer-events-none"></div>
        
        {/* Floating Elements */}
        <motion.div style={{ y: y1 }} className="absolute top-1/4 left-10 opacity-20 hidden md:block">
          <Music className="w-20 h-20 text-gold" />
        </motion.div>
        <motion.div style={{ y: y2 }} className="absolute bottom-1/4 right-20 opacity-10 hidden md:block">
          <Disc className="w-40 h-40 text-gold" />
        </motion.div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] border-[1px] border-gold/5 rounded-full pointer-events-none animate-[spin_60s_linear_infinite]"></div>

        <div className="absolute bottom-0 left-0 w-full h-1/2 flex justify-center items-end gap-[1px] opacity-20 pointer-events-none px-4">
          {equalizerBars.map((bar, i) => (
            <div key={i} className="flex-1 bg-gradient-to-t from-gold to-transparent rounded-t-full" style={{ height: `${bar.h}%`, animation: `equalizer-bar ${bar.dur}s ease-in-out ${bar.dly}s infinite alternate`, opacity: bar.op }} />
          ))}
        </div>

        <motion.div initial="hidden" animate="visible" variants={revealVariant} className="relative z-10 text-center px-6 max-w-6xl mx-auto flex flex-col items-center">
          <motion.div 
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.5, ease: "circOut" }}
            className="mb-8 h-[1px] w-40 bg-gold/50 mx-auto"
          />
          <div className="mb-6 inline-block border border-gold/20 rounded-full px-6 py-2 text-[0.6rem] tracking-[0.4em] uppercase text-gold/80 backdrop-blur-md shadow-glow-gold">
            Since 2026 &bull; Multi-Platinum Standards
          </div>
          <h1 className="font-display text-7xl md:text-[10rem] font-bold mb-8 text-white leading-none tracking-tight">
            <span className="block overflow-hidden pb-2">
              <motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="inline-block pr-4">NextNote</motion.span>
            </span>
            <span className="block overflow-hidden text-outline hover:text-gold transition-colors duration-700 pb-2">
              <motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.4 }} className="inline-block pr-4">Studios</motion.span>
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-silver/60 font-light tracking-[0.3em] mb-12 max-w-3xl mx-auto uppercase">
            Architecting the future of sound in Multan
          </p>
          <div className="flex flex-col sm:flex-row gap-10 items-center">
            <a href="#contact" className="btn-primary px-14 py-6 group overflow-hidden relative rounded-full">
              <span className="relative z-10">Start Your Project</span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </a>
            <a href="#services" className="group flex items-center gap-6 text-[0.7rem] tracking-[0.5em] uppercase text-gold/60 hover:text-gold transition-all">
              The Journey <div className="glass-circle scale-75 group-hover:scale-100 transition-all duration-500"><ArrowRight className="w-5 h-5" /></div>
            </a>
          </div>
        </motion.div>
      </section>

      {/* Stats Strip */}
      <section id="stats" className="py-16 bg-secondary border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center divide-x-0 md:divide-x divide-white/10">
          {[
            { v: "100+", l: "Songs Recorded" },
            { v: "4", l: "Instruments Taught" },
            { v: "Pro", l: "Grade Equipment" },
            { v: "∞", l: "Creative Possibilities" }
          ].map((stat, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVariant} className="p-4">
              <div className="font-display text-4xl md:text-5xl font-bold text-gold mb-2">{stat.v}</div>
              <div className="text-xs tracking-[0.2em] uppercase text-silver">{stat.l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-32 px-6 relative bg-primary">
        <div className="absolute top-0 right-0 p-20 text-outline text-9xl font-bold opacity-10 select-none hidden md:block">01</div>
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVariant} className="mb-24">
            <h2 className="section-title">Superior<br/>Capabilities</h2>
            <p className="mt-8 text-silver/40 tracking-[0.5em] uppercase text-xs">Everything you need to create greatness</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
            {[
              { title: "Analog Recording", icon: Mic, desc: "High-fidelity capture through premium signal chains.", step: "01" },
              { title: "Global Production", icon: Laptop, desc: "World-class arrangement for the modern ear.", step: "02" },
              { title: "Dynamic Mixing", icon: Sliders, desc: "Sculpting depth and clarity in every frequency.", step: "03" },
              { title: "Mastering", icon: Speaker, desc: "Ensuring peak performance on every sound system.", step: "04" },
              { title: "Artist Strategy", icon: Star, desc: "Building icons through sound and identity.", step: "05" },
              { title: "Cinematic OST", icon: Film, desc: "Visual storytelling through immersive audio.", step: "06" }
            ].map((srv, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: idx * 0.1 }}
                className="group relative p-12 bg-primary hover:bg-gold/5 transition-all duration-700 overflow-hidden"
              >
                <div className="absolute top-10 right-10 text-outline text-5xl font-bold opacity-10 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700">{srv.step}</div>
                <srv.icon className="w-12 h-12 text-gold mb-12 group-hover:scale-110 transition-transform duration-500" />
                <h3 className="font-display text-3xl font-bold mb-5 tracking-tight text-white group-hover:text-gold transition-colors">{srv.title}</h3>
                <p className="text-silver/40 text-sm leading-relaxed mb-10 font-sans">{srv.desc}</p>
                <a href="#contact" className="flex items-center gap-4 text-[0.65rem] tracking-[0.5em] uppercase text-gold/60 group-hover:text-gold transition-all duration-500">
                  Enquire Now <div className="glass-circle scale-50 group-hover:scale-75"><ArrowRight className="w-4 h-4" /></div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-secondary relative overflow-hidden">
        <div className="absolute top-0 left-0 p-20 text-outline text-9xl font-bold opacity-10 select-none hidden md:block">02</div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            style={{ y: y1 }}
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVariant} 
            className="relative group aspect-square lg:aspect-[4/5] rounded-[3rem] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gold/10 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-700"></div>
            <Image 
              src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop" 
              alt="Studio Interior"
              fill 
              className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-80"></div>
            <div className="absolute bottom-12 left-12 z-20">
              <div className="flex items-center gap-4 text-gold mb-2">
                <Music className="w-6 h-6" />
                <span className="text-[0.6rem] tracking-[0.5em] uppercase font-bold">The Vibe</span>
              </div>
              <h3 className="font-display text-4xl font-bold text-white uppercase tracking-tighter leading-none">Sonic<br/>Sanctuary</h3>
            </div>
          </motion.div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVariant}>
            <div className="flex items-center gap-6 mb-8 text-gold">
              <span className="h-px w-12 bg-gold/30"></span>
              <span className="text-[0.6rem] tracking-[0.5em] uppercase font-bold">Our Philosophy</span>
            </div>
            <h2 className="section-title text-left mb-12">Architects of<br/><span className="text-outline">Modern Sound</span></h2>
            <p className="text-silver/60 leading-relaxed mb-12 text-xl font-light tracking-wide">
              NextNote Studio is more than a facility; it's a multi-platinum vision realized in the heart of Multan. We engineer sonic experiences that transcend boundaries, blending analog warmth with digital precision.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-12">
              {[
                { text: "Acoustic Excellence", icon: Activity },
                { text: "Premium Signal Path", icon: Volume2 },
                { text: "Expert Mentorship", icon: Headphones },
                { text: "Industry Standard", icon: GraduationCap }
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-all duration-500">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[0.7rem] tracking-[0.2em] uppercase font-bold text-white mb-1">{item.text}</h4>
                    <p className="text-[0.6rem] text-silver/40 uppercase tracking-widest">Uncompromised quality</p>
                  </div>
                </div>
              ))}
            </div>
            
            <a href="#services" className="btn-secondary group flex items-center gap-6 px-10 py-5 rounded-full border-white/10 hover:border-gold/50">
              <span className="relative z-10">View All Specs</span> 
              <div className="glass-circle scale-75 group-hover:scale-100 transition-all duration-500">
                <ArrowRight className="w-5 h-5" />
              </div>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-32 px-6 bg-primary relative overflow-hidden">
        <div className="absolute bottom-0 right-0 p-20 text-outline text-9xl font-bold opacity-10 select-none hidden md:block">03</div>
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVariant} className="mb-24">
            <h2 className="section-title">Visionary<br/>Leadership</h2>
          </motion.div>
          <div className="flex justify-center max-w-4xl mx-auto relative perspective-[2000px]">
            <div className="absolute inset-0 bg-gold/5 blur-[120px] rounded-full animate-pulse z-0 pointer-events-none"></div>
            
            <motion.div 
              initial={{ opacity: 0, y: 60 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              whileHover={{ scale: 1.05, rotateY: 8, rotateX: -5 }}
              transition={{ duration: 1, type: "spring", bounce: 0.3 }}
              viewport={{ once: true }} 
              className="relative z-10 w-full max-w-sm group cursor-pointer"
            >
              <div className="relative rounded-[3rem] overflow-hidden border border-white/10 glass transition-all duration-700 group-hover:border-gold/30">
                <div className="absolute inset-0 bg-noise opacity-20 z-10"></div>
                
                {/* Image Container */}
                <div className="relative w-full aspect-[4/5]">
                  <Image 
                    src="/CEO.jpeg" 
                    alt="Junaid Zafar" 
                    fill 
                    className="object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700"></div>
                </div>
                
                {/* Info Section */}
                <div className="absolute bottom-0 left-0 w-full p-14 z-20">
                  <div className="w-12 h-1 bg-gold mb-6 group-hover:w-20 transition-all duration-700"></div>
                  <h3 className="font-display text-5xl font-bold text-white tracking-tighter uppercase mb-2 group-hover:text-gold transition-colors duration-500 drop-shadow-2xl">
                    Junaid Zafar
                  </h3>
                  <p className="text-gold/60 font-bold tracking-[0.6em] uppercase text-[0.65rem] font-sans">
                    The Visionary CEO
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 relative border-t border-white/5 bg-secondary overflow-hidden">
        <div className="absolute top-0 left-0 p-20 text-outline text-9xl font-bold opacity-10 select-none hidden md:block">04</div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-start">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVariant}>
            <h2 className="section-title text-left mb-12">Let's Create<br/>Your <span className="text-outline">Legacy</span></h2>
            <p className="text-silver/40 mb-16 text-lg font-light tracking-widest leading-relaxed">Schedule your session at Multan's most advanced recording facility.</p>
            
            <div className="space-y-12">
              {[
                { i: MapPin, l: "Base of Operations", v: "ChaseUp Plaza 5th Floor, Gulgasht Multan" },
                { i: Phone, l: "Hotline", v: "0309 5827437" },
                { i: Mail, l: "Direct", v: "nextnotestudios@gmail.com" }
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-8 group cursor-pointer">
                  <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-all duration-500 relative overflow-hidden">
                    <c.i className="w-6 h-6 relative z-10" />
                    <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  </div>
                  <div>
                    <p className="text-[0.6rem] uppercase tracking-[0.4em] text-silver/40 mb-2">{c.l}</p>
                    <p className="text-xl font-bold text-white group-hover:text-gold transition-colors duration-500 tracking-tighter">{c.v}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-20">
              <a href="https://wa.me/923095827437" target="_blank" rel="noreferrer" className="inline-flex items-center gap-8 glass hover:bg-gold hover:text-black px-12 py-6 rounded-2xl font-bold tracking-[0.3em] uppercase transition-all duration-500 text-[0.65rem] group border-gold/10">
                <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" /> 
                <span>Instant Booking</span>
                <div className="glass-circle scale-50 group-hover:scale-75 group-hover:bg-black group-hover:text-gold"><ArrowRight className="w-5 h-5" /></div>
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVariant} 
            className="glass p-12 md:p-16 rounded-[3rem] relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-noise opacity-20"></div>
            <form onSubmit={handleFormSubmit} className="relative z-10 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-[0.4em] text-gold ml-1 font-bold">Identity</label>
                  <input type="text" required className="w-full bg-transparent border-b border-white/40 px-1 py-4 text-white focus:outline-none focus:border-gold transition-all font-light placeholder:text-silver/70" placeholder="FULL NAME" />
                </div>
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-[0.4em] text-gold ml-1 font-bold">Connection</label>
                  <input type="tel" required className="w-full bg-transparent border-b border-white/40 px-1 py-4 text-white focus:outline-none focus:border-gold transition-all font-light placeholder:text-silver/70" placeholder="PHONE NUMBER" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-xs uppercase tracking-[0.4em] text-gold ml-1 font-bold">Communication</label>
                <input type="email" required className="w-full bg-transparent border-b border-white/40 px-1 py-4 text-white focus:outline-none focus:border-gold transition-all font-light placeholder:text-silver/70" placeholder="EMAIL ADDRESS" />
              </div>
              <div className="space-y-3">
                <label className="text-xs uppercase tracking-[0.4em] text-gold ml-1 font-bold">Project Details</label>
                <textarea rows={4} required className="w-full bg-transparent border-b border-white/40 px-1 py-4 text-white focus:outline-none focus:border-gold transition-all font-light resize-none placeholder:text-silver/70" placeholder="YOUR VISION..."></textarea>
              </div>
              <button disabled={formStatus === "loading"} type="submit" className="w-full py-6 bg-gold text-black font-bold uppercase tracking-[0.4em] text-xs rounded-2xl flex justify-center transition-all hover:bg-white hover:shadow-glow-gold">
                {formStatus === "loading" ? <Loader2 className="w-6 h-6 animate-spin" /> : "Transmit Request"}
              </button>
              {formStatus === "success" && <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-gold text-center mt-6 tracking-widest uppercase">Signal received. Stand by.</motion.p>}
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#030304] border-t border-white/5 pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <span className="font-display font-bold text-3xl tracking-widest uppercase text-gold">NextNote</span>
            <span className="text-[0.6rem] uppercase tracking-[0.4em] text-silver">Studio</span>
          </div>
          <div className="flex gap-4">
            <a href="https://instagram.com/next_notestudio" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-silver hover:text-gold hover:bg-gold/10 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
          </div>
        </div>
        <div className="text-center border-t border-white/5 pt-8">
          <p className="text-silver/40 text-xs tracking-widest">&copy; 2026 NextNote Studio. Multan, Pakistan. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
