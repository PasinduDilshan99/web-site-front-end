import React from "react";

const ContactResponseTime = () => {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-blue-100 rounded-lg">
          <svg
            className="w-6 h-6 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div>
          <h4 className="font-bold text-gray-800">Response Time</h4>
          <p className="text-sm text-gray-600">We value your time</p>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Within 1 hour:</span>
          <span className="font-semibold text-green-600">WhatsApp</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Within 4 hours:</span>
          <span className="font-semibold text-blue-600">Phone Calls</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Within 24 hours:</span>
          <span className="font-semibold text-purple-600">Email/Form</span>
        </div>
      </div>
    </div>
  );
};

export default ContactResponseTime;
