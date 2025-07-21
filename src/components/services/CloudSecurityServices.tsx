import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  Cloud, Shield, Key, Settings,
  ArrowRight, Mail, Phone, User, Send
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import Navigation from '../Navigation';
import { Link } from 'react-router-dom';

const CloudSecurityServices: React.FC = () => {
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

    // Create animated background particles with Cloud Security theme
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 2900;
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);
    
    for(let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 29;
      posArray[i + 1] = (Math.random() - 0.5) * 29;
      posArray[i + 2] = (Math.random() - 0.5) * 29;
      
      const isSky = Math.random() > 0.45;
      colorArray[i] = isSky ? 0.53 : 0.95;
      colorArray[i + 1] = isSky ? 0.81 : 0.95;
      colorArray[i + 2] = isSky ? 0.98 : 0.95;
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

  const services = [
    {
      title: "Azure, AWS, GCP Security Posture Review",
      description: "Comprehensive security assessment of cloud infrastructure across major cloud platforms including configuration reviews, security controls evaluation, and compliance checks.",
      icon: Cloud,
      link: "/services/cloud-security/posture-review"
    },
    {
      title: "Identity & Access Management (IAM) Hardening",
      description: "Strengthening cloud identity and access management through privilege analysis, role optimization, multi-factor authentication implementation, and access policy refinement.",
      icon: Key,
      link: "/services/cloud-security/iam-hardening"
    },
    {
      title: "Secure Architecture Design",
      description: "Design and implementation of secure cloud architectures following best practices for network segmentation, encryption, monitoring, and compliance requirements.",
      icon: Settings,
      link: "/services/cloud-security/architecture-design"
    },
    {
      title: "Cloud Infrastructure VAPT",
      description: "Comprehensive vulnerability assessment and penetration testing of cloud infrastructure including network security, container security, and serverless function testing.",
      icon: Shield,
      link: "/services/cloud-security/cloud-vapt"
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-sky-900 to-blue-900' 
        : 'bg-gradient-to-br from-slate-50 via-sky-50 to-blue-100'
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
                isDarkMode ? 'bg-sky-600/20 text-sky-400' : 'bg-sky-100 text-sky-600'
              }`}>
                <Cloud className="h-5 w-5 mr-2" />
                <span className="font-medium">Cloud Security Solutions</span>
              </div>
              
              <h1 className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent ${
                isDarkMode 
                  ? 'from-sky-400 via-blue-300 to-cyan-300' 
                  : 'from-sky-600 via-blue-600 to-cyan-600'
              }`}>
                Cloud Security
              </h1>
              
              <p className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Comprehensive cloud security services to protect your cloud infrastructure across AWS, Azure, 
                and GCP with advanced security posture management and penetration testing capabilities.
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Our Cloud Security Services
              </h2>
              <p className={`text-xl max-w-3xl mx-auto ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Expert cloud security solutions for modern multi-cloud environments
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div key={index} className={`backdrop-blur-md rounded-2xl border p-8 transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/50' 
                    : 'bg-white/30 border-white/50 hover:bg-white/50'
                }`}>
                  <div className="flex items-start space-x-6">
                    <div className={`p-4 rounded-xl ${
                      isDarkMode ? 'bg-sky-600/20' : 'bg-sky-100'
                    }`}>
                      <service.icon className={`h-8 w-8 ${
                        isDarkMode ? 'text-sky-400' : 'text-sky-600'
                      }`} />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className={`text-2xl font-bold mb-3 ${
                        isDarkMode ? 'text-white' : 'text-slate-900'
                      }`}>
                        {service.title}
                      </h3>
                      <p className={`text-lg mb-6 ${
                        isDarkMode ? 'text-slate-300' : 'text-slate-600'
                      }`}>
                        {service.description}
                      </p>
                      
                      <Link 
                        to={service.link} 
                        className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                          isDarkMode 
                            ? 'bg-sky-600 hover:bg-sky-700 text-white' 
                            : 'bg-sky-600 hover:bg-sky-700 text-white'
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
                Leave Us a Message
              </h2>
              <p className={`text-xl ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Ready to secure your cloud infrastructure? Connect with our cloud security specialists.
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
                            ? 'bg-slate-900/50 border-slate-700 text-white placeholder-slate-400 focus:border-sky-500' 
                            : 'bg-white/50 border-slate-300 text-slate-900 placeholder-slate-500 focus:border-sky-500'
                        } focus:outline-none focus:ring-2 focus:ring-sky-500/20`}
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
                            ? 'bg-slate-900/50 border-slate-700 text-white placeholder-slate-400 focus:border-sky-500' 
                            : 'bg-white/50 border-slate-300 text-slate-900 placeholder-slate-500 focus:border-sky-500'
                        } focus:outline-none focus:ring-2 focus:ring-sky-500/20`}
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
                          ? 'bg-slate-900/50 border-slate-700 text-white placeholder-slate-400 focus:border-sky-500' 
                          : 'bg-white/50 border-slate-300 text-slate-900 placeholder-slate-500 focus:border-sky-500'
                      } focus:outline-none focus:ring-2 focus:ring-sky-500/20`}
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
                    value="Cloud Security Services"
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
                      ? 'bg-sky-600 hover:bg-sky-700 text-white' 
                      : 'bg-sky-600 hover:bg-sky-700 text-white'
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

export default CloudSecurityServices;
