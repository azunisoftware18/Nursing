import React from 'react';

const About = () => {
  // Using a consistent brand color variable for potential future use
  const brandColor = "#6739b7";
  const primaryBlue = "#1a237e";

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-purple-100">
      {/* Main Container: Responsive horizontal padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 md:py-16">

        {/* Main Header Section: Fluid Typography */}
        <div className="text-center mb-10 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1a237e] tracking-tight">
            About Mynursingadmission.com
          </h1>
          <div className="h-1 w-20 bg-[#6739b7] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Content Section with Image: Column on mobile, Row on Large Screens */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16 mb-16 md:mb-24">

          {/* Image Container: Centered on mobile, fixed-ish on desktop */}
          <div className="w-full lg:w-2/5 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <img
                src="/public/doctor02.png"
                alt="Professional Doctor"
                className="relative w-full max-w-xs sm:max-w-sm md:max-w-md h-auto drop-shadow-2xl rounded-3xl object-cover transform transition duration-500 hover:scale-[1.02]"
              />
            </div>
          </div>

          {/* Text Content: Improved readability and spacing */}
          <div className="w-full lg:w-3/5 space-y-5 md:space-y-6 text-gray-600 leading-relaxed text-base sm:text-lg">
            <p>
              As a subsidiary of <span className="font-bold text-gray-900">EducateMe Edu Solutions</span>,
              <span className="font-semibold text-[#6739b7]"> mynursingadmission.com</span> has been a leading provider of guidance to students in India for the past 12 years.
              We have personally assisted more than <span className="font-bold text-gray-800">5000+ students</span> in securing admissions to top colleges across the country.
            </p>
            <p>
              We understand that finding the right nursing college can be overwhelming.
              Our platform offers comprehensive details on admission procedures, fee structures, and
              accreditation from the <span className="italic text-gray-700">Indian Nursing Council (INC), State Nursing Councils, and Universities.</span>
            </p>
            <div className="p-4 bg-indigo-50 rounded-xl border-l-4 border-[#1a237e]">
              <p className="text-[#1a237e] font-medium">
                We cater to B.Sc Nursing, GNM, Post B.Sc Nursing, and M.Sc Nursing courses,
                striving to make your journey as simple and stress-free as possible.
              </p>
            </div>
          </div>
        </div>

        {/* Vision & Mission: Grid layout for better use of space on tablet/desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

          {/* Vision Card */}
          <div className="bg-white border border-gray-100 shadow-lg hover:shadow-xl rounded-2xl p-6 md:p-10 transition-all duration-300">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-[#1a237e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="Value-Vision-Icon-Path-Here"></path></svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1a237e] mb-4">
              Our Vision
            </h2>
            <p className="text-gray-600 leading-relaxed text-base md:text-lg italic">
              "Our vision is to empower and support students seeking nursing education in India by providing a comprehensive and accessible platform... fostering a strong and diverse nursing workforce to meet global demand."
            </p>
          </div>

          {/* Mission Card */}
          <div className="bg-white border border-gray-100 shadow-lg hover:shadow-xl rounded-2xl p-6 md:p-10 transition-all duration-300">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-[#6739b7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="Value-Mission-Icon-Path-Here"></path></svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1a237e] mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
              At <span className="font-semibold text-gray-800">Mynursingadmission.com</span>, we believe nursing education is a valuable investment.
              Our mission is to provide free assistance and detailed resources to help students navigate the complex admission process with absolute ease.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;