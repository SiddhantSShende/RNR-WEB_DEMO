import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  Smartphone, Shield, Lock, Search, Code, AlertTriangle, 
  Eye, Settings, CheckCircle, Monitor, Cpu, Database
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import Navigation from './Navigation';

const MobileAppSecurityPage3D: React.FC = () => {
  const { isDarkMode } = useTheme();
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Three.js initialization
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Create mobile-themed particle system with hexagonal patterns
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 600;
    
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);
    
    for(let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 32;
      posArray[i + 1] = (Math.random() - 0.5) * 32;
      posArray[i + 2] = (Math.random() - 0.5) * 32;
      
      // Purple/pink themed particles for mobile
      const isPurple = Math.random() > 0.5;
      colorArray[i] = isPurple ? 0.6 : 1;     // R
      colorArray[i + 1] = isPurple ? 0.3 : 0.4; // G
      colorArray[i + 2] = isPurple ? 0.9 : 0.8; // B
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 3.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.75
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 16;

    // Animation loop with mobile-like movement
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      // Dynamic rotation for mobile app flow
      particlesMesh.rotation.x += 0.0006;
      particlesMesh.rotation.y += 0.0009;
      particlesMesh.rotation.z += 0.0004;
      
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const mobileSecurityServices = {
    staticAnalysis: [
      {
        title: "Mobile App Static Analysis (SAST)",
        description: "Comprehensive source code analysis for mobile applications",
        icon: Code,
        features: ["iOS/Android code review", "Vulnerability detection", "Secure coding validation"]
      },
      {
        title: "Binary Analysis",
        description: "Reverse engineering and binary security assessment",
        icon: Cpu,
        features: ["Binary reverse engineering", "Code obfuscation analysis", "Runtime protection assessment"]
      },
      {
        title: "Third-Party Library Assessment",
        description: "Security assessment of third-party mobile libraries and SDKs",
        icon: Search,
        features: ["Library vulnerability scanning", "SDK security review", "Dependency analysis"]
      }
    ],
    dynamicAnalysis: [
      {
        title: "Mobile App Dynamic Analysis (DAST)",
        description: "Runtime security testing and vulnerability assessment",
        icon: Monitor,
        features: ["Runtime vulnerability testing", "API endpoint testing", "Behavioral analysis"]
      },
      {
        title: "Interactive Application Security Testing (IAST)",
        description: "Real-time security testing during mobile app execution",
        icon: Eye,
        features: ["Real-time analysis", "Interactive testing", "Runtime monitoring"]
      },
      {
        title: "Runtime Application Self-Protection (RASP)",
        description: "Implementation of runtime security controls and monitoring",
        icon: Shield,
        features: ["Runtime protection", "Attack detection", "Self-defense mechanisms"]
      }
    ],
    penetrationTesting: [
      {
        title: "iOS Application Penetration Testing",
        description: "Comprehensive security assessment of iOS applications",
        icon: Smartphone,
        features: ["iOS-specific vulnerabilities", "Jailbreak detection bypass", "Keychain security"]
      },
      {
        title: "Android Application Penetration Testing",
        description: "In-depth security testing of Android applications",
        icon: Smartphone,
        features: ["Android vulnerability assessment", "Root detection bypass", "Intent security"]
      },
      {
        title: "Cross-Platform App Testing",
        description: "Security testing for cross-platform mobile applications",
        icon: Settings,
        features: ["Hybrid app testing", "Framework-specific issues", "Platform integration security"]
      }
    ],
    dataProtection: [
      {
        title: "Data Storage Security",
        description: "Assessment and implementation of secure data storage practices",
        icon: Database,
        features: ["Local storage encryption", "Secure data handling", "Privacy compliance"]
      },
      {
        title: "Communication Security",
        description: "Secure communication protocols and API security implementation",
        icon: Lock,
        features: ["TLS/SSL implementation", "Certificate pinning", "API authentication"]
      },
      {
        title: "Privacy & Compliance",
        description: "Mobile app privacy compliance and data protection strategies",
        icon: Shield,
        features: ["GDPR compliance", "Privacy by design", "Data minimization"]
      }
    ],
    deviceSecurity: [
      {
        title: "Device Security Assessment",
        description: "Comprehensive assessment of mobile device security features",
        icon: Smartphone,
        features: ["Device fingerprinting", "Hardware security features", "Biometric security"]
      },
      {
        title: "Jailbreak/Root Detection",
        description: "Implementation of jailbreak and root detection mechanisms",
        icon: AlertTriangle,
        features: ["Anti-tampering controls", "Device integrity checks", "Runtime environment validation"]
      },
      {
        title: "Mobile Device Management (MDM)",
        description: "Security assessment and implementation of MDM solutions",
        icon: Settings,
        features: ["Enterprise mobility", "Device policy enforcement", "Remote security management"]
      }
    ],
    secureDevlopment: [
      {
        title: "Secure Mobile Development Lifecycle",
        description: "Implementation of secure development practices for mobile apps",
        icon: Code,
        features: ["Secure SDLC", "Security requirements", "Development guidelines"]
      },
      {
        title: "Mobile App Security Training",
        description: "Developer training on mobile application security best practices",
        icon: Eye,
        features: ["Platform-specific training", "Secure coding practices", "Threat awareness"]
      },
      {
        title: "DevSecOps for Mobile",
        description: "Integration of security into mobile app development pipelines",
        icon: Monitor,
        features: ["Automated security testing", "CI/CD security integration", "Continuous monitoring"]
      }
    ]
  };

  const ServiceSection = ({ title, description, services, colorClass }: any) => (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-4xl font-bold text-center mb-4 ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}>
          {title}
        </h2>
        <p className={`text-center mb-12 text-lg ${
          isDarkMode ? 'text-slate-300' : 'text-slate-600'
        }`}>
          {description}
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service: any, index: number) => (
            <div key={index} className={`rounded-2xl p-8 backdrop-blur-md border transition-all duration-300 hover:scale-105 ${
              isDarkMode 
                ? 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/60' 
                : 'bg-white/70 border-white/50 hover:bg-white/90'
            }`}>
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${colorClass}`}>
                <service.icon className={`w-8 h-8 ${
                  colorClass.includes('purple') 
                    ? (isDarkMode ? 'text-purple-400' : 'text-purple-600')
                    : colorClass.includes('pink')
                    ? (isDarkMode ? 'text-pink-400' : 'text-pink-600')
                    : colorClass.includes('blue')
                    ? (isDarkMode ? 'text-blue-400' : 'text-blue-600')
                    : colorClass.includes('green')
                    ? (isDarkMode ? 'text-green-400' : 'text-green-600')
                    : colorClass.includes('orange')
                    ? (isDarkMode ? 'text-orange-400' : 'text-orange-600')
                    : (isDarkMode ? 'text-indigo-400' : 'text-indigo-600')
                }`} />
              </div>
              <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {service.title}
              </h3>
              <p className={`mb-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature: string, idx: number) => (
                  <li key={idx} className={`flex items-center text-sm ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900' 
        : 'bg-gradient-to-br from-slate-50 via-purple-50 to-pink-100'
    }`}>
      {/* Three.js Canvas */}
      <div ref={mountRef} className="fixed inset-0 z-0" />
      
      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen">
        {/* Navigation */}
        <Navigation />

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-8 ${
              isDarkMode ? 'bg-purple-600/20' : 'bg-purple-100'
            }`}>
              <Smartphone className={`w-10 h-10 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
            </div>
            <h1 className={`text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent ${
              isDarkMode 
                ? 'from-purple-400 via-pink-300 to-purple-300' 
                : 'from-purple-600 via-pink-600 to-purple-700'
            }`}>
              Mobile App Security
            </h1>
            <p className={`text-xl md:text-2xl mb-8 max-w-4xl mx-auto ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Comprehensive mobile application security solutions for iOS, Android, and cross-platform 
              apps with advanced testing methodologies and secure development practices.
            </p>
          </div>
        </section>

        {/* Service Sections */}
        <ServiceSection 
          title="Static Analysis & Code Review"
          description="Comprehensive static analysis and source code security assessment"
          services={mobileSecurityServices.staticAnalysis}
          colorClass={isDarkMode ? "bg-purple-600/20" : "bg-purple-100"}
        />

        <ServiceSection 
          title="Dynamic & Runtime Analysis"
          description="Dynamic testing and runtime security analysis for mobile apps"
          services={mobileSecurityServices.dynamicAnalysis}
          colorClass={isDarkMode ? "bg-pink-600/20" : "bg-pink-100"}
        />

        <ServiceSection 
          title="Mobile App Penetration Testing"
          description="Platform-specific penetration testing for iOS and Android applications"
          services={mobileSecurityServices.penetrationTesting}
          colorClass={isDarkMode ? "bg-blue-600/20" : "bg-blue-100"}
        />

        <ServiceSection 
          title="Data Protection & Privacy"
          description="Mobile app data security and privacy compliance solutions"
          services={mobileSecurityServices.dataProtection}
          colorClass={isDarkMode ? "bg-green-600/20" : "bg-green-100"}
        />

        <ServiceSection 
          title="Device & Platform Security"
          description="Mobile device security assessment and management solutions"
          services={mobileSecurityServices.deviceSecurity}
          colorClass={isDarkMode ? "bg-orange-600/20" : "bg-orange-100"}
        />

        <ServiceSection 
          title="Secure Development & DevSecOps"
          description="Secure mobile development lifecycle and DevSecOps implementation"
          services={mobileSecurityServices.secureDevlopment}
          colorClass={isDarkMode ? "bg-indigo-600/20" : "bg-indigo-100"}
        />

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`rounded-3xl p-12 backdrop-blur-md border ${
              isDarkMode 
                ? 'bg-slate-800/50 border-slate-700/50' 
                : 'bg-white/70 border-white/50'
            }`}>
              <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Ready to Secure Your Mobile Apps?
              </h2>
              <p className={`text-lg mb-8 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Let our mobile security experts help you build and maintain secure mobile applications 
                that protect user data and provide a trusted experience across all platforms.
              </p>
              <button className={`px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-purple-900/25' 
                  : 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-purple-500/25'
              }`}>
                Get Started Today
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MobileAppSecurityPage3D;
