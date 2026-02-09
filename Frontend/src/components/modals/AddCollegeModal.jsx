import React, { useEffect, useState } from "react";
import {
  X,
  Loader2,
  UploadCloud,
  MapPin,
  CheckSquare,
  Layers,
  Youtube,
  Users,
  BookOpen,
  Building2,
  Calendar,
  ShieldCheck,
  Info,
} from "lucide-react";
import { useCourses } from "../../hooks/useCourse";
import Button from "../common/Button";
import { useIndiaCities, useIndiaStates } from "../../hooks/useIndia";

function CollegeModal({
  isOpen,
  onClose,
  onSubmit,
  editingCollege,
  isMutating = false,
}) {
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [selectedGallery, setSelectedGallery] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const { data: availableCourses = [], isLoading } = useCourses();

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    sector: "Private",
    genderAcceptance: "Co-ed",
    state: "",
    district: "",
    city: "",
    address: "",
    googleMapLink: "",
    affiliation: "",
    approvedBy: "",
    coursesCount: "",
    experienceYears: "",
    studentsCount: "",
    youtubeVideo: "",
    facilities: "",
  });

  const { data: statesRes, isLoading: loadingStates } = useIndiaStates();
  const { data: citiesRes, isLoading: loadingCities } = useIndiaCities(
    formData.state,
  );

  // 3️⃣ derived values
  const states = statesRes?.data || [];
  const cities = citiesRes?.data || [];

  useEffect(() => {
    return () => {
      galleryPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [galleryPreviews]);

  useEffect(() => {
    if (editingCollege) {
      const facilitiesStr = Array.isArray(editingCollege.facilities)
        ? editingCollege.facilities.join(", ")
        : editingCollege.facilities || "";

      setFormData({
        name: editingCollege.name || "",
        code: editingCollege.code || "",
        description: editingCollege.description || "",
        sector: editingCollege.sector || "Private",
        genderAcceptance: editingCollege.genderAcceptance || "Co-ed",
        state: editingCollege.state || "",
        district: editingCollege.district || "",
        city: editingCollege.city || "",
        address: editingCollege.address || "",
        googleMapLink: editingCollege.googleMapLink || "",
        affiliation: editingCollege.affiliation || "",
        approvedBy: editingCollege.approvedBy || "",
        youtubeVideo: editingCollege.youtubeVideo || "",
        facilities: facilitiesStr,
        coursesCount: editingCollege.coursesCount?.toString() || "",
        experienceYears: editingCollege.experienceYears?.toString() || "",
        studentsCount: editingCollege.studentsCount?.toString() || "",
      });

      // Setting existing course IDs
      setSelectedCourses(editingCollege.courseIds || []);
    } else {
      resetForm();
    }
    // Clean up previews on open/close
    setSelectedThumbnail(null);
    setGalleryPreviews([]);
  }, [editingCollege, isOpen]);

  const resetForm = () => {
    setFormData({
      name: "",
      code: "",
      description: "",
      sector: "Private",
      genderAcceptance: "Co-ed",
      state: "",
      district: "",
      city: "",
      address: "",
      googleMapLink: "",
      affiliation: "",
      approvedBy: "",
      coursesCount: "",
      experienceYears: "",
      studentsCount: "",
      youtubeVideo: "",
      facilities: "",
    });
    setSelectedCourses([]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);

    setSelectedGallery((prev) => [...prev, ...files]);

    const previews = files.map((file) => URL.createObjectURL(file));
    setGalleryPreviews((prev) => [...prev, ...previews]);
  };

  const handleCourseToggle = (courseId) => {
    setSelectedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId],
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    const processedData = {
      ...formData,
      coursesCount: parseInt(formData.coursesCount) || 0,
      experienceYears: parseInt(formData.experienceYears) || 0,
      studentsCount: parseInt(formData.studentsCount) || 0,
      facilities: formData.facilities
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean),
      courseIds: selectedCourses,
    };
    for (let pair of data.entries()) {
      console.log(pair[0], pair[1]);
    }

    Object.entries(processedData).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") return;

      if (Array.isArray(value)) {
        value.forEach((item) => {
          data.append(`${key}[]`, item);
        });
      } else {
        data.append(key, value);
      }
    });


    if (selectedThumbnail) {
      data.append("thumbnail", selectedThumbnail);
    }

    selectedGallery.forEach((file) => {
      data.append("gallery", file);
    });

    onSubmit(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-[#1a237e]/40 backdrop-blur-md">
      <div className="bg-white w-full max-w-5xl max-h-[95vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col scale-in-animation">
        {/* Header */}
        <div className="px-10 py-6 flex justify-between items-center bg-white border-b sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-black text-[#1a237e]">
              {editingCollege
                ? "Update College Profile"
                : "Register New College"}
            </h2>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">
              Institution Management System
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-red-50 hover:text-red-500 rounded-full transition-all"
          >
            <X size={28} />
          </button>
        </div>

        {/* Scrollable Form */}
        <form
          onSubmit={handleFormSubmit}
          className="p-10 overflow-y-auto space-y-10 custom-scrollbar"
        >
          {/* Section 1: Basic Information */}
          <div className="space-y-6">
            <h3 className="text-[#6739b7] font-bold text-xs uppercase tracking-widest flex items-center gap-2 border-b pb-2">
              <Info size={14} /> General Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <FieldLabel label="College Full Name" />
                <input
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input-style"
                  placeholder="e.g. Harvard Medical College"
                />
              </div>
              <div>
                <FieldLabel label="Unique Code (Slug)" />
                <input
                  required
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  className="input-style"
                  placeholder="e.g. hmc-2024"
                />
              </div>
              <div className="md:col-span-3">
                <FieldLabel label="Detailed Description" />
                <textarea
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="input-style"
                  placeholder="Describe the institution's history and vision..."
                />
              </div>
            </div>
          </div>

          {/* Section 2: Course Selection Dropdown (Multi-select) */}
          {isLoading ? (
            <p className="text-gray-400 text-sm">Loading courses...</p>
          ) : availableCourses?.data?.length > 0 ? (
            availableCourses.data.map((course) => (
              <button
                key={course.id}
                type="button"
                onClick={() => handleCourseToggle(course.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${selectedCourses.includes(course.id)
                    ? "bg-[#6739b7] text-white border-[#6739b7] shadow-lg shadow-purple-200"
                    : "bg-white text-gray-500 border-gray-200 hover:border-purple-300 hover:text-purple-600"
                  }`}
              >
                {course.name}
              </button>
            ))
          ) : (
            <p className="text-gray-400 text-sm">
              No courses found in database.
            </p>
          )}

          {/* Section 3: Detailed Stats & Enums */}
          {/* Section 3: Detailed Stats & Enums */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-gray-50 p-8 rounded-[2rem]">
            {/* Sector */}
            <div className="space-y-1">
              <FieldLabel label="Sector" />
              <select
                name="sector"
                value={formData.sector}
                onChange={handleInputChange}
                className="input-style"
              >
                <option value="Private">Private</option>
                <option value="Government">Government</option>
                <option value="Semi-Govt">Semi-Govt</option>
              </select>
            </div>

            {/* Acceptance */}
            <div className="space-y-1">
              <FieldLabel label="Acceptance" />
              <select
                name="genderAcceptance"
                value={formData.genderAcceptance}
                onChange={handleInputChange}
                className="input-style"
              >
                <option value="Co-ed">Co-ed</option>
                <option value="Boys">Boys</option>
                <option value="Girls">Girls</option>
              </select>
            </div>

            {/* Experience Years ✅ */}
            <div className="space-y-1">
              <FieldLabel label="Experience (Years)" />
              <input
                type="number"
                name="experienceYears"
                value={formData.experienceYears}
                onChange={handleInputChange}
                className="input-style"
                placeholder="e.g. 25"
              />
            </div>

            {/* Courses Count ✅ */}
            <div className="space-y-1">
              <FieldLabel label="Courses Count" />
              <input
                type="number"
                name="coursesCount"
                value={formData.coursesCount}
                onChange={handleInputChange}
                className="input-style"
                placeholder="e.g. 12"
              />
            </div>

            {/* Students Count */}
            <div className="space-y-1">
              <FieldLabel label="Students" />
              <input
                type="number"
                name="studentsCount"
                value={formData.studentsCount}
                onChange={handleInputChange}
                className="input-style"
                placeholder="e.g. 2500"
              />
            </div>
          </div>

          {/* Section 4: Academic Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <FieldLabel label="Affiliation" />
              <div className="relative">
                <ShieldCheck
                  className="absolute left-3 top-3.5 text-emerald-500"
                  size={16}
                />
                <input
                  name="affiliation"
                  value={formData.affiliation}
                  onChange={handleInputChange}
                  className="input-style pl-10"
                  placeholder="e.g. University Name"
                />
              </div>
            </div>
            <div>
              <FieldLabel label="Approved By" />
              <input
                name="approvedBy"
                value={formData.approvedBy}
                onChange={handleInputChange}
                className="input-style"
                placeholder="e.g. AICTE, UGC"
              />
            </div>
            <div>
              <FieldLabel label="Youtube Link" />
              <div className="relative">
                <Youtube
                  className="absolute left-3 top-3.5 text-red-500"
                  size={16}
                />
                <input
                  name="youtubeVideo"
                  value={formData.youtubeVideo}
                  onChange={handleInputChange}
                  className="input-style pl-10"
                  placeholder="Youtube URL"
                />
              </div>
            </div>
          </div>

          {/* Section 5: Location */}
          <div className="space-y-6">
            <h3 className="text-[#6739b7] font-bold text-xs uppercase tracking-widest flex items-center gap-2 border-b pb-2">
              <MapPin size={14} /> Location & Address
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                name="state"
                value={formData.state}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    state: e.target.value,
                    city: "", // 🔥 state change = city reset
                  }))
                }
                className="input-style"
              >
                <option value="">Select State</option>
                {states.map((s) => (
                  <option key={s.name} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
              <select
                name="city"
                value={formData.city}
                disabled={!formData.state}
                onChange={handleInputChange}
                className="input-style"
              >

                <option value="">
                  {loadingCities ? "Loading cities..." : "Select City"}
                </option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <input
                name="district"
                placeholder="District"
                value={formData.district}
                onChange={handleInputChange}
                className="input-style"
              />
              <div className="md:col-span-3">
                <textarea
                  name="address"
                  placeholder="Full Detailed Address..."
                  rows="2"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="input-style"
                />
              </div>
              <div className="md:col-span-3">
                <input
                  name="googleMapLink"
                  placeholder="Google Maps Embed URL"
                  value={formData.googleMapLink}
                  onChange={handleInputChange}
                  className="input-style"
                />
              </div>
            </div>
          </div>

          {/* Section 6: Facilities */}
          <div>
            <FieldLabel label="Facilities (Comma Separated)" />
            <div className="relative">
              <CheckSquare
                className="absolute left-4 top-4 text-[#6739b7]"
                size={18}
              />
              <textarea
                name="facilities"
                placeholder="WiFi, Laboratory, Hostel, Canteen..."
                value={formData.facilities}
                onChange={handleInputChange}
                className="input-style pl-12 min-h-[100px]"
              />
            </div>
          </div>

          {/* Section 7: Media with Previews */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <FieldLabel label="Main Thumbnail" />
              <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed rounded-[2rem] cursor-pointer hover:bg-gray-50 transition-all border-[#6739b7]/20 relative overflow-hidden group">
                {selectedThumbnail ? (
                  <div className="absolute inset-0 w-full h-full">
                    <img
                      src={URL.createObjectURL(selectedThumbnail)}
                      className="w-full h-full object-cover"
                      alt="preview"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <UploadCloud className="text-white" />
                    </div>
                  </div>
                ) : (
                  <>
                    <UploadCloud className="text-[#6739b7] mb-2" size={32} />
                    <span className="text-xs font-bold text-gray-400">
                      Upload Cover Image
                    </span>
                  </>
                )}
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => setSelectedThumbnail(e.target.files[0])}
                />
              </label>
            </div>

            <div className="space-y-3">
              <FieldLabel
                label={`Campus Gallery (${selectedGallery.length})`}
              />
              <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed rounded-[2rem] cursor-pointer hover:bg-gray-50 transition-all border-blue-200 group">
                <Layers
                  className="text-blue-400 mb-2 group-hover:scale-110 transition-transform"
                  size={32}
                />
                <span className="text-xs font-bold text-gray-400">
                  Select Multiple Photos
                </span>
                <input
                  type="file"
                  multiple
                  className="hidden"
                  accept="image/*"
                  onChange={handleGalleryChange}
                />
              </label>

              {/* Gallery Previews */}
              {galleryPreviews.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {galleryPreviews.map((src, i) => (
                    <div
                      key={i}
                      className="w-16 h-16 rounded-xl overflow-hidden shadow-sm border border-gray-100"
                    >
                      <img
                        src={src}
                        className="w-full h-full object-cover"
                        alt="preview"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex gap-4 pt-6 sticky bottom-0 bg-white border-t mt-10">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-8 py-4 border-2 border-gray-100 rounded-2xl font-bold text-gray-400 hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <Button
              type="submit"
              disabled={isMutating}
              className="flex-[2] px-8 py-4 bg-[#6739b7] text-white rounded-2xl font-bold hover:bg-[#5a32a3] shadow-xl shadow-purple-200 flex items-center justify-center gap-3 disabled:opacity-70 active:scale-95 transition-all"
            >
              {isMutating ? (
                <Loader2 className="animate-spin" />
              ) : editingCollege ? (
                "Update Profile"
              ) : (
                "Confirm Registration"
              )}
            </Button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .input-style {
          width: 100%;
          padding: 0.9rem 1.25rem;
          background-color: #f8fafc;
          border: 1.5px solid #f1f5f9;
          border-radius: 1.2rem;
          outline: none;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.2s ease;
        }
        .input-style:focus {
          border-color: #6739b7;
          background-color: #fff;
          box-shadow: 0 4px 20px rgba(103, 57, 183, 0.08);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #e2e8f0;
          border-radius: 10px;
        }
        .scale-in-animation {
          animation: scaleIn 0.3s ease-out;
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

const FieldLabel = ({ label }) => (
  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">
    {label}
  </label>
);

export default CollegeModal;
