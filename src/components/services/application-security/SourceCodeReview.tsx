import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  Code, Shield, Search, FileText, CheckCircle,
  ArrowRight, Mail, Phone, User, Send, Bug,
  Target, Zap, FileCheck, GitBranch, Eye
} from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';
import Navigation from '../../Navigation';

const SourceCodeReview: React.FC = () => {
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
                <Code className="h-5 w-5 mr-2" />
                <span className="font-medium">Static Code Analysis</span>
              </div>
              
              <h1 className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent ${
                isDarkMode 
                  ? 'from-blue-400 via-blue-300 to-indigo-300' 
                  : 'from-blue-600 via-blue-700 to-indigo-700'
              }`}>
                Source Code Review
              </h1>
              
              <p className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Comprehensive static analysis and manual code review to identify security vulnerabilities, 
                coding flaws, and compliance issues in your application source code.
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
                  Advanced Source Code Security Analysis
                </h2>
                <div className="space-y-6">
                  <p className={`text-lg leading-relaxed ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    Our Source Code Review service combines automated static application security testing (SAST) 
                    with expert manual analysis to identify security vulnerabilities, coding flaws, and compliance 
                    issues directly in your application source code.
                  </p>
                  <p className={`text-lg leading-relaxed ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    We analyze code quality, security patterns, and potential vulnerabilities across multiple 
                    programming languages and frameworks, providing detailed remediation guidance and best 
                    practice recommendations.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Bug, title: "Vulnerability Detection", desc: "Identify security flaws" },
                  { icon: Eye, title: "Manual Analysis", desc: "Expert code review" },
                  { icon: Target, title: "Quality Metrics", desc: "Code quality assessment" },
                  { icon: FileCheck, title: "Compliance Check", desc: "Standards validation" }
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

        {/* Review Methodology */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Our Code Review Methodology
              </h2>
              <p className={`text-xl max-w-3xl mx-auto ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Comprehensive multi-stage approach combining automated tools with expert manual analysis
              </p>
            </div>

            <div className="grid gap-8">
              {[
                {
                  stage: "Automated Static Analysis",
                  icon: Zap,
                  description: "Initial automated scanning using industry-leading SAST tools",
                  activities: [
                    "Vulnerability pattern matching",
                    "Code quality metrics analysis",
                    "Dependency vulnerability scanning",
                    "Compliance rule validation"
                  ]
                },
                {
                  stage: "Manual Code Review",
                  icon: Eye,
                  description: "Expert security analysts perform detailed manual code examination",
                  activities: [
                    "Business logic vulnerability analysis",
                    "Authentication & authorization review",
                    "Input validation assessment",
                    "Cryptographic implementation review"
                  ]
                },
                {
                  stage: "Security Pattern Analysis",
                  icon: Search,
                  description: "Deep analysis of security patterns and architectural decisions",
                  activities: [
                    "Secure coding pattern verification",
                    "Anti-pattern identification",
                    "Security control effectiveness",
                    "Design flaw assessment"
                  ]
                },
                {
                  stage: "Reporting & Remediation",
                  icon: FileText,
                  description: "Comprehensive reporting with actionable remediation guidance",
                  activities: [
                    "Detailed vulnerability reports",
                    "Risk prioritization matrix",
                    "Remediation recommendations",
                    "Secure coding guidelines"
                  ]
                }
              ].map((stage, index) => (
                <div key={index} className={`backdrop-blur-md rounded-2xl border p-8 ${
                  isDarkMode 
                    ? 'bg-slate-800/30 border-slate-700/50' 
                    : 'bg-white/30 border-white/50'
                }`}>
                  <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
                    <div className="lg:w-1/3 mb-6 lg:mb-0">
                      <div className="flex items-center mb-4">
                        <stage.icon className="h-12 w-12 text-blue-500 mr-4" />
                        <div>
                          <h3 className={`text-2xl font-bold ${
                            isDarkMode ? 'text-white' : 'text-slate-900'
                          }`}>
                            {stage.stage}
                          </h3>
                        </div>
                      </div>
                      <p className={`text-lg leading-relaxed ${
                        isDarkMode ? 'text-slate-300' : 'text-slate-600'
                      }`}>
                        {stage.description}
                      </p>
                    </div>
                    
                    <div className="lg:w-2/3">
                      <ul className="grid md:grid-cols-2 gap-3">
                        {stage.activities.map((activity, activityIndex) => (
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

        {/* Supported Languages & Frameworks */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Supported Languages & Frameworks
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  category: "Web Technologies",
                  icon: Code,
                  languages: ["JavaScript", "TypeScript", "PHP", "Python", "Ruby", "Go"]
                },
                {
                  category: "Enterprise Languages",
                  icon: Shield,
                  languages: ["Java", "C#", "C/C++", "Scala", "Kotlin", "Swift"]
                },
                {
                  category: "Frameworks",
                  icon: GitBranch,
                  languages: ["React", "Angular", "Vue.js", "Spring", ".NET", "Django"]
                },
                {
                  category: "Mobile Platforms",
                  icon: Target,
                  languages: ["Android", "iOS", "React Native", "Flutter", "Xamarin", "Ionic"]
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
                    {category.languages.map((language, langIndex) => (
                      <li key={langIndex} className={`text-sm ${
                        isDarkMode ? 'text-slate-300' : 'text-slate-600'
                      }`}>
                        • {language}
                      </li>
                    ))}
                  </ul>
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
                Vulnerability Categories We Detect
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  category: "Input Validation",
                  icon: Bug,
                  vulnerabilities: [
                    "SQL Injection",
                    "Cross-Site Scripting (XSS)",
                    "Command Injection",
                    "XML/XXE Attacks",
                    "Path Traversal"
                  ]
                },
                {
                  category: "Authentication & Authorization",
                  icon: Shield,
                  vulnerabilities: [
                    "Broken Authentication",
                    "Session Management Flaws",
                    "Privilege Escalation",
                    "Access Control Bypass",
                    "JWT Vulnerabilities"
                  ]
                },
                {
                  category: "Cryptographic Issues",
                  icon: FileCheck,
                  vulnerabilities: [
                    "Weak Cryptography",
                    "Insecure Random Numbers",
                    "Certificate Validation",
                    "Key Management Flaws",
                    "Hash Function Misuse"
                  ]
                },
                {
                  category: "Business Logic",
                  icon: Target,
                  vulnerabilities: [
                    "Race Conditions",
                    "Workflow Bypasses",
                    "Price Manipulation",
                    "Abuse of Functionality",
                    "Time-of-Check Flaws"
                  ]
                },
                {
                  category: "Data Protection",
                  icon: Eye,
                  vulnerabilities: [
                    "Sensitive Data Exposure",
                    "Insufficient Logging",
                    "Information Disclosure",
                    "Data Leakage",
                    "Privacy Violations"
                  ]
                },
                {
                  category: "Code Quality",
                  icon: Code,
                  vulnerabilities: [
                    "Memory Leaks",
                    "Resource Management",
                    "Error Handling",
                    "Dead Code",
                    "Code Complexity"
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

        {/* Deliverables */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                What You Receive
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  deliverable: "Executive Summary Report",
                  icon: FileText,
                  description: "High-level overview of security posture, risk assessment, and strategic recommendations for executives and stakeholders."
                },
                {
                  deliverable: "Detailed Technical Report",
                  icon: Bug,
                  description: "Comprehensive technical documentation of all identified vulnerabilities with evidence, impact analysis, and exploitation scenarios."
                },
                {
                  deliverable: "Remediation Guide",
                  icon: FileCheck,
                  description: "Step-by-step remediation instructions, code examples, and secure coding recommendations for each identified issue."
                },
                {
                  deliverable: "Risk Matrix",
                  icon: Target,
                  description: "Prioritized vulnerability matrix based on exploitability, business impact, and compliance requirements."
                },
                {
                  deliverable: "Secure Coding Guidelines",
                  icon: Shield,
                  description: "Customized secure coding standards and best practices specific to your technology stack and business context."
                },
                {
                  deliverable: "Re-verification Testing",
                  icon: Zap,
                  description: "Follow-up testing to validate remediation efforts and ensure vulnerabilities have been properly addressed."
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
                  Get Your Code Reviewed
                </h2>
                <p className={`text-lg ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Ready to identify security vulnerabilities in your source code? Contact our security experts.
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
                    Programming Languages/Technologies
                  </label>
                  <input
                    type="text"
                    className={`w-full px-4 py-3 rounded-xl backdrop-blur-sm border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isDarkMode 
                        ? 'bg-slate-800/50 border-slate-700 text-white placeholder-slate-400' 
                        : 'bg-white/50 border-white/50 text-slate-900 placeholder-slate-500'
                    }`}
                    placeholder="e.g., Java, JavaScript, Python, .NET, React..."
                  />
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-3 ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Service Interest
                  </label>
                  <input
                    type="text"
                    value="Source Code Review"
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
                    placeholder="Tell us about your application, codebase size, programming languages used, timeline requirements, and any specific security concerns..."
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

export default SourceCodeReview;
