import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';
import { Link } from 'react-router-dom';
import { Shield, Users, Target, Eye, Lightbulb, CheckCircle, Globe, Zap, Star, Menu, X, Search, Sun, Moon, ChevronDown, Award, Lock } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const PhilosophyPage3D: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number | null>(null);

  // Navigation state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

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
    


    // Subtle connecting lines between some elements
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.1
    });
    
    const lineGeometry1 = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-6, 2, -8),
      new THREE.Vector3(6, -2, -6)
    ]);
    const line1 = new THREE.Line(lineGeometry1, lineMaterial);
    scene.add(line1);

    const lineGeometry2 = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 4, -10),
      new THREE.Vector3(-3, -3, -12)
    ]);
    const line2 = new THREE.Line(lineGeometry2, lineMaterial);
    scene.add(line2);

    camera.position.z = 15;
    camera.position.y = 0;

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

  // Philosophy values and content
  const philosophyPillars = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Integrity First",
      description: "We believe that trust is the foundation of all meaningful relationships. Our commitment to transparency and ethical practices guides every decision we make.",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Excellence Driven",
      description: "We pursue perfection in everything we do, constantly pushing the boundaries of what's possible in cybersecurity innovation.",
      color: "from-blue-600 to-indigo-700"
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Innovation Focused",
      description: "We embrace change and lead the industry with cutting-edge solutions that anticipate tomorrow's security challenges.",
      color: "from-blue-400 to-indigo-500"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "People Centered",
      description: "Behind every great security solution are great people. We invest in our team and prioritize our clients' success above all else.",
      color: "from-blue-700 to-indigo-800"
    }
  ];

  const coreValues = [
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Accountability",
      description: "We take ownership of our actions and deliver on our promises."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Impact",
      description: "We think globally while acting locally, creating solutions that scale."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Agility",
      description: "We adapt quickly to changing landscapes and emerging threats."
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Excellence",
      description: "We strive for the highest standards in everything we deliver."
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
        {/* Main Navigation Bar */}
        <nav className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] max-w-7xl backdrop-blur-md border rounded-2xl z-50 shadow-lg transition-colors duration-300 ${
          isDarkMode 
            ? 'bg-slate-800/20 border-slate-700/30 shadow-blue-900/10' 
            : 'bg-white/20 border-white/30 shadow-blue-500/10'
        }`}>
          <div className="px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo and Brand */}
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-xl shadow-lg transition-colors duration-300 ${
                  isDarkMode ? 'bg-slate-700' : 'bg-white'
                }`}>
                  <img src="/rnr-logo.png" alt="RNR Consulting" className="h-6 w-6" />
                </div>
                <span className={`text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent transition-colors duration-300 ${
                  isDarkMode 
                    ? 'from-blue-400 to-blue-300' 
                    : 'from-blue-600 to-blue-800'
                }`}>
                  RNR Consulting
                </span>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-6">
                {/* Home Link */}
                <Link to="/" className={`font-medium transition-colors duration-300 ${
                  isDarkMode 
                    ? 'text-slate-300 hover:text-blue-400' 
                    : 'text-slate-700 hover:text-blue-600'
                }`}>Home</Link>
                
                {/* Services Dropdown */}
                <div 
                  className="relative"
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <button className={`flex items-center font-medium transition-colors duration-300 ${
                    isDarkMode 
                      ? 'text-slate-300 hover:text-blue-400' 
                      : 'text-slate-700 hover:text-blue-600'
                  }`}>
                    Services
                    <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className={`absolute top-full left-0 mt-2 w-64 backdrop-blur-md border rounded-xl shadow-lg transition-all duration-200 ${
                    isServicesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                  } ${
                    isDarkMode 
                      ? 'bg-slate-800/90 border-slate-700/30 shadow-blue-900/10' 
                      : 'bg-white/90 border-white/30 shadow-blue-500/10'
                  }`}>
                    <div className="py-2">
                      <Link to="/contact" className={`block px-4 py-3 transition-colors ${
                        isDarkMode 
                          ? 'text-slate-300 hover:text-blue-400 hover:bg-slate-700/50' 
                          : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50/50'
                      }`}>
                        <div className="flex items-center space-x-3">
                          <Shield className="h-4 w-4" />
                          <div>
                            <div className="font-medium">Threat Detection</div>
                            <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>AI-powered monitoring</div>
                          </div>
                        </div>
                      </Link>
                      <Link to="/contact" className={`block px-4 py-3 transition-colors ${
                        isDarkMode 
                          ? 'text-slate-300 hover:text-blue-400 hover:bg-slate-700/50' 
                          : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50/50'
                      }`}>
                        <div className="flex items-center space-x-3">
                          <Lock className="h-4 w-4" />
                          <div>
                            <div className="font-medium">Data Encryption</div>
                            <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Military-grade security</div>
                          </div>
                        </div>
                      </Link>
                      <Link to="/contact" className={`block px-4 py-3 transition-colors ${
                        isDarkMode 
                          ? 'text-slate-300 hover:text-blue-400 hover:bg-slate-700/50' 
                          : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50/50'
                      }`}>
                        <div className="flex items-center space-x-3">
                          <Eye className="h-4 w-4" />
                          <div>
                            <div className="font-medium">Security Audits</div>
                            <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Comprehensive assessments</div>
                          </div>
                        </div>
                      </Link>
                      <Link to="/contact" className={`block px-4 py-3 transition-colors ${
                        isDarkMode 
                          ? 'text-slate-300 hover:text-blue-400 hover:bg-slate-700/50' 
                          : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50/50'
                      }`}>
                        <div className="flex items-center space-x-3">
                          <Zap className="h-4 w-4" />
                          <div>
                            <div className="font-medium">Incident Response</div>
                            <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>24/7 rapid response</div>
                          </div>
                        </div>
                      </Link>
                      <Link to="/careers" className={`block px-4 py-3 transition-colors ${
                        isDarkMode 
                          ? 'text-slate-300 hover:text-blue-400 hover:bg-slate-700/50' 
                          : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50/50'
                      }`}>
                        <div className="flex items-center space-x-3">
                          <Users className="h-4 w-4" />
                          <div>
                            <div className="font-medium">Security Training</div>
                            <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Employee education</div>
                          </div>
                        </div>
                      </Link>
                      <Link to="/compliance" className={`block px-4 py-3 transition-colors ${
                        isDarkMode 
                          ? 'text-slate-300 hover:text-blue-400 hover:bg-slate-700/50' 
                          : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50/50'
                      }`}>
                        <div className="flex items-center space-x-3">
                          <Award className="h-4 w-4" />
                          <div>
                            <div className="font-medium">Compliance</div>
                            <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Regulatory standards</div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                
                {/* About Us Dropdown */}
                <div 
                  className="relative"
                  onMouseEnter={() => setIsAboutOpen(true)}
                  onMouseLeave={() => setIsAboutOpen(false)}
                >
                  <button className={`flex items-center font-medium transition-colors duration-300 ${
                    isDarkMode 
                      ? 'text-slate-300 hover:text-blue-400' 
                      : 'text-slate-700 hover:text-blue-600'
                  }`}>
                    About Us
                    <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isAboutOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* About Us Dropdown Menu */}
                  <div className={`absolute top-full left-0 mt-2 w-64 backdrop-blur-md border rounded-xl shadow-lg transition-all duration-200 ${
                    isAboutOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                  } ${
                    isDarkMode 
                      ? 'bg-slate-800/90 border-slate-700/30 shadow-blue-900/10' 
                      : 'bg-white/90 border-white/30 shadow-blue-500/10'
                  }`}>
                    <div className="py-2">
                      <Link to="/philosophy" className={`block px-4 py-3 transition-colors ${
                        isDarkMode 
                          ? 'text-slate-300 hover:text-blue-400 hover:bg-slate-700/50' 
                          : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50/50'
                      }`}>
                        <div className="flex items-center space-x-3">
                          <Award className="h-4 w-4" />
                          <div>
                            <div className="font-medium">Our Philosophy</div>
                            <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Our core values & approach</div>
                          </div>
                        </div>
                      </Link>
                      <Link to="/team" className={`block px-4 py-3 transition-colors ${
                        isDarkMode 
                          ? 'text-slate-300 hover:text-blue-400 hover:bg-slate-700/50' 
                          : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50/50'
                      }`}>
                        <div className="flex items-center space-x-3">
                          <Users className="h-4 w-4" />
                          <div>
                            <div className="font-medium">Our Team</div>
                            <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Meet our experts</div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                
                {/* News & Blogs Link */}
                <Link to="/news" className={`font-medium transition-colors duration-300 ${
                  isDarkMode 
                    ? 'text-slate-300 hover:text-blue-400' 
                    : 'text-slate-700 hover:text-blue-600'
                }`}>News & Blogs</Link>
                
                <Link to="/careers" className={`font-medium transition-colors duration-300 ${
                  isDarkMode 
                    ? 'text-slate-300 hover:text-blue-400' 
                    : 'text-slate-700 hover:text-blue-600'
                }`}>Careers</Link>
                <Link 
                  to="/contact"
                  className={`font-medium transition-all duration-300 hover:scale-105 transform ${
                    isDarkMode 
                      ? 'text-slate-300 hover:text-blue-400' 
                      : 'text-slate-700 hover:text-blue-600'
                  }`}
                >
                  Contact Us
                </Link>
              </div>
              
              {/* Mobile and Desktop Actions */}
              <div className="flex items-center space-x-3">
                {/* Theme Toggle Button */}
                <button
                  onClick={toggleTheme}
                  className={`p-2 sm:p-3 backdrop-blur-sm border rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl ${
                    isDarkMode 
                      ? 'bg-slate-700/80 border-slate-600 text-blue-400 hover:bg-slate-600/80 hover:border-slate-500' 
                      : 'bg-white/80 border-blue-200 text-blue-600 hover:bg-white hover:border-blue-300'
                  }`}
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? (
                    <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                </button>
                
                {/* Search Button - Hidden on small screens */}
                <button className={`hidden sm:block p-2 sm:p-3 backdrop-blur-sm border rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl ${
                  isDarkMode 
                    ? 'bg-slate-700/80 border-slate-600 text-blue-400 hover:bg-slate-600/80 hover:border-slate-500' 
                    : 'bg-white/80 border-blue-200 text-blue-600 hover:bg-white hover:border-blue-300'
                }`}>
                  <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>

                {/* Mobile Hamburger Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className={`lg:hidden p-2 backdrop-blur-sm border rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl ${
                    isDarkMode 
                      ? 'bg-slate-700/80 border-slate-600 text-blue-400 hover:bg-slate-600/80 hover:border-slate-500' 
                      : 'bg-white/80 border-blue-200 text-blue-600 hover:bg-white hover:border-blue-300'
                  }`}
                  aria-label="Toggle mobile menu"
                >
                  {isMobileMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            <div className={`lg:hidden transition-all duration-300 ease-in-out ${
              isMobileMenuOpen 
                ? 'max-h-screen opacity-100 visible' 
                : 'max-h-0 opacity-0 invisible overflow-hidden'
            }`}>
              <div className="border-t border-slate-700/30 pt-4 pb-4 space-y-4">
                {/* Home Link */}
                <div className="space-y-2">
                  <Link to="/" className={`block py-2 font-medium transition-colors ${
                    isDarkMode 
                      ? 'text-slate-300 hover:text-blue-400' 
                      : 'text-slate-700 hover:text-blue-600'
                  }`} onClick={() => setIsMobileMenuOpen(false)}>
                    Home
                  </Link>
                </div>
                
                {/* Services Section */}
                <div className="space-y-2">
                  <div className={`font-semibold text-sm uppercase tracking-wide ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    Services
                  </div>
                  <div className="pl-4 space-y-2">
                    <Link to="/contact" className={`block py-2 text-sm transition-colors ${
                      isDarkMode 
                        ? 'text-slate-300 hover:text-blue-400' 
                        : 'text-slate-700 hover:text-blue-600'
                    }`} onClick={() => setIsMobileMenuOpen(false)}>
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4" />
                        <span>Threat Detection</span>
                      </div>
                    </Link>
                    <Link to="/contact" className={`block py-2 text-sm transition-colors ${
                      isDarkMode 
                        ? 'text-slate-300 hover:text-blue-400' 
                        : 'text-slate-700 hover:text-blue-600'
                    }`} onClick={() => setIsMobileMenuOpen(false)}>
                      <div className="flex items-center space-x-2">
                        <Lock className="h-4 w-4" />
                        <span>Data Encryption</span>
                      </div>
                    </Link>
                    <Link to="/contact" className={`block py-2 text-sm transition-colors ${
                      isDarkMode 
                        ? 'text-slate-300 hover:text-blue-400' 
                        : 'text-slate-700 hover:text-blue-600'
                    }`} onClick={() => setIsMobileMenuOpen(false)}>
                      <div className="flex items-center space-x-2">
                        <Eye className="h-4 w-4" />
                        <span>Security Audits</span>
                      </div>
                    </Link>
                    <Link to="/contact" className={`block py-2 text-sm transition-colors ${
                      isDarkMode 
                        ? 'text-slate-300 hover:text-blue-400' 
                        : 'text-slate-700 hover:text-blue-600'
                    }`} onClick={() => setIsMobileMenuOpen(false)}>
                      <div className="flex items-center space-x-2">
                        <Zap className="h-4 w-4" />
                        <span>Incident Response</span>
                      </div>
                    </Link>
                    <Link to="/careers" className={`block py-2 text-sm transition-colors ${
                      isDarkMode 
                        ? 'text-slate-300 hover:text-blue-400' 
                        : 'text-slate-700 hover:text-blue-600'
                    }`} onClick={() => setIsMobileMenuOpen(false)}>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>Security Training</span>
                      </div>
                    </Link>
                    <Link to="/compliance" className={`block px-4 py-3 transition-colors ${
                      isDarkMode 
                        ? 'text-slate-300 hover:text-blue-400 hover:bg-slate-700/50' 
                        : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50/50'
                    }`} onClick={() => setIsMobileMenuOpen(false)}>
                      <div className="flex items-center space-x-2">
                        <Award className="h-4 w-4" />
                        <span>Compliance</span>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* About Us Section */}
                <div className="space-y-2">
                  <div className={`font-semibold text-sm uppercase tracking-wide ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    About Us
                  </div>
                  <div className="pl-4 space-y-2">
                    <Link to="/philosophy" className={`block py-2 text-sm transition-colors ${
                      isDarkMode 
                        ? 'text-slate-300 hover:text-blue-400' 
                        : 'text-slate-700 hover:text-blue-600'
                    }`} onClick={() => setIsMobileMenuOpen(false)}>
                      <div className="flex items-center space-x-2">
                        <Award className="h-4 w-4" />
                        <span>Our Philosophy</span>
                      </div>
                    </Link>
                    <Link to="/team" className={`block py-2 text-sm transition-colors ${
                      isDarkMode 
                        ? 'text-slate-300 hover:text-blue-400' 
                        : 'text-slate-700 hover:text-blue-600'
                    }`} onClick={() => setIsMobileMenuOpen(false)}>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>Our Team</span>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Main Navigation */}
                <div className="space-y-2 border-t border-slate-700/30 pt-4">
                  <Link to="/news" className={`block py-2 font-medium transition-colors ${
                    isDarkMode 
                      ? 'text-slate-300 hover:text-blue-400' 
                      : 'text-slate-700 hover:text-blue-600'
                  }`} onClick={() => setIsMobileMenuOpen(false)}>
                    News & Blogs
                  </Link>
                  <Link to="/careers" className={`block py-2 font-medium transition-colors ${
                    isDarkMode 
                      ? 'text-slate-300 hover:text-blue-400' 
                      : 'text-slate-700 hover:text-blue-600'
                  }`} onClick={() => setIsMobileMenuOpen(false)}>
                    Careers
                  </Link>
                  <Link to="/contact" className={`block py-2 font-medium transition-colors ${
                    isDarkMode 
                      ? 'text-slate-300 hover:text-blue-400' 
                      : 'text-slate-700 hover:text-blue-600'
                  }`} onClick={() => setIsMobileMenuOpen(false)}>
                    Contact Us
                  </Link>
                </div>

                {/* Mobile Search */}
                <div className="border-t border-slate-700/30 pt-4">
                  <button className={`w-full flex items-center justify-center space-x-2 py-3 backdrop-blur-sm border rounded-xl transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-slate-700/80 border-slate-600 text-blue-400 hover:bg-slate-600/80' 
                      : 'bg-white/80 border-blue-200 text-blue-600 hover:bg-white'
                  }`}>
                    <Search className="h-4 w-4" />
                    <span className="text-sm font-medium">Search</span>
                  </button>
                </div>
              </div>
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
                    ? 'bg-slate-800/90 border-slate-700' 
                    : 'bg-white/90 border-blue-200'
                }`}>
                  <Lightbulb className={`h-16 w-16 ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                </div>
              </div>
              <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 bg-clip-text text-transparent leading-tight">
                Our Philosophy
              </h1>
              <p className={`text-2xl md:text-3xl mb-12 leading-relaxed max-w-5xl mx-auto ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Guided by principles of integrity, excellence, and innovation, we shape the future of cybersecurity 
                through values-driven solutions that protect what matters most.
              </p>
            </div>

            {/* Philosophy Pillars */}
            <div className={`backdrop-blur-md border rounded-3xl p-12 shadow-lg mb-20 ${
              isDarkMode 
                ? 'bg-slate-800/90 border-slate-700' 
                : 'bg-white/90 border-blue-200'
            }`}>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                  Our Guiding Principles
                </h2>
                <p className={`text-lg max-w-3xl mx-auto ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  These four pillars represent the foundation of our approach to cybersecurity consulting and the values that drive our commitment to excellence.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                {philosophyPillars.map((pillar, index) => (
                  <div key={index} className="group">
                    <div className={`p-8 rounded-2xl border hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                      isDarkMode 
                        ? 'bg-gradient-to-br from-slate-700 to-slate-800 border-slate-600' 
                        : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100'
                    }`}>
                      <div className={`p-4 bg-gradient-to-r ${pillar.color} rounded-2xl w-fit mb-6 text-white shadow-lg`}>
                        {pillar.icon}
                      </div>
                      <h3 className={`text-2xl font-bold mb-4 transition-colors ${
                        isDarkMode 
                          ? 'text-slate-200 group-hover:text-blue-400' 
                          : 'text-slate-800 group-hover:text-blue-700'
                      }`}>
                        {pillar.title}
                      </h3>
                      <p className={`leading-relaxed transition-colors ${
                        isDarkMode 
                          ? 'text-slate-300 group-hover:text-slate-200' 
                          : 'text-slate-600 group-hover:text-slate-700'
                      }`}>
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Values */}
            <div className={`backdrop-blur-md border rounded-3xl p-12 shadow-lg mb-20 ${
              isDarkMode 
                ? 'bg-slate-800/90 border-slate-700' 
                : 'bg-white/90 border-blue-200'
            }`}>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                  Core Values
                </h2>
                <p className={`text-lg max-w-3xl mx-auto ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  Our core values are not just words on a page—they are the fundamental beliefs that guide our actions, 
                  decisions, and relationships every single day.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {coreValues.map((value, index) => (
                  <div key={index} className="text-center group">
                    <div className={`p-6 rounded-2xl mb-4 w-fit mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg ${
                      isDarkMode 
                        ? 'bg-gradient-to-br from-slate-700 to-slate-800 text-blue-400' 
                        : 'bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600'
                    }`}>
                      {value.icon}
                    </div>
                    <h3 className={`text-xl font-semibold mb-3 transition-colors ${
                      isDarkMode 
                        ? 'text-slate-200 group-hover:text-blue-400' 
                        : 'text-slate-800 group-hover:text-blue-700'
                    }`}>
                      {value.title}
                    </h3>
                    <p className={`transition-colors ${
                      isDarkMode 
                        ? 'text-slate-300 group-hover:text-slate-200' 
                        : 'text-slate-600 group-hover:text-slate-700'
                    }`}>
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Vision Statement */}
            <div className={`backdrop-blur-md border rounded-3xl p-12 shadow-lg text-center ${
              isDarkMode 
                ? 'bg-slate-800/90 border-slate-700' 
                : 'bg-white/90 border-blue-200'
            }`}>
              <div className="flex items-center justify-center mb-8">
                <div className="p-4 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl">
                  <Eye className="h-12 w-12 text-white" />
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                Our Vision
              </h2>
              <p className={`text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                To be the global leader in cybersecurity innovation, setting new standards for digital protection 
                and enabling a secure digital transformation for businesses worldwide.
              </p>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                {[
                  { number: "2030", label: "Vision Target" },
                  { number: "Global", label: "Market Reach" },
                  { number: "Innovation", label: "Core Focus" }
                ].map((item, index) => (
                  <div key={index} className={`p-6 rounded-2xl ${
                    isDarkMode ? 'bg-slate-700/60' : 'bg-blue-50'
                  }`}>
                    <div className={`text-2xl font-bold mb-2 ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>{item.number}</div>
                    <div className={`font-medium ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-600'
                    }`}>{item.label}</div>
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

export default PhilosophyPage3D;
