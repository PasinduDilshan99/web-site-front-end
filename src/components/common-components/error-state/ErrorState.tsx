interface ErrorStateProps {
  title?: string;
  message: string;
  icon?: "alert" | "exclamation" | "ban" | "warning";
  actionLabel?: string;
  onAction?: () => void;
  size?: "sm" | "md" | "lg";
  variant?: "error" | "warning" | "info";
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Something went wrong",
  message,
  icon = "alert",
  actionLabel,
  onAction,
  size = "md",
  variant = "error",
}) => {
  const sizeClasses = {
    sm: {
      container: "min-h-[200px]",
      icon: "w-12 h-12 sm:w-14 sm:h-14",
      title: "text-sm sm:text-base font-semibold",
      message: "text-xs sm:text-sm",
    },
    md: {
      container: "min-h-[300px] sm:min-h-[400px]",
      icon: "w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24",
      title: "text-base sm:text-lg lg:text-xl font-semibold",
      message: "text-sm sm:text-base lg:text-lg",
    },
    lg: {
      container: "min-h-[400px] sm:min-h-[500px]",
      icon: "w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32",
      title: "text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold",
      message: "text-base sm:text-lg lg:text-xl",
    },
  };

  const variantClasses = {
    error: {
      icon: "text-red-500",
      title: "text-red-600",
      message: "text-red-500",
      glow: "from-red-400 to-red-600",
      button: "from-red-600 to-red-700 hover:from-red-700 hover:to-red-800",
    },
    warning: {
      icon: "text-amber-500",
      title: "text-amber-600",
      message: "text-amber-500",
      glow: "from-amber-400 to-amber-600",
      button:
        "from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800",
    },
    info: {
      icon: "text-blue-500",
      title: "text-blue-600",
      message: "text-blue-500",
      glow: "from-blue-400 to-blue-600",
      button: "from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800",
    },
  };

  const icons = {
    alert: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    ),
    exclamation: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
    ban: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
      />
    ),
    warning: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    ),
  };

  return (
    <div
      className={`${sizeClasses[size].container} flex items-center justify-center`}
    >
      <div className="text-center px-4 max-w-md">
        <div className="mb-4 sm:mb-6 relative inline-block">
          <div
            className={`absolute inset-0 bg-gradient-to-r ${variantClasses[variant].glow} opacity-20 blur-xl rounded-full animate-pulse`}
          ></div>
          <svg
            className={`${sizeClasses[size].icon} mx-auto ${variantClasses[variant].icon} relative z-10`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {icons[icon]}
          </svg>
        </div>
        <h3
          className={`${sizeClasses[size].title} ${variantClasses[variant].title} mb-2`}
        >
          {title}
        </h3>
        <p
          className={`${sizeClasses[size].message} ${variantClasses[variant].message} font-medium`}
        >
          {message}
        </p>
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className={`mt-4 sm:mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r ${variantClasses[variant].button} text-white text-sm sm:text-base font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};
