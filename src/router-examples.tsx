// DEMO: React Router Configuration for GitHub Pages
// This file demonstrates both approaches mentioned in your request

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';

// APPROACH 1: HashRouter (Current implementation - RECOMMENDED for GitHub Pages)
import { HashRouter } from 'react-router-dom';

const HashRouterApp = () => (
  <StrictMode>
    <ThemeProvider>
      <HashRouter>
        <Routes>
          {/* Your routes here */}
        </Routes>
      </HashRouter>
    </ThemeProvider>
  </StrictMode>
);

// APPROACH 2: BrowserRouter with basename (Alternative)
import { BrowserRouter } from 'react-router-dom';

const BrowserRouterApp = () => (
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter basename={process.env.PUBLIC_URL || '/RNR-WEB_DEMO'}>
        <Routes>
          {/* Your routes here */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);

// APPROACH 3: Dynamic router selection based on environment
const DynamicRouterApp = () => {
  const isGitHubPages = window.location.hostname.includes('github.io');
  
  if (isGitHubPages) {
    return (
      <StrictMode>
        <ThemeProvider>
          <HashRouter>
            <Routes>
              {/* Your routes here */}
            </Routes>
          </HashRouter>
        </ThemeProvider>
      </StrictMode>
    );
  }
  
  return (
    <StrictMode>
      <ThemeProvider>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes>
            {/* Your routes here */}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </StrictMode>
  );
};

export { HashRouterApp, BrowserRouterApp, DynamicRouterApp };
