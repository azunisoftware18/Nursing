import React from 'react';
import CourseCard from '../../components/common/CoursesCard';
import { useNavigate } from 'react-router-dom';
import { useCourses } from '../../hooks/useCourse';
import { Loader2 } from 'lucide-react';

const PopularCourses = () => {
  const brandPurple = "#6739b7";
  const brandDark = "#1a237e";
  const navigate = useNavigate();
  const { data, isLoading } = useCourses();
  const courses = data?.data || [];
  const popularCourses = courses.slice(0, 4).map((course, index) => ({
    id: course.id,
    displayTitle: course.name,
    title: course.name,
    description: `Browse colleges with course ${course.name}`,
    duration: course.duration || "",
    path: `/colleges?course=${course.id}`,
    gradient: [
      "from-[#6739b7] to-[#1a237e]",
      "from-[#7b4fd4] to-[#6739b7]",
      "from-[#1a237e] to-[#4c1d95]",
      "from-[#6739b7] via-[#5b21b6] to-[#1e1b4b]",
    ][index % 4],
  }));

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-[#6739b7]" />
      </div>
    );
  }

  return (
    <section className="bg-white py-20 px-6 md:px-12 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight" style={{ color: brandDark }}>
            Popular Courses
          </h2>
          <p className="text-gray-500 font-medium max-w-lg mx-auto leading-relaxed italic">
            Search and connect with the right colleges faster.
          </p>
        </div>

        {/* Grid using Reusable Card Component */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading ? (
            <div className="text-center text-gray-400">Loading courses...</div>
          ) : (
            popularCourses.map((course) => (
              <div
                key={course.id}
                onClick={() => navigate(course.path)}
                className="cursor-pointer"
              >
                <CourseCard
                  course={course}
                  brandDark={brandDark}
                  brandPurple={brandPurple}
                />
              </div>
            ))
          )}

        </div>
      </div>
    </section>
  );
};

export default PopularCourses;