import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  Users, Shield, CheckCircle, Settings,
  ArrowRight, Mail, Phone, User, Send,
  FileCheck, Eye, AlertTriangle, BarChart3,
  Search, TrendingUp, UserCheck, Award
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import Navigation from '../Navigation';
import { Link } from 'react-router-dom';

const TPRMServices: React.FC = () => {
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
      title: "TPRM Program Design & Implementation",
      description: "Complete framework design and implementation for third-party risk management",
      icon: Settings,
      services: [
        "Design & setup of complete TPRM framework",
        "Policy and procedure development aligned with ISO 27001, NIST, RBI, and other standards",
        "Risk scoring model and risk-tiering methodology"
      ],
      link: "/services/tprm/program-design-implementation"
    },
    {
      title: "Vendor Risk Assessment",
      description: "Comprehensive vendor evaluation and risk assessment services",
      icon: Search,
      services: [
        "Initial vendor risk assessment and classification",
        "Due diligence processes and security evaluations",
        "Vendor compliance verification and documentation"
      ],
      link: "/services/tprm/vendor-risk-assessment"
    },
    {
      title: "Third-Party Risk Assessment Tools",
      description: "Technology solutions and automated tools for efficient risk assessment",
      icon: Eye,
      services: [
        "Evaluation and/or integration of automated TPRM platforms",
        "Custom dashboards for third-party tracking and reporting",
        "Integration with GRC platforms and internal audit functions"
      ],
      link: "/services/tprm/assessment-tools"
    },
    {
      title: "Ongoing Monitoring & Reassessments",
      description: "Continuous monitoring and periodic reassessment services",
      icon: TrendingUp,
      services: [
        "Periodic reassessments and compliance checks",
        "Threat intelligence monitoring for key vendors",
        "SLA / KPI reviews and incident tracking"
      ],
      link: "/services/tprm/ongoing-monitoring"
    },
    {
      title: "Remediation & Governance",
      description: "Risk treatment, governance, and remediation management services",
      icon: Shield,
      services: [
        "Risk treatment and mitigation planning",
        "Support in drafting contract clauses for data protection, cybersecurity, and compliance",
        "Escalation framework and governance reporting"
      ],
      link: "/services/tprm/remediation-governance"
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
                <Users className="h-5 w-5 mr-2" />
                <span className="font-medium">Third-Party Risk Management</span>
              </div>
              
              <h1 className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent ${
                isDarkMode 
                  ? 'from-blue-400 via-blue-300 to-indigo-300' 
                  : 'from-blue-600 via-blue-700 to-indigo-700'
              }`}>
                TPRM Services
              </h1>
              
              <p className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Comprehensive Third-Party Risk Management solutions to secure your vendor ecosystem, 
                minimize supply chain risks, and ensure continuous compliance across all business partnerships.
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
                Our TPRM Service Categories
              </h2>
              <p className={`text-xl max-w-3xl mx-auto ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                End-to-end solutions covering all aspects of third-party risk management and vendor governance
              </p>
            </div>

            <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8">
              {serviceCategories.map((category, index) => (
                <div key={index} className={`backdrop-blur-md rounded-2xl border p-8 transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/50' 
                    : 'bg-white/30 border-white/50 hover:bg-white/50'
                }`}>
                  <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
                    {/* Category Header */}
                    <div className="lg:w-1/3 mb-6 lg:mb-0">
                      <div className="flex items-center mb-4">
                        <category.icon className="h-12 w-12 text-blue-500 mr-4" />
                        <div>
                          <h3 className={`text-2xl font-bold ${
                            isDarkMode ? 'text-white' : 'text-slate-900'
                          }`}>
                            {category.title}
                          </h3>
                        </div>
                      </div>
                      <p className={`text-lg leading-relaxed mb-6 ${
                        isDarkMode ? 'text-slate-300' : 'text-slate-600'
                      }`}>
                        {category.description}
                      </p>
                      <Link 
                        to={category.link}
                        className={`inline-flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                          isDarkMode
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        Explore Services
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </div>

                    {/* Services List */}
                    <div className="lg:w-2/3">
                      <h4 className={`text-lg font-semibold mb-4 ${
                        isDarkMode ? 'text-blue-400' : 'text-blue-600'
                      }`}>
                        Key Services:
                      </h4>
                      <ul className="grid md:grid-cols-1 gap-3">
                        {category.services.map((service, serviceIndex) => (
                          <li key={serviceIndex} className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className={`${
                              isDarkMode ? 'text-slate-300' : 'text-slate-700'
                            }`}>
                              {service}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Our TPRM Services */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Why Choose Our TPRM Services?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: "Comprehensive Risk Assessment",
                  description: "360-degree evaluation of vendor security postures, compliance status, and operational risks."
                },
                {
                  icon: TrendingUp,
                  title: "Scalable Solutions",
                  description: "Flexible frameworks that grow with your organization and vendor ecosystem."
                },
                {
                  icon: UserCheck,
                  title: "Expert Guidance",
                  description: "Industry-leading consultants with deep expertise in third-party risk management."
                },
                {
                  icon: AlertTriangle,
                  title: "Proactive Monitoring",
                  description: "Real-time risk intelligence and automated alerts for emerging threats."
                },
                {
                  icon: Settings,
                  title: "Technology Integration",
                  description: "Seamless integration with existing GRC platforms and business systems."
                },
                {
                  icon: Award,
                  title: "Regulatory Compliance",
                  description: "Ensure adherence to industry standards and regulatory requirements."
                }
              ].map((benefit, index) => (
                <div key={index} className={`backdrop-blur-md rounded-2xl border p-8 transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-slate-800/30 border-slate-700/50' 
                    : 'bg-white/30 border-white/50'
                }`}>
                  <benefit.icon className="h-12 w-12 text-blue-500 mb-4" />
                  <h3 className={`text-xl font-bold mb-4 ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    {benefit.title}
                  </h3>
                  <p className={`leading-relaxed ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {benefit.description}
                  </p>
                </div>
              ))}
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
                <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  Get Started with TPRM
                </h2>
                <p className={`text-lg ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Ready to secure your vendor ecosystem? Contact our TPRM experts today.
                </p>
              </div>

              <form className="space-y-8">
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
                      Company Name
                    </label>
                    <input
                      type="text"
                      className={`w-full px-4 py-3 rounded-xl backdrop-blur-sm border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isDarkMode 
                          ? 'bg-slate-800/50 border-slate-700 text-white placeholder-slate-400' 
                          : 'bg-white/50 border-white/50 text-slate-900 placeholder-slate-500'
                      }`}
                      placeholder="Enter your company name"
                    />
                  </div>
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
                        className={`w-full pl-12 pr-4 py-3 rounded-xl backdrop-blur-sm border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          isDarkMode 
                            ? 'bg-slate-800/50 border-slate-700 text-white placeholder-slate-400' 
                            : 'bg-white/50 border-white/50 text-slate-900 placeholder-slate-500'
                        }`}
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-3 ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Service Interest
                  </label>
                  <select
                    className={`w-full px-4 py-3 rounded-xl backdrop-blur-sm border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isDarkMode 
                        ? 'bg-slate-800/50 border-slate-700 text-white' 
                        : 'bg-white/50 border-white/50 text-slate-900'
                    }`}
                  >
                    <option value="">Select a TPRM service</option>
                    <option value="vendor-assessment">Vendor Assessment & Onboarding</option>
                    <option value="continuous-monitoring">Continuous Monitoring & Intelligence</option>
                    <option value="contract-management">Contract & Relationship Management</option>
                    <option value="risk-analytics">Risk Analytics & Reporting</option>
                    <option value="comprehensive">Comprehensive TPRM Program</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-3 ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Message *
                  </label>
                  <textarea
                    required
                    rows={6}
                    className={`w-full px-4 py-3 rounded-xl backdrop-blur-sm border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                      isDarkMode 
                        ? 'bg-slate-800/50 border-slate-700 text-white placeholder-slate-400' 
                        : 'bg-white/50 border-white/50 text-slate-900 placeholder-slate-500'
                    }`}
                    placeholder="Tell us about your third-party risk management requirements, current challenges, or questions you have about securing your vendor ecosystem..."
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

              {/* Contact Information */}
              <div className="mt-16 pt-12 border-t border-slate-700/30">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                      isDarkMode ? 'bg-blue-600' : 'bg-blue-600'
                    }`}>
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <h4 className={`font-semibold mb-2 ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}>
                      Phone
                    </h4>
                    <p className={`${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      +1 (555) 123-4567
                    </p>
                  </div>
                  <div>
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                      isDarkMode ? 'bg-blue-600' : 'bg-blue-600'
                    }`}>
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <h4 className={`font-semibold mb-2 ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}>
                      Email
                    </h4>
                    <p className={`${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      tprm@rnrconsulting.com
                    </p>
                  </div>
                  <div>
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                      isDarkMode ? 'bg-blue-600' : 'bg-blue-600'
                    }`}>
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <h4 className={`font-semibold mb-2 ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}>
                      TPRM Experts
                    </h4>
                    <p className={`${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Available 24/7
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TPRMServices;
