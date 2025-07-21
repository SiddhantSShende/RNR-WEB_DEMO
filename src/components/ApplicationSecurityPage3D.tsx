import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  Shield, Code, Search, FileCheck, Zap, AlertTriangle, 
  Monitor, Settings, Lock, Eye, Cpu, Terminal
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import Navigation from './Navigation';

const ApplicationSecurityPage3D: React.FC = () => {
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

    // Create code-themed particle system for Application Security
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 800;
    
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);
    
    for(let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 35;
      posArray[i + 1] = (Math.random() - 0.5) * 35;
      posArray[i + 2] = (Math.random() - 0.5) * 35;
      
      // Red/orange themed particles for security alerts
      const isRed = Math.random() > 0.5;
      colorArray[i] = isRed ? 1 : 1;       // R
      colorArray[i + 1] = isRed ? 0.2 : 0.5; // G
      colorArray[i + 2] = isRed ? 0.1 : 0.1;  // B
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 3.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.7
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 18;

    // Animation loop with code-like movement
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      // Rhythmic rotation for code scanning effect
      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.001;
      particlesMesh.rotation.z += 0.0003;
      
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

  const appSecurityServices = {
    staticAnalysis: [
      {
        title: "Static Application Security Testing (SAST)",
        description: "Automated source code security analysis and vulnerability detection",
        icon: Code,
        features: ["Source code scanning", "Vulnerability identification", "Secure coding recommendations"]
      },
      {
        title: "Code Review & Analysis",
        description: "Manual code review for complex security vulnerabilities",
        icon: Eye,
        features: ["Manual code inspection", "Logic flaw detection", "Security architecture review"]
      },
      {
        title: "Dependency Scanning",
        description: "Third-party library and dependency vulnerability assessment",
        icon: Search,
        features: ["Library vulnerability scan", "Dependency mapping", "Update recommendations"]
      }
    ],
    dynamicAnalysis: [
      {
        title: "Dynamic Application Security Testing (DAST)",
        description: "Runtime application security testing and vulnerability assessment",
        icon: Zap,
        features: ["Runtime vulnerability scanning", "Black-box testing", "Web application assessment"]
      },
      {
        title: "Interactive Application Security Testing (IAST)",
        description: "Real-time security testing during application execution",
        icon: Monitor,
        features: ["Runtime analysis", "Interactive testing", "Real-time feedback"]
      },
      {
        title: "API Security Testing",
        description: "Comprehensive API endpoint security assessment",
        icon: Terminal,
        features: ["API vulnerability testing", "Authentication bypass", "Data exposure analysis"]
      }
    ],
    penetrationTesting: [
      {
        title: "Web Application Penetration Testing",
        description: "Comprehensive manual penetration testing of web applications",
        icon: Shield,
        features: ["OWASP Top 10 testing", "Business logic flaws", "Authentication bypass"]
      },
      {
        title: "Mobile Application Penetration Testing",
        description: "Security assessment of mobile applications (iOS/Android)",
        icon: Cpu,
        features: ["Mobile app vulnerabilities", "Platform-specific issues", "Data storage analysis"]
      },
      {
        title: "Thick Client Application Testing",
        description: "Desktop and thick client application security assessment",
        icon: Settings,
        features: ["Client-side vulnerabilities", "Protocol analysis", "Local storage security"]
      }
    ],
    secureCodeReview: [
      {
        title: "Architecture Security Review",
        description: "Security assessment of application architecture and design",
        icon: FileCheck,
        features: ["Design pattern review", "Security architecture", "Threat modeling"]
      },
      {
        title: "Secure Development Lifecycle (SDL)",
        description: "Implementation of secure development practices and processes",
        icon: Settings,
        features: ["SDL implementation", "Security checkpoints", "Developer training"]
      },
      {
        title: "Compliance Code Review",
        description: "Code review for regulatory compliance requirements",
        icon: Shield,
        features: ["Regulatory compliance", "Standard adherence", "Documentation review"]
      }
    ],
    vulnerabilityManagement: [
      {
        title: "Vulnerability Assessment & Prioritization",
        description: "Comprehensive vulnerability identification and risk prioritization",
        icon: AlertTriangle,
        features: ["Risk-based prioritization", "CVSS scoring", "Business impact analysis"]
      },
      {
        title: "Remediation Planning",
        description: "Strategic planning for vulnerability remediation and fixes",
        icon: Settings,
        features: ["Remediation roadmap", "Fix prioritization", "Resource planning"]
      },
      {
        title: "Continuous Security Monitoring",
        description: "Ongoing monitoring and assessment of application security posture",
        icon: Monitor,
        features: ["Continuous scanning", "Security metrics", "Trend analysis"]
      }
    ],
    securityTraining: [
      {
        title: "Secure Coding Training",
        description: "Developer training on secure coding practices and techniques",
        icon: Code,
        features: ["OWASP guidelines", "Language-specific training", "Hands-on workshops"]
      },
      {
        title: "Security Awareness Programs",
        description: "Comprehensive security awareness training for development teams",
        icon: Eye,
        features: ["Security awareness", "Threat landscape", "Best practices"]
      },
      {
        title: "DevSecOps Implementation",
        description: "Integration of security practices into DevOps workflows",
        icon: Lock,
        features: ["Pipeline security", "Automated testing", "Security gates"]
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
                  colorClass.includes('red') 
                    ? (isDarkMode ? 'text-red-400' : 'text-red-600')
                    : colorClass.includes('orange')
                    ? (isDarkMode ? 'text-orange-400' : 'text-orange-600')
                    : colorClass.includes('purple')
                    ? (isDarkMode ? 'text-purple-400' : 'text-purple-600')
                    : colorClass.includes('blue')
                    ? (isDarkMode ? 'text-blue-400' : 'text-blue-600')
                    : colorClass.includes('green')
                    ? (isDarkMode ? 'text-green-400' : 'text-green-600')
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
                    <Shield className="w-4 h-4 text-red-500 mr-2" />
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
        ? 'bg-gradient-to-br from-slate-900 via-red-900 to-orange-900' 
        : 'bg-gradient-to-br from-slate-50 via-red-50 to-orange-100'
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
              isDarkMode ? 'bg-red-600/20' : 'bg-red-100'
            }`}>
              <Code className={`w-10 h-10 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} />
            </div>
            <h1 className={`text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent ${
              isDarkMode 
                ? 'from-red-400 via-orange-300 to-red-300' 
                : 'from-red-600 via-orange-600 to-red-700'
            }`}>
              Application Security
            </h1>
            <p className={`text-xl md:text-2xl mb-8 max-w-4xl mx-auto ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Comprehensive application security testing and secure development solutions to identify 
              vulnerabilities and strengthen your software applications against cyber threats.
            </p>
          </div>
        </section>

        {/* Service Sections */}
        <ServiceSection 
          title="Static Analysis & Code Review"
          description="Comprehensive static analysis and manual code review services"
          services={appSecurityServices.staticAnalysis}
          colorClass={isDarkMode ? "bg-red-600/20" : "bg-red-100"}
        />

        <ServiceSection 
          title="Dynamic & Runtime Analysis"
          description="Dynamic testing and runtime security analysis solutions"
          services={appSecurityServices.dynamicAnalysis}
          colorClass={isDarkMode ? "bg-orange-600/20" : "bg-orange-100"}
        />

        <ServiceSection 
          title="Penetration Testing"
          description="Manual penetration testing across various application types"
          services={appSecurityServices.penetrationTesting}
          colorClass={isDarkMode ? "bg-purple-600/20" : "bg-purple-100"}
        />

        <ServiceSection 
          title="Secure Code Review & SDL"
          description="Architecture review and secure development lifecycle implementation"
          services={appSecurityServices.secureCodeReview}
          colorClass={isDarkMode ? "bg-blue-600/20" : "bg-blue-100"}
        />

        <ServiceSection 
          title="Vulnerability Management"
          description="Comprehensive vulnerability assessment and remediation planning"
          services={appSecurityServices.vulnerabilityManagement}
          colorClass={isDarkMode ? "bg-green-600/20" : "bg-green-100"}
        />

        <ServiceSection 
          title="Security Training & DevSecOps"
          description="Developer training and DevSecOps implementation services"
          services={appSecurityServices.securityTraining}
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
                Ready to Secure Your Applications?
              </h2>
              <p className={`text-lg mb-8 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Let our application security experts help you identify vulnerabilities and implement 
                secure development practices to protect your software applications.
              </p>
              <button className={`px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-red-900/25' 
                  : 'bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-red-500/25'
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

export default ApplicationSecurityPage3D;
