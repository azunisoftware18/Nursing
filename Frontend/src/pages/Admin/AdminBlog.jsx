import React, { useState } from 'react';
import { useBlogs, useAddBlog, useUpdateBlog, useDeleteBlog } from '../../hooks/useBlog';
import { Plus, Pencil, Trash2, Loader2, FileText, Image as ImageIcon, X, Type } from 'lucide-react';
import toast from 'react-hot-toast';
import Pagination from '../../components/common/Pagination';
import BlogModal from '../../components/modals/BlogModal';

function AdminBlog() {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const handleOpenModal = (blog = null) => {
    setEditingBlog(blog); // ✔ only this
    setIsModalOpen(true);
  };


  // Data Fetching
  const { data: blogs, isLoading } = useBlogs(page, 6);

  // Mutations
  const addMutation = useAddBlog();
  const updateMutation = useUpdateBlog();
  const deleteMutation = useDeleteBlog();



  const handleSubmit = (formData) => {
    if (editingBlog) {
      updateMutation.mutate(
        {
          id: editingBlog.id,
          data: formData,
        },
        {
          onSuccess: () => {
            toast.success("Blog updated successfully");
            setIsModalOpen(false);
            setEditingBlog(null);
          },
        }
      );
    } else {
      addMutation.mutate(formData, {
        onSuccess: () => {
          toast.success("Blog added successfully");
          setIsModalOpen(false);
        },
      });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      deleteMutation.mutate(id, {
        onSuccess: () => toast.success("Blog deleted successfully"),
      });
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#1a237e]">Content Management</h1>
          <p className="text-sm text-gray-500 font-medium">Create and manage your portal's blog posts</p>
        </div>
        <button
          type="button"
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-[#6739b7] text-white px-5 py-2.5 rounded-xl hover:bg-[#5a32a3] transition-all shadow-lg font-bold"
        >
          <Plus size={20} /> Write New Post
        </button>

      </div>

      {/* Blog List Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full flex flex-col items-center justify-center p-20 gap-3">
            <Loader2 className="animate-spin text-[#6739b7]" size={32} />
            <span className="text-gray-400 font-medium">Loading stories...</span>
          </div>
        ) : (
          blogs?.data?.map((blog) => (
            <div key={blog.id} className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                {blog.image ? (
                  <img src={`${import.meta.env.VITE_API_BASE_URL}/uploads/blogs/${blog.image}`}
                    alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <ImageIcon size={48} />
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter text-[#1a237e]">
                  {blog.code}
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-black text-gray-800 text-lg line-clamp-1 mb-2">{blog.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-3 mb-6 leading-relaxed">
                  {blog.description}
                </p>

                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex gap-2">
                    <button onClick={() => handleOpenModal(blog)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Pencil size={18} />
                    </button>
                    <button onClick={() => handleDelete(blog.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-8">
        <Pagination
          currentPage={page}
          totalPages={blogs?.totalPages || 1}
          onPageChange={setPage}
        />
      </div>

      <BlogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        editingBlog={editingBlog}
        isLoading={addMutation.isLoading || updateMutation.isLoading}
      />

    </div>
  );
}

export default AdminBlog;