import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, ExternalLink, Calendar, BadgeCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const certifications = [
  {
    id: 1,
    title: 'Architecting with Google Compute Engine Specialization',
    issuer: 'Coursera',
    date: 'Aug 2021',
    credential: 'LBPWDSDHXPCQ',
    icon: Award,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 2,
    title: 'Introduction to Data Engineering',
    issuer: 'Coursera',
    date: 'Apr 2022',
    credential: 'X7UYWB28HBB2',
    icon: BadgeCheck,
    color: 'from-purple-500 to-pink-500',
  },
];

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(headingRef.current,
        { y: -50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards 3D tilt in
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.cert-card');
        gsap.fromTo(cards,
          { rotateX: 30, y: 50, opacity: 0 },
          {
            rotateX: 0,
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Badge spin in
        const badges = cardsRef.current.querySelectorAll('.cert-badge');
        gsap.fromTo(badges,
          { rotate: 360, scale: 0 },
          {
            rotate: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
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
      id="certifications"
      className="relative py-32 w-full overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-['Playfair_Display'] text-white mb-4">
            Credentials & Certifications
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Continuous learning, validated expertise
          </p>
        </div>

        {/* Certification Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="cert-card glass-card rounded-2xl p-6 perspective-1000 hover-lift group cursor-pointer"
            >
              <div className="flex items-start gap-4">
                {/* Badge Icon */}
                <div className={`cert-badge w-16 h-16 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <cert.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gradient-gold transition-colors">
                    {cert.title}
                  </h3>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-400">
                      <span className="font-medium">{cert.issuer}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>Issued {cert.date}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-500 font-mono text-xs">
                      <span>ID: {cert.credential}</span>
                    </div>
                  </div>

                  {/* Verify Button */}
                  <button className="mt-4 flex items-center gap-2 text-[#c9a962] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Verify Credential</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Hover Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-[#c9a962]/0 group-hover:border-[#c9a962]/30 transition-colors pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Education Section */}
        <div className="mt-16 glass-card rounded-2xl p-8 max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-gradient-gold mb-4">Education</h3>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#c9a962]/20 flex items-center justify-center flex-shrink-0">
              <Award className="w-6 h-6 text-[#c9a962]" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white">
                Bachelor of Technology - Computer Science
              </h4>
              <p className="text-gray-400">Rajadhani Institute of Engineering and Technology</p>
              <p className="text-gray-500 text-sm mt-1">2018 - 2022</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
