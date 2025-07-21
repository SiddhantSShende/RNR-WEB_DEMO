import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  Search, HardDrive, Fingerprint, Microscope, Shield,
  ArrowRight, Mail, Phone, User, Send, CheckCircle
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import Navigation from '../Navigation';
import { Link } from 'react-router-dom';

const DigitalForensics: React.FC = () => {
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

    // Create animated background particles with forensic theme
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 2800;
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);
    
    for(let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 28;
      posArray[i + 1] = (Math.random() - 0.5) * 28;
      posArray[i + 2] = (Math.random() - 0.5) * 28;
      
      const isYellow = Math.random() > 0.65;
      colorArray[i] = isYellow ? 0.98 : 0.13;
      colorArray[i + 1] = isYellow ? 0.84 : 0.59;
      colorArray[i + 2] = isYellow ? 0.25 : 0.94;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      particlesMesh.rotation.x += 0.0003;
      particlesMesh.rotation.y += 0.0008;
      
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
  }, []);

  const serviceCategories = [
    {
      title: "Computer Forensics",
      description: "Comprehensive digital evidence recovery and analysis",
      icon: HardDrive,
      services: [
        "Hard Drive & SSD Analysis",
        "Deleted File Recovery", 
        "Registry Analysis",
        "Timeline Reconstruction",
        "Hash Verification & Authentication"
      ],
      link: "/services/digital-forensics/computer"
    },
    {
      title: "Mobile Device Forensics",
      description: "Mobile device data extraction and analysis",
      icon: Fingerprint,
      services: [
        "iOS & Android Device Analysis",
        "App Data Recovery",
        "Call Log & SMS Analysis",
        "Location Data Extraction",
        "Cloud Backup Analysis"
      ],
      link: "/services/digital-forensics/mobile"
    },
    {
      title: "Network Forensics",
      description: "Network traffic analysis and incident investigation",
      icon: Search,
      services: [
        "Network Traffic Analysis",
        "Log File Examination",
        "Intrusion Detection Analysis",
        "Packet Capture Investigation",
        "Network Timeline Reconstruction"
      ],
      link: "/services/digital-forensics/network"
    },
    {
      title: "Cyber Incident Response",
      description: "Rapid response and forensic investigation for cyber incidents",
      icon: Shield,
      services: [
        "Incident Containment & Analysis",
        "Malware Analysis & Reverse Engineering",
        "Data Breach Investigation",
        "Evidence Preservation",
        "Expert Witness Testimony"
      ],
      link: "/services/digital-forensics/incident-response"
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-yellow-900 to-orange-900' 
        : 'bg-gradient-to-br from-slate-50 via-yellow-50 to-orange-100'
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
                isDarkMode ? 'bg-yellow-600/20 text-yellow-400' : 'bg-yellow-100 text-yellow-600'
              }`}>
                <Microscope className="h-5 w-5 mr-2" />
                <span className="font-medium">Digital Investigation</span>
              </div>
              
              <h1 className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent ${
                isDarkMode 
                  ? 'from-yellow-400 via-orange-300 to-red-300' 
                  : 'from-yellow-600 via-orange-600 to-red-600'
              }`}>
                Digital Forensics
              </h1>
              
              <p className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Expert digital forensics and incident response services to uncover digital evidence, 
                investigate cyber incidents, and provide litigation support with forensic precision.
              </p>
            </div>
          </div>
        </section>

        {/* Services Categories Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Our Digital Forensics Service Categories
              </h2>
              <p className={`text-xl max-w-3xl mx-auto ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Comprehensive digital investigation services with forensic accuracy and legal compliance
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {serviceCategories.map((category, index) => (
                <div key={index} className={`backdrop-blur-md rounded-2xl border p-8 transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/50' 
                    : 'bg-white/30 border-white/50 hover:bg-white/50'
                }`}>
                  <div className="flex items-start space-x-6">
                    <div className={`p-4 rounded-xl ${
                      isDarkMode ? 'bg-yellow-600/20' : 'bg-yellow-100'
                    }`}>
                      <category.icon className={`h-8 w-8 ${
                        isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
                      }`} />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className={`text-2xl font-bold mb-3 ${
                        isDarkMode ? 'text-white' : 'text-slate-900'
                      }`}>
                        {category.title}
                      </h3>
                      <p className={`text-lg mb-6 ${
                        isDarkMode ? 'text-slate-300' : 'text-slate-600'
                      }`}>
                        {category.description}
                      </p>
                      
                      <div className="space-y-3 mb-6">
                        {category.services.map((service, serviceIndex) => (
                          <div key={serviceIndex} className={`p-3 rounded-lg border ${
                            isDarkMode 
                              ? 'bg-slate-900/30 border-slate-700/30' 
                              : 'bg-slate-50/50 border-slate-200/50'
                          }`}>
                            <div className="flex items-start space-x-3">
                              <CheckCircle className={`h-5 w-5 mt-1 flex-shrink-0 ${
                                isDarkMode ? 'text-green-400' : 'text-green-600'
                              }`} />
                              <span className={`text-sm font-medium ${
                                isDarkMode ? 'text-slate-200' : 'text-slate-700'
                              }`}>
                                {service}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <Link 
                        to={category.link} 
                        className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                          isDarkMode 
                            ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                            : 'bg-yellow-600 hover:bg-yellow-700 text-white'
                        }`}
                      >
                        Learn More
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className={`py-20 px-4 ${
          isDarkMode ? 'bg-slate-800/20' : 'bg-white/20'
        } backdrop-blur-sm`}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Uncover Digital Evidence
              </h2>
              <p className={`text-xl ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Need expert digital forensics assistance? Our certified forensic investigators are ready to help.
              </p>
            </div>

            <div className={`backdrop-blur-md rounded-2xl border p-8 ${
              isDarkMode 
                ? 'bg-slate-800/40 border-slate-700/50' 
                : 'bg-white/40 border-white/50'
            }`}>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-slate-200' : 'text-slate-700'
                    }`}>
                      Full Name
                    </label>
                    <div className="relative">
                      <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-500'
                      }`} />
                      <input
                        type="text"
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors ${
                          isDarkMode 
                            ? 'bg-slate-900/50 border-slate-700 text-white placeholder-slate-400 focus:border-yellow-500' 
                            : 'bg-white/50 border-slate-300 text-slate-900 placeholder-slate-500 focus:border-yellow-500'
                        } focus:outline-none focus:ring-2 focus:ring-yellow-500/20`}
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-slate-200' : 'text-slate-700'
                    }`}>
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-500'
                      }`} />
                      <input
                        type="email"
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors ${
                          isDarkMode 
                            ? 'bg-slate-900/50 border-slate-700 text-white placeholder-slate-400 focus:border-yellow-500' 
                            : 'bg-white/50 border-slate-300 text-slate-900 placeholder-slate-500 focus:border-yellow-500'
                        } focus:outline-none focus:ring-2 focus:ring-yellow-500/20`}
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-slate-200' : 'text-slate-700'
                  }`}>
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-500'
                    }`} />
                    <input
                      type="tel"
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors ${
                        isDarkMode 
                          ? 'bg-slate-900/50 border-slate-700 text-white placeholder-slate-400 focus:border-yellow-500' 
                          : 'bg-white/50 border-slate-300 text-slate-900 placeholder-slate-500 focus:border-yellow-500'
                      } focus:outline-none focus:ring-2 focus:ring-yellow-500/20`}
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-slate-200' : 'text-slate-700'
                  }`}>
                    Service
                  </label>
                  <input
                    type="text"
                    value="Digital Forensics"
                    readOnly
                    className={`w-full px-4 py-3 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-slate-900/50 border-slate-700 text-slate-400' 
                        : 'bg-slate-100/50 border-slate-300 text-slate-500'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                    isDarkMode 
                      ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                      : 'bg-yellow-600 hover:bg-yellow-700 text-white'
                  }`}
                >
                  <Send className="h-5 w-5 mr-2" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DigitalForensics;
