import { useEffect } from 'react';

interface ScrollbarStyleOptions {
  width?: string;
  trackColor?: string;
  thumbGradient?: string;
  borderRadius?: string;
}

export const useScrollbarStyle = (options?: ScrollbarStyleOptions) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const {
      width = '8px',
      trackColor = 'transparent',
      thumbGradient = 'linear-gradient(45deg, #f59e0b, #8b5cf6)',
      borderRadius = '10px',
    } = options || {};

    const style = document.createElement('style');
    style.id = 'custom-scrollbar-style';
    style.textContent = `
      /* For Webkit browsers */
      .custom-scrollbar::-webkit-scrollbar {
        width: ${width};
        height: ${width};
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: ${trackColor};
        border-radius: ${borderRadius};
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: ${thumbGradient};
        border-radius: ${borderRadius};
        border: 2px solid transparent;
        background-clip: padding-box;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        opacity: 0.9;
      }
      /* For Firefox */
      .custom-scrollbar {
        scrollbar-width: thin;
        scrollbar-color: #f59e0b ${trackColor};
      }
    `;

    document.head.appendChild(style);

    return () => {
      const existingStyle = document.getElementById('custom-scrollbar-style');
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
    };
  }, [options]);
};