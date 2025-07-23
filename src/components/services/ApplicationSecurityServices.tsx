import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  Shield, Lock, Code, Search, Database, CheckCircle,
  ArrowRight, Mail, Phone, Send, FileText, Settings
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import Navigation from '../Navigation';
import { Link } from 'react-router-dom';

const ApplicationSecurityServices: React.FC = () => {
  const { isDarkMode } = useTheme();
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Three.js scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Create animated background particles with blue theme to match website
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 2000;
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);
    
    for(let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 20;
      posArray[i + 1] = (Math.random() - 0.5) * 20;
      posArray[i + 2] = (Math.random() - 0.5) * 20;
      
      if (isDarkMode) {
        // Dark mode: Blue and white particles
        const isBlue = Math.random() > 0.6;
        colorArray[i] = isBlue ? 0.23 : 1;
        colorArray[i + 1] = isBlue ? 0.51 : 1;
        colorArray[i + 2] = isBlue ? 0.96 : 1;
      } else {
        // Light mode: Darker blue and gray particles for visibility
        const isBlue = Math.random() > 0.5;
        colorArray[i] = isBlue ? 0.12 : 0.4;
        colorArray[i + 1] = isBlue ? 0.35 : 0.4;
        colorArray[i + 2] = isBlue ? 0.8 : 0.5;
      }
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: isDarkMode ? 0.005 : 0.008,
      vertexColors: true,
      transparent: true,
      opacity: isDarkMode ? 0.8 : 0.6,
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.001;
      
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isDarkMode]);

  const serviceCategories = [
    {
      title: "Thick Client VAPT",
      description: "Comprehensive vulnerability assessment and penetration testing for desktop applications",
      icon: Shield,
      services: [
        "Binary analysis and reverse engineering techniques",
        "Client-side security controls assessment",
        "Local data storage security review",
        "Network communication security analysis",
        "Authentication bypass and privilege escalation testing",
        "Memory corruption and buffer overflow assessment"
      ],
      link: "/services/application-security/thick-client"
    },
    {
      title: "Secure SDLC Integration",
      description: "Security integration throughout the software development lifecycle",
      icon: Settings,
      services: [
        "Security requirements gathering and threat modeling",
        "Secure coding guidelines and best practices implementation",
        "DevSecOps pipeline integration and automation",
        "Security testing frameworks and continuous assessment",
        "Code review processes and security gate implementations",
        "Developer security training and awareness programs"
      ],
      link: "/services/application-security/secure-sdlc"
    },
    {
      title: "Source Code Review",
      description: "In-depth static analysis and manual review of application source code",
      icon: FileText,
      services: [
        "Manual code review by certified security experts",
        "Static Application Security Testing (SAST) implementation",
        "Security vulnerability identification and classification",
        "Code quality assessment and architecture review",
        "Business logic flaw detection and analysis",
        "Comprehensive remediation guidance and support"
      ],
      link: "/services/application-security/source-code-review"
    },
    {
      title: "App Vulnerability Assessment and Penetration Testing",
      description: "Comprehensive security testing for web and mobile applications",
      icon: Search,
      services: [
        "OWASP Top 10 vulnerability assessment and testing",
        "Business logic flaw identification and exploitation",
        "Session management and authentication testing",
        "Input validation and injection attack assessment",
        "Authorization and access control evaluation",
        "Client-side security and data exposure analysis"
      ],
      link: "/services/application-security/app-vapt"
    },
    {
      title: "API Security Assessment",
      description: "Specialized security testing for REST, GraphQL, and SOAP APIs",
      icon: Database,
      services: [
        "API endpoint discovery and security mapping",
        "Authentication and authorization mechanism testing",
        "Input validation and injection vulnerability assessment",
        "Rate limiting and denial-of-service protection evaluation",
        "Data exposure and privacy compliance analysis",
        "API versioning security and documentation review"
      ],
      link: "/services/application-security/api-security"
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'
    }`}>
      {/* Three.js Background */}
      <div ref={mountRef} className="fixed inset-0 z-0" />
      
      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen">
        {/* Navigation */}
        <Navigation />

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className={`inline-flex items-center px-4 py-2 rounded-full mb-6 ${
                isDarkMode ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'
              }`}>
                <Lock className="h-5 w-5 mr-2" />
                <span className="font-medium">Application Security</span>
              </div>
              
              <h1 className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent ${
                isDarkMode 
                  ? 'from-blue-400 via-blue-300 to-indigo-300' 
                  : 'from-blue-600 via-blue-700 to-indigo-700'
              }`}>
                Application Security Services
              </h1>
              
              <p className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Comprehensive security testing and assessment services to protect your applications 
                throughout their entire development lifecycle and operational deployment.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Our Application Security Service Classifications
              </h2>
              <p className={`text-xl max-w-3xl mx-auto ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Comprehensive application security services designed to protect your digital assets 
                through every stage of the development and deployment lifecycle.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {serviceCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <div
                    key={index}
                    className={`group relative p-8 rounded-3xl border transition-all duration-500 hover:scale-105 ${
                      isDarkMode
                        ? 'bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-blue-500/50'
                        : 'bg-white/70 backdrop-blur-sm border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${
                      isDarkMode ? 'bg-blue-600/20' : 'bg-blue-100'
                    }`}>
                      <Icon className={`w-8 h-8 ${
                        isDarkMode ? 'text-blue-400' : 'text-blue-600'
                      }`} />
                    </div>
                    
                    <h3 className={`text-2xl font-bold mb-4 ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}>
                      {category.title}
                    </h3>
                    
                    <p className={`text-lg mb-6 leading-relaxed ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      {category.description}
                    </p>
                    
                    <ul className="space-y-3 mb-8">
                      {category.services.map((service, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <CheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                            isDarkMode ? 'text-blue-400' : 'text-blue-600'
                          }`} />
                          <span className={`leading-relaxed ${
                            isDarkMode ? 'text-slate-400' : 'text-slate-600'
                          }`}>
                            {service}
                          </span>
                        </li>
                      ))}
                    </ul>
                    
                    <Link
                      to="/contact"
                      className={`inline-flex items-center font-semibold transition-all duration-300 group-hover:translate-x-2 ${
                        isDarkMode ? 'text-blue-400' : 'text-blue-600'
                      }`}
                    >
                      Learn More <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Get Started with Us Section */}
        <section className="py-32 px-4">
          <div className="max-w-4xl mx-auto">
            <div className={`relative overflow-hidden rounded-3xl p-12 ${
              isDarkMode
                ? 'bg-slate-800/50 backdrop-blur-sm border border-slate-700/50'
                : 'bg-white/70 backdrop-blur-sm border-slate-200 shadow-2xl'
            }`}>
              <div className="text-center mb-12">
                <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  Get Started with Us
                </h2>
                
                <p className={`text-xl leading-relaxed ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  Ready to secure your applications? Fill out the form below and our Application Security experts will get in touch with you.
                </p>
              </div>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                        isDarkMode
                          ? 'bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-400'
                          : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                        isDarkMode
                          ? 'bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-400'
                          : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Contact Number *
                    </label>
                    <input
                      type="tel"
                      required
                      className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                        isDarkMode
                          ? 'bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-400'
                          : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      placeholder="Enter your contact number"
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Service
                    </label>
                    <input
                      type="text"
                      value="Application Security"
                      readOnly
                      className={`w-full px-4 py-3 rounded-lg border ${
                        isDarkMode
                          ? 'bg-slate-600/30 border-slate-600 text-slate-300'
                          : 'bg-slate-100 border-slate-300 text-slate-600'
                      } cursor-not-allowed`}
                    />
                  </div>
                </div>
                
                <div className="text-center pt-8">
                  <button
                    type="submit"
                    className={`inline-flex items-center px-12 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                      isDarkMode
                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/25'
                        : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/25'
                    }`}
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`${
          isDarkMode ? 'bg-slate-900/80' : 'bg-slate-900'
        } text-white py-16 px-4`}>
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="col-span-1">
                <div className="flex items-center space-x-2 mb-4">
                  <Shield className="w-8 h-8 text-blue-400" />
                  <span className="text-2xl font-bold">RNR Consulting</span>
                </div>
                <p className="text-slate-400 mb-4">
                  Leading provider of Application Security services, protecting your digital assets 
                  with comprehensive security testing and assessment solutions.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4 text-blue-400">Application Security Services</h4>
                <ul className="space-y-2 text-slate-400">
                  <li><a href="#" className="hover:text-white transition-colors">Thick Client VAPT</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Secure SDLC Integration</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Source Code Review</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">App VAPT</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">API Security Assessment</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4 text-blue-400">Other Services</h4>
                <ul className="space-y-2 text-slate-400">
                  <li><Link to="/services/grc" className="hover:text-white transition-colors">GRC Services</Link></li>
                  <li><Link to="/services/tprm" className="hover:text-white transition-colors">TPRM Services</Link></li>
                  <li><Link to="/services/bcms" className="hover:text-white transition-colors">BCMS Services</Link></li>
                  <li><Link to="/services/cloud-security" className="hover:text-white transition-colors">Cloud Security</Link></li>
                  <li><Link to="/services/mobile-security" className="hover:text-white transition-colors">Mobile Security</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4 text-blue-400">Contact Info</h4>
                <ul className="space-y-3 text-slate-400">
                  <li className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>appsec@rnrconsulting.com</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>+1 (555) 123-4567</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Lock className="w-4 h-4" />
                    <span>Certified Security Professionals</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-slate-800 pt-8 mt-12 text-center text-slate-400">
              <p>&copy; 2024 RNR Consulting. All rights reserved. | Application Security Services</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ApplicationSecurityServices;
