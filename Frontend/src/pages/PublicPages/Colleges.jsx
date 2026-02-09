import React from "react";
import FindCollegeSection from "../../components/common/FindCollegeSection";
import {
  ChevronRight,
  MapPin,
  GraduationCap,
  Loader2,
  AlertCircle,
  Building2,
} from "lucide-react";
import { useColleges, useCollegesByCourse } from "../../hooks/useCollege";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCollegeSearch } from "../../hooks/useCollegeSearch";
import { useIndiaCities, useIndiaStates } from "../../hooks/useIndia";
import CollegeCard from "../../components/common/CollegeCard";

const Colleges = () => {
  const brandColor = "#6739b7";
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = React.useState(null);
  const [selectedCity, setSelectedCity] = React.useState(null);
  const [params] = useSearchParams();
  const search = params.get("q");
  const state = params.get("state");
  const city = params.get("city");
  const course = params.get("course");

  const {
    data: courseColleges,
    isLoading: loadingCourse,
  } = useCollegesByCourse(course);

  // 🔍 Search colleges
  const {
    data: filteredData,
    isLoading: loadingFiltered,
    isError,
    error,
  } = useCollegeSearch({
    search,
    state,
    city,
  });

  const {
    data: allColleges,
    isLoading: loadingAll,
  } = useColleges({
    enabled: !search && !state && !city && !course,
  });


  let collegesList = [];

  if (course) {
    // 1️⃣ Course filter (highest priority)
    collegesList = courseColleges?.data || [];
  }
  else if (search || state || city) {
    // 2️⃣ Search / State / City
    collegesList = filteredData?.data || [];
  }
  else {
    // 3️⃣ Default all colleges
    collegesList = allColleges?.data || [];
  }



  const isLoading = loadingCourse || loadingFiltered || loadingAll;


  const { data: statesRes, isLoading: loadingStates } = useIndiaStates();
  const states = statesRes?.data || [];
  const { data: citiesRes, isLoading: loadingCities } =
    useIndiaCities(state)

  const cities = citiesRes?.data || [];


  return (
    <div className="bg-white min-h-screen font-sans">
      <section className="w-full bg-[#fbf9ff] py-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <FindCollegeSection />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-10 bg-gray-50 p-3 rounded-lg border border-gray-100">
          <span className="font-bold cursor-pointer text-[#1a237e]">Home</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-500 font-medium">Colleges</span>
        </div>

        {/* State Selection Grid */}
        {!state && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {states.map((s) => (
              <button
                key={s.name}
                onClick={() =>
                  navigate(`/colleges?state=${encodeURIComponent(s.name)}`)
                }
                className="px-4 py-2 rounded-full text-sm font-bold border bg-white text-gray-600"
              >
                Nursing Colleges in {s.name}
              </button>
            ))}
          </div>
        )}

        {/* City Selection Grid */}

        {state && (
          <div className="flex flex-wrap gap-3 mb-12">
            {cities.map((cityName) => (
              <button
                key={cityName}
                onClick={() =>
                  navigate(
                    `/colleges?state=${encodeURIComponent(state)}&city=${encodeURIComponent(cityName)}`
                  )
                }
                className={`px-4 py-2 rounded-full text-sm font-bold border
          ${city === cityName
                    ? "bg-[#6739b7] text-white"
                    : "bg-white text-gray-600"}
        `}
              >
                Nursing Colleges in {cityName}
              </button>
            ))}
          </div>
        )}
        {state && (
          <div className="mb-6">
            <button
              onClick={() => navigate("/colleges")}
              className="text-sm font-bold text-[#6739b7] hover:underline"
            >
              ← Change State
            </button>
          </div>
        )}
        <div className="mb-8 border-l-4 border-[#6739b7] pl-4">
          <h2 className="text-2xl font-bold text-[#1a237e]">
            Available Nursing Colleges
          </h2>
        </div>
        {isError && (
          <div className="bg-red-50 text-red-600 p-6 rounded-xl border border-red-100 flex items-center justify-center gap-3">
            <AlertCircle className="h-5 w-5" />
            <p className="font-medium">Error: {error?.message}</p>
          </div>
        )}

        {/* Data Grid */}
        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-[#6739b7]" />
          </div>
        )}

        {/* Error */}
        {!isLoading && isError && (
          <div className="bg-red-50 text-red-600 p-6 rounded-xl border border-red-100 flex items-center justify-center gap-3">
            <AlertCircle className="h-5 w-5" />
            <p className="font-medium">Error: {error?.message}</p>
          </div>
        )}

        {/* No Data */}
        {!isLoading && collegesList.length === 0 && (
          <div className="text-center py-24 text-gray-400">
            No colleges found
          </div>
        )}

        {/* Data Grid */}
        {!isLoading && collegesList.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collegesList.map((college) => (
              <CollegeCard
                key={college.id}
                brandDark="#1a237e"
                college={{
                  id: college.id,
                  name: college.name,
                  image: `${import.meta.env.VITE_API_BASE_URL}/uploads/colleges/${college.thumbnail}`,
                  location: `${college.city}, ${college.state}`,
                  year: college.establishedYear || "N/A",
                  type: college.sector || "Nursing College",
                  description: college.description || "No description available",
                }}
              />
            ))}
          </div>
        )}


      </div>
    </div>
  );
};

export default Colleges;
