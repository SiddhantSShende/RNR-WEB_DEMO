import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  Cloud, Shield, Lock, Key, Database, Server, 
  Settings, Monitor, CheckCircle, AlertTriangle, Users, Eye
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import Navigation from './Navigation';

const CloudSecurityPage3D: React.FC = () => {
  const { isDarkMode } = useTheme();
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Three.js initialization
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Create cloud-themed particle system
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 900;
    
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);
    
    for(let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 40;
      posArray[i + 1] = (Math.random() - 0.5) * 40;
      posArray[i + 2] = (Math.random() - 0.5) * 40;
      
      // Blue/cyan themed particles for cloud
      const isCyan = Math.random() > 0.4;
      colorArray[i] = isCyan ? 0.2 : 0.4;     // R
      colorArray[i + 1] = isCyan ? 0.8 : 0.7; // G
      colorArray[i + 2] = isCyan ? 1 : 1;     // B
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 2.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 20;

    // Animation loop with cloud-like movement
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      // Gentle floating motion for cloud effect
      particlesMesh.rotation.x += 0.0002;
      particlesMesh.rotation.y += 0.0004;
      particlesMesh.rotation.z += 0.0001;
      
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const cloudSecurityServices = {
    architectureDesign: [
      {
        title: "Cloud Security Architecture",
        description: "Design secure cloud architectures aligned with best practices",
        icon: Cloud,
        features: ["Multi-cloud architecture", "Security framework design", "Compliance alignment"]
      },
      {
        title: "Zero Trust Implementation",
        description: "Implement zero trust security models in cloud environments",
        icon: Shield,
        features: ["Identity verification", "Least privilege access", "Continuous validation"]
      },
      {
        title: "Cloud Migration Security",
        description: "Secure cloud migration planning and execution",
        icon: Server,
        features: ["Migration risk assessment", "Security controls mapping", "Data protection planning"]
      }
    ],
    identityAccess: [
      {
        title: "Identity & Access Management (IAM)",
        description: "Comprehensive IAM solutions for cloud environments",
        icon: Key,
        features: ["Role-based access control", "Multi-factor authentication", "Identity federation"]
      },
      {
        title: "Privileged Access Management (PAM)",
        description: "Secure privileged access controls and monitoring",
        icon: Lock,
        features: ["Privileged account security", "Session monitoring", "Access governance"]
      },
      {
        title: "Single Sign-On (SSO) Implementation",
        description: "Centralized authentication and authorization solutions",
        icon: Users,
        features: ["SSO deployment", "Identity provider integration", "Access streamlining"]
      }
    ],
    dataProtection: [
      {
        title: "Data Encryption & Key Management",
        description: "Comprehensive data protection through encryption and key management",
        icon: Database,
        features: ["Encryption at rest", "Encryption in transit", "Key lifecycle management"]
      },
      {
        title: "Data Loss Prevention (DLP)",
        description: "Prevent unauthorized data access and exfiltration",
        icon: Shield,
        features: ["Data classification", "Access controls", "Exfiltration prevention"]
      },
      {
        title: "Backup & Recovery Security",
        description: "Secure backup strategies and disaster recovery planning",
        icon: Settings,
        features: ["Secure backups", "Recovery testing", "Business continuity"]
      }
    ],
    complianceGovernance: [
      {
        title: "Cloud Compliance Management",
        description: "Ensure cloud environments meet regulatory requirements",
        icon: CheckCircle,
        features: ["Regulatory compliance", "Audit preparation", "Control implementation"]
      },
      {
        title: "Cloud Governance Framework",
        description: "Establish governance frameworks for cloud operations",
        icon: Settings,
        features: ["Policy development", "Governance controls", "Operational oversight"]
      },
      {
        title: "Risk Management",
        description: "Cloud-specific risk assessment and management strategies",
        icon: AlertTriangle,
        features: ["Risk identification", "Impact assessment", "Mitigation strategies"]
      }
    ],
    monitoringIncident: [
      {
        title: "Cloud Security Monitoring",
        description: "24/7 monitoring and threat detection for cloud environments",
        icon: Monitor,
        features: ["Real-time monitoring", "Threat detection", "Security analytics"]
      },
      {
        title: "Incident Response",
        description: "Cloud-specific incident response and forensics capabilities",
        icon: AlertTriangle,
        features: ["Incident handling", "Forensic analysis", "Recovery procedures"]
      },
      {
        title: "Security Information & Event Management (SIEM)",
        description: "Centralized security event management for cloud environments",
        icon: Eye,
        features: ["Log aggregation", "Event correlation", "Security dashboards"]
      }
    ],
    securityAssessment: [
      {
        title: "Cloud Security Assessment",
        description: "Comprehensive security assessment of cloud environments",
        icon: Shield,
        features: ["Configuration review", "Vulnerability assessment", "Security posture analysis"]
      },
      {
        title: "Penetration Testing",
        description: "Cloud-specific penetration testing and security validation",
        icon: Lock,
        features: ["Cloud pentest", "API security testing", "Infrastructure assessment"]
      },
      {
        title: "Security Auditing",
        description: "Regular security audits and compliance assessments",
        icon: CheckCircle,
        features: ["Security audits", "Compliance validation", "Continuous assessment"]
      }
    ]
  };

  const ServiceSection = ({ title, description, services, colorClass }: any) => (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-4xl font-bold text-center mb-4 ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}>
          {title}
        </h2>
        <p className={`text-center mb-12 text-lg ${
          isDarkMode ? 'text-slate-300' : 'text-slate-600'
        }`}>
          {description}
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service: any, index: number) => (
            <div key={index} className={`rounded-2xl p-8 backdrop-blur-md border transition-all duration-300 hover:scale-105 ${
              isDarkMode 
                ? 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/60' 
                : 'bg-white/70 border-white/50 hover:bg-white/90'
            }`}>
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${colorClass}`}>
                <service.icon className={`w-8 h-8 ${
                  colorClass.includes('cyan') 
                    ? (isDarkMode ? 'text-cyan-400' : 'text-cyan-600')
                    : colorClass.includes('blue')
                    ? (isDarkMode ? 'text-blue-400' : 'text-blue-600')
                    : colorClass.includes('green')
                    ? (isDarkMode ? 'text-green-400' : 'text-green-600')
                    : colorClass.includes('purple')
                    ? (isDarkMode ? 'text-purple-400' : 'text-purple-600')
                    : colorClass.includes('orange')
                    ? (isDarkMode ? 'text-orange-400' : 'text-orange-600')
                    : (isDarkMode ? 'text-indigo-400' : 'text-indigo-600')
                }`} />
              </div>
              <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {service.title}
              </h3>
              <p className={`mb-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature: string, idx: number) => (
                  <li key={idx} className={`flex items-center text-sm ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    <CheckCircle className="w-4 h-4 text-cyan-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-cyan-900 to-blue-900' 
        : 'bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-100'
    }`}>
      {/* Three.js Canvas */}
      <div ref={mountRef} className="fixed inset-0 z-0" />
      
      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen">
        {/* Navigation */}
        <Navigation />

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-8 ${
              isDarkMode ? 'bg-cyan-600/20' : 'bg-cyan-100'
            }`}>
              <Cloud className={`w-10 h-10 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
            </div>
            <h1 className={`text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent ${
              isDarkMode 
                ? 'from-cyan-400 via-blue-300 to-cyan-300' 
                : 'from-cyan-600 via-blue-600 to-cyan-700'
            }`}>
              Cloud Security
            </h1>
            <p className={`text-xl md:text-2xl mb-8 max-w-4xl mx-auto ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Comprehensive cloud security solutions to protect your data, applications, and 
              infrastructure across multi-cloud and hybrid environments with industry-leading practices.
            </p>
          </div>
        </section>

        {/* Service Sections */}
        <ServiceSection 
          title="Cloud Architecture & Design"
          description="Secure cloud architecture design and migration services"
          services={cloudSecurityServices.architectureDesign}
          colorClass={isDarkMode ? "bg-cyan-600/20" : "bg-cyan-100"}
        />

        <ServiceSection 
          title="Identity & Access Management"
          description="Comprehensive identity and access management solutions"
          services={cloudSecurityServices.identityAccess}
          colorClass={isDarkMode ? "bg-blue-600/20" : "bg-blue-100"}
        />

        <ServiceSection 
          title="Data Protection & Privacy"
          description="Advanced data protection and encryption strategies"
          services={cloudSecurityServices.dataProtection}
          colorClass={isDarkMode ? "bg-green-600/20" : "bg-green-100"}
        />

        <ServiceSection 
          title="Compliance & Governance"
          description="Cloud compliance management and governance frameworks"
          services={cloudSecurityServices.complianceGovernance}
          colorClass={isDarkMode ? "bg-purple-600/20" : "bg-purple-100"}
        />

        <ServiceSection 
          title="Monitoring & Incident Response"
          description="24/7 cloud security monitoring and incident response services"
          services={cloudSecurityServices.monitoringIncident}
          colorClass={isDarkMode ? "bg-orange-600/20" : "bg-orange-100"}
        />

        <ServiceSection 
          title="Security Assessment & Testing"
          description="Comprehensive cloud security assessment and penetration testing"
          services={cloudSecurityServices.securityAssessment}
          colorClass={isDarkMode ? "bg-indigo-600/20" : "bg-indigo-100"}
        />

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`rounded-3xl p-12 backdrop-blur-md border ${
              isDarkMode 
                ? 'bg-slate-800/50 border-slate-700/50' 
                : 'bg-white/70 border-white/50'
            }`}>
              <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Ready to Secure Your Cloud?
              </h2>
              <p className={`text-lg mb-8 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Let our cloud security experts help you build and maintain a secure, compliant, 
                and resilient cloud infrastructure that scales with your business needs.
              </p>
              <button className={`px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-cyan-600 text-white hover:bg-cyan-700 shadow-lg hover:shadow-cyan-900/25' 
                  : 'bg-cyan-600 text-white hover:bg-cyan-700 shadow-lg hover:shadow-cyan-500/25'
              }`}>
                Get Started Today
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CloudSecurityPage3D;
