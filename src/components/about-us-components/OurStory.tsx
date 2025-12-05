import React from 'react';
import { Calendar, Users, Award, MapPin, Heart, Globe } from 'lucide-react';

const OurStory = () => {
  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
            Our Journey
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Story
          </h1>
          <div className="w-24 h-1 bg-amber-400 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From a small travel desk in Colombo to becoming Sri Lanka's trusted travel partner. 
            Our journey is one of passion, dedication, and love for our beautiful island.
          </p>
        </div>

        {/* Timeline Section */}
        <div className="relative mb-16">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-200 to-teal-200"></div>
          
          <div className="space-y-12">
            {/* Timeline Item 1 */}
            <div className="relative flex items-center">
              <div className="hidden md:block md:w-1/2"></div>
              <div className="w-6 h-6 absolute left-1/2 transform -translate-x-1/2 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10"></div>
              <div className="md:w-1/2 md:pl-12">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">2010 - The Beginning</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Founded in Colombo with a simple mission: to share the beauty of Sri Lanka with the world. 
                    Started as a small travel desk with just three passionate team members.
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative flex items-center">
              <div className="md:w-1/2 md:pr-12 md:text-right">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <div className="flex items-center gap-3 mb-4 md:flex-row-reverse">
                    <div className="bg-teal-50 p-3 rounded-lg">
                      <Award className="w-6 h-6 text-teal-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">2013 - First Certification</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Received official approval from Sri Lanka Tourism Development Authority. 
                    This milestone marked our commitment to professional standards and quality service.
                  </p>
                </div>
              </div>
              <div className="w-6 h-6 absolute left-1/2 transform -translate-x-1/2 bg-teal-600 rounded-full border-4 border-white shadow-lg z-10"></div>
              <div className="hidden md:block md:w-1/2"></div>
            </div>

            {/* Timeline Item 3 */}
            <div className="relative flex items-center">
              <div className="hidden md:block md:w-1/2"></div>
              <div className="w-6 h-6 absolute left-1/2 transform -translate-x-1/2 bg-amber-600 rounded-full border-4 border-white shadow-lg z-10"></div>
              <div className="md:w-1/2 md:pl-12">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-amber-50 p-3 rounded-lg">
                      <Users className="w-6 h-6 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">2016 - Team Expansion</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Grew to a team of 20 travel experts, each specializing in different aspects of Sri Lankan tourism. 
                    Opened our first regional office in Kandy.
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline Item 4 */}
            <div className="relative flex items-center">
              <div className="md:w-1/2 md:pr-12 md:text-right">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <div className="flex items-center gap-3 mb-4 md:flex-row-reverse">
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <Globe className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">2019 - Aviation Approval</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Achieved Civil Aviation Authority certification, allowing us to offer comprehensive 
                    travel packages including flight bookings and airport services.
                  </p>
                </div>
              </div>
              <div className="w-6 h-6 absolute left-1/2 transform -translate-x-1/2 bg-purple-600 rounded-full border-4 border-white shadow-lg z-10"></div>
              <div className="hidden md:block md:w-1/2"></div>
            </div>

            {/* Timeline Item 5 - Present */}
            <div className="relative flex items-center">
              <div className="hidden md:block md:w-1/2"></div>
              <div className="w-8 h-8 absolute left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full border-4 border-white shadow-lg z-10"></div>
              <div className="md:w-1/2 md:pl-12">
                <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-6 rounded-2xl shadow-lg border border-blue-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-white p-3 rounded-lg">
                      <Heart className="w-6 h-6 text-red-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Today - Your Trusted Partner</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Serving thousands of happy travelers from around the world. With 50+ dedicated professionals, 
                    we continue to deliver exceptional travel experiences while staying true to our founding values.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-3xl p-8 md:p-12 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Authenticity</h3>
              <p className="text-gray-600">
                We believe in showcasing the real Sri Lanka - its culture, people, and untouched beauty.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                <Heart className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Passion</h3>
              <p className="text-gray-600">
                Our love for travel and Sri Lanka drives everything we do, ensuring unforgettable experiences.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                <Award className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Excellence</h3>
              <p className="text-gray-600">
                We strive for perfection in every detail, from planning to execution of your journey.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Experience Sri Lanka With Us?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who have trusted us with their Sri Lankan adventures. 
            Let's create your perfect journey together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
              Start Planning Your Trip
            </button>
            <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-all duration-300">
              Meet Our Team
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default OurStory;