"use client";
import React, { useState, useEffect } from 'react';
import { 
  Linkedin, 
  Twitter, 
  Facebook, 
  Instagram, 
  Globe,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Users,
  ChevronRight,
  Star,
  Award
} from 'lucide-react';

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

const EmployeeDetails = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [selectedType, setSelectedType] = useState<string>('all');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('http://localhost:8080/felicita/api/v0/employee/with-social-media-links', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const apiResponse: ApiResponse = await response.json();

        if (apiResponse.code === 200 && apiResponse.data) {
          // Sort employees: founders first, then executives, then others
          const sortedEmployees = apiResponse.data.sort((a, b) => {
            // Founders first
            if (a.designationName?.toLowerCase().includes('founder') || a.designationName?.toLowerCase().includes('ceo')) return -1;
            if (b.designationName?.toLowerCase().includes('founder') || b.designationName?.toLowerCase().includes('ceo')) return 1;
            
            // Executives next
            if (a.employeeType === 'executive') return -1;
            if (b.employeeType === 'executive') return 1;
            
            // Tour guides
            if (a.designationName?.toLowerCase().includes('guide')) return -1;
            if (b.designationName?.toLowerCase().includes('guide')) return 1;
            
            return 0;
          });
          
          setEmployees(sortedEmployees);
          if (sortedEmployees.length > 0) {
            setSelectedEmployee(sortedEmployees[0]);
          }
        } else {
          setError(apiResponse.message || "Failed to fetch employees");
        }
      } catch (err) {
        console.error("Error fetching employees:", err);
        setError(err instanceof Error ? err.message : "Failed to load employees");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Get icon for social media platform
  const getSocialIcon = (platform: string) => {
    const platformLower = platform.toLowerCase();
    if (platformLower.includes('linkedin')) return <Linkedin className="w-4 h-4" />;
    if (platformLower.includes('twitter') || platformLower.includes('x')) return <Twitter className="w-4 h-4" />;
    if (platformLower.includes('facebook')) return <Facebook className="w-4 h-4" />;
    if (platformLower.includes('instagram')) return <Instagram className="w-4 h-4" />;
    return <Globe className="w-4 h-4" />;
  };

  // Get color for social media platform
  const getSocialColor = (platform: string) => {
    const platformLower = platform.toLowerCase();
    if (platformLower.includes('linkedin')) return 'text-blue-700';
    if (platformLower.includes('twitter') || platformLower.includes('x')) return 'text-blue-400';
    if (platformLower.includes('facebook')) return 'text-blue-600';
    if (platformLower.includes('instagram')) return 'text-pink-600';
    return 'text-gray-600';
  };

  // Get employee type badge color
  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'founder':
      case 'ceo':
        return 'bg-purple-100 text-purple-800';
      case 'executive':
        return 'bg-blue-100 text-blue-800';
      case 'guide':
        return 'bg-green-100 text-green-800';
      case 'driver':
        return 'bg-amber-100 text-amber-800';
      case 'hr':
        return 'bg-pink-100 text-pink-800';
      case 'sales':
        return 'bg-teal-100 text-teal-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter employees by type
  const filteredEmployees = selectedType === 'all' 
    ? employees 
    : employees.filter(emp => emp.employeeType === selectedType);

  // Get employee types for filter
  const employeeTypes = ['all', ...new Set(employees.map(emp => emp.employeeType))];

  // Fallback data in case API fails
  const fallbackEmployees: Employee[] = [
    {
      employeeId: 1,
      employeeCode: "EMP001",
      fullName: "Kristin Watson",
      email: "kristin@travelagency.com",
      phone: "+94 77 123 4567",
      dateOfBirth: "1988-05-15",
      employeeType: "guide",
      departmentName: "Tour Operations",
      designationName: "Senior Tour Guide",
      hireDate: "2018-03-10",
      workLocation: "Colombo",
      salary: 150000,
      socialMediaProfiles: [
        { platformName: "LinkedIn", username: "kristin.watson", profileUrl: "#", isPrimary: true, isPublic: true, verified: true, followerCount: 2500 },
        { platformName: "Instagram", username: "kristin_travels", profileUrl: "#", isPrimary: false, isPublic: true, verified: true, followerCount: 3200 }
      ]
    },
    {
      employeeId: 2,
      employeeCode: "EMP002",
      fullName: "Robert Fox",
      email: "robert@travelagency.com",
      phone: "+94 71 234 5678",
      dateOfBirth: "1980-11-20",
      employeeType: "founder",
      departmentName: "Executive Management",
      designationName: "Founder & CEO",
      hireDate: "2010-01-15",
      workLocation: "Head Office",
      salary: 400000,
      socialMediaProfiles: [
        { platformName: "LinkedIn", username: "robert.fox", profileUrl: "#", isPrimary: true, isPublic: true, verified: true, followerCount: 5000 },
        { platformName: "Twitter", username: "robert_fox_ceo", profileUrl: "#", isPrimary: false, isPublic: true, verified: true, followerCount: 3500 }
      ]
    },
    {
      employeeId: 3,
      employeeCode: "EMP003",
      fullName: "Jane Cooper",
      email: "jane@travelagency.com",
      phone: "+94 76 345 6789",
      dateOfBirth: "1985-07-30",
      employeeType: "founder",
      departmentName: "Executive Management",
      designationName: "Co-Founder & COO",
      hireDate: "2010-01-15",
      workLocation: "Head Office",
      salary: 350000,
      socialMediaProfiles: [
        { platformName: "LinkedIn", username: "jane.cooper", profileUrl: "#", isPrimary: true, isPublic: true, verified: true, followerCount: 4200 },
        { platformName: "Instagram", username: "jane_cooper_coo", profileUrl: "#", isPrimary: false, isPublic: true, verified: true, followerCount: 2800 }
      ]
    },
    {
      employeeId: 4,
      employeeCode: "EMP004",
      fullName: "Eleanor Pena",
      email: "eleanor@travelagency.com",
      phone: "+94 78 456 7890",
      dateOfBirth: "1990-02-25",
      employeeType: "guide",
      departmentName: "Tour Operations",
      designationName: "Tour Guide",
      hireDate: "2019-08-20",
      workLocation: "Kandy",
      salary: 120000,
      socialMediaProfiles: [
        { platformName: "Instagram", username: "eleanor_travels", profileUrl: "#", isPrimary: true, isPublic: true, verified: true, followerCount: 4100 },
        { platformName: "Facebook", username: "eleanor.travel.guide", profileUrl: "#", isPrimary: false, isPublic: true, verified: true, followerCount: 1900 }
      ]
    }
  ];

  const displayEmployees = employees.length > 0 ? employees : fallbackEmployees;

  if (loading) {
    return (
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white p-4 rounded-xl shadow animate-pulse">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                      <div className="h-3 bg-gray-100 rounded w-24"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-6 bg-gray-200 rounded w-48 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                    <div className="h-3 bg-gray-100 rounded w-24"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Amazing Team Players
          </h1>
          <div className="w-24 h-1 bg-amber-400 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
              selectedType === 'all'
                ? 'bg-amber-500 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm'
            }`}
          >
            All Team
          </button>
          {employeeTypes.filter(type => type !== 'all').map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedType === type
                  ? `${getTypeBadgeColor(type)} shadow-lg`
                  : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Employee List Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {filteredEmployees.map((employee) => (
              <div
                key={employee.employeeId}
                onClick={() => setSelectedEmployee(employee)}
                className={`bg-white rounded-xl shadow-lg p-5 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                  selectedEmployee?.employeeId === employee.employeeId
                    ? 'ring-2 ring-amber-400 border-l-4 border-amber-400'
                    : 'hover:shadow-xl'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-teal-400 flex items-center justify-center text-white text-xl font-bold">
                      {employee.fullName 
                        ? employee.fullName.split(' ').map(n => n[0]).join('').toUpperCase()
                        : 'GU'}
                    </div>
                    {employee.designationName?.toLowerCase().includes('founder') && (
                      <div className="absolute -top-1 -right-1 bg-amber-500 text-white p-1 rounded-full">
                        <Star className="w-3 h-3" />
                      </div>
                    )}
                  </div>

                  {/* Employee Info */}
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg">
                      {employee.fullName || employee.designationName}
                    </h3>
                    <p className="text-gray-600 text-sm mb-1">{employee.designationName}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeBadgeColor(employee.employeeType)}`}>
                        {employee.employeeType}
                      </span>
                      {employee.socialMediaProfiles?.some(p => p.verified) && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium flex items-center gap-1">
                          <Award className="w-3 h-3" /> Verified
                        </span>
                      )}
                    </div>
                  </div>

                  <ChevronRight className={`w-5 h-5 ${
                    selectedEmployee?.employeeId === employee.employeeId 
                      ? 'text-amber-500' 
                      : 'text-gray-300'
                  }`} />
                </div>
              </div>
            ))}
          </div>

          {/* Employee Details Panel */}
          <div className="lg:col-span-2">
            {selectedEmployee ? (
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Header with gradient */}
                <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-8">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    {/* Profile Image */}
                    <div className="relative">
                      <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center text-white text-4xl font-bold">
                        {selectedEmployee.fullName 
                          ? selectedEmployee.fullName.split(' ').map(n => n[0]).join('').toUpperCase()
                          : selectedEmployee.designationName?.split(' ').map(n => n[0]).join('').toUpperCase() || 'GU'}
                      </div>
                      {selectedEmployee.designationName?.toLowerCase().includes('founder') && (
                        <div className="absolute bottom-2 right-2 bg-amber-500 text-white p-2 rounded-full shadow-lg">
                          <Star className="w-5 h-5" />
                        </div>
                      )}
                    </div>

                    {/* Profile Info */}
                    <div className="text-white flex-1">
                      <h2 className="text-3xl font-bold mb-2">
                        {selectedEmployee.fullName || selectedEmployee.designationName}
                      </h2>
                      <p className="text-xl mb-4 opacity-90">{selectedEmployee.designationName}</p>
                      
                      <div className="flex flex-wrap gap-4">
                        {selectedEmployee.departmentName && (
                          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                            {selectedEmployee.departmentName}
                          </span>
                        )}
                        <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                          {selectedEmployee.workLocation}
                        </span>
                        {selectedEmployee.hireDate && (
                          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                            Since {new Date(selectedEmployee.hireDate).getFullYear()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Contact Information */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Users className="w-5 h-5 text-blue-500" />
                        Contact Information
                      </h3>
                      
                      <div className="space-y-3">
                        {selectedEmployee.email && (
                          <div className="flex items-center gap-3 text-gray-600">
                            <Mail className="w-4 h-4 text-blue-400" />
                            <span>{selectedEmployee.email}</span>
                          </div>
                        )}
                        
                        {selectedEmployee.phone && (
                          <div className="flex items-center gap-3 text-gray-600">
                            <Phone className="w-4 h-4 text-green-400" />
                            <span>{selectedEmployee.phone}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-3 text-gray-600">
                          <MapPin className="w-4 h-4 text-red-400" />
                          <span>{selectedEmployee.workLocation}</span>
                        </div>
                        
                        {selectedEmployee.hireDate && (
                          <div className="flex items-center gap-3 text-gray-600">
                            <Calendar className="w-4 h-4 text-purple-400" />
                            <span>Joined {new Date(selectedEmployee.hireDate).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Employee Details */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-amber-500" />
                        Employee Details
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-500">Employee ID</div>
                          <div className="font-semibold">{selectedEmployee.employeeCode}</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-500">Department</div>
                          <div className="font-semibold">{selectedEmployee.departmentName}</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-500">Type</div>
                          <div className={`font-semibold ${getTypeBadgeColor(selectedEmployee.employeeType)} px-2 py-1 rounded-full inline-block`}>
                            {selectedEmployee.employeeType}
                          </div>
                        </div>
                        {selectedEmployee.dateOfBirth && (
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-sm text-gray-500">Date of Birth</div>
                            <div className="font-semibold">
                              {new Date(selectedEmployee.dateOfBirth).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Social Media Profiles */}
                  {selectedEmployee.socialMediaProfiles && selectedEmployee.socialMediaProfiles.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Social Media Profiles</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {selectedEmployee.socialMediaProfiles.map((profile, index) => (
                          <a
                            key={index}
                            href={profile.profileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group bg-white border rounded-xl p-4 flex items-center justify-between hover:shadow-lg transition-all duration-300 ${
                              profile.isPrimary ? 'ring-2 ring-blue-500' : ''
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${getSocialColor(profile.platformName)} bg-opacity-10`}>
                                {getSocialIcon(profile.platformName)}
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{profile.platformName}</div>
                                <div className="text-sm text-gray-500">@{profile.username}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-gray-900">{profile.followerCount.toLocaleString()}</div>
                              <div className="text-xs text-gray-500">followers</div>
                              {profile.verified && (
                                <div className="inline-flex items-center gap-1 mt-1 text-green-600 text-xs">
                                  <Award className="w-3 h-3" /> Verified
                                </div>
                              )}
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {(!selectedEmployee.socialMediaProfiles || selectedEmployee.socialMediaProfiles.length === 0) && (
                    <div className="text-center py-8 text-gray-500">
                      No social media profiles available for this employee
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Users className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Select an Employee</h3>
                <p className="text-gray-500">Click on any team member from the list to view their details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmployeeDetails;