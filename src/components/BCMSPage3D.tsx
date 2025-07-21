import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  Shield, AlertTriangle, FileText, CheckCircle, BarChart, RefreshCw, 
  Target, Monitor, Settings, Building, Activity, Users
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import Navigation from './Navigation';

const BCMSPage3D: React.FC = () => {
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

    // Create resilient network pattern for BCMS theme
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 700;
    
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);
    
    for(let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 30;
      posArray[i + 1] = (Math.random() - 0.5) * 30;
      posArray[i + 2] = (Math.random() - 0.5) * 30;
      
      // Green/blue themed particles for continuity
      const isGreen = Math.random() > 0.6;
      colorArray[i] = isGreen ? 0.2 : 0.1;     // R
      colorArray[i + 1] = isGreen ? 0.8 : 0.5; // G
      colorArray[i + 2] = isGreen ? 0.4 : 1;   // B
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 2.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 15;

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      // Steady rotation for stability theme
      particlesMesh.rotation.x += 0.0003;
      particlesMesh.rotation.y += 0.0007;
      
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

  const bcmsServices = {
    frameworkDesign: [
      {
        title: "BCMS Framework Development",
        description: "Design comprehensive business continuity management systems",
        icon: Building,
        features: ["ISO 22301 compliance", "Framework customization", "Governance structure"]
      },
      {
        title: "Policy & Standards",
        description: "Develop BC policies, procedures, and standards",
        icon: FileText,
        features: ["Policy documentation", "Standard procedures", "Compliance frameworks"]
      },
      {
        title: "Implementation Planning",
        description: "Strategic implementation of BCMS across the organization",
        icon: Target,
        features: ["Phased rollout", "Resource planning", "Timeline management"]
      }
    ],
    businessImpactAnalysis: [
      {
        title: "Business Impact Assessment",
        description: "Comprehensive analysis of business processes and dependencies",
        icon: BarChart,
        features: ["Process mapping", "Dependency analysis", "Impact quantification"]
      },
      {
        title: "Critical Function Identification",
        description: "Identify and prioritize critical business functions",
        icon: Activity,
        features: ["Function prioritization", "Resource requirements", "Recovery timeframes"]
      },
      {
        title: "Recovery Objectives",
        description: "Define RTO and RPO for critical business processes",
        icon: Target,
        features: ["RTO definition", "RPO establishment", "Performance metrics"]
      }
    ],
    riskAssessment: [
      {
        title: "Business Continuity Risk Assessment",
        description: "Identify and assess risks that could disrupt business operations",
        icon: AlertTriangle,
        features: ["Threat identification", "Vulnerability assessment", "Risk scoring"]
      },
      {
        title: "Strategy Development",
        description: "Develop comprehensive BC strategies and approaches",
        icon: Settings,
        features: ["Strategy formulation", "Option evaluation", "Resource allocation"]
      },
      {
        title: "Risk Treatment Planning",
        description: "Develop plans to treat identified continuity risks",
        icon: Shield,
        features: ["Mitigation strategies", "Risk controls", "Treatment monitoring"]
      }
    ],
    planDevelopment: [
      {
        title: "Business Continuity Plans",
        description: "Develop detailed business continuity and response plans",
        icon: FileText,
        features: ["Plan documentation", "Response procedures", "Communication protocols"]
      },
      {
        title: "Disaster Recovery Plans",
        description: "Create comprehensive disaster recovery strategies",
        icon: RefreshCw,
        features: ["Recovery procedures", "Technical requirements", "Recovery sites"]
      },
      {
        title: "Crisis Management Plans",
        description: "Establish crisis management and communication plans",
        icon: Users,
        features: ["Crisis response", "Stakeholder communication", "Media management"]
      }
    ],
    testingDrills: [
      {
        title: "BC Plan Testing",
        description: "Regular testing and validation of business continuity plans",
        icon: CheckCircle,
        features: ["Test scenarios", "Simulation exercises", "Results analysis"]
      },
      {
        title: "DR Testing & Validation",
        description: "Comprehensive disaster recovery testing programs",
        icon: Monitor,
        features: ["Technical testing", "Recovery validation", "Performance assessment"]
      },
      {
        title: "Tabletop Exercises",
        description: "Scenario-based exercises to test response capabilities",
        icon: Users,
        features: ["Scenario design", "Exercise facilitation", "Improvement recommendations"]
      }
    ],
    ongoingMonitoring: [
      {
        title: "Continuous Monitoring",
        description: "Ongoing monitoring of BC capabilities and performance",
        icon: Monitor,
        features: ["Performance tracking", "Compliance monitoring", "Risk surveillance"]
      },
      {
        title: "Maintenance & Updates",
        description: "Regular maintenance and updating of BC plans and procedures",
        icon: RefreshCw,
        features: ["Plan updates", "Process improvement", "Change management"]
      },
      {
        title: "Awareness & Training",
        description: "Staff awareness and training programs for business continuity",
        icon: Users,
        features: ["Training programs", "Awareness campaigns", "Competency development"]
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
                  colorClass.includes('green') 
                    ? (isDarkMode ? 'text-green-400' : 'text-green-600')
                    : colorClass.includes('blue')
                    ? (isDarkMode ? 'text-blue-400' : 'text-blue-600')
                    : colorClass.includes('orange')
                    ? (isDarkMode ? 'text-orange-400' : 'text-orange-600')
                    : colorClass.includes('purple')
                    ? (isDarkMode ? 'text-purple-400' : 'text-purple-600')
                    : colorClass.includes('teal')
                    ? (isDarkMode ? 'text-teal-400' : 'text-teal-600')
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
        ? 'bg-gradient-to-br from-slate-900 via-green-900 to-blue-900' 
        : 'bg-gradient-to-br from-slate-50 via-green-50 to-blue-100'
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
              isDarkMode ? 'bg-green-600/20' : 'bg-green-100'
            }`}>
              <Shield className={`w-10 h-10 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
            </div>
            <h1 className={`text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent ${
              isDarkMode 
                ? 'from-green-400 via-green-300 to-blue-300' 
                : 'from-green-600 via-green-700 to-blue-700'
            }`}>
              Business Continuity Management System (BCMS)
            </h1>
            <p className={`text-xl md:text-2xl mb-8 max-w-4xl mx-auto ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Comprehensive BCMS solutions to ensure business resilience and continuity during 
              disruptions with ISO 22301 compliant frameworks and proven methodologies.
            </p>
          </div>
        </section>

        {/* Service Sections */}
        <ServiceSection 
          title="BCMS Framework Design & Implementation"
          description="Establish comprehensive business continuity management frameworks"
          services={bcmsServices.frameworkDesign}
          colorClass={isDarkMode ? "bg-green-600/20" : "bg-green-100"}
        />

        <ServiceSection 
          title="Business Impact Analysis (BIA)"
          description="Comprehensive analysis of business processes and impact assessment"
          services={bcmsServices.businessImpactAnalysis}
          colorClass={isDarkMode ? "bg-blue-600/20" : "bg-blue-100"}
        />

        <ServiceSection 
          title="Risk Assessment & Strategy Development"
          description="Identify risks and develop comprehensive continuity strategies"
          services={bcmsServices.riskAssessment}
          colorClass={isDarkMode ? "bg-orange-600/20" : "bg-orange-100"}
        />

        <ServiceSection 
          title="Business Continuity & DR Plan Development"
          description="Develop detailed plans for business continuity and disaster recovery"
          services={bcmsServices.planDevelopment}
          colorClass={isDarkMode ? "bg-purple-600/20" : "bg-purple-100"}
        />

        <ServiceSection 
          title="BC/DR Testing & Drills"
          description="Regular testing and validation of business continuity capabilities"
          services={bcmsServices.testingDrills}
          colorClass={isDarkMode ? "bg-teal-600/20" : "bg-teal-100"}
        />

        <ServiceSection 
          title="Ongoing Monitoring, Maintenance & Awareness"
          description="Continuous improvement and staff awareness programs"
          services={bcmsServices.ongoingMonitoring}
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
                Ready to Build Business Resilience?
              </h2>
              <p className={`text-lg mb-8 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Let our BCMS experts help you develop comprehensive business continuity capabilities 
                to ensure your organization remains resilient in the face of any disruption.
              </p>
              <button className={`px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-green-900/25' 
                  : 'bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-green-500/25'
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

export default BCMSPage3D;
