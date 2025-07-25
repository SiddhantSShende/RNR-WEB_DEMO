import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Upload,
  User,
  Mail,
  Phone,
  Briefcase,
  Clock,
  DollarSign,
  FileText,
  CheckCircle,
  AlertCircle,
  Loader
} from 'lucide-react';

// Email.js configuration - Replace with your actual credentials
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'; // Replace with your EmailJS service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS template ID  
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Replace with your EmailJS public key

declare global {
  interface Window {
    emailjs: any;
  }
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  profile: string;
  experienceLevel: string;
  resume: File | null;
  experienceYears: string;
  currentCTC: string;
  expectedCTC: string;
}

const ApplicationForm: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    profile: '',
    experienceLevel: '',
    resume: null,
    experienceYears: '',
    currentCTC: '',
    expectedCTC: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const profileOptions = [
    'Governance, Risk, and Compliance',
    'Vulnerability Assessment and Penetration Testing',
    'Web Developer (Flutter)',
    'Web Developer (Django)',
    'Design and Marketing'
  ];

  const experienceLevels = [
    '0 year of experience',
    '< 1 year of experience',
    '>= 1 year of experience',
    '>= 2 year of experience',
    '>= 3 year of experience'
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10,15}$/.test(formData.phone.replace(/\s+/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.profile) {
      newErrors.profile = 'Please select a profile';
    }

    if (!formData.experienceLevel) {
      newErrors.experienceLevel = 'Please select your experience level';
    }

    if (!formData.resume) {
      newErrors.resume = 'Please upload your resume';
    }

    if (!formData.experienceYears.trim()) {
      newErrors.experienceYears = 'Please specify your years of experience';
    }

    if (!formData.currentCTC.trim()) {
      newErrors.currentCTC = 'Current CTC is required';
    }

    if (!formData.expectedCTC.trim()) {
      newErrors.expectedCTC = 'Expected CTC is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type and size
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          resume: 'Please upload a PDF or Word document'
        }));
        return;
      }

      if (file.size > maxSize) {
        setErrors(prev => ({
          ...prev,
          resume: 'File size must be less than 5MB'
        }));
        return;
      }

      setFormData(prev => ({
        ...prev,
        resume: file
      }));

      setErrors(prev => ({
        ...prev,
        resume: ''
      }));
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Convert resume to base64 for email attachment
      let resumeBase64 = '';
      if (formData.resume) {
        resumeBase64 = await convertFileToBase64(formData.resume);
      }

      // Prepare email template parameters
      const templateParams = {
        to_name: 'RNR Consulting HR Team',
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        profile: formData.profile,
        experience_level: formData.experienceLevel,
        experience_years: formData.experienceYears,
        current_ctc: formData.currentCTC,
        expected_ctc: formData.expectedCTC,
        resume_name: formData.resume?.name || '',
        resume_data: resumeBase64,
        message: `
New Job Application Received:

Applicant Details:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone}
- Profile: ${formData.profile}
- Experience Level: ${formData.experienceLevel}
- Years of Experience: ${formData.experienceYears}
- Current CTC: ${formData.currentCTC}
- Expected CTC: ${formData.expectedCTC}

Resume: ${formData.resume?.name || 'Not provided'}
        `
      };

      // Send email using EmailJS
      // Initialize EmailJS with your public key
      if (window.emailjs) {
        window.emailjs.init(EMAILJS_PUBLIC_KEY);
        
        await window.emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams
        );
      } else {
        throw new Error('EmailJS not loaded');
      }

      setSubmitStatus('success');
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        profile: '',
        experienceLevel: '',
        resume: null,
        experienceYears: '',
        currentCTC: '',
        expectedCTC: ''
      });

    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'
    }`}>
      <div className="relative min-h-screen pt-24 pb-16">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse ${
            isDarkMode ? 'bg-blue-600/10' : 'bg-blue-400/10'
          }`}></div>
          <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000 ${
            isDarkMode ? 'bg-indigo-600/10' : 'bg-indigo-400/10'
          }`}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Link 
              to="/careers" 
              className={`inline-flex items-center space-x-2 mb-6 text-sm font-medium transition-colors duration-300 ${
                isDarkMode 
                  ? 'text-blue-400 hover:text-blue-300' 
                  : 'text-blue-600 hover:text-blue-700'
              }`}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Careers</span>
            </Link>
            
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Join Our Team
            </h1>
            <p className={`text-xl max-w-2xl mx-auto ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Take the next step in your cybersecurity career with RNR Consulting
            </p>
          </div>

          {/* Application Form */}
          <div className={`backdrop-blur-md border rounded-2xl shadow-2xl p-8 ${
            isDarkMode 
              ? 'bg-slate-800/20 border-slate-700/30' 
              : 'bg-white/20 border-white/30'
          }`}>
            {/* Success/Error Messages */}
            {submitStatus === 'success' && (
              <div className={`mb-6 p-4 rounded-lg border ${
                isDarkMode 
                  ? 'bg-green-900/20 border-green-700/50 text-green-300' 
                  : 'bg-green-50 border-green-200 text-green-700'
              }`}>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Application submitted successfully!</span>
                </div>
                <p className="mt-1 text-sm">We'll review your application and get back to you soon.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className={`mb-6 p-4 rounded-lg border ${
                isDarkMode 
                  ? 'bg-red-900/20 border-red-700/50 text-red-300' 
                  : 'bg-red-50 border-red-200 text-red-700'
              }`}>
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5" />
                  <span className="font-medium">Error submitting application</span>
                </div>
                <p className="mt-1 text-sm">Please try again or contact us directly.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    <User className="inline h-4 w-4 mr-2" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 ${
                      isDarkMode 
                        ? 'bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-400' 
                        : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    <Mail className="inline h-4 w-4 mr-2" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 ${
                      isDarkMode 
                        ? 'bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-400' 
                        : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  <Phone className="inline h-4 w-4 mr-2" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 ${
                    isDarkMode 
                      ? 'bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-400' 
                      : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
              </div>

              {/* Profile Selection */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  <Briefcase className="inline h-4 w-4 mr-2" />
                  In which profile you want to apply? *
                </label>
                <select
                  name="profile"
                  value={formData.profile}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 ${
                    isDarkMode 
                      ? 'bg-slate-700/50 border-slate-600 text-white focus:border-blue-400' 
                      : 'bg-white/50 border-gray-300 text-gray-900 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                >
                  <option value="">Select a profile</option>
                  {profileOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.profile && (
                  <p className="mt-1 text-sm text-red-500">{errors.profile}</p>
                )}
              </div>

              {/* Experience Level */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  <Clock className="inline h-4 w-4 mr-2" />
                  Years of Experience *
                </label>
                <select
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 ${
                    isDarkMode 
                      ? 'bg-slate-700/50 border-slate-600 text-white focus:border-blue-400' 
                      : 'bg-white/50 border-gray-300 text-gray-900 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                >
                  <option value="">Select experience level</option>
                  {experienceLevels.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
                {errors.experienceLevel && (
                  <p className="mt-1 text-sm text-red-500">{errors.experienceLevel}</p>
                )}
              </div>

              {/* Resume Upload */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  <Upload className="inline h-4 w-4 mr-2" />
                  Upload your CV/Resume *
                </label>
                <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-300 ${
                  isDarkMode 
                    ? 'border-slate-600 hover:border-blue-400' 
                    : 'border-gray-300 hover:border-blue-500'
                }`}>
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="resume" className="cursor-pointer">
                    <Upload className={`h-8 w-8 mx-auto mb-2 ${
                      isDarkMode ? 'text-slate-400' : 'text-gray-500'
                    }`} />
                    <p className={`text-sm ${
                      isDarkMode ? 'text-slate-300' : 'text-gray-700'
                    }`}>
                      {formData.resume ? formData.resume.name : 'Click to upload or drag and drop'}
                    </p>
                    <p className={`text-xs mt-1 ${
                      isDarkMode ? 'text-slate-400' : 'text-gray-500'
                    }`}>
                      PDF, DOC, DOCX up to 5MB
                    </p>
                  </label>
                </div>
                {errors.resume && (
                  <p className="mt-1 text-sm text-red-500">{errors.resume}</p>
                )}
              </div>

              {/* Additional Information */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Experience Years Detail */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    <FileText className="inline h-4 w-4 mr-2" />
                    How many years of experience you have? *
                  </label>
                  <input
                    type="text"
                    name="experienceYears"
                    value={formData.experienceYears}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 ${
                      isDarkMode 
                        ? 'bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-400' 
                        : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    placeholder="e.g., 2.5 years"
                  />
                  {errors.experienceYears && (
                    <p className="mt-1 text-sm text-red-500">{errors.experienceYears}</p>
                  )}
                </div>

                {/* Current CTC */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    <DollarSign className="inline h-4 w-4 mr-2" />
                    What is your current CTC? *
                  </label>
                  <input
                    type="text"
                    name="currentCTC"
                    value={formData.currentCTC}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 ${
                      isDarkMode 
                        ? 'bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-400' 
                        : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    placeholder="e.g., 8 LPA"
                  />
                  {errors.currentCTC && (
                    <p className="mt-1 text-sm text-red-500">{errors.currentCTC}</p>
                  )}
                </div>
              </div>

              {/* Expected CTC */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  <DollarSign className="inline h-4 w-4 mr-2" />
                  What is your expected CTC? *
                </label>
                <input
                  type="text"
                  name="expectedCTC"
                  value={formData.expectedCTC}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 ${
                    isDarkMode 
                      ? 'bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-400' 
                      : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  placeholder="e.g., 12 LPA"
                />
                {errors.expectedCTC && (
                  <p className="mt-1 text-sm text-red-500">{errors.expectedCTC}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="text-center pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                    isSubmitting ? 'cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <Loader className="h-5 w-5 animate-spin" />
                      <span>Submitting Application...</span>
                    </div>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
