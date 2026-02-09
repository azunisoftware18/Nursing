import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin, Calendar, GraduationCap, Building2, Info, Hash,
  CheckCircle2, Globe, ShieldCheck, UserCheck, ArrowLeft,
  PlayCircle, Users, LayoutGrid, GraduationCap as ExperienceIcon, BookOpen
} from "lucide-react";
import { useCollegeById, useCollegeCourses } from "../../hooks/useCollege";
import Button from "../../components/common/Button";
import CourseCard from "../../components/common/CoursesCard";

const CollegeDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const {
    data: collegeRes,
    isLoading: isCollegeLoading,
    isError,
  } = useCollegeById(id);

  const {
    data: courseRes,
    isLoading: isCoursesLoading,
  } = useCollegeCourses(id);

  const college = collegeRes?.data;
  const courses = courseRes?.data || [];

  // Function to ensure data is an array
  const ensureArray = (value) => {
    if (!value) return [];

    // Case 1: Already array
    if (Array.isArray(value)) return value;

    // Case 2: JSON string (most common)
    if (typeof value === "string") {
      try {
        const parsed = JSON.parse(value);

        // Sometimes backend sends string inside string
        if (typeof parsed === "string") {
          return JSON.parse(parsed);
        }

        return Array.isArray(parsed) ? parsed : [];
      } catch (err) {
        // fallback: comma separated
        return value.split(",").map(v => v.trim());
      }
    }

    return [];
  };

  const facilities = ensureArray(college?.facilities);

  const gallery = ensureArray(college?.gallery);
  // Backend se agar courses array aa raha hai toh:

  if (isCollegeLoading || isCoursesLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-t-4 border-[#6739b7] rounded-full" />
      </div>
    );
  }

  if (!college || isError) return <div className="text-center py-20">College not found</div>;

  const getYoutubeEmbedUrl = (url) => {
    if (!url) return "";
    const regExp = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/;
    const match = url.match(regExp);
    return match ? `https://www.youtube.com/embed/${match[1]}` : "";
  };

  return (
    <div className="bg-white min-h-screen pb-20 font-sans text-gray-800">

      {/* 1. Banner Area */}
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <div className="relative h-[250px] md:h-[400px] rounded-xl overflow-hidden shadow-md">
          <img
            src={college.thumbnail ? `${baseUrl}/uploads/colleges/${college.thumbnail}` : "/placeholder.jpg"}
            className="w-full h-full object-cover"
            alt="Banner"
          />
        </div>

        {/* 2. Header Info & Action Buttons */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-start gap-6 border-b pb-8">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-[#1a237e]">
              {college.name} – {college.city}
            </h1>
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500 font-medium">
              <span className="flex items-center gap-1"><MapPin size={16} className="text-[#6739b7]" /> {college.city}, {college.state}</span>
            </div>
            <p className="mt-4 text-gray-600 text-sm leading-relaxed max-w-5xl italic">
              {college.description?.substring(0, 250)}...
            </p>
          </div>

          <div className="flex flex-col gap-3 w-full md:w-auto">
            <Button>Admission</Button>
          </div>
        </div>

        {/* 3. Central Icon Stats */}
        <div className="grid grid-cols-3 gap-4 py-12 max-w-3xl mx-auto">
          <CenterStat icon={<Users className="text-[#5F259F]/70" size={40} />} value={`${college.studentsCount || '0'} +`} label="Students" />
          <CenterStat icon={<ExperienceIcon className="text-[#5F259F]/70" size={40} />} value={`${college.experienceYears || '0'} `} label="Years Experience" />
          <CenterStat icon={<LayoutGrid className="text-[#5F259F]/70" size={40} />} value={`${college.coursesCount || '0'} +`} label="Courses" />
        </div>

        {/* 4. Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-6">

          {/* Main (8 Cols) */}
          <div className="lg:col-span-8 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-[#1a237e] mb-4">About {college.name}</h2>
              <p className="text-gray-600 leading-relaxed text-justify">{college.description}</p>
            </section>

            {/* Highlights Section */}
            <section>
              <h2 className="text-xl font-bold text-[#1a237e] mb-6 border-b-2 border-orange-400 inline-block pb-1">
                Highlights of {college.name}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3">
                {facilities.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-gray-700 text-sm font-medium"
                  >
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </section>

            {/* Video Section */}
            {college.youtubeVideo && (
              <div className="rounded-xl overflow-hidden shadow-xl aspect-video bg-black">
                <iframe
                  className="w-full h-full"
                  src={getYoutubeEmbedUrl(college.youtubeVideo)}
                  title="College Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}

            {/* Gallery Section */}
            <section className="border-t pt-10">
              <h3 className="text-xl font-bold text-[#1a237e] mb-6">Gallery</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {gallery.map((img, i) => (
                  <div key={i} className="h-44 rounded-lg overflow-hidden border bg-gray-50">
                    <img src={`${baseUrl}/uploads/colleges/${img}`} className="w-full h-full object-cover" alt="college" />
                  </div>
                ))}
              </div>
            </section>

            {/* --- NEW: Courses Section --- */}
            <section className="border-t pt-10 mt-10">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-[#1a237e] flex items-center gap-3">
                  <div className="p-2 bg-orange-50 rounded-lg">
                    <BookOpen className="text-orange-500" size={24} />
                  </div>
                  Available Courses
                </h3>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full border">
                  {courses?.length || 0} Programs
                </span>
              </div>

              {isCoursesLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[1, 2].map((i) => (
                    <div key={i} className="h-48 bg-gray-50 animate-pulse rounded-2xl border border-gray-100"></div>
                  ))}
                </div>
              ) : courses && courses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {courses.map((course) => (
                    <CourseCard
                      key={course.id}
                      /* Yahan hum backend data ko card ke format mein adjust kar rahe hain.
                         Agar backend se 'name' aa raha hai aur card 'title' maang raha hai,
                         toh hum usey aise pass karenge:
                      */
                      course={{
                        ...course,
                        title: course.name, // backend 'name' ko 'title' mein map kiya
                        displayTitle: course.name,
                        // Agar backend se gradient nahi aa raha toh default brand gradient de sakte hain
                        gradient: course.gradient || "from-[#6739b7] to-[#1a237e]"
                      }}
                      brandDark="#1a237e"
                      brandPurple="#6739b7"
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                  <p className="text-gray-400 font-medium italic">
                    No courses listed for this institution yet.
                  </p>
                </div>
              )}
            </section>


          </div>

          {/* Sidebar (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-3 border-b bg-gray-50 font-bold text-gray-700 text-sm">Location</div>
              <div className="h-60 bg-gray-100">
                <iframe
                  className="w-full h-full border-0" // 'grayscale' class ko yahan se hata diya gaya hai
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(college.name + " " + college.city)}&output=embed`}
                  title="College Location Map"
                />
              </div>
              <div className="p-6 space-y-5">
                <SidebarRow label="Sector" value={college.sector} icon={<Building2 size={16} />} />
                <SidebarRow label="Location" value={`${college.city}, ${college.state}`} icon={<MapPin size={16} />} />
                <SidebarRow label="Year Established" value={college.establishedYear} icon={<Calendar size={16} />} />
                <SidebarRow label="Gender" value={college.genderAcceptance} icon={<UserCheck size={16} />} />
                <SidebarRow label="Affiliation" value={college.affiliation} icon={<ShieldCheck size={16} />} />

                <button className="w-full bg-[#4169E1] text-white py-3 rounded font-bold shadow-lg hover:bg-blue-700 transition-colors mt-4">
                  Enquire Now
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const CenterStat = ({ icon, value, label }) => (
  <div className="flex flex-col items-center text-center">
    <div className="mb-2">{icon}</div>
    <div className="text-2xl font-black text-gray-800">{value}</div>
    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</div>
  </div>
);

const SidebarRow = ({ label, value, icon }) => (
  <div className="flex gap-4 border-b border-gray-50 pb-3 last:border-0">
    <div className="text-gray-400 mt-1">{icon}</div>
    <div>
      <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest leading-none mb-1">{label}</p>
      <p className="text-sm font-bold text-gray-700">{value || "N/A"}</p>
    </div>
  </div>
);

export default CollegeDetails;