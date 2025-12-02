'use client';

import { useEffect } from 'react';

const GlobalGradientScrollbar: React.FC = () => {
  useEffect(() => {
    // Add smooth scrolling and gradient classes to html element
    const html = document.documentElement;
    const body = document.body;
    
    // Add gradient scrollbar class
    html.classList.add('gradient-scrollbar');
    
    // Set min-height to ensure scrollbar is visible
    body.style.minHeight = '100vh';
    body.style.overflowX = 'hidden';
    
    // Optional: Add a transition for smooth hover effects
    const style = document.createElement('style');
    style.textContent = `
      html::-webkit-scrollbar-thumb {
        transition: background 0.3s ease;
      }
      
      /* For Firefox */
      html {
        scrollbar-color: #f59e0b #f1f5f9;
        transition: scrollbar-color 0.3s ease;
      }
      
      html:hover {
        scrollbar-color: #d97706 #f1f5f9;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      // Cleanup
      html.classList.remove('gradient-scrollbar');
      body.style.minHeight = '';
      body.style.overflowX = '';
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return null;
};

export default GlobalGradientScrollbar;