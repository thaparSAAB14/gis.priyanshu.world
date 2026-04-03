import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

const ThemeSync = () => {
  useEffect(() => {
    const syncTheme = (newTheme) => {
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark-theme');
      } else {
        document.documentElement.classList.remove('dark-theme');
      }
    };

    // 1. Initial sync from URL parameters
    const params = new URLSearchParams(window.location.search);
    const initialTheme = params.get('theme');
    if (initialTheme) syncTheme(initialTheme);

    // 2. Listen for postMessage updates from parent
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'SET_THEME') {
        syncTheme(event.data.theme);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return null;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeSync />
    <App />
  </StrictMode>
);
