import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Building2, 
  Wallet, 
  Lightbulb, 
  Landmark, 
  Database, 
  Users,
  ChevronRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const expertiseData = [
  {
    id: 1,
    icon: Building2,
    title: 'Real Estate Fintech',
    description: 'REGA-compliant systems for Off-Plan Sales (Wafi) and Real Estate Contributions (REC)',
    details: 'Deep operational expertise in building escrow systems, fund distribution logic, and regulatory compliance frameworks that ensure strict adherence to Saudi REGA regulations.',
    image: '/real-estate-tech.jpg',
  },
  {
    id: 2,
    icon: Wallet,
    title: 'Virtual Accounts',
    description: 'High-volume VAS, COBO/POBO engines, Digital Wallets',
    details: 'Architecting Corporate Wallet Engines with Collections/Payments On-Behalf-Of capabilities, enabling seamless liquidity management for enterprise clients.',
    image: '/virtual-accounts.jpg',
  },
  {
    id: 3,
    icon: Lightbulb,
    title: 'Solution Design',
    description: 'End-to-end architecture from requirements to deployment',
    details: 'Translating raw business requirements into fully architected solutions, defining Oracle Data Models, API Contracts, and Angular UI Workflows.',
    image: '/fintech-bg.jpg',
  },
  {
    id: 4,
    icon: Landmark,
    title: 'Core Banking',
    description: 'Deep integration with banking systems and processes',
    details: 'Expert-level understanding of core banking operations, transaction processing, and financial product integration within enterprise environments.',
    image: '/fintech-bg.jpg',
  },
  {
    id: 5,
    icon: Database,
    title: 'Data Migration',
    description: 'Complex ETL pipelines, MS SQL to Oracle migrations',
    details: 'Executing complex database migrations with custom ETL scripts, ensuring 100% data integrity and zero-downtime transitions.',
    image: '/fintech-bg.jpg',
  },
  {
    id: 6,
    icon: Users,
    title: 'Technical Leadership',
    description: 'Leading teams of 8+ developers to deliver mission-critical systems',
    details: 'Acting Technical Team Lead, translating requirements into technical specs and overseeing delivery of high-stakes banking projects.',
    image: '/fintech-bg.jpg',
  },
];

export default function Expertise() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      if (headingRef.current) {
        const chars = headingRef.current.querySelectorAll('.char');
        gsap.fromTo(chars,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.03,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Cards stagger animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.expertise-card');
        gsap.fromTo(cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="expertise"
      className="relative py-32 w-full overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            ref={headingRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-['Playfair_Display'] mb-4"
          >
            {'Domains of Excellence'.split('').map((char, i) => (
              <span key={i} className="char inline-block text-white">
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Specialized expertise forged in the demanding environment of Saudi banking
          </p>
        </div>

        {/* Expertise Cards Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expertiseData.map((item) => (
            <div
              key={item.id}
              className="expertise-card group relative glass-card rounded-2xl overflow-hidden cursor-pointer perspective-1000"
              onMouseEnter={() => setActiveCard(item.id)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* Card Background Image */}
              <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                <img
                  src={item.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/80 to-transparent" />
              </div>

              {/* Card Content */}
              <div className="relative p-6 h-full flex flex-col">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-gold flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-7 h-7 text-[#0a0a0a]" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gradient-gold transition-colors">
                  {item.title}
                </h3>

                {/* Short Description */}
                <p className="text-gray-400 text-sm mb-4">
                  {item.description}
                </p>

                {/* Expanded Details */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    activeCard === item.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-gray-300 text-sm leading-relaxed border-t border-[#c9a962]/20 pt-4">
                    {item.details}
                  </p>
                </div>

                {/* Learn More Link */}
                <div className="mt-auto pt-4 flex items-center gap-2 text-[#c9a962] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Learn More</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 rounded-2xl border-2 border-[#c9a962]/0 group-hover:border-[#c9a962]/50 transition-colors duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
