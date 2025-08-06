import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, X, Search, Sun, Moon, ChevronDown,
  Users, Award, Lock, Shield
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Navigation: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

  // Prevent background scroll when dropdown or mobile menu is open
  useEffect(() => {
    if (isServicesOpen || isMobileMenuOpen || isAboutOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isServicesOpen, isMobileMenuOpen, isAboutOpen]);

  return (
    <nav className={`fixed top-2 sm:top-4 left-1/2 transform -translate-x-1/2 w-[98%] sm:w-[95%] max-w-7xl backdrop-blur-md border rounded-2xl z-50 shadow-lg transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-slate-800/20 border-slate-700/30 shadow-blue-900/10' 
        : 'bg-white/20 border-white/30 shadow-blue-500/10'
    }`}>
      <div className="px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3">
            <div className={`rounded-xl shadow-lg transition-colors duration-300 ${
              isDarkMode ? '' : 'p-2 bg-white'
            }`}>
              <img 
                src={isDarkMode ? "./rnrlogo_for_darkmode.png" : "./rnrlogo.png"} 
                alt="RNR Consulting" 
                className="h-6 w-6 sm:h-8 sm:w-8" 
              />
            </div>
            <span className={`text-lg sm:text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent transition-colors duration-300 ${
              isDarkMode 
                ? 'from-blue-400 to-blue-300' 
                : 'from-blue-600 to-blue-800'
            }`}>
              RNR Consulting
            </span>
          </Link>
          
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
              <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 w-screen max-w-6xl backdrop-blur-md border rounded-xl shadow-lg transition-all duration-300 z-50 ${
                isServicesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
              } ${
                isDarkMode 
                  ? 'bg-slate-800/95 border-slate-700/30 shadow-blue-900/20' 
                  : 'bg-white/95 border-white/30 shadow-blue-500/20'
              }`}>
                <div className="p-6">
                  {/* Main Services Grid */}
                  <div className="grid grid-cols-5 gap-6 mb-6">
                    {/* Row 1 */}
                    <Link to="/services/grc" 
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
                        Governance, Risk & Compliance
                      </p>
                    </Link>

                    <Link to="/services/tprm" 
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
                        Third-Party Risk Management
                      </p>
                    </Link>

                    <Link to="/services/bcms" 
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
                        Business Continuity Management
                      </p>
                    </Link>

                    <Link to="/services/application-security" 
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
                        Application Security Services
                      </p>
                    </Link>

                    <Link to="/services/cloud-security" 
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
                        Cloud Security Services
                      </p>
                    </Link>

                    {/* Row 2 */}
                    <Link to="/services/mobile-security" 
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
                        Mobile Application Security
                      </p>
                    </Link>

                    <Link to="/services/training-awareness" 
                      className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                        activeSubMenu === 'training' 
                          ? isDarkMode ? 'bg-blue-600/20 border-blue-500/30' : 'bg-blue-50 border-blue-200'
                          : isDarkMode ? 'hover:bg-slate-700/50' : 'hover:bg-gray-50'
                      } border border-transparent`}
                      onMouseEnter={() => setActiveSubMenu('training')}
                    >
                      <Users className="h-8 w-8 text-blue-500 mb-2" />
                      <h3 className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Training & Awareness
                      </h3>
                      <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                        Security Training Services
                      </p>
                    </Link>

                    <Link to="/services/infrastructure-security" 
                      className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                        activeSubMenu === 'infrastructure' 
                          ? isDarkMode ? 'bg-blue-600/20 border-blue-500/30' : 'bg-blue-50 border-blue-200'
                          : isDarkMode ? 'hover:bg-slate-700/50' : 'hover:bg-gray-50'
                      } border border-transparent`}
                      onMouseEnter={() => setActiveSubMenu('infrastructure')}
                    >
                      <Shield className="h-8 w-8 text-blue-500 mb-2" />
                      <h3 className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Infrastructure Security
                      </h3>
                      <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                        Infrastructure Security Services
                      </p>
                    </Link>

                    <Link to="/services/resource-as-services" 
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
                        Resource as a Services
                      </p>
                    </Link>

                    <Link to="/services/virtual-ciso" 
                      className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                        activeSubMenu === 'vciso' 
                          ? isDarkMode ? 'bg-blue-600/20 border-blue-500/30' : 'bg-blue-50 border-blue-200'
                          : isDarkMode ? 'hover:bg-slate-700/50' : 'hover:bg-gray-50'
                      } border border-transparent`}
                      onMouseEnter={() => setActiveSubMenu('vciso')}
                    >
                      <Award className="h-8 w-8 text-blue-500 mb-2" />
                      <h3 className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Virtual CISO
                      </h3>
                      <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                        Virtual CISO Services
                      </p>
                    </Link>
                  </div>

                  {/* Sub-services Section */}
                  {activeSubMenu && (
                    <div className={`border-t pt-4 ${isDarkMode ? 'border-slate-700/50' : 'border-gray-200'}`}>
                      <h4 className={`font-semibold mb-3 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        {activeSubMenu === 'grc' && 'GRC Service Classifications'}
                        {activeSubMenu === 'tprm' && 'TPRM Service Classifications'}
                        {activeSubMenu === 'bcms' && 'BCMS Service Classifications'}
                        {activeSubMenu === 'appsec' && 'Application Security Services'}
                        {activeSubMenu === 'cloud' && 'Cloud Security Services'}
                        {activeSubMenu === 'mobile' && 'Mobile Security Services'}
                        {activeSubMenu === 'training' && 'Training & Awareness Services'}
                        {activeSubMenu === 'infrastructure' && 'Infrastructure Security Services'}
                        {activeSubMenu === 'raas' && 'Resource as a Service'}
                        {activeSubMenu === 'vciso' && 'V-CISO Services'}
                      </h4>
                      <div className="grid grid-cols-3 gap-4">
                        {/* GRC Classifications */}
                        {activeSubMenu === 'grc' && (
                          <>
                            <Link to="/services/grc/governance-services" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                              <div className="font-medium text-sm">Governance Services</div>
                              <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Policy & framework development</div>
                            </Link>
                            <Link to="/services/grc/risk-management-services" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                              <div className="font-medium text-sm">Risk Management Services</div>
                              <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Enterprise risk assessment</div>
                            </Link>
                            <Link to="/services/grc/compliance-audit-services" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                              <div className="font-medium text-sm">Compliance & Audit Services</div>
                              <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Regulatory compliance</div>
                            </Link>
                          </>
                        )}

                        {/* TPRM Classifications */}
                        {activeSubMenu === 'tprm' && (
                          <>
                            <Link to="/services/tprm/program-design-implementation" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                              <div className="font-medium text-sm">Program Design & Implementation</div>
                              <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>TPRM framework setup</div>
                            </Link>
                            <Link to="/services/tprm/vendor-risk-assessment" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                              <div className="font-medium text-sm">Vendor Risk Assessment</div>
                              <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Risk evaluation</div>
                            </Link>
                            <Link to="/services/tprm/assessment-tools" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                              <div className="font-medium text-sm">Third-Party Assessment Tools</div>
                              <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Automated platforms</div>
                            </Link>
                            <Link to="/services/tprm/ongoing-monitoring" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                              <div className="font-medium text-sm">Ongoing Monitoring & Reassessments</div>
                              <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Continuous assessment</div>
                            </Link>
                            <Link to="/services/tprm/remediation-governance" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                              <div className="font-medium text-sm">Remediation & Governance</div>
                              <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Risk mitigation</div>
                            </Link>
                          </>
                        )}

                        {/* BCMS Classifications */}
                        {activeSubMenu === 'bcms' && (
                          <>
                            <Link to="/services/bcms/framework-design-implementation" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                              <div className="font-medium text-sm">BCMS Framework Design & Implementation</div>
                              <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Framework design</div>
                            </Link>
                            <Link to="/services/bcms/business-impact-analysis" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                              <div className="font-medium text-sm">Business Impact Analysis (BIA)</div>
                              <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Impact assessment</div>
                            </Link>
                            <Link to="/services/bcms/risk-assessment-strategy" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                              <div className="font-medium text-sm">Risk Assessment & Strategy Development</div>
                              <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Strategy development</div>
                            </Link>
                            <Link to="/services/bcms/plan-development" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                              <div className="font-medium text-sm">Business Continuity & DR Plan Development</div>
                              <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Plan creation</div>
                            </Link>
                            <Link to="/services/bcms/testing-drills" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                              <div className="font-medium text-sm">Testing & Drills</div>
                              <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Testing procedures</div>
                            </Link>
                            <Link to="/services/bcms/monitoring-maintenance" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                              <div className="font-medium text-sm">Monitoring & Maintenance</div>
                              <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Ongoing maintenance</div>
                            </Link>
                          </>
                        )}

                        {/* Application Security Services */}
                        {activeSubMenu === 'appsec' && (
                          <>
                            <Link to="/services/application-security/thick-client-vapt" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                              <div className="font-medium text-sm">Thick Client VAPT</div>
                              <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Desktop application testing</div>
                            </Link>
                            <Link to="/services/application-security/web-vapt" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                              <div className="font-medium text-sm">Web Application VAPT</div>
                              <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Web application testing</div>
                            </Link>
                            <Link to="/services/application-security/api-vapt" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                              <div className="font-medium text-sm">API VAPT</div>
                              <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>API security testing</div>
                            </Link>
                          </>
                        )}

                        {/* Cloud Security Services */}
                        {activeSubMenu === 'cloud' && (
                          <>
                            <Link to="/services/cloud-security/cloud-vapt" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                              <div className="font-medium text-sm">Cloud VAPT</div>
                              <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Cloud infrastructure testing</div>
                            </Link>
                            <Link to="/services/cloud-security/cloud-config-review" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                              <div className="font-medium text-sm">Cloud Configuration Review</div>
                              <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Configuration assessment</div>
                            </Link>
                            <Link to="/services/cloud-security/cspm" className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                              <div className="font-medium text-sm">CSPM</div>
                              <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Cloud Security Posture Management</div>
                            </Link>
                          </>
                        )}

                        {/* Other service categories would go here similarly */}
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
                  <Link to="/about" className={`block px-4 py-3 transition-colors ${
                    isDarkMode 
                      ? 'text-slate-300 hover:text-blue-400 hover:bg-slate-700/50' 
                      : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50/50'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <Users className="h-4 w-4" />
                      <div>
                        <div className="font-medium">About Us</div>
                        <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Our story & mission</div>
                      </div>
                    </div>
                  </Link>
                  
                  <Link to="/philosophy" className={`block px-4 py-3 transition-colors ${
                    isDarkMode 
                      ? 'text-slate-300 hover:text-blue-400 hover:bg-slate-700/50' 
                      : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50/50'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <Award className="h-4 w-4" />
                      <div>
                        <div className="font-medium">Our Philosophy</div>
                        <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Our approach & values</div>
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

            {/* Mobile Menu Button */}
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
          <div className="border-t border-slate-700/30 pt-4 pb-6 space-y-3 max-h-[75vh] overflow-y-auto px-2">
            {/* Mobile Home Link */}
            <Link to="/" className={`block py-3 px-2 font-medium transition-colors rounded-lg ${
              isDarkMode 
                ? 'text-slate-300 hover:text-blue-400 hover:bg-slate-700/30' 
                : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50/50'
            }`} onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>

            {/* Mobile Services Section */}
            <div className="space-y-3">
              <div className={`font-semibold px-2 py-1 text-sm ${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              }`}>
                Services
              </div>
              <div className="pl-2 space-y-1">
                <Link to="/services/grc" className={`block py-2 px-2 text-sm transition-colors rounded-lg ${
                  isDarkMode 
                    ? 'text-slate-300 hover:text-blue-400 hover:bg-slate-700/30' 
                    : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50/50'
                }`} onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 flex-shrink-0" />
                    <span className="text-xs leading-tight">Governance, Risk & Compliance (GRC)</span>
                  </div>
                </Link>
                <Link to="/services/tprm" className={`block py-2 px-2 text-sm transition-colors rounded-lg ${
                  isDarkMode 
                    ? 'text-slate-300 hover:text-blue-400 hover:bg-slate-700/30' 
                    : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50/50'
                }`} onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 flex-shrink-0" />
                    <span className="text-xs leading-tight">Third-Party Risk Management (TPRM)</span>
                  </div>
                </Link>
                <Link to="/services/bcms" className={`block py-2 px-2 text-sm transition-colors rounded-lg ${
                  isDarkMode 
                    ? 'text-slate-300 hover:text-blue-400 hover:bg-slate-700/30' 
                    : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50/50'
                }`} onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 flex-shrink-0" />
                    <span className="text-xs leading-tight">Business Continuity Management (BCMS)</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Mobile About Us Section */}
            <div className="space-y-3">
              <div className={`font-semibold px-2 py-1 text-sm ${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              }`}>
                About Us
              </div>
              <div className="pl-2 space-y-1">
                <Link to="/about" className={`block py-2 px-2 text-sm transition-colors rounded-lg ${
                  isDarkMode 
                    ? 'text-slate-300 hover:text-blue-400 hover:bg-slate-700/30' 
                    : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50/50'
                }`} onClick={() => setIsMobileMenuOpen(false)}>
                  About RNR
                </Link>
                <Link to="/philosophy" className={`block py-2 px-2 text-sm transition-colors rounded-lg ${
                  isDarkMode 
                    ? 'text-slate-300 hover:text-blue-400 hover:bg-slate-700/30' 
                    : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50/50'
                }`} onClick={() => setIsMobileMenuOpen(false)}>
                  Philosophy
                </Link>
                <Link to="/team" className={`block py-2 px-2 text-sm transition-colors rounded-lg ${
                  isDarkMode 
                    ? 'text-slate-300 hover:text-blue-400 hover:bg-slate-700/30' 
                    : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50/50'
                }`} onClick={() => setIsMobileMenuOpen(false)}>
                  Team
                </Link>
              </div>
            </div>

            {/* Mobile Other Links */}
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
              <Link to="/contact" className={`block py-3 px-2 font-medium transition-all duration-300 rounded-lg ${
                isDarkMode 
                  ? 'text-blue-400 hover:text-blue-300 hover:bg-slate-700/30' 
                  : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50/50'
              }`} onClick={() => setIsMobileMenuOpen(false)}>
                Contact Us
              </Link>
            </div>

            {/* Mobile Search Bar */}
            <div className="border-t border-slate-700/30 pt-4">
              <div className={`relative rounded-xl border transition-colors ${
                isDarkMode 
                  ? 'bg-slate-700/50 border-slate-600' 
                  : 'bg-white/50 border-blue-200'
              }`}>
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className={`w-full px-4 py-3 bg-transparent focus:outline-none ${
                    isDarkMode ? 'text-slate-300 placeholder-slate-400' : 'text-slate-700 placeholder-slate-500'
                  }`}
                />
                <Search className={`absolute right-3 top-3.5 h-5 w-5 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
