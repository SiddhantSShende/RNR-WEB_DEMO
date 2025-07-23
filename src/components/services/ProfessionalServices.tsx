import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  Users, FileText, TrendingUp, Building, Scale, BookOpen,
  ArrowRight, Mail, Phone, User, Send, CheckCircle
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import Navigation from '../Navigation';
import { Link } from 'react-router-dom';

const ProfessionalServices: React.FC = () => {
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

    // Create animated background particles with professional theme
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 2200;
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);
    
    for(let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 22;
      posArray[i + 1] = (Math.random() - 0.5) * 22;
      posArray[i + 2] = (Math.random() - 0.5) * 22;
      
      const isPurple = Math.random() > 0.5;
      colorArray[i] = isPurple ? 0.67 : 0.91;
      colorArray[i + 1] = isPurple ? 0.37 : 0.76;
      colorArray[i + 2] = isPurple ? 0.78 : 0.17;
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
      particlesMesh.rotation.y += 0.0005;
      
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
      title: "Business Strategy & Advisory",
      description: "Strategic business consulting and advisory services",
      icon: TrendingUp,
      services: [
        "Business Strategy Development",
        "Market Analysis & Research", 
        "Competitive Intelligence",
        "Business Process Optimization",
        "Performance Management Systems"
      ],
      link: "/services/professional/business-strategy"
    },
    {
      title: "Management Consulting",
      description: "Organizational development and management consulting",
      icon: Users,
      services: [
        "Organizational Structure Design",
        "Change Management Programs",
        "Leadership Development",
        "Talent Management Strategies",
        "Culture Transformation"
      ],
      link: "/services/professional/management-consulting"
    },
    {
      title: "Legal & Regulatory Advisory",
      description: "Legal compliance and regulatory advisory services",
      icon: Scale,
      services: [
        "Regulatory Compliance Advisory",
        "Contract Review & Analysis",
        "Legal Risk Assessment",
        "Policy Development & Review",
        "Dispute Resolution Support"
      ],
      link: "/services/professional/legal-advisory"
    },
    {
      title: "Training & Development",
      description: "Professional training and capability development programs",
      icon: BookOpen,
      services: [
        "Executive Training Programs",
        "Skills Development Workshops",
        "Certification Training",
        "E-Learning Platform Development",
        "Training Needs Assessment"
      ],
      link: "/services/professional/training"
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900' 
        : 'bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100'
    }`}>
      {/* Three.js Background */}
      <div ref={mountRef} className="fixed inset-0 z-0" />
      
      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen">
        {/* Navigation */}
        <Navigation />

        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className={`inline-flex items-center px-3 py-1.5 rounded-full mb-4 ${
                isDarkMode ? 'bg-purple-600/20 text-purple-400' : 'bg-purple-100 text-purple-600'
              }`}>
                <Building className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Professional Excellence</span>
              </div>
              
              <h1 className={`text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent ${
                isDarkMode 
                  ? 'from-purple-400 via-violet-300 to-indigo-300' 
                  : 'from-purple-600 via-violet-600 to-indigo-600'
              }`}>
                Professional Services
              </h1>
              
              <p className={`text-lg max-w-3xl mx-auto leading-relaxed ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Expert professional services to drive organizational excellence, strategic growth, 
                and operational efficiency across all facets of your business.
              </p>
            </div>
          </div>
        </section>

        {/* Services Categories Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Our Professional Service Categories
              </h2>
              <p className={`text-lg max-w-2xl mx-auto ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Comprehensive professional services to enhance your organizational capabilities
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {serviceCategories.map((category, index) => (
                <div key={index} className={`backdrop-blur-md rounded-xl border p-6 transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/50' 
                    : 'bg-white/30 border-white/50 hover:bg-white/50'
                }`}>
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${
                      isDarkMode ? 'bg-purple-600/20' : 'bg-purple-100'
                    }`}>
                      <category.icon className={`h-6 w-6 ${
                        isDarkMode ? 'text-purple-400' : 'text-purple-600'
                      }`} />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold mb-2 ${
                        isDarkMode ? 'text-white' : 'text-slate-900'
                      }`}>
                        {category.title}
                      </h3>
                      <p className={`text-sm mb-4 ${
                        isDarkMode ? 'text-slate-300' : 'text-slate-600'
                      }`}>
                        {category.description}
                      </p>
                      
                      <div className="space-y-2 mb-4">
                        {category.services.map((service, serviceIndex) => (
                          <div key={serviceIndex} className="flex items-center space-x-2">
                            <CheckCircle className={`h-4 w-4 flex-shrink-0 ${
                              isDarkMode ? 'text-green-400' : 'text-green-600'
                            }`} />
                            <span className={`text-sm ${
                              isDarkMode ? 'text-slate-200' : 'text-slate-700'
                            }`}>
                              {service}
                            </span>
                          </div>
                        ))}
                      </div>
                      
                      <Link 
                        to={category.link} 
                        className={`inline-flex items-center px-4 py-2 text-sm rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                          isDarkMode 
                            ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                            : 'bg-purple-600 hover:bg-purple-700 text-white'
                        }`}
                      >
                        Learn More
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className={`py-16 px-4 ${
          isDarkMode ? 'bg-slate-800/20' : 'bg-white/20'
        } backdrop-blur-sm`}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Elevate Your Organization
              </h2>
              <p className={`text-lg ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Ready to unlock your organization's full potential? Let's discuss your professional service needs.
              </p>
            </div>

            <div className={`backdrop-blur-md rounded-xl border p-6 ${
              isDarkMode 
                ? 'bg-slate-800/40 border-slate-700/50' 
                : 'bg-white/40 border-white/50'
            }`}>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${
                      isDarkMode ? 'text-slate-200' : 'text-slate-700'
                    }`}>
                      Full Name
                    </label>
                    <div className="relative">
                      <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-500'
                      }`} />
                      <input
                        type="text"
                        className={`w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border transition-colors ${
                          isDarkMode 
                            ? 'bg-slate-900/50 border-slate-700 text-white placeholder-slate-400 focus:border-purple-500' 
                            : 'bg-white/50 border-slate-300 text-slate-900 placeholder-slate-500 focus:border-purple-500'
                        } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${
                      isDarkMode ? 'text-slate-200' : 'text-slate-700'
                    }`}>
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-500'
                      }`} />
                      <input
                        type="email"
                        className={`w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border transition-colors ${
                          isDarkMode 
                            ? 'bg-slate-900/50 border-slate-700 text-white placeholder-slate-400 focus:border-purple-500' 
                            : 'bg-white/50 border-slate-300 text-slate-900 placeholder-slate-500 focus:border-purple-500'
                        } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    isDarkMode ? 'text-slate-200' : 'text-slate-700'
                  }`}>
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-500'
                    }`} />
                    <input
                      type="tel"
                      className={`w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border transition-colors ${
                        isDarkMode 
                          ? 'bg-slate-900/50 border-slate-700 text-white placeholder-slate-400 focus:border-purple-500' 
                          : 'bg-white/50 border-slate-300 text-slate-900 placeholder-slate-500 focus:border-purple-500'
                      } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    isDarkMode ? 'text-slate-200' : 'text-slate-700'
                  }`}>
                    Service
                  </label>
                  <input
                    type="text"
                    value="Professional Services"
                    readOnly
                    className={`w-full px-4 py-2.5 text-sm rounded-lg border ${
                      isDarkMode 
                        ? 'bg-slate-900/50 border-slate-700 text-slate-400' 
                        : 'bg-slate-100/50 border-slate-300 text-slate-500'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full flex items-center justify-center px-6 py-3 text-sm rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                    isDarkMode 
                      ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                >
                  <Send className="h-4 w-4 mr-2" />
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

export default ProfessionalServices;
