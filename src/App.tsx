import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Expertise from './sections/Expertise';
import Experience from './sections/Experience';
import Skills from './sections/Skills';
import Certifications from './sections/Certifications';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* Global Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Subtle noise texture */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#c9a962]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#c9a962]/3 rounded-full blur-[100px]" />
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Expertise />
        <Experience />
        <Skills />
        <Certifications />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
