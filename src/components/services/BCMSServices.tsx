import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  Shield, AlertTriangle, CheckCircle, Settings,
  ArrowRight, Mail, Phone, Send,
  FileCheck, Eye, BarChart3,
  Search, TrendingUp, Award
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import Navigation from '../Navigation';
import { Link } from 'react-router-dom';

const BCMSServices: React.FC = () => {
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
      title: "BCMS Framework Design & Implementation",
      description: "Comprehensive framework design aligned with ISO 22301 standards",
      icon: Settings,
      services: [
        "Development of business continuity policy and governance structure",
        "Identification of critical business functions and dependencies",
        "Establishment of roles, responsibilities, and escalation procedures",
        "Alignment with ISO 22301 and sector-specific guidelines (e.g., RBI, SEBI, IRDAI)"
      ],
      link: "/services/bcms/framework"
    },
    {
      title: "Business Impact Analysis (BIA)",
      description: "Comprehensive assessment of business processes and impact estimation",
      icon: BarChart3,
      services: [
        "Identification of key business processes and interdependencies",
        "Estimation of potential impact due to disruptions (financial, operational, reputational)",
        "Definition of Recovery Time Objectives (RTO) and Recovery Point Objectives (RPO)"
      ],
      link: "/services/bcms/bia"
    },
    {
      title: "Risk Assessment & Strategy Development",
      description: "Threat assessment and comprehensive continuity strategy formulation",
      icon: Search,
      services: [
        "Threat and vulnerability assessment",
        "Continuity and recovery strategy formulation (people, process, technology)",
        "Integration with IT Disaster Recovery (DR) plans"
      ],
      link: "/services/bcms/risk-assessment"
    },
    {
      title: "Business Continuity & DR Plan Development",
      description: "Customized BC & DR plans with detailed recovery procedures",
      icon: FileCheck,
      services: [
        "Drafting and customizing BC & DR Plans per business unit",
        "Documentation of recovery procedures, communication protocols, and fallback operations",
        "Creation of Emergency Response and Crisis Management Plans"
      ],
      link: "/services/bcms/plan-development"
    },
    {
      title: "BC/DR Testing & Drills",
      description: "Comprehensive testing through exercises and simulations",
      icon: Eye,
      services: [
        "Tabletop exercises, walk-throughs, and full-scale simulations",
        "Testing of alternate site operations and failover capabilities",
        "Gap identification and improvement planning post-drill"
      ],
      link: "/services/bcms/testing"
    },
    {
      title: "Ongoing Monitoring, Maintenance & Awareness",
      description: "Continuous BCMS improvement and organizational readiness",
      icon: TrendingUp,
      services: [
        "Periodic BCMS audits and readiness assessments",
        "Training and awareness programs for staff",
        "Plan updates aligned with organizational or regulatory changes"
      ],
      link: "/services/bcms/monitoring"
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
                <Shield className="h-5 w-5 mr-2" />
                <span className="font-medium">Business Continuity Management System</span>
              </div>
              
              <h1 className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent ${
                isDarkMode 
                  ? 'from-blue-400 via-blue-300 to-indigo-300' 
                  : 'from-blue-600 via-blue-700 to-indigo-700'
              }`}>
                BCMS Services
              </h1>
              
              <p className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Comprehensive business continuity management solutions to ensure organizational resilience, 
                regulatory compliance, and seamless operations during disruptions.
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
                Our BCMS Service Classifications
              </h2>
              <p className={`text-xl max-w-3xl mx-auto ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Comprehensive business continuity management services designed to ensure organizational resilience 
                and regulatory compliance across all business functions.
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
                  Ready to strengthen your business continuity? Fill out the form below and our BCMS experts will get in touch with you.
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
                      value="Business Continuity Management System (BCMS)"
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
                  Leading provider of Business Continuity Management System services, 
                  ensuring organizational resilience and regulatory compliance.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4 text-blue-400">BCMS Services</h4>
                <ul className="space-y-2 text-slate-400">
                  <li><a href="#" className="hover:text-white transition-colors">Framework Design</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Business Impact Analysis</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Risk Assessment</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">BC/DR Planning</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4 text-blue-400">Other Services</h4>
                <ul className="space-y-2 text-slate-400">
                  <li><Link to="/services/grc" className="hover:text-white transition-colors">GRC Services</Link></li>
                  <li><Link to="/services/tprm" className="hover:text-white transition-colors">TPRM Services</Link></li>
                  <li><Link to="/services/cybersecurity" className="hover:text-white transition-colors">Cybersecurity</Link></li>
                  <li><Link to="/services" className="hover:text-white transition-colors">All Services</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4 text-blue-400">Contact Info</h4>
                <ul className="space-y-3 text-slate-400">
                  <li className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>bcms@rnrconsulting.com</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>+1 (555) 123-4567</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Award className="w-4 h-4" />
                    <span>ISO 22301 Certified Consultants</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-slate-800 pt-8 mt-12 text-center text-slate-400">
              <p>&copy; 2024 RNR Consulting. All rights reserved. | Business Continuity Management System Services</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default BCMSServices;
