import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  Users, BarChart, AlertTriangle, CheckCircle, 
  FileText, Settings, Monitor, RefreshCw, Target, Building
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import Navigation from './Navigation';

const TPRMPage3D: React.FC = () => {
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

    // Create network-style connections for TPRM theme
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 600;
    
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);
    
    for(let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 25;
      posArray[i + 1] = (Math.random() - 0.5) * 25;
      posArray[i + 2] = (Math.random() - 0.5) * 25;
      
      // Purple/blue themed particles for TPRM
      const isPurple = Math.random() > 0.5;
      colorArray[i] = isPurple ? 0.6 : 0.2;     // R
      colorArray[i + 1] = isPurple ? 0.3 : 0.6; // G
      colorArray[i + 2] = isPurple ? 1 : 1;     // B
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 2.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.7
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 12;

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      // Slow rotation for network effect
      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.001;
      
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
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const tprmServices = {
    programDesign: [
      {
        title: "Design & Setup of Complete TPRM Framework",
        description: "Creating a custom system to manage risks from vendors, suppliers, or partners who handle your data or operations. RNR crafts a framework that protects your business, enabling secure collaboration with confidence.",
        icon: Target,
        features: [
          "Business Mapping: Analyze operations to understand vendor landscape",
          "Framework Blueprint: Create custom TPRM structure defining vendor roles & risk categories",
          "Setup Execution: Implement framework integrating tools like Eramba GRC",
          "Stakeholder Alignment: Ensure framework aligns with business goals"
        ],
        whyItMatters: [
          "Data Spills: Prevent vendor security weaknesses from leaking sensitive info",
          "Compliance Snags: Avoid partner compliance misses risking penalties",
          "Operational Glitches: Prevent vendor issues from disrupting workflows",
          "Brand Dings: Stop third-party slips from triggering reputation damage"
        ],
        whyRNRShines: [
          "Custom-Built Structure: Frameworks matching your business from startups to enterprises",
          "Deep Expertise: CERT-In empaneled team ensures comprehensive risk coverage",
          "Smart Integration: Eramba GRC integration for real-time insights",
          "Future-Proof Design: Evolving frameworks as vendor risks change"
        ]
      },
      {
        title: "Policy and Procedure Development",
        description: "Creating clear, actionable guidelines to manage third-party vendors, ensuring alignment with top standards like ISO 27001, NIST, and RBI. The rulebook that keeps vendors secure and compliant.",
        icon: FileText,
        features: [
          "Needs Assessment: Review vendor interactions to identify policy requirements",
          "Policy Crafting: Develop clear policies aligned with ISO 27001, NIST, RBI standards",
          "Procedure Setup: Create practical workflows and checklists",
          "Training Support: Guide team adoption and implementation"
        ],
        whyItMatters: [
          "Security Gaps: Prevent unclear policies from vendor data mishandling",
          "Compliance Woes: Avoid fines from vendor guideline misalignment",
          "Process Hiccups: Stop vague procedures causing vendor errors",
          "Reputation Scratches: Prevent vendor compliance failures from negative press"
        ],
        whyRNRShines: [
          "Tailored Guidelines: Policies fitting your industry from healthcare to finance",
          "Standards Expertise: CERT-In team ensures ISO 27001, NIST alignment",
          "Practical Tools: Eramba GRC integration for easy tracking and updates",
          "Ongoing Support: Keep policies current as standards evolve"
        ]
      },
      {
        title: "Risk Scoring Model and Risk-Tiering Methodology",
        description: "Ranking vendors based on risks they pose—data access or operational impact—so you can focus efforts where it matters most. Your playbook for prioritizing vendor oversight.",
        icon: BarChart,
        features: [
          "Risk Profiling: Assess vendors to identify risk factors like data sensitivity",
          "Scoring Model Design: Create custom ranking based on risk impact metrics",
          "Tiering Methodology: Set up high, medium, low tiers for prioritized controls",
          "Tool Integration: Link model to Eramba GRC for real-time tracking"
        ],
        whyItMatters: [
          "Data Risks: Prevent unranked vendors from mishandling financial records",
          "Compliance Fumbles: Avoid regulatory penalties from ignored high-risk vendors",
          "Operational Snags: Stop unprioritized risks from halting business operations",
          "Brand Bumps: Prevent high-risk vendor mistakes from fueling client distrust"
        ],
        whyRNRShines: [
          "Custom Models: Scoring systems fitting from small firms to enterprises",
          "Expert Design: CERT-In team ensures model catches critical risks",
          "Smart Tracking: Eramba GRC platform makes risk scores clear and actionable",
          "Future-Ready Updates: Keep scoring and tiering system current as risks change"
        ]
      }
    ],
    vendorAssessment: [
      {
        title: "Evaluation and/or Integration of Automated TPRM Platforms",
        description: "Simplifying third-party risk complexity by selecting and implementing the right technology to continuously monitor and manage risks with precision and ease.",
        icon: Monitor,
        features: [
          "Needs Assessment: Understand current ecosystem, risk appetite, compliance requirements",
          "Platform Evaluation & Selection: Guide through TPRM solutions landscape",
          "Seamless Integration: Expert handling of platform integration with existing IT",
          "Custom Configuration: Configure platform to align with unique methodologies",
          "Training & Support: Comprehensive team training and ongoing support"
        ],
        whyItMatters: [
          "Manual Overload: Eliminate spreadsheet dependency for risk tracking",
          "Blind Spots: Remove real-time monitoring gaps and data comprehensiveness issues",
          "Compliance Lapses: Meet stringent regulatory documentation requirements",
          "Slow Onboarding: Accelerate vendor assessment and partner onboarding",
          "Reactive Response: Transform chaotic incident response into structured process"
        ],
        whyRNRShines: [
          "Vendor Agnostic Expertise: Recommend best-fit solutions based on your needs",
          "End-to-End Solutions: Complete service from assessment to post-implementation",
          "Risk Management Specialists: Expert team in risk, compliance, and cybersecurity",
          "Efficiency & Scalability: Solutions scaling with business and vendor network growth",
          "Actionable Insights: Platforms providing clear, actionable insights for proactive mitigation"
        ]
      },
      {
        title: "Custom Dashboards for Third-Party Tracking and Reporting",
        description: "Transforming raw data into intelligent, actionable visualizations. Intuitive dashboards providing centralized, comprehensive view of third-party risks, compliance status, and performance.",
        icon: BarChart,
        features: [
          "Requirement Gathering: Work with stakeholders to understand KPIs and reporting needs",
          "Data Source Identification: Identify all relevant data sources for comprehensive integration",
          "Design & Prototyping: Create intuitive dashboard layouts with user feedback",
          "Data Integration & Transformation: Connect to disparate sources ensuring accuracy",
          "Interactive Development: Develop dynamic dashboards with drill-down capabilities",
          "Training & Handover: Thorough team training on dashboard navigation and interpretation"
        ],
        whyItMatters: [
          "Information Overload: Eliminate decision paralysis from scattered data mountains",
          "Lack of Centralization: Provide holistic view replacing scattered system data",
          "Delayed Insights: Replace static reports with dynamic real-time risk reflection",
          "Inefficient Reporting: Automate manual compilation for audits and reviews",
          "Missed Trends: Enable easy pattern identification and emerging risk detection"
        ],
        whyRNRShines: [
          "Risk Management Expertise: Dashboards highlighting critical vulnerabilities and compliance",
          "Customization Specialists: Meticulously designed for unique organizational structure",
          "Data Visualization Prowess: Transform complex data into clear, actionable insights",
          "Integration Capabilities: Connect with wide range of TPRM, GRC, enterprise systems",
          "Empowering Your Team: Tools for proactive monitoring and data-driven decisions"
        ]
      },
      {
        title: "Integration with GRC Platforms and Internal Audit Functions",
        description: "Bridging gaps between GRC platforms and internal audit functions. Streamlining information flow, automating processes, and enhancing collaboration for unified, efficient, and insightful operations.",
        icon: Settings,
        features: [
          "Current State Assessment: Map existing GRC ecosystem and audit processes",
          "Strategy & Architecture Design: Design robust integration architecture",
          "API & Connector Development: Develop automated data exchange solutions",
          "Data Standardization & Mapping: Ensure consistency across systems",
          "Workflow Automation: Automate key processes like risk assessment to audit planning",
          "Reporting & Dashboard Enhancement: Create unified dashboards and reports",
          "Training & Change Management: Comprehensive training and adoption support"
        ],
        whyItMatters: [
          "Siloed Information: Eliminate separate system data preventing holistic risk view",
          "Redundant Work: Stop internal audit duplication of GRC platform data gathering",
          "Incomplete Risk Picture: Provide auditors real-time risk data access",
          "Manual Reporting: Automate comprehensive compliance and audit report generation",
          "Lack of Proactivity: Enable proactive risk identification vs reactive stance",
          "Audit Fatigue: Reduce disconnected system information requests"
        ],
        whyRNRShines: [
          "Deep GRC & Audit Expertise: Knowledge of leading platforms and best practices",
          "Customized Integration Solutions: Tailored to specific tools and requirements",
          "Process Optimization Focus: Optimize underlying GRC and audit processes",
          "Enhanced Visibility & Reporting: Unparalleled risk and control environment visibility",
          "Future-Proofing Compliance: Build agile, resilient GRC and audit frameworks"
        ]
      }
    ],
    ongoingMonitoring: [
      {
        title: "Periodic Reassessments and Compliance Checks",
        description: "Establishing structured, proactive framework ensuring third-party relationships consistently meet risk and regulatory standards through systematic reviews and evolving compliance requirements.",
        icon: RefreshCw,
        features: [
          "Risk-Based Reassessment Cadence: Define appropriate frequencies based on vendor criticality",
          "Customizable Assessment Templates: Develop tailored questionnaires for industry compliance",
          "Evidence Collection & Validation: Guide efficient evidence collection and expert validation",
          "Gap Analysis & Remediation Tracking: Analyze results and track remediation plans",
          "Automated Scheduling & Reminders: Leverage GRC tools for automated scheduling",
          "Reporting & Attestation: Generate clear reports for stakeholders and auditors"
        ],
        whyItMatters: [
          "Risk Drift: Prevent vendor security posture degradation over time",
          "Regulatory Evolution: Address new laws and compliance requirement updates",
          "Contractual Adherence: Ensure continued SLA and contractual obligation compliance",
          "Emerging Threats: Re-evaluate vendor defenses against new attack vectors",
          "Audit Readiness: Demonstrate mature, proactive risk management program",
          "Business Changes: Re-evaluate third parties supporting evolving objectives"
        ],
        whyRNRShines: [
          "Deep Compliance Knowledge: Stay current with latest regulatory changes",
          "Methodical & Efficient: Structured processes minimizing disruption",
          "Actionable Insights: Clear findings and practical recommendations",
          "Integration with GRC: Integrate workflows directly into GRC platforms",
          "Scalable Solutions: Manage reviews for any number of third parties"
        ]
      },
      {
        title: "Threat Intelligence Monitoring for Key Vendors",
        description: "Providing continuous, real-time pulse on cybersecurity health of crucial partners. Leveraging advanced threat intelligence feeds, dark web monitoring, and security ratings for proactive threat detection.",
        icon: AlertTriangle,
        features: [
          "Vendor Criticality Assessment: Identify and prioritize key vendors by impact",
          "Continuous Security Ratings Integration: Objective, data-driven security scoring",
          "Threat Intelligence Feed Correlation: Leverage diverse intelligence sources",
          "Actionable Reporting: Regular, concise reports with recommended actions"
        ],
        whyItMatters: [
          "Zero-Day Exploits: Detect new vulnerabilities before vendor awareness",
          "Supply Chain Attacks: Monitor if critical suppliers become entry points",
          "Credential Leaks: Early detection of stolen credentials on dark web",
          "Reputational Fallout: Prevent vendor security incidents impacting your brand",
          "Regulatory Demands: Meet continuous monitoring regulatory requirements",
          "Operational Disruption: Prevent cyberattacks from disrupting operations"
        ],
        whyRNRShines: [
          "Proactive Risk Identification: Detect issues before full-blown incidents",
          "Specialized Intelligence Expertise: Cybersecurity intelligence experts",
          "Targeted Monitoring: Focus on most critical vendors for maximum protection",
          "Data-Driven Decisions: Objective, continuous data for informed decisions",
          "Rapid Response Enablement: Early warnings reducing incident response time"
        ]
      },
      {
        title: "SLA / KPI Reviews and Incident Tracking",
        description: "Ensuring third parties deliver on promises through rigorous performance monitoring. Tracking incidents for accountability and continuous improvement, fostering stronger partnerships.",
        icon: BarChart,
        features: [
          "SLA/KPI Definition & Harmonization: Define measurable metrics aligned with objectives",
          "Custom Performance Dashboards: Real-time vendor performance visibility",
          "Incident Logging & Categorization: Establish clear logging and prioritization processes",
          "Root Cause Analysis Support: Support critical incident root cause analysis",
          "Remediation Tracking & Escalation: Track efforts with escalation paths",
          "Periodic Performance Reviews: Structured review meetings with key vendors"
        ],
        whyItMatters: [
          "Operational Disruptions: Prevent missed SLAs from impeding business operations",
          "Financial Penalties/Losses: Avoid contractual penalties and revenue loss",
          "Customer Dissatisfaction: Maintain customer experience and trust",
          "Lack of Accountability: Enable vendor performance accountability",
          "Missed Improvement Opportunities: Capture incident data for optimization",
          "Contractual Disputes: Prevent disputes through clear performance tracking"
        ],
        whyRNRShines: [
          "Clear Accountability: Establish performance expectations with supporting data",
          "Operational Resilience: Proactive monitoring preventing disruptions",
          "Enhanced Vendor Relationships: Data-driven transparency for stronger partnerships",
          "Streamlined Processes: Automate data collection and reporting",
          "Data-Driven Improvement: Insights for trends and continuous improvement"
        ]
      }
    ],
    remediationGovernance: [
      {
        title: "Risk Treatment and Mitigation Planning",
        description: "Developing detailed, prioritized remediation plans with specific actions, responsibilities, and timelines. Systematically addressing every identified risk within acceptable tolerance levels.",
        icon: CheckCircle,
        features: [
          "Risk Prioritization Workshop: Review and prioritize risks based on appetite",
          "Mitigation Strategy Development: Define appropriate strategies with stakeholders",
          "Action Plan Detailing: Break down strategies into specific, actionable steps",
          "Resource & Dependency Mapping: Identify resources and interdependencies",
          "Control Implementation Support: Provide guidance during implementation",
          "Tracking & Monitoring Framework: Set up progress tracking mechanisms",
          "Effectiveness Validation: Validate mitigation effectiveness post-completion"
        ],
        whyItMatters: [
          "Closing Vulnerabilities: Systematically close assessment-identified gaps",
          "Resource Optimization: Efficiently allocate resources to critical risks first",
          "Compliance Adherence: Meet regulatory framework documentation mandates",
          "Accountability & Ownership: Ensure someone accountable for each task",
          "Measurable Progress: Track progress and demonstrate improvements",
          "Preventing Recurrence: Address root causes preventing similar incidents"
        ],
        whyRNRShines: [
          "Actionable & Practical Plans: Create clear, feasible, implementable plans",
          "Risk Management Specialists: Deep knowledge across various risk types",
          "Collaborative Approach: Foster ownership through internal team partnership",
          "Prioritization Expertise: Focus efforts on greatest business threats",
          "Measurable Outcomes: Emphasize clear metrics for tangible risk reduction"
        ]
      },
      {
        title: "Support in Drafting Contract Clauses for Data Protection, Cybersecurity, and Compliance",
        description: "Embedding strong, enforceable clauses defining third-party responsibilities, security requirements, data handling protocols, and compliance obligations to safeguard interests and minimize contractual risk.",
        icon: FileText,
        features: [
          "Current Contract Review: Analyze existing templates and key agreements",
          "Risk-Based Clause Development: Recommend clauses based on risk assessments",
          "Key Clause Areas: Cover data protection, cybersecurity, compliance, audit rights",
          "Collaboration with Legal & Procurement: Work with internal teams seamlessly",
          "Negotiation Support: Provide guidance during vendor negotiations",
          "Standard Template Enhancement: Develop standardized contract templates"
        ],
        whyItMatters: [
          "Data Breach Vulnerability: Prevent vendor breaches with limited recourse",
          "Undefined Cybersecurity Requirements: Mandate explicit cybersecurity controls",
          "Compliance Gaps: Address regulatory responsibility for third parties",
          "Lack of Accountability: Enable vendor accountability for incidents",
          "Limited Recourse: Ensure ability to seek damages and enforce remediation",
          "Audit Deficiencies: Provide security and compliance requirement evidence"
        ],
        whyRNRShines: [
          "Dual Expertise: Combine cybersecurity knowledge with contractual understanding",
          "Proactive Protection: Embed preventive measures reducing pre-incident exposure",
          "Regulatory Alignment: Ensure clauses meet latest regulation requirements",
          "Enforceable Language: Craft clear, unambiguous, scrutiny-resistant language",
          "Strategic Partnership: Extend legal and procurement teams with specialized insights"
        ]
      },
      {
        title: "Escalation Framework and Governance Reporting",
        description: "Designing definitive escalation paths for critical issues and implementing comprehensive reporting mechanisms providing transparent, real-time insights for accountability and informed decision-making.",
        icon: Building,
        features: [
          "Escalation Matrix Design: Define clear thresholds and multi-tiered response matrix",
          "Communication Protocols: Establish protocols for internal and external stakeholders",
          "Governance Reporting Requirements: Consult stakeholders for specific reporting needs",
          "Custom Dashboard & Report Development: Design holistic, real-time risk views",
          "Automated Reporting & Alerts: Implement automation reducing manual effort",
          "Role-Based Access Control: Tailor reporting views to different user roles",
          "Training & Adoption: Provide framework and reporting tool training"
        ],
        whyItMatters: [
          "Timely Issue Resolution: Prompt critical risk escalation to decision-makers",
          "Accountability & Ownership: Clear responsibility definition preventing gaps",
          "Informed Decision-Making: Provide leadership with necessary risk posture data",
          "Regulatory Compliance: Demonstrate required third-party risk oversight",
          "Resource Allocation: Optimize investments in highest risk areas",
          "Stakeholder Confidence: Build trust through transparent reporting",
          "Continuous Improvement: Analyze patterns highlighting systemic issues"
        ],
        whyRNRShines: [
          "Clarity & Structure: Transform chaotic management into structured process",
          "Enhanced Visibility: Provide unparalleled third-party risk transparency",
          "Accelerated Response: Help organizations react quickly to critical incidents",
          "Accountability Driven: Embed clear ownership for risk response and reporting",
          "Strategic Insights: Provide strategic insights informing highest-level decisions"
        ]
      }
    ]
  };

  const ServiceSection = ({ title, description, services, colorClass }: any) => (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-4xl font-bold text-center mb-4 ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}>
          {title}
        </h2>
        <p className={`text-center mb-12 text-lg ${
          isDarkMode ? 'text-slate-300' : 'text-slate-600'
        }`}>
          {description}
        </p>
        
        <div className="grid lg:grid-cols-1 gap-12">
          {services.map((service: any, index: number) => (
            <div key={index} className={`rounded-2xl p-8 backdrop-blur-md border transition-all duration-300 ${
              isDarkMode 
                ? 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/60' 
                : 'bg-white/70 border-white/50 hover:bg-white/90'
            }`}>
              {/* Service Header */}
              <div className="flex items-start gap-6 mb-8">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full flex-shrink-0 ${colorClass}`}>
                  <service.icon className={`w-8 h-8 ${
                    colorClass.includes('purple') 
                      ? (isDarkMode ? 'text-purple-400' : 'text-purple-600')
                      : colorClass.includes('blue')
                      ? (isDarkMode ? 'text-blue-400' : 'text-blue-600')
                      : colorClass.includes('green')
                      ? (isDarkMode ? 'text-green-400' : 'text-green-600')
                      : colorClass.includes('orange')
                      ? (isDarkMode ? 'text-orange-400' : 'text-orange-600')
                      : (isDarkMode ? 'text-indigo-400' : 'text-indigo-600')
                  }`} />
                </div>
                <div className="flex-1">
                  <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {service.title}
                  </h3>
                  <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Service Features */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* How RNR Does It */}
                <div className={`p-6 rounded-xl ${
                  isDarkMode ? 'bg-slate-900/30' : 'bg-slate-50/50'
                }`}>
                  <h4 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    How RNR Does It
                  </h4>
                  <ul className="space-y-3">
                    {service.features.map((feature: string, idx: number) => (
                      <li key={idx} className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Why It Matters */}
                {service.whyItMatters && (
                  <div className={`p-6 rounded-xl ${
                    isDarkMode ? 'bg-red-900/20' : 'bg-red-50/50'
                  }`}>
                    <h4 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      Why It Matters
                    </h4>
                    <ul className="space-y-3">
                      {service.whyItMatters.map((matter: string, idx: number) => (
                        <li key={idx} className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <span>{matter}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Why RNR Shines */}
                {service.whyRNRShines && (
                  <div className={`p-6 rounded-xl ${
                    isDarkMode ? 'bg-yellow-900/20' : 'bg-yellow-50/50'
                  }`}>
                    <h4 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      Why RNR Shines
                    </h4>
                    <ul className="space-y-3">
                      {service.whyRNRShines.map((shine: string, idx: number) => (
                        <li key={idx} className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                          <div className="flex items-start gap-2">
                            <Target className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span>{shine}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900' 
        : 'bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100'
    }`}>
      {/* Three.js Canvas */}
      <div ref={mountRef} className="fixed inset-0 z-0" />
      
      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen">
        {/* Navigation */}
        <Navigation />

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-8 ${
              isDarkMode ? 'bg-purple-600/20' : 'bg-purple-100'
            }`}>
              <Users className={`w-10 h-10 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
            </div>
            <h1 className={`text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent ${
              isDarkMode 
                ? 'from-purple-400 via-purple-300 to-indigo-300' 
                : 'from-purple-600 via-purple-700 to-indigo-700'
            }`}>
              Third-Party Risk Management (TPRM)
            </h1>
            <p className={`text-xl md:text-2xl mb-8 max-w-4xl mx-auto ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Comprehensive TPRM solutions to identify, assess, and manage risks across your entire 
              vendor ecosystem. From framework design to ongoing monitoring, RNR delivers expert guidance 
              and advanced tools to secure your third-party relationships with confidence.
            </p>
          </div>
        </section>

        {/* Service Sections */}
        <ServiceSection 
          title="TPRM Program Design & Implementation"
          description="Establish robust third-party risk management programs from the ground up with comprehensive frameworks, policies, and risk scoring methodologies."
          services={tprmServices.programDesign}
          colorClass={isDarkMode ? "bg-purple-600/20" : "bg-purple-100"}
        />

        <ServiceSection 
          title="Vendor Risk Assessment"
          description="Comprehensive evaluation and assessment through automated platforms, custom dashboards, and seamless integration with GRC systems."
          services={tprmServices.vendorAssessment}
          colorClass={isDarkMode ? "bg-blue-600/20" : "bg-blue-100"}
        />

        <ServiceSection 
          title="Ongoing Monitoring & Reassessments"
          description="Continuous monitoring through periodic reassessments, threat intelligence monitoring, and comprehensive SLA/KPI tracking."
          services={tprmServices.ongoingMonitoring}
          colorClass={isDarkMode ? "bg-green-600/20" : "bg-green-100"}
        />

        <ServiceSection 
          title="Remediation & Governance"
          description="Structured remediation processes, contract clause development, and robust governance frameworks with clear escalation paths."
          services={tprmServices.remediationGovernance}
          colorClass={isDarkMode ? "bg-orange-600/20" : "bg-orange-100"}
        />

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`rounded-3xl p-12 backdrop-blur-md border ${
              isDarkMode 
                ? 'bg-slate-800/50 border-slate-700/50' 
                : 'bg-white/70 border-white/50'
            }`}>
              <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Ready to Secure Your Third-Party Ecosystem?
              </h2>
              <p className={`text-lg mb-8 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Let RNR's CERT-In empaneled experts help you build a comprehensive TPRM program. 
                From framework design and policy development to ongoing monitoring and governance, 
                we provide end-to-end solutions to identify, assess, and manage risks across all 
                your vendor relationships. We guard, we protect, we secure.
              </p>
              <button className={`px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-purple-900/25' 
                  : 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-purple-500/25'
              }`}>
                Get Started Today
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TPRMPage3D;
