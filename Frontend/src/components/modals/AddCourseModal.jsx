import React, { useEffect, useState } from 'react';
import { X, BookOpen, Loader2 } from 'lucide-react';

function AddCourseModal({
  isOpen,
  onClose,
  onSubmit,
  editingCourse,
  colleges,
  isLoading
}) {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    duration: '',
    eligibility: '',
    collegeId: ''
  });

  // Jab modal khule ya editingCourse change ho, tab state update karein
  useEffect(() => {
    if (editingCourse) {
      setFormData({
        name: editingCourse.name || '',
        code: editingCourse.code || '',
        duration: editingCourse.duration || '',
        eligibility: editingCourse.eligibility || '',
        collegeId: editingCourse.collegeId || ''
      });
    } else {
      setFormData({ name: '', code: '', duration: '', eligibility: '', collegeId: '' });
    }
  }, [editingCourse, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in duration-200 relative">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-black text-[#1a237e] mb-6 flex items-center gap-2">
          <BookOpen className="text-[#6739b7]" />
          {editingCourse ? 'Edit Course' : 'New Academic Program'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">


            <div className="col-span-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Course Name</label>
              <input
                required
                placeholder="e.g. Bachelor of Technology"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#6739b7]"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Course Code</label>
              <input
                required
                placeholder="BTECH-CS"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#6739b7]"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Duration</label>
              <input
                required
                placeholder="4 Years"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#6739b7]"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              />
            </div>

            <div className="col-span-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Eligibility Criteria</label>
              <input
                placeholder="12th with PCM 60%"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#6739b7]"
                value={formData.eligibility}
                onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
              />
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-100 rounded-xl font-bold text-gray-500 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-[#6739b7] text-white rounded-xl font-bold hover:bg-[#5a32a3] shadow-lg disabled:opacity-50 flex justify-center items-center"
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : (editingCourse ? 'Save Changes' : 'Create Course')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCourseModal;