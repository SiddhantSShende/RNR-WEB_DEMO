import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { Shield, Activity, BarChart, Clock, CheckCircle, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';

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

const OngoingMonitoring: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    service: 'TPRM Ongoing Monitoring & Reassessments'
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
      title: 'Continuous Risk Monitoring',
      description: 'Real-time monitoring of third-party risks and performance indicators',
      features: [
        'Real-time risk monitoring dashboards',
        'Key risk indicator (KRI) tracking',
        'Automated alert and escalation systems',
        'Vendor performance scorecards'
      ]
    },
    {
      title: 'Periodic Reassessments',
      description: 'Scheduled reassessment programs to validate ongoing vendor risk levels',
      features: [
        'Annual risk reassessment cycles',
        'Event-triggered reassessments',
        'Risk profile updates and validation',
        'Comparative risk trend analysis'
      ]
    },
    {
      title: 'External Intelligence Monitoring',
      description: 'Integration of external threat intelligence and market data',
      features: [
        'Cybersecurity threat intelligence feeds',
        'Financial stability monitoring',
        'Regulatory compliance tracking',
        'Industry reputation monitoring'
      ]
    },
    {
      title: 'Performance Monitoring',
      description: 'Continuous monitoring of vendor service delivery and performance',
      features: [
        'Service level agreement tracking',
        'Performance metric monitoring',
        'Quality assurance reviews',
        'Customer satisfaction assessments'
      ]
    },
    {
      title: 'Compliance Monitoring',
      description: 'Ongoing monitoring of regulatory and contractual compliance',
      features: [
        'Regulatory compliance tracking',
        'Certification status monitoring',
        'Audit finding tracking',
        'Policy adherence verification'
      ]
    },
    {
      title: 'Risk Reporting & Analytics',
      description: 'Comprehensive reporting and analytics for ongoing risk visibility',
      features: [
        'Executive risk dashboards',
        'Trend analysis and reporting',
        'Risk heat maps and visualizations',
        'Predictive risk analytics'
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
              <span className="text-blue-600 font-medium">Ongoing Monitoring & Reassessments</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
              <Activity className="h-10 w-10 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Ongoing Monitoring & <span className="text-blue-600">Reassessments</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Continuous monitoring and periodic reassessment services to maintain visibility 
              into evolving third-party risks and ensure ongoing compliance with your risk appetite.
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
                Our Ongoing Monitoring & Reassessment Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Maintain continuous visibility into your third-party risk landscape with our 
                comprehensive monitoring and reassessment capabilities.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className="p-8">
                    <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                      <Clock className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors" />
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
                  Why Choose Our Monitoring & Reassessment Services?
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4 flex-shrink-0">
                      <Activity className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-Time Visibility</h3>
                      <p className="text-gray-600">
                        Continuous monitoring provides real-time visibility into vendor risks 
                        and performance, enabling proactive risk management.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4 flex-shrink-0">
                      <BarChart className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Advanced Analytics</h3>
                      <p className="text-gray-600">
                        Sophisticated analytics and reporting capabilities provide insights 
                        into risk trends and emerging threats.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4 flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Automated Processes</h3>
                      <p className="text-gray-600">
                        Automated monitoring and alert systems reduce manual effort while 
                        ensuring nothing falls through the cracks.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl">
                <div className="text-center">
                  <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Clock className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready for Continuous Monitoring?</h3>
                  <p className="text-gray-600 mb-6">
                    Maintain ongoing visibility into your third-party risk landscape.
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
                Get Started with Ongoing Monitoring
              </h2>
              <p className="text-xl text-gray-600">
                Contact us to discuss your monitoring and reassessment requirements and learn how we can help 
                you maintain continuous visibility into third-party risks.
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
                      placeholder="Tell us about your monitoring and reassessment requirements..."
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
                    Ready to implement continuous monitoring for your third-party ecosystem? Our experts 
                    are here to help you establish ongoing visibility and control.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">Email Us</h4>
                      <p className="text-gray-600">monitoring@rnrconsulting.com</p>
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
                      24/7 monitoring capabilities
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Advanced analytics and reporting
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Automated alerting systems
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Expert reassessment services
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
                  Continuous TPRM monitoring and reassessment services for ongoing third-party risk management.
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
                  <li>monitoring@rnrconsulting.com</li>
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

export default OngoingMonitoring;
