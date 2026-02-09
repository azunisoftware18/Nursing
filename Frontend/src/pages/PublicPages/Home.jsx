import React from 'react';
import SearchCollegeCard from '../../components/common/SearchCollegeCard';
import YoutubeAd from './YoutubeAd';
import StudentReviews from './StudentReviews';
import PopularColleges from './PopularColleges';
import PopularCourses from './PopularCourses';
import StatsCard from '../../components/common/StatsCard';
import InfoCard from '../../components/common/InfoCard';

function Home() {
  const brandColor = "#6739b7";
  const statsData = [
    {
      number: "2000 +",
      label: "Nursing Colleges",
      description: "Admission Guidance & Personal Support to 2000+ Nursing College in India."
    },
    {
      number: "35 K+",
      label: "Students",
      description: "We are Serving more than 35K + Students every Academic Year."
    },
    {
      number: "4 +",
      label: "Courses",
      description: "Admission Guidance for B.SC, M.SC, (P)B.SC, GNM - Nursing Courses"
    },
    {
      number: "24 +",
      label: "Universities",
      description: "A wide range of Universities are offering various Nursing Courses in India."
    }
  ];

  return (
    /* lg:h-screen desktop/laptop par fixed height rakhega. Mobile/Tablet par scroll enable karne ke liye min-h-screen aur overflow-y-auto use kiya hai. */
    <div className="relative min-h-screen  w-full bg-gradient-to-br from-purple-50 via-white to-blue-50 overflow-y-auto lg:overflow-hidden flex flex-col">

      {/* Main Container: Mobile par padding-top (pt-20) add ki hai taaki header se content na takraye. Desktop par justify-center use kiya hai. */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-10 lg:px-12 flex-1 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-12 py-16 lg:py-0">

        {/* Left Side: Content & Search Card */}
        {/* order-2 mobile par image ko upar aur text ko niche dikhayega. order-1 desktop par left mein rakhega. */}
        <div className="w-full lg:w-[55%] z-20 text-center lg:text-left flex flex-col justify-center order-2 lg:order-1">
          <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold text-[#1a237e] leading-tight lg:leading-[1.1] mb-4">
            Find The <br />
            <span className="relative inline-block mt-1">
              <span style={{ color: brandColor }}>Best Nursing Colleges</span>
              <div className="absolute bottom-1 left-0 w-full h-2 md:h-3  -z-10 rounded-sm"></div>
            </span>
            <br className="hidden sm:block" /> in India
          </h1>

          <p className="text-gray-500 text-sm md:text-base lg:text-lg mb-6 max-w-lg mx-auto lg:mx-0 px-2">
            Discover top-rated nursing institutions and kickstart your medical career today.
          </p>

          {/* Search Card - Mobile par center origin, Desktop par left origin */}
          <div className="w-full max-w-md mx-auto lg:mx-0 transform scale-95 sm:scale-100 origin-center lg:origin-left rounded-[2rem]">
            <SearchCollegeCard />
          </div>

          {/* Popular Searches */}
          <div className="mt-8 text-[11px] md:text-xs text-gray-400">
            <span className="font-semibold text-gray-700">Popular Searches: </span>
            <div className="inline-flex flex-wrap justify-center lg:justify-start gap-2 mt-2 lg:mt-0">
              <span className="hover:text-[#6739b7] cursor-pointer underline decoration-purple-100">Kerala</span>,
              <span className="hover:text-[#6739b7] cursor-pointer underline decoration-purple-100">Karnataka</span>,
              <span className="hover:text-[#6739b7] cursor-pointer underline decoration-purple-100">Tamil-Nadu</span>
            </div>
          </div>
        </div>

        {/* Right Side: Image Section */}
        {/* order-1 mobile par image ko upar dikhayega. Laptop par right side shift ho jayega. */}
        <div className="w-full lg:w-[45%] relative flex justify-center lg:justify-end items-end h-[300px] sm:h-[450px] lg:h-full order-1 lg:order-2">
          {/* Background Glow responsive sizes */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] sm:w-[350px] lg:w-[450px] h-[200px] sm:h-[350px] lg:h-[450px] bg-purple-100 rounded-full blur-3xl opacity-40"></div>

          <img
            src="/public/doctor01.png"
            alt="Nursing Professional"
            className="relative z-10 h-full w-auto object-contain 
  max-h-[40vh] sm:max-h-[50vh] lg:max-h-[85vh]
  transition-all duration-500 ease-in-out
  hover:scale-105 hover:-translate-y-2"
          />


        </div>
      </div>

      {/* Bottom Curve Height adjust for different screens */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180 z-30">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] md:h-[60px] lg:h-[70px] fill-white">
          <path d="M1200 120L0 16.48V0h1200v120z"></path>
        </svg>
      </div>
      <YoutubeAd />
      <PopularColleges />
      <PopularCourses />
      <section className="w-full bg-white py-16 px-6 md:px-12 font-sans">
        <div className="max-w-7xl mx-auto">
          {/* Grid Container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {statsData.map((item, index) => (
              <StatsCard
                key={index}
                number={item.number}
                label={item.label}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </section>
      <InfoCard />
      <StudentReviews />
    </div>
  );
}

export default Home;