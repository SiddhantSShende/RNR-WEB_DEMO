import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  FileText, Shield, CheckCircle, Target, AlertCircle,
  Mail, Phone, User, Send, ArrowLeft
} from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';
import Navigation from '../../../Navigation';
import { Link } from 'react-router-dom';

const PolicyFrameworkDevelopment: React.FC = () => {
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

    // Create animated background particles with blue theme
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 2900;
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);
    
    for(let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 29;
      posArray[i + 1] = (Math.random() - 0.5) * 29;
      posArray[i + 2] = (Math.random() - 0.5) * 29;
      
      const isBlue = Math.random() > 0.45;
      colorArray[i] = isBlue ? 0.37 : 0.95;
      colorArray[i + 1] = isBlue ? 0.51 : 0.95;
      colorArray[i + 2] = isBlue ? 0.98 : 0.95;
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
      
      particlesMesh.rotation.x += 0.0002;
      particlesMesh.rotation.y += 0.0006;
      
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

  const keyFeatures = [
    {
      title: "Comprehensive Policy Development",
      description: "Creation of robust information security policies covering all aspects of organizational security requirements and regulatory compliance.",
      icon: FileText
    },
    {
      title: "Framework Alignment",
      description: "Alignment with international standards including ISO 27001, NIST, COBIT, and industry-specific regulatory requirements.",
      icon: Target
    },
    {
      title: "Stakeholder Engagement",
      description: "Collaborative approach involving key stakeholders across departments to ensure practical and implementable security policies.",
      icon: Shield
    },
    {
      title: "Regular Review & Updates",
      description: "Ongoing maintenance and updates to policies and frameworks to address evolving threats and regulatory changes.",
      icon: AlertCircle
    }
  ];

  const deliverables = [
    "Information Security Policy Suite",
    "Security Framework Documentation",
    "Implementation Guidelines",
    "Compliance Mapping Documents",
    "Training Materials",
    "Review and Update Procedures"
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

        {/* Breadcrumb */}
        <section className="pt-24 pb-8 px-4">
          <div className="max-w-7xl mx-auto">
            <nav className="flex space-x-2 text-sm mb-4">
              <Link to="/" className={`${isDarkMode ? 'text-slate-400 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600'} transition-colors`}>
                Home
              </Link>
              <span className={isDarkMode ? 'text-slate-500' : 'text-slate-400'}>/</span>
              <Link to="/services/grc" className={`${isDarkMode ? 'text-slate-400 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600'} transition-colors`}>
                GRC Services
              </Link>
              <span className={isDarkMode ? 'text-slate-500' : 'text-slate-400'}>/</span>
              <Link to="/services/grc/governance" className={`${isDarkMode ? 'text-slate-400 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600'} transition-colors`}>
                Governance Services
              </Link>
              <span className={isDarkMode ? 'text-slate-500' : 'text-slate-400'}>/</span>
              <span className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}>
                Policy & Framework Development
              </span>
            </nav>
            
            <Link 
              to="/services/grc/governance" 
              className={`inline-flex items-center px-4 py-2 rounded-lg transition-colors ${
                isDarkMode ? 'text-slate-300 hover:text-blue-400 hover:bg-slate-800/50' : 'text-slate-600 hover:text-blue-600 hover:bg-white/50'
              }`}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Governance Services
            </Link>
          </div>
        </section>

        {/* Hero Section */}
        <section className="pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className={`inline-flex items-center px-4 py-2 rounded-full mb-6 ${
                isDarkMode ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'
              }`}>
                <FileText className="h-5 w-5 mr-2" />
                <span className="font-medium">Policy & Framework Development</span>
              </div>
              
              <h1 className={`text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent ${
                isDarkMode 
                  ? 'from-blue-400 via-blue-300 to-indigo-300' 
                  : 'from-blue-600 via-blue-700 to-indigo-700'
              }`}>
                Information Security Policy & Framework Development
              </h1>
              
              <p className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Comprehensive development of information security policies and frameworks aligned with 
                international standards to establish robust governance and compliance foundations.
              </p>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Key Features & Benefits
              </h2>
              <p className={`text-xl max-w-3xl mx-auto ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Our comprehensive approach to policy and framework development
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {keyFeatures.map((feature, index) => (
                <div key={index} className={`backdrop-blur-md rounded-2xl border p-8 transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/50' 
                    : 'bg-white/30 border-white/50 hover:bg-white/50'
                }`}>
                  <div className="flex items-start space-x-6">
                    <div className={`p-4 rounded-xl ${
                      isDarkMode ? 'bg-blue-600/20' : 'bg-blue-100'
                    }`}>
                      <feature.icon className={`h-8 w-8 ${
                        isDarkMode ? 'text-blue-400' : 'text-blue-600'
                      }`} />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className={`text-2xl font-bold mb-3 ${
                        isDarkMode ? 'text-white' : 'text-slate-900'
                      }`}>
                        {feature.title}
                      </h3>
                      <p className={`text-lg ${
                        isDarkMode ? 'text-slate-300' : 'text-slate-600'
                      }`}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Deliverables Section */}
        <section className={`py-20 px-4 ${
          isDarkMode ? 'bg-slate-800/20' : 'bg-white/20'
        } backdrop-blur-sm`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Service Deliverables
              </h2>
              <p className={`text-xl max-w-3xl mx-auto ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Comprehensive deliverables to ensure complete policy and framework implementation
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {deliverables.map((deliverable, index) => (
                <div key={index} className={`backdrop-blur-md rounded-xl border p-6 transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/60' 
                    : 'bg-white/40 border-white/50 hover:bg-white/60'
                }`}>
                  <div className="flex items-center space-x-4">
                    <CheckCircle className={`h-6 w-6 ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    }`} />
                    <h3 className={`text-lg font-semibold ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}>
                      {deliverable}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Leave Us a Message
              </h2>
              <p className={`text-xl ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Ready to develop comprehensive security policies? Let's discuss your requirements.
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
                            ? 'bg-slate-900/50 border-slate-700 text-white placeholder-slate-400 focus:border-blue-500' 
                            : 'bg-white/50 border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
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
                            ? 'bg-slate-900/50 border-slate-700 text-white placeholder-slate-400 focus:border-blue-500' 
                            : 'bg-white/50 border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
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
                          ? 'bg-slate-900/50 border-slate-700 text-white placeholder-slate-400 focus:border-blue-500' 
                          : 'bg-white/50 border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
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
                    value="Information Security Policy & Framework Development"
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
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
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

export default PolicyFrameworkDevelopment;
