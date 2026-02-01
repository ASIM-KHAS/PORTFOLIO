import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Clock, Shield, Headphones, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Users, value: 8, suffix: '+', label: 'Developers Led' },
  { icon: Clock, value: 2, suffix: '+', label: 'Years at ANB' },
  { icon: Shield, value: 100, suffix: '%', label: 'DR Success' },
  { icon: Headphones, value: 24, suffix: '/7', label: 'L3 Support' },
];

const expertiseAreas = [
  'REGA Systems',
  'Virtual Accounts',
  'Microservices',
  'Event-Driven Architecture',
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading word-by-word reveal
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll('.word');
        gsap.fromTo(words,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Narrative card 3D flip
      gsap.fromTo(narrativeRef.current,
        { rotateY: -30, opacity: 0 },
        {
          rotateY: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: narrativeRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stats cards stagger
      if (statsRef.current) {
        const cards = statsRef.current.querySelectorAll('.stat-card');
        gsap.fromTo(cards,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.15,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Number count up
        cards.forEach((card) => {
          const numberEl = card.querySelector('.stat-number');
          if (numberEl) {
            const target = parseInt(numberEl.getAttribute('data-value') || '0');
            gsap.fromTo({ val: 0 },
              { val: 0 },
              {
                val: target,
                duration: 2,
                ease: 'expo.out',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 80%',
                  toggleActions: 'play none none reverse',
                },
                onUpdate: function() {
                  numberEl.textContent = Math.floor(this.targets()[0].val).toString();
                },
              }
            );
          }
        });
      }

      // Philosophy card slide
      gsap.fromTo(philosophyRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: philosophyRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Expertise orbs
      if (orbsRef.current) {
        const orbs = orbsRef.current.querySelectorAll('.expertise-orb');
        gsap.fromTo(orbs,
          { rotate: 180, scale: 0 },
          {
            rotate: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: orbsRef.current,
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
      id="about"
      className="relative py-32 w-full overflow-hidden"
    >
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#c9a962]/5 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <h2
          ref={headingRef}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold font-['Playfair_Display'] mb-16 text-center"
        >
          <span className="word inline-block text-white">Architecting</span>{' '}
          <span className="word inline-block text-gradient-gold">the</span>{' '}
          <span className="word inline-block text-gradient-gold">Future</span>{' '}
          <span className="word inline-block text-white">of</span>{' '}
          <span className="word inline-block text-white">Fintech</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Narrative Card */}
            <div
              ref={narrativeRef}
              className="glass-card p-8 rounded-2xl perspective-1000 hover-lift"
            >
              <p className="text-lg text-gray-300 leading-relaxed">
                I don't just write code; I design the secure, compliant engines that power 
                the Saudi digital economy. With deep expertise in REGA-compliant Real Estate 
                systems and high-volume Virtual Account platforms, I bridge the gap between 
                abstract business logic and concrete technical execution.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mt-4">
                From Database Schema design to Frontend User Journeys, I translate complex 
                business requirements into scalable banking architectures that meet the 
                stringent demands of modern financial systems.
              </p>
            </div>

            {/* Philosophy Card */}
            <div
              ref={philosophyRef}
              className="glass-card p-8 rounded-2xl border-l-4 border-[#c9a962]"
            >
              <Quote className="w-8 h-8 text-[#c9a962] mb-4" />
              <p className="text-xl font-['Playfair_Display'] italic text-white">
                "Every line of code is a promise. Every architecture decision shapes the future."
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Stats Grid */}
            <div ref={statsRef} className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="stat-card glass-card p-6 rounded-xl text-center hover-lift group"
                >
                  <stat.icon className="w-8 h-8 text-[#c9a962] mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <div className="text-3xl sm:text-4xl font-bold text-gradient-gold">
                    <span className="stat-number" data-value={stat.value}>0</span>
                    <span>{stat.suffix}</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Expertise Orbs */}
            <div ref={orbsRef}>
              <h3 className="text-lg font-semibold text-white mb-4">Core Expertise</h3>
              <div className="flex flex-wrap gap-3">
                {expertiseAreas.map((area, index) => (
                  <div
                    key={index}
                    className="expertise-orb px-5 py-2.5 rounded-full bg-gradient-to-r from-[#c9a962]/20 to-[#c9a962]/10 border border-[#c9a962]/30 text-[#c9a962] text-sm font-medium hover:bg-[#c9a962]/30 transition-colors cursor-default"
                  >
                    {area}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
