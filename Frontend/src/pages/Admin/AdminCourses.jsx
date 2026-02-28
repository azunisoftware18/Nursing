import React, { useState } from 'react';
import { useCourses, useAddCourse, useUpdateCourse, useDeleteCourse } from '../../hooks/useCourse';
import { useColleges } from '../../hooks/useCollege';
import { Plus, Pencil, Trash2, Loader2, BookOpen, Clock, GraduationCap } from 'lucide-react';
import toast from 'react-hot-toast';
import Pagination from '../../components/common/Pagination';
import AddCourseModal from '../../components/modals/AddCourseModal';

function AdminCourses() {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const { data: courses, isLoading } = useCourses(page, 6);
  const { data: colleges } = useColleges();

  const addMutation = useAddCourse();
  const updateMutation = useUpdateCourse();
  const deleteMutation = useDeleteCourse();

  const handleOpenModal = (course = null) => {
    setEditingCourse(course);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (formData) => {
    const mutation = editingCourse ? updateMutation : addMutation;
    const payload = editingCourse ? { id: editingCourse.id, data: formData } : formData;

    mutation.mutate(payload, {
      onSuccess: (res) => {
        toast.success(res.message);
        setIsModalOpen(false);
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || "Operation failed");
      },
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      deleteMutation.mutate(id, {
        onSuccess: (res) => toast.success(res.message),
        onError: (error) => toast.error(error.response?.data?.message),
      });
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      {/* --- RESPONSIVE HEADER --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#1a237e]">
            Academic Courses
          </h1>
          <p className="text-sm text-gray-500 font-medium mt-1">
            Manage curriculum and degree programs
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#6739b7] text-white px-6 py-3 rounded-xl shadow-lg hover:bg-[#5a32a3] active:scale-95 transition-all font-bold"
        >
          <Plus size={20} /> <span>Add Course</span>
        </button>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-20 gap-4">
            <Loader2 className="animate-spin text-[#6739b7]" size={40} />
            <p className="text-gray-400 animate-pulse">Loading course data...</p>
          </div>
        ) : (
          <>
            {/* --- DESKTOP TABLE VIEW (Visible on md and up) --- */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Course Name</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Code</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Duration</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Eligibility</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {courses?.data?.map((course) => (
                    <tr key={course.id} className="hover:bg-indigo-50/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-indigo-50 rounded-lg text-[#6739b7]">
                            <BookOpen size={18} />
                          </div>
                          <span className="font-bold text-gray-800">{course.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-indigo-600 font-bold text-sm">
                        {course.code}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                        {course.duration}
                      </td>
                      <td className="px-6 py-4 text-sm italic text-gray-500 max-w-xs truncate">
                        {course.eligibility}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-1">
                          <button onClick={() => handleOpenModal(course)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                            <Pencil size={18} />
                          </button>
                          <button onClick={() => handleDelete(course.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* --- MOBILE CARD VIEW (Visible on small screens) --- */}
            <div className="md:hidden divide-y divide-gray-100">
              {courses?.data?.map((course) => (
                <div key={course.id} className="p-5 active:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1 pr-4">
                      <p className="text-xs font-mono text-indigo-600 font-black mb-1">{course.code}</p>
                      <h3 className="font-bold text-gray-900 text-lg leading-tight">{course.name}</h3>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleOpenModal(course)} className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                        <Pencil size={18} />
                      </button>
                      <button onClick={() => handleDelete(course.id)} className="p-2.5 bg-red-50 text-red-600 rounded-xl">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock size={16} className="text-gray-400" />
                      <span className="text-xs font-medium">{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <GraduationCap size={16} className="text-gray-400" />
                      <span className="text-xs font-medium truncate">{course.eligibility}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* --- EMPTY STATE --- */}
            {!isLoading && courses?.data?.length === 0 && (
              <div className="py-20 text-center px-6">
                <BookOpen size={48} className="mx-auto text-gray-200 mb-4" />
                <p className="text-gray-400 font-medium">
                  {courses?.message || "No courses available."}
                </p>
                <button onClick={() => handleOpenModal()} className="mt-4 text-[#6739b7] font-bold text-sm hover:underline">
                  Click here to create your first course
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* --- RESPONSIVE PAGINATION --- */}
      <div className="mt-8 mb-4 overflow-x-auto">
        <Pagination
          currentPage={page}
          totalPages={courses?.totalPages || 1}
          onPageChange={(newPage) => {
            setPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </div>

      <AddCourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        editingCourse={editingCourse}
        colleges={colleges?.data || []}
        isLoading={addMutation.isLoading || updateMutation.isLoading}
      />
    </div>
  );
}

export default AdminCourses;