import React from "react";
import CollegeCard from "../../components/common/CollegeCard";
import { useColleges } from "../../hooks/useCollege";
import { Loader2 } from "lucide-react";

const PopularColleges = () => {
  const brandDark = "#1a237e";

  const { data, isLoading, isError } = useColleges();

  // ✅ backend se sirf 3 colleges
  const colleges = data?.data?.slice(0, 3) || [];

  return (
    <section className="bg-white py-16 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-3"
            style={{ color: brandDark }}
          >
            Popular Colleges
          </h2>
          <p className="text-gray-500 font-medium italic">
            Search and connect with the right colleges faster.
          </p>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-[#6739b7]" />
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="text-center text-red-500">
            Failed to load colleges
          </div>
        )}

        {/* Colleges Grid */}
        {!isLoading && colleges.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {colleges.map((college) => (
              <CollegeCard
                key={college.id}
                brandDark={brandDark}
                college={{
                  id: college.id,
                  name: college.name,
                  image: `${import.meta.env.VITE_API_BASE_URL}/uploads/colleges/${college.thumbnail}`,
                  location: `${college.city}, ${college.state}`,
                  year: college.establishedYear || "—",
                  type: college.sector || "Nursing College",
                  description: college.description || "Top nursing college in India",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularColleges;
