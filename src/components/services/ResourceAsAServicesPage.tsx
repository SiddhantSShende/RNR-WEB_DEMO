import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  Shield, Users, Eye, Wrench, FileCheck, CheckCircle,
  ArrowRight, Mail, Phone, Send, Award, Target
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import Navigation from '../Navigation';
import { Link } from 'react-router-dom';

const ResourceAsAServicesPage: React.FC = () => {
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

    // Create animated background particles with blue theme to match website
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
      title: "GRC Specialists",
      subtitle: "ISO 27001, RBI, SEBI, CERT-In, etc.",
      description: "GRC Specialists are expert professionals who guide your business through governance, risk management, and compliance, ensuring you meet standards like ISO 27001, RBI, SEBI, and CERT-In. At RNR Consulting Pvt. Ltd., our specialists strengthen your security and continuity plans.",
      icon: Shield,
      importance: [
        "Compliance Gaps: Missing expertise could lead to violations of regulatory compliances, risking fines or audits",
        "Risk Overlooks: Weak governance can miss threats, like data breaches, costing revenue or trust",
        "Operational Hiccups: Non-compliant systems can disrupt workflows, frustrating clients",
        "Reputation Dents: Compliance failures can spark bad press or client doubts, dimming your brand"
      ],
      howWeWork: [
        "Compliance Mapping: RNR specialists align your processes with ISO 27001, RBI, SEBI, and CERT-In standards",
        "Risk Assessments: We identify vulnerabilities, like weak controls, to strengthen your security",
        "Policy Development: RNR crafts governance policies to ensure clear, compliant operations",
        "Audit Support: We prepare your business for audits, ensuring smooth compliance checks",
        "Ongoing Guidance: RNR provides continuous support to adapt to evolving regulations"
      ],
      whyRNR: [
        "Expert Talent: RNR's specialists are pros in ISO 27001, RBI, SEBI, and CERT-In compliance",
        "Custom Solutions: We tailor strategies to your industry, from finance to healthcare",
        "Proactive Support: RNR stays ahead of regulatory changes to keep you compliant",
        "Future-Ready Expertise: As rules evolve, RNR keeps your business prepared"
      ],
      link: "/services/resource-as-services/grc-specialists"
    },
    {
      title: "Information Security Analysts",
      description: "Information security analysts monitor and protect your systems from cyber threats, like malware or unauthorized access, ensuring your data and operations stay safe. At RNR Consulting Pvt. Ltd., our analysts keep your defenses tight.",
      icon: Eye,
      importance: [
        "Data Breaches: Unmonitored systems can lead to leaks, costing money or client trust",
        "Compliance Risks: Weak security might violate regulations, risking fines or audits",
        "Service Disruptions: Cyber incidents can halt operations, frustrating customers",
        "Reputation Hits: A security lapse can fuel bad press or client doubts, hurting your brand"
      ],
      howWeWork: [
        "Threat Monitoring: RNR analysts watch systems for suspicious activity, like intrusions",
        "Risk Analysis: We assess vulnerabilities to prioritize and fix weak spots",
        "Incident Response: RNR responds quickly to threats, minimizing damage and downtime",
        "Security Hardening: We implement controls, like access restrictions, to boost protection",
        "Continuous Support: RNR provides ongoing monitoring to keep threats at bay"
      ],
      whyRNR: [
        "Skilled Pros: RNR's analysts are experts in spotting and stopping threats",
        "Custom Strategies: We tailor monitoring to your industry and systems",
        "Fast Response: RNR ensures quick action to limit crisis impact",
        "Future-Ready Defense: As threats evolve, RNR keeps your security sharp"
      ],
      link: "/services/resource-as-services/security-analysts"
    },
    {
      title: "Cybersecurity Engineers",
      subtitle: "SIEM, EDR, Firewall, etc.",
      description: "Cybersecurity engineers design and manage advanced security tools, like SIEM, EDR, and firewalls, to shield your business from cyber threats. At RNR Consulting Pvt. Ltd., our engineers build robust defenses tailored to your needs.",
      icon: Wrench,
      importance: [
        "System Breaches: Weak defenses can let hackers in, causing data loss or financial hits",
        "Compliance Risks: Poor security setups might violate regulations, risking fines or audits",
        "Operational Snags: Cyberattacks can disrupt systems, delaying services and frustrating clients",
        "Reputation Bumps: A security failure can spark bad press or client distrust, dimming your brand"
      ],
      howWeWork: [
        "Tool Deployment: RNR sets up and manages SIEM, EDR, and firewalls for strong protection",
        "Threat Detection: We configure systems to spot and stop attacks in real-time",
        "System Hardening: RNR strengthens your infrastructure against vulnerabilities",
        "Incident Handling: Our engineers respond fast to minimize crisis impact",
        "Ongoing Support: RNR provides continuous management to keep tools effective"
      ],
      whyRNR: [
        "Expert Talent: RNR's engineers are pros in SIEM, EDR, and firewall management",
        "Custom Defenses: We tailor solutions to your industry and tech stack",
        "Proactive Protection: RNR stays ahead of threats with cutting-edge tools",
        "Future-Ready Support: As cyber risks evolve, RNR keeps your defenses current"
      ],
      link: "/services/resource-as-services/cybersecurity-engineers"
    },
    {
      title: "VAPT & Application Security Testers",
      description: "VAPT (Vulnerability Assessment and Penetration Testing) and application security testers probe your systems and apps to find weaknesses before hackers exploit them. At RNR Consulting Pvt. Ltd., our testers simulate attacks to strengthen your defenses.",
      icon: Target,
      importance: [
        "Security Breaches: Unchecked vulnerabilities can lead to hacks, costing data or revenue",
        "Compliance Risks: Weak systems might violate regulations, risking fines or audits",
        "Service Disruptions: Exploited apps can halt operations, frustrating clients",
        "Loss in Reputation: A hack can fuel bad press or client distrust, hurting your brand"
      ],
      howWeWork: [
        "Vulnerability Scans: RNR identifies weaknesses in networks, apps, or systems",
        "Penetration Testing: We simulate real-world attacks to test your defenses",
        "App Security Checks: RNR ensures applications are secure against threats like injections",
        "Detailed Reports: We provide clear findings and fixes to strengthen your systems"
      ],
      whyRNR: [
        "Skilled Testers: RNR's experts excel in finding and fixing vulnerabilities",
        "Custom Testing: We tailor tests to your industry and tech stack",
        "Future-Ready Defense: As threats evolve, RNR keeps your systems secure"
      ],
      link: "/services/resource-as-services/vapt-testers"
    },
    {
      title: "Compliance & Risk Consultants",
      description: "Compliance and risk consultants help your business navigate regulations and manage risks, like data breaches or operational failures, ensuring you stay compliant and crisis-ready. At RNR Consulting Pvt. Ltd., our consultants provide expert guidance to strengthen your continuity and security.",
      icon: FileCheck,
      importance: [
        "Compliance Fumbles: Missing regulatory know-how can lead to fines or audits",
        "Risk Overlooks: Unmanaged threats can disrupt operations, costing revenue or trust",
        "Workflow Snags: Non-compliance can delay services, frustrating clients",
        "Reputation Bumps: Compliance failures can spark bad press or client doubts, dimming your brand"
      ],
      howWeWork: [
        "Risk Assessments: RNR identifies threats, like cyber or operational risks, to prioritize fixes",
        "Compliance Guidance: We align your processes with regulations for smooth audits",
        "Policy Development: RNR crafts clear policies to ensure compliant operations",
        "Training Support: We guide your team on compliance and risk best practices",
        "Ongoing Advice: RNR provides continuous support to adapt to new risks or rules"
      ],
      whyRNR: [
        "Expert Pros: RNR's consultants are skilled in compliance and risk management",
        "Custom Strategies: We tailor solutions to your industry, from tech to finance",
        "Proactive Guidance: RNR stays ahead of risks and regulatory changes",
        "Future-Ready Support: As challenges evolve, RNR keeps your business prepared"
      ],
      link: "/services/resource-as-services/compliance-consultants"
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
                <span className="font-medium">Resource as a Services</span>
              </div>
              
              <h1 className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent ${
                isDarkMode 
                  ? 'from-blue-400 via-blue-300 to-indigo-300' 
                  : 'from-blue-600 via-blue-700 to-indigo-700'
              }`}>
                Expert Security Resources
              </h1>
              
              <p className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Access highly skilled cybersecurity professionals and specialists on-demand to strengthen 
                your security posture. We provide top-notch expertise to keep your business compliant and crisis-ready, 
                so you stay focused on growth.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Resource as a Service Categories
              </h2>
              <p className={`text-xl max-w-3xl mx-auto ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Expert professionals ready to strengthen your security posture and ensure compliance. 
                Discover why these specialists matter, how RNR delivers, and what makes us shine.
              </p>
            </div>

            <div className="space-y-12">
              {serviceCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <div
                    key={index}
                    className={`group relative p-8 rounded-3xl border transition-all duration-500 ${
                      isDarkMode
                        ? 'bg-slate-800/50 backdrop-blur-sm border-slate-700/50'
                        : 'bg-white/70 backdrop-blur-sm border-slate-200'
                    }`}
                  >
                    {/* Header */}
                    <div className="mb-8">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${
                        isDarkMode ? 'bg-blue-600/20' : 'bg-blue-100'
                      }`}>
                        <Icon className={`w-8 h-8 ${
                          isDarkMode ? 'text-blue-400' : 'text-blue-600'
                        }`} />
                      </div>
                      
                      <h3 className={`text-3xl font-bold mb-2 ${
                        isDarkMode ? 'text-white' : 'text-slate-900'
                      }`}>
                        {category.title}
                      </h3>
                      
                      {category.subtitle && (
                        <p className={`text-lg font-medium mb-4 ${
                          isDarkMode ? 'text-blue-400' : 'text-blue-600'
                        }`}>
                          {category.subtitle}
                        </p>
                      )}
                      
                      <p className={`text-lg leading-relaxed ${
                        isDarkMode ? 'text-slate-300' : 'text-slate-600'
                      }`}>
                        {category.description}
                      </p>
                    </div>

                    {/* Content Grid */}
                    <div className="grid lg:grid-cols-3 gap-8">
                      {/* Why It Matters */}
                      <div>
                        <h4 className={`text-xl font-bold mb-4 ${
                          isDarkMode ? 'text-red-400' : 'text-red-600'
                        }`}>
                          Why It Matters
                        </h4>
                        <ul className="space-y-3">
                          {category.importance.map((point, idx) => (
                            <li key={idx} className="flex items-start space-x-3">
                              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                                isDarkMode ? 'bg-red-400' : 'bg-red-600'
                              }`} />
                              <span className={`text-sm leading-relaxed ${
                                isDarkMode ? 'text-slate-400' : 'text-slate-600'
                              }`}>
                                {point}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* How RNR Gets It Done */}
                      <div>
                        <h4 className={`text-xl font-bold mb-4 ${
                          isDarkMode ? 'text-green-400' : 'text-green-600'
                        }`}>
                          How RNR Gets It Done
                        </h4>
                        <ul className="space-y-3">
                          {category.howWeWork.map((point, idx) => (
                            <li key={idx} className="flex items-start space-x-3">
                              <CheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                                isDarkMode ? 'text-green-400' : 'text-green-600'
                              }`} />
                              <span className={`text-sm leading-relaxed ${
                                isDarkMode ? 'text-slate-400' : 'text-slate-600'
                              }`}>
                                {point}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Why RNR Shines */}
                      <div>
                        <h4 className={`text-xl font-bold mb-4 ${
                          isDarkMode ? 'text-blue-400' : 'text-blue-600'
                        }`}>
                          Why RNR Shines
                        </h4>
                        <ul className="space-y-3">
                          {category.whyRNR.map((point, idx) => (
                            <li key={idx} className="flex items-start space-x-3">
                              <Award className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                                isDarkMode ? 'text-blue-400' : 'text-blue-600'
                              }`} />
                              <span className={`text-sm leading-relaxed ${
                                isDarkMode ? 'text-slate-400' : 'text-slate-600'
                              }`}>
                                {point}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Contact Link */}
                    <div className="mt-8 pt-6 border-t border-slate-200/20">
                      <Link
                        to="/contact"
                        className={`inline-flex items-center font-semibold transition-all duration-300 hover:translate-x-2 ${
                          isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                        }`}
                      >
                        Get These Experts <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Our Resources Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Why Choose Our Security Resources?
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className={`text-center p-8 rounded-3xl ${
                isDarkMode ? 'bg-slate-800/30' : 'bg-white/50'
              }`}>
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${
                  isDarkMode ? 'bg-blue-600/20' : 'bg-blue-100'
                }`}>
                  <Award className={`w-8 h-8 ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                </div>
                <h3 className={`text-xl font-bold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  Certified Professionals
                </h3>
                <p className={`${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  All our resources hold industry-recognized certifications and have proven track records in their specializations.
                </p>
              </div>

              <div className={`text-center p-8 rounded-3xl ${
                isDarkMode ? 'bg-slate-800/30' : 'bg-white/50'
              }`}>
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${
                  isDarkMode ? 'bg-blue-600/20' : 'bg-blue-100'
                }`}>
                  <Users className={`w-8 h-8 ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                </div>
                <h3 className={`text-xl font-bold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  Flexible Engagement
                </h3>
                <p className={`${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Scale your security team up or down based on project needs with flexible short-term and long-term engagements.
                </p>
              </div>

              <div className={`text-center p-8 rounded-3xl ${
                isDarkMode ? 'bg-slate-800/30' : 'bg-white/50'
              }`}>
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${
                  isDarkMode ? 'bg-blue-600/20' : 'bg-blue-100'
                }`}>
                  <Target className={`w-8 h-8 ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                </div>
                <h3 className={`text-xl font-bold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  Immediate Impact
                </h3>
                <p className={`${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Our pre-vetted professionals can integrate quickly and start delivering value from day one of engagement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Get Started with Us Section */}
        <section className="py-32 px-4">
          <div className="max-w-4xl mx-auto">
            <div className={`relative overflow-hidden rounded-3xl p-12 ${
              isDarkMode
                ? 'bg-slate-800/50 backdrop-blur-sm border border-slate-700/50'
                : 'bg-white/70 backdrop-blur-sm border-slate-200 shadow-2xl'
            }`}>
              <div className="text-center mb-12">
                <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  Get Started with Us
                </h2>
                
                <p className={`text-xl leading-relaxed ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  Ready to augment your security team with expert resources? Fill out the form below and our Resource as a Services experts will get in touch with you.
                </p>
              </div>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                        isDarkMode
                          ? 'bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-400'
                          : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                        isDarkMode
                          ? 'bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-400'
                          : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Contact Number *
                    </label>
                    <input
                      type="tel"
                      required
                      className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                        isDarkMode
                          ? 'bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-400'
                          : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      placeholder="Enter your contact number"
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Service
                    </label>
                    <input
                      type="text"
                      value="Resource as a Services"
                      readOnly
                      className={`w-full px-4 py-3 rounded-lg border ${
                        isDarkMode
                          ? 'bg-slate-600/30 border-slate-600 text-slate-300'
                          : 'bg-slate-100 border-slate-300 text-slate-600'
                      } cursor-not-allowed`}
                    />
                  </div>
                </div>
                
                <div className="text-center pt-8">
                  <button
                    type="submit"
                    className={`inline-flex items-center px-12 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                      isDarkMode
                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/25'
                        : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/25'
                    }`}
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`${
          isDarkMode ? 'bg-slate-900/80' : 'bg-slate-900'
        } text-white py-16 px-4`}>
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="col-span-1">
                <div className="flex items-center space-x-2 mb-4">
                  <Shield className="w-8 h-8 text-blue-400" />
                  <span className="text-2xl font-bold">RNR Consulting</span>
                </div>
                <p className="text-slate-400 mb-4">
                  Leading provider of expert cybersecurity professionals and specialists, 
                  delivering on-demand security resources to strengthen your team.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4 text-blue-400">Resource Categories</h4>
                <ul className="space-y-2 text-slate-400">
                  <li><a href="#" className="hover:text-white transition-colors">GRC Specialists</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Security Analysts</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Cybersecurity Engineers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">VAPT Testers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Compliance Consultants</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4 text-blue-400">Other Services</h4>
                <ul className="space-y-2 text-slate-400">
                  <li><Link to="/services/grc" className="hover:text-white transition-colors">GRC Services</Link></li>
                  <li><Link to="/services/tprm" className="hover:text-white transition-colors">TPRM Services</Link></li>
                  <li><Link to="/services/bcms" className="hover:text-white transition-colors">BCMS Services</Link></li>
                  <li><Link to="/services/application-security" className="hover:text-white transition-colors">Application Security</Link></li>
                  <li><Link to="/services/cloud-security" className="hover:text-white transition-colors">Cloud Security</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4 text-blue-400">Contact Info</h4>
                <ul className="space-y-3 text-slate-400">
                  <li className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>resources@rnrconsulting.com</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>+1 (555) 123-4567</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>Expert Security Professionals</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-slate-800 pt-8 mt-12 text-center text-slate-400">
              <p>&copy; 2024 RNR Consulting. All rights reserved. | Resource as a Services</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ResourceAsAServicesPage;
