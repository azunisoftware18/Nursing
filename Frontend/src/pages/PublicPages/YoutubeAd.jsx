import React, { useState } from 'react';
import Button from '../../components/common/Button';

function YoutubeAd() {
  const brandColor = "#6739b7";
  // Video play state
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Section Heading */}
        <div className="mb-12 text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a237e] mb-4">
            Discover Top Colleges for Nursing Admission
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row items-start gap-12">

          {/* Left Side: Video Section */}
          <div className="w-full lg:w-1/2 relative group">
            <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl aspect-video bg-black">
              {!isPlaying ? (
                /* Thumbnail Mode */
                <div className="relative w-full h-full cursor-pointer" onClick={() => setIsPlaying(true)}>
                  <img
                    src="https://img.youtube.com/vi/wLrtvxGWW_Q/maxresdefault.jpg"
                    alt="Nursing Portal Thumbnail"
                    className="w-full h-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
                    <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                      <svg className="w-10 h-10 text-white fill-current" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              ) : (
                /* Embed Player Mode */
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/wLrtvxGWW_Q?autoplay=1"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-purple-50 rounded-full -z-10"></div>
          </div>

          {/* Right Side: Information Content */}
          <div className="w-full lg:w-1/2 space-y-6 text-gray-600 leading-relaxed text-base md:text-lg">
            <p>
              Nursing education is a valuable investment that offers a wide range of career opportunities in the medical field, specifically in India.
            </p>

            <p>
              <span className="font-semibold text-gray-800">Mynursingadmission.com</span> is a useful resource that provides free assistance in searching for nursing colleges in India.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm md:text-base">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>B.Sc Nursing</span>
                </li>
                <li className="flex items-center gap-2 text-sm md:text-base">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>General Nursing (GNM)</span>
                </li>
              </ul>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm md:text-base">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Post B.Sc Nursing</span>
                </li>
                <li className="flex items-center gap-2 text-sm md:text-base">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>M.Sc Nursing</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <Button variant="outline" className="px-8">
                Learn More About Courses
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default YoutubeAd;