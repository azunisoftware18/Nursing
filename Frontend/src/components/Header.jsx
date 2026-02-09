import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ApplyNowModal from "./modals/ApplyNowModal";
import Button from "./common/Button";
import { useCourses } from "../hooks/useCourse";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCourseOpen, setIsCourseOpen] = useState(false); // Mobile accordion state
  const brandColor = "#6739b7";
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navLinkStyles = ({ isActive }) =>
    `font-medium transition-colors hover:text-[#6739b7] ${isActive
      ? `text-[#6739b7] border-b-2 border-[#6739b7] pb-1 font-bold`
      : "text-gray-600"
    }`;

  const { data, isLoading } = useCourses();
  const courses = data?.data || [];

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50 font-sans w-full">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo Section */}
            <NavLink
              to="/"
              className="flex items-center gap-1 cursor-pointer shrink-0"
            >
              <div className="relative flex items-center justify-center">
                <span className="text-lg md:text-2xl font-bold text-gray-800">
                  my
                </span>
                <span
                  className="text-lg md:text-2xl font-extrabold italic"
                  style={{ color: brandColor }}
                >
                  N
                </span>
                <div
                  className="absolute -bottom-0.5 -left-0.5 w-4 h-4 md:w-5 md:h-5 border-2 rounded-full opacity-30"
                  style={{ borderColor: brandColor }}
                ></div>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-sm md:text-lg font-semibold text-gray-700 tracking-tight">
                  ursing<span style={{ color: brandColor }}>Admission</span>
                  <span className="text-[8px] md:text-[10px] text-gray-400">
                    .com
                  </span>
                </span>
              </div>
            </NavLink>

            {/* Desktop Navigation Links (Hover enabled for PC only) */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-8">
              <NavLink to="/" className={navLinkStyles}>
                Home
              </NavLink>
              <NavLink to="/colleges" className={navLinkStyles}>
                Colleges
              </NavLink>

              <div className="relative group h-full flex items-center">
                <div
                  className={`${navLinkStyles({ isActive: false })} cursor-pointer`}
                >
                  <div className="flex items-center gap-1">
                    Courses
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400 group-hover:text-[#6739b7] transition-transform group-hover:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                <div className="absolute top-[100%] left-0 w-56 bg-white shadow-xl rounded-lg border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                  {isLoading ? (
                    <div className="px-4 py-2 text-sm text-gray-400">
                      Loading courses...
                    </div>
                  ) : (
                    courses.map((course) => (
                      <NavLink
                        key={course.id}
                        to={`/colleges?course=${course.id}`}
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-[#6739b7] transition-colors"
                      >
                        {course.name}
                      </NavLink>
                    ))
                  )}
                </div>
              </div>

              <NavLink to="/blog" className={navLinkStyles}>
                Blog
              </NavLink>
              <NavLink to="/about" className={navLinkStyles}>
                About
              </NavLink>
              <NavLink to="/contact" className={navLinkStyles}>
                Contact
              </NavLink>
            </nav>

            {/* Buttons & Hamburger */}
            <div className="flex items-center gap-2 md:gap-4">
              <div
                className="hidden xl:flex items-center gap-2 border px-3 py-1.5 rounded-full hover:bg-purple-50 transition-colors cursor-pointer"
                style={{ borderColor: brandColor, color: brandColor }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="font-bold text-sm">755 888 1111</span>
              </div>

              <Button onClick={() => setIsModalOpen(true)}>
                <span className="whitespace-nowrap">Online Admission</span>
              </Button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-1.5 rounded-md text-gray-600 hover:text-[#6739b7]"
              >
                <svg
                  className="h-7 w-7 md:h-8 md:w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" strokeWidth={2} />
                  ) : (
                    <path d="M4 6h16M4 12h16m-7 6h7" strokeWidth={2} />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-screen opacity-100 border-t" : "max-h-0 opacity-0"}`}
        >
          <div className="px-4 pt-4 pb-10 space-y-1 bg-white">
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700"
            >
              Home
            </NavLink>
            <NavLink
              to="/colleges"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700"
            >
              Colleges
            </NavLink>

            {/* MOBILE ACCORDION FOR COURSES */}
            <div className="px-3 py-2">
              <button
                onClick={() => setIsCourseOpen(!isCourseOpen)}
                className="flex items-center justify-between w-full text-base font-medium text-gray-700 outline-none"
              >
                <span>Courses</span>
                <svg
                  className={`h-4 w-4 transition-transform ${isCourseOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M19 9l-7 7-7-7" strokeWidth={2} />
                </svg>
              </button>

              {/* Jab isCourseOpen true hoga, tabhi sub-items dikhenge */}
              <div
                className={`transition-all duration-300 overflow-hidden ${isCourseOpen ? "max-h-60 mt-2 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <div className="pl-4 space-y-1 border-l-2 border-purple-100">
                  {isLoading ? (
                    <div className="px-4 py-2 text-sm text-gray-400">
                      Loading courses...
                    </div>
                  ) : (
                    courses.map((course) => (
                      <NavLink
                        key={course.id}
                        to={`/colleges?course=${course.id}`}
                        onClick={() => {
                          setIsOpen(false);
                          setIsCourseOpen(false);
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-[#6739b7]"
                      >
                        {course.name}
                      </NavLink>
                    ))
                  )}

                </div>
              </div>
            </div>

            <NavLink
              to="/blog"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700"
            >
              Blog
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700"
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700"
            >
              Contact
            </NavLink>
          </div>
        </div>
      </header>

      <ApplyNowModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default Header;
