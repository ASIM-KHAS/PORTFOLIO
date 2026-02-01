import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Building, 
  MapPin, 
  Calendar, 
  CheckCircle2,
  Briefcase
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  {
    category: 'REAL ESTATE FINTECH',
    items: [
      'Architected "Trustee" Escrow System with strict REGA compliance',
      'Engineered fund distribution logic for Master-to-Sub Account flows',
      'Designed REC system architecture for secure investment contributions',
    ],
  },
  {
    category: 'VIRTUAL ACCOUNTS',
    items: [
      'Built high-volume Corporate Wallet Engine atop Core Banking layer',
      'Integrated Apache Kafka for async Credit/Debit transaction alerts',
      'Engineered COBO/POBO modules for fully functional Virtual IBANs',
      'Designed REST APIs for external ERP integration',
    ],
  },
  {
    category: 'LEADERSHIP & OPERATIONS',
    items: [
      'Acting Technical Team Lead for 8+ developers',
      'Implemented Denodo data virtualization patterns',
      'Trusted with L3 Production Support and DR Switch execution',
      'Executed MS SQL to Oracle migration with 100% integrity',
    ],
  },
];

const techStack = [
  'Spring Boot',
  'Microservices',
  'Angular',
  'SQL',
  'GitHub',
  'Java',
  'TypeScript',
  'OpenShift',
  'IBM MQ',
  'Data Migration',
  'Core Banking',
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);
  const techStackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(headingRef.current,
        { x: -100, opacity: 0, clipPath: 'inset(0 100% 0 0)' },
        {
          x: 0,
          opacity: 1,
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.7,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Main card emergence
      gsap.fromTo(cardRef.current,
        { z: -100, rotateY: 45, opacity: 0 },
        {
          z: 0,
          rotateY: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Achievement bullets stagger
      if (achievementsRef.current) {
        const bullets = achievementsRef.current.querySelectorAll('.achievement-item');
        gsap.fromTo(bullets,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: 'smooth',
            scrollTrigger: {
              trigger: achievementsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Tech tags pop in
      if (techStackRef.current) {
        const tags = techStackRef.current.querySelectorAll('.tech-tag');
        gsap.fromTo(tags,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.3,
            stagger: 0.05,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: techStackRef.current,
              start: 'top 85%',
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
      id="experience"
      className="relative py-32 w-full overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#c9a962]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#c9a962]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-['Playfair_Display'] text-white mb-4">
            Professional Journey
          </h2>
          <p className="text-lg text-gray-400">
            Building the future of banking, one system at a time
          </p>
        </div>

        {/* Experience Card */}
        <div
          ref={cardRef}
          className="glass-card rounded-3xl overflow-hidden perspective-1000 hover-lift"
        >
          {/* Card Header */}
          <div className="p-8 border-b border-[#c9a962]/10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-gold flex items-center justify-center">
                  <Building className="w-8 h-8 text-[#0a0a0a]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Arab National Bank</h3>
                  <p className="text-[#c9a962] font-medium">Technical Integration Specialist</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#c9a962]" />
                  <span>Nov 2023 - Present</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#c9a962]" />
                  <span>Riyadh, Saudi Arabia</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#c9a962]" />
                  <span>On-site</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-8">
            <div ref={achievementsRef} className="grid md:grid-cols-3 gap-8">
              {achievements.map((section, index) => (
                <div key={index} className="space-y-4">
                  <h4 className="text-sm font-bold text-[#c9a962] uppercase tracking-wider">
                    {section.category}
                  </h4>
                  <ul className="space-y-3">
                    {section.items.map((item, i) => (
                      <li
                        key={i}
                        className="achievement-item flex items-start gap-3 text-gray-300 text-sm leading-relaxed group"
                      >
                        <CheckCircle2 className="w-5 h-5 text-[#c9a962] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                        <span className="group-hover:text-white transition-colors">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Tech Stack */}
            <div ref={techStackRef} className="mt-10 pt-8 border-t border-[#c9a962]/10">
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="tech-tag px-4 py-2 rounded-full bg-[#c9a962]/10 border border-[#c9a962]/30 text-[#c9a962] text-sm hover:bg-[#c9a962]/20 hover:scale-105 transition-all cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contract Badge */}
        <div className="mt-6 flex justify-center">
          <div className="glass-card px-6 py-3 rounded-full flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-gray-300">
              Currently deployed as strategic consultant at ANB via{' '}
              <span className="text-[#c9a962] font-medium">Interland Technology Services</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
