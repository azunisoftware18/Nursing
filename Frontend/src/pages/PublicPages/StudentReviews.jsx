import React from 'react';
import StudentReviewCard from '../../components/common/StudentReviewCard';

const StudentReviews = () => {
  const brandDark = "#11B1CC";
  const brandPurple = "#11B1CC";

  const reviews = [
    {
      id: 1,
      name: "Devika",
      role: "Nursing Student",
      image: "https://tse3.mm.bing.net/th/id/OIP.ham5NLtsM94XRA4Mu7EIWwHaEJ?pid=Api&h=220&P=0",
      text: "I am so grateful to citsadmission.com for their invaluable assistance in helping me find the right nursing college for me. With their personalized guidance and detailed information about colleges, I was able to make an informed decision about my future."
    },
    {
      id: 2,
      name: "Parvathi Reji",
      role: "Nursing Student",
      image: "https://tse2.mm.bing.net/th/id/OIP.1bdy4tjxPzUw960p3fJmrgHaE7?pid=Api&h=220&P=0",
      text: "citsadmission.com has been a lifesaver for me! As a student looking to pursue a career in nursing, I found it challenging to navigate through the different nursing colleges in India. However, this website provided me with comprehensive information."
    },
    {
      id: 3,
      name: "Nimitha Sarath",
      role: "Nursing Student",
      image: "https://tse4.mm.bing.net/th/id/OIP.9DeELb_NccspMkrhAKx0MgHaHa?pid=Api&h=220&P=0",
      text: "I am so grateful for the assistance I received from citsadmission.com. Their website was easy to navigate and provided all the necessary information I needed to make an informed decision about my nursing college. The personal assistance was invaluable."
    },
    {
      id: 4,
      name: "Athulya A",
      role: "Nursing Student",
      image: "https://tse3.mm.bing.net/th/id/OIP.M3lvT_34HRk6SNJTaqPkJAHaHa?pid=Api&h=220&P=0",
      text: "citsadmission.com helped me find the perfect nursing college in India without any hassle. The website provided me with detailed information about various nursing colleges, admission procedures, and fee structure. The team ensured I got admission."
    }
  ];

  const infiniteReviews = [...reviews, ...reviews];

  return (
    <section className="bg-white py-16 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4" style={{ color: brandDark }}>
          What Our Student Says
        </h2>
        <p className="text-gray-400 font-medium italic">
          Here is our student's opinions on citsadmission.com
        </p>
      </div>

      <div className="relative flex overflow-hidden group cursor-grab active:cursor-grabbing">
        <div className="flex animate-marquee group-active:pause-marquee">
          {infiniteReviews.map((review, index) => (
            <StudentReviewCard
              key={`${review.id}-${index}`}
              review={review}
              brandDark={brandDark}
            />
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee 40s linear infinite;
        }
        .group:active .animate-marquee {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
};

export default StudentReviews;