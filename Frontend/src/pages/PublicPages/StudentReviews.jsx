import React from 'react';
import StudentReviewCard from '../../components/common/StudentReviewCard';

const StudentReviews = () => {
  const brandDark = "#1a237e";
  const brandPurple = "#6739b7";

  const reviews = [
    {
      id: 1,
      name: "Devika",
      role: "Nursing Student",
      image: "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "I am so grateful to mynursingadmission.com for their invaluable assistance in helping me find the right nursing college for me. With their personalized guidance and detailed information about colleges, I was able to make an informed decision about my future."
    },
    {
      id: 2,
      name: "Parvathi Reji",
      role: "Nursing Student",
      image: "https://plus.unsplash.com/premium_photo-1689977807477-a579eda91fa2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Mynursingadmission.com has been a lifesaver for me! As a student looking to pursue a career in nursing, I found it challenging to navigate through the different nursing colleges in India. However, this website provided me with comprehensive information."
    },
    {
      id: 3,
      name: "Nimitha Sarath",
      role: "Nursing Student",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "I am so grateful for the assistance I received from Mynursingadmission.com. Their website was easy to navigate and provided all the necessary information I needed to make an informed decision about my nursing college. The personal assistance was invaluable."
    },
    {
      id: 4,
      name: "Athulya A",
      role: "Nursing Student",
      image: "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Mynursingadmission.com helped me find the perfect nursing college in India without any hassle. The website provided me with detailed information about various nursing colleges, admission procedures, and fee structure. The team ensured I got admission."
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
          Here is our student's opinions on mynursingadmission.com
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