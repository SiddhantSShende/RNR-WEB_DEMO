import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  Settings, Shield, Code, Users, CheckCircle,
  ArrowRight, Mail, Phone, User, Send, Clock,
  Target, Zap, FileCheck, GitBranch, Layers
} from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';
import Navigation from '../../Navigation';

const SecureSDLCIntegration: React.FC = () => {
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
                <Settings className="h-5 w-5 mr-2" />
                <span className="font-medium">DevSecOps & SDLC Security</span>
              </div>
              
              <h1 className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent ${
                isDarkMode 
                  ? 'from-blue-400 via-blue-300 to-indigo-300' 
                  : 'from-blue-600 via-blue-700 to-indigo-700'
              }`}>
                Secure SDLC Integration
              </h1>
              
              <p className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Build security into every stage of your software development lifecycle with comprehensive 
                DevSecOps practices, secure coding standards, and automated security testing.
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
                  Comprehensive SDLC Security Integration
                </h2>
                <div className="space-y-6">
                  <p className={`text-lg leading-relaxed ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    Transform your software development process with integrated security practices that protect your applications 
                    from conception to deployment. Our Secure SDLC Integration service embeds security controls, automated 
                    testing, and compliance checkpoints throughout your development pipeline.
                  </p>
                  <p className={`text-lg leading-relaxed ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    We help organizations implement DevSecOps practices that shift security left, enabling early detection 
                    and remediation of vulnerabilities while maintaining development velocity and reducing costs.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Shield, title: "Security by Design", desc: "Built-in security from the start" },
                  { icon: Zap, title: "Automated Testing", desc: "Continuous security validation" },
                  { icon: Users, title: "Team Training", desc: "Secure coding practices" },
                  { icon: Target, title: "Compliance Ready", desc: "Regulatory alignment" }
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

        {/* Service Phases */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                SDLC Security Integration Phases
              </h2>
              <p className={`text-xl max-w-3xl mx-auto ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Comprehensive security integration across all development lifecycle phases
              </p>
            </div>

            <div className="grid gap-8">
              {[
                {
                  phase: "Planning & Requirements",
                  icon: FileCheck,
                  activities: [
                    "Security requirements definition",
                    "Threat modeling and risk assessment",
                    "Security architecture design",
                    "Compliance requirements mapping"
                  ]
                },
                {
                  phase: "Development & Coding",
                  icon: Code,
                  activities: [
                    "Secure coding guidelines implementation",
                    "Static application security testing (SAST)",
                    "IDE security plugins integration",
                    "Code review security checklists"
                  ]
                },
                {
                  phase: "Testing & Validation",
                  icon: CheckCircle,
                  activities: [
                    "Dynamic application security testing (DAST)",
                    "Interactive application security testing (IAST)",
                    "Security regression testing",
                    "Penetration testing integration"
                  ]
                },
                {
                  phase: "Deployment & Operations",
                  icon: GitBranch,
                  activities: [
                    "Infrastructure as code security scanning",
                    "Container and image security validation",
                    "Runtime application self-protection (RASP)",
                    "Continuous monitoring and alerting"
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
                        <h3 className={`text-2xl font-bold ${
                          isDarkMode ? 'text-white' : 'text-slate-900'
                        }`}>
                          {phase.phase}
                        </h3>
                      </div>
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

        {/* DevSecOps Tools & Technologies */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                DevSecOps Tools & Technologies
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  category: "Security Testing",
                  icon: Shield,
                  tools: ["SonarQube", "Checkmarx", "Veracode", "OWASP ZAP", "Burp Suite"]
                },
                {
                  category: "Container Security",
                  icon: Layers,
                  tools: ["Twistlock", "Aqua Security", "Clair", "Trivy", "Docker Bench"]
                },
                {
                  category: "Infrastructure Security",
                  icon: Settings,
                  tools: ["Terraform", "CloudFormation", "Ansible", "Chef InSpec", "Open Policy Agent"]
                },
                {
                  category: "CI/CD Integration",
                  icon: GitBranch,
                  tools: ["Jenkins", "GitLab CI", "Azure DevOps", "GitHub Actions", "CircleCI"]
                },
                {
                  category: "Monitoring & Analytics",
                  icon: Target,
                  tools: ["Splunk", "ELK Stack", "Datadog", "New Relic", "PagerDuty"]
                },
                {
                  category: "Compliance & Governance",
                  icon: FileCheck,
                  tools: ["Rapid7", "Qualys", "Nessus", "AWS Config", "Azure Policy"]
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
                    {category.tools.map((tool, toolIndex) => (
                      <li key={toolIndex} className={`text-sm ${
                        isDarkMode ? 'text-slate-300' : 'text-slate-600'
                      }`}>
                        • {tool}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Benefits of Secure SDLC Integration
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Clock,
                  title: "Early Detection",
                  description: "Identify and fix security issues during development, reducing remediation costs by up to 100x."
                },
                {
                  icon: Shield,
                  title: "Enhanced Security Posture",
                  description: "Build more secure applications with security controls embedded throughout the development process."
                },
                {
                  icon: Zap,
                  title: "Faster Time to Market",
                  description: "Maintain development velocity while ensuring security compliance and reducing security debt."
                },
                {
                  icon: Users,
                  title: "Team Empowerment",
                  description: "Enable developers with security knowledge and tools to make secure coding decisions independently."
                },
                {
                  icon: Target,
                  title: "Compliance Automation",
                  description: "Automate compliance checks and reporting to meet regulatory requirements efficiently."
                },
                {
                  icon: FileCheck,
                  title: "Risk Reduction",
                  description: "Minimize security risks and potential breaches through comprehensive security integration."
                }
              ].map((benefit, index) => (
                <div key={index} className={`backdrop-blur-md rounded-xl border p-6 ${
                  isDarkMode 
                    ? 'bg-slate-800/30 border-slate-700/50' 
                    : 'bg-white/30 border-white/50'
                }`}>
                  <benefit.icon className="h-10 w-10 text-blue-500 mb-4" />
                  <h3 className={`text-lg font-bold mb-3 ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    {benefit.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${
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
                  Start Your Secure SDLC Journey
                </h2>
                <p className={`text-lg ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Ready to integrate security into your development lifecycle? Connect with our DevSecOps experts.
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
                  <input
                    type="text"
                    value="Secure SDLC Integration"
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
                    placeholder="Tell us about your current development process, team size, technology stack, and specific SDLC security integration needs..."
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

export default SecureSDLCIntegration;
