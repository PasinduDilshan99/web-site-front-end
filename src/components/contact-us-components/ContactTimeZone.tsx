import React from "react";

const ContactTimeZone = () => {
  return (
    <div className="bg-gray-50 rounded-xl p-5">
      <div className="flex items-center gap-2 text-sm text-gray-600">
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
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Sri Lanka Time (GMT+5:30)</span>
      </div>
    </div>
  );
};

export default ContactTimeZone;
