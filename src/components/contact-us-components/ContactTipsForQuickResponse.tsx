import React from "react";

const ContactTipsForQuickResponse = () => {
  return (
    <div className="bg-gradient-to-br from-teal-50 to-white rounded-xl p-6 border border-teal-100">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <svg
          className="w-6 h-6 text-teal-600"
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
        Tips for Quick Response
      </h3>
      <ul className="space-y-3">
        <li className="flex items-start gap-2">
          <div className="flex-shrink-0 w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center mt-0.5">
            <span className="text-xs font-bold text-teal-600">1</span>
          </div>
          <span className="text-gray-700">
            Include your phone number for faster response
          </span>
        </li>
        <li className="flex items-start gap-2">
          <div className="flex-shrink-0 w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center mt-0.5">
            <span className="text-xs font-bold text-teal-600">2</span>
          </div>
          <span className="text-gray-700">
            Specify your travel dates and budget
          </span>
        </li>
        <li className="flex items-start gap-2">
          <div className="flex-shrink-0 w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center mt-0.5">
            <span className="text-xs font-bold text-teal-600">3</span>
          </div>
          <span className="text-gray-700">
            Mention special requirements (family, luxury, adventure)
          </span>
        </li>
        <li className="flex items-start gap-2">
          <div className="flex-shrink-0 w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center mt-0.5">
            <span className="text-xs font-bold text-teal-600">4</span>
          </div>
          <span className="text-gray-700">
            Check your email spam folder for our response
          </span>
        </li>
      </ul>
    </div>
  );
};

export default ContactTipsForQuickResponse;
