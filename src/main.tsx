import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import App from './App.tsx';
import ContactPage3D from './components/ContactPage3D.tsx';
import CompliancePage3D from './components/CompliancePage3D.tsx';
import PhilosophyPage3D from './components/PhilosophyPage3D.tsx';
import AboutUsPage3D from './components/AboutUsPage3D.tsx';
import CareersPage3D from './components/CareersPage3D.tsx';
import NewsPage3D from './components/NewsPage3D.tsx';
import TeamPage3D from './components/TeamPage3D.tsx';
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
          <Route path="/news" element={<NewsPage3D />} />
          <Route path="/team" element={<TeamPage3D />} />
        </Routes>
      </Router>
    </ThemeProvider>
  </StrictMode>
);
