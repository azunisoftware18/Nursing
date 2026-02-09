import React, { useState } from "react";
import {
  useColleges,
  useDeleteCollege,
  useUpdateCollege,
  useAddCollege,
} from "../../hooks/useCollege";
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import toast from "react-hot-toast";
import CollegeModal from "../../components/modals/AddCollegeModal";
import Button from "../../components/common/Button";
import Pagination from "../../components/common/Pagination";

function AdminColleges() {
  const [searchTerm, setSearchTerm] = useState("");
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCollege, setEditingCollege] = useState(null);

  const { data: colleges, isLoading } = useColleges();
  const collegesList = colleges?.data || [];

  const filteredColleges = collegesList.filter((college) => {
    const keyword = searchTerm.toLowerCase();

    return (
      college.name?.toLowerCase().includes(keyword) ||
      college.code?.toLowerCase().includes(keyword) ||
      college.state?.toLowerCase().includes(keyword) ||
      college.city?.toLowerCase().includes(keyword)
    );
  });

  const totalPages = Math.ceil(filteredColleges.length / ITEMS_PER_PAGE);

  const paginatedColleges = filteredColleges.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const createMutation = useAddCollege();
  const updateMutation = useUpdateCollege();
  const deleteMutation = useDeleteCollege();

  const handleOpenModal = (college = null) => {
    setEditingCollege(college);
    setIsModalOpen(true);
  };

  const handleModalSubmit = (formDataToSend) => {
    if (editingCollege) {
      updateMutation.mutate(
        { id: editingCollege.id, data: formDataToSend },
        {
          onSuccess: () => {
            toast.success("College updated successfully");
            setIsModalOpen(false);
          },
          onError: () => toast.error("Failed to update college"),
        },
      );
    } else {
      createMutation.mutate(formDataToSend, {
        onSuccess: () => {
          toast.success("College added successfully");
          setIsModalOpen(false);
        },
        onError: () => toast.error("Failed to add college"),
      });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this college?")) {
      deleteMutation.mutate(id, {
        onSuccess: () => toast.success("College deleted successfully"),
      });
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#1a237e]">
            College Directory
          </h1>
          <p className="text-sm text-gray-500 font-medium">
            Manage institution records and profiles
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          {/* SEARCH INPUT */}
          <input
            type="text"
            placeholder="Search by name, code, city or state..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // reset page on search
            }}
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[#6739b7] focus:border-transparent outline-none w-full sm:w-72"
          />

          {/* ADD BUTTON */}
          <Button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-[#6739b7] text-white px-5 py-2.5 rounded-xl hover:bg-[#5a32a3] transition-all shadow-lg shadow-indigo-100 font-bold"
          >
            <Plus size={20} /> Add College
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col min-h-[500px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-20 gap-3">
            <Loader2 className="animate-spin text-[#6739b7]" size={32} />
            <span className="text-gray-400 font-medium">
              Loading colleges...
            </span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    College Info
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Code
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginatedColleges.map((college) => (
                  <tr
                    key={college.id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center text-[#6739b7] overflow-hidden border border-indigo-100">
                          {college.image ? (
                            <img
                              src={college.image}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <ImageIcon size={20} />
                          )}
                        </div>
                        <span className="font-bold text-gray-800">
                          {college.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-500">
                      {college.code}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                      {college.city}, {college.state}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-[10px] px-2.5 py-1 rounded-full font-black uppercase tracking-tighter ${college.sector === "Government"
                            ? "bg-green-100 text-green-700"
                            : college.sector === "Semi-Govt"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                      >
                        {college.sector}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2 ">
                        <button
                          onClick={() => handleOpenModal(college)}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(college.id)}
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
            {!isLoading && filteredColleges.length === 0 && (
              <div className="py-20 text-center text-gray-400 font-medium">
                No colleges found matching your search
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal Component Usage */}
      <CollegeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        editingCollege={editingCollege}
        isMutating={createMutation.isLoading || updateMutation.isLoading}
      />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      )}
    </div>
  );
}

export default AdminColleges;
