import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Expertise', href: '#expertise' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.fromTo(navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: 'expo.out' }
      );

      gsap.fromTo(logoRef.current,
        { rotateY: 90, opacity: 0 },
        { rotateY: 0, opacity: 1, duration: 0.5, delay: 0.4, ease: 'elastic.out(1, 0.5)' }
      );

      if (linksRef.current) {
        gsap.fromTo(linksRef.current.children,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, delay: 0.5, ease: 'expo.out' }
        );
      }

      gsap.fromTo(ctaRef.current,
        { scale: 0 },
        { scale: 1, duration: 0.5, delay: 0.8, ease: 'back.out(1.7)' }
      );
    });

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            ref={logoRef}
            className="perspective-1000 cursor-pointer"
            onClick={() => scrollToSection('#hero')}
          >
            <div className="text-2xl font-bold text-gradient-gold font-['Playfair_Display'] hover:scale-105 transition-transform">
              AK
            </div>
          </div>

          {/* Desktop Navigation */}
          <div ref={linksRef} className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="relative text-sm text-gray-300 hover:text-white transition-colors group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-[#c9a962] transition-all duration-300 group-hover:w-full group-hover:left-0" />
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <button
            ref={ctaRef}
            onClick={() => scrollToSection('#contact')}
            className="hidden md:block px-6 py-2.5 text-sm font-medium bg-gradient-gold text-[#0a0a0a] rounded-full hover:shadow-lg hover:shadow-[#c9a962]/30 transition-all duration-300 hover:scale-105"
          >
            Let's Connect
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10">
            <div className="flex flex-col gap-4 pt-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-left text-gray-300 hover:text-white transition-colors py-2"
                >
                  {link.name}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('#contact')}
                className="mt-2 px-6 py-2.5 text-sm font-medium bg-gradient-gold text-[#0a0a0a] rounded-full"
              >
                Let's Connect
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
