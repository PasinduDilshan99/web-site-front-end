"use client"
import React, { useState, useEffect, JSX } from 'react';
import { Linkedin, Facebook, Twitter, Instagram, Share2 } from 'lucide-react';

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
  profilePictureUrl: string | null;
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

const EmployeeDetailsWithSocialMedia: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:8080/felicita/api/v0/employee/with-social-media-links', {
        credentials: 'include'
      });
      
      if (!response.ok) throw new Error('Failed to fetch employees');
      
      const result: ApiResponse = await response.json();
      // Only take first 4 employees
      setEmployees(result.data.slice(0, 4) || []);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  const getSocialIcon = (platformName: string): JSX.Element => {
    const platform = platformName.toLowerCase();
    if (platform.includes('linkedin')) return <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />;
    if (platform.includes('facebook')) return <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />;
    if (platform.includes('twitter') || platform.includes('x')) return <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />;
    if (platform.includes('instagram')) return <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />;
    return <Share2 className="w-5 h-5 sm:w-6 sm:h-6" />;
  };

  const getInitials = (name: string | null): string => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-purple-50 to-amber-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-base">Loading team members...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-purple-50 to-amber-50 flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <p className="text-red-600 font-semibold text-sm sm:text-base">Error loading data: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-amber-50 via-purple-50 to-amber-50 py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-3 sm:mb-4 md:mb-6 leading-tight">
            Our Amazing Team Players
          </h1>
          <p className="text-gray-500 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto px-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
            tempor incididunt ut labore
          </p>
        </div>

        {/* Employee Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-8 xl:gap-10">
          {employees.map((employee) => (
            <div
              key={employee.employeeId}
              className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 ease-out p-6 sm:p-8 md:p-10 flex flex-col items-center transform hover:-translate-y-2"
            >
              {/* Profile Picture with Social Media Overlay */}
              <div className="relative w-48 h-48 sm:w-52 sm:h-52 md:w-56 md:h-56 lg:w-48 lg:h-48 xl:w-56 xl:h-56 mb-6 sm:mb-8 group">
                {employee.profilePictureUrl ? (
                  <img
                    src={employee.profilePictureUrl}
                    alt={employee.fullName || 'Employee'}
                    className="w-full h-full rounded-full object-cover shadow-lg transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-400 via-purple-500 to-purple-600 flex items-center justify-center text-white text-4xl sm:text-5xl md:text-6xl lg:text-5xl font-bold shadow-lg transition-transform duration-500 ease-out group-hover:scale-105">
                    {getInitials(employee.fullName)}
                  </div>
                )}
                
                {employee.socialMediaProfiles.length > 0 && (
                  <>
                    {/* Dark Overlay on Hover */}
                    <div className="absolute inset-0 bg-black rounded-full opacity-0 group-hover:opacity-50 transition-all duration-500 ease-out"></div>
                    
                    {/* Social Media Icons */}
                    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out flex items-center justify-center">
                      <div className="flex gap-2 sm:gap-3 md:gap-4 flex-wrap justify-center px-4">
                        {employee.socialMediaProfiles.slice(0, 4).map((profile, idx) => (
                          <a
                            key={idx}
                            href={profile.profileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white text-purple-600 p-2.5 sm:p-3 md:p-3.5 rounded-full hover:bg-amber-50 hover:text-amber-600 transform hover:scale-125 transition-all duration-300 ease-out shadow-lg opacity-0 group-hover:opacity-100 hover:shadow-2xl"
                            style={{
                              transitionDelay: `${idx * 75}ms`,
                              animation: `fadeInUp 0.5s ease-out ${idx * 75}ms forwards`
                            }}
                            title={`${profile.platformName}: @${profile.username}${profile.verified ? ' ✓' : ''}`}
                          >
                            {getSocialIcon(profile.platformName)}
                          </a>
                        ))}
                      </div>
                    </div>
                    
                    {/* Share Icon Badge */}
                    <div className="absolute -bottom-3 sm:-bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-amber-500 text-white p-2.5 sm:p-3 md:p-3.5 rounded-full shadow-xl transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-12">
                      <Share2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    </div>
                  </>
                )}
              </div>

              {/* Employee Info */}
              <div className="text-center mt-2 sm:mt-3">
                <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-xl xl:text-2xl font-bold text-slate-800 mb-2 sm:mb-3 leading-tight transition-colors duration-300 hover:text-purple-600">
                  {employee.fullName || 'No Name'}
                </h2>
                <p className="text-amber-600 font-semibold text-sm sm:text-base md:text-lg lg:text-base transition-colors duration-300 hover:text-amber-700">
                  {employee.designationName}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animation Keyframes */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default EmployeeDetailsWithSocialMedia;