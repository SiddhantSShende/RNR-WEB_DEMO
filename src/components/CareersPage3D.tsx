import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import {
  Briefcase,
  TrendingUp,
  Eye,
  Users,
  Target,
  Rocket,
  Brain,
  Shield,
  Code,
  ChevronDown,
  ChevronUp,
  Building2,
  ExternalLink,
  ArrowLeft,
  CheckCircle,
  Award,
  Zap,
  Heart,
  Clock,
  DollarSign,
  Gift,
  Plane,
  GraduationCap,
  Car,
  Home,
  Star,
  Lock,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Search,
  Moon,
  Sun,
  Menu,
  X
} from 'lucide-react';

const careers = [
  {
    title: 'Information Security Analyst',
    level: 'Mid to Senior Level',
    type: 'Full-time',
    location: 'Remote/Hybrid',
    summary:
      "Join our elite cybersecurity team to protect critical infrastructure and sensitive data. You'll conduct risk assessments, implement security measures, and respond to incidents while staying ahead of emerging threats.",
    responsibilities: [
      'Conduct comprehensive security assessments and vulnerability testing',
      'Monitor security systems and investigate potential threats',
      'Develop and implement security policies and procedures',
      'Train users on security best practices',
      'Stay up-to-date on the latest security threats and trends',
    ],
    qualifications: [
      "Bachelor's degree in computer science, information security, or a related field",
      'Strong understanding of security principles and best practices',
      'Experience with security tools and technologies',
      'Excellent analytical and problem-solving skills',
      'Excellent written and verbal communication skills',
    ],
    icon: <Shield className="h-6 w-6" />, color: 'bg-slate-800',
  },
  {
    title: 'VAPT (Vulnerability Assessment and Penetration Testing) Analyst',
    level: 'Mid Level',
    type: 'Full-time',
    location: 'On-site/Remote',
    summary:
      'A VAPT Analyst is responsible for conducting vulnerability assessments and penetration tests on networks, web applications, and other systems. They identify and exploit vulnerabilities to assess their impact, and develop penetration testing plans.',
    responsibilities: [
      'Conduct vulnerability assessments and penetration tests on networks, web applications, and other systems',
      'Identify and exploit vulnerabilities in order to assess their impact',
      'Develop and execute penetration testing plans',
      'Write detailed reports of findings and recommendations',
      'Stay up-to-date on the latest security threats and vulnerabilities',
    ],
    qualifications: [
      "Bachelor's degree in computer science, information security, or a related field",
      'Strong understanding of security principles and best practices',
      'Experience with security tools and technologies',
      'Excellent analytical and problem-solving skills',
      'Excellent written and verbal communication skills',
    ],
    icon: <Code className="h-6 w-6" />, color: 'bg-slate-800',
  },
  {
    title: 'Cybersecurity Consultant',
    level: 'Senior Level',
    type: 'Full-time',
    location: 'Hybrid',
    summary:
      'Lead strategic cybersecurity initiatives for enterprise clients. Provide expert guidance on security architecture, compliance frameworks, and risk management strategies.',
    responsibilities: [
      'Design and implement comprehensive cybersecurity strategies',
      'Conduct security maturity assessments for enterprise clients',
      'Lead incident response and forensic investigations',
      'Develop custom security solutions and frameworks',
      'Mentor junior team members and lead project teams',
    ],
    qualifications: [
      "Master's degree in cybersecurity, computer science, or related field",
      '8+ years of experience in cybersecurity consulting',
      'Professional certifications (CISSP, CISM, CEH preferred)',
      'Strong leadership and client communication skills',
      'Experience with compliance frameworks (ISO 27001, SOC 2, NIST)',
    ],
    icon: <Brain className="h-6 w-6" />, color: 'bg-slate-800',
  },
  {
    title: 'SOC (Security Operations Center) Analyst',
    level: 'Entry to Mid Level',
    type: 'Full-time',
    location: 'On-site',
    summary:
      'Monitor and analyze security events 24/7 to detect and respond to cyber threats. Work with cutting-edge SIEM tools and threat intelligence platforms.',
    responsibilities: [
      'Monitor security events and alerts using SIEM platforms',
      'Perform initial threat analysis and incident triage',
      'Document and escalate security incidents following procedures',
      'Maintain and update security monitoring rules and playbooks',
      'Participate in threat hunting and proactive security activities',
    ],
    qualifications: [
      "Bachelor's degree in cybersecurity, IT, or related field",
      'Understanding of network protocols and security technologies',
      'Experience with SIEM tools (Splunk, QRadar, or similar)',
      'Strong analytical and attention to detail',
      'Ability to work in rotating shifts including nights and weekends',
    ],
    icon: <Eye className="h-6 w-6" />, color: 'bg-slate-800',
  },
  {
    title: 'Cloud Security Engineer',
    level: 'Mid to Senior Level',
    type: 'Full-time',
    location: 'Remote',
    summary:
      'Secure cloud infrastructure and applications across AWS, Azure, and GCP platforms. Design and implement cloud-native security solutions.',
    responsibilities: [
      'Design secure cloud architectures and deployment strategies',
      'Implement Infrastructure as Code (IaC) security best practices',
      'Configure and manage cloud security tools and services',
      'Conduct cloud security assessments and compliance audits',
      'Automate security monitoring and incident response in cloud environments',
    ],
    qualifications: [
      "Bachelor's degree in computer science, cybersecurity, or related field",
      '5+ years of experience with cloud platforms (AWS, Azure, GCP)',
      'Cloud security certifications (CCSP, AWS Security Specialty preferred)',
      'Experience with container security and DevSecOps practices',
      'Proficiency in scripting languages (Python, PowerShell, Bash)',
    ],
    icon: <Zap className="h-6 w-6" />, color: 'bg-slate-800',
  },
  {
    title: 'Cybersecurity Intern',
    level: 'Internship',
    type: 'Part-time/Full-time',
    location: 'Hybrid',
    summary:
      'Gain hands-on experience in cybersecurity while working alongside industry experts. Perfect for students and recent graduates looking to start their cybersecurity career.',
    responsibilities: [
      'Assist with security assessments and vulnerability testing',
      'Support SOC operations and incident response activities',
      'Participate in research projects and threat intelligence gathering',
      'Help with documentation and process improvement initiatives',
      'Shadow senior analysts and participate in training programs',
    ],
    qualifications: [
      'Currently pursuing or recently completed degree in cybersecurity, IT, or related field',
      'Basic understanding of networking and security concepts',
      'Strong desire to learn and grow in cybersecurity',
      'Good communication and teamwork skills',
      'Any relevant certifications (Security+, Network+ a plus)',
    ],
    icon: <Users className="h-6 w-6" />, color: 'bg-slate-800',
  },
];



