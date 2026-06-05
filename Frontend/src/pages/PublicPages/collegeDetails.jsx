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

  // Get the best thumbnail URL
  const getThumbnailUrl = () => {
    if (!college) return "/placeholder.jpg";
    
    // Priority: signedUrl > thumbnailUrl > first gallery image > placeholder
    if (college.thumbnailSignedUrl) return college.thumbnailSignedUrl;
    if (college.thumbnailUrl) return college.thumbnailUrl;
    if (college.thumbnail) return college.thumbnail;
    
    // Fallback to first gallery image
    if (college.gallery && Array.isArray(college.gallery) && college.gallery.length > 0) {
      const firstImage = college.gallery[0];
      if (firstImage.signedUrl) return firstImage.signedUrl;
      if (firstImage.url) return firstImage.url;
    }
    
    return "/placeholder.jpg";
  };

  // Function to ensure data is an array and handle gallery properly
  const ensureArray = (value) => {
    if (!value) return [];

    // If it's already an array, return it
    if (Array.isArray(value)) return value;

    // If it's a string, try to parse it
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

  // Get gallery images with proper URLs
  const getGalleryImages = () => {
    if (!college?.gallery) return [];
    
    // If gallery is already an array of objects with url/key/signedUrl
    if (Array.isArray(college.gallery)) {
      return college.gallery.map(img => {
        if (typeof img === 'object') {
          return {
            url: img.signedUrl || img.url,
            key: img.key,
          };
        }
        // If it's just a string
        return { url: img };
      });
    }
    
    // If gallery is a string, parse it
    return ensureArray(college.gallery).map(img => {
      if (typeof img === 'object') {
        return {
          url: img.signedUrl || img.url,
          key: img.key,
        };
      }
      return { url: img };
    });
  };

  const facilities = ensureArray(college?.facilities);
  const gallery = getGalleryImages();

  if (isCollegeLoading || isCoursesLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-t-4 border-[#11B1CC] rounded-full" />
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
            src={getThumbnailUrl()}
            className="w-full h-full object-cover"
            alt={college.name || "College Banner"}
            onError={(e) => {
              e.target.src = "/placeholder.jpg";
              e.target.onerror = null;
            }}
          />
        </div>

        {/* 2. Header Info & Action Buttons */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-start gap-6 border-b pb-8">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-[#11B1CC]">
              {college.name} – {college.city}
            </h1>
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500 font-medium">
              <span className="flex items-center gap-1">
                <MapPin size={16} className="text-[#11B1CC]" /> 
                {college.city}, {college.state}
              </span>
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
          <CenterStat 
            icon={<Users className="text-[#5F259F]/70" size={40} />} 
            value={`${college.studentsCount || '0'}+`} 
            label="Students" 
          />
          <CenterStat 
            icon={<ExperienceIcon className="text-[#5F259F]/70" size={40} />} 
            value={`${college.experienceYears || '0'}`} 
            label="Years Experience" 
          />
          <CenterStat 
            icon={<LayoutGrid className="text-[#5F259F]/70" size={40} />} 
            value={`${college.coursesCount || '0'}+`} 
            label="Courses" 
          />
        </div>

        {/* 4. Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-6">

          {/* Main (8 Cols) */}
          <div className="lg:col-span-8 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-[#11B1CC] mb-4">About {college.name}</h2>
              <p className="text-gray-600 leading-relaxed text-justify">{college.description}</p>
            </section>

            {/* Highlights Section */}
            <section>
              <h2 className="text-xl font-bold text-[#11B1CC] mb-6 border-b-2 border-orange-400 inline-block pb-1">
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
            {gallery.length > 0 && (
              <section className="border-t pt-10">
                <h3 className="text-xl font-bold text-[#11B1CC] mb-6">Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {gallery.map((img, i) => (
                    <div key={i} className="h-44 rounded-lg overflow-hidden border bg-gray-50">
                      <img 
                        src={img.url} 
                        className="w-full h-full object-cover" 
                        alt={`${college.name} gallery ${i + 1}`}
                        onError={(e) => {
                          e.target.src = "/placeholder.jpg";
                          e.target.onerror = null;
                        }}
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Courses Section */}
            <section className="border-t pt-10 mt-10">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-[#11B1CC] flex items-center gap-3">
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
                      course={{
                        ...course,
                        title: course.name,
                        displayTitle: course.name,
                        gradient: course.gradient || "from-[#11B1CC] to-[#11B1CC]"
                      }}
                      brandDark="#11B1CC"
                      brandPurple="#11B1CC"
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
                  className="w-full h-full border-0"
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