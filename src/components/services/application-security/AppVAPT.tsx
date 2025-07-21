import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  Search, Shield, Target, Globe, CheckCircle,
  Mail, Phone, User, Send, Bug,
  Lock, Zap, FileCheck, AlertTriangle, Eye
} from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';
import Navigation from '../../Navigation';

const AppVAPT: React.FC = () => {
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
                <Search className="h-5 w-5 mr-2" />
                <span className="font-medium">Vulnerability Assessment & Penetration Testing</span>
              </div>
              
              <h1 className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent ${
                isDarkMode 
                  ? 'from-blue-400 via-blue-300 to-indigo-300' 
                  : 'from-blue-600 via-blue-700 to-indigo-700'
              }`}>
                Application VAPT
              </h1>
              
              <p className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Comprehensive web and mobile application security testing to identify vulnerabilities, 
                business logic flaws, and security misconfigurations through advanced penetration testing techniques.
              </p>
            </div>
          </div>
        </section>

        {/* Service Overview */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className={`text-4xl font-bold mb-8 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  Advanced Application Security Testing
                </h2>
                <div className="space-y-6">
                  <p className={`text-lg leading-relaxed ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    Our Application VAPT service combines automated vulnerability scanning with expert manual 
                    penetration testing to identify security weaknesses in web applications, mobile apps, and 
                    web services. We simulate real-world attack scenarios to uncover critical vulnerabilities.
                  </p>
                  <p className={`text-lg leading-relaxed ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    Our approach covers OWASP Top 10 vulnerabilities, business logic flaws, authentication 
                    bypasses, and complex attack chains that automated tools alone cannot detect.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Bug, title: "OWASP Top 10", desc: "Comprehensive coverage" },
                  { icon: Target, title: "Manual Testing", desc: "Expert penetration testing" },
                  { icon: Globe, title: "Multi-Platform", desc: "Web & mobile apps" },
                  { icon: AlertTriangle, title: "Business Logic", desc: "Complex flaw detection" }
                ].map((item, index) => (
                  <div key={index} className={`backdrop-blur-md rounded-xl border p-6 ${
                    isDarkMode 
                      ? 'bg-slate-800/30 border-slate-700/50' 
                      : 'bg-white/30 border-white/50'
                  }`}>
                    <item.icon className="h-10 w-10 text-blue-500 mb-3" />
                    <h3 className={`font-bold mb-2 ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}>
                      {item.title}
                    </h3>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testing Methodology */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Our VAPT Methodology
              </h2>
              <p className={`text-xl max-w-3xl mx-auto ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Systematic approach combining automated tools with expert manual testing
              </p>
            </div>

            <div className="grid gap-8">
              {[
                {
                  phase: "Reconnaissance & Information Gathering",
                  icon: Eye,
                  description: "Comprehensive application mapping and intelligence gathering",
                  activities: [
                    "Application architecture analysis",
                    "Technology stack identification",
                    "Attack surface mapping",
                    "Subdomain and endpoint discovery"
                  ]
                },
                {
                  phase: "Automated Vulnerability Scanning",
                  icon: Zap,
                  description: "Automated detection of common vulnerabilities and misconfigurations",
                  activities: [
                    "OWASP Top 10 vulnerability scanning",
                    "SSL/TLS configuration testing",
                    "Directory and file enumeration",
                    "Common vulnerability pattern matching"
                  ]
                },
                {
                  phase: "Manual Penetration Testing",
                  icon: Target,
                  description: "Expert manual testing to identify complex vulnerabilities",
                  activities: [
                    "Business logic flaw testing",
                    "Authentication bypass attempts",
                    "Authorization testing",
                    "Session management evaluation"
                  ]
                },
                {
                  phase: "Exploitation & Impact Assessment",
                  icon: AlertTriangle,
                  description: "Proof-of-concept exploitation to demonstrate real-world impact",
                  activities: [
                    "Vulnerability chaining",
                    "Privilege escalation testing",
                    "Data extraction attempts",
                    "Impact documentation"
                  ]
                }
              ].map((phase, index) => (
                <div key={index} className={`backdrop-blur-md rounded-2xl border p-8 ${
                  isDarkMode 
                    ? 'bg-slate-800/30 border-slate-700/50' 
                    : 'bg-white/30 border-white/50'
                }`}>
                  <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
                    <div className="lg:w-1/3 mb-6 lg:mb-0">
                      <div className="flex items-center mb-4">
                        <phase.icon className="h-12 w-12 text-blue-500 mr-4" />
                        <div>
                          <h3 className={`text-2xl font-bold ${
                            isDarkMode ? 'text-white' : 'text-slate-900'
                          }`}>
                            {phase.phase}
                          </h3>
                        </div>
                      </div>
                      <p className={`text-lg leading-relaxed ${
                        isDarkMode ? 'text-slate-300' : 'text-slate-600'
                      }`}>
                        {phase.description}
                      </p>
                    </div>
                    
                    <div className="lg:w-2/3">
                      <ul className="grid md:grid-cols-2 gap-3">
                        {phase.activities.map((activity, activityIndex) => (
                          <li key={activityIndex} className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className={`${
                              isDarkMode ? 'text-slate-300' : 'text-slate-700'
                            }`}>
                              {activity}
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

        {/* Vulnerability Categories */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Vulnerability Categories Tested
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  category: "OWASP Top 10",
                  icon: Bug,
                  vulnerabilities: [
                    "Injection Flaws (SQL, NoSQL, LDAP)",
                    "Broken Authentication",
                    "Sensitive Data Exposure",
                    "XML External Entities (XXE)",
                    "Security Misconfiguration"
                  ]
                },
                {
                  category: "Input Validation",
                  icon: Shield,
                  vulnerabilities: [
                    "Cross-Site Scripting (XSS)",
                    "Cross-Site Request Forgery (CSRF)",
                    "Server-Side Request Forgery (SSRF)",
                    "File Upload Vulnerabilities",
                    "Path Traversal"
                  ]
                },
                {
                  category: "Authentication & Session",
                  icon: Lock,
                  vulnerabilities: [
                    "Weak Password Policies",
                    "Session Fixation",
                    "Insecure Direct Object References",
                    "Privilege Escalation",
                    "JWT Vulnerabilities"
                  ]
                },
                {
                  category: "Business Logic",
                  icon: Target,
                  vulnerabilities: [
                    "Workflow Bypass",
                    "Race Conditions",
                    "Price Manipulation",
                    "Function Level Access Control",
                    "Time-Based Attacks"
                  ]
                },
                {
                  category: "Infrastructure",
                  icon: Globe,
                  vulnerabilities: [
                    "Server Misconfigurations",
                    "Insecure HTTP Headers",
                    "SSL/TLS Weaknesses",
                    "Information Disclosure",
                    "Denial of Service (DoS)"
                  ]
                },
                {
                  category: "API Security",
                  icon: Zap,
                  vulnerabilities: [
                    "Broken Object Level Authorization",
                    "Excessive Data Exposure",
                    "Mass Assignment",
                    "Rate Limiting Issues",
                    "GraphQL Vulnerabilities"
                  ]
                }
              ].map((category, index) => (
                <div key={index} className={`backdrop-blur-md rounded-xl border p-6 ${
                  isDarkMode 
                    ? 'bg-slate-800/30 border-slate-700/50' 
                    : 'bg-white/30 border-white/50'
                }`}>
                  <category.icon className="h-10 w-10 text-blue-500 mb-4" />
                  <h3 className={`text-lg font-bold mb-4 ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    {category.category}
                  </h3>
                  <ul className="space-y-2">
                    {category.vulnerabilities.map((vuln, vulnIndex) => (
                      <li key={vulnIndex} className={`text-sm flex items-start space-x-2 ${
                        isDarkMode ? 'text-slate-300' : 'text-slate-600'
                      }`}>
                        <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                        <span>{vuln}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Types */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Applications We Test
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  type: "Web Applications",
                  icon: Globe,
                  examples: ["E-commerce Sites", "CRM Systems", "ERP Platforms", "Custom Web Apps"]
                },
                {
                  type: "Mobile Applications",
                  icon: Target,
                  examples: ["iOS Apps", "Android Apps", "Hybrid Apps", "Progressive Web Apps"]
                },
                {
                  type: "Web Services & APIs",
                  icon: Zap,
                  examples: ["REST APIs", "SOAP Services", "GraphQL APIs", "Microservices"]
                },
                {
                  type: "Single Page Applications",
                  icon: Eye,
                  examples: ["React Apps", "Angular Apps", "Vue.js Apps", "JavaScript SPAs"]
                }
              ].map((type, index) => (
                <div key={index} className={`backdrop-blur-md rounded-xl border p-6 ${
                  isDarkMode 
                    ? 'bg-slate-800/30 border-slate-700/50' 
                    : 'bg-white/30 border-white/50'
                }`}>
                  <type.icon className="h-10 w-10 text-blue-500 mb-4" />
                  <h3 className={`text-lg font-bold mb-4 ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    {type.type}
                  </h3>
                  <ul className="space-y-2">
                    {type.examples.map((example, exampleIndex) => (
                      <li key={exampleIndex} className={`text-sm ${
                        isDarkMode ? 'text-slate-300' : 'text-slate-600'
                      }`}>
                        • {example}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Deliverables */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                VAPT Deliverables
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  deliverable: "Executive Summary",
                  icon: FileCheck,
                  description: "High-level risk overview, business impact assessment, and strategic security recommendations for leadership."
                },
                {
                  deliverable: "Technical Report",
                  icon: Bug,
                  description: "Detailed technical findings with step-by-step exploitation proof-of-concepts and evidence screenshots."
                },
                {
                  deliverable: "Vulnerability Matrix",
                  icon: Target,
                  description: "Prioritized vulnerability listing with CVSS scores, exploitability ratings, and business impact analysis."
                },
                {
                  deliverable: "Remediation Guide",
                  icon: Shield,
                  description: "Specific remediation steps, code examples, and security best practices for each identified vulnerability."
                },
                {
                  deliverable: "Re-testing Report",
                  icon: Zap,
                  description: "Follow-up validation testing to confirm successful remediation of identified security issues."
                },
                {
                  deliverable: "Security Recommendations",
                  icon: Lock,
                  description: "Strategic security improvements, secure development guidelines, and long-term security roadmap."
                }
              ].map((item, index) => (
                <div key={index} className={`backdrop-blur-md rounded-xl border p-6 transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-slate-800/30 border-slate-700/50' 
                    : 'bg-white/30 border-white/50'
                }`}>
                  <item.icon className="h-10 w-10 text-blue-500 mb-4" />
                  <h3 className={`text-lg font-bold mb-3 ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    {item.deliverable}
                  </h3>
                  <p className={`text-sm leading-relaxed ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {item.description}
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
                  Get Your Application Tested
                </h2>
                <p className={`text-lg ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Ready to identify vulnerabilities in your application? Contact our penetration testing experts.
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
                    Application Type
                  </label>
                  <select
                    className={`w-full px-4 py-3 rounded-xl backdrop-blur-sm border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isDarkMode 
                        ? 'bg-slate-800/50 border-slate-700 text-white' 
                        : 'bg-white/50 border-white/50 text-slate-900'
                    }`}
                  >
                    <option value="">Select application type</option>
                    <option value="web-application">Web Application</option>
                    <option value="mobile-application">Mobile Application</option>
                    <option value="api-services">API/Web Services</option>
                    <option value="spa">Single Page Application</option>
                    <option value="hybrid">Hybrid Application</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-3 ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Service Interest
                  </label>
                  <input
                    type="text"
                    value="App Vulnerability Assessment and Penetration Testing"
                    readOnly
                    className={`w-full px-4 py-3 rounded-xl backdrop-blur-sm border ${
                      isDarkMode 
                        ? 'bg-slate-800/30 border-slate-700 text-slate-400' 
                        : 'bg-slate-100/50 border-slate-300 text-slate-500'
                    }`}
                  />
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
                    placeholder="Tell us about your application (URL if available), technology stack, scope of testing, timeline requirements, and any specific security concerns..."
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

export default AppVAPT;
