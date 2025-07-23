import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  Shield, UserCheck, FileCheck, Search, Settings, Bug,
  BarChart3, Monitor, CheckCircle, Activity, Lightbulb, 
  TrendingUp, Users, AlertTriangle, BookOpen, Target,
  ArrowRight, Mail, User, Send
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import Navigation from '../Navigation';
import AnimatedContainer from '../AnimatedContainer';
import { Link } from 'react-router-dom';

const VirtualCISOServices: React.FC = () => {
  const { isDarkMode } = useTheme();
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number | null>(null);

  // Virtual CISO service data based on your requirements
  const services = [
    {
      icon: FileCheck,
      title: "Annual Policy Review",
      description: "Conduct comprehensive annual reviews of information security policies and procedures to ensure they remain current, effective, and aligned with business objectives and regulatory requirements.",
      link: "/contact"
    },
    {
      icon: Settings,
      title: "Policy Updates & Maintenance",
      description: "Update information security policies and procedures to meet evolving requirements, including new regulations, threats, and business changes while maintaining operational efficiency.",
      link: "/contact"
    },
    {
      icon: CheckCircle,
      title: "Compliance Response Management",
      description: "Provide expert responses to customers and regulators in compliance with applicable regulations and standards, ensuring accurate and timely communication during audits and assessments.",
      link: "/contact"
    },
    {
      icon: Search,
      title: "Annual Gap Assessments",
      description: "Perform comprehensive annual gap assessments to identify existing security and compliance deficiencies within the organization and develop remediation roadmaps.",
      link: "/contact"
    },
    {
      icon: Shield,
      title: "Security Controls Implementation",
      description: "Assist teams in implementing robust security controls and industry best practices, ensuring proper deployment, configuration, and ongoing effectiveness monitoring.",
      link: "/contact"
    },
    {
      icon: Bug,
      title: "VAPT Oversight & Management",
      description: "Ensure timely execution of Vulnerability Assessment and Penetration Testing (VAPT) activities, including scope definition, vendor management, and remediation tracking.",
      link: "/contact"
    },
    {
      icon: BarChart3,
      title: "Annual Risk Assessments",
      description: "Oversee completion of comprehensive annual risk assessments, including risk identification, analysis, evaluation, and treatment planning across all business areas.",
      link: "/contact"
    },
    {
      icon: Monitor,
      title: "CISO Dashboard Development",
      description: "Develop and maintain executive-level CISO dashboards for management reporting, providing clear visibility into security posture, metrics, and key performance indicators.",
      link: "/contact"
    },
    {
      icon: Target,
      title: "ISO 27001 Implementation",
      description: "Ensure implementation of ISO 27001 practices and compliance with international standards, including gap analysis, control implementation, and certification support.",
      link: "/contact"
    },
    {
      icon: Activity,
      title: "Key Activity Monitoring",
      description: "Monitor critical security activities including incident management, change management, risk management, and patch management processes for continuous improvement.",
      link: "/contact"
    },
    {
      icon: UserCheck,
      title: "Application Go-Live Approvals",
      description: "Approve go-live of applications and infrastructure by ensuring comprehensive due diligence, security reviews, and risk assessments are performed beforehand.",
      link: "/contact"
    },
    {
      icon: TrendingUp,
      title: "Strategic Security Direction",
      description: "Provide strategic direction for enhancing the organization's overall security posture through roadmap development, technology evaluation, and investment prioritization.",
      link: "/contact"
    },
    {
      icon: Lightbulb,
      title: "Business Alignment Strategy",
      description: "Collaborate with senior management to align security initiatives with business objectives, ensuring security investments support organizational growth and resilience.",
      link: "/contact"
    },
    {
      icon: AlertTriangle,
      title: "Threat & Vulnerability Guidance",
      description: "Guide organizations in addressing emerging threats and vulnerabilities through threat intelligence, security advisories, and proactive defense strategies.",
      link: "/contact"
    },
    {
      icon: BookOpen,
      title: "Incident Response Planning",
      description: "Assist in development of comprehensive incident response plans and ensure their effectiveness through regular drills, tabletop exercises, and real incident management.",
      link: "/contact"
    },
    {
      icon: Users,
      title: "Security Awareness Programs",
      description: "Advise on security awareness training programs for employees to foster a security-conscious culture and reduce human-related security risks across the organization.",
      link: "/contact"
    }
  ];

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
    const particleCount = 3200;
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);
    
    for(let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 32;
      posArray[i + 1] = (Math.random() - 0.5) * 32;
      posArray[i + 2] = (Math.random() - 0.5) * 32;
      
      const isBlue = Math.random() > 0.4;
      colorArray[i] = isBlue ? 0.2 : 0.95;
      colorArray[i + 1] = isBlue ? 0.5 : 0.95;
      colorArray[i + 2] = isBlue ? 0.9 : 0.95;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.006,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      particlesMesh.rotation.x += 0.0003;
      particlesMesh.rotation.y += 0.0004;
      
      renderer.render(scene, camera);
    };
    
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
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

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'
    }`}>
      {/* Background Animation */}
      <div 
        ref={mountRef} 
        className="fixed inset-0 z-0"
        style={{ background: 'transparent' }}
      />
      
      {/* Navigation */}
      <div className="relative z-10">
        <Navigation />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <AnimatedContainer animation="fadeIn" className="text-center mb-16">
              <div className={`inline-flex items-center px-4 py-2 rounded-full mb-6 ${
                isDarkMode ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'
              }`}>
                <UserCheck className="h-5 w-5 mr-2" />
                <span className="font-medium">Virtual CISO Solutions</span>
              </div>
              
              <h1 className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent ${
                isDarkMode 
                  ? 'from-blue-400 via-blue-300 to-indigo-300' 
                  : 'from-blue-600 via-blue-700 to-indigo-700'
              }`}>
                Virtual CISO Services
              </h1>
              
              <p className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Executive-level cybersecurity leadership without the overhead. Our Virtual CISO services provide 
                strategic guidance, compliance oversight, and comprehensive security program management tailored to your organization's needs.
              </p>
            </AnimatedContainer>

            <AnimatedContainer animation="slideUp" delay={200} duration={600} className="text-center mb-16">
              <p className={`text-lg ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Comprehensive cybersecurity leadership and strategic guidance for modern enterprises
              </p>
            </AnimatedContainer>

            {/* Services Grid - First 12 services in 3x4 grid */}
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-12">
              {services.slice(0, 12).map((service, index) => (
                <AnimatedContainer 
                  key={index} 
                  animation="scaleIn" 
                  delay={index * 80}
                  duration={600}
                  className={`backdrop-blur-md rounded-2xl border p-6 transition-all duration-300 hover:scale-105 ${
                    isDarkMode 
                      ? 'bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/50' 
                      : 'bg-white/30 border-white/50 hover:bg-white/50'
                  }`}
                >
                  <div className="text-center">
                    <div className={`inline-flex p-4 rounded-xl mb-4 ${
                      isDarkMode ? 'bg-blue-600/20' : 'bg-blue-100'
                    }`}>
                      <service.icon className={`h-8 w-8 ${
                        isDarkMode ? 'text-blue-400' : 'text-blue-600'
                      }`} />
                    </div>
                    
                    <h3 className={`text-xl font-bold mb-3 ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}>
                      {service.title}
                    </h3>
                    <p className={`text-sm mb-6 leading-relaxed ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      {service.description}
                    </p>
                    
                    <Link 
                      to={service.link} 
                      className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 ${
                        isDarkMode 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </div>
                </AnimatedContainer>
              ))}
            </div>

            {/* Last 4 services in 2x2 grid */}
            <div className="grid lg:grid-cols-2 gap-8">
              {services.slice(12).map((service, index) => (
                <AnimatedContainer 
                  key={index + 12} 
                  animation="scaleIn" 
                  delay={(index + 12) * 80}
                  duration={600}
                  className={`backdrop-blur-md rounded-2xl border p-8 transition-all duration-300 hover:scale-105 ${
                    isDarkMode 
                      ? 'bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/50' 
                      : 'bg-white/30 border-white/50 hover:bg-white/50'
                  }`}
                >
                  <div className="flex items-start space-x-6">
                    <div className={`p-4 rounded-xl ${
                      isDarkMode ? 'bg-blue-600/20' : 'bg-blue-100'
                    }`}>
                      <service.icon className={`h-8 w-8 ${
                        isDarkMode ? 'text-blue-400' : 'text-blue-600'
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
                            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        Learn More
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </Link>
                    </div>
                  </div>
                </AnimatedContainer>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className={`py-20 px-4 ${
          isDarkMode ? 'bg-slate-800/20' : 'bg-white/20'
        } backdrop-blur-sm`}>
          <div className="max-w-4xl mx-auto">
            <AnimatedContainer animation="fadeIn" className="text-center mb-12">
              <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Ready for Strategic Security Leadership?
              </h2>
              <p className={`text-xl ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Connect with our Virtual CISO experts to discuss your cybersecurity leadership needs and strategic objectives.
              </p>
            </AnimatedContainer>

            <AnimatedContainer animation="slideUp" delay={200} duration={600} className={`backdrop-blur-md rounded-2xl border p-8 ${
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
                    Company Name
                  </label>
                  <input
                    type="text"
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      isDarkMode 
                        ? 'bg-slate-900/50 border-slate-700 text-white placeholder-slate-400 focus:border-blue-500' 
                        : 'bg-white/50 border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    placeholder="Enter your company name"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-slate-200' : 'text-slate-700'
                  }`}>
                    Service Interest
                  </label>
                  <input
                    type="text"
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      isDarkMode 
                        ? 'bg-slate-900/50 border-slate-700 text-white placeholder-slate-400 focus:border-blue-500' 
                        : 'bg-white/50 border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    placeholder="Which V-CISO service interests you most?"
                    defaultValue="Virtual CISO Services"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-slate-200' : 'text-slate-700'
                  }`}>
                    Current Security Challenges
                  </label>
                  <textarea
                    rows={4}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      isDarkMode 
                        ? 'bg-slate-900/50 border-slate-700 text-white placeholder-slate-400 focus:border-blue-500' 
                        : 'bg-white/50 border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    placeholder="Describe your current cybersecurity challenges and strategic objectives..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className={`w-full flex items-center justify-center px-6 py-4 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                    isDarkMode 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  <Send className="h-5 w-5 mr-2" />
                  Get Strategic Consultation
                </button>
              </form>
            </AnimatedContainer>
          </div>
        </section>
      </div>
    </div>
  );
};

export default VirtualCISOServices;
