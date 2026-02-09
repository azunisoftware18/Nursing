import React from 'react';
import { NavLink } from 'react-router-dom';

const CourseCard = ({ course, brandDark, brandPurple }) => {
  return (
    <NavLink
      to={course.path}
      className="group relative bg-white rounded-[2.5rem] border border-purple-50 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full transform hover:-translate-y-2"
    >
      {/* Theme Mesh Gradient Header Area */}
      <div className={`relative h-48 w-full overflow-hidden bg-gradient-to-br ${course.gradient} flex flex-col items-center justify-center text-white p-6`}>

        {/* Subtle Moving Glass Shapes */}
        <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-32 h-32 bg-black/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

        {/* Floating Badge */}
        <div className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3 border border-white/30 shadow-sm">
          {course.duration} Year Course
        </div>

        <h3 className="relative z-10 text-2xl font-black text-center leading-tight drop-shadow-md">
          {course.displayTitle}
        </h3>
      </div>

      {/* Content Area */}
      <div className="p-8 flex-1 flex flex-col justify-between bg-white relative">
        <div>
          <h4 className="text-lg font-bold mb-3 leading-tight group-hover:text-[#6739b7] transition-colors duration-300" style={{ color: brandDark }}>
            {course.title}
          </h4>
          <p className="text-gray-400 text-xs leading-relaxed mb-6">
            {course.description}
          </p>
        </div>

        {/* Theme CTA Arrow */}
        <div className="flex items-center font-bold text-sm gap-2 group-hover:gap-4 transition-all duration-300" style={{ color: brandPurple }}>
          View Colleges
          <span className="text-xl">→</span>
        </div>
      </div>
    </NavLink>
  );
};

export default CourseCard;