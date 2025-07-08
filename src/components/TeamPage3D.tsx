import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Users, 
  ArrowLeft, 
  Shield, 
  Award, 
  Star,
  Mail,
  Linkedin,
  Github,
  ExternalLink,
  MapPin,
  Calendar,
  Coffee,
  Code,
  Zap,
  Lock,
  Eye,
  CheckCircle,
  ChevronRight,
  Heart,
  Trophy,
  Target,
  Briefcase,
  Building,
  Globe,
  Twitter
} from 'lucide-react';

const TeamPage3D: React.FC = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
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
            className="flex items-center space-x-2 bg-white/90 backdrop-blur-md border border-blue-200 text-blue-700 px-6 py-3 rounded-xl font-medium hover:bg-white hover:border-blue-300 transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to Home</span>
          </button>
          
          <div className="flex items-center space-x-3 bg-white/90 backdrop-blur-md border border-blue-200 rounded-xl px-4 py-2 shadow-lg">
            <div className="p-2 bg-blue-100 rounded-lg">
              <img src="/rnr-logo.png" alt="RNR Consulting" className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
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
                <Users className="h-16 w-16 text-blue-600" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 bg-clip-text text-transparent">
              Our Expert Team
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-12">
              Meet our world-class cybersecurity professionals who bring decades of combined experience 
              in protecting organizations from evolving digital threats.
            </p>
            
            {/* Team Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-100 shadow-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">9</div>
                <div className="text-sm text-slate-600 font-medium">Core Team Members</div>
              </div>
              <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-100 shadow-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">100+</div>
                <div className="text-sm text-slate-600 font-medium">Years Combined Experience</div>
              </div>
              <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-100 shadow-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-sm text-slate-600 font-medium">Industry Certifications</div>
              </div>
              <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-100 shadow-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
                <div className="text-sm text-slate-600 font-medium">Clients Protected</div>
              </div>
            </div>
          </div>

          {/* Team Grid */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-20">
            {teamMembers.map((member, index) => (
              <div 
                key={member.id} 
                className="group bg-white/90 backdrop-blur-md border border-blue-200 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]"
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
                    <h3 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-blue-700 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 font-semibold text-lg mb-1">{member.role}</p>
                    <p className="text-slate-500 text-sm">{member.education}</p>
                  </div>

                  {/* Bio */}
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                    {member.bio}
                  </p>

                  {/* Expertise Tags */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-slate-700 mb-2">Core Expertise</h4>
                    <div className="flex flex-wrap gap-1">
                      {member.expertise.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-slate-700 mb-2">Specialties</h4>
                    <div className="flex flex-wrap gap-1">
                      {member.specialties.map((specialty, specIndex) => (
                        <span
                          key={specIndex}
                          className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 px-2 py-1 rounded-full text-xs font-medium"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-slate-700 mb-2">Key Achievements</h4>
                    <div className="space-y-1">
                      {member.achievements.map((achievement, achIndex) => (
                        <div key={achIndex} className="flex items-center space-x-2">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className="text-xs text-slate-600">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center space-x-4 pt-4 border-t border-slate-200">
                    <button className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors">
                      <Mail className="h-4 w-4" />
                    </button>
                    <button className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors">
                      <Linkedin className="h-4 w-4" />
                    </button>
                    <button className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors">
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
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Organizational Structure</h2>
              <p className="text-slate-600 text-lg">Our team is organized into specialized departments for maximum efficiency</p>
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
                  className="bg-white/90 backdrop-blur-md border border-blue-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-blue-50 rounded-xl text-blue-600 group-hover:bg-blue-100 transition-colors">
                      {dept.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">{dept.name}</h3>
                      <p className="text-slate-600 text-sm">{dept.description}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {dept.members.map((member, memberIndex) => (
                      <div key={memberIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-slate-700">{member}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="bg-white border-2 border-blue-100 rounded-3xl p-12 text-center shadow-2xl">
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-center mb-8">
                <div className="p-6 bg-blue-50 rounded-3xl shadow-lg border border-blue-100">
                  <Briefcase className="h-12 w-12 text-blue-600" />
                </div>
              </div>
              
              <h3 className="text-4xl font-bold mb-6 text-slate-800">
                Ready to Work with Our Team?
              </h3>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Our experts are ready to help secure your organization. Get in touch to discuss 
                your cybersecurity needs and learn how we can protect your digital assets.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 shadow-lg hover:shadow-xl">
                  Schedule Consultation
                </button>
                <button className="bg-white border-2 border-blue-200 text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl">
                  View Services
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPage3D;
