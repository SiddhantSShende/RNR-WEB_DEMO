import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Calendar, 
  Clock, 
  User, 
  ChevronRight, 
  Search, 
  Filter, 
  BookOpen,
  TrendingUp,
  Shield,
  Eye,
  Zap,
  Award,
  Globe,
  ChevronDown,
  Heart,
  ArrowLeft,
  MessageCircle,
  Mail,
  ExternalLink,
  Bookmark
} from 'lucide-react';

const NewsPage3D: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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

    // Enhanced particles system for news/blog theme
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 800;
    
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);
    const velocityArray = new Float32Array(particleCount * 3);
    
    for(let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 40;
      posArray[i + 1] = (Math.random() - 0.5) * 40;
      posArray[i + 2] = (Math.random() - 0.5) * 40;
      
      velocityArray[i] = (Math.random() - 0.5) * 0.01;
      velocityArray[i + 1] = (Math.random() - 0.5) * 0.01;
      velocityArray[i + 2] = (Math.random() - 0.5) * 0.01;
      
      // Blue and white particles for professional look
      const rand = Math.random();
      if (rand > 0.6) {
        // Bright blue
        colorArray[i] = 0.2;
        colorArray[i + 1] = 0.6;
        colorArray[i + 2] = 1.0;
      } else if (rand > 0.3) {
        // Light blue
        colorArray[i] = 0.4;
        colorArray[i + 1] = 0.8;
        colorArray[i + 2] = 1.0;
      } else {
        // White
        colorArray[i] = 0.9;
        colorArray[i + 1] = 0.95;
        colorArray[i + 2] = 1.0;
      }
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Floating geometric shapes for news/blog theme
    const geometricElements: THREE.Mesh[] = [];
    
    // News article representation - floating rectangles
    for (let i = 0; i < 8; i++) {
      const geometry = new THREE.BoxGeometry(2, 0.1, 3);
      const material = new THREE.MeshBasicMaterial({
        color: 0x3b82f6,
        transparent: true,
        opacity: 0.6,
        wireframe: true
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 25
      );
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      mesh.rotation.z = Math.random() * Math.PI;
      
      geometricElements.push(mesh);
      scene.add(mesh);
    }

    // Data flow lines - representing information streams
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = [];
    
    for (let i = 0; i < 30; i++) {
      const start = new THREE.Vector3(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30
      );
      const end = new THREE.Vector3(
        start.x + (Math.random() - 0.5) * 10,
        start.y + (Math.random() - 0.5) * 10,
        start.z + (Math.random() - 0.5) * 10
      );
      
      linePositions.push(start.x, start.y, start.z);
      linePositions.push(end.x, end.y, end.z);
    }
    
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.4
    });
    
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Floating spheres for accent
    for (let i = 0; i < 5; i++) {
      const geometry = new THREE.SphereGeometry(0.3, 16, 16);
      const material = new THREE.MeshBasicMaterial({
        color: 0x1e40af,
        transparent: true,
        opacity: 0.7,
        wireframe: true
      });
      
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      
      geometricElements.push(sphere);
      scene.add(sphere);
    }

    camera.position.z = 20;
    camera.position.y = 5;

    // Camera controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.3;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minPolarAngle = Math.PI / 4;

    // Animation loop
    let time = 0;
    const animate = () => {
      time += 0.01;
      
      // Animate particles
      const positions = particlesGeometry.attributes.position.array as Float32Array;
      const colors = particlesGeometry.attributes.color.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        positions[i3] += velocityArray[i3] * Math.sin(time * 0.5 + i * 0.01);
        positions[i3 + 1] += velocityArray[i3 + 1] * Math.cos(time * 0.3 + i * 0.015);
        positions[i3 + 2] += velocityArray[i3 + 2] * Math.sin(time * 0.4 + i * 0.012);
        
        // Boundary wrapping
        if (positions[i3] > 20) positions[i3] = -20;
        if (positions[i3] < -20) positions[i3] = 20;
        if (positions[i3 + 1] > 20) positions[i3 + 1] = -20;
        if (positions[i3 + 1] < -20) positions[i3 + 1] = 20;
        if (positions[i3 + 2] > 20) positions[i3 + 2] = -20;
        if (positions[i3 + 2] < -20) positions[i3 + 2] = 20;
        
        // Color pulsing
        const pulse = Math.sin(time * 1.5 + i * 0.02) * 0.2 + 0.8;
        colors[i3] *= pulse;
        colors[i3 + 1] *= pulse;
        colors[i3 + 2] *= pulse;
      }
      
      particlesGeometry.attributes.position.needsUpdate = true;
      particlesGeometry.attributes.color.needsUpdate = true;
      
      // Animate geometric elements
      geometricElements.forEach((element, index) => {
        element.rotation.x += 0.005;
        element.rotation.y += 0.008;
        element.rotation.z += 0.003;
        
        // Floating motion
        element.position.y += Math.sin(time * 0.8 + index) * 0.02;
        
        // Opacity pulsing
        const material = element.material as THREE.MeshBasicMaterial;
        material.opacity = 0.5 + Math.sin(time * 1.2 + index * 0.5) * 0.2;
      });
      
      // Animate lines
      lines.rotation.y += 0.002;
      lines.rotation.x += 0.001;
      
      const lineMat = lines.material as THREE.LineBasicMaterial;
      lineMat.opacity = 0.3 + Math.sin(time * 0.8) * 0.1;
      
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

  const categories = [
    { id: 'all', name: 'All Posts', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'cybersecurity', name: 'Cybersecurity', icon: <Shield className="h-4 w-4" /> },
    { id: 'threat-intelligence', name: 'Threat Intelligence', icon: <Eye className="h-4 w-4" /> },
    { id: 'incident-response', name: 'Incident Response', icon: <Zap className="h-4 w-4" /> },
    { id: 'compliance', name: 'Compliance', icon: <Award className="h-4 w-4" /> },
    { id: 'industry-news', name: 'Industry News', icon: <Globe className="h-4 w-4" /> }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "The Future of AI-Powered Threat Detection",
      excerpt: "Exploring how artificial intelligence is revolutionizing cybersecurity threat detection and response mechanisms in 2025.",
      content: "Artificial intelligence has become the cornerstone of modern cybersecurity defense strategies. As threats become more sophisticated, AI-powered systems are proving essential for detecting and responding to attacks in real-time.",
      category: 'cybersecurity',
      author: 'Dr. Sarah Chen',
      date: '2025-01-15',
      readTime: '8 min read',
      tags: ['AI', 'Threat Detection', 'Machine Learning'],
      image: '/api/placeholder/400/250',
      featured: true,
      likes: 142,
      comments: 28
    },
    {
      id: 2,
      title: "Zero Trust Architecture: A Complete Implementation Guide",
      excerpt: "Learn how to implement Zero Trust security architecture in your organization with our comprehensive step-by-step guide.",
      content: "Zero Trust security model operates on the principle of 'never trust, always verify' - a fundamental shift from traditional network security approaches.",
      category: 'cybersecurity',
      author: 'Marcus Rodriguez',
      date: '2025-01-12',
      readTime: '12 min read',
      tags: ['Zero Trust', 'Network Security', 'Implementation'],
      image: '/api/placeholder/400/250',
      featured: false,
      likes: 98,
      comments: 15
    },
    {
      id: 3,
      title: "Ransomware Trends: What to Expect in 2025",
      excerpt: "An in-depth analysis of emerging ransomware tactics and how organizations can prepare for the evolving threat landscape.",
      content: "Ransomware attacks continue to evolve, with cybercriminals adopting new tactics and targeting previously secure sectors.",
      category: 'threat-intelligence',
      author: 'Emily Johnson',
      date: '2025-01-10',
      readTime: '10 min read',
      tags: ['Ransomware', 'Threats', '2025 Predictions'],
      image: '/api/placeholder/400/250',
      featured: true,
      likes: 76,
      comments: 22
    },
    {
      id: 4,
      title: "GDPR Compliance: Essential Updates for 2025",
      excerpt: "Navigate the latest GDPR requirements and ensure your organization remains compliant with updated regulations.",
      content: "The General Data Protection Regulation continues to evolve, with new guidelines and enforcement mechanisms introduced in 2025.",
      category: 'compliance',
      author: 'David Kim',
      date: '2025-01-08',
      readTime: '6 min read',
      tags: ['GDPR', 'Compliance', 'Data Protection'],
      image: '/api/placeholder/400/250',
      featured: false,
      likes: 54,
      comments: 12
    },
    {
      id: 5,
      title: "Building an Effective Incident Response Team",
      excerpt: "Best practices for assembling and training a cybersecurity incident response team that can handle any crisis.",
      content: "A well-prepared incident response team is crucial for minimizing damage and recovering quickly from security incidents.",
      category: 'incident-response',
      author: 'Lisa Park',
      date: '2025-01-05',
      readTime: '9 min read',
      tags: ['Incident Response', 'Team Building', 'Best Practices'],
      image: '/api/placeholder/400/250',
      featured: false,
      likes: 87,
      comments: 19
    },
    {
      id: 6,
      title: "Global Cybersecurity Spending Reaches New Heights",
      excerpt: "Industry report reveals record-breaking cybersecurity investments as organizations prioritize digital protection.",
      content: "Organizations worldwide are increasing their cybersecurity budgets significantly, reflecting the growing importance of digital security.",
      category: 'industry-news',
      author: 'Tech News Team',
      date: '2025-01-03',
      readTime: '5 min read',
      tags: ['Industry News', 'Spending', 'Market Trends'],
      image: '/api/placeholder/400/250',
      featured: false,
      likes: 32,
      comments: 8
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${
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
      
      {/* Navigation */}
      <nav className="fixed top-4 left-4 right-4 z-20">
        <div className="flex justify-between items-center">
          <button
            onClick={() => window.history.back()}
            className={`flex items-center space-x-2 backdrop-blur-md border px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl group ${
              isDarkMode 
                ? 'bg-slate-800/90 border-slate-700 text-blue-400 hover:bg-slate-700/90 hover:border-slate-600' 
                : 'bg-white/90 border-blue-200 text-blue-700 hover:bg-white hover:border-blue-300'
            }`}
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to Home</span>
          </button>
          
          <div className={`flex items-center space-x-3 backdrop-blur-md border rounded-xl px-4 py-2 shadow-lg ${
            isDarkMode 
              ? 'bg-slate-800/90 border-slate-700' 
              : 'bg-white/90 border-blue-200'
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

      {/* Content */}
      <div className="relative z-10 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="flex justify-center mb-8">
              <div className="p-6 bg-white/90 backdrop-blur-md border border-blue-200 rounded-3xl shadow-lg">
                <BookOpen className="h-16 w-16 text-blue-600" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 bg-clip-text text-transparent">
              News & Insights
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-12">
              Stay informed with the latest cybersecurity trends, threat intelligence, and industry insights 
              from our team of security experts.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-100 shadow-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-sm text-slate-600 font-medium">Expert Articles</div>
              </div>
              <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-100 shadow-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
                <div className="text-sm text-slate-600 font-medium">Monthly Readers</div>
              </div>
              <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-100 shadow-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">Daily</div>
                <div className="text-sm text-slate-600 font-medium">Updates</div>
              </div>
            </div>
          </div>

          {/* Categories Filter Section */}
          <div className="mb-16">
            <div className="bg-white/90 backdrop-blur-md border border-blue-200 rounded-2xl p-8 shadow-lg">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Browse by Category</h2>
                <p className="text-slate-600">Select a category to filter articles</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex flex-col items-center space-y-3 p-6 rounded-xl transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg scale-105'
                        : 'bg-blue-50 text-slate-700 hover:bg-blue-100 hover:scale-105'
                    }`}
                  >
                    <div className={`p-3 rounded-xl ${
                      selectedCategory === category.id 
                        ? 'bg-white/20' 
                        : 'bg-white shadow-sm'
                    }`}>
                      {React.cloneElement(category.icon, {
                        className: selectedCategory === category.id 
                          ? 'h-6 w-6 text-white' 
                          : 'h-6 w-6 text-blue-600'
                      })}
                    </div>
                    <span className="text-sm font-medium text-center">{category.name}</span>
                  </button>
                ))}
              </div>
              
              {selectedCategory !== 'all' && (
                <div className="text-center mt-6">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium"
                  >
                    Clear Filter
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-16">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search articles, topics, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/90 backdrop-blur-md border border-blue-200 rounded-2xl focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all shadow-lg text-lg"
                />
              </div>
            </div>
          </div>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <div className="mb-20">
              <div className="flex items-center space-x-3 mb-8">
                <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800">Featured Articles</h2>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {featuredPosts.map((post) => (
                  <div key={post.id} className="group bg-white/90 backdrop-blur-md border border-blue-200 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                    <div className="relative">
                      <div className="h-64 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                        <BookOpen className="h-20 w-20 text-white opacity-30" />
                      </div>
                      <div className="absolute top-6 left-6">
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                          ⭐ Featured
                        </span>
                      </div>
                      <div className="absolute bottom-6 right-6">
                        <div className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                          {categories.find(c => c.id === post.category)?.name}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-8">
                      {/* Date and Time Row */}
                      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2 text-slate-500">
                            <Calendar className="h-5 w-5" />
                            <span className="font-medium">{new Date(post.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-slate-500">
                            <Clock className="h-5 w-5" />
                            <span className="font-medium">{post.readTime}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-slate-500">
                          <div className="flex items-center space-x-2 hover:text-red-500 transition-colors cursor-pointer">
                            <Heart className="h-5 w-5" />
                            <span className="font-medium">{post.likes}</span>
                          </div>
                          <div className="flex items-center space-x-2 hover:text-blue-500 transition-colors cursor-pointer">
                            <MessageCircle className="h-5 w-5" />
                            <span className="font-medium">{post.comments}</span>
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-blue-700 transition-colors leading-tight">
                        {post.title}
                      </h3>
                      
                      <p className="text-slate-600 mb-6 leading-relaxed text-lg">
                        {post.excerpt}
                      </p>
                      
                      {/* Author and Tags Row */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                            <User className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <span className="text-sm font-bold text-slate-800">{post.author}</span>
                            <p className="text-xs text-slate-500">Security Expert</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 2).map((tag, index) => (
                            <span
                              key={index}
                              className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium hover:from-blue-200 hover:to-indigo-200 transition-all cursor-pointer"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 px-6 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl group">
                        <span>Read Full Article</span>
                        <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Posts */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-slate-800">Latest Articles</h2>
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                Showing {filteredPosts.length} of {blogPosts.length} articles
              </div>
            </div>
            
            {filteredPosts.length === 0 ? (
              <div className="text-center py-20">
                <div className="flex items-center justify-center mb-8">
                  <div className="p-6 bg-slate-100 rounded-3xl">
                    <Search className="h-12 w-12 text-slate-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-700 mb-4">No articles found</h3>
                <p className="text-slate-500 mb-8 text-lg">
                  Try adjusting your search terms or filter criteria
                </p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 shadow-lg"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <div key={post.id} className="group bg-white/90 backdrop-blur-md border border-blue-200 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                    <div className="h-48 bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center relative">
                      <BookOpen className="h-16 w-16 text-white opacity-30" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                          {categories.find(c => c.id === post.category)?.name}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      {/* Date and Time Row */}
                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1 text-slate-500">
                            <Calendar className="h-4 w-4" />
                            <span className="text-sm font-medium">{new Date(post.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-slate-500">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm font-medium">{post.readTime}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3 text-slate-500">
                          <div className="flex items-center space-x-1 hover:text-red-500 transition-colors cursor-pointer">
                            <Heart className="h-4 w-4" />
                            <span className="text-sm font-medium">{post.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1 hover:text-blue-500 transition-colors cursor-pointer">
                            <MessageCircle className="h-4 w-4" />
                            <span className="text-sm font-medium">{post.comments}</span>
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-700 transition-colors leading-tight line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-slate-600 mb-4 leading-relaxed text-sm line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      {/* Author and Tags Row */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-sm">
                            <User className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <span className="text-sm font-bold text-slate-800">{post.author.split(' ')[0]}</span>
                            <p className="text-xs text-slate-500">Expert</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 2).map((tag, index) => (
                            <span
                              key={index}
                              className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium hover:from-blue-200 hover:to-indigo-200 transition-all cursor-pointer"
                            >
                              #{tag}
                            </span>
                          ))}
                          {post.tags.length > 2 && (
                            <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full font-medium">
                              +{post.tags.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg group">
                        <span>Read More</span>
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Newsletter Signup */}
          <div className="bg-white border-2 border-blue-100 rounded-3xl p-12 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-blue-50 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent)]"></div>
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-8">
                <div className="p-6 bg-blue-50 backdrop-blur-sm rounded-3xl shadow-lg border border-blue-100">
                  <Mail className="h-12 w-12 text-blue-600" />
                </div>
              </div>
              
              <h3 className="text-4xl font-bold mb-6 text-slate-800">
                Stay Ahead of Threats
              </h3>
              <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                Subscribe to our newsletter and get the latest cybersecurity insights, threat intelligence, 
                and industry news delivered directly to your inbox.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-6">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-slate-700 placeholder-slate-500 text-lg"
                />
                <button className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 shadow-lg hover:shadow-xl whitespace-nowrap">
                  Subscribe Now
                </button>
              </div>
              
              <p className="text-slate-500 font-medium">
                Join 10,000+ cybersecurity professionals. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage3D;
