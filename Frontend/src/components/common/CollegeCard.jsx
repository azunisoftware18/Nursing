import React from 'react';
import { MapPin, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CollegeCard = ({ college, brandDark }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col h-full group">
      {/* Image Container with Tag */}
      <div className="relative h-56 w-full overflow-hidden">
        <img
          src={college.image}
          alt={college.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <span className="absolute top-4 left-4 bg-[#5F259F] text-white text-[10px] font-bold px-3 py-1 rounded-md z-10">
          {college.type}
        </span>



      </div>

      {/* Content Area */}
      <div className="p-6 pt-10 flex-1 flex flex-col">
        <h3 className="text-xl font-bold mb-3 leading-tight group-hover:text-[#6739b7] transition-colors" style={{ color: brandDark }}>
          {college.name}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-start gap-2 text-gray-400">
            <MapPin size={14} className="mt-1 flex-shrink-0" />
            <p className="text-[11px] leading-relaxed">{college.location}</p>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Calendar size={14} />
            <p className="text-[11px]">{college.year}</p>
          </div>
        </div>

        <p className="text-gray-500 text-xs leading-relaxed line-clamp-3 italic">
          "{college.description}"
        </p>
        <button
          onClick={() => navigate(`/college/${college.id}`)}
          className="mt-5 w-full bg-[#6739b7] text-white py-2.5 rounded-xl font-bold text-sm hover:opacity-90 transition"
        >
          View Details
        </button>

      </div>
    </div>
  );
};

export default CollegeCard;