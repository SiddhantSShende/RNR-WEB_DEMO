import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';
import { 
  Users, Shield, Search, BarChart, AlertTriangle, CheckCircle, 
  FileText, Settings, Monitor, RefreshCw, Target, Building
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import Navigation from './Navigation';

const TPRMPage3D: React.FC = () => {
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

    // Create network-style connections for TPRM theme
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 600;
    
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);
    
    for(let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 25;
      posArray[i + 1] = (Math.random() - 0.5) * 25;
      posArray[i + 2] = (Math.random() - 0.5) * 25;
      
      // Purple/blue themed particles for TPRM
      const isPurple = Math.random() > 0.5;
      colorArray[i] = isPurple ? 0.6 : 0.2;     // R
      colorArray[i + 1] = isPurple ? 0.3 : 0.6; // G
      colorArray[i + 2] = isPurple ? 1 : 1;     // B
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 2.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.7
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 12;

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      // Slow rotation for network effect
      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.001;
      
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

  const tprmServices = {
    programDesign: [
      {
        title: "TPRM Strategy Development",
        description: "Design comprehensive third-party risk management strategies",
        icon: Target,
        features: ["Risk appetite definition", "TPRM framework design", "Stakeholder alignment"]
      },
      {
        title: "Program Implementation",
        description: "End-to-end implementation of TPRM programs",
        icon: Settings,
        features: ["Process design", "Tool selection", "Team training"]
      },
      {
        title: "Policy & Procedures",
        description: "Develop comprehensive TPRM policies and procedures",
        icon: FileText,
        features: ["Policy documentation", "Workflow design", "Approval processes"]
      }
    ],
    vendorAssessment: [
      {
        title: "Vendor Security Assessment",
        description: "Comprehensive evaluation of vendor security posture",
        icon: Shield,
        features: ["Security questionnaires", "Technical assessments", "Compliance verification"]
      },
      {
        title: "Due Diligence Services",
        description: "In-depth vendor due diligence and evaluation",
        icon: Search,
        features: ["Financial stability", "Security capabilities", "Operational resilience"]
      },
      {
        title: "Risk Classification",
        description: "Categorize and prioritize vendor risks effectively",
        icon: BarChart,
        features: ["Risk scoring", "Tiered assessments", "Priority matrix"]
      }
    ],
    assessmentTools: [
      {
        title: "Assessment Platform",
        description: "Advanced tools for automated risk assessments",
        icon: Monitor,
        features: ["Automated questionnaires", "Risk scoring", "Dashboard reporting"]
      },
      {
        title: "Risk Analytics",
        description: "Data-driven insights for better decision making",
        icon: BarChart,
        features: ["Risk analytics", "Trend analysis", "Predictive insights"]
      },
      {
        title: "Integration Services",
        description: "Seamless integration with existing systems",
        icon: Settings,
        features: ["API integration", "Data synchronization", "Workflow automation"]
      }
    ],
    ongoingMonitoring: [
      {
        title: "Continuous Monitoring",
        description: "Real-time monitoring of third-party risks",
        icon: Monitor,
        features: ["24/7 monitoring", "Alert management", "Risk tracking"]
      },
      {
        title: "Reassessment Programs",
        description: "Regular reassessment of vendor risk profiles",
        icon: RefreshCw,
        features: ["Scheduled reviews", "Risk updates", "Performance tracking"]
      },
      {
        title: "Incident Response",
        description: "Rapid response to third-party security incidents",
        icon: AlertTriangle,
        features: ["Incident detection", "Response coordination", "Impact assessment"]
      }
    ],
    remediationGovernance: [
      {
        title: "Risk Remediation",
        description: "Structured approach to risk mitigation",
        icon: CheckCircle,
        features: ["Remediation planning", "Action tracking", "Validation testing"]
      },
      {
        title: "Governance Framework",
        description: "Establish strong TPRM governance structures",
        icon: Building,
        features: ["Committee structure", "Reporting frameworks", "Escalation procedures"]
      },
      {
        title: "Performance Management",
        description: "Monitor and manage vendor performance",
        icon: BarChart,
        features: ["KPI tracking", "SLA monitoring", "Performance reviews"]
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
                  colorClass.includes('purple') 
                    ? (isDarkMode ? 'text-purple-400' : 'text-purple-600')
                    : colorClass.includes('blue')
                    ? (isDarkMode ? 'text-blue-400' : 'text-blue-600')
                    : colorClass.includes('green')
                    ? (isDarkMode ? 'text-green-400' : 'text-green-600')
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
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
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
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900' 
        : 'bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100'
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
              isDarkMode ? 'bg-purple-600/20' : 'bg-purple-100'
            }`}>
              <Users className={`w-10 h-10 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
            </div>
            <h1 className={`text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent ${
              isDarkMode 
                ? 'from-purple-400 via-purple-300 to-indigo-300' 
                : 'from-purple-600 via-purple-700 to-indigo-700'
            }`}>
              Third-Party Risk Management (TPRM)
            </h1>
            <p className={`text-xl md:text-2xl mb-8 max-w-4xl mx-auto ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Comprehensive TPRM solutions to identify, assess, and manage risks across your entire 
              vendor ecosystem with advanced tools and expert guidance.
            </p>
          </div>
        </section>

        {/* Service Sections */}
        <ServiceSection 
          title="TPRM Program Design & Implementation"
          description="Establish robust third-party risk management programs from the ground up"
          services={tprmServices.programDesign}
          colorClass={isDarkMode ? "bg-purple-600/20" : "bg-purple-100"}
        />

        <ServiceSection 
          title="Vendor Risk Assessment"
          description="Comprehensive evaluation and assessment of vendor security and compliance"
          services={tprmServices.vendorAssessment}
          colorClass={isDarkMode ? "bg-blue-600/20" : "bg-blue-100"}
        />

        <ServiceSection 
          title="Third-Party Risk Assessment Tools"
          description="Advanced platforms and analytics for streamlined risk assessment"
          services={tprmServices.assessmentTools}
          colorClass={isDarkMode ? "bg-green-600/20" : "bg-green-100"}
        />

        <ServiceSection 
          title="Ongoing Monitoring & Reassessments"
          description="Continuous monitoring and periodic reassessment of third-party risks"
          services={tprmServices.ongoingMonitoring}
          colorClass={isDarkMode ? "bg-orange-600/20" : "bg-orange-100"}
        />

        <ServiceSection 
          title="Remediation & Governance"
          description="Structured remediation processes and strong governance frameworks"
          services={tprmServices.remediationGovernance}
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
                Ready to Secure Your Third-Party Ecosystem?
              </h2>
              <p className={`text-lg mb-8 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Let our TPRM experts help you build a comprehensive program to identify, assess, 
                and manage risks across all your vendor relationships.
              </p>
              <button className={`px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-purple-900/25' 
                  : 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-purple-500/25'
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

export default TPRMPage3D;
