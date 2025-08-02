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
    vapt: [
      {
        title: "Mobile Application VAPT",
        description: "Specialized security testing for Android and iOS applications to identify vulnerabilities in mobile apps handling sensitive data",
        icon: Smartphone,
        features: [
          "Insecure data storage assessment",
          "Session handling validation", 
          "Authentication mechanism testing",
          "API security evaluation",
          "Encryption implementation review",
          "Sensitive information exposure detection"
        ]
      },
      {
        title: "Vulnerability Assessment (VA)",
        description: "Systematic identification and analysis of security weaknesses in mobile applications and infrastructure",
        icon: Search,
        features: [
          "Known vulnerability detection",
          "Configuration analysis",
          "Access control evaluation",
          "Missing patch identification",
          "Security baseline compliance",
          "Risk categorization and reporting"
        ]
      },
      {
        title: "Penetration Testing (PT)",
        description: "Controlled simulated attacks to actively exploit vulnerabilities and validate security controls",
        icon: Shield,
        features: [
          "Real-world attack simulation",
          "Exploitability validation",
          "Defense mechanism testing",
          "Impact assessment",
          "Security control effectiveness",
          "Proof-of-concept demonstrations"
        ]
      }
    ],
    sourceCodeReview: [
      {
        title: "Mobile Source Code Review",
        description: "Detailed manual and automated analysis of mobile app source code to detect security vulnerabilities and weak coding practices",
        icon: Code,
        features: [
          "Hardcoded credentials detection",
          "API key exposure identification",
          "Insecure coding practice analysis",
          "Third-party SDK vulnerability assessment",
          "Business logic flaw detection",
          "Compliance requirement validation"
        ]
      },
      {
        title: "Automated Scanning",
        description: "Industry-trusted tools for comprehensive code vulnerability detection",
        icon: Monitor,
        features: [
          "MobSF (Mobile Security Framework)",
          "SonarQube integration",
          "Semgrep rule-based scanning",
          "Common vulnerability detection",
          "Insecure SDK identification",
          "OWASP MASVS compliance checking"
        ]
      },
      {
        title: "Manual Security Review",
        description: "Expert analysis of critical security components that automated tools cannot fully assess",
        icon: Eye,
        features: [
          "Authentication logic review",
          "API security implementation",
          "Secure storage validation",
          "Session management analysis",
          "Business logic security",
          "Configuration security assessment"
        ]
      }
    ],
    methodology: [
      {
        title: "Pre-Engagement & Scoping",
        description: "Comprehensive planning phase to define testing scope, methodology, and requirements",
        icon: Settings,
        features: [
          "Application scope definition (Android/iOS/Hybrid)",
          "Test type determination (Black/Grey/White Box)",
          "APK/IPA file collection",
          "API documentation review",
          "Timeline and deliverable planning",
          "Terms and conditions agreement"
        ]
      },
      {
        title: "Static & Dynamic Analysis",
        description: "Comprehensive testing approach combining code analysis with runtime behavior assessment",
        icon: Cpu,
        features: [
          "Static Application Security Testing (SAST)",
          "Dynamic Application Security Testing (DAST)",
          "Code decompilation and examination",
          "Runtime behavior observation",
          "Real device and emulator testing",
          "Network traffic analysis"
        ]
      },
      {
        title: "Reporting & Remediation",
        description: "Detailed documentation of findings with practical remediation guidance",
        icon: AlertTriangle,
        features: [
          "Vulnerability severity classification",
          "OWASP Mobile Top 10 mapping",
          "CVSS risk scoring",
          "Proof-of-concept demonstrations",
          "Step-by-step reproduction guides",
          "Technical remediation recommendations"
        ]
      }
    ],
    deliverables: [
      {
        title: "Technical Vulnerability Report",
        description: "Comprehensive technical documentation of all identified security issues",
        icon: Database,
        features: [
          "Detailed vulnerability descriptions",
          "Severity ratings (Critical/High/Medium/Low)",
          "OWASP Mobile Top 10 & MASVS mapping",
          "Screenshots and proof-of-concept",
          "Business impact analysis",
          "Technical remediation steps"
        ]
      },
      {
        title: "Executive Summary Report",
        description: "High-level summary designed for management and decision-makers",
        icon: Monitor,
        features: [
          "Risk assessment overview",
          "Visual risk distribution charts",
          "Business impact in non-technical terms",
          "Security posture summary",
          "Strategic recommendations",
          "Compliance status overview"
        ]
      },
      {
        title: "Walkthrough & Support",
        description: "Expert guidance and support during remediation implementation",
        icon: CheckCircle,
        features: [
          "Live vulnerability demonstrations",
          "Developer team consultation",
          "Remediation guidance sessions",
          "Best practice recommendations",
          "Re-testing validation",
          "Ongoing security support"
        ]
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
              Mobile Application Security
            </h1>
            <p className={`text-xl md:text-2xl mb-8 max-w-4xl mx-auto ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Comprehensive mobile application security solutions including VAPT, source code review, 
              and secure development practices for iOS, Android, and cross-platform applications.
            </p>
            
            {/* Key Benefits */}
            <div className="grid md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
              <div className={`p-4 rounded-xl backdrop-blur-md border ${
                isDarkMode ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white/70 border-white/50'
              }`}>
                <Shield className={`w-8 h-8 mx-auto mb-2 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                <p className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Data Protection
                </p>
              </div>
              <div className={`p-4 rounded-xl backdrop-blur-md border ${
                isDarkMode ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white/70 border-white/50'
              }`}>
                <CheckCircle className={`w-8 h-8 mx-auto mb-2 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                <p className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Compliance Ready
                </p>
              </div>
              <div className={`p-4 rounded-xl backdrop-blur-md border ${
                isDarkMode ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white/70 border-white/50'
              }`}>
                <Lock className={`w-8 h-8 mx-auto mb-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <p className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Secure by Design
                </p>
              </div>
              <div className={`p-4 rounded-xl backdrop-blur-md border ${
                isDarkMode ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white/70 border-white/50'
              }`}>
                <Eye className={`w-8 h-8 mx-auto mb-2 ${isDarkMode ? 'text-pink-400' : 'text-pink-600'}`} />
                <p className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Expert Analysis
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Service Sections */}
        <ServiceSection 
          title="Mobile Application VAPT"
          description="Comprehensive vulnerability assessment and penetration testing for mobile applications to identify and address security weaknesses before attackers exploit them"
          services={mobileSecurityServices.vapt}
          colorClass={isDarkMode ? "bg-purple-600/20" : "bg-purple-100"}
        />

        <ServiceSection 
          title="Source Code Security Review"
          description="Deep analysis of mobile application source code using automated tools and expert manual review to uncover hidden vulnerabilities and security risks"
          services={mobileSecurityServices.sourceCodeReview}
          colorClass={isDarkMode ? "bg-blue-600/20" : "bg-blue-100"}
        />

        <ServiceSection 
          title="Our VAPT Methodology"
          description="Systematic approach to mobile security testing following industry best practices and comprehensive testing procedures"
          services={mobileSecurityServices.methodology}
          colorClass={isDarkMode ? "bg-green-600/20" : "bg-green-100"}
        />

        <ServiceSection 
          title="Service Deliverables"
          description="Comprehensive documentation and ongoing support to ensure effective remediation and long-term security improvement"
          services={mobileSecurityServices.deliverables}
          colorClass={isDarkMode ? "bg-orange-600/20" : "bg-orange-100"}
        />

        {/* Why Mobile Security Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-4xl font-bold text-center mb-12 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Why Mobile Application Security is Critical
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className={`rounded-2xl p-6 backdrop-blur-md border ${
                isDarkMode 
                  ? 'bg-slate-800/50 border-slate-700/50' 
                  : 'bg-white/70 border-white/50'
              }`}>
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                  isDarkMode ? 'bg-red-600/20' : 'bg-red-100'
                }`}>
                  <AlertTriangle className={`w-6 h-6 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} />
                </div>
                <h3 className={`text-lg font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Protect Sensitive Data
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  Secure passwords, credit card information, personal data, and business-critical information from unauthorized access
                </p>
              </div>
              <div className={`rounded-2xl p-6 backdrop-blur-md border ${
                isDarkMode 
                  ? 'bg-slate-800/50 border-slate-700/50' 
                  : 'bg-white/70 border-white/50'
              }`}>
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                  isDarkMode ? 'bg-blue-600/20' : 'bg-blue-100'
                }`}>
                  <Shield className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <h3 className={`text-lg font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Prevent Data Breaches
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  Identify and fix vulnerabilities before malicious actors can exploit them to access your systems
                </p>
              </div>
              <div className={`rounded-2xl p-6 backdrop-blur-md border ${
                isDarkMode 
                  ? 'bg-slate-800/50 border-slate-700/50' 
                  : 'bg-white/70 border-white/50'
              }`}>
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                  isDarkMode ? 'bg-green-600/20' : 'bg-green-100'
                }`}>
                  <CheckCircle className={`w-6 h-6 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                </div>
                <h3 className={`text-lg font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Ensure Compliance
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  Meet security standards like OWASP Mobile Top 10, MASVS, GDPR, and industry-specific regulations
                </p>
              </div>
              <div className={`rounded-2xl p-6 backdrop-blur-md border ${
                isDarkMode 
                  ? 'bg-slate-800/50 border-slate-700/50' 
                  : 'bg-white/70 border-white/50'
              }`}>
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                  isDarkMode ? 'bg-purple-600/20' : 'bg-purple-100'
                }`}>
                  <Eye className={`w-6 h-6 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                </div>
                <h3 className={`text-lg font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Build User Trust
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  Demonstrate commitment to security and privacy, building credibility with users and app stores
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`rounded-3xl p-12 backdrop-blur-md border ${
              isDarkMode 
                ? 'bg-slate-800/50 border-slate-700/50' 
                : 'bg-white/70 border-white/50'
            }`}>
              <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Secure Your Mobile Applications Today
              </h2>
              <p className={`text-lg mb-8 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Protect your mobile apps from security threats with our comprehensive VAPT services, 
                source code review, and expert security guidance. Ensure your applications meet the 
                highest security standards before they reach your users.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className={`px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-purple-900/25' 
                    : 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-purple-500/25'
                }`}>
                  Get Mobile VAPT Assessment
                </button>
                <button className={`px-8 py-4 rounded-xl font-medium border-2 transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-slate-900' 
                    : 'border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white'
                }`}>
                  Schedule Consultation
                </button>
              </div>
              
              {/* Contact Information */}
              <div className="mt-8 pt-8 border-t border-slate-600/30">
                <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Need immediate assistance? Contact our mobile security experts
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
                  <a href="mailto:security@rnrconsulting.com" className={`text-sm font-medium ${
                    isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'
                  }`}>
                    security@rnrconsulting.com
                  </a>
                  <span className={`text-sm ${isDarkMode ? 'text-slate-500' : 'text-slate-400'} hidden sm:block`}>|</span>
                  <a href="tel:+1234567890" className={`text-sm font-medium ${
                    isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'
                  }`}>
                    +1 (234) 567-8900
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MobileAppSecurityPage3D;
