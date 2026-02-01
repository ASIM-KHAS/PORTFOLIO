import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const signatureRef = useRef<SVGPathElement>(null);
  const backToTopRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Quote fade in
      gsap.fromTo(quoteRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'smooth',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Signature draw animation
      if (signatureRef.current) {
        const length = signatureRef.current.getTotalLength();
        gsap.set(signatureRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        
        gsap.to(signatureRef.current, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // Back to top bounce in
      gsap.fromTo(backToTopRef.current,
        { y: 20, scale: 0 },
        {
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      className="relative py-16 w-full overflow-hidden border-t border-[#c9a962]/10"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Quote */}
          <p
            ref={quoteRef}
            className="text-xl sm:text-2xl font-['Playfair_Display'] italic text-gray-300 max-w-2xl mb-8"
          >
            "Designing the secure, compliant engines that power the Saudi digital economy."
          </p>

          {/* Signature */}
          <div className="mb-8">
            <svg
              width="200"
              height="60"
              viewBox="0 0 200 60"
              fill="none"
              className="overflow-visible"
            >
              <path
                ref={signatureRef}
                d="M10 45 Q20 10 40 30 T70 25 Q80 20 90 35 T120 30 Q140 25 160 35 T190 30"
                stroke="#c9a962"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <p className="text-[#c9a962] font-['Playfair_Display'] text-lg mt-2">
              Asim Khas
            </p>
          </div>

          {/* Divider */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#c9a962]/50 to-transparent mb-8" />

          {/* Copyright */}
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <span>© 2025 Asim Khas. All rights reserved.</span>
            <span className="flex items-center gap-1">
              Built with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> in Riyadh
            </span>
          </div>

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {['React', 'TypeScript', 'Tailwind CSS', 'Three.js', 'GSAP'].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full bg-[#1a1a1a] text-gray-500 text-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Back to Top Button */}
        <button
          ref={backToTopRef}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-gold text-[#0a0a0a] flex items-center justify-center shadow-lg shadow-[#c9a962]/30 hover:scale-110 transition-transform z-50 animate-pulse-gold"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>
    </footer>
  );
}
