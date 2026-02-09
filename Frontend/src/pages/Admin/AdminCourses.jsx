import React, { useState } from 'react';
import { useCourses, useAddCourse, useUpdateCourse, useDeleteCourse } from '../../hooks/useCourse';
import { useColleges } from '../../hooks/useCollege';
import { Plus, Pencil, Trash2, Loader2, School } from 'lucide-react';
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
    if (editingCourse) {
      updateMutation.mutate(
        {
          id: editingCourse.id,
          data: formData,
        },
        {
          onSuccess: () => {
            toast.success("Course updated successfully");
            setIsModalOpen(false);
          },
        }
      );
    } else {
      addMutation.mutate(formData, {
        onSuccess: () => {
          toast.success("Course added successfully");
          setIsModalOpen(false);
        },
      });
    }
  };


  // ... (handleDelete logic remains same)
  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      deleteMutation.mutate(id, { onSuccess: () => toast.success("Deleted") });
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header logic... */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black text-[#1a237e]">Academic Courses</h1>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-[#6739b7] text-white px-5 py-2.5 rounded-xl shadow-lg"
        >
          <Plus size={20} /> Add Course
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center p-20">
            <Loader2 className="animate-spin text-[#6739b7]" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Course Name
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Course Code
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Eligibility
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {courses?.data?.map((course) => (
                  <tr
                    key={course.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="font-bold text-gray-800">
                        {course.name}
                      </span>
                    </td>

                    <td className="px-6 py-4 font-mono text-indigo-600 font-bold">
                      {course.code}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                      {course.duration}
                    </td>

                    <td className="px-6 py-4 text-sm italic text-gray-600">
                      {course.eligibility}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleOpenModal(course)}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(course.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>


      <Pagination
        currentPage={page}
        totalPages={courses?.totalPages || 1}
        onPageChange={setPage}
      />

      {/* Separate Modal Component */}
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