import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';
import { 
  Shield, Award, FileText, CheckCircle, Building, Users, 
  Target, BarChart, ClipboardCheck, AlertTriangle, BookOpen, Settings
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import Navigation from './Navigation';

const GRCPage3D: React.FC = () => {
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

    // Create animated particles for background
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 800;
    
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);
    
    for(let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 20;
      posArray[i + 1] = (Math.random() - 0.5) * 20;
      posArray[i + 2] = (Math.random() - 0.5) * 20;
      
      // Blue/white themed particles
      const isBlue = Math.random() > 0.7;
      colorArray[i] = isBlue ? 0.2 : 1;     // R
      colorArray[i + 1] = isBlue ? 0.6 : 1; // G
      colorArray[i + 2] = isBlue ? 1 : 1;   // B
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 3,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Add floating geometric shapes
    const geometries = [
      new THREE.OctahedronGeometry(0.5),
      new THREE.TetrahedronGeometry(0.6),
      new THREE.IcosahedronGeometry(0.4)
    ];

    const shapes: THREE.Mesh[] = [];
    for(let i = 0; i < 6; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.6 + Math.random() * 0.1, 0.7, 0.5),
        transparent: true,
        opacity: 0.3,
        wireframe: true
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15
      );
      
      shapes.push(mesh);
      scene.add(mesh);
    }

    camera.position.z = 10;

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      // Rotate particles
      particlesMesh.rotation.x += 0.001;
      particlesMesh.rotation.y += 0.002;
      
      // Animate shapes
      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.01 + index * 0.001;
        shape.rotation.y += 0.01 + index * 0.001;
        shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.001;
      });
      
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

  const governanceServices = [
    {
      title: "Corporate Governance Framework",
      description: "Establish comprehensive governance structures and processes",
      icon: Building,
      features: ["Board governance", "Executive oversight", "Accountability frameworks"]
    },
    {
      title: "IT Governance",
      description: "Align IT strategy with business objectives",
      icon: Settings,
      features: ["IT steering committee", "Technology governance", "Digital transformation"]
    },
    {
      title: "Data Governance",
      description: "Implement robust data management and governance practices",
      icon: FileText,
      features: ["Data quality", "Data lifecycle", "Privacy governance"]
    }
  ];

  const riskManagementServices = [
    {
      title: "Enterprise Risk Assessment",
      description: "Comprehensive identification and evaluation of organizational risks",
      icon: AlertTriangle,
      features: ["Risk identification", "Impact analysis", "Risk prioritization"]
    },
    {
      title: "Risk Management Framework",
      description: "Design and implement enterprise-wide risk management systems",
      icon: Shield,
      features: ["Risk appetite", "Risk tolerance", "Risk monitoring"]
    },
    {
      title: "Business Continuity Planning",
      description: "Develop strategies to maintain operations during disruptions",
      icon: Target,
      features: ["BC planning", "Crisis management", "Recovery strategies"]
    }
  ];

  const complianceServices = [
    {
      title: "Regulatory Compliance",
      description: "Ensure adherence to industry regulations and standards",
      icon: CheckCircle,
      features: ["GDPR compliance", "SOX compliance", "Industry standards"]
    },
    {
      title: "Internal Audit Services",
      description: "Independent assessment of internal controls and processes",
      icon: ClipboardCheck,
      features: ["Process audits", "Compliance testing", "Control assessment"]
    },
    {
      title: "Compliance Monitoring",
      description: "Ongoing monitoring and reporting of compliance status",
      icon: BarChart,
      features: ["Compliance dashboards", "KPI tracking", "Regular reporting"]
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'
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
              isDarkMode ? 'bg-blue-600/20' : 'bg-blue-100'
            }`}>
              <Shield className={`w-10 h-10 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <h1 className={`text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent ${
              isDarkMode 
                ? 'from-blue-400 via-blue-300 to-indigo-300' 
                : 'from-blue-600 via-blue-700 to-indigo-700'
            }`}>
              Governance, Risk & Compliance (GRC)
            </h1>
            <p className={`text-xl md:text-2xl mb-8 max-w-4xl mx-auto ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Comprehensive GRC solutions to strengthen your organization's governance framework, 
              manage risks effectively, and ensure regulatory compliance across all business operations.
            </p>
          </div>
        </section>

        {/* Governance Services Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-4xl font-bold text-center mb-4 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Governance Services
            </h2>
            <p className={`text-center mb-12 text-lg ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Establish robust governance frameworks to drive organizational excellence
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {governanceServices.map((service, index) => (
                <div key={index} className={`rounded-2xl p-8 backdrop-blur-md border transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/60' 
                    : 'bg-white/70 border-white/50 hover:bg-white/90'
                }`}>
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${
                    isDarkMode ? 'bg-blue-600/20' : 'bg-blue-100'
                  }`}>
                    <service.icon className={`w-8 h-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                  <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {service.title}
                  </h3>
                  <p className={`mb-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
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

        {/* Risk Management Services Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-4xl font-bold text-center mb-4 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Risk Management Services
            </h2>
            <p className={`text-center mb-12 text-lg ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Proactive risk identification, assessment, and mitigation strategies
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {riskManagementServices.map((service, index) => (
                <div key={index} className={`rounded-2xl p-8 backdrop-blur-md border transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/60' 
                    : 'bg-white/70 border-white/50 hover:bg-white/90'
                }`}>
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${
                    isDarkMode ? 'bg-orange-600/20' : 'bg-orange-100'
                  }`}>
                    <service.icon className={`w-8 h-8 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                  </div>
                  <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {service.title}
                  </h3>
                  <p className={`mb-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
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

        {/* Compliance Services Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-4xl font-bold text-center mb-4 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Compliance Services & Audit Services
            </h2>
            <p className={`text-center mb-12 text-lg ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Comprehensive compliance management and audit services
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {complianceServices.map((service, index) => (
                <div key={index} className={`rounded-2xl p-8 backdrop-blur-md border transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/60' 
                    : 'bg-white/70 border-white/50 hover:bg-white/90'
                }`}>
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${
                    isDarkMode ? 'bg-green-600/20' : 'bg-green-100'
                  }`}>
                    <service.icon className={`w-8 h-8 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                  </div>
                  <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {service.title}
                  </h3>
                  <p className={`mb-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
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

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`rounded-3xl p-12 backdrop-blur-md border ${
              isDarkMode 
                ? 'bg-slate-800/50 border-slate-700/50' 
                : 'bg-white/70 border-white/50'
            }`}>
              <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Ready to Strengthen Your GRC Framework?
              </h2>
              <p className={`text-lg mb-8 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Let our experts help you build a comprehensive governance, risk, and compliance program 
                tailored to your organization's unique needs.
              </p>
              <button className={`px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-blue-900/25' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-blue-500/25'
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

export default GRCPage3D;
