"use client";

import { useEffect } from "react";

const GlobalGradientScrollbar: React.FC = () => {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    html.classList.add("gradient-scrollbar");

    body.style.minHeight = "100vh";
    body.style.overflowX = "hidden";

    const style = document.createElement("style");
    style.textContent = `
      /* Scrollbar thumb: sea green → sea blue */
      html::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, #0E9E8E, #0B7EA8);
        border-radius: 8px;
        transition: background 0.3s ease;
      }

      /* Hover effect: slightly deeper tones */
      html::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(180deg, #0B7EA8, #095f82);
      }

      /* Scrollbar track */
      html::-webkit-scrollbar-track {
        background: #dbeafe; /* soft ocean track */
      }

      /* General scrollbar color for Firefox */
      html {
        scrollbar-color: #0E9E8E #dbeafe;
        transition: scrollbar-color 0.3s ease;
      }
      
      html:hover {
        scrollbar-color: #0B7EA8 #dbeafe;
      }
    `;
    document.head.appendChild(style);

    return () => {
      html.classList.remove("gradient-scrollbar");
      body.style.minHeight = "";
      body.style.overflowX = "";
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return null;
};

export default GlobalGradientScrollbar;