import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Award, 
  Shield, 
  Globe, 
  Target,
  Zap, 
  Lock,
  TrendingUp,
  Eye,
  ChevronDown,
  ChevronUp,
  Code
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import Navigation from './Navigation';

const AboutUsPage3D: React.FC = () => {
  const { isDarkMode } = useTheme();
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number | null>(null);
  const [expandedSection, setExpandedSection] = useState<number | null>(1);

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

    // Enhanced particles system with cooler colors and glow
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 240; // Reduced by 80% (from 1200 to 240)
    
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);
    const sizeArray = new Float32Array(particleCount);
    
    for(let i = 0; i < particleCount * 3; i += 3) {
      // Spread particles across larger area
      posArray[i] = (Math.random() - 0.5) * 300;
      posArray[i + 1] = (Math.random() - 0.5) * 300;
      posArray[i + 2] = (Math.random() - 0.5) * 200;
      
      // Varied particle sizes for depth
      sizeArray[i / 3] = Math.random() * 3 + 1;
      
      // Cool color palette - blues, cyans, and whites
      const colorChoice = Math.random();
      if (colorChoice < 0.4) {
        // Bright cyan/aqua particles
        colorArray[i] = 0.2;
        colorArray[i + 1] = 0.8;
        colorArray[i + 2] = 1.0;
      } else if (colorChoice < 0.7) {
        // Electric blue particles
        colorArray[i] = 0.1;
        colorArray[i + 1] = 0.5;
        colorArray[i + 2] = 1.0;
      } else {
        // Bright white particles
        colorArray[i] = 1.0;
        colorArray[i + 1] = 1.0;
        colorArray[i + 2] = 1.0;
      }
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizeArray, 1));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 3.0, // Larger round particles
      transparent: true,
      opacity: 0.9, // More visible
      vertexColors: true,
      blending: THREE.AdditiveBlending, // Glowing effect
      sizeAttenuation: true,
      map: createCircleTexture(), // Round particle texture
      alphaTest: 0.1
    });
    
    // Function to create round particle texture
    function createCircleTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d')!;
      
      // Create gradient for glow effect
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.2, 'rgba(100, 200, 255, 0.8)');
      gradient.addColorStop(0.5, 'rgba(50, 150, 255, 0.4)');
      gradient.addColorStop(1, 'rgba(0, 100, 255, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
      
      const texture = new THREE.CanvasTexture(canvas);
      return texture;
    }
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Triangular components only - various triangle-based shapes
    const geometricElements: THREE.Mesh[] = [];
    
    // Large triangle pyramid (tetrahedron)
    const tetra1Geometry = new THREE.TetrahedronGeometry(8);
    const tetra1Material = new THREE.MeshBasicMaterial({
      color: 0x1e3a8a, // Dark blue
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });
    const tetra1 = new THREE.Mesh(tetra1Geometry, tetra1Material);
    tetra1.position.set(-30, 15, -40);
    geometricElements.push(tetra1);
    scene.add(tetra1);

    // Another large tetrahedron
    const tetra2Geometry = new THREE.TetrahedronGeometry(6);
    const tetra2Material = new THREE.MeshBasicMaterial({
      color: 0x1e40af, // Dark blue
      wireframe: true,
      transparent: true,
      opacity: 0.7
    });
    const tetra2 = new THREE.Mesh(tetra2Geometry, tetra2Material);
    tetra2.position.set(35, -12, -35);
    geometricElements.push(tetra2);
    scene.add(tetra2);

    // Large octahedron (double pyramid - triangular)
    const octa1Geometry = new THREE.OctahedronGeometry(7);
    const octa1Material = new THREE.MeshBasicMaterial({
      color: 0x312e81, // Dark blue
      wireframe: true,
      transparent: true,
      opacity: 0.75
    });
    const octa1 = new THREE.Mesh(octa1Geometry, octa1Material);
    octa1.position.set(0, 20, -50);
    geometricElements.push(octa1);
    scene.add(octa1);

    // Another octahedron
    const octa2Geometry = new THREE.OctahedronGeometry(5);
    const octa2Material = new THREE.MeshBasicMaterial({
      color: 0x1d4ed8, // Dark blue
      wireframe: true,
      transparent: true,
      opacity: 0.7
    });
    const octa2 = new THREE.Mesh(octa2Geometry, octa2Material);
    octa2.position.set(-25, -18, -45);
    geometricElements.push(octa2);
    scene.add(octa2);

    // Large icosahedron (triangular faces)
    const icosa1Geometry = new THREE.IcosahedronGeometry(6, 0);
    const icosa1Material = new THREE.MeshBasicMaterial({
      color: 0x2563eb, // Dark blue
      wireframe: true,
      transparent: true,
      opacity: 0.75
    });
    const icosa1 = new THREE.Mesh(icosa1Geometry, icosa1Material);
    icosa1.position.set(28, 12, -30);
    geometricElements.push(icosa1);
    scene.add(icosa1);

    // Another icosahedron
    const icosa2Geometry = new THREE.IcosahedronGeometry(4, 0);
    const icosa2Material = new THREE.MeshBasicMaterial({
      color: 0x3730a3, // Dark blue
      wireframe: true,
      transparent: true,
      opacity: 0.7
    });
    const icosa2 = new THREE.Mesh(icosa2Geometry, icosa2Material);
    icosa2.position.set(-15, 25, -60);
    geometricElements.push(icosa2);
    scene.add(icosa2);

    // Large tetrahedron
    const tetra3Geometry = new THREE.TetrahedronGeometry(7);
    const tetra3Material = new THREE.MeshBasicMaterial({
      color: 0x1e40af, // Dark blue
      wireframe: true,
      transparent: true,
      opacity: 0.65
    });
    const tetra3 = new THREE.Mesh(tetra3Geometry, tetra3Material);
    tetra3.position.set(40, -5, -55);
    geometricElements.push(tetra3);
    scene.add(tetra3);

    camera.position.z = 40; // Moved back to see larger components
    camera.position.y = 0;

    // Enhanced camera controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.2; // Much slower rotation (reduced from 1.0)
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Enhanced animation loop with more dramatic movements
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      const time = Date.now() * 0.001;
      
      // Much slower rotations for triangular geometric elements
      if (geometricElements[0]) { // Tetrahedron 1
        geometricElements[0].rotation.x += 0.001;
        geometricElements[0].rotation.y += 0.0008;
        geometricElements[0].rotation.z += 0.0005;
      }
      
      if (geometricElements[1]) { // Tetrahedron 2
        geometricElements[1].rotation.x += 0.0008;
        geometricElements[1].rotation.y += 0.001;
        geometricElements[1].rotation.z += 0.0006;
      }
      
      if (geometricElements[2]) { // Octahedron 1
        geometricElements[2].rotation.x += 0.0012;
        geometricElements[2].rotation.y += 0.0005;
        geometricElements[2].rotation.z += 0.0009;
      }
      
      if (geometricElements[3]) { // Octahedron 2
        geometricElements[3].rotation.z += 0.0009;
        geometricElements[3].rotation.y += 0.0012;
        geometricElements[3].rotation.x += 0.0006;
      }
      
      if (geometricElements[4]) { // Icosahedron 1
        geometricElements[4].rotation.x += 0.0009;
        geometricElements[4].rotation.y += 0.0013;
        geometricElements[4].rotation.z += 0.0008;
      }

      if (geometricElements[5]) { // Icosahedron 2
        geometricElements[5].rotation.x += 0.0007;
        geometricElements[5].rotation.y += 0.0009;
        geometricElements[5].rotation.z += 0.001;
      }

      if (geometricElements[6]) { // Tetrahedron 3
        geometricElements[6].rotation.x += 0.0008;
        geometricElements[6].rotation.y += 0.0006;
        geometricElements[6].rotation.z += 0.0011;
      }

      // Enhanced particle animation with floating and size variation
      const positions = particlesMesh.geometry.attributes.position.array as Float32Array;
      const sizes = particlesMesh.geometry.attributes.size.array as Float32Array;
      
      for (let i = 0; i < positions.length; i += 3) {
        const particleIndex = i / 3;
        
        // Much slower floating movement
        positions[i + 1] += Math.sin(time * 0.3 + positions[i] * 0.01) * 0.003;
        positions[i] += Math.cos(time * 0.2 + positions[i + 2] * 0.01) * 0.002;
        
        // Slower size pulsing for glow effect
        const baseSizeFactor = sizes[particleIndex] / 3;
        sizes[particleIndex] = baseSizeFactor * (2 + Math.sin(time * 0.8 + particleIndex * 0.1));
      }
      
      particlesMesh.geometry.attributes.position.needsUpdate = true;
      particlesMesh.geometry.attributes.size.needsUpdate = true;
      
      // Much slower particle rotation
      particlesMesh.rotation.y += 0.0001;
      particlesMesh.rotation.x += 0.00005;
      
      // Opacity pulsing for triangular geometric elements
      geometricElements.forEach((element, index) => {
        const material = element.material as THREE.MeshBasicMaterial;
        const baseOpacity = [0.8, 0.7, 0.75, 0.7, 0.75, 0.7, 0.65][index] || 0.7;
        material.opacity = baseOpacity + Math.sin(time * 1.5 + index) * 0.2;
      });
      
      controls.update();
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

  const toggleSection = (index: number) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  // Who we are and what we do - Expandable sections
  const expandableSections = [
    {
      id: 1,
      title: "Who We Are",
      content: "RNR Consulting is a leading cybersecurity firm founded by former government specialists and industry veterans. We combine deep technical expertise with strategic thinking to protect organizations from evolving digital threats. Our team brings together decades of experience from intelligence agencies, Fortune 500 companies, and cutting-edge technology firms to deliver world-class security solutions."
    },
    {
      id: 2,
      title: "What We Do",
      content: "We provide comprehensive cybersecurity services including threat detection and response, security architecture design, compliance consulting, and incident response. Our approach combines advanced technology with human expertise to create robust security frameworks that adapt to your organization's unique needs and risk profile."
    },
    {
      id: 3,
      title: "How We Work",
      content: "Our methodology is built on continuous collaboration and proactive threat hunting. We begin with a comprehensive security assessment, develop customized protection strategies, implement cutting-edge solutions, and provide ongoing monitoring and support. Every engagement is tailored to your specific industry requirements and business objectives."
    },
    {
      id: 4,
      title: "Why Choose Us",
      content: "We distinguish ourselves through our deep technical expertise, proven track record, and commitment to innovation. Our team stays ahead of emerging threats through continuous research and development. We offer 24/7 support, rapid incident response, and transparent communication throughout every engagement."
    },
    {
      id: 5,
      title: "Our Commitment",
      content: "We are committed to building long-term partnerships with our clients. Our success is measured by your security posture and business continuity. We provide ongoing education, regular security updates, and strategic guidance to ensure your organization remains protected against evolving cyber threats."
    }
  ];

  // Vision, Mission, Goals
  const visionMissionGoals = [
    {
      icon: <Eye className="h-12 w-12" />,
      title: "Our Vision",
      description: "To be the global leader in cybersecurity innovation, setting new standards for digital protection and enabling secure digital transformation worldwide.",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: <Target className="h-12 w-12" />,
      title: "Our Mission", 
      description: "To empower organizations with proactive cybersecurity solutions that defend against current threats while anticipating and preparing for future challenges in the digital landscape.",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: <TrendingUp className="h-12 w-12" />,
      title: "Our Goals",
      description: "To continuously advance cybersecurity innovation, expand our global reach, and maintain our position as the most trusted cybersecurity partner for organizations of all sizes.",
      color: "from-green-500 to-teal-600"
    }
  ];

  // Company stats
  const companyStats = [
    { number: "500+", label: "Clients Protected", icon: <Shield className="h-8 w-8" /> },
    { number: "99.9%", label: "Uptime Guaranteed", icon: <TrendingUp className="h-8 w-8" /> },
    { number: "24/7", label: "Security Monitoring", icon: <Eye className="h-8 w-8" /> },
    { number: "15+", label: "Years Experience", icon: <Award className="h-8 w-8" /> }
  ];

  // Core competencies
  const competencies = [
    {
      icon: <Lock className="h-8 w-8" />,
      title: "Advanced Threat Protection",
      description: "Cutting-edge security solutions that adapt to evolving cyber threats"
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Security Architecture",
      description: "Comprehensive security frameworks designed for scalability and resilience"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Rapid Response",
      description: "24/7 incident response with industry-leading resolution times"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Reach",
      description: "Worldwide coverage with local expertise and cultural understanding"
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

        {/* Main Content */}
        <div className="pt-24 pb-12 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-20">
              <div className="flex items-center justify-center mb-8">
                <div className={`p-6 backdrop-blur-md border rounded-3xl shadow-lg ${
                  isDarkMode 
                    ? 'bg-slate-800/95 border-slate-700' 
                    : 'bg-white/95 border-sky-200'
                }`}>
                  <Users className={`h-16 w-16 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
              </div>
              
              <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent ${
                isDarkMode
                  ? 'from-blue-400 via-blue-300 to-indigo-300'
                  : 'from-blue-600 via-indigo-600 to-purple-600'
              }`}>
                About Us
              </h1>
              
              <p className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Dedicated to protecting your digital world with innovation, expertise, and unwavering commitment to cybersecurity excellence.
              </p>
            </div>

            {/* Expandable Sections */}
            <div className={`backdrop-blur-md border rounded-3xl shadow-lg mb-20 ${
              isDarkMode 
                ? 'bg-slate-800/95 border-slate-700' 
                : 'bg-white/95 border-sky-200'
            }`}>
              <div className="p-8">
                <h2 className={`text-3xl font-bold text-center mb-10 ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  Get to Know RNR Consulting
                </h2>
                
                <div className="space-y-4">
                  {expandableSections.map((section) => (
                    <div key={section.id} className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                      isDarkMode 
                        ? 'border-slate-600 bg-slate-700/50' 
                        : 'border-blue-200 bg-blue-50/50'
                    }`}>
                      <button
                        onClick={() => toggleSection(section.id)}
                        className={`w-full px-6 py-4 text-left flex items-center justify-between transition-colors ${
                          isDarkMode 
                            ? 'hover:bg-slate-600/50 text-slate-200' 
                            : 'hover:bg-blue-100/50 text-slate-800'
                        }`}
                      >
                        <span className="text-xl font-semibold">{section.title}</span>
                        {expandedSection === section.id ? (
                          <ChevronUp className="h-6 w-6" />
                        ) : (
                          <ChevronDown className="h-6 w-6" />
                        )}
                      </button>
                      
                      {expandedSection === section.id && (
                        <div className={`px-6 pb-6 ${
                          isDarkMode ? 'text-slate-300' : 'text-slate-600'
                        }`}>
                          <p className="text-lg leading-relaxed">
                            {section.content}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Vision, Mission, Goals */}
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              {visionMissionGoals.map((item, index) => (
                <div key={index} className={`backdrop-blur-md border rounded-3xl p-8 text-center shadow-lg transition-transform hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-slate-800/95 border-slate-700' 
                    : 'bg-white/95 border-sky-200'
                }`}>
                  <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r ${item.color} mb-6`}>
                    <div className="text-white">
                      {item.icon}
                    </div>
                  </div>
                  
                  <h3 className={`text-2xl font-bold mb-4 ${
                    isDarkMode ? 'text-slate-200' : 'text-slate-800'
                  }`}>
                    {item.title}
                  </h3>
                  
                  <p className={`text-lg leading-relaxed ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Company Stats */}
            <div className={`backdrop-blur-md border rounded-3xl p-8 mb-20 shadow-lg ${
              isDarkMode 
                ? 'bg-slate-800/95 border-slate-700' 
                : 'bg-white/95 border-sky-200'
            }`}>
              <h2 className={`text-3xl font-bold text-center mb-10 ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Our Impact by Numbers
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {companyStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                      isDarkMode 
                        ? 'bg-blue-600/20 text-blue-400' 
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      {stat.icon}
                    </div>
                    
                    <div className={`text-3xl md:text-4xl font-bold mb-2 ${
                      isDarkMode ? 'text-slate-200' : 'text-slate-800'
                    }`}>
                      {stat.number}
                    </div>
                    
                    <div className={`text-sm font-medium ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Competencies */}
            <div className={`backdrop-blur-md border rounded-3xl p-8 shadow-lg ${
              isDarkMode 
                ? 'bg-slate-800/95 border-slate-700' 
                : 'bg-white/95 border-sky-200'
            }`}>
              <h2 className={`text-3xl font-bold text-center mb-10 ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Our Core Competencies
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {competencies.map((competency, index) => (
                  <div key={index} className={`flex items-start space-x-4 p-6 rounded-2xl transition-colors ${
                    isDarkMode 
                      ? 'hover:bg-slate-700/50 border border-slate-600/50' 
                      : 'hover:bg-blue-50/50 border border-blue-200/50'
                  }`}>
                    <div className={`flex-shrink-0 p-3 rounded-xl ${
                      isDarkMode 
                        ? 'bg-blue-600/20 text-blue-400' 
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      {competency.icon}
                    </div>
                    
                    <div>
                      <h3 className={`text-xl font-bold mb-2 ${
                        isDarkMode ? 'text-slate-200' : 'text-slate-800'
                      }`}>
                        {competency.title}
                      </h3>
                      
                      <p className={`text-lg leading-relaxed ${
                        isDarkMode ? 'text-slate-300' : 'text-slate-600'
                      }`}>
                        {competency.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage3D;
