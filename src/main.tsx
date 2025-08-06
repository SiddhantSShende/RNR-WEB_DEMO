import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
// Router is HashRouter which is optimal for GitHub Pages deployment
// Alternative: BrowserRouter with basename={process.env.PUBLIC_URL || '/RNR-WEB_DEMO/'}
import App from './App.tsx';
import ContactPage3D from './components/ContactPage3D.tsx';
import CompliancePage3D from './components/CompliancePage3D.tsx';
import PhilosophyPage3D from './components/PhilosophyPage3D.tsx';
import AboutUsPage3D from './components/AboutUsPage3D.tsx';
import CareersPage3D from './components/CareersPage3D.tsx';
import ApplicationForm from './components/ApplicationForm.tsx';
import NewsPage3D from './components/NewsPage3D.tsx';
import TeamPage3D from './components/TeamPage3D.tsx';
import GRCServices from './components/services/GRCServices.tsx';
import TPRMServices from './components/services/TPRMServices.tsx';
import CybersecurityServices from './components/services/CybersecurityServices.tsx';
import TechnologyConsulting from './components/services/TechnologyConsulting.tsx';
import ProfessionalServices from './components/services/ProfessionalServices.tsx';
import DigitalForensics from './components/services/DigitalForensics.tsx';
import CloudSecurityServices from './components/services/CloudSecurityServices.tsx';
import MobileSecurityServices from './components/services/MobileSecurityServices.tsx';
import TrainingServices from './components/services/TrainingServices.tsx';
import TrainingAwarenessServices from './components/services/TrainingAwarenessServices.tsx';
import InfrastructureServices from './components/services/InfrastructureServices.tsx';
import VirtualCISOServices from './components/services/VirtualCISOServices.tsx';
import GovernanceServices from './components/services/grc/GovernanceServices.tsx';
import BCMSServices from './components/services/BCMSServices.tsx';
import ApplicationSecurityServices from './components/services/ApplicationSecurityServices.tsx';
import ResourceAsAServicesPage from './components/services/ResourceAsAServicesPage.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/contact" element={<ContactPage3D />} />
          <Route path="/compliance" element={<CompliancePage3D />} />
          <Route path="/philosophy" element={<PhilosophyPage3D />} />
          <Route path="/about" element={<AboutUsPage3D />} />
          <Route path="/careers" element={<CareersPage3D />} />
          <Route path="/apply" element={<ApplicationForm />} />
          <Route path="/news" element={<NewsPage3D />} />
          <Route path="/team" element={<TeamPage3D />} />
          
          {/* Service Pages */}
          <Route path="/services/grc" element={<GRCServices />} />
          <Route path="/services/tprm" element={<TPRMServices />} />
          <Route path="/services/bcms" element={<BCMSServices />} />
          <Route path="/services/application-security" element={<ApplicationSecurityServices />} />
          <Route path="/services/resource-as-services" element={<ResourceAsAServicesPage />} />
          <Route path="/services/cybersecurity" element={<CybersecurityServices />} />
          <Route path="/services/technology-consulting" element={<TechnologyConsulting />} />
          <Route path="/services/professional-services" element={<ProfessionalServices />} />
          <Route path="/services/digital-forensics" element={<DigitalForensics />} />
          <Route path="/services/cloud-security" element={<CloudSecurityServices />} />
          <Route path="/services/mobile-security" element={<MobileSecurityServices />} />
          <Route path="/services/training" element={<TrainingServices />} />
          <Route path="/services/training-awareness" element={<TrainingAwarenessServices />} />
          <Route path="/services/infrastructure" element={<InfrastructureServices />} />
          <Route path="/services/virtual-ciso" element={<VirtualCISOServices />} />
          
          {/* GRC Sub-service Routes */}
          <Route path="/services/grc/governance" element={<GovernanceServices />} />
        </Routes>
      </Router>
    </ThemeProvider>
  </StrictMode>
);
