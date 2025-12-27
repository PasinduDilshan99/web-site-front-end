import React from 'react'

const ContactWorkingHours = () => {
  return (
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Working Hours
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="font-medium text-gray-800">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-medium text-gray-800">9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-medium text-gray-800">10:00 AM - 4:00 PM</span>
                </div>
                <div className="pt-2 mt-2 border-t border-gray-100">
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Emergency:</span>
                    <a href="tel:+94771234567" className="text-red-600 font-bold hover:text-red-700">
                      +94 77 123 4567
                    </a>
                  </div>
                </div>
              </div>
            </div>
  )
}

export default ContactWorkingHours
