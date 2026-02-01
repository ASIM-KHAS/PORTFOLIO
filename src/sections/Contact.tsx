import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  MapPin, 
  Mail, 
  Linkedin, 
  Github, 
  Send,
  ArrowUpRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: MapPin,
    label: 'Location',
    value: 'Riyadh, Saudi Arabia',
    href: null,
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'asim.khas@example.com',
    href: 'mailto:asim.khas@example.com',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/asimkhas',
    href: 'https://linkedin.com/in/asimkhas',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/asimkhas',
    href: 'https://github.com/asimkhas',
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading cascade animation
      if (headingRef.current) {
        const chars = headingRef.current.querySelectorAll('.char');
        gsap.fromTo(chars,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.04,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Contact info slide from left
      if (infoRef.current) {
        const items = infoRef.current.querySelectorAll('.contact-item');
        gsap.fromTo(items,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: infoRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Form slide from right
      gsap.fromTo(formRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Input fields stagger
      if (formRef.current) {
        const inputs = formRef.current.querySelectorAll('.form-field');
        gsap.fromTo(inputs,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: 'smooth',
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Reset after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 w-full overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#c9a962]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#c9a962]/5 rounded-full blur-3xl" />
      </div>

      {/* Diagonal Line Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-[#c9a962]/20 to-transparent transform -rotate-12 origin-top" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-['Playfair_Display'] mb-4">
            {'Let\'s Build the Future'.split('').map((char, i) => (
              <span key={i} className="char inline-block text-white">
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can architect solutions together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Contact Info */}
          <div ref={infoRef} className="space-y-6">
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gradient-gold mb-6">
                Get in Touch
              </h3>
              
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <div
                    key={index}
                    className="contact-item flex items-center gap-4 p-4 rounded-xl bg-[#1a1a1a]/50 hover:bg-[#1a1a1a] transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-[#c9a962]/20 flex items-center justify-center group-hover:bg-[#c9a962]/30 transition-colors">
                      <item.icon className="w-5 h-5 text-[#c9a962]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 uppercase tracking-wider">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-white hover:text-[#c9a962] transition-colors flex items-center gap-1"
                        >
                          {item.value}
                          <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      ) : (
                        <p className="text-white">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote Card */}
            <div className="glass-card rounded-2xl p-6 border-l-4 border-[#c9a962]">
              <p className="text-gray-300 italic">
                "I don't just write code; I design the secure, compliant engines that power the Saudi digital economy."
              </p>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="glass-card rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold text-white mb-6">
              Send a Message
            </h3>

            <div className="space-y-5">
              {/* Name Field */}
              <div className="form-field">
                <label className="block text-sm text-gray-400 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-white placeholder-gray-500 focus:border-[#c9a962] focus:outline-none focus:ring-1 focus:ring-[#c9a962] transition-all"
                  placeholder="Your name"
                />
              </div>

              {/* Email Field */}
              <div className="form-field">
                <label className="block text-sm text-gray-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-white placeholder-gray-500 focus:border-[#c9a962] focus:outline-none focus:ring-1 focus:ring-[#c9a962] transition-all"
                  placeholder="your@email.com"
                />
              </div>

              {/* Subject Field */}
              <div className="form-field">
                <label className="block text-sm text-gray-400 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-white placeholder-gray-500 focus:border-[#c9a962] focus:outline-none focus:ring-1 focus:ring-[#c9a962] transition-all"
                  placeholder="Project discussion"
                />
              </div>

              {/* Message Field */}
              <div className="form-field">
                <label className="block text-sm text-gray-400 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-white placeholder-gray-500 focus:border-[#c9a962] focus:outline-none focus:ring-1 focus:ring-[#c9a962] transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                  isSubmitted
                    ? 'bg-green-500 text-white'
                    : 'bg-gradient-gold text-[#0a0a0a] hover:shadow-lg hover:shadow-[#c9a962]/30 hover:scale-[1.02]'
                }`}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-[#0a0a0a] border-t-transparent rounded-full animate-spin" />
                ) : isSubmitted ? (
                  <>
                    Message Sent!
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
