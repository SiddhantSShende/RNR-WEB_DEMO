import React, { useEffect, useRef, useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface Service {
  title: string;
  description: string;
  features: string[];
  buttonText: string;
}

const services: Service[] = [
  {
    title: "Strategic Consulting",
    description: "Drive your business forward with data-driven strategic insights and comprehensive planning solutions. Our expert consultants work closely with your leadership team to identify growth opportunities, optimize operations, and develop sustainable competitive advantages.",
    features: [
      "Market Analysis & Research",
      "Strategic Planning & Roadmapping",
      "Competitive Intelligence",
      "Risk Assessment & Mitigation"
    ],
    buttonText: "Learn More"
  },
  {
    title: "Business Development",
    description: "Accelerate growth through innovative business development strategies and market expansion techniques. We help you identify new revenue streams, forge strategic partnerships, and expand into emerging markets with confidence.",
    features: [
      "Partnership Development",
      "Market Entry Strategies",
      "Revenue Optimization",
      "Customer Acquisition"
    ],
    buttonText: "Learn More"
  },
  {
    title: "Process Optimization",
    description: "Streamline operations and maximize efficiency with our proven process optimization methodologies. We analyze your current workflows, identify bottlenecks, and implement solutions that reduce costs while improving quality and speed.",
    features: [
      "Workflow Analysis & Design",
      "Automation Implementation",
      "Quality Management Systems",
      "Performance Monitoring"
    ],
    buttonText: "Learn More"
  },
  {
    title: "Data Analytics",
    description: "Transform raw data into actionable insights with advanced analytics and business intelligence solutions. Our data scientists help you make informed decisions by uncovering patterns, trends, and opportunities hidden in your data.",
    features: [
      "Business Intelligence Dashboards",
      "Predictive Analytics",
      "Data Visualization",
      "Performance Metrics"
    ],
    buttonText: "Learn More"
  },
  {
    title: "Technical Solutions",
    description: "Custom technical implementations and integrations designed to solve your unique challenges. Our experienced engineers develop scalable solutions that integrate seamlessly with your existing systems and support your business objectives.",
    features: [
      "Custom Software Development",
      "System Integration",
      "API Development",
      "Cloud Infrastructure"
    ],
    buttonText: "Learn More"
  },
  {
    title: "Team Training",
    description: "Empower your workforce with comprehensive training programs and skill development initiatives. We design customized learning experiences that enhance productivity, improve job satisfaction, and prepare your team for future challenges.",
    features: [
      "Leadership Development",
      "Technical Skills Training",
      "Soft Skills Enhancement",
      "Certification Programs"
    ],
    buttonText: "Learn More"
  },
  {
    title: "Digital Transformation",
    description: "Navigate the digital landscape with confidence through our comprehensive transformation services. We help organizations modernize their operations, adopt new technologies, and create digital-first customer experiences.",
    features: [
      "Digital Strategy Development",
      "Technology Adoption",
      "Change Management",
      "Digital Culture Building"
    ],
    buttonText: "Learn More"
  },
  {
    title: "Brand Strategy",
    description: "Build a compelling brand presence that resonates with your audience and drives market success. Our brand strategists help you define your unique value proposition, develop consistent messaging, and create memorable brand experiences.",
    features: [
      "Brand Positioning",
      "Message Development",
      "Visual Identity Design",
      "Brand Guidelines"
    ],
    buttonText: "Learn More"
  }
];

const ProfessionalServices: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const totalSlides = services.length;

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!sectionRef.current) return;

          const section = sectionRef.current;
          const rect = section.getBoundingClientRect();
          const sectionHeight = section.offsetHeight;
          const windowHeight = window.innerHeight;
          
          // Calculate scroll progress within section bounds
          const startPoint = rect.top;
          const endPoint = rect.bottom - windowHeight;
          
          if (startPoint <= 0 && endPoint >= 0) {
            // We're inside the section
            const progress = Math.abs(startPoint) / (sectionHeight - windowHeight);
            const clampedProgress = Math.max(0, Math.min(1, progress));
            
            // Each service gets equal portion of scroll
            const serviceIndex = Math.floor(clampedProgress * totalSlides);
            const finalIndex = Math.min(serviceIndex, totalSlides - 1);
            setCurrentSlide(finalIndex);
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    
    // Initial calculation
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [totalSlides]);

  return (
    <>
      {/* Mouse light effect */}
      <div 
        className="fixed w-72 h-72 rounded-full pointer-events-none z-10 transition-opacity duration-300"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(33, 150, 243, 0.08) 0%, rgba(33, 150, 243, 0.02) 40%, transparent 70%)'
        }}
      />

      {/* Floating elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-10">
        <div 
          className="absolute w-15 h-15 top-1/5 left-1/10 bg-blue-400/10 rounded-full border border-blue-400/20"
          style={{
            animation: 'float 8s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute w-10 h-10 top-3/5 right-1/6 bg-blue-400/10 rounded-full border border-blue-400/20"
          style={{
            animation: 'float 8s ease-in-out infinite',
            animationDelay: '2s'
          }}
        />
        <div 
          className="absolute w-20 h-20 bottom-1/5 left-1/5 bg-blue-400/10 rounded-full border border-blue-400/20"
          style={{
            animation: 'float 8s ease-in-out infinite',
            animationDelay: '4s'
          }}
        />
      </div>

      <section 
        ref={sectionRef}
        className="relative bg-gradient-to-br from-white via-blue-50/30 to-blue-100/30"
        style={{ height: `${totalSlides * 100}vh` }} // Make section tall enough for all slides
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Section Header */}
          <div className="absolute top-24 left-0 right-0 z-20 text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
              The Value We Provide
            </h2>
            <div className="flex items-center justify-center space-x-2 text-slate-600 text-xs">
              <span>Keep scrolling to explore our services</span>
              <div className="w-1 h-1 bg-slate-400 rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="w-1 h-1 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>

          <div className="relative w-full h-full pt-32">
            <div 
              className="flex w-full h-full transition-transform duration-700 ease-out"
              style={{ 
                width: `${totalSlides * 100}%`,
                transform: `translateX(-${(currentSlide * 100) / totalSlides}%)`
              }}
            >
              {services.map((service, index) => (
                <div 
                  key={index}
                  className="w-full h-full flex items-center justify-center p-4"
                  style={{ width: `${100 / totalSlides}%` }}
                >
                  <div className="bg-white/95 backdrop-blur-md rounded-xl p-8 w-full max-w-4xl text-center shadow-xl border border-blue-100/50 transform transition-all duration-600 hover:scale-105 hover:shadow-2xl">
                    <div className="grid md:grid-cols-3 gap-6 items-center">
                      {/* Left: Title and Description */}
                      <div className="md:col-span-2 text-left">
                        <h3 className="text-2xl font-semibold text-blue-600 mb-4">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-4 text-base">
                          {service.description}
                        </p>
                        <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-none py-2 px-6 rounded-full font-semibold cursor-pointer transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-1 uppercase tracking-wider text-sm">
                          {service.buttonText}
                        </button>
                      </div>
                      
                      {/* Right: Features */}
                      <div className="text-left">
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">Key Features</h4>
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="text-gray-700 mb-2 text-sm leading-relaxed">
                            • {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Scroll indicator */}
      <div className="fixed bottom-8 right-8 z-50 bg-white/95 backdrop-blur-md p-3 rounded-full shadow-lg border border-blue-100/50 text-blue-500 text-xl w-12 h-12 flex items-center justify-center">
        <ChevronRight />
      </div>

      {/* Progress bar */}
      <div 
        className="fixed bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 z-50"
        style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
      />

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
        `}
      </style>
    </>
  );
};

export default ProfessionalServices;
