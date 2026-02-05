"use client";

import React, { useState } from "react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Briefcase, 
  MessageSquare, 
  User, 
  ChevronDown, 
  ChevronUp 
} from "lucide-react";
import { useParams } from "next/navigation";
import { TourAssignedEmployeeResponse } from "@/types/employee-types";

interface TourAssignedUserProps {
  assignUser: TourAssignedEmployeeResponse | null;
}

const TourAssignedUser: React.FC<TourAssignedUserProps> = ({ assignUser }) => {
  const params = useParams();
  const sriLankanTourId = params?.sriLankanTourId
  const [expandedTours, setExpandedTours] = useState(false);
  
  if (!assignUser) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Tour Expert</h3>
        <div className="text-center py-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 mb-4">
            <User className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-600">Tour expert information will be assigned soon</p>
          <p className="text-sm text-gray-500 mt-2">Check back later for details</p>
        </div>
      </div>
    );
  }

  const fullName = `${assignUser.firstName} ${assignUser.lastName}`;
  
  const filteredRelatedTours = assignUser.relatedOtherTours?.filter(
    (tour) => tour.tourId.toString() !== sriLankanTourId
  ) || [];
  
  const hasRelatedTours = filteredRelatedTours.length > 0;
  const displayToursCount = expandedTours ? filteredRelatedTours.length : 3;
  const displayTours = filteredRelatedTours.slice(0, displayToursCount);
  const canExpand = filteredRelatedTours.length > 3;
  const showExpandButton = canExpand && !expandedTours;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">Your Tour Expert</h3>
        <div className="px-3 py-1 bg-gradient-to-r from-sky-100 to-teal-100 rounded-full">
          <span className="text-sm font-medium text-sky-700">
            Assigned Guide
          </span>
        </div>
      </div>

      {/* User Profile */}
      <div className="flex items-start space-x-4 mb-6 pb-6 border-b border-gray-100">
        <div className="relative">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gradient-to-r from-sky-500 to-teal-500">
            {assignUser.imageUrl ? (
              <img
                src={assignUser.imageUrl}
                alt={fullName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = `
                    <div class="w-full h-full bg-gradient-to-r from-sky-200 to-teal-200 flex items-center justify-center">
                      <span class="text-2xl font-bold text-gray-700">
                        ${assignUser.firstName.charAt(0)}${assignUser.lastName.charAt(0)}
                      </span>
                    </div>
                  `;
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-sky-200 to-teal-200 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-700">
                  {assignUser.firstName.charAt(0)}
                  {assignUser.lastName.charAt(0)}
                </span>
              </div>
            )}
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-sky-600 to-teal-600 rounded-full border-2 border-white flex items-center justify-center">
            <Briefcase className="w-3 h-3 text-white" />
          </div>
        </div>

        <div className="flex-1">
          <h4 className="text-lg font-bold text-gray-800">{fullName}</h4>
          <p className="text-sm text-sky-600 font-medium mb-2">
            {assignUser.designationName}
          </p>
          <p className="text-sm text-gray-600">
            Your dedicated tour expert for this journey
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-sky-50 to-teal-50 flex items-center justify-center">
            <Mail className="w-5 h-5 text-sky-600" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-500">Email</p>
            <a
              href={`mailto:${assignUser.email}`}
              className="text-sm font-medium text-gray-700 hover:text-sky-600 transition-colors"
            >
              {assignUser.email}
            </a>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-teal-50 to-cyan-50 flex items-center justify-center">
            <Phone className="w-5 h-5 text-teal-600" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-500">Phone</p>
            <a
              href={`tel:${assignUser.mobileNumber}`}
              className="text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors"
            >
              {assignUser.mobileNumber}
            </a>
          </div>
        </div>
      </div>

      {/* Personalized Message */}
      {assignUser.assignMessage && (
        <div className="mb-6 p-4 bg-gradient-to-r from-sky-50 to-teal-50 rounded-lg border border-sky-100">
          <div className="flex items-center mb-2">
            <MessageSquare className="w-4 h-4 text-sky-600 mr-2" />
            <span className="text-sm font-medium text-gray-700">
              Personal Message
            </span>
          </div>
          <p className="text-sm text-gray-600 italic">
            {assignUser.assignMessage}
          </p>
        </div>
      )}

      {/* Related Tours */}
      {hasRelatedTours && (
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h5 className="text-sm font-bold text-gray-700">
              Other Tours by {assignUser.firstName}
            </h5>
            {canExpand && (
              <button
                onClick={() => setExpandedTours(!expandedTours)}
                className="text-xs text-sky-600 hover:text-sky-700 font-medium flex items-center gap-1"
              >
                {expandedTours ? (
                  <>
                    Show Less
                    <ChevronUp className="w-3 h-3" />
                  </>
                ) : (
                  <>
                    Show More
                    <ChevronDown className="w-3 h-3" />
                  </>
                )}
              </button>
            )}
          </div>
          
          <div className="space-y-2">
            {displayTours.map((tour) => (
              <a
                key={tour.tourId}
                href={`/sri-lankan-tours/${tour.tourId}`}
                className="block p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100 hover:border-sky-200"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 truncate mr-2">
                    {tour.tourName}
                  </span>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-gray-400 flex-shrink-0" />
                    <span className="text-xs text-gray-500">View</span>
                  </div>
                </div>
              </a>
            ))}
            
            {/* No more tours message when expanded */}
            {expandedTours && filteredRelatedTours.length > 3 && (
              <div className="text-center pt-2">
                <p className="text-xs text-gray-500">
                  Showing all {filteredRelatedTours.length} tours
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TourAssignedUser;