import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Eye, Lock, CheckCircle, ArrowRight, Mail, Phone, MapPin, FileText } from 'lucide-react';

const APISecurityAssessment: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">RNR Consulting</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-white/80 hover:text-white transition-colors">Home</Link>
              <Link to="/services" className="text-white/80 hover:text-white transition-colors">Services</Link>
              <Link to="/about" className="text-white/80 hover:text-white transition-colors">About</Link>
              <Link to="/contact" className="text-white/80 hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-blue-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-sm border border-blue-400/30">
            <Eye className="h-10 w-10 text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            API Security Assessment
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Comprehensive security testing for REST, GraphQL, and SOAP APIs to ensure secure data exchange, 
            proper authentication, and protection against API-specific attacks and vulnerabilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </Link>
            <a
              href="#services"
              className="border border-blue-400 text-blue-400 hover:bg-blue-400/10 px-8 py-3 rounded-lg font-medium transition-all duration-300"
            >
              View Services
            </a>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our API Security Assessment Services
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Comprehensive security testing for all types of APIs using industry-leading methodologies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8 hover:bg-white/15 transition-all duration-300">
              <div className="bg-blue-500/20 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Eye className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">REST API Security Testing</h3>
              <p className="text-white/80 mb-6">
                Comprehensive security assessment of RESTful APIs and HTTP endpoints
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2 text-sm text-white/70">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>HTTP method security testing</span>
                </li>
                <li className="flex items-center space-x-2 text-sm text-white/70">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>JSON payload validation</span>
                </li>
                <li className="flex items-center space-x-2 text-sm text-white/70">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Resource-based URL analysis</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8 hover:bg-white/15 transition-all duration-300">
              <div className="bg-purple-500/20 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">GraphQL Security Assessment</h3>
              <p className="text-white/80 mb-6">
                Specialized testing for GraphQL APIs and query mechanisms
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2 text-sm text-white/70">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Query complexity analysis</span>
                </li>
                <li className="flex items-center space-x-2 text-sm text-white/70">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Schema introspection testing</span>
                </li>
                <li className="flex items-center space-x-2 text-sm text-white/70">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Mutation security validation</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8 hover:bg-white/15 transition-all duration-300">
              <div className="bg-indigo-500/20 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Lock className="h-8 w-8 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">SOAP API Security Testing</h3>
              <p className="text-white/80 mb-6">
                Security evaluation of SOAP-based web services
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2 text-sm text-white/70">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>WSDL security analysis</span>
                </li>
                <li className="flex items-center space-x-2 text-sm text-white/70">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>XML injection testing</span>
                </li>
                <li className="flex items-center space-x-2 text-sm text-white/70">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>SOAPAction validation</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8 hover:bg-white/15 transition-all duration-300">
              <div className="bg-green-500/20 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Authentication & Authorization</h3>
              <p className="text-white/80 mb-6">
                Comprehensive testing of API authentication mechanisms
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2 text-sm text-white/70">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>JWT token security analysis</span>
                </li>
                <li className="flex items-center space-x-2 text-sm text-white/70">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>OAuth/OAuth2 testing</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8 hover:bg-white/15 transition-all duration-300">
              <div className="bg-red-500/20 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Eye className="h-8 w-8 text-red-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">OWASP API Top 10</h3>
              <p className="text-white/80 mb-6">
                Testing against all OWASP API security vulnerabilities
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2 text-sm text-white/70">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Broken object level authorization</span>
                </li>
                <li className="flex items-center space-x-2 text-sm text-white/70">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Broken authentication testing</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8 hover:bg-white/15 transition-all duration-300">
              <div className="bg-yellow-500/20 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <FileText className="h-8 w-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Security Documentation</h3>
              <p className="text-white/80 mb-6">
                Comprehensive reporting and remediation guidance
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2 text-sm text-white/70">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Executive summary reports</span>
                </li>
                <li className="flex items-center space-x-2 text-sm text-white/70">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Remediation recommendations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md border border-white/20 rounded-2xl p-12">
            <div className="bg-blue-500/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Eye className="h-8 w-8 text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Ready to Secure Your APIs?</h2>
            <p className="text-xl text-white/80 mb-8">
              Protect your APIs from security threats with our comprehensive assessment service.
            </p>
            <Link
              to="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-2"
            >
              <span>Contact Us Today</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-black/40 backdrop-blur-md border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">RNR Consulting</span>
              </div>
              <p className="text-white/70">
                Comprehensive API security assessment services to protect your applications and data.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-white/70">
                <li><Link to="/services" className="hover:text-white transition-colors">All Services</Link></li>
                <li><Link to="/services/grc" className="hover:text-white transition-colors">GRC Services</Link></li>
                <li><Link to="/services/cybersecurity" className="hover:text-white transition-colors">Cybersecurity</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-white/70">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-white/70">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>api@rnrconsulting.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>New York, NY</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 mt-8 text-center text-white/60">
            <p>&copy; 2024 RNR Consulting. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default APISecurityAssessment;
