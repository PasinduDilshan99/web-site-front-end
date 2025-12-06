"use client"
import React, { useState, useEffect } from 'react';

// TypeScript Interfaces
interface SocialMediaProfile {
  platformName: string;
  username: string;
  profileUrl: string;
  isPrimary: boolean;
  isPublic: boolean;
  verified: boolean;
  followerCount: number;
}

interface Employee {
  employeeId: number;
  profilePictureUrl: string;
  employeeCode: string;
  fullName: string | null;
  email: string | null;
  phone: string | null;
  dateOfBirth: string | null;
  employeeType: string;
  departmentName: string;
  designationName: string;
  hireDate: string;
  workLocation: string;
  salary: number;
  socialMediaProfiles: SocialMediaProfile[];
}

interface ApiResponse {
  code: number;
  status: string;
  message: string;
  data: Employee[];
  timestamp: string;
}

const AllEmployees: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [hoveredEmployee, setHoveredEmployee] = useState<number | null>(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:8080/felicita/api/v0/employee/get-all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': 'token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwYXNpbmR1IiwidXNlcklkIjo0LCJ1c2VybmFtZSI6InBhc2luZHUiLCJpYXQiOjE3NjI2Njg5NjksImV4cCI6MTc2MjY2OTA4OX0.5wQ6QL3q2pvSoCEhDze6t_Aub3Vb8hlcMRQ3UQxu8yg'
        },
        credentials: 'include'
      });
      
      const data: ApiResponse = await response.json();
      if (data.code === 200 && data.data) {
        let extendedEmployees = [...data.data];
        
        // Duplicate data if we don't have enough for 3 rows (minimum 9)
        if (data.data.length < 9) {
          const multiplier = Math.ceil(9 / data.data.length);
          extendedEmployees = [];
          for (let i = 0; i < multiplier; i++) {
            extendedEmployees.push(...data.data);
          }
        }
        
        setEmployees(extendedEmployees);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  // Split employees into 3 rows
  const getEmployeeRows = (): { row1: Employee[], row2: Employee[], row3: Employee[] } => {
    const total = employees.length;
    const perRow = Math.ceil(total / 3);
    
    return {
      row1: employees.slice(0, perRow),
      row2: employees.slice(perRow, perRow * 2),
      row3: employees.slice(perRow * 2, total)
    };
  };

  const rows = getEmployeeRows();

  const handleEmployeeClick = (employee: Employee): void => {
    setSelectedEmployee(employee);
  };

  const closeModal = (): void => {
    setSelectedEmployee(null);
  };

  const getEmployeeRowsForDisplay = (): { row1: Employee[], row2: Employee[], row3: Employee[] } => {
    // Create duplicated arrays for seamless infinite scroll
    const createInfiniteRow = (row: Employee[]): Employee[] => {
      return [...row, ...row]; // Duplicate for seamless loop
    };

    return {
      row1: createInfiniteRow(rows.row1),
      row2: createInfiniteRow(rows.row2),
      row3: createInfiniteRow(rows.row3)
    };
  };

  const displayRows = getEmployeeRowsForDisplay();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
        <p className="text-gray-600 text-lg">Loading team members...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Meet Our Team
          </h1>
          <p className="text-gray-600 text-lg">
            Click on any team member to learn more about them
          </p>
        </div>

        {/* Carousel Rows */}
        <div className="space-y-8 md:space-y-12">
          {/* Row 1: Left to Right */}
          <div className="relative overflow-hidden py-4 group">
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
            <div className="flex animate-scroll-left group-hover:animate-pause">
              {displayRows.row1.map((employee, index) => (
                <div
                  key={`row1-${employee.employeeId}-${index}`}
                  className="flex-shrink-0 mx-4 cursor-pointer transform transition-all duration-300 hover:-translate-y-2"
                  onClick={() => handleEmployeeClick(employee)}
                  onMouseEnter={() => setHoveredEmployee(employee.employeeId)}
                  onMouseLeave={() => setHoveredEmployee(null)}
                >
                  <div className="relative">
                    {/* Image Card - Only showing image */}
                    <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-lg">
                      <img
                        src={employee.profilePictureUrl || '/images/default-avatar.png'}
                        alt={employee.fullName || employee.employeeCode}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/images/default-avatar.png';
                        }}
                      />
                    </div>
                    {/* Hover overlay with name - only for hovered item */}
                    {hoveredEmployee === employee.employeeId && (
                      <div className="absolute inset-0 bg-black/70 opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
                        <p className="text-white font-semibold text-lg text-center px-2">
                          {employee.fullName || 'Team Member'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Right to Left */}
          <div className="relative overflow-hidden py-4 group">
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
            <div className="flex animate-scroll-right group-hover:animate-pause">
              {displayRows.row2.map((employee, index) => (
                <div
                  key={`row2-${employee.employeeId}-${index}`}
                  className="flex-shrink-0 mx-4 cursor-pointer transform transition-all duration-300 hover:-translate-y-2"
                  onClick={() => handleEmployeeClick(employee)}
                  onMouseEnter={() => setHoveredEmployee(employee.employeeId)}
                  onMouseLeave={() => setHoveredEmployee(null)}
                >
                  <div className="relative">
                    {/* Image Card - Only showing image */}
                    <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-lg">
                      <img
                        src={employee.profilePictureUrl || '/images/default-avatar.png'}
                        alt={employee.fullName || employee.employeeCode}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/images/default-avatar.png';
                        }}
                      />
                    </div>
                    {/* Hover overlay with name - only for hovered item */}
                    {hoveredEmployee === employee.employeeId && (
                      <div className="absolute inset-0 bg-black/70 opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
                        <p className="text-white font-semibold text-lg text-center px-2">
                          {employee.fullName || 'Team Member'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 3: Left to Right */}
          <div className="relative overflow-hidden py-4 group">
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
            <div className="flex animate-scroll-left-slow group-hover:animate-pause">
              {displayRows.row3.map((employee, index) => (
                <div
                  key={`row3-${employee.employeeId}-${index}`}
                  className="flex-shrink-0 mx-4 cursor-pointer transform transition-all duration-300 hover:-translate-y-2"
                  onClick={() => handleEmployeeClick(employee)}
                  onMouseEnter={() => setHoveredEmployee(employee.employeeId)}
                  onMouseLeave={() => setHoveredEmployee(null)}
                >
                  <div className="relative">
                    {/* Image Card - Only showing image */}
                    <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-lg">
                      <img
                        src={employee.profilePictureUrl || '/images/default-avatar.png'}
                        alt={employee.fullName || employee.employeeCode}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/images/default-avatar.png';
                        }}
                      />
                    </div>
                    {/* Hover overlay with name - only for hovered item */}
                    {hoveredEmployee === employee.employeeId && (
                      <div className="absolute inset-0 bg-black/70 opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
                        <p className="text-white font-semibold text-lg text-center px-2">
                          {employee.fullName || 'Team Member'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal for Employee Details - Only shows safe information */}
        {selectedEmployee && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity duration-300"
              onClick={closeModal}
            ></div>
            
            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div 
                className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100 opacity-100"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center text-gray-700 hover:text-gray-900 z-10 transition-all hover:scale-110"
                >
                  <span className="text-2xl">×</span>
                </button>

                <div className="overflow-y-auto max-h-[90vh]">
                  {/* Modal Header */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 md:p-8">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className="relative">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl">
                          <img
                            src={selectedEmployee.profilePictureUrl || '/images/default-avatar.png'}
                            alt={selectedEmployee.fullName || selectedEmployee.employeeCode}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = '/images/default-avatar.png';
                            }}
                          />
                        </div>
                      </div>
                      
                      <div className="flex-1 text-center md:text-left">
                        <h2 className="text-3xl font-bold text-gray-800 mb-3">
                          {selectedEmployee.fullName || 'Team Member'}
                        </h2>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                            {selectedEmployee.departmentName || 'Department'}
                          </span>
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                            {selectedEmployee.workLocation || 'Work Location'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Modal Body - Combined information */}
                  <div className="p-6 md:p-8">
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b">Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Email - Only shown if not null */}
                        {selectedEmployee.email && (
                          <div className="bg-gray-50 rounded-xl p-4">
                            <p className="text-sm text-gray-500 mb-1">Email Address</p>
                            <p className="font-medium text-gray-800 break-all">
                              {selectedEmployee.email}
                            </p>
                          </div>
                        )}
                        
                        {/* Department */}
                        <div className="bg-blue-50 rounded-xl p-4">
                          <p className="text-sm text-blue-600 mb-1">Department</p>
                          <p className="font-medium text-gray-800">
                            {selectedEmployee.departmentName || 'Not specified'}
                          </p>
                        </div>
                        
                        {/* Work Location */}
                        <div className="bg-green-50 rounded-xl p-4">
                          <p className="text-sm text-green-600 mb-1">Work Location</p>
                          <p className="font-medium text-gray-800">
                            {selectedEmployee.workLocation || 'Not specified'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Social Media Profiles - Only if public */}
                    {selectedEmployee.socialMediaProfiles && 
                     selectedEmployee.socialMediaProfiles.length > 0 && (
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b">Social Media</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {selectedEmployee.socialMediaProfiles
                            .filter(social => social.isPublic)
                            .map((social, index) => (
                              <a
                                key={index}
                                href={social.profileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                      social.platformName.toLowerCase() === 'facebook' ? 'bg-blue-100' :
                                      social.platformName.toLowerCase() === 'twitter' ? 'bg-sky-100' :
                                      social.platformName.toLowerCase() === 'instagram' ? 'bg-pink-100' :
                                      social.platformName.toLowerCase() === 'linkedin' ? 'bg-blue-100' : 'bg-gray-100'
                                    }`}>
                                      <span className={`font-bold ${
                                        social.platformName.toLowerCase() === 'facebook' ? 'text-blue-600' :
                                        social.platformName.toLowerCase() === 'twitter' ? 'text-sky-600' :
                                        social.platformName.toLowerCase() === 'instagram' ? 'text-pink-600' :
                                        social.platformName.toLowerCase() === 'linkedin' ? 'text-blue-700' : 'text-gray-600'
                                      }`}>
                                        {social.platformName.charAt(0)}
                                      </span>
                                    </div>
                                    <div>
                                      <p className="font-medium text-gray-800">{social.platformName}</p>
                                      <p className="text-sm text-gray-600">@{social.username}</p>
                                    </div>
                                  </div>
                                  {/* Removed verified and primary badges */}
                                </div>
                              </a>
                            ))}
                        </div>
                      </div>
                    )}

                    {/* Message if no public social media */}
                    {(!selectedEmployee.socialMediaProfiles || 
                      selectedEmployee.socialMediaProfiles.length === 0 ||
                      selectedEmployee.socialMediaProfiles.every(social => !social.isPublic)) && (
                      <div className="text-center py-8">
                        <div className="inline-block bg-gray-100 rounded-full p-3 mb-3">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                          </svg>
                        </div>
                        <p className="text-gray-500">
                          Contact via email for more information
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Footer Note */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Click on any team member to view their contact information
          </p>
        </div>
      </div>

      {/* Add custom animations to Tailwind */}
      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes pause {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(0);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 40s linear infinite;
        }

        .animate-scroll-left-slow {
          animation: scroll-left 50s linear infinite;
        }

        .animate-pause {
          animation-play-state: paused;
        }

        @media (max-width: 768px) {
          .animate-scroll-left,
          .animate-scroll-right,
          .animate-scroll-left-slow {
            animation-duration: 30s;
          }
        }
      `}</style>
    </div>
  );
};

export default AllEmployees;