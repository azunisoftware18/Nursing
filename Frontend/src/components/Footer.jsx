import React, { useState } from 'react'; // useState import kiya
import { NavLink } from 'react-router-dom';
import EnquireNow from './modals/EnquireNow';
import ApplyNowModal from './modals/ApplyNowModal'; // ApplyNowModal import kiya
import { useCourses } from '../hooks/useCourse';

function Footer() {
  const { data } = useCourses();
  const courses = data?.data || [];
  const brandColor = "#6739b7";

  // Modal ki state control karne ke liye
  const [isModalOpen, setIsModalOpen] = useState(false);

  const linkStyle = "hover:text-[#6739b7] cursor-pointer transition-colors block text-left w-full bg-transparent border-none p-0";

  return (
    <footer className="w-full bg-white font-sans border-t border-gray-100">

      {/* 1. Enquire Now Banner Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mt-10 md:mt-16 mb-12 md:mb-16">
        <EnquireNow />
      </div>

      {/* 2. Main Footer Links Section */}
      <div className="w-full max-w-[95%] lg:max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-y-12 gap-x-4 md:gap-x-8">

          {/* Column 1: Brand & Social */}
          <div className="col-span-2 lg:col-span-1 flex flex-col items-center lg:items-start text-center lg:text-left mb-4 lg:mb-0">
            <NavLink to="/" className="flex items-center gap-1 mb-6">
              <span className="text-xl font-bold text-gray-800">my</span>
              <span className="text-xl font-extrabold italic" style={{ color: brandColor }}>N</span>
              <span className="text-base font-semibold text-gray-700 tracking-tight">
                ursing<span style={{ color: brandColor }}>Admission</span>
              </span>
            </NavLink>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xs">
              Mynursingadmission.com is a free resource for students looking for nursing colleges in India.
            </p>
            <div className="flex gap-4">
              {['facebook', 'instagram', 'youtube'].map((social) => (
                <div key={social} className="w-9 h-9 bg-gray-50 rounded-full flex items-center justify-center hover:bg-purple-50 cursor-pointer transition-colors border border-gray-100">
                  <div className="w-3.5 h-3.5 bg-gray-400 rounded-sm"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col items-start text-left">
            <h4 className="font-bold text-gray-800 mb-6 text-sm md:text-base uppercase tracking-wider">Quick links</h4>
            <ul className="space-y-4 text-xs md:text-sm text-gray-500">
              <li>
                <NavLink
                  to="/colleges?state=Karnataka"
                  className={linkStyle}
                >
                  Colleges in Karnataka
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/colleges?state=Tamil Nadu"
                  className={linkStyle}
                >
                  Colleges in Tamil Nadu
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/colleges?state=Kerala"
                  className={linkStyle}
                >
                  Colleges in Kerala
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/colleges?state=Tamil Nadu&city=Chennai"
                  className={linkStyle}
                >
                  Colleges in Chennai
                </NavLink>
              </li>

            </ul>
          </div>

          {/* Column 3: Courses */}
          <div className="flex flex-col items-start text-left">
            <h4 className="font-bold text-gray-800 mb-6 text-sm md:text-base uppercase tracking-wider">Courses</h4>
            <ul className="space-y-4 text-xs md:text-sm text-gray-500">
              <li>
                <ul className="space-y-4 text-xs md:text-sm text-gray-500">
                  {courses.slice(0, 4).map((course) => (
                    <li key={course.id}>
                      <NavLink
                        to={`/colleges?course=${course.id}`}
                        className={linkStyle}
                      >
                        {course.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>

              </li>

            </ul>
          </div>

          {/* Column 4: Support */}
          <div className="flex flex-col items-start text-left">
            <h4 className="font-bold text-gray-800 mb-6 text-sm md:text-base uppercase tracking-wider">Support</h4>
            <ul className="space-y-4 text-xs md:text-sm text-gray-500">
              <li><NavLink to="/about" className={linkStyle}>About Us</NavLink></li>
              <li><NavLink to="/contact" className={linkStyle}>Contact Us</NavLink></li>
              <li><NavLink to="/privacy-policy" className={linkStyle}>Privacy Policy</NavLink></li>
              <li><NavLink to="/blog" className={linkStyle}>Latest Blog</NavLink></li>
            </ul>
          </div>

          {/* Column 5: Admission */}
          <div className="flex flex-col items-start text-left">
            <h4 className="font-bold text-gray-800 mb-6 text-sm md:text-base uppercase tracking-wider">Admission</h4>
            <ul className="space-y-4 text-xs md:text-sm text-gray-500">
              <li>
                {/* Apply Online Button jo modal open karega */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="font-bold text-[#6739b7] hover:opacity-80 transition-opacity cursor-pointer text-left w-full"
                >
                  Apply Online
                </button>
              </li>
              <li><NavLink to="/colleges" className={linkStyle}>College List</NavLink></li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Copyright Section */}
      <div className="border-t border-gray-100 py-8 text-center text-[10px] md:text-sm text-gray-400 px-6">
        <p>Copyright © 2026. Mynursingadmission all right reserved</p>
      </div>

      {/* Modal Component ko yahan render kiya */}
      <ApplyNowModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </footer>
  );
}

export default Footer;