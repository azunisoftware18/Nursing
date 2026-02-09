import React, { useState } from 'react';
import Button from '../common/Button';
import { useApply } from '../../hooks/useApply';
import toast from 'react-hot-toast';
import { useCourses } from '../../hooks/useCourse';
import { useColleges } from '../../hooks/useCollege';
import { X } from 'lucide-react';
import { useIndiaCities, useIndiaStates } from '../../hooks/useIndia';

function ApplyNowModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    state: '',
    city: '',
    course: '',
    college: ''
  });
  const { data: statesRes } = useIndiaStates();
  const states = statesRes?.data || [];

  const { data: citiesRes } = useIndiaCities(formData.state);
  const cities = citiesRes?.data || [];

  const { data: coursesData } = useCourses();
  const { data: collegesData } = useColleges();
  const { mutate, isLoading } = useApply();

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Reset college if course changes
      ...(name === 'course' ? { college: '' } : {})
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.phone.length < 10) return toast.error("Please enter a valid phone number");

    const payload = {
      ...formData,
      name: formData.name.trim(),
      email: formData.email?.trim() || undefined,
    };

    mutate(payload, {
      onSuccess: () => {
        toast.success("Application submitted successfully");
        onClose();
        setFormData({ name: "", phone: "", email: "", state: "", city: "", course: "", college: "" });
      },
      onError: (err) => toast.error(err.response?.data?.message || "Something went wrong")
    });
  };

  const filteredColleges =
    collegesData?.data?.filter((college) => {
      const matchState = formData.state
        ? college.state === formData.state
        : true;

      const matchCity = formData.city
        ? college.city === formData.city
        : true;

      const matchCourse = formData.course
        ? college.courseIds?.includes(formData.course)
        : true;

      return matchState && matchCity && matchCourse;
    }) || [];


  // Reusable Input Class
  const inputClass = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6739b7] focus:border-transparent outline-none transition-all duration-200 text-gray-800 placeholder:text-gray-400";
  const labelClass = "text-xs font-bold text-[#1a237e] uppercase tracking-wider ml-1 mb-1 block";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose}></div>

      <div className="relative bg-white w-full max-w-lg max-h-[95vh] overflow-hidden rounded-[2rem] shadow-2xl">


        {/* Header */}
        <div className="sticky top-0 bg-white z-10 pt-8 pb-4 text-center border-b border-gray-50">
          <button onClick={onClose} className="absolute top-4 right-6 text-gray-400 hover:text-gray-600 transition-colors">
            <X className="h-7 w-7" />
          </button>
          <span className="bg-indigo-50 text-[#6739b7] px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">Apply Now</span>
          <h2 className="mt-2 text-2xl font-black text-[#1a237e]">Start Your Journey</h2>
        </div>

        <form className="p-8 space-y-5" onSubmit={handleSubmit}>

          {/* Full Name */}
          <div>
            <label className={labelClass}>Full Name *</label>
            <input name="name" required minLength={3} value={formData.name} onChange={handleChange}
              placeholder="Enter your full name" className={inputClass} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Phone */}
            <div>
              <label className={labelClass}>Phone Number *</label>
              <input type="tel" maxLength={10} required value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "") })}
                placeholder="10-digit number" className={inputClass} />
            </div>
            {/* Email */}
            <div>
              <label className={labelClass}>Email Address</label>
              <input name="email" type="email" value={formData.email} onChange={handleChange}
                placeholder="Email (optional)" className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* State */}
            <div>
              <label className={labelClass}>State *</label>
              <select
                name="state"
                required
                value={formData.state}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    state: e.target.value,
                    city: "",
                    college: ""
                  })
                }
                className={inputClass}
              >
                <option value="">Select State</option>
                {states.map((s) => (
                  <option key={s.name} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>

            </div>
            {/* City */}
            <div>
              <label className={labelClass}>City *</label>
              <select
                name="city"
                required
                value={formData.city}
                disabled={!formData.state}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    city: e.target.value,
                    college: ""
                  })
                }
                className={`${inputClass} ${!formData.state ? "opacity-50" : ""}`}
              >
                <option value="">
                  {formData.state ? "Select City" : "Select state first"}
                </option>
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

            </div>
          </div>

          <hr className="border-gray-100 my-2" />

          {/* Course Select */}
          <div>
            <label className={labelClass}>Preferred Course</label>
            <select name="course" value={formData.course} onChange={handleChange} className={inputClass}>
              <option value="">Select a Course</option>
              {coursesData?.data?.map((course) => (
                <option key={course.id} value={course.id}>{course.name}</option>
              ))}
            </select>
          </div>

          {/* College Select */}
          <div>
            <label className={labelClass}>Preferred College</label>
            <select
              name="college"
              value={formData.college}
              onChange={handleChange}
              disabled={!formData.course || !formData.city}
              className={`${inputClass} ${!formData.course || !formData.city
                ? "opacity-50 cursor-not-allowed bg-gray-100"
                : ""
                }`}
            >
              <option value="">
                {formData.course && formData.city
                  ? "Select College"
                  : "Select state, city & course first"}
              </option>

              {filteredColleges.map((college) => (
                <option key={college.id} value={college.id}>
                  {college.name}
                </option>
              ))}
            </select>

          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-2xl text-white font-bold text-lg shadow-lg shadow-indigo-200 transition-all active:scale-95 bg-[#6739b7] hover:bg-[#5a32a3]"
          >
            {isLoading ? "Processing..." : "Submit Inquiry"}
          </Button>

          <p className="text-center text-[10px] text-gray-400">By submitting, you agree to our terms and privacy policy.</p>
        </form>
      </div>
    </div>
  );
}

export default ApplyNowModal;