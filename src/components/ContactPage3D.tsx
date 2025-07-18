import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';
import { Link } from 'react-router-dom';
import { 
  Mail, Phone, MapPin, Shield, Send, 
  Menu, X, Search, Sun, Moon, ChevronDown,
  Users, Award, Lock, Eye, Zap
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ContactPage3D: React.FC = () => {
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

    // White and blue themed particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);
    
    for(let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 15;
      posArray[i + 1] = (Math.random() - 0.5) * 15;
      posArray[i + 2] = (Math.random() - 0.5) * 15;
      
      // Mix of white and blue particles
      const isBlue = Math.random() > 0.6;
      colorArray[i] = isBlue ? 0.23 : 1;     // R
      colorArray[i + 1] = isBlue ? 0.51 : 1; // G
      colorArray[i + 2] = isBlue ? 0.96 : 1; // B
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      transparent: true,
      opacity: 0.8,
      vertexColors: true
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Add elegant wireframe geometries in white/blue
    const geometries = [
      new THREE.IcosahedronGeometry(1.5, 0),
      new THREE.OctahedronGeometry(1.2),
      new THREE.TetrahedronGeometry(1.0)
    ];

    const meshes: THREE.Mesh[] = [];
    
    geometries.forEach((geometry, index) => {
      const material = new THREE.MeshBasicMaterial({ 
        color: index === 0 ? 0x3b82f6 : index === 1 ? 0xffffff : 0x6366f1,
        wireframe: true,
        transparent: true,
        opacity: 0.3
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (index - 1) * 4,
        Math.sin(index) * 2,
        -3
      );
      scene.add(mesh);
      meshes.push(mesh);
    });

    camera.position.z = 8;

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.3;

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      meshes.forEach((mesh, index) => {
        mesh.rotation.x += 0.003 + index * 0.001;
        mesh.rotation.y += 0.003 + index * 0.001;
        mesh.position.y = Math.sin(Date.now() * 0.001 + index) * 0.3;
      });
      
      particlesMesh.rotation.x += 0.0003;
      particlesMesh.rotation.y += 0.0003;
      
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

        {/* Main Content */}
        <div className="pt-24 pb-12 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center mb-8">
                <div className={`p-6 backdrop-blur-md border rounded-3xl shadow-lg ${
                  isDarkMode 
                    ? 'bg-slate-800/90 border-slate-700' 
                    : 'bg-white/90 border-blue-200'
                }`}>
                  <Shield className={`h-16 w-16 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
              </div>
              <h1 className={`text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r bg-clip-text text-transparent leading-tight ${
                isDarkMode 
                  ? 'from-blue-400 via-blue-300 to-indigo-300' 
                  : 'from-blue-600 via-blue-700 to-indigo-700'
              }`}>
                Connect Securely
              </h1>
              <p className={`text-2xl md:text-3xl mb-12 leading-relaxed max-w-4xl mx-auto ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Your cybersecurity experts are ready to fortify your digital infrastructure. 
                Let's build an impenetrable defense together.
              </p>
            </div>

            {/* Contact Grid */}
            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              {/* Contact Information */}
              <div className="space-y-8">
                <div className={`backdrop-blur-md border rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-slate-800/90 border-slate-700' 
                    : 'bg-white/90 border-blue-200'
                }`}>
                  <h2 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>Get In Touch</h2>
                  <div className="space-y-6">
                    {[
                      {
                        icon: <Mail className="h-8 w-8" />,
                        title: "Email Security",
                        primary: "security@rnrconsulting.com",
                        secondary: "Response within 2 hours"
                      },
                      {
                        icon: <Phone className="h-8 w-8" />,
                        title: "Emergency Hotline",
                        primary: "+1 (555) 123-SECURE",
                        secondary: "24/7 Incident Response"
                      },
                      {
                        icon: <MapPin className="h-8 w-8" />,
                        title: "SOC Headquarters",
                        primary: "123 Cyber Defense Blvd",
                        secondary: "Tech City, TC 12345"
                      }
                    ].map((contact, index) => (
                      <div
                        key={index}
                        className={`flex items-start space-x-4 p-4 rounded-2xl transition-all duration-300 ${
                          isDarkMode 
                            ? 'bg-slate-700/50 hover:bg-slate-700/70' 
                            : 'bg-blue-50/50 hover:bg-blue-50'
                        }`}
                      >
                        <div className={`p-3 rounded-xl ${
                          isDarkMode 
                            ? 'bg-slate-600 text-blue-400' 
                            : 'bg-blue-100 text-blue-600'
                        }`}>
                          {contact.icon}
                        </div>
                        <div>
                          <h3 className={`text-xl font-semibold mb-1 ${
                            isDarkMode ? 'text-slate-200' : 'text-slate-800'
                          }`}>
                            {contact.title}
                          </h3>
                          <p className={`font-medium mb-1 ${
                            isDarkMode ? 'text-blue-400' : 'text-blue-700'
                          }`}>{contact.primary}</p>
                          <p className={`text-sm ${
                            isDarkMode ? 'text-slate-400' : 'text-slate-600'
                          }`}>{contact.secondary}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className={`backdrop-blur-md border rounded-3xl p-8 shadow-lg ${
                isDarkMode 
                  ? 'bg-slate-800/90 border-slate-700' 
                  : 'bg-white/90 border-blue-200'
              }`}>
                <h2 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>Send Secure Message</h2>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? 'text-slate-300' : 'text-slate-700'
                      }`}>Full Name</label>
                      <input
                        type="text"
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-400/20 outline-none transition-all ${
                          isDarkMode 
                            ? 'bg-slate-700 border-slate-600 text-slate-200 focus:border-blue-400' 
                            : 'bg-white border-blue-200 text-slate-800 focus:border-blue-400'
                        }`}
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? 'text-slate-300' : 'text-slate-700'
                      }`}>Email Address</label>
                      <input
                        type="email"
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-400/20 outline-none transition-all ${
                          isDarkMode 
                            ? 'bg-slate-700 border-slate-600 text-slate-200 focus:border-blue-400' 
                            : 'bg-white border-blue-200 text-slate-800 focus:border-blue-400'
                        }`}
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>Company</label>
                    <input
                      type="text"
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-400/20 outline-none transition-all ${
                        isDarkMode 
                          ? 'bg-slate-700 border-slate-600 text-slate-200 focus:border-blue-400' 
                          : 'bg-white border-blue-200 text-slate-800 focus:border-blue-400'
                      }`}
                      placeholder="Your Company Name"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>Security Priority</label>
                    <select className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-400/20 outline-none transition-all ${
                      isDarkMode 
                        ? 'bg-slate-700 border-slate-600 text-slate-200 focus:border-blue-400' 
                        : 'bg-white border-blue-200 text-slate-800 focus:border-blue-400'
                    }`}>
                      <option>Critical - Immediate Response</option>
                      <option>High - Within 24 Hours</option>
                      <option>Medium - Within 48 Hours</option>
                      <option>Low - General Inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>Message</label>
                    <textarea
                      rows={6}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-400/20 outline-none transition-all resize-none ${
                        isDarkMode 
                          ? 'bg-slate-700 border-slate-600 text-slate-200 focus:border-blue-400' 
                          : 'bg-white border-blue-200 text-slate-800 focus:border-blue-400'
                      }`}
                      placeholder="Describe your security requirements, current challenges, or questions about our services..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className={`w-full bg-gradient-to-r px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 ${
                      isDarkMode 
                        ? 'from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-blue-600/25' 
                        : 'from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-blue-500/25'
                    }`}
                  >
                    <Send className="h-5 w-5" />
                    <span>Send Secure Message</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Security Notice */}
            <div className={`backdrop-blur-md border rounded-3xl p-8 shadow-lg text-center ${
              isDarkMode 
                ? 'bg-slate-800/90 border-slate-700' 
                : 'bg-white/90 border-blue-200'
            }`}>
              <div className="flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-green-500 mr-2" />
                <span className="text-green-500 font-semibold">Secure Communication</span>
              </div>
              <p className={`text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                All communications are encrypted with military-grade security protocols. 
                Your data is protected by our advanced cybersecurity infrastructure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage3D;
