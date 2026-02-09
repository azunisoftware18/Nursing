import React, { useState } from 'react';
import Button from './Button';
import { LayoutGrid } from 'lucide-react';
import { useCollegeSearch } from '../../hooks/useCollegeSearch';
import { useNavigate } from 'react-router-dom';

const FindCollegeSection = () => {
  const brandColor = "#6739b7";
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const trimmed = input.trim();

    if (!trimmed) {
      navigate("/colleges");
      return;
    }
    navigate(`/colleges?q=${encodeURIComponent(trimmed)}`);
  };
  return (
    <section className="w-full bg-[#fbf9ff] py-12 md:py-20 px-4 sm:px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">

        {/* Left Illustration - Hidden on mobile/tablet, only visible on large desktops */}
        <div className="absolute left-0 bottom-0 hidden xl:block w-72 translate-x-[-20%]">
          <img
            src="/public/college01.png"
            alt="Students working"
            className="w-full h-auto opacity-80"
          />
        </div>

        {/* Center Content */}
        <div className="text-center relative z-10 max-w-4xl mx-auto">
          {/* Responsive Heading: Text size changes for mobile */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1a237e] mb-4 leading-tight">
            Find Best <br className="sm:hidden" />
            <span
              style={{ color: brandColor, backgroundColor: `${brandColor}10` }}
              className="px-2 sm:px-3 py-1 rounded-lg inline-block mt-2 sm:mt-0"
            >
              Nursing College
            </span>
            <br className="sm:hidden" /> that Fit for you
          </h2>

          <p className="text-gray-500 text-xs sm:text-sm md:text-base mb-8 md:mb-12 px-2">
            Every student have unique needs, find the perfect nursing college that fit for you from 2000+ nursing colleges in India.
          </p>

          {/* Search Bar Wrapper: Responsive padding and flex direction */}
          <div className="relative max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center bg-white p-2 rounded-2xl sm:rounded-full shadow-xl border border-gray-50 gap-2 sm:gap-0">

              {/* Grid Icon & Input Wrapper */}
              <div className="flex items-center w-full flex-1">
                {/* Grid Icon - Hidden on very small screens to save space */}
                <div className="pl-4 pr-2 text-gray-400 hidden xs:block">
                  <LayoutGrid
                    size={28}
                    className="text-gray-500 group-hover:text-indigo-600 transition"
                  />

                </div>

                <input
                  type="text"
                  placeholder="Search college"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                  className="flex-1 px-3 py-3 text-gray-700 outline-none text-base md:text-lg bg-transparent border-l-0 sm:border-l border-gray-100 ml-0 sm:ml-2 w-full"
                />


              </div>

              {/* Search Button: Full width on mobile, auto width on desktop */}
              <div className="w-full sm:w-auto">
                <Button
                  onClick={handleSearch}
                  className="w-full sm:w-auto px-10 py-3.5 rounded-xl sm:rounded-full shadow-lg"
                >
                  Search
                </Button>


              </div>
            </div>
          </div>
        </div>

        {/* Right Illustration - Hidden on mobile/tablet */}
        <div className="absolute right-0 bottom-0 hidden xl:block w-72 translate-x-[15%]">
          <img
            src="/public/college02.png"
            alt="Student studying"
            className="w-full h-auto opacity-80"
          />
        </div>


      </div>
    </section>
  );
};

export default FindCollegeSection;