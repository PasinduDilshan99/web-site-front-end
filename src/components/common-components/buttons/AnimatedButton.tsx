import React from "react";

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  gradientFrom?: string;
  gradientTo?: string;
  hoverFrom?: string;
  hoverTo?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  fullWidth?: boolean;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  className = "",
  size = "md",
  gradientFrom = "from-amber-600",
  gradientTo = "to-purple-600",
  hoverFrom = "hover:from-purple-700",
  hoverTo = "hover:to-amber-700",
  type = "button",
  disabled = false,
  fullWidth = false,
}) => {
  // Responsive padding and text size classes
  const responsiveSizeClasses = {
    xs: `
      px-3 py-1.5 text-xs
      sm:px-4 sm:py-2 sm:text-sm
      md:text-base
    `,
    sm: `
      px-4 py-2.5 text-sm
      sm:px-5 sm:py-3 sm:text-base
      md:px-6 md:py-3 md:text-lg
      lg:text-xl
    `,
    md: `
      px-5 py-3 text-base
      sm:px-6 sm:py-3.5 sm:text-lg
      md:px-7 md:py-4 md:text-xl
      lg:px-8 lg:py-4 lg:text-2xl
    `,
    lg: `
      px-6 py-3.5 text-lg
      sm:px-7 sm:py-4 sm:text-xl
      md:px-8 md:py-4.5 md:text-2xl
      lg:px-10 lg:py-5 lg:text-3xl
      xl:text-4xl
    `,
    xl: `
      px-7 py-4 text-xl
      sm:px-8 sm:py-5 sm:text-2xl
      md:px-10 md:py-5 md:text-3xl
      lg:px-12 lg:py-6 lg:text-4xl
      xl:px-14 xl:py-7 xl:text-5xl
    `,
    "2xl": `
      px-8 py-5 text-2xl
      sm:px-10 sm:py-6 sm:text-3xl
      md:px-12 md:py-7 md:text-4xl
      lg:px-16 lg:py-8 lg:text-5xl
      xl:px-20 xl:py-10 xl:text-6xl
    `,
  };

  // Ultra-smooth transition classes
  const smoothTransitionClasses = `
    bg-gradient-to-r ${gradientFrom} ${gradientTo}
    text-white font-semibold rounded-full
    relative overflow-hidden
    transform transition-all duration-700 ease-out
    shadow-lg hover:shadow-2xl
    focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-40
    active:scale-[0.98]
    disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none
    ${fullWidth ? "w-full" : "w-auto"}
    
    /* Smooth gradient transition using background-position */
    bg-[length:200%_100%] bg-left
    hover:bg-right
    transition-all duration-1000 ease-in-out
    
    /* Responsive sizing */
    ${responsiveSizeClasses[size]}
    
    /* Custom class */
    ${className}
  `
    .replace(/\s+/g, " ")
    .trim();

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={smoothTransitionClasses}
      style={{
        backgroundImage: `linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to), var(--tw-gradient-from))`,
      }}
    >
      <span className="relative z-10 transition-colors duration-700">
        {children}
      </span>
    </button>
  );
};

export default AnimatedButton;
