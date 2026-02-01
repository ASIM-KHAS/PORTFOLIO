import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { ArrowDown, Download, MapPin } from 'lucide-react';

// Particle System Component
function ParticleField() {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const [positions, velocities] = useMemo(() => {
    const count = 150;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }
    
    return [positions, velocities];
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const positionArray = meshRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;
    
    for (let i = 0; i < 150; i++) {
      const i3 = i * 3;
      
      // Perlin-like noise movement
      positionArray[i3] += velocities[i3] + Math.sin(time * 0.5 + i * 0.1) * 0.002;
      positionArray[i3 + 1] += velocities[i3 + 1] + Math.cos(time * 0.3 + i * 0.1) * 0.002;
      positionArray[i3 + 2] += velocities[i3 + 2];
      
      // Mouse attraction
      const dx = mouseRef.current.x * viewport.width * 0.5 - positionArray[i3];
      const dy = mouseRef.current.y * viewport.height * 0.5 - positionArray[i3 + 1];
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 3) {
        positionArray[i3] += dx * 0.001;
        positionArray[i3 + 1] += dy * 0.001;
      }
      
      // Boundary wrap
      if (Math.abs(positionArray[i3]) > 10) positionArray[i3] *= -0.9;
      if (Math.abs(positionArray[i3 + 1]) > 10) positionArray[i3 + 1] *= -0.9;
      if (Math.abs(positionArray[i3 + 2]) > 5) positionArray[i3 + 2] *= -0.9;
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.y = time * 0.02;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#c9a962"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Connection Lines Component
function ConnectionLines() {
  const linesRef = useRef<THREE.LineSegments>(null);
  
  const positions = useMemo(() => {
    const count = 50;
    const positions = new Float32Array(count * 6);
    
    for (let i = 0; i < count; i++) {
      const x1 = (Math.random() - 0.5) * 15;
      const y1 = (Math.random() - 0.5) * 15;
      const z1 = (Math.random() - 0.5) * 5;
      
      const x2 = x1 + (Math.random() - 0.5) * 3;
      const y2 = y1 + (Math.random() - 0.5) * 3;
      const z2 = z1 + (Math.random() - 0.5) * 1;
      
      positions[i * 6] = x1;
      positions[i * 6 + 1] = y1;
      positions[i * 6 + 2] = z1;
      positions[i * 6 + 3] = x2;
      positions[i * 6 + 4] = y2;
      positions[i * 6 + 5] = z2;
    }
    
    return positions;
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#c9a962" transparent opacity={0.15} />
    </lineSegments>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      // Name animation - letter by letter
      if (nameRef.current) {
        const chars = nameRef.current.querySelectorAll('.char');
        tl.fromTo(chars,
          { y: 100, rotateX: -90, opacity: 0 },
          { y: 0, rotateX: 0, opacity: 1, duration: 0.8, stagger: 0.05 },
          0.3
        );
      }

      // Title typewriter effect
      tl.fromTo(titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        1.2
      );

      // Subtitle slide
      tl.fromTo(subtitleRef.current,
        { opacity: 0, x: -50, filter: 'blur(10px)' },
        { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.6 },
        1.5
      );

      // Description
      tl.fromTo(descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        1.8
      );

      // Profile image 3D orbit in
      tl.fromTo(imageRef.current,
        { rotateY: 180, scale: 0.5, opacity: 0 },
        { rotateY: 0, scale: 1, opacity: 1, duration: 1, ease: 'expo.out' },
        1
      );

      // CTAs bounce up
      tl.fromTo(ctaRef.current,
        { y: 30, scale: 0.8, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' },
        2.2
      );

      // Scroll indicator
      tl.fromTo(scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        3
      );

      // Scroll-triggered parallax
      gsap.to(nameRef.current, {
        y: -100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '50% top',
          scrub: 1,
        },
      });

      gsap.to(imageRef.current, {
        y: -50,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '50% top',
          scrub: 1,
        },
      });

      gsap.to([nameRef.current, titleRef.current, subtitleRef.current, descRef.current, imageRef.current, ctaRef.current], {
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '50% top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen w-full flex items-center overflow-hidden"
    >
      {/* Three.js Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <ParticleField />
          <ConnectionLines />
        </Canvas>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/50 to-[#0a0a0a] z-[1]" />

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 z-[1] opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(201, 169, 98, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(201, 169, 98, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <div className="space-y-6">
            {/* Name */}
            <h1
              ref={nameRef}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold font-['Playfair_Display'] perspective-1000"
            >
              <span className="char inline-block text-gradient-gold">A</span>
              <span className="char inline-block text-gradient-gold">S</span>
              <span className="char inline-block text-gradient-gold">I</span>
              <span className="char inline-block text-gradient-gold">M</span>
              <br />
              <span className="char inline-block text-white">K</span>
              <span className="char inline-block text-white">H</span>
              <span className="char inline-block text-white">A</span>
              <span className="char inline-block text-white">S</span>
            </h1>

            {/* Title */}
            <p
              ref={titleRef}
              className="text-xl sm:text-2xl text-[#c9a962] font-medium"
            >
              Technical Integration Specialist
            </p>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-base sm:text-lg text-gray-400"
            >
              Solution Design | Real Estate Fintech & Virtual Accounts
            </p>

            {/* Location */}
            <div className="flex items-center gap-2 text-gray-500">
              <MapPin size={16} className="text-[#c9a962]" />
              <span className="text-sm">Riyadh, Saudi Arabia</span>
            </div>

            {/* Description */}
            <p
              ref={descRef}
              className="text-gray-300 text-base leading-relaxed max-w-xl"
            >
              I architect the secure, compliant engines that power the Saudi digital economy. 
              From REGA-compliant Real Estate systems to high-volume Virtual Account platforms, 
              I bridge business vision with technical execution.
            </p>

            {/* CTAs */}
            <div ref={ctaRef} className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={scrollToAbout}
                className="px-8 py-3 bg-gradient-gold text-[#0a0a0a] font-semibold rounded-full hover:shadow-lg hover:shadow-[#c9a962]/30 transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                Explore My Work
                <ArrowDown size={18} />
              </button>
              <button
                className="px-8 py-3 border border-[#c9a962]/50 text-[#c9a962] font-semibold rounded-full hover:bg-[#c9a962]/10 transition-all duration-300 flex items-center gap-2"
              >
                <Download size={18} />
                Download Resume
              </button>
            </div>
          </div>

          {/* Right Column - Profile Image */}
          <div className="flex justify-center lg:justify-end">
            <div
              ref={imageRef}
              className="relative perspective-1200 preserve-3d"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-[#c9a962]/20 rounded-2xl blur-3xl transform translate-z-20" />
              
              {/* Image Frame */}
              <div className="relative w-72 h-96 sm:w-80 sm:h-[28rem] lg:w-96 lg:h-[32rem] rounded-2xl overflow-hidden border-2 border-[#c9a962]/30 glow-gold">
                <img
                  src="/profile.jpg"
                  alt="Asim Khas"
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent" />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-4 -left-4 glass-card px-4 py-3 rounded-xl animate-float">
                <p className="text-xs text-gray-400">Experience</p>
                <p className="text-lg font-bold text-gradient-gold">2+ Years</p>
              </div>

              {/* Floating Badge 2 */}
              <div className="absolute -top-4 -right-4 glass-card px-4 py-3 rounded-xl animate-float" style={{ animationDelay: '1s' }}>
                <p className="text-xs text-gray-400">Team Size</p>
                <p className="text-lg font-bold text-gradient-gold">8+ Devs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <button
          onClick={scrollToAbout}
          className="flex flex-col items-center gap-2 text-gray-500 hover:text-[#c9a962] transition-colors"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-current rounded-full animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
}
