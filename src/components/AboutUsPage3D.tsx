import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';
import { 
  Users, 
  Award, 
  Shield, 
  Globe, 
  ArrowLeft, 
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

  const handleGoBack = () => {
    window.history.back();
  };

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
        <nav className="fixed top-4 left-4 right-4 z-20">
          <div className="flex justify-between items-center">
            <button
              onClick={handleGoBack}
              className={`flex items-center space-x-2 backdrop-blur-md border px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl group ${
                isDarkMode 
                  ? 'bg-slate-800/90 border-slate-700 text-blue-400 hover:bg-slate-700/90 hover:border-slate-600' 
                  : 'bg-white/90 border-sky-200 text-blue-600 hover:bg-white/95 hover:border-sky-300'
              }`}
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Back to Home</span>
            </button>
            
            <div className={`flex items-center space-x-3 backdrop-blur-md border rounded-xl px-4 py-2 shadow-lg ${
              isDarkMode 
                ? 'bg-slate-800/90 border-slate-700' 
                : 'bg-white/90 border-sky-200'
            }`}>
              <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-blue-100'}`}>
                <img src="/rnr-logo.png" alt="RNR Consulting" className="h-6 w-6" />
              </div>
              <span className={`text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
                isDarkMode 
                  ? 'from-blue-400 to-blue-300' 
                  : 'from-blue-600 to-blue-800'
              }`}>
                RNR Consulting
              </span>
            </div>
          </div>
        </nav>

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
              <h1 className={`text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r bg-clip-text text-transparent leading-tight ${
                isDarkMode 
                  ? 'from-blue-400 via-blue-300 to-indigo-300' 
                  : 'from-blue-600 via-blue-700 to-indigo-700'
              }`}>
                About Us
              </h1>
              <p className={`text-2xl md:text-3xl mb-12 leading-relaxed max-w-5xl mx-auto ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                We are pioneers in cybersecurity innovation, combining cutting-edge technology with deep industry expertise 
                to protect organizations from evolving digital threats.
              </p>
            </div>

            {/* Vision, Mission, Goals */}
            <div className={`backdrop-blur-md border rounded-3xl p-12 shadow-xl mb-20 hover:shadow-2xl transition-all duration-300 ${
              isDarkMode 
                ? 'bg-slate-800/95 border-slate-700' 
                : 'bg-white/95 border-sky-200'
            }`}
              style={{
                boxShadow: '0 10px 40px rgba(135, 206, 235, 0.3), 0 0 20px rgba(135, 206, 235, 0.1)',
              }}
            >
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                  Our Foundation
                </h2>
                <p className={`text-lg max-w-3xl mx-auto ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  The core principles that drive our mission and shape our commitment to cybersecurity excellence.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {visionMissionGoals.map((item, index) => (
                  <div key={index} className="text-center group">
                    <div className={`p-6 bg-gradient-to-r ${item.color} rounded-2xl mb-6 text-white w-fit mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      {item.icon}
                    </div>
                    <h3 className={`text-2xl font-bold mb-4 group-hover:text-blue-700 transition-colors ${
                      isDarkMode ? 'text-slate-200' : 'text-slate-800'
                    }`}>
                      {item.title}
                    </h3>
                    <p className={`leading-relaxed group-hover:text-slate-700 transition-colors ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Who We Are - Expandable Sections */}
            <div className={`backdrop-blur-md border rounded-3xl p-12 shadow-xl mb-20 hover:shadow-2xl transition-all duration-300 ${
              isDarkMode 
                ? 'bg-slate-800/95 border-slate-700' 
                : 'bg-white/95 border-sky-200'
            }`}
              style={{
                boxShadow: '0 10px 40px rgba(135, 206, 235, 0.3), 0 0 20px rgba(135, 206, 235, 0.1)',
              }}
            >
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                  Discover RNR Consulting
                </h2>
                <p className={`text-lg max-w-3xl mx-auto ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  Learn more about our approach, methodology, and commitment to cybersecurity excellence.
                </p>
              </div>
              
              <div className="space-y-4">
                {expandableSections.map((section) => (
                  <div key={section.id} className={`border rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-102 ${
                    isDarkMode 
                      ? 'border-slate-600 bg-slate-700/50' 
                      : 'border-sky-200 bg-white'
                  }`}
                    style={{
                      boxShadow: '0 10px 40px rgba(135, 206, 235, 0.2), 0 0 20px rgba(135, 206, 235, 0.05)',
                    }}
                  >
                    <button
                      onClick={() => toggleSection(section.id)}
                      className={`w-full flex items-center justify-between p-6 transition-all duration-300 ${
                        isDarkMode 
                          ? 'bg-gradient-to-r from-slate-700/80 to-slate-600/80 hover:from-slate-600/80 hover:to-slate-500/80' 
                          : 'bg-gradient-to-r from-sky-50 to-indigo-50 hover:from-sky-100 hover:to-indigo-100'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg shadow-lg ${
                          isDarkMode 
                            ? 'bg-gradient-to-br from-slate-600 to-slate-500 text-blue-400' 
                            : 'bg-gradient-to-br from-sky-100 to-sky-200 text-blue-600'
                        }`}>
                          {String(section.id).padStart(2, '0')}
                        </div>
                        <h3 className={`text-xl font-semibold ${
                          isDarkMode ? 'text-slate-200' : 'text-slate-800'
                        }`}>{section.title}</h3>
                      </div>
                      <div className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}>
                        {expandedSection === section.id ? (
                          <ChevronUp className="h-6 w-6" />
                        ) : (
                          <ChevronDown className="h-6 w-6" />
                        )}
                      </div>
                    </button>
                    
                    <div className={`transition-all duration-500 ease-in-out ${
                      expandedSection === section.id 
                        ? 'max-h-96 opacity-100' 
                        : 'max-h-0 opacity-0'
                    } overflow-hidden`}>
                      <div className={`p-6 border-t ${
                        isDarkMode 
                          ? 'bg-gradient-to-br from-slate-700/50 to-slate-600/50 border-slate-600' 
                          : 'bg-gradient-to-br from-sky-50 to-sky-100 border-sky-100'
                      }`}>
                        <p className={`leading-relaxed ${
                          isDarkMode ? 'text-slate-300' : 'text-slate-600'
                        }`}>
                          {section.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Company Stats */}
            <div className={`backdrop-blur-md border rounded-3xl p-12 shadow-xl mb-20 hover:shadow-2xl transition-all duration-300 ${
              isDarkMode 
                ? 'bg-slate-800/95 border-slate-700' 
                : 'bg-white/95 border-sky-200'
            }`}
              style={{
                boxShadow: '0 10px 40px rgba(135, 206, 235, 0.3), 0 0 20px rgba(135, 206, 235, 0.1)',
              }}
            >
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                  Our Impact
                </h2>
                <p className={`text-lg max-w-3xl mx-auto ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  Numbers that reflect our commitment to cybersecurity excellence and client success.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {companyStats.map((stat, index) => (
                  <div key={index} className={`text-center p-8 rounded-2xl border hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-slate-700/80 to-slate-600/80 border-slate-600' 
                      : 'bg-gradient-to-br from-sky-50 to-indigo-50 border-sky-200'
                  }`}
                    style={{
                      boxShadow: '0 10px 40px rgba(135, 206, 235, 0.2), 0 0 20px rgba(135, 206, 235, 0.05)',
                    }}
                  >
                    <div className={`flex justify-center mb-6 ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      {stat.icon}
                    </div>
                    <div className={`text-4xl font-bold mb-3 ${
                      isDarkMode ? 'text-blue-300' : 'text-blue-700'
                    }`}>{stat.number}</div>
                    <div className={`font-medium ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-600'
                    }`}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Competencies */}
            <div className={`backdrop-blur-md border rounded-3xl p-12 shadow-xl mb-20 hover:shadow-2xl transition-all duration-300 ${
              isDarkMode 
                ? 'bg-slate-800/95 border-slate-700' 
                : 'bg-white/95 border-sky-200'
            }`}
              style={{
                boxShadow: '0 10px 40px rgba(135, 206, 235, 0.3), 0 0 20px rgba(135, 206, 235, 0.1)',
              }}
            >
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                  Core Competencies
                </h2>
                <p className={`text-lg max-w-3xl mx-auto ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  Our expertise spans the entire cybersecurity landscape, from foundational security architecture 
                  to advanced threat hunting and incident response.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {competencies.map((competency, index) => (
                  <div key={index} className="text-center group">
                    <div className={`p-6 rounded-2xl mb-4 w-fit mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg ${
                      isDarkMode 
                        ? 'bg-gradient-to-br from-slate-700 to-slate-600 text-blue-400' 
                        : 'bg-gradient-to-br from-sky-100 to-indigo-100 text-blue-600'
                    }`}>
                      {competency.icon}
                    </div>
                    <h3 className={`text-xl font-semibold mb-3 group-hover:text-blue-700 transition-colors ${
                      isDarkMode ? 'text-slate-200' : 'text-slate-800'
                    }`}>
                      {competency.title}
                    </h3>
                    <p className={`group-hover:text-slate-700 transition-colors ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      {competency.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className={`backdrop-blur-md border rounded-3xl p-12 shadow-xl text-center hover:shadow-2xl transition-all duration-300 ${
              isDarkMode 
                ? 'bg-slate-800/95 border-slate-700' 
                : 'bg-white/95 border-sky-200'
            }`}
              style={{
                boxShadow: '0 10px 40px rgba(135, 206, 235, 0.3), 0 0 20px rgba(135, 206, 235, 0.1)',
              }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                Ready to Secure Your Future?
              </h2>
              <p className={`text-xl mb-8 max-w-3xl mx-auto leading-relaxed ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Join hundreds of organizations that trust RNR Consulting to protect their most valuable digital assets. 
                Let's build a more secure tomorrow together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105">
                  Schedule Consultation
                </button>
                <button className={`px-8 py-4 border-2 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-slate-700/50 border-blue-400 text-blue-400 hover:bg-slate-600/50' 
                    : 'bg-white border-blue-600 text-blue-600 hover:bg-blue-50'
                }`}>
                  View Our Services
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage3D;