const CareersPage3D: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number | null>(null);
  const [expandedJobIndex, setExpandedJobIndex] = useState<number | null>(null);
  const [expandedSection, setExpandedSection] = useState<number | null>(1);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const toggleJobDetails = (index: number) => {
    setExpandedJobIndex(expandedJobIndex === index ? null : index);
  };

  const toggleSection = (index: number) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  // Company values
  const companyValues = [
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Growth",
      description: "Believe. Develop. Follow Growth Mindset.",
      color: "bg-slate-800"
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: "Transparency", 
      description: "Transparent approach across the channels",
      color: "bg-slate-800"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Zero Hierarchy",
      description: "Open communication and ease of access.",
      color: "bg-slate-800"
    }
  ];

  // Work environment features
  const workEnvironmentFeatures = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Training & Development",
      description: "Discover growth opportunities at RNR. Our Training & Development programs empower you to excel, with mentorship, skill-building, and career advancement opportunities tailored to your potential.",
      highlighted: false
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "RNR Work Environment", 
      description: "At RNR, our work environment fosters creativity, collaboration, and growth. We embrace diversity, innovation, and a supportive culture, empowering you to thrive in your career journey.",
      highlighted: false
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Our hiring journeys",
      description: "Our hiring journeys are diverse and dynamic, reflecting our commitment to talent and inclusivity. Explore opportunities, growth, and a vibrant work culture at RNR.",
      highlighted: false
    }
  ];

  // Perks and Benefits
  const perksAndBenefits = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Health & Wellness",
      description: "Comprehensive health insurance, dental, vision, and mental health support programs for you and your family.",
      color: "from-red-100 to-red-200",
      iconColor: "text-red-600"
    },
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Competitive Compensation",
      description: "Market-leading salaries, performance bonuses, equity participation, and annual compensation reviews.",
      color: "from-green-100 to-green-200",
      iconColor: "text-green-600"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Work-Life Balance",
      description: "Flexible working hours, remote work options, unlimited PTO, and sabbatical opportunities.",
      color: "from-blue-100 to-blue-200",
      iconColor: "text-blue-600"
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Learning & Development",
      description: "Professional certification reimbursement, conference attendance, internal training programs, and mentorship.",
      color: "from-purple-100 to-purple-200",
      iconColor: "text-purple-600"
    },
    {
      icon: <Plane className="h-6 w-6" />,
      title: "Travel & Experiences",
      description: "Annual team retreats, travel opportunities for client engagements, and global conference participation.",
      color: "from-indigo-100 to-indigo-200",
      iconColor: "text-indigo-600"
    },
    {
      icon: <Gift className="h-6 w-6" />,
      title: "Additional Perks",
      description: "Free meals, gym membership, tech allowance, employee discounts, and team building activities.",
      color: "from-pink-100 to-pink-200",
      iconColor: "text-pink-600"
    },
    {
      icon: <Car className="h-6 w-6" />,
      title: "Transportation",
      description: "Company car allowance, parking reimbursement, and public transportation subsidies.",
      color: "from-gray-100 to-gray-200",
      iconColor: "text-gray-600"
    },
    {
      icon: <Home className="h-6 w-6" />,
      title: "Home Office Setup",
      description: "Work-from-home stipend, ergonomic furniture allowance, and top-tier technology equipment.",
      color: "from-yellow-100 to-yellow-200",
      iconColor: "text-yellow-600"
    }
  ];

  // Expandable sections for career info
  const expandableSections = [
    {
      id: 1,
      title: "Who We Are",
      icon: <Building2 className="h-6 w-6" />,
      content: "RNR Consulting is a leading cybersecurity firm dedicated to protecting organizations from evolving digital threats. Our team of experts combines deep technical knowledge with strategic thinking to deliver comprehensive security solutions that adapt to the changing threat landscape."
    },
    {
      id: 2, 
      title: "What We Do",
      icon: <Shield className="h-6 w-6" />,
      content: "We provide end-to-end cybersecurity services including threat assessment, vulnerability testing, security architecture design, incident response, and compliance consulting. Our proactive approach ensures your organization stays ahead of potential threats."
    },
    {
      id: 3,
      title: "How We Work",
      icon: <Zap className="h-6 w-6" />,
      content: "Our methodology combines industry best practices with innovative approaches. We work collaboratively with clients, maintaining transparency throughout the process while delivering results that exceed expectations. Our agile approach ensures rapid response to emerging threats."
    },
    {
      id: 4,
      title: "Why Choose Us",
      icon: <Award className="h-6 w-6" />,
      content: "With 15+ years of experience and 500+ satisfied clients, we bring unmatched expertise to every engagement. Our 24/7 monitoring, 99.9% uptime guarantee, and rapid incident response capabilities make us the trusted choice for organizations worldwide."
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
                  <Briefcase className={`h-16 w-16 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
              </div>
              <h1 className={`text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r bg-clip-text text-transparent leading-tight ${
                isDarkMode 
                  ? 'from-blue-400 via-blue-300 to-indigo-300' 
                  : 'from-blue-600 via-blue-700 to-indigo-700'
              }`}>
                Join Our Mission
              </h1>
              <p className={`text-2xl md:text-3xl mb-12 leading-relaxed max-w-4xl mx-auto ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Build the future of cybersecurity with us. Join a team of passionate professionals 
                dedicated to protecting the digital world through innovation and excellence.
              </p>
            </div>

            {/* Our Culture Section */}
            <div className="mb-16">
              <div className={`backdrop-blur-md border rounded-3xl p-8 shadow-xl mb-12 hover:shadow-2xl transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-slate-800/95 border-slate-700' 
                  : 'bg-white/95 border-sky-200'
              }`}
                style={{
                  boxShadow: '0 10px 40px rgba(135, 206, 235, 0.3), 0 0 20px rgba(135, 206, 235, 0.1)',
                }}
              >
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Our Culture</h2>
                <p className={`text-xl mb-8 ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  The secret to retaining employees on board for extended periods of time is our office culture.
                </p>
              </div>

              <div className="mb-12">
                <h3 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Our Values</h3>
                <div className="grid md:grid-cols-3 gap-8">
                  {companyValues.map((value, index) => (
                    <div
                      key={index}
                      className={`backdrop-blur-md border rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 text-center group hover:scale-105 ${
                        isDarkMode 
                          ? 'bg-slate-800/95 border-slate-700 hover:border-slate-600' 
                          : 'bg-white/95 border-sky-200 hover:border-sky-300'
                      }`}
                      style={{
                        boxShadow: '0 10px 40px rgba(135, 206, 235, 0.3), 0 0 20px rgba(135, 206, 235, 0.1)',
                      }}
                    >
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg ${
                        isDarkMode 
                          ? 'bg-gradient-to-br from-slate-700 to-slate-600 text-blue-400' 
                          : 'bg-gradient-to-br from-sky-100 to-sky-200 text-sky-600'
                      }`}>
                        {value.icon}
                      </div>
                      <h4 className={`text-2xl font-bold mb-4 ${
                        isDarkMode ? 'text-slate-200' : 'text-slate-800'
                      }`}>{value.title}</h4>
                      <p className={`leading-relaxed ${
                        isDarkMode ? 'text-slate-300' : 'text-slate-600'
                      }`}>{value.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Careers for Interns & Freshers Section */}
            <div className="mb-16">
              <div className={`backdrop-blur-md border rounded-3xl p-8 shadow-xl mb-12 hover:shadow-2xl transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-slate-800/95 border-slate-700' 
                  : 'bg-white/95 border-sky-200'
              }`}
                style={{
                  boxShadow: '0 10px 40px rgba(135, 206, 235, 0.3), 0 0 20px rgba(135, 206, 235, 0.1)',
                }}
              >
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Careers for Interns & Freshers</h2>
                <p className={`text-xl mb-4 ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  The initial step in your professional life is to find suitable employment.
                </p>
                <p className={`text-xl ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  Are you an Intern, Fresher or someone with a job gap, we are here to offer you an opportunity to work for our firm.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {workEnvironmentFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className={`backdrop-blur-md border rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 ${
                      isDarkMode 
                        ? 'bg-slate-800/95 border-slate-700 hover:border-slate-600' 
                        : 'bg-white/95 border-sky-200 hover:border-sky-300'
                    }`}
                    style={{
                      boxShadow: '0 10px 40px rgba(135, 206, 235, 0.3), 0 0 20px rgba(135, 206, 235, 0.1)',
                    }}
                  >
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6 shadow-lg ${
                      isDarkMode 
                        ? 'bg-gradient-to-br from-slate-700 to-slate-600 text-blue-400' 
                        : 'bg-gradient-to-br from-sky-100 to-sky-200 text-sky-600'
                    }`}>
                      {feature.icon}
                    </div>
                    <h4 className={`text-xl font-bold mb-4 ${
                      isDarkMode ? 'text-slate-200' : 'text-slate-800'
                    }`}>
                      {feature.title}
                    </h4>
                    <p className={`leading-relaxed ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Perks and Benefits Section */}
            <div className="mb-16">
              <div className={`backdrop-blur-md border rounded-3xl p-8 shadow-xl mb-12 hover:shadow-2xl transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-slate-800/95 border-slate-700' 
                  : 'bg-white/95 border-sky-200'
              }`}
                style={{
                  boxShadow: '0 10px 40px rgba(135, 206, 235, 0.3), 0 0 20px rgba(135, 206, 235, 0.1)',
                }}
              >
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Perks & Benefits</h2>
                <p className={`text-xl ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  We believe in taking care of our team with comprehensive benefits and exciting perks that support your personal and professional growth.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {perksAndBenefits.map((perk, index) => (
                  <div
                    key={index}
                    className={`backdrop-blur-md border rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 ${
                      isDarkMode 
                        ? 'bg-slate-800/95 border-slate-700 hover:border-slate-600' 
                        : 'bg-white/95 border-sky-200 hover:border-sky-300'
                    }`}
                    style={{
                      boxShadow: '0 10px 40px rgba(135, 206, 235, 0.3), 0 0 20px rgba(135, 206, 235, 0.1)',
                    }}
                  >
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${perk.color} ${perk.iconColor} mb-4 shadow-lg`}>
                      {perk.icon}
                    </div>
                    <h4 className={`text-lg font-bold mb-3 ${
                      isDarkMode ? 'text-slate-200' : 'text-slate-800'
                    }`}>
                      {perk.title}
                    </h4>
                    <p className={`text-sm leading-relaxed ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      {perk.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Company Information - Expandable Sections */}
            <div className="mb-16">
              <div className={`backdrop-blur-md border rounded-3xl p-8 shadow-xl mb-8 hover:shadow-2xl transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-slate-800/95 border-slate-700' 
                  : 'bg-white/95 border-sky-200'
              }`}
                style={{
                  boxShadow: '0 10px 40px rgba(135, 206, 235, 0.3), 0 0 20px rgba(135, 206, 235, 0.1)',
                }}
              >
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">About RNR Consulting</h2>
                <p className={`text-xl ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  Learn more about our company, values, and what makes us a great place to work.
                </p>
              </div>

              <div className="space-y-4">
                {expandableSections.map((section) => (
                  <div
                    key={section.id}
                    className={`backdrop-blur-md border rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-102 ${
                      isDarkMode 
                        ? 'bg-slate-800/95 border-slate-700 hover:border-slate-600' 
                        : 'bg-white/95 border-sky-200 hover:border-sky-300'
                    }`}
                    style={{
                      boxShadow: '0 10px 40px rgba(135, 206, 235, 0.3), 0 0 20px rgba(135, 206, 235, 0.1)',
                    }}
                  >
                    <button
                      className="w-full flex items-center justify-between p-8 text-left focus:outline-none group"
                      onClick={() => toggleSection(section.id)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg ${
                          isDarkMode 
                            ? 'bg-gradient-to-br from-slate-700 to-slate-600 text-blue-400' 
                            : 'bg-gradient-to-br from-sky-100 to-sky-200 text-sky-600'
                        }`}>
                          {section.icon}
                        </div>
                        <h3 className={`text-2xl font-bold group-hover:text-sky-700 transition-colors duration-300 ${
                          isDarkMode ? 'text-slate-200' : 'text-slate-800'
                        }`}>
                          {section.title}
                        </h3>
                      </div>
                      <div className="text-sky-600">
                        {expandedSection === section.id ? (
                          <ChevronUp className="h-6 w-6" />
                        ) : (
                          <ChevronDown className="h-6 w-6" />
                        )}
                      </div>
                    </button>
                    
                    {expandedSection === section.id && (
                      <div className="px-8 pb-8">
                        <div className={`rounded-2xl p-6 shadow-inner ${
                          isDarkMode 
                            ? 'bg-gradient-to-br from-slate-700/50 to-slate-600/50' 
                            : 'bg-gradient-to-br from-sky-50 to-sky-100'
                        }`}>
                          <p className={`text-lg leading-relaxed ${
                            isDarkMode ? 'text-slate-300' : 'text-slate-700'
                          }`}>
                            {section.content}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Career Development & Growth Path */}
            <div className="mb-16">
              <div className={`backdrop-blur-md border rounded-3xl p-8 shadow-xl mb-12 hover:shadow-2xl transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-slate-800/95 border-slate-700' 
                  : 'bg-white/95 border-sky-200'
              }`}
                style={{
                  boxShadow: '0 10px 40px rgba(135, 206, 235, 0.3), 0 0 20px rgba(135, 206, 235, 0.1)',
                }}
              >
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Career Development</h2>
                <p className={`text-xl ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  Your growth is our priority. Discover the structured career paths and development opportunities that await you at RNR.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className={`backdrop-blur-md border rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-slate-800/95 border-slate-700 hover:border-slate-600' 
                    : 'bg-white/95 border-sky-200 hover:border-sky-300'
                }`}
                  style={{
                    boxShadow: '0 10px 40px rgba(135, 206, 235, 0.3), 0 0 20px rgba(135, 206, 235, 0.1)',
                  }}
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 shadow-lg ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-slate-700 to-slate-600 text-blue-400' 
                      : 'bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600'
                  }`}>
                    <GraduationCap className="h-8 w-8" />
                  </div>
                  <h3 className={`text-2xl font-bold mb-4 ${
                    isDarkMode ? 'text-slate-200' : 'text-slate-800'
                  }`}>Professional Certifications</h3>
                  <ul className={`space-y-3 ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>100% certification exam fee reimbursement</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Study time allowance during work hours</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Internal certification bootcamps</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Certification bonus rewards program</span>
                    </li>
                  </ul>
                </div>

                <div className={`backdrop-blur-md border rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-slate-800/95 border-slate-700 hover:border-slate-600' 
                    : 'bg-white/95 border-sky-200 hover:border-sky-300'
                }`}
                  style={{
                    boxShadow: '0 10px 40px rgba(135, 206, 235, 0.3), 0 0 20px rgba(135, 206, 235, 0.1)',
                  }}
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 shadow-lg ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-slate-700 to-slate-600 text-green-400' 
                      : 'bg-gradient-to-br from-green-100 to-green-200 text-green-600'
                  }`}>
                    <TrendingUp className="h-8 w-8" />
                  </div>
                  <h3 className={`text-2xl font-bold mb-4 ${
                    isDarkMode ? 'text-slate-200' : 'text-slate-800'
                  }`}>Career Progression</h3>
                  <ul className={`space-y-3 ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Clear promotion pathways and timelines</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Regular performance reviews and feedback</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Leadership development programs</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Cross-department rotation opportunities</span>
                    </li>
                  </ul>
                </div>

                <div className={`backdrop-blur-md border rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-slate-800/95 border-slate-700 hover:border-slate-600' 
                    : 'bg-white/95 border-sky-200 hover:border-sky-300'
                }`}
                  style={{
                    boxShadow: '0 10px 40px rgba(135, 206, 235, 0.3), 0 0 20px rgba(135, 206, 235, 0.1)',
                  }}
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 shadow-lg ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-slate-700 to-slate-600 text-purple-400' 
                      : 'bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600'
                  }`}>
                    <Users className="h-8 w-8" />
                  </div>
                  <h3 className={`text-2xl font-bold mb-4 ${
                    isDarkMode ? 'text-slate-200' : 'text-slate-800'
                  }`}>Mentorship Program</h3>
                  <ul className={`space-y-3 ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>Assigned senior mentor for each new hire</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>Monthly one-on-one coaching sessions</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>Cross-functional mentoring opportunities</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>Reverse mentoring for senior staff</span>
                    </li>
                  </ul>
                </div>

                <div className={`backdrop-blur-md border rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-slate-800/95 border-slate-700 hover:border-slate-600' 
                    : 'bg-white/95 border-sky-200 hover:border-sky-300'
                }`}
                  style={{
                    boxShadow: '0 10px 40px rgba(135, 206, 235, 0.3), 0 0 20px rgba(135, 206, 235, 0.1)',
                  }}
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 shadow-lg ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-slate-700 to-slate-600 text-orange-400' 
                      : 'bg-gradient-to-br from-orange-100 to-orange-200 text-orange-600'
                  }`}>
                    <Target className="h-8 w-8" />
                  </div>
                  <h3 className={`text-2xl font-bold mb-4 ${
                    isDarkMode ? 'text-slate-200' : 'text-slate-800'
                  }`}>Skills Development</h3>
                  <ul className={`space-y-3 ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>Annual learning and development budget</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>Access to premium online learning platforms</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>Internal knowledge sharing sessions</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>Industry conference and workshop attendance</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Employee Stories & Testimonials */}
            <div className="mb-16">
              <div className={`backdrop-blur-md border rounded-3xl p-8 shadow-xl mb-12 hover:shadow-2xl transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-slate-800/95 border-slate-700' 
                  : 'bg-white/95 border-sky-200'
              }`}
                style={{
                  boxShadow: '0 10px 40px rgba(135, 206, 235, 0.3), 0 0 20px rgba(135, 206, 235, 0.1)',
                }}
              >
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">What Our Team Says</h2>
                <p className={`text-xl ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  Hear from our employees about their experiences and growth at RNR Consulting.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className={`backdrop-blur-md border rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-slate-800/95 border-slate-700 hover:border-slate-600' 
                    : 'bg-white/95 border-sky-200 hover:border-sky-300'
                }`}
                  style={{
                    boxShadow: '0 10px 40px rgba(135, 206, 235, 0.3), 0 0 20px rgba(135, 206, 235, 0.1)',
                  }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg mr-4">
                      S
                    </div>
                    <div>
                      <h4 className={`font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>Sarah Chen</h4>
                      <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Senior Security Analyst</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className={`leading-relaxed italic ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    "RNR has been instrumental in my career growth. The mentorship program and continuous learning opportunities have helped me advance from junior to senior level in just 3 years."
                  </p>
                </div>

                <div className={`backdrop-blur-md border rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-slate-800/95 border-slate-700 hover:border-slate-600' 
                    : 'bg-white/95 border-sky-200 hover:border-sky-300'
                }`}
                  style={{
                    boxShadow: '0 10px 40px rgba(135, 206, 235, 0.3), 0 0 20px rgba(135, 206, 235, 0.1)',
                  }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-bold text-lg mr-4">
                      M
                    </div>
                    <div>
                      <h4 className={`font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>Marcus Johnson</h4>
                      <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>VAPT Lead</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className={`leading-relaxed italic ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    "The work-life balance at RNR is exceptional. Remote work flexibility and unlimited PTO have allowed me to maintain a healthy balance while working on cutting-edge security projects."
                  </p>
                </div>

                <div className={`backdrop-blur-md border rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-slate-800/95 border-slate-700 hover:border-slate-600' 
                    : 'bg-white/95 border-sky-200 hover:border-sky-300'
                }`}
                  style={{
                    boxShadow: '0 10px 40px rgba(135, 206, 235, 0.3), 0 0 20px rgba(135, 206, 235, 0.1)',
                  }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg mr-4">
                      A
                    </div>
                    <div>
                      <h4 className={`font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>Aisha Patel</h4>
                      <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Cloud Security Engineer</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className={`leading-relaxed italic ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    "Starting as an intern and now leading cloud security projects - RNR truly invests in their people. The training budget and conference opportunities are incredible."
                  </p>
                </div>
              </div>
            </div>

            {/* Open Positions */}
            <div className="mb-16">
              <div className={`backdrop-blur-md border rounded-3xl p-8 shadow-xl mb-8 hover:shadow-2xl transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-slate-800/95 border-slate-700' 
                  : 'bg-white/95 border-sky-200'
              }`}
                style={{
                  boxShadow: '0 10px 40px rgba(135, 206, 235, 0.3), 0 0 20px rgba(135, 206, 235, 0.1)',
                }}
              >
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Open Positions</h2>
                <p className={`text-xl ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  Explore exciting career opportunities and join our cybersecurity team.
                </p>
              </div>

              <div className="space-y-6">
                {careers.map((job, index) => (
                  <div
                    key={index}
                    className={`backdrop-blur-md border rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-102 ${
                      isDarkMode 
                        ? 'bg-slate-800/95 border-slate-700 hover:border-slate-600' 
                        : 'bg-white/95 border-sky-200 hover:border-sky-300'
                    }`}
                    style={{
                      boxShadow: '0 10px 40px rgba(135, 206, 235, 0.3), 0 0 20px rgba(135, 206, 235, 0.1)',
                    }}
                  >
                    <div 
                      className="p-8 cursor-pointer"
                      onClick={() => toggleJobDetails(index)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className={`p-3 rounded-xl shadow-lg ${
                            isDarkMode 
                              ? 'bg-gradient-to-br from-slate-700 to-slate-600 text-blue-400' 
                              : 'bg-gradient-to-br from-sky-100 to-sky-200 text-sky-600'
                          }`}>
                            {job.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className={`text-2xl font-bold mb-2 ${
                              isDarkMode ? 'text-slate-200' : 'text-slate-800'
                            }`}>{job.title}</h3>
                            <div className="flex flex-wrap items-center gap-4 mb-3">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium shadow-sm ${
                                isDarkMode 
                                  ? 'bg-blue-900/50 text-blue-300' 
                                  : 'bg-sky-100 text-sky-700'
                              }`}>
                                {job.level}
                              </span>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium shadow-sm ${
                                isDarkMode 
                                  ? 'bg-green-900/50 text-green-300' 
                                  : 'bg-emerald-100 text-emerald-700'
                              }`}>
                                {job.type}
                              </span>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium shadow-sm ${
                                isDarkMode 
                                  ? 'bg-purple-900/50 text-purple-300' 
                                  : 'bg-violet-100 text-violet-700'
                              }`}>
                                {job.location}
                              </span>
                            </div>
                            <p className={`leading-relaxed text-lg ${
                              isDarkMode ? 'text-slate-300' : 'text-slate-600'
                            }`}>
                              {job.summary}
                            </p>
                          </div>
                        </div>
                        <div className="ml-4">
                          {expandedJobIndex === index ? (
                            <ChevronUp className={`h-6 w-6 ${isDarkMode ? 'text-blue-400' : 'text-sky-600'}`} />
                          ) : (
                            <ChevronDown className={`h-6 w-6 ${isDarkMode ? 'text-blue-400' : 'text-sky-600'}`} />
                          )}
                        </div>
                      </div>
                    </div>

                    {expandedJobIndex === index && (
                      <div className={`border-t p-8 ${
                        isDarkMode 
                          ? 'border-slate-600 bg-gradient-to-br from-slate-700/50 to-slate-600/50' 
                          : 'border-sky-100 bg-gradient-to-br from-sky-50 to-sky-100'
                      }`}>
                        <div className="grid md:grid-cols-2 gap-8">
                          <div>
                            <h4 className={`text-xl font-bold mb-4 ${
                              isDarkMode ? 'text-slate-200' : 'text-slate-800'
                            }`}>Responsibilities:</h4>
                            <ul className="space-y-2">
                              {job.responsibilities.map((responsibility, respIndex) => (
                                <li key={respIndex} className="flex items-start space-x-2">
                                  <CheckCircle className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                                    isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                                  }`} />
                                  <span className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>{responsibility}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className={`text-xl font-bold mb-4 ${
                              isDarkMode ? 'text-slate-200' : 'text-slate-800'
                            }`}>Qualifications:</h4>
                            <ul className="space-y-2">
                              {job.qualifications.map((qualification, qualIndex) => (
                                <li key={qualIndex} className="flex items-start space-x-2">
                                  <CheckCircle className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                                    isDarkMode ? 'text-blue-400' : 'text-sky-600'
                                  }`} />
                                  <span className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>{qualification}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="mt-8 text-center">
                          <p className={`text-lg mb-4 ${
                            isDarkMode ? 'text-slate-300' : 'text-slate-700'
                          }`}>
                            If you are a highly motivated and experienced professional with a passion for protecting information assets, we encourage you to apply.
                          </p>
                          <button className="bg-gradient-to-r from-sky-500 to-sky-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-sky-600 hover:to-sky-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-sky-500/25 flex items-center space-x-2 mx-auto">
                            <ExternalLink className="h-5 w-5" />
                            <span>Click Here To Apply</span>
                          </button>
                        </div>
                      </div>
                    )}
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
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl mx-auto mb-6 shadow-lg ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-slate-700 to-slate-600 text-blue-400' 
                  : 'bg-gradient-to-br from-sky-100 to-sky-200 text-sky-600'
              }`}>
                <Building2 className="h-10 w-10" />
              </div>
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Ready to Shape the Future?</h2>
              <p className={`text-xl mb-8 max-w-3xl mx-auto leading-relaxed ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Join RNR Consulting and be part of a team that's defining the next generation of cybersecurity solutions.
                Your expertise will help protect organizations worldwide from evolving digital threats.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25">
                  View All Positions
                </button>
                <button className="bg-gradient-to-r from-sky-500 to-sky-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-sky-600 hover:to-sky-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-sky-500/25">
                  Submit Resume
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareersPage3D;
