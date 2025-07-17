import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, Zap, Users, Award, Mail, Phone, MapPin, ChevronRight, Star, Search, ChevronDown, Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from './contexts/ThemeContext';
import ParticleAnimation from './components/ParticleAnimation';
import AnimatedContainer from './components/AnimatedContainer';
import ProfessionalServices from './components/ProfessionalServices';

function App() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'
    }`}>
      {/* Floating Glassmorphism Navigation */}
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
                    <Link to="/news" className={`block px-4 py-3 transition-colors ${
                      isDarkMode 
                        ? 'text-slate-300 hover:text-blue-400 hover:bg-slate-700/50' 
                        : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50/50'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <Eye className="h-4 w-4" />
                        <div>
                          <div className="font-medium">News & Blogs</div>
                          <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Latest insights & updates</div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              
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
                  <Link to="/news" className={`block py-2 text-sm transition-colors ${
                    isDarkMode 
                      ? 'text-slate-300 hover:text-blue-400' 
                      : 'text-slate-700 hover:text-blue-600'
                  }`} onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="flex items-center space-x-2">
                      <Eye className="h-4 w-4" />
                      <span>News & Blogs</span>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Main Navigation */}
              <div className="space-y-2 border-t border-slate-700/30 pt-4">
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

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className={`absolute inset-0 bg-gradient-to-br ${
          isDarkMode 
            ? 'from-blue-900/20 via-indigo-900/20 to-blue-800/30' 
            : 'from-blue-500/5 via-indigo-500/5 to-blue-600/10'
        }`}></div>
        <div className="absolute inset-0">
          <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse ${
            isDarkMode ? 'bg-blue-600/20' : 'bg-blue-400/20'
          }`}></div>
          <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000 ${
            isDarkMode ? 'bg-indigo-600/20' : 'bg-indigo-400/20'
          }`}></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-16 items-center">
            {/* Text Content */}
            <AnimatedContainer animation="slideRight" duration={700} className="text-center lg:text-left lg:col-span-2">
              <h1 className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent leading-tight ${
                isDarkMode 
                  ? 'from-blue-400 via-blue-300 to-indigo-300' 
                  : 'from-blue-600 via-blue-700 to-indigo-700'
              }`}>
                Advanced Cyber Security
              </h1>
              <AnimatedContainer animation="fadeIn" delay={200} duration={600}>
                <p className={`text-xl md:text-2xl mb-8 leading-relaxed ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  Protecting your digital assets with next-generation security solutions. 
                  Stay ahead of threats with our cutting-edge cybersecurity expertise.
                </p>
              </AnimatedContainer>
              <AnimatedContainer animation="slideUp" delay={400} duration={600}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link 
                    to="/contact"
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center shadow-lg shadow-blue-500/25 animate-glow"
                  >
                    Start Protection <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link 
                    to="/philosophy"
                    className={`backdrop-blur-sm border-2 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ${
                      isDarkMode 
                        ? 'bg-slate-800/80 border-slate-600 text-blue-400 hover:bg-slate-700/80 hover:border-slate-500' 
                        : 'bg-white/80 border-blue-200 text-blue-700 hover:bg-white hover:border-blue-300'
                    }`}
                  >
                    Learn More
                  </Link>
                </div>
              </AnimatedContainer>
            </AnimatedContainer>
            
            {/* Particle Animation */}
            <AnimatedContainer animation="slideLeft" delay={300} duration={800} className="flex justify-center lg:justify-end lg:col-span-3">
              <div className="relative">
                <ParticleAnimation className="rounded-2xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-blue-500/5 rounded-2xl pointer-events-none"></div>
              </div>
            </AnimatedContainer>
          </div>
        </div>
      </section>

      {/* Our Professional Services Section */}
      <ProfessionalServices />

      {/* Services Section */}
      <section id="services" className={`py-20 backdrop-blur-sm ${
        isDarkMode ? 'bg-slate-800/50' : 'bg-white/50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedContainer animation="fadeIn" className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent ${
              isDarkMode 
                ? 'from-blue-400 to-indigo-300' 
                : 'from-blue-600 to-indigo-700'
            }`}>
              Our Services
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Comprehensive cybersecurity solutions tailored to protect your business from evolving threats
            </p>
          </AnimatedContainer>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Threat Detection",
                description: "Advanced AI-powered threat detection and real-time monitoring to identify vulnerabilities before they become breaches."
              },
              {
                icon: <Lock className="h-8 w-8" />,
                title: "Data Encryption",
                description: "Military-grade encryption solutions to secure your sensitive data both at rest and in transit."
              },
              {
                icon: <Eye className="h-8 w-8" />,
                title: "Security Audits",
                description: "Comprehensive security assessments and penetration testing to identify and fix potential weaknesses."
              },
              {
                icon: <Zap className="h-8 w-8" />,
                title: "Incident Response",
                description: "24/7 rapid response team ready to contain and neutralize security incidents immediately."
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Security Training",
                description: "Employee training programs to build a human firewall against social engineering attacks."
              },
              {
                icon: <Award className="h-8 w-8" />,
                title: "Compliance",
                description: "Ensure your organization meets industry standards and regulatory requirements."
              }
            ].map((service, index) => (
              <AnimatedContainer 
                key={index} 
                animation="scaleIn" 
                delay={index * 100}
                duration={600}
                className={`group backdrop-blur-sm p-8 rounded-2xl border transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl ${
                  isDarkMode 
                    ? 'bg-slate-800/70 border-slate-600 hover:border-slate-500 hover:shadow-blue-900/10' 
                    : 'bg-white/70 border-blue-100 hover:border-blue-300 hover:shadow-blue-500/10'
                }`}
              >
                <div className={`mb-4 transition-colors p-3 rounded-xl w-fit ${
                  isDarkMode 
                    ? 'text-blue-400 group-hover:text-blue-300 bg-slate-700' 
                    : 'text-blue-600 group-hover:text-blue-700 bg-blue-50'
                }`}>
                  {service.icon}
                </div>
                <h3 className={`text-xl font-semibold mb-3 transition-colors ${
                  isDarkMode 
                    ? 'text-slate-200 group-hover:text-blue-400' 
                    : 'text-slate-800 group-hover:text-blue-700'
                }`}>
                  {service.title}
                </h3>
                <p className={`leading-relaxed transition-colors ${
                  isDarkMode 
                    ? 'text-slate-300 group-hover:text-slate-200' 
                    : 'text-slate-600 group-hover:text-slate-700'
                }`}>
                  {service.description}
                </p>
              </AnimatedContainer>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 bg-gradient-to-br ${
        isDarkMode 
          ? 'from-slate-800 to-slate-900' 
          : 'from-blue-50 to-indigo-50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedContainer animation="slideRight" duration={700}>
              <h2 className={`text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent ${
                isDarkMode 
                  ? 'from-blue-400 to-indigo-300' 
                  : 'from-blue-600 to-indigo-700'
              }`}>
                Why Choose Us
              </h2>
              <p className={`text-xl mb-8 leading-relaxed ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                With over a decade of experience in cybersecurity, we've protected thousands of organizations 
                from cyber threats. Our team of certified experts uses cutting-edge technology and proven 
                methodologies to keep your business secure.
              </p>
              <div className="space-y-4">
                {[
                  "ISO 27001 Certified Security Practices",
                  "24/7 Security Operations Center",
                  "99.9% Threat Detection Accuracy",
                  "Rapid Response Times"
                ].map((feature, index) => (
                  <AnimatedContainer 
                    key={index} 
                    animation="slideUp" 
                    delay={index * 100}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-pulse"></div>
                    <span className="text-slate-700 font-medium">{feature}</span>
                  </AnimatedContainer>
                ))}
              </div>
            </AnimatedContainer>
            <AnimatedContainer animation="slideLeft" delay={200} duration={700}>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: "1000+", label: "Clients Protected" },
                  { number: "99.9%", label: "Uptime Guarantee" },
                  { number: "24/7", label: "Support Available" },
                  { number: "10+", label: "Years Experience" }
                ].map((stat, index) => (
                  <AnimatedContainer
                    key={index}
                    animation="bounceIn"
                    delay={index * 150}
                    className={`backdrop-blur-sm p-6 rounded-2xl border text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 ${
                      isDarkMode 
                        ? 'bg-slate-800/80 border-slate-700/50' 
                        : 'bg-white/80 border-blue-100'
                    }`}
                  >
                    <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                    <div className={`font-medium ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-600'
                    }`}>{stat.label}</div>
                  </AnimatedContainer>
                ))}
              </div>
            </AnimatedContainer>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className={`py-20 backdrop-blur-sm ${
        isDarkMode ? 'bg-slate-800/50' : 'bg-white/50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedContainer animation="fadeIn" className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent ${
              isDarkMode 
                ? 'from-blue-400 to-indigo-300' 
                : 'from-blue-600 to-indigo-700'
            }`}>
              Security Experts
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Meet our team of certified cybersecurity professionals dedicated to protecting your business
            </p>
          </AnimatedContainer>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Chief Security Officer",
                expertise: "Penetration Testing, Threat Analysis"
              },
              {
                name: "Marcus Rodriguez",
                role: "Security Architect",
                expertise: "Infrastructure Security, Compliance"
              },
              {
                name: "Emily Johnson",
                role: "Incident Response Lead",
                expertise: "Forensics, Malware Analysis"
              }
            ].map((member, index) => (
              <AnimatedContainer 
                key={index} 
                animation="slideUp" 
                delay={index * 200}
                duration={600}
                className={`group backdrop-blur-sm p-8 rounded-2xl border transition-all duration-300 text-center shadow-lg hover:shadow-xl ${
                  isDarkMode 
                    ? 'bg-slate-800/80 border-slate-700 hover:border-slate-600 hover:shadow-blue-900/10' 
                    : 'bg-white/80 border-blue-100 hover:border-blue-300 hover:shadow-blue-500/10'
                }`}
              >
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-12 w-12 text-white" />
                </div>
                <h3 className={`text-xl font-semibold mb-2 transition-colors ${
                  isDarkMode 
                    ? 'text-slate-200 group-hover:text-blue-400' 
                    : 'text-slate-800 group-hover:text-blue-700'
                }`}>
                  {member.name}
                </h3>
                <p className={`mb-3 font-medium ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`}>{member.role}</p>
                <p className={`text-sm leading-relaxed ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>{member.expertise}</p>
                <div className="flex justify-center mt-4 space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-current animate-pulse" />
                  ))}
                </div>
              </AnimatedContainer>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 bg-gradient-to-br ${
        isDarkMode 
          ? 'from-slate-800 to-slate-900' 
          : 'from-blue-50 to-indigo-50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedContainer animation="fadeIn" className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent ${
              isDarkMode 
                ? 'from-blue-400 to-indigo-300' 
                : 'from-blue-600 to-indigo-700'
            }`}>
              Get Protected Today
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Ready to secure your business? Contact our security experts for a free consultation
            </p>
          </AnimatedContainer>
          <div className="grid lg:grid-cols-2 gap-12">
            <AnimatedContainer animation="slideRight" duration={700}>
              <div className="space-y-8">
                {[
                  { icon: <Phone className="h-6 w-6 text-white" />, title: "Call Us", info: "+1 (555) 123-SECURE" },
                  { icon: <Mail className="h-6 w-6 text-white" />, title: "Email Us", info: "security@cybershieldpro.com" },
                  { icon: <MapPin className="h-6 w-6 text-white" />, title: "Visit Us", info: "123 Security Blvd, Tech City, TC 12345" }
                ].map((contact, index) => (
                  <AnimatedContainer 
                    key={index} 
                    animation="slideUp" 
                    delay={index * 100}
                    className="flex items-center space-x-4"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg animate-glow">
                      {contact.icon}
                    </div>
                    <div>
                      <h3 className={`text-lg font-semibold ${
                        isDarkMode ? 'text-slate-200' : 'text-slate-800'
                      }`}>{contact.title}</h3>
                      <p className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>{contact.info}</p>
                    </div>
                  </AnimatedContainer>
                ))}
              </div>
            </AnimatedContainer>
            <AnimatedContainer animation="slideLeft" delay={200} duration={700}>
              <form className="space-y-6">
                <AnimatedContainer animation="fadeIn" delay={300}>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className={`w-full px-4 py-3 backdrop-blur-sm border rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all shadow-sm hover:shadow-md ${
                      isDarkMode 
                        ? 'bg-slate-800/80 border-slate-700 text-slate-200' 
                        : 'bg-white/80 border-blue-200 text-slate-800'
                    }`}
                  />
                </AnimatedContainer>
                <AnimatedContainer animation="fadeIn" delay={400}>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className={`w-full px-4 py-3 backdrop-blur-sm border rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all shadow-sm hover:shadow-md ${
                      isDarkMode 
                        ? 'bg-slate-800/80 border-slate-700 text-slate-200' 
                        : 'bg-white/80 border-blue-200 text-slate-800'
                    }`}
                  />
                </AnimatedContainer>
                <AnimatedContainer animation="fadeIn" delay={500}>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your security needs..."
                    className={`w-full px-4 py-3 backdrop-blur-sm border rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all resize-none shadow-sm hover:shadow-md ${
                      isDarkMode 
                        ? 'bg-slate-800/80 border-slate-700 text-slate-200' 
                        : 'bg-white/80 border-blue-200 text-slate-800'
                    }`}
                  ></textarea>
                </AnimatedContainer>
                <AnimatedContainer animation="bounceIn" delay={600}>
                  <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25 animate-glow">
                    Send Message
                  </button>
                </AnimatedContainer>
                <AnimatedContainer animation="bounceIn" delay={700}>
                  <Link 
                    to="/contact"
                    className="w-full mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-indigo-500/25 flex items-center justify-center space-x-2"
                  >
                    <Shield className="h-5 w-5" />
                    <span>Enter Secure Portal</span>
                  </Link>
                </AnimatedContainer>
              </form>
            </AnimatedContainer>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`backdrop-blur-sm border-t py-12 ${
        isDarkMode 
          ? 'bg-slate-900/80 border-slate-700' 
          : 'bg-white/80 border-blue-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-2 rounded-xl shadow-lg ${
                  isDarkMode ? 'bg-slate-800' : 'bg-white'
                }`}>
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
              <p className={`leading-relaxed ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Advanced cybersecurity solutions for modern businesses. Protecting what matters most.
              </p>
            </div>
            <div>
              <h4 className={`text-lg font-semibold mb-4 ${
                isDarkMode ? 'text-slate-200' : 'text-slate-800'
              }`}>Services</h4>
              <ul className={`space-y-2 ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                <li><a href="#" className={`transition-colors ${
                  isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'
                }`}>Threat Detection</a></li>
                <li><a href="#" className={`transition-colors ${
                  isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'
                }`}>Data Encryption</a></li>
                <li><a href="#" className={`transition-colors ${
                  isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'
                }`}>Security Audits</a></li>
                <li><a href="#" className={`transition-colors ${
                  isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'
                }`}>Incident Response</a></li>
              </ul>
            </div>
            <div>
              <h4 className={`text-lg font-semibold mb-4 ${
                isDarkMode ? 'text-slate-200' : 'text-slate-800'
              }`}>Company</h4>
              <ul className={`space-y-2 ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                <li><Link to="/about" className={`transition-colors ${
                  isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'
                }`}>About Us</Link></li>
                <li><Link to="/team" className={`transition-colors ${
                  isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'
                }`}>Our Team</Link></li>
                <li><Link to="/careers" className={`transition-colors ${
                  isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'
                }`}>Careers</Link></li>
                <li><Link to="/news" className={`transition-colors ${
                  isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'
                }`}>News</Link></li>
              </ul>
            </div>
            <div>
              <h4 className={`text-lg font-semibold mb-4 ${
                isDarkMode ? 'text-slate-200' : 'text-slate-800'
              }`}>Support</h4>
              <ul className={`space-y-2 ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                <li><a href="#" className={`transition-colors ${
                  isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'
                }`}>Documentation</a></li>
                <li><a href="#" className={`transition-colors ${
                  isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'
                }`}>Help Center</a></li>
                <li><a href="#" className={`transition-colors ${
                  isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'
                }`}>Contact</a></li>
                <li><a href="#" className={`transition-colors ${
                  isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'
                }`}>Emergency</a></li>
              </ul>
            </div>
          </div>
          <div className={`border-t mt-8 pt-8 text-center ${
            isDarkMode 
              ? 'border-slate-700 text-slate-400' 
              : 'border-blue-100 text-slate-600'
          }`}>
            <p>&copy; 2025 CyberShield Pro. All rights reserved. Securing your digital future.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;