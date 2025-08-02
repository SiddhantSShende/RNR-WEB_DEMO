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
    vapt: [
      {
        title: "Application Vulnerability Assessment",
        description: "Automated scanning to detect known security vulnerabilities using industry-standard tools",
        icon: Search,
        features: [
          "Automated scanning with Burp Suite, Nessus, OpenVAS",
          "Misconfiguration detection",
          "Outdated component identification",
          "Exposed data discovery",
          "Severity rating and vulnerability categorization"
        ]
      },
      {
        title: "Application Penetration Testing",
        description: "Manual exploitation of vulnerabilities by security experts simulating real-world attacks",
        icon: Shield,
        features: [
          "Manual testing by security professionals",
          "Simulated cyberattacks (ethical hacking)",
          "Login bypass and privilege escalation testing",
          "XSS, SQL injection, and CSRF exploitation",
          "Business logic flaw validation"
        ]
      },
      {
        title: "Combined VAPT Approach",
        description: "Comprehensive security assessment combining automated and manual testing methodologies",
        icon: Zap,
        features: [
          "Complete security risk picture",
          "Vulnerability validation and exploitation",
          "Technical and business logic flaw identification",
          "Authentication and session management testing",
          "API and third-party integration security"
        ]
      }
    ],
    sourceCodeReview: [
      {
        title: "Comprehensive Source Code Analysis",
        description: "Deep analysis of application codebase to uncover hidden security vulnerabilities and coding flaws",
        icon: Code,
        features: [
          "Hidden security vulnerability detection",
          "Coding errors and logic flaw identification",
          "Security best practices compliance checking",
          "Line-by-line code examination",
          "Business and user data exposure prevention"
        ]
      },
      {
        title: "Automated Code Scanning",
        description: "Industry-trusted automated tools for comprehensive vulnerability detection",
        icon: Monitor,
        features: [
          "SonarQube implementation",
          "HCL APP-SCAN integration",
          "Insecure code pattern detection",
          "Outdated library identification",
          "Hardcoded secrets discovery (API keys, passwords)"
        ]
      },
      {
        title: "Manual Security Review",
        description: "Expert manual inspection of critical code components that automated tools cannot fully assess",
        icon: Eye,
        features: [
          "Business logic error analysis",
          "Broken authentication and access control review",
          "Insecure data processing examination",
          "Poor session handling identification",
          "Architecture and framework security assessment"
        ]
      }
    ],
    thickClientVAPT: [
      {
        title: "Desktop Application Security Testing",
        description: "Specialized security testing for thick client applications that process and store data locally",
        icon: Cpu,
        features: [
          "Client-side processing vulnerability assessment",
          "Local data storage security analysis",
          "Network communication security testing",
          "Desktop application specific threat modeling",
          "Binary analysis and reverse engineering"
        ]
      },
      {
        title: "Local Storage Security Assessment",
        description: "Detailed examination of how sensitive data is stored, encrypted, and managed on client devices",
        icon: Lock,
        features: [
          "Registry entry security analysis",
          "File system storage examination",
          "Data encryption implementation review",
          "Access control validation",
          "Sensitive information exposure detection"
        ]
      },
      {
        title: "Network Communication Analysis",
        description: "Comprehensive testing of network protocols and data transmission security",
        icon: Terminal,
        features: [
          "Protocol security assessment",
          "Encryption implementation testing",
          "Client-server communication analysis",
          "Man-in-the-middle attack simulation",
          "Certificate validation testing"
        ]
      }
    ],
    apiSecurity: [
      {
        title: "API Security Assessment",
        description: "Comprehensive testing and analysis of API endpoints to identify security vulnerabilities",
        icon: Terminal,
        features: [
          "API endpoint vulnerability scanning",
          "Authentication and authorization testing",
          "Input validation and injection testing",
          "Rate limiting and DoS protection assessment",
          "OWASP API Top 10 compliance verification"
        ]
      },
      {
        title: "API Documentation & Discovery",
        description: "Discovery and security analysis of documented and undocumented API endpoints",
        icon: Search,
        features: [
          "Shadow API discovery",
          "API documentation analysis",
          "Endpoint enumeration and mapping",
          "Version control and deprecation assessment",
          "API gateway security configuration review"
        ]
      },
      {
        title: "API Threat Modeling",
        description: "Systematic identification of potential security threats specific to API implementations",
        icon: AlertTriangle,
        features: [
          "API-specific threat identification",
          "Data flow security analysis",
          "Trust boundary assessment",
          "Attack vector modeling",
          "Risk assessment and prioritization"
        ]
      }
    ],
    sdlc: [
      {
        title: "Secure Software Development Lifecycle",
        description: "Implementation of security throughout the entire software development process",
        icon: Settings,
        features: [
          "Security requirements integration",
          "Secure design principles implementation",
          "Security checkpoints at each phase",
          "Developer security training programs",
          "Continuous security validation"
        ]
      },
      {
        title: "DevSecOps Integration",
        description: "Embedding security practices into DevOps pipelines for continuous security delivery",
        icon: Monitor,
        features: [
          "CI/CD security integration",
          "Automated security testing",
          "Security as code implementation",
          "Continuous monitoring and feedback",
          "Security metrics and reporting"
        ]
      },
      {
        title: "Security Training & Awareness",
        description: "Comprehensive security education for development teams and stakeholders",
        icon: Eye,
        features: [
          "Secure coding training programs",
          "Security awareness workshops",
          "Threat modeling education",
          "Security tool training",
          "Best practices documentation"
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
              Comprehensive security testing for web applications, mobile apps, APIs, and thick client applications. 
              From VAPT and source code review to secure SDLC implementation - secure your applications from the inside out.
            </p>
            
            {/* Key Services Overview */}
            <div className="grid md:grid-cols-5 gap-4 mt-12 max-w-5xl mx-auto">
              <div className={`p-4 rounded-xl backdrop-blur-md border ${
                isDarkMode ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white/70 border-white/50'
              }`}>
                <Search className={`w-8 h-8 mx-auto mb-2 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} />
                <p className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  VAPT Testing
                </p>
              </div>
              <div className={`p-4 rounded-xl backdrop-blur-md border ${
                isDarkMode ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white/70 border-white/50'
              }`}>
                <Code className={`w-8 h-8 mx-auto mb-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <p className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Code Review
                </p>
              </div>
              <div className={`p-4 rounded-xl backdrop-blur-md border ${
                isDarkMode ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white/70 border-white/50'
              }`}>
                <Terminal className={`w-8 h-8 mx-auto mb-2 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                <p className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  API Security
                </p>
              </div>
              <div className={`p-4 rounded-xl backdrop-blur-md border ${
                isDarkMode ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white/70 border-white/50'
              }`}>
                <Cpu className={`w-8 h-8 mx-auto mb-2 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                <p className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Thick Client
                </p>
              </div>
              <div className={`p-4 rounded-xl backdrop-blur-md border ${
                isDarkMode ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white/70 border-white/50'
              }`}>
                <Settings className={`w-8 h-8 mx-auto mb-2 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                <p className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Secure SDLC
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Service Sections */}
        <ServiceSection 
          title="Application VAPT (Vulnerability Assessment & Penetration Testing)"
          description="Comprehensive vulnerability assessment and penetration testing combining automated scanning with manual exploitation testing"
          services={appSecurityServices.vapt}
          colorClass={isDarkMode ? "bg-red-600/20" : "bg-red-100"}
        />

        <ServiceSection 
          title="Source Code Security Review"
          description="Deep analysis of application source code using automated tools and expert manual review to identify security vulnerabilities"
          services={appSecurityServices.sourceCodeReview}
          colorClass={isDarkMode ? "bg-blue-600/20" : "bg-blue-100"}
        />

        <ServiceSection 
          title="Thick Client Application VAPT"
          description="Specialized security testing for desktop applications that process and store data locally with unique security challenges"
          services={appSecurityServices.thickClientVAPT}
          colorClass={isDarkMode ? "bg-purple-600/20" : "bg-purple-100"}
        />

        <ServiceSection 
          title="API Security Assessment"
          description="Comprehensive testing and analysis of API endpoints to identify vulnerabilities and ensure secure data exchange"
          services={appSecurityServices.apiSecurity}
          colorClass={isDarkMode ? "bg-green-600/20" : "bg-green-100"}
        />

        <ServiceSection 
          title="Secure SDLC & DevSecOps"
          description="Implementation of security throughout the software development lifecycle with DevSecOps integration and training"
          services={appSecurityServices.sdlc}
          colorClass={isDarkMode ? "bg-orange-600/20" : "bg-orange-100"}
        />

        {/* Why Application Security Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-4xl font-bold text-center mb-12 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Why Application Security is Critical
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
                  <Shield className={`w-6 h-6 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} />
                </div>
                <h3 className={`text-lg font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Prevent Data Breaches
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  Identify and fix vulnerabilities before attackers can exploit them to access sensitive data
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
                  <Code className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <h3 className={`text-lg font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Improve Code Quality
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  Enhance development team skills and implement secure coding practices across the organization
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
                  <FileCheck className={`w-6 h-6 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                </div>
                <h3 className={`text-lg font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Ensure Compliance
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  Meet regulatory requirements like ISO 27001, PCI-DSS, GDPR, and industry-specific standards
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
                  <Monitor className={`w-6 h-6 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                </div>
                <h3 className={`text-lg font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Build User Trust
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  Demonstrate commitment to security and protect your organization's reputation and customer confidence
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
                Secure Your Applications from the Inside Out
              </h2>
              <p className={`text-lg mb-8 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Protect your web applications, mobile apps, APIs, and desktop software with our comprehensive 
                security testing services. From VAPT and source code review to secure SDLC implementation - 
                we help you build and maintain secure applications that users can trust.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className={`px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-red-900/25' 
                    : 'bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-red-500/25'
                }`}>
                  Get Application Security Assessment
                </button>
                <button className={`px-8 py-4 rounded-xl font-medium border-2 transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'border-red-400 text-red-400 hover:bg-red-400 hover:text-slate-900' 
                    : 'border-red-600 text-red-600 hover:bg-red-600 hover:text-white'
                }`}>
                  Schedule Security Consultation
                </button>
              </div>
              
              {/* Services Quick Access */}
              <div className="mt-8 pt-8 border-t border-slate-600/30">
                <p className={`text-sm mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Popular Services:
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode ? 'bg-red-600/20 text-red-400' : 'bg-red-100 text-red-700'
                  }`}>
                    Web App VAPT
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-700'
                  }`}>
                    Source Code Review
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode ? 'bg-green-600/20 text-green-400' : 'bg-green-100 text-green-700'
                  }`}>
                    API Security
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode ? 'bg-purple-600/20 text-purple-400' : 'bg-purple-100 text-purple-700'
                  }`}>
                    Thick Client Testing
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ApplicationSecurityPage3D;
