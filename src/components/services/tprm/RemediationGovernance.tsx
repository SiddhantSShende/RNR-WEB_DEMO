import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { Shield, Settings, AlertTriangle, FileCheck, CheckCircle, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';

// Animated background component
function AnimatedBackground() {
  return (
    <Canvas className="absolute inset-0 -z-10">
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* Animated spheres */}
      {[...Array(20)].map((_, i) => (
        <Sphere
          key={i}
          position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20
          ]}
          scale={Math.random() * 0.5 + 0.1}
        >
          <meshStandardMaterial
            color={new THREE.Color().setHSL(0.6, 0.7, 0.5 + Math.random() * 0.3)}
            transparent
            opacity={0.6}
          />
        </Sphere>
      ))}
    </Canvas>
  );
}

const RemediationGovernance: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    service: 'TPRM Remediation & Governance'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const services = [
    {
      title: 'Risk Remediation Planning',
      description: 'Strategic planning and prioritization for addressing identified third-party risks',
      features: [
        'Risk treatment plan development',
        'Remediation prioritization matrix',
        'Cost-benefit analysis for remediation',
        'Timeline and milestone planning'
      ]
    },
    {
      title: 'Vendor Remediation Support',
      description: 'Direct support for vendors in addressing identified risks and deficiencies',
      features: [
        'Remediation guidance and consultation',
        'Technical assistance programs',
        'Best practice recommendations',
        'Progress monitoring and validation'
      ]
    },
    {
      title: 'Contract Risk Mitigation',
      description: 'Contract modifications and addendums to address identified risks',
      features: [
        'Contract amendment development',
        'Service level agreement updates',
        'Risk allocation negotiations',
        'Legal and compliance reviews'
      ]
    },
    {
      title: 'TPRM Governance Framework',
      description: 'Comprehensive governance structure for third-party risk management programs',
      features: [
        'Governance committee establishment',
        'Risk oversight responsibilities',
        'Decision-making frameworks',
        'Escalation procedures and protocols'
      ]
    },
    {
      title: 'Policy & Procedure Management',
      description: 'Development and maintenance of TPRM policies and procedures',
      features: [
        'Policy development and updates',
        'Procedure documentation',
        'Training material creation',
        'Change management processes'
      ]
    },
    {
      title: 'Program Performance Management',
      description: 'Measurement and optimization of TPRM program effectiveness',
      features: [
        'Key performance indicator tracking',
        'Program maturity assessments',
        'Continuous improvement initiatives',
        'Stakeholder reporting and communication'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">RNR Consulting</span>
              </Link>
              
              <div className="hidden md:flex items-center space-x-8">
                <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</Link>
                <Link to="/services" className="text-gray-600 hover:text-blue-600 transition-colors">Services</Link>
                <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors">About</Link>
                <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Breadcrumb */}
        <div className="bg-blue-600/5 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 text-sm">
              <Link to="/" className="text-gray-500 hover:text-blue-600">Home</Link>
              <span className="text-gray-400">/</span>
              <Link to="/services" className="text-gray-500 hover:text-blue-600">Services</Link>
              <span className="text-gray-400">/</span>
              <Link to="/services/tprm" className="text-gray-500 hover:text-blue-600">TPRM</Link>
              <span className="text-gray-400">/</span>
              <span className="text-blue-600 font-medium">Remediation & Governance</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
              <Settings className="h-10 w-10 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Remediation & <span className="text-blue-600">Governance</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Comprehensive remediation planning and governance frameworks to address identified risks 
              and establish effective oversight of your third-party risk management program.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
              <a
                href="#services"
                className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                View Services
              </a>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Remediation & Governance Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Transform identified risks into actionable remediation plans while establishing 
                robust governance frameworks for ongoing program success.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className="p-8">
                    <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                      <AlertTriangle className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Why Choose Our Remediation & Governance Services?
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4 flex-shrink-0">
                      <Settings className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Structured Approach</h3>
                      <p className="text-gray-600">
                        Systematic and structured approach to remediation planning and 
                        governance framework implementation.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4 flex-shrink-0">
                      <FileCheck className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Proven Methodologies</h3>
                      <p className="text-gray-600">
                        Industry-proven methodologies and best practices for effective 
                        risk remediation and program governance.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4 flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Sustainable Solutions</h3>
                      <p className="text-gray-600">
                        Focus on sustainable, long-term solutions that evolve with your 
                        organization's changing risk landscape.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl">
                <div className="text-center">
                  <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Settings className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready for Remediation?</h3>
                  <p className="text-gray-600 mb-6">
                    Transform identified risks into actionable remediation plans and robust governance.
                  </p>
                  <Link
                    to="#contact"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center"
                  >
                    Contact Us Today
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Get Started with Remediation & Governance
              </h2>
              <p className="text-xl text-gray-600">
                Contact us to discuss your remediation needs and governance requirements and learn how we can help 
                you establish effective oversight of your TPRM program.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your.email@company.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your company name"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                      Service Interest
                    </label>
                    <input
                      type="text"
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                      readOnly
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tell us about your remediation and governance requirements..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in touch</h3>
                  <p className="text-gray-600 mb-8">
                    Ready to establish effective remediation processes and governance frameworks? Our experts 
                    are here to help you transform risks into actionable solutions.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">Email Us</h4>
                      <p className="text-gray-600">governance@rnrconsulting.com</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <Phone className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">Call Us</h4>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <MapPin className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">Visit Us</h4>
                      <p className="text-gray-600">
                        123 Business District<br />
                        New York, NY 10001
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Why Choose RNR Consulting?</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Structured remediation planning
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Robust governance frameworks
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Proven methodologies
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Sustainable solutions
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="col-span-1">
                <div className="flex items-center space-x-2 mb-4">
                  <Shield className="h-8 w-8 text-blue-400" />
                  <span className="text-xl font-bold">RNR Consulting</span>
                </div>
                <p className="text-gray-400">
                  Expert TPRM remediation and governance services for effective third-party risk management.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Services</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/services/grc" className="hover:text-white transition-colors">GRC Services</Link></li>
                  <li><Link to="/services/tprm" className="hover:text-white transition-colors">TPRM Services</Link></li>
                  <li><Link to="/services/bcms" className="hover:text-white transition-colors">BCMS Services</Link></li>
                  <li><Link to="/services/application-security" className="hover:text-white transition-colors">App Security</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                  <li><Link to="/team" className="hover:text-white transition-colors">Our Team</Link></li>
                  <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                  <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Contact</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>governance@rnrconsulting.com</li>
                  <li>+1 (555) 123-4567</li>
                  <li>New York, NY</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
              <p>&copy; 2024 RNR Consulting. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default RemediationGovernance;
