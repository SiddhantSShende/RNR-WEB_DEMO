import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Users, 
  Shield, 
  Award, 
  Star,
  Mail,
  Linkedin,
  Lock,
  Briefcase,
  Menu, X, Search, Sun, Moon, ChevronDown, Eye, Zap,
  Building,
  Globe,
  Twitter
} from 'lucide-react';

const TeamPage3D: React.FC = () => {
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
      color: 0x00bfff, // Bright cyan
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
      color: 0x1e90ff, // Bright blue
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
      color: 0x00ffff, // Bright cyan
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
      color: 0x4169e1, // Royal blue
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
      color: 0x87ceeb, // Sky blue
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
      color: 0x20b2aa, // Light sea green
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
      color: 0x6495ed, // Cornflower blue
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

    // Cleanup
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

  const teamMembers = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      role: "Chief Executive Officer",
      department: "Executive Leadership",
      expertise: ["Strategic Planning", "Cybersecurity Policy", "Risk Management"],
      experience: "15+ years",
      education: "Ph.D. Computer Science, MIT",
      bio: "Leading cybersecurity expert with extensive experience in enterprise security architecture and regulatory compliance.",
      achievements: ["Forbes 40 Under 40", "CISO of the Year 2023", "Published 50+ Security Papers"],
      specialties: ["Zero Trust Architecture", "Compliance Frameworks", "Executive Advisory"]
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Chief Technology Officer",
      department: "Technology Leadership",
      expertise: ["Cloud Security", "AI/ML Security", "DevSecOps"],
      experience: "12+ years",
      education: "M.S. Cybersecurity, Stanford",
      bio: "Innovative technology leader specializing in next-generation security solutions and cloud infrastructure protection.",
      achievements: ["Patent Holder (5 Security Innovations)", "Speaker at RSA Conference", "AWS Security Hero"],
      specialties: ["Cloud Native Security", "Container Security", "Automated Threat Response"]
    },
    {
      id: 3,
      name: "Emily Johnson",
      role: "Chief Security Officer",
      department: "Security Operations",
      expertise: ["Incident Response", "Threat Intelligence", "Digital Forensics"],
      experience: "14+ years",
      education: "M.S. Information Security, Carnegie Mellon",
      bio: "Expert in cybersecurity operations with proven track record in managing complex security incidents and building resilient defense systems.",
      achievements: ["SANS Community Instructor", "Certified Incident Handler", "Led 500+ Incident Responses"],
      specialties: ["Advanced Persistent Threats", "Malware Analysis", "Security Architecture"]
    },
    {
      id: 4,
      name: "David Kim",
      role: "Director of Compliance",
      department: "Governance & Risk",
      expertise: ["Regulatory Compliance", "Risk Assessment", "Audit Management"],
      experience: "11+ years",
      education: "J.D. Cyber Law, Harvard Law School",
      bio: "Compliance expert ensuring organizations meet stringent regulatory requirements while maintaining operational efficiency.",
      achievements: ["Certified Data Protection Officer", "ISO 27001 Lead Auditor", "Published Compliance Framework"],
      specialties: ["GDPR Compliance", "SOX Compliance", "Privacy Engineering"]
    },
    {
      id: 5,
      name: "Lisa Park",
      role: "Senior Security Architect",
      department: "Security Engineering",
      expertise: ["Security Architecture", "Network Security", "Penetration Testing"],
      experience: "10+ years",
      education: "M.S. Computer Engineering, UC Berkeley",
      bio: "Security architect with deep expertise in designing and implementing enterprise-grade security solutions.",
      achievements: ["CISSP Certified", "CEH Master", "Designed Security for 100+ Organizations"],
      specialties: ["Network Segmentation", "Endpoint Security", "Security Automation"]
    },
    {
      id: 6,
      name: "Alex Thompson",
      role: "Lead Threat Hunter",
      department: "Threat Intelligence",
      expertise: ["Threat Hunting", "Behavioral Analytics", "SIEM Management"],
      experience: "9+ years",
      education: "B.S. Computer Science, Georgia Tech",
      bio: "Proactive threat hunter with expertise in identifying and neutralizing advanced persistent threats before they cause damage.",
      achievements: ["Discovered 20+ Zero-Day Threats", "GCTI Certified", "Threat Intelligence Platform Developer"],
      specialties: ["Advanced Threat Detection", "Threat Intelligence", "Security Analytics"]
    },
    {
      id: 7,
      name: "Rachel Adams",
      role: "Security Training Director",
      department: "Human Security",
      expertise: ["Security Awareness", "Phishing Simulation", "Behavioral Security"],
      experience: "8+ years",
      education: "M.A. Psychology, Columbia University",
      bio: "Expert in human-centered security, developing comprehensive training programs to build organizational security culture.",
      achievements: ["Reduced Security Incidents by 80%", "Certified Security Trainer", "Behavioral Security Researcher"],
      specialties: ["Social Engineering Defense", "Security Culture", "Training Program Design"]
    },
    {
      id: 8,
      name: "James Wilson",
      role: "Cloud Security Specialist",
      department: "Cloud Services",
      expertise: ["Multi-Cloud Security", "Container Security", "Serverless Security"],
      experience: "7+ years",
      education: "M.S. Cloud Computing, University of Washington",
      bio: "Cloud security specialist ensuring secure cloud adoption and migration strategies for enterprise clients.",
      achievements: ["Multi-Cloud Certified", "Kubernetes Security Expert", "Cloud Security Best Practices Author"],
      specialties: ["AWS Security", "Azure Security", "Google Cloud Security"]
    },
    {
      id: 9,
      name: "Nina Patel",
      role: "AI Security Researcher",
      department: "Research & Development",
      expertise: ["AI/ML Security", "Adversarial AI", "Automated Security"],
      experience: "6+ years",
      education: "Ph.D. Artificial Intelligence, Oxford University",
      bio: "AI security researcher developing next-generation security solutions powered by artificial intelligence and machine learning.",
      achievements: ["AI Security Patent Holder", "Published AI Security Research", "ML Security Framework Developer"],
      specialties: ["AI Threat Detection", "Machine Learning Security", "Automated Response Systems"]
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'
    }`}>
      {/* Three.js Background */}
      <div 
        ref={mountRef} 
        className="fixed inset-0 pointer-events-none z-0"
        style={{ background: 'transparent' }}
      />
      
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
                <img src="/RNR-WEB_DEMO/rnrlogo.png" alt="RNR Consulting" className="h-8 w-8" />
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
                  <Link to="/compliance" className={`block py-2 text-sm transition-colors ${
                    isDarkMode 
                      ? 'text-slate-300 hover:text-blue-400' 
                      : 'text-slate-700 hover:text-blue-600'
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

      {/* Content */}
      <div className="relative z-10 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="flex justify-center mb-8">
              <div className={`p-6 backdrop-blur-md border rounded-3xl shadow-lg ${
                isDarkMode 
                  ? 'bg-slate-800/90 border-slate-700' 
                  : 'bg-white/90 border-blue-200'
              }`}>
                <Users className={`h-16 w-16 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 bg-clip-text text-transparent">
              Our Expert Team
            </h1>
            <p className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-12 ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Meet our world-class cybersecurity professionals who bring decades of combined experience 
              in protecting organizations from evolving digital threats.
            </p>
            
            {/* Team Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className={`text-center p-6 backdrop-blur-sm rounded-2xl border shadow-lg ${
                isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white/80 border-blue-100'
              }`}>
                <div className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>9</div>
                <div className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Core Team Members</div>
              </div>
              <div className={`text-center p-6 backdrop-blur-sm rounded-2xl border shadow-lg ${
                isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white/80 border-blue-100'
              }`}>
                <div className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>100+</div>
                <div className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Years Combined Experience</div>
              </div>
              <div className={`text-center p-6 backdrop-blur-sm rounded-2xl border shadow-lg ${
                isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white/80 border-blue-100'
              }`}>
                <div className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>50+</div>
                <div className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Industry Certifications</div>
              </div>
              <div className={`text-center p-6 backdrop-blur-sm rounded-2xl border shadow-lg ${
                isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white/80 border-blue-100'
              }`}>
                <div className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>1000+</div>
                <div className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Clients Protected</div>
              </div>
            </div>
          </div>

          {/* Team Grid */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-20">
            {teamMembers.map((member, index) => (
              <div 
                key={member.id} 
                className={`group backdrop-blur-md border rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] ${
                  isDarkMode ? 'bg-slate-800/90 border-slate-700' : 'bg-white/90 border-blue-200'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Profile Header */}
                <div className="relative h-48 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-12 w-12 text-white" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                      {member.department}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                      {member.experience}
                    </div>
                  </div>
                </div>

                {/* Profile Content */}
                <div className="p-6">
                  {/* Name and Role */}
                  <div className="text-center mb-6">
                    <h3 className={`text-2xl font-bold mb-2 transition-colors ${
                      isDarkMode 
                        ? 'text-slate-200 group-hover:text-blue-400' 
                        : 'text-slate-800 group-hover:text-blue-700'
                    }`}>
                      {member.name}
                    </h3>
                    <p className={`font-semibold text-lg mb-1 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{member.role}</p>
                    <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{member.education}</p>
                  </div>

                  {/* Bio */}
                  <p className={`mb-4 text-sm leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {member.bio}
                  </p>

                  {/* Expertise Tags */}
                  <div className="mb-4">
                    <h4 className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Core Expertise</h4>
                    <div className="flex flex-wrap gap-1">
                      {member.expertise.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            isDarkMode
                              ? 'bg-slate-700 text-blue-400'
                              : 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800'
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="mb-4">
                    <h4 className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Specialties</h4>
                    <div className="flex flex-wrap gap-1">
                      {member.specialties.map((specialty, specIndex) => (
                        <span
                          key={specIndex}
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            isDarkMode
                              ? 'bg-slate-600 text-indigo-400'
                              : 'bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800'
                          }`}
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="mb-6">
                    <h4 className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Key Achievements</h4>
                    <div className="space-y-1">
                      {member.achievements.map((achievement, achIndex) => (
                        <div key={achIndex} className="flex items-center space-x-2">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className={`text-xs ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className={`flex justify-center space-x-4 pt-4 border-t ${
                    isDarkMode ? 'border-slate-600' : 'border-slate-200'
                  }`}>
                    <button className={`p-2 rounded-lg transition-colors ${
                      isDarkMode 
                        ? 'bg-slate-700 hover:bg-slate-600 text-blue-400' 
                        : 'bg-blue-50 hover:bg-blue-100 text-blue-600'
                    }`}>
                      <Mail className="h-4 w-4" />
                    </button>
                    <button className={`p-2 rounded-lg transition-colors ${
                      isDarkMode 
                        ? 'bg-slate-700 hover:bg-slate-600 text-blue-400' 
                        : 'bg-blue-50 hover:bg-blue-100 text-blue-600'
                    }`}>
                      <Linkedin className="h-4 w-4" />
                    </button>
                    <button className={`p-2 rounded-lg transition-colors ${
                      isDarkMode 
                        ? 'bg-slate-700 hover:bg-slate-600 text-blue-400' 
                        : 'bg-blue-50 hover:bg-blue-100 text-blue-600'
                    }`}>
                      <Twitter className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Team Departments */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>Organizational Structure</h2>
              <p className={`text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Our team is organized into specialized departments for maximum efficiency</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Executive Leadership",
                  icon: <Building className="h-8 w-8" />,
                  description: "Strategic direction and organizational vision",
                  members: ["Dr. Sarah Chen", "Marcus Rodriguez"]
                },
                {
                  name: "Security Operations",
                  icon: <Shield className="h-8 w-8" />,
                  description: "24/7 security monitoring and incident response",
                  members: ["Emily Johnson", "Alex Thompson"]
                },
                {
                  name: "Governance & Risk",
                  icon: <Award className="h-8 w-8" />,
                  description: "Compliance and risk management",
                  members: ["David Kim"]
                },
                {
                  name: "Security Engineering",
                  icon: <Lock className="h-8 w-8" />,
                  description: "Security architecture and implementation",
                  members: ["Lisa Park"]
                },
                {
                  name: "Human Security",
                  icon: <Users className="h-8 w-8" />,
                  description: "Security awareness and training",
                  members: ["Rachel Adams"]
                },
                {
                  name: "Cloud & AI Security",
                  icon: <Globe className="h-8 w-8" />,
                  description: "Next-generation security solutions",
                  members: ["James Wilson", "Nina Patel"]
                }
              ].map((dept, index) => (
                <div
                  key={index}
                  className={`backdrop-blur-md border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group ${
                    isDarkMode ? 'bg-slate-800/90 border-slate-700' : 'bg-white/90 border-blue-200'
                  }`}
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`p-3 rounded-xl transition-colors ${
                      isDarkMode 
                        ? 'bg-slate-700 text-blue-400 group-hover:bg-slate-600' 
                        : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'
                    }`}>
                      {dept.icon}
                    </div>
                    <div>
                      <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{dept.name}</h3>
                      <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{dept.description}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {dept.members.map((member, memberIndex) => (
                      <div key={memberIndex} className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-blue-400' : 'bg-blue-500'}`}></div>
                        <span className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{member}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className={`border-2 rounded-3xl p-12 text-center shadow-2xl ${
            isDarkMode ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-blue-100'
          }`}>
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-center mb-8">
                <div className={`p-6 rounded-3xl shadow-lg border ${
                  isDarkMode 
                    ? 'bg-slate-700 border-slate-600' 
                    : 'bg-blue-50 border-blue-100'
                }`}>
                  <Briefcase className={`h-12 w-12 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
              </div>
              
              <h3 className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                Ready to Work with Our Team?
              </h3>
              <p className={`text-xl mb-8 leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Our experts are ready to help secure your organization. Get in touch to discuss 
                your cybersecurity needs and learn how we can protect your digital assets.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/contact"
                  className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 shadow-lg hover:shadow-xl text-center"
                >
                  Schedule Consultation
                </Link>
                <Link 
                  to="/compliance"
                  className={`border-2 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl text-center ${
                    isDarkMode 
                      ? 'bg-slate-700/50 border-slate-600 text-slate-200 hover:bg-slate-600/50' 
                      : 'bg-white border-blue-200 text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  View Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPage3D;
