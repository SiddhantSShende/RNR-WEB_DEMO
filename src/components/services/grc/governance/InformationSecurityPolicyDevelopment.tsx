import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  Shield, CheckCircle, FileText, Users, 
  Mail, Phone, User, Send, Home, ChevronRight, Settings
} from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';
import Navigation from '../../../Navigation';
import { Link } from 'react-router-dom';

const InformationSecurityPolicyDevelopment: React.FC = () => {
  const { isDarkMode } = useTheme();
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number | null>(null);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: 'Information Security Policy & Framework Development',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Service Inquiry:', formData);
    // SMTP integration will go here
  };

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

    // Create animated background particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 2000;
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);
    
    for(let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 20;
      posArray[i + 1] = (Math.random() - 0.5) * 20;
      posArray[i + 2] = (Math.random() - 0.5) * 20;
      
      const isBlue = Math.random() > 0.6;
      colorArray[i] = isBlue ? 0.23 : 1;
      colorArray[i + 1] = isBlue ? 0.51 : 1;
      colorArray[i + 2] = isBlue ? 0.96 : 1;
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
  }, []);

  const keyFeatures = [
    {
      icon: Shield,
      title: "Comprehensive Policy Framework",
      description: "Development of complete information security policy suite covering all aspects of organizational security"
    },
    {
      icon: FileText,
      title: "Regulatory Alignment",
      description: "Policies aligned with ISO 27001, NIST, SOC 2, and other industry standards and regulations"
    },
    {
      icon: Settings,
      title: "Customized Implementation",
      description: "Tailored policies that fit your organization's unique business requirements and risk profile"
    },
    {
      icon: Users,
      title: "Stakeholder Engagement",
      description: "Collaborative approach involving key stakeholders to ensure buy-in and practical implementation"
    }
  ];

  const deliverables = [
    "Information Security Policy Documentation Suite",
    "Security Standards and Procedures Manual",
    "Implementation Roadmap and Timeline",
    "Training Materials and Awareness Resources",
    "Compliance Mapping and Gap Analysis",
    "Policy Review and Update Schedule"
  ];

  const benefits = [
    "Establish clear security governance structure",
    "Meet regulatory compliance requirements",
    "Reduce organizational security risks",
    "Improve incident response capabilities",
    "Enhance employee security awareness",
    "Create foundation for security maturity"
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
        <div className="pt-32 pb-8 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 text-sm">
              <Link to="/" className={`flex items-center transition-colors ${
                isDarkMode ? 'text-slate-400 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600'
              }`}>
                <Home className="h-4 w-4 mr-1" />
                Home
              </Link>
              <ChevronRight className={`h-4 w-4 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
              <Link to="/services/grc" className={`transition-colors ${
                isDarkMode ? 'text-slate-400 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600'
              }`}>
                GRC Services
              </Link>
              <ChevronRight className={`h-4 w-4 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
              <Link to="/services/grc/governance" className={`transition-colors ${
                isDarkMode ? 'text-slate-400 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600'
              }`}>
                Governance Services
              </Link>
              <ChevronRight className={`h-4 w-4 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
              <span className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                Policy & Framework Development
              </span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className={`inline-flex items-center px-4 py-2 rounded-full mb-6 ${
                isDarkMode ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'
              }`}>
                <FileText className="h-5 w-5 mr-2" />
                <span className="font-medium">Governance Services</span>
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
                Establish robust information security governance through comprehensive policy frameworks 
                that align with industry standards and regulatory requirements while addressing your organization's unique needs.
              </p>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Key Features & Capabilities
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {keyFeatures.map((feature, index) => (
                <div key={index} className={`backdrop-blur-md rounded-2xl border p-8 transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-slate-800/30 border-slate-700/50' 
                    : 'bg-white/30 border-white/50'
                }`}>
                  <feature.icon className="h-12 w-12 text-blue-500 mb-4" />
                  <h3 className={`text-xl font-bold mb-4 ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    {feature.title}
                  </h3>
                  <p className={`leading-relaxed ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Deliverables & Benefits */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Deliverables */}
              <div className={`backdrop-blur-md rounded-2xl border p-8 ${
                isDarkMode 
                  ? 'bg-slate-800/30 border-slate-700/50' 
                  : 'bg-white/30 border-white/50'
              }`}>
                <h3 className={`text-2xl font-bold mb-6 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  Key Deliverables
                </h3>
                <ul className="space-y-4">
                  {deliverables.map((deliverable, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        {deliverable}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className={`backdrop-blur-md rounded-2xl border p-8 ${
                isDarkMode 
                  ? 'bg-slate-800/30 border-slate-700/50' 
                  : 'bg-white/30 border-white/50'
              }`}>
                <h3 className={`text-2xl font-bold mb-6 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  Business Benefits
                </h3>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className={`backdrop-blur-md border rounded-3xl p-12 shadow-2xl ${
              isDarkMode 
                ? 'bg-slate-800/40 border-slate-700/50' 
                : 'bg-white/40 border-white/60'
            }`}>
              <div className="text-center mb-12">
                <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  Leave Us a Message
                </h2>
                <p className={`text-lg ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Ready to establish robust information security policies? Contact our experts today.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-semibold mb-3 ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className={`absolute left-3 top-3 h-5 w-5 ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-500'
                      }`} />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className={`w-full pl-12 pr-4 py-3 rounded-xl backdrop-blur-sm border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          isDarkMode 
                            ? 'bg-slate-800/50 border-slate-700 text-white placeholder-slate-400' 
                            : 'bg-white/50 border-white/50 text-slate-900 placeholder-slate-500'
                        }`}
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-semibold mb-3 ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className={`absolute left-3 top-3 h-5 w-5 ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-500'
                      }`} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={`w-full pl-12 pr-4 py-3 rounded-xl backdrop-blur-sm border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          isDarkMode 
                            ? 'bg-slate-800/50 border-slate-700 text-white placeholder-slate-400' 
                            : 'bg-white/50 border-white/50 text-slate-900 placeholder-slate-500'
                        }`}
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-semibold mb-3 ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className={`absolute left-3 top-3 h-5 w-5 ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-500'
                      }`} />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-4 py-3 rounded-xl backdrop-blur-sm border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          isDarkMode 
                            ? 'bg-slate-800/50 border-slate-700 text-white placeholder-slate-400' 
                            : 'bg-white/50 border-white/50 text-slate-900 placeholder-slate-500'
                        }`}
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-semibold mb-3 ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Service
                    </label>
                    <input
                      type="text"
                      name="service"
                      value={formData.service}
                      readOnly
                      className={`w-full px-4 py-3 rounded-xl backdrop-blur-sm border ${
                        isDarkMode 
                          ? 'bg-slate-800/30 border-slate-700 text-slate-300' 
                          : 'bg-white/30 border-white/50 text-slate-700'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-3 ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className={`w-full px-4 py-3 rounded-xl backdrop-blur-sm border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                      isDarkMode 
                        ? 'bg-slate-800/50 border-slate-700 text-white placeholder-slate-400' 
                        : 'bg-white/50 border-white/50 text-slate-900 placeholder-slate-500'
                    }`}
                    placeholder="Tell us about your information security policy requirements, current challenges, or questions about our governance services..."
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="inline-flex items-center px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default InformationSecurityPolicyDevelopment;
