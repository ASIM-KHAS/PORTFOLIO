import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = {
  core: {
    name: 'Core Stack',
    skills: [
      { name: 'Java Spring Boot', level: 95 },
      { name: 'Angular', level: 90 },
      { name: 'Microservices', level: 92 },
      { name: 'TypeScript', level: 88 },
    ],
  },
  data: {
    name: 'Data & Infrastructure',
    skills: [
      { name: 'Oracle Database', level: 90 },
      { name: 'Apache Kafka', level: 85 },
      { name: 'Denodo', level: 80 },
      { name: 'SQL / PL-SQL', level: 92 },
    ],
  },
  devops: {
    name: 'DevOps & Tools',
    skills: [
      { name: 'GitHub', level: 88 },
      { name: 'OpenShift', level: 82 },
      { name: 'Docker', level: 85 },
      { name: 'CI/CD', level: 80 },
      { name: 'IBM MQ', level: 78 },
    ],
  },
};

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading decode reveal effect
      if (headingRef.current) {
        const heading = headingRef.current.querySelector('h2');
        if (heading) {
          const text = heading.textContent || '';
          heading.innerHTML = text.split('').map(char => 
            `<span class="char inline-block">${char === ' ' ? '\u00A0' : char}</span>`
          ).join('');
          
          const chars = heading.querySelectorAll('.char');
          gsap.fromTo(chars,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.05,
              stagger: 0.03,
              ease: 'none',
              scrollTrigger: {
                trigger: headingRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      }

      // Category cards animation
      if (categoriesRef.current) {
        const cards = categoriesRef.current.querySelectorAll('.skill-category');
        gsap.fromTo(cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: categoriesRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Progress bars animation
        cards.forEach((card) => {
          const progressBars = card.querySelectorAll('.skill-progress');
          progressBars.forEach((bar) => {
            const target = bar.getAttribute('data-level') || '0';
            gsap.fromTo(bar,
              { width: '0%' },
              {
                width: `${target}%`,
                duration: 1.5,
                ease: 'expo.out',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 80%',
                  toggleActions: 'play none none reverse',
                },
              }
            );
          });
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-32 w-full overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        {/* Orbital rings decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10">
          <div className="absolute inset-0 border border-[#c9a962]/30 rounded-full animate-spin-slow" />
          <div className="absolute inset-8 border border-[#c9a962]/20 rounded-full animate-spin-reverse" />
          <div className="absolute inset-16 border border-[#c9a962]/10 rounded-full" style={{ animation: 'spin 90s linear infinite' }} />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-['Playfair_Display'] text-white mb-4">
            Technical Arsenal
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            The tools and technologies I wield to build financial infrastructure
          </p>
        </div>

        {/* Skills Categories */}
        <div ref={categoriesRef} className="grid md:grid-cols-3 gap-8">
          {Object.entries(skillCategories).map(([key, category]) => (
            <div
              key={key}
              className="skill-category glass-card rounded-2xl p-6 hover-lift"
            >
              {/* Category Header */}
              <h3 className="text-xl font-bold text-gradient-gold mb-6">
                {category.name}
              </h3>

              {/* Skills List */}
              <div className="space-y-5">
                {category.skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">{skill.name}</span>
                      <span className="text-sm text-[#c9a962] font-mono">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                      <div
                        className="skill-progress h-full bg-gradient-gold rounded-full transition-all duration-1000"
                        data-level={skill.level}
                        style={{ width: '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="mt-16 flex justify-center">
          <div className="relative">
            {/* Central Core */}
            <div className="w-24 h-24 rounded-full bg-gradient-gold flex items-center justify-center animate-pulse-gold">
              <span className="text-[#0a0a0a] font-bold text-lg">CORE</span>
            </div>
            
            {/* Orbiting Skills */}
            <div className="absolute inset-0 animate-spin-slow">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#c9a962]/20 text-[#c9a962] text-xs">
                Java
              </div>
            </div>
            <div className="absolute inset-0 animate-spin-reverse">
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#c9a962]/20 text-[#c9a962] text-xs">
                Angular
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
