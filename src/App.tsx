import { useState, useEffect } from 'react';
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
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const { isDarkMode, toggleTheme } = useTheme();

  // Prevent background scroll when dropdown or mobile menu is open
  useEffect(() => {
    if (isServicesOpen || isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isServicesOpen, isMobileMenuOpen]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'
    }`}>
      {/* Floating Glassmorphism Navigation */}
      <nav className={`fixed top-2 sm:top-4 left-1/2 transform -translate-x-1/2 w-[98%] sm:w-[95%] max-w-7xl backdrop-blur-md border rounded-2xl z-50 shadow-lg transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-slate-800/20 border-slate-700/30 shadow-blue-900/10' 
          : 'bg-white/20 border-white/30 shadow-blue-500/10'
      }`}>
        <div className="px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
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
                onMouseLeave={() => {
                  setIsServicesOpen(false);
                  setActiveSubMenu(null);
                }}
              >
                <button className={`flex items-center font-medium transition-colors duration-300 ${
                  isDarkMode 
                    ? 'text-slate-300 hover:text-blue-400' 
                    : 'text-slate-700 hover:text-blue-600'
                }`}>
                  Services
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Horizontal Mega Menu */}
                <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-screen max-w-6xl backdrop-blur-md border rounded-xl shadow-lg transition-all duration-300 ${
                  isServicesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                } ${
                  isDarkMode 
                    ? 'bg-slate-800/95 border-slate-700/30 shadow-blue-900/20' 
                    : 'bg-white/95 border-white/30 shadow-blue-500/20'
                }`}
                >
                  <div className="p-6">
                    {/* Main Services Grid */}
                    <div className="grid grid-cols-5 gap-6 mb-6">
                      {/* Row 1 */}
                      <Link to="/services/grc">
                        <div 
                          className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                            activeSubMenu === 'grc' 
                              ? isDarkMode ? 'bg-blue-600/20 border-blue-500/30' : 'bg-blue-50 border-blue-200'
                              : isDarkMode ? 'hover:bg-slate-700/50' : 'hover:bg-gray-50'
                          } border border-transparent`}
                          onMouseEnter={() => setActiveSubMenu('grc')}
                        >
                          <Shield className="h-8 w-8 text-blue-500 mb-2" />
                          <h3 className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            GRC
                          </h3>
                          <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                            Risk management
                          </p>
                        </div>
                      </Link>

                      <Link to="/services/tprm">
                        <div 
                          className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                            activeSubMenu === 'tprm' 
                              ? isDarkMode ? 'bg-blue-600/20 border-blue-500/30' : 'bg-blue-50 border-blue-200'
                              : isDarkMode ? 'hover:bg-slate-700/50' : 'hover:bg-gray-50'
                          } border border-transparent`}
                          onMouseEnter={() => setActiveSubMenu('tprm')}
                        >
                          <Users className="h-8 w-8 text-blue-500 mb-2" />
                          <h3 className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            TPRM
                          </h3>
                          <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                            Vendor risk
                          </p>
                        </div>
                      </Link>

                      <Link to="/services/bcms">
                        <div 
                          className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                            activeSubMenu === 'bcms' 
                              ? isDarkMode ? 'bg-blue-600/20 border-blue-500/30' : 'bg-blue-50 border-blue-200'
                              : isDarkMode ? 'hover:bg-slate-700/50' : 'hover:bg-gray-50'
                          } border border-transparent`}
                          onMouseEnter={() => setActiveSubMenu('bcms')}
                        >
                          <Shield className="h-8 w-8 text-blue-500 mb-2" />
                          <h3 className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            BCMS
                          </h3>
                          <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                            Business continuity
                          </p>
                        </div>
                      </Link>

                      <Link to="/services/application-security">
                        <div 
                          className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                            activeSubMenu === 'appsec' 
                              ? isDarkMode ? 'bg-blue-600/20 border-blue-500/30' : 'bg-blue-50 border-blue-200'
                              : isDarkMode ? 'hover:bg-slate-700/50' : 'hover:bg-gray-50'
                          } border border-transparent`}
                          onMouseEnter={() => setActiveSubMenu('appsec')}
                        >
                          <Lock className="h-8 w-8 text-blue-500 mb-2" />
                          <h3 className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            App Security
                          </h3>
                          <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                            Secure code
                          </p>
                        </div>
                      </Link>

                      <Link to="/services/cloud-security">
                        <div 
                          className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                            activeSubMenu === 'cloud' 
                              ? isDarkMode ? 'bg-blue-600/20 border-blue-500/30' : 'bg-blue-50 border-blue-200'
                              : isDarkMode ? 'hover:bg-slate-700/50' : 'hover:bg-gray-50'
                          } border border-transparent`}
                          onMouseEnter={() => setActiveSubMenu('cloud')}
                        >
                          <Shield className="h-8 w-8 text-blue-500 mb-2" />
                          <h3 className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Cloud Security
                          </h3>
                          <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                            Cloud protection
                          </p>
                        </div>
                      </Link>

                      {/* Row 2 */}
                      <Link to="/services/mobile-security">
                        <div 
                          className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                            activeSubMenu === 'mobile' 
                              ? isDarkMode ? 'bg-blue-600/20 border-blue-500/30' : 'bg-blue-50 border-blue-200'
                              : isDarkMode ? 'hover:bg-slate-700/50' : 'hover:bg-gray-50'
                          } border border-transparent`}
                          onMouseEnter={() => setActiveSubMenu('mobile')}
                        >
                          <Lock className="h-8 w-8 text-blue-500 mb-2" />
                          <h3 className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Mobile Security
                          </h3>
                          <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                            Mobile apps
                          </p>
                        </div>
                      </Link>

                      <Link to="/services/training">
                        <div 
                          className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                            activeSubMenu === 'training' 
                              ? isDarkMode ? 'bg-blue-600/20 border-blue-500/30' : 'bg-blue-50 border-blue-200'
                              : isDarkMode ? 'hover:bg-slate-700/50' : 'hover:bg-gray-50'
                          } border border-transparent`}
                          onMouseEnter={() => setActiveSubMenu('training')}
                        >
                          <Users className="h-8 w-8 text-blue-500 mb-2" />
                          <h3 className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Training
                          </h3>
                          <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                            Security education
                          </p>
                        </div>
                      </Link>

                      <Link to="/services/infrastructure">
                        <div 
                          className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                            activeSubMenu === 'infrastructure' 
                              ? isDarkMode ? 'bg-blue-600/20 border-blue-500/30' : 'bg-blue-50 border-blue-200'
                              : isDarkMode ? 'hover:bg-slate-700/50' : 'hover:bg-gray-50'
                          } border border-transparent`}
                          onMouseEnter={() => setActiveSubMenu('infrastructure')}
                        >
                          <Shield className="h-8 w-8 text-blue-500 mb-2" />
                          <h3 className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Infrastructure
                          </h3>
                          <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                            Network security
                          </p>
                        </div>
                      </Link>

                      <Link to="/contact">
                        <div 
                          className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                            activeSubMenu === 'raas' 
                              ? isDarkMode ? 'bg-blue-600/20 border-blue-500/30' : 'bg-blue-50 border-blue-200'
                              : isDarkMode ? 'hover:bg-slate-700/50' : 'hover:bg-gray-50'
                          } border border-transparent`}
                          onMouseEnter={() => setActiveSubMenu('raas')}
                        >
                          <Users className="h-8 w-8 text-blue-500 mb-2" />
                          <h3 className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            RaaS
                          </h3>
                          <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                            Managed resources
                          </p>
                        </div>
                      </Link>

                      <Link to="/contact">
                        <div 
                          className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                            activeSubMenu === 'vciso' 
                              ? isDarkMode ? 'bg-blue-600/20 border-blue-500/30' : 'bg-blue-50 border-blue-200'
                              : isDarkMode ? 'hover:bg-slate-700/50' : 'hover:bg-gray-50'
                          } border border-transparent`}
                          onMouseEnter={() => setActiveSubMenu('vciso')}
                        >
                          <Award className="h-8 w-8 text-blue-500 mb-2" />
                          <h3 className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            V-CISO
                          </h3>
                          <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                            Virtual CISO
                          </p>
                        </div>
                      </Link>
                    </div>

                    {/* Sub-services Section */}
                    {activeSubMenu && (
                      <div className={`border-t pt-4 ${isDarkMode ? 'border-slate-700/50' : 'border-gray-200'}`}>
                        <h4 className={`font-semibold mb-3 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                          {activeSubMenu === 'grc' && 'GRC Services'}
                          {activeSubMenu === 'tprm' && 'TPRM Services'}
                          {activeSubMenu === 'bcms' && 'BCMS Services'}
                          {activeSubMenu === 'appsec' && 'Application Security Services'}
                          {activeSubMenu === 'cloud' && 'Cloud Security Services'}
                          {activeSubMenu === 'mobile' && 'Mobile Security Services'}
                          {activeSubMenu === 'training' && 'Training Services'}
                          {activeSubMenu === 'infrastructure' && 'Infrastructure Services'}
                          {activeSubMenu === 'raas' && 'Resource Services'}
                          {activeSubMenu === 'vciso' && 'V-CISO Services'}
                        </h4>
                        <div className="grid grid-cols-4 gap-4">
                          {/* Dynamic sub-services based on activeSubMenu */}
                          {activeSubMenu === 'grc' && (
                            <>
                              <Link to="/contact" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                                <div className="font-medium text-sm">Risk Assessment</div>
                                <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Comprehensive risk analysis</div>
                              </Link>
                              <Link to="/contact" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                                <div className="font-medium text-sm">Compliance Management</div>
                                <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Regulatory compliance</div>
                              </Link>
                              <Link to="/contact" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                                <div className="font-medium text-sm">Policy Development</div>
                                <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Security policy creation</div>
                              </Link>
                              <Link to="/contact" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                                <div className="font-medium text-sm">Audit Support</div>
                                <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Audit preparation & support</div>
                              </Link>
                            </>
                          )}
                          {activeSubMenu === 'tprm' && (
                            <>
                              <Link to="/contact" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                                <div className="font-medium text-sm">Vendor Assessment</div>
                                <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Third-party security evaluation</div>
                              </Link>
                              <Link to="/contact" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                                <div className="font-medium text-sm">Risk Monitoring</div>
                                <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Continuous vendor monitoring</div>
                              </Link>
                              <Link to="/contact" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                                <div className="font-medium text-sm">Contract Security</div>
                                <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Security clauses & terms</div>
                              </Link>
                              <Link to="/contact" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                                <div className="font-medium text-sm">Due Diligence</div>
                                <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Vendor security reviews</div>
                              </Link>
                            </>
                          )}
                          {activeSubMenu === 'bcms' && (
                            <>
                              <Link to="/contact" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                                <div className="font-medium text-sm">Business Impact Analysis</div>
                                <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Critical process identification</div>
                              </Link>
                              <Link to="/contact" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                                <div className="font-medium text-sm">Recovery Planning</div>
                                <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Disaster recovery strategies</div>
                              </Link>
                              <Link to="/contact" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                                <div className="font-medium text-sm">Crisis Management</div>
                                <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Incident response planning</div>
                              </Link>
                              <Link to="/contact" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                                <div className="font-medium text-sm">Testing & Validation</div>
                                <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>BC plan testing</div>
                              </Link>
                            </>
                          )}
                          {activeSubMenu === 'appsec' && (
                            <>
                              <Link to="/contact" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                                <div className="font-medium text-sm">Code Review</div>
                                <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Static code analysis</div>
                              </Link>
                              <Link to="/contact" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                                <div className="font-medium text-sm">Penetration Testing</div>
                                <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Application pen testing</div>
                              </Link>
                              <Link to="/contact" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                                <div className="font-medium text-sm">SAST/DAST</div>
                                <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Automated security testing</div>
                              </Link>
                              <Link to="/contact" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                                <div className="font-medium text-sm">DevSecOps</div>
                                <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Security in CI/CD</div>
                              </Link>
                            </>
                          )}
                          {activeSubMenu === 'cloud' && (
                            <>
                              <Link to="/contact" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                                <div className="font-medium text-sm">Cloud Architecture</div>
                                <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Secure cloud design</div>
                              </Link>
                              <Link to="/contact" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                                <div className="font-medium text-sm">Data Protection</div>
                                <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Encryption & access control</div>
                              </Link>
                              <Link to="/contact" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                                <div className="font-medium text-sm">Compliance</div>
                                <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Cloud regulatory standards</div>
                              </Link>
                              <Link to="/contact" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                                <div className="font-medium text-sm">Migration Security</div>
                                <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Secure cloud migration</div>
                              </Link>
                            </>
                          )}
                          {activeSubMenu === 'mobile' && (
                            <>
                              <Link to="/contact" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                                <div className="font-medium text-sm">App Security Testing</div>
                                <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Mobile penetration testing</div>
                              </Link>
                              <Link to="/contact" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                                <div className="font-medium text-sm">Code Analysis</div>
                                <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Mobile app code review</div>
                              </Link>
                              <Link to="/contact" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                                <div className="font-medium text-sm">Data Protection</div>
                                <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Mobile data security</div>
                              </Link>
                              <Link to="/contact" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                                <div className="font-medium text-sm">Device Management</div>
                                <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>MDM/EMM solutions</div>
                              </Link>
                            </>
                          )}
                          {activeSubMenu === 'training' && (
                            <>
                              <Link to="/contact" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                                <div className="font-medium text-sm">Security Awareness</div>
                                <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Employee education programs</div>
                              </Link>
                              <Link to="/contact" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                                <div className="font-medium text-sm">Phishing Simulations</div>
                                <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Email security training</div>
                              </Link>
                              <Link to="/contact" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                                <div className="font-medium text-sm">Technical Training</div>
                                <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Specialized security skills</div>
                              </Link>
                              <Link to="/contact" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                                <div className="font-medium text-sm">Certification Prep</div>
                                <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Professional certifications</div>
                              </Link>
                            </>
                          )}
                          {activeSubMenu === 'infrastructure' && (
                            <>
                              <Link to="/contact" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                                <div className="font-medium text-sm">Network Security</div>
                                <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Firewall & IDS/IPS</div>
                              </Link>
                              <Link to="/contact" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                                <div className="font-medium text-sm">Endpoint Protection</div>
                                <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Device security management</div>
                              </Link>
                              <Link to="/contact" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                                <div className="font-medium text-sm">Server Hardening</div>
                                <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>System security configuration</div>
                              </Link>
                              <Link to="/contact" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                                <div className="font-medium text-sm">Monitoring & SIEM</div>
                                <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Security monitoring</div>
                              </Link>
                            </>
                          )}
                          {activeSubMenu === 'raas' && (
                            <>
                              <Link to="/contact" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                                <div className="font-medium text-sm">Security Specialists</div>
                                <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Expert consultants on-demand</div>
                              </Link>
                              <Link to="/contact" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                                <div className="font-medium text-sm">Project Teams</div>
                                <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Dedicated security teams</div>
                              </Link>
                              <Link to="/contact" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                                <div className="font-medium text-sm">Staff Augmentation</div>
                                <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Temporary security staff</div>
                              </Link>
                              <Link to="/contact" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                                <div className="font-medium text-sm">Managed Services</div>
                                <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Ongoing security management</div>
                              </Link>
                            </>
                          )}
                          {activeSubMenu === 'vciso' && (
                            <>
                              <Link to="/contact" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                                <div className="font-medium text-sm">Strategic Planning</div>
                                <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Security strategy development</div>
                              </Link>
                              <Link to="/contact" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                                <div className="font-medium text-sm">Board Reporting</div>
                                <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Executive security reporting</div>
                              </Link>
                              <Link to="/contact" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                                <div className="font-medium text-sm">Program Management</div>
                                <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Security program oversight</div>
                              </Link>
                              <Link to="/contact" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                                <div className="font-medium text-sm">Budget Planning</div>
                                <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Security investment planning</div>
                              </Link>
                            </>
                          )}
                        </div>
                      </div>
                    )}
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
            <div className="border-t border-slate-700/30 pt-4 pb-6 space-y-3 max-h-[75vh] overflow-y-auto px-2"
              onWheel={(e) => {
                e.stopPropagation();
              }}
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: isDarkMode ? '#3b82f6 transparent' : '#2563eb transparent'
              }}
            >
              {/* Home Link */}
              <div className="space-y-1">
                <Link to="/" className={`block py-3 px-2 font-medium transition-colors rounded-lg ${
                  isDarkMode 
                    ? 'text-slate-300 hover:text-blue-400 hover:bg-slate-700/30' 
                    : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50/50'
                }`} onClick={() => setIsMobileMenuOpen(false)}>
                  Home
                </Link>
              </div>
              
              {/* Services Section */}
              <div className="space-y-3">
                <div className={`font-semibold text-sm uppercase tracking-wide ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  Services
                </div>
                <div className="pl-2 space-y-1">
                  <Link to="/contact" className={`block py-2 px-2 text-sm transition-colors rounded-lg ${
                    isDarkMode 
                      ? 'text-slate-300 hover:text-blue-400 hover:bg-slate-700/30' 
                      : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50/50'
                  }`} onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 flex-shrink-0" />
                      <span className="text-xs leading-tight">Governance, Risk & Compliance (GRC)</span>
                    </div>
                  </Link>
                  <Link to="/contact" className={`block py-2 px-2 text-sm transition-colors rounded-lg ${
                    isDarkMode 
                      ? 'text-slate-300 hover:text-blue-400 hover:bg-slate-700/30' 
                      : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50/50'
                  }`} onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 flex-shrink-0" />
                      <span className="text-xs leading-tight">Third-Party Risk Management (TPRM) Services</span>
                    </div>
                  </Link>
                  <Link to="/contact" className={`block py-2 px-2 text-sm transition-colors rounded-lg ${
                    isDarkMode 
                      ? 'text-slate-300 hover:text-blue-400 hover:bg-slate-700/30' 
                      : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50/50'
                  }`} onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 flex-shrink-0" />
                      <span className="text-xs leading-tight">Business Continuity Management System (BCMS) Services</span>
                    </div>
                  </Link>
                  <Link to="/contact" className={`block py-2 px-2 text-sm transition-colors rounded-lg ${
                    isDarkMode 
                      ? 'text-slate-300 hover:text-blue-400 hover:bg-slate-700/30' 
                      : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50/50'
                  }`} onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="flex items-center space-x-2">
                      <Lock className="h-4 w-4 flex-shrink-0" />
                      <span className="text-xs leading-tight">Application Security</span>
                    </div>
                  </Link>
                  <Link to="/contact" className={`block py-2 px-2 text-sm transition-colors rounded-lg ${
                    isDarkMode 
                      ? 'text-slate-300 hover:text-blue-400 hover:bg-slate-700/30' 
                      : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50/50'
                  }`} onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 flex-shrink-0" />
                      <span className="text-xs leading-tight">Cloud Security</span>
                    </div>
                  </Link>
                  <Link to="/contact" className={`block py-2 px-2 text-sm transition-colors rounded-lg ${
                    isDarkMode 
                      ? 'text-slate-300 hover:text-blue-400 hover:bg-slate-700/30' 
                      : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50/50'
                  }`} onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="flex items-center space-x-2">
                      <Lock className="h-4 w-4 flex-shrink-0" />
                      <span className="text-xs leading-tight">Mobile App Security</span>
                    </div>
                  </Link>
                  <Link to="/contact" className={`block py-2 px-2 text-sm transition-colors rounded-lg ${
                    isDarkMode 
                      ? 'text-slate-300 hover:text-blue-400 hover:bg-slate-700/30' 
                      : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50/50'
                  }`} onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 flex-shrink-0" />
                      <span className="text-xs leading-tight">Training and Awareness</span>
                    </div>
                  </Link>
                  <Link to="/contact" className={`block py-2 px-2 text-sm transition-colors rounded-lg ${
                    isDarkMode 
                      ? 'text-slate-300 hover:text-blue-400 hover:bg-slate-700/30' 
                      : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50/50'
                  }`} onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 flex-shrink-0" />
                      <span className="text-xs leading-tight">Infrastructure Security Services</span>
                    </div>
                  </Link>
                  <Link to="/contact" className={`block py-2 px-2 text-sm transition-colors rounded-lg ${
                    isDarkMode 
                      ? 'text-slate-300 hover:text-blue-400 hover:bg-slate-700/30' 
                      : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50/50'
                  }`} onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 flex-shrink-0" />
                      <span className="text-xs leading-tight">Resource as a Services</span>
                    </div>
                  </Link>
                  <Link to="/contact" className={`block py-2 px-2 text-sm transition-colors rounded-lg ${
                    isDarkMode 
                      ? 'text-slate-300 hover:text-blue-400 hover:bg-slate-700/30' 
                      : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50/50'
                  }`} onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="flex items-center space-x-2">
                      <Award className="h-4 w-4 flex-shrink-0" />
                      <span className="text-xs leading-tight">V-CISO</span>
                    </div>
                  </Link>
                  <Link to="/compliance" className={`block py-2 px-2 text-sm transition-colors rounded-lg ${
                    isDarkMode 
                      ? 'text-slate-300 hover:text-blue-400 hover:bg-slate-700/30' 
                      : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50/50'
                  }`} onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="flex items-center space-x-2">
                      <Award className="h-4 w-4 flex-shrink-0" />
                      <span className="text-xs leading-tight">Compliance</span>
                    </div>
                  </Link>
                </div>
              </div>

              {/* About Us Section */}
              <div className="space-y-3">
                <div className={`font-semibold text-sm uppercase tracking-wide ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  About Us
                </div>
                <div className="pl-2 space-y-1">
                  <Link to="/philosophy" className={`block py-2 px-2 text-sm transition-colors rounded-lg ${
                    isDarkMode 
                      ? 'text-slate-300 hover:text-blue-400 hover:bg-slate-700/30' 
                      : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50/50'
                  }`} onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="flex items-center space-x-2">
                      <Award className="h-4 w-4 flex-shrink-0" />
                      <span className="text-xs leading-tight">Our Philosophy</span>
                    </div>
                  </Link>
                  <Link to="/team" className={`block py-2 px-2 text-sm transition-colors rounded-lg ${
                    isDarkMode 
                      ? 'text-slate-300 hover:text-blue-400 hover:bg-slate-700/30' 
                      : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50/50'
                  }`} onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 flex-shrink-0" />
                      <span className="text-xs leading-tight">Our Team</span>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Main Navigation */}
              <div className="space-y-1 border-t border-slate-700/30 pt-4">
                <Link to="/news" className={`block py-3 px-2 font-medium transition-colors rounded-lg ${
                  isDarkMode 
                    ? 'text-slate-300 hover:text-blue-400 hover:bg-slate-700/30' 
                    : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50/50'
                }`} onClick={() => setIsMobileMenuOpen(false)}>
                  News & Blogs
                </Link>
                <Link to="/careers" className={`block py-3 px-2 font-medium transition-colors rounded-lg ${
                  isDarkMode 
                    ? 'text-slate-300 hover:text-blue-400 hover:bg-slate-700/30' 
                    : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50/50'
                }`} onClick={() => setIsMobileMenuOpen(false)}>
                  Careers
                </Link>
                <Link to="/contact" className={`block py-3 px-2 font-medium transition-colors rounded-lg ${
                  isDarkMode 
                    ? 'text-slate-300 hover:text-blue-400 hover:bg-slate-700/30' 
                    : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50/50'
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
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-8">
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
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <AnimatedContainer animation="slideRight" duration={700} className="text-center lg:text-left lg:col-span-2 px-4 sm:px-0">
              <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r bg-clip-text text-transparent leading-tight ${
                isDarkMode 
                  ? 'from-blue-400 via-blue-300 to-indigo-300' 
                  : 'from-blue-600 via-blue-700 to-indigo-700'
              }`}>
                <span className="block">Advanced</span>
                <span className="block">Cyber</span>
                <span className="block">Security</span>
              </h1>
              <AnimatedContainer animation="fadeIn" delay={200} duration={600}>
                <p className={`text-base sm:text-lg md:text-xl mb-6 sm:mb-8 leading-relaxed max-w-full mx-auto lg:mx-0 ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  Protecting your digital assets with next-generation security solutions. 
                  Stay ahead of threats with our cutting-edge cybersecurity expertise.
                </p>
              </AnimatedContainer>
              <AnimatedContainer animation="slideUp" delay={400} duration={600}>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start max-w-md mx-auto lg:mx-0">
                  <Link 
                    to="/contact"
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl text-base font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center shadow-lg shadow-blue-500/25 animate-glow"
                  >
                    Start Protection <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link 
                    to="/about"
                    className={`backdrop-blur-sm border-2 px-6 py-3 rounded-xl text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ${
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
            <AnimatedContainer animation="slideLeft" delay={300} duration={800} className="flex justify-center lg:justify-end lg:col-span-3 mt-8 lg:mt-0">
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
      <section id="services" className={`py-16 backdrop-blur-sm ${
        isDarkMode ? 'bg-slate-800/50' : 'bg-white/50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedContainer animation="fadeIn" className="text-center mb-12">
            <h2 className={`text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r bg-clip-text text-transparent ${
              isDarkMode 
                ? 'from-blue-400 to-indigo-300' 
                : 'from-blue-600 to-indigo-700'
            }`}>
              Our Services
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${
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
      <section id="about" className={`py-16 bg-gradient-to-br ${
        isDarkMode 
          ? 'from-slate-800 to-slate-900' 
          : 'from-blue-50 to-indigo-50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedContainer animation="slideRight" duration={700}>
              <h2 className={`text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent ${
                isDarkMode 
                  ? 'from-blue-400 to-indigo-300' 
                  : 'from-blue-600 to-indigo-700'
              }`}>
                Why Choose Us
              </h2>
              <p className={`text-lg mb-6 leading-relaxed ${
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
      <section id="team" className={`py-16 backdrop-blur-sm ${
        isDarkMode ? 'bg-slate-800/50' : 'bg-white/50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedContainer animation="fadeIn" className="text-center mb-12">
            <h2 className={`text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r bg-clip-text text-transparent ${
              isDarkMode 
                ? 'from-blue-400 to-indigo-300' 
                : 'from-blue-600 to-indigo-700'
            }`}>
              Security Experts
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${
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
      <section id="contact" className={`py-16 bg-gradient-to-br ${
        isDarkMode 
          ? 'from-slate-800 to-slate-900' 
          : 'from-blue-50 to-indigo-50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedContainer animation="fadeIn" className="text-center mb-12">
            <h2 className={`text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r bg-clip-text text-transparent ${
              isDarkMode 
                ? 'from-blue-400 to-indigo-300' 
                : 'from-blue-600 to-indigo-700'
            }`}>
              Get Protected Today
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${
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
                  <img src="/RNR-WEB_DEMO/rnrlogo.png" alt="RNR Consulting" className="h-8 w-8" />
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
            <p>&copy; 2025 RNR Consulting. All rights reserved. Securing your digital future.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;