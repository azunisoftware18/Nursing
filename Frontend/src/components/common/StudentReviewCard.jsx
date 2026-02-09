import React from 'react';

const StudentReviewCard = ({ review, brandDark }) => {
  return (
    <div className="flex-none w-[300px] md:w-[400px] px-4 pt-12">
      <div className="relative bg-white border border-blue-50 rounded-2xl p-6 pt-12 shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col items-center text-center select-none">

        {/* Profile Image */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-100">
          <img
            src={review.image}
            alt={review.name}
            className="w-full h-full object-cover pointer-events-none"
          />
        </div>

        {/* Student Identity */}
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-1" style={{ color: brandDark }}>
            {review.name}
          </h3>
          <span className="text-gray-400 text-sm font-semibold">
            {review.role}
          </span>
          <div className="w-full h-[1px] bg-gray-100 mt-4 mx-auto"></div>
        </div>

        {/* Testimonial Text */}
        <p className="text-gray-500 text-sm leading-relaxed text-left flex-1 italic">
          "{review.text}"
        </p>
      </div>
    </div>
  );
};

export default StudentReviewCard;