import { HashRouter, BrowserRouter } from 'react-router-dom';

// Router configuration for GitHub Pages deployment
export const AppRouter = ({ children }: { children: React.ReactNode }) => {
  const isGitHubPages = process.env.NODE_ENV === 'production' && window.location.hostname.includes('github.io');
  
  if (isGitHubPages) {
    // Use HashRouter for GitHub Pages to avoid routing issues
    return <HashRouter>{children}</HashRouter>;
  } else {
    // Use BrowserRouter with basename for other deployments
    const basename = process.env.NODE_ENV === 'production' ? '/RNR-WEB_DEMO' : '';
    return <BrowserRouter basename={basename}>{children}</BrowserRouter>;
  }
};

// For GitHub Pages, we'll stick with HashRouter as it's the most reliable
export const Router = HashRouter;
