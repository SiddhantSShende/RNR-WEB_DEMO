// Alternative routing configurations for GitHub Pages
// Choose one based on your needs:

// OPTION 1: HashRouter (Current - Recommended for GitHub Pages)
// import { HashRouter as Router } from 'react-router-dom';

// OPTION 2: BrowserRouter with basename (Alternative)
// import { BrowserRouter as Router } from 'react-router-dom';
// const routerProps = { basename: import.meta.env.BASE_URL };

// Usage in main.tsx:
// Option 1: <Router>  // HashRouter - no additional props needed
// Option 2: <Router basename={import.meta.env.BASE_URL}> // BrowserRouter with basename

export const RouterConfig = {
  // Current configuration (HashRouter)
  current: 'HashRouter',
  
  // Alternative configuration (BrowserRouter)  
  alternative: {
    router: 'BrowserRouter',
    basename: '/RNR-WEB_DEMO/'
  }
};
