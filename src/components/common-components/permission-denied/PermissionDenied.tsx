import React from 'react';
import Link from 'next/link';

const PermissionDenied = () => {
  const handleRequestPermission = () => {
    // Add your request permission logic here
    // This could open a modal, send an email, or redirect to a request form
    console.log('Requesting permission...');
    // Example: router.push('/request-permission');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-teal-100 overflow-hidden">
          {/* Header with wave design */}
          <div className="relative bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-10">
            {/* Decorative waves */}
            <div className="absolute bottom-0 left-0 right-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-12 fill-current text-white opacity-20">
                <path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,170.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
              </svg>
            </div>
            
            {/* Icon and Title */}
            <div className="relative z-10 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/30">
                  <svg 
                    className="w-12 h-12 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                    />
                  </svg>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Access Denied</h1>
              <p className="text-teal-50 text-sm">You don't have permission to view this page</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Message */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-full mb-4">
                <span className="text-3xl">🔒</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Oops! Permission Required
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                It seems you don't have the necessary permissions to access this section. 
                Please contact your administrator or request access to proceed.
              </p>
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-4 mb-8 border border-teal-200">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <svg 
                    className="w-5 h-5 text-teal-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                </div>
                <div className="text-sm text-gray-600">
                  <p className="font-medium text-teal-800 mb-1">Need help?</p>
                  <p>Contact your travel agency administrator at <span className="text-teal-600 font-medium">support@travelagency.com</span> or call <span className="text-teal-600 font-medium">+1 (555) 123-4567</span></p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {/* Request Permission Button */}
              <button
                onClick={handleRequestPermission}
                className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
                  />
                </svg>
                Request Permission
              </button>

              {/* Back Button */}
              <Link
                href="/dashboard" // Change this to your desired back route
                className="w-full bg-white border-2 border-teal-200 text-teal-700 py-3 px-4 rounded-xl font-semibold hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50 hover:border-teal-300 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 flex items-center justify-center gap-2"
              >
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                  />
                </svg>
                Go Back to Dashboard
              </Link>
            </div>

            {/* Help Link */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Need immediate assistance?{' '}
                <button className="text-teal-600 hover:text-cyan-600 font-medium underline underline-offset-2">
                  Contact Support
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-gray-500 mt-4">
          Travel Agency Management System © 2024
        </p>
      </div>
    </div>
  );
};

export default PermissionDenied;