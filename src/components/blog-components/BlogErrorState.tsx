// components/blog-components/BlogErrorState.tsx
import React from 'react';

interface BlogErrorStateProps {
  error: string;
  onRetry: () => void;
  title?: string;
}

const BlogErrorState: React.FC<BlogErrorStateProps> = ({ 
  error, 
  onRetry, 
  title = "Failed to Load Blogs" 
}) => {
  return (
    <section className="relative py-8 sm:py-12 md:py-16 lg:py-20 min-h-[60vh] flex items-center overflow-hidden">
      {/* Professional gradient background - neutral and elegant */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"></div>
      </div>
      
      {/* Subtle decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-slate-700/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-slate-600/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-slate-700/10 rounded-full blur-3xl"></div>
      
      {/* Minimal floating particles - very subtle */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-slate-400/20 rounded-full animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 w-full">
        <div className="max-w-3xl mx-auto">
          {/* Main Error Card - Clean and professional */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 md:p-10 animate-fadeInUp">
            {/* Error Icon - More refined */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg 
                    className="w-10 h-10 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Title - Professional typography */}
            <h2 className="text-2xl md:text-3xl font-semibold text-center text-slate-800 mb-3">
              {title}
            </h2>

            {/* Error Message - Clean warning */}
            <div className="bg-amber-50 rounded-lg p-4 mb-6 border border-amber-200">
              <p className="text-amber-700 text-center text-sm">
                {error}
              </p>
            </div>

            {/* Error Details */}
            <div className="mb-8">
              <p className="text-slate-600 text-center text-sm mb-4">
                We encountered an issue while loading the blog content. Here are a few things you can try:
              </p>
              
              {/* Quick Tips - Simplified */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                  <div className="w-5 h-5 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-slate-600 text-xs">1</span>
                  </div>
                  <span className="text-xs text-slate-600">Check your internet connection</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                  <div className="w-5 h-5 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-slate-600 text-xs">2</span>
                  </div>
                  <span className="text-xs text-slate-600">Refresh the page</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                  <div className="w-5 h-5 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-slate-600 text-xs">3</span>
                  </div>
                  <span className="text-xs text-slate-600">Clear browser cache</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                  <div className="w-5 h-5 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-slate-600 text-xs">4</span>
                  </div>
                  <span className="text-xs text-slate-600">Try again in a few minutes</span>
                </div>
              </div>
            </div>

            {/* Action Buttons - Professional and clean */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <button
                onClick={onRetry}
                className="px-6 py-2.5 bg-slate-800 text-white rounded-lg font-medium text-sm hover:bg-slate-700 transition-colors duration-200 flex items-center gap-2 shadow-sm"
              >
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                  />
                </svg>
                Try Again
              </button>

              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2.5 bg-white text-slate-700 rounded-lg font-medium text-sm border border-slate-300 hover:bg-slate-50 transition-colors duration-200 flex items-center gap-2"
              >
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                  />
                </svg>
                Refresh Page
              </button>
            </div>

            {/* Support Link - Subtle */}
            <div className="mt-6 text-center">
              <p className="text-xs text-slate-500">
                Need help?{' '}
                <button 
                  onClick={() => window.location.href = '/contact'}
                  className="text-slate-700 hover:text-slate-900 font-medium transition-colors"
                >
                  Contact Support
                </button>
              </p>
            </div>
          </div>

          {/* Error Code - Minimal */}
          <div className="mt-4 text-center text-slate-500 text-xs">
            <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-200">
              Error: BLOG_LOAD_FAILED • {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) translateX(0px); 
            opacity: 0.1;
          }
          50% { 
            transform: translateY(-10px) translateX(5px); 
            opacity: 0.2;
          }
        }
        
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default BlogErrorState;