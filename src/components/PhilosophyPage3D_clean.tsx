import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';
import { Shield, Users, Target, Eye, Heart, Award, ArrowLeft, Lightbulb, CheckCircle, Globe, Zap, Star, Lock, Search, ChevronDown } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const PhilosophyPage3D: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [isServicesOpen, setIsServicesOpen] = useState(false);
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

    // Professional philosophy-themed particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);
    const velocityArray = new Float32Array(particleCount * 3);
    
    for(let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 30;
      posArray[i + 1] = (Math.random() - 0.5) * 30;
      posArray[i + 2] = (Math.random() - 0.5) * 30;
      
      // Add gentle velocity for floating animation
      velocityArray[i] = (Math.random() - 0.5) * 0.015;
      velocityArray[i + 1] = (Math.random() - 0.5) * 0.015;
      velocityArray[i + 2] = (Math.random() - 0.5) * 0.015;
      
      // Mix of blue and white particles for philosophy theme
      const rand = Math.random();
      if (rand > 0.5) {
        // Blue for trust and reliability
        colorArray[i] = 0.3;      // R
        colorArray[i + 1] = 0.6;  // G
        colorArray[i + 2] = 1.0;  // B
      } else {
        // White for purity and clarity
        colorArray[i] = 0.9;      // R
        colorArray[i + 1] = 0.9;  // G
        colorArray[i + 2] = 1.0;  // B
      }
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.015,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Create floating spheres representing our philosophy pillars
    const spheres: THREE.Mesh[] = [];
    const sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x4299e1,
      transparent: true,
      opacity: 0.7,
      wireframe: true
    });

    for (let i = 0; i < 8; i++) {
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      spheres.push(sphere);
      scene.add(sphere);
    }

    // Create connecting lines between philosophy concepts
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = [];
    
    for (let i = 0; i < 50; i++) {
      const start = new THREE.Vector3(
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 25
      );
      const end = new THREE.Vector3(
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 25
      );
      
      linePositions.push(start.x, start.y, start.z);
      linePositions.push(end.x, end.y, end.z);
    }
    
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.3
    });
    
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Create philosophy value shapes - only blue components
    const valueShapes: THREE.Mesh[] = [];
    const shapes = [
      { geo: new THREE.TetrahedronGeometry(0.5), color: 0x3b82f6 }, // Excellence - Blue
      { geo: new THREE.IcosahedronGeometry(0.4), color: 0x1e40af }, // Trust - Dark Blue
    ];

    shapes.forEach((shape, index) => {
      const material = new THREE.MeshBasicMaterial({
        color: shape.color,
        transparent: true,
        opacity: 0.6,
        wireframe: true
      });
      
      const mesh = new THREE.Mesh(shape.geo, material);
      mesh.position.set(
        Math.cos(index * Math.PI) * 8,
        Math.sin(index * Math.PI) * 8,
        (Math.random() - 0.5) * 10
      );
      
      valueShapes.push(mesh);
      scene.add(mesh);
    });

    camera.position.z = 15;
    camera.position.y = 2;

    // Add OrbitControls for subtle camera movement
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minPolarAngle = Math.PI / 3;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    // Animation loop
    let time = 0;
    const animate = () => {
      time += 0.01;
      
      // Animate particles with philosophy-inspired motion
      const positions = particlesGeometry.attributes.position.array as Float32Array;
      const colors = particlesGeometry.attributes.color.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Gentle floating motion with wisdom-like flow
        positions[i3] += velocityArray[i3] * Math.sin(time * 0.5 + i * 0.01);
        positions[i3 + 1] += velocityArray[i3 + 1] * Math.cos(time * 0.3 + i * 0.015);
        positions[i3 + 2] += velocityArray[i3 + 2] * Math.sin(time * 0.4 + i * 0.012);
        
        // Boundary wrapping for continuous flow
        if (positions[i3] > 15) positions[i3] = -15;
        if (positions[i3] < -15) positions[i3] = 15;
        if (positions[i3 + 1] > 15) positions[i3 + 1] = -15;
        if (positions[i3 + 1] < -15) positions[i3 + 1] = 15;
        if (positions[i3 + 2] > 15) positions[i3 + 2] = -15;
        if (positions[i3 + 2] < -15) positions[i3 + 2] = 15;
        
        // Subtle color pulsing for philosophy theme
        const pulse = Math.sin(time * 2 + i * 0.02) * 0.2 + 0.8;
        colors[i3] *= pulse;
        colors[i3 + 1] *= pulse;
        colors[i3 + 2] *= pulse;
      }
      
      particlesGeometry.attributes.position.needsUpdate = true;
      particlesGeometry.attributes.color.needsUpdate = true;
      
      // Animate floating spheres
      spheres.forEach((sphere, index) => {
        sphere.rotation.x += 0.005;
        sphere.rotation.y += 0.008;
        sphere.position.y += Math.sin(time * 0.8 + index) * 0.02;
        
        // Subtle opacity pulsing
        const material = sphere.material as THREE.MeshBasicMaterial;
        material.opacity = 0.5 + Math.sin(time * 1.5 + index * 0.5) * 0.3;
      });
      
      // Animate value shapes
      valueShapes.forEach((shape, index) => {
        shape.rotation.x += 0.01;
        shape.rotation.y += 0.015;
        shape.rotation.z += 0.005;
        
        // Orbital motion around philosophical concepts - adjusted for 2 shapes
        const radius = 8;
        const angle = time * 0.3 + index * Math.PI;
        shape.position.x = Math.cos(angle) * radius;
        shape.position.z = Math.sin(angle) * radius;
        shape.position.y = Math.sin(time * 0.5 + index) * 2;
      });
      
      // Animate connecting lines
      lines.rotation.y += 0.002;
      lines.rotation.x += 0.001;
      
      // Update line opacity for breathing effect
      const lineMat = lines.material as THREE.LineBasicMaterial;
      lineMat.opacity = 0.2 + Math.sin(time * 0.8) * 0.1;
      
      controls.update();
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
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
    <div className={`min-h-screen relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'
    }`}>
      {/* Three.js Background */}
      <div 
        ref={mountRef} 
        className="fixed inset-0 pointer-events-none z-0"
        style={{ background: 'transparent' }}
      />
      
      {/* Navigation */}
      <nav className={`relative z-10 backdrop-blur-md border-b shadow-sm ${
        isDarkMode 
          ? 'bg-slate-800/80 border-slate-700' 
          : 'bg-white/80 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <Shield className="h-10 w-10 text-blue-600" />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                  RNR Consulting
                </span>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className={`transition-colors font-medium ${
                isDarkMode ? 'text-slate-300 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600'
              }`}>
                Home
              </Link>
              <div className="relative">
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className={`flex items-center space-x-1 transition-colors font-medium ${
                    isDarkMode ? 'text-slate-300 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  <span>Services</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {isServicesOpen && (
                  <div className={`absolute top-full mt-2 w-48 rounded-xl shadow-xl border py-2 z-50 ${
                    isDarkMode 
                      ? 'bg-slate-800 border-slate-700' 
                      : 'bg-white border-slate-200'
                  }`}>
                    <Link to="/compliance" className={`block px-4 py-2 transition-colors ${
                      isDarkMode 
                        ? 'text-slate-300 hover:bg-slate-700 hover:text-blue-400' 
                        : 'text-slate-600 hover:bg-slate-100 hover:text-blue-600'
                    }`}>
                      Compliance
                    </Link>
                    <Link to="/contact" className={`block px-4 py-2 transition-colors ${
                      isDarkMode 
                        ? 'text-slate-300 hover:bg-slate-700 hover:text-blue-400' 
                        : 'text-slate-600 hover:bg-slate-100 hover:text-blue-600'
                    }`}>
                      Contact
                    </Link>
                  </div>
                )}
              </div>
              <Link to="/philosophy" className={`font-semibold ${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              }`}>
                Philosophy
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className={`p-2 transition-colors ${
                isDarkMode ? 'text-slate-400 hover:text-blue-400' : 'text-slate-500 hover:text-blue-600'
              }`}>
                <Search className="h-5 w-5" />
              </button>
              <Link 
                to="/contact" 
                className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="space-y-16">
            {/* Header */}
            <div className="text-center">
              <Link 
                to="/" 
                className={`inline-flex items-center space-x-2 transition-colors mb-8 group ${
                  isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                }`}
              >
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Back to Home</span>
              </Link>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 bg-clip-text text-transparent">
                Our Philosophy
              </h1>
              <p className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Guided by principles of integrity, excellence, and innovation, we shape the future of cybersecurity 
                through values-driven solutions that protect what matters most.
              </p>
            </div>

            {/* Philosophy Pillars */}
            <div className={`backdrop-blur-md border rounded-3xl p-12 shadow-lg ${
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
                        : 'bg-gradient-to-br from-white to-blue-50 border-blue-200'
                    }`}>
                      <div className={`p-4 bg-gradient-to-r ${pillar.color} rounded-2xl w-fit mb-6 text-white shadow-lg`}>
                        {pillar.icon}
                      </div>
                      <h3 className={`text-2xl font-bold mb-4 transition-colors ${
                        isDarkMode 
                          ? 'text-slate-200 group-hover:text-blue-400' 
                          : 'text-slate-800 group-hover:text-blue-600'
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
            <div className={`backdrop-blur-md border rounded-3xl p-12 shadow-lg ${
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
