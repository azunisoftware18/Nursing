import React from 'react';

// Reusable Single Info Card Component
const SingleInfoCard = ({ title, description, bgColor, imagePath, linkText }) => {
  const brandBlue = "#1a237e";

  return (
    <div
      className="flex-1 rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      style={{ backgroundColor: bgColor }}
    >
      {/* Image Area - Public folder se image fetch ho rahi hai */}
      <div className="w-full md:w-[40%] flex justify-center items-center">
        <img
          src={imagePath}
          alt={title}
          className="w-full h-auto max-h-[150px] md:max-h-[180px] object-contain drop-shadow-md transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* Content Area */}
      <div className="w-full md:w-[60%] text-center md:text-left flex flex-col">
        <h2
          className="text-2xl md:text-[28px] font-extrabold mb-3 leading-tight"
          style={{ color: brandBlue }}
        >
          {title}
        </h2>
        <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed mb-6 font-medium">
          {description}
        </p>

        {/* Action Link */}
        <a
          href="#"
          className="text-blue-600 font-bold flex items-center justify-center md:justify-start gap-2 hover:gap-3 transition-all group"
        >
          {linkText}
          <span className="text-xl transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>
    </div>
  );
};

const InfoCard = () => {
  return (
    <section className="w-full bg-white py-16 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">

        {/* Left Card - imagePath me sirf file ka naam de kyunki wo public folder me hai */}
        <SingleInfoCard
          title="Need Personal Admission Guidance?"
          description="We understand that each student has unique needs, and we provide personalized admission guidance to help students find the right nursing college."
          bgColor="#fff5f0"
          imagePath="/public/Medical01.png" // Public folder se image
          linkText="Find Out More"
        />

        {/* Right Card */}
        <SingleInfoCard
          title="Looking for Education Loans?"
          description="Looking for financial support to kickstart your nursing education? Let us assist you in finding the funds you need through the loan process."
          bgColor="#f0f7ff"
          imagePath="/public/Medical02.png" // Public folder se image
          linkText="Find Out More"
        />

      </div>
    </section>
  );
};

export default InfoCard;