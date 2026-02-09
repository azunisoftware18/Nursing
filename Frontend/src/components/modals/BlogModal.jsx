import React, { useState, useEffect, useRef } from "react";
import { X, ImageIcon, Loader2, UploadCloud, Trash2 } from "lucide-react";

function BlogModal({ isOpen, onClose, onSubmit, editingBlog, isLoading }) {
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    code: "",
    description: "",
  });

  // Theme Colors consistent with your other pages
  const brandColor = "#6739b7";
  const primaryBlue = "#1a237e";

  useEffect(() => {
    if (editingBlog) {
      setFormData({
        title: editingBlog.title,
        code: editingBlog.code,
        description: editingBlog.description,
      });
      setPreview(editingBlog.image
        ? `${import.meta.env.VITE_API_URL}/uploads/blogs/${editingBlog.image}`
        : null
      );
    } else {
      // Reset form if opening for new blog
      setFormData({ title: "", code: "", description: "" });
      setPreview(null);
      setImage(null);
    }
  }, [editingBlog, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("code", formData.code);
    data.append("description", formData.description);
    if (image) data.append("image", image);

    await onSubmit(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#1a237e]/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-[#1a237e]">
            {editingBlog ? "Update Blog Entry" : "Create New Blog"}
          </h2>
          <button 
            onClick={onClose} 
            className="p-1.0 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors text-gray-400"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">Title</label>
              <input
                required
                placeholder="Ex: Future of Nursing"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#6739b7] focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">Category Code</label>
              <input
                required
                placeholder="Ex: NUR-2024"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#6739b7] focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">Description</label>
            <textarea
              required
              rows={4}
              placeholder="Write your blog content here..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#6739b7] focus:border-transparent outline-none transition-all resize-none"
            />
          </div>

          {/* Improved Image Upload UI */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">Cover Image</label>
            <div 
              onClick={() => fileInputRef.current.click()}
              className={`relative group cursor-pointer border-2 border-dashed rounded-xl transition-all flex flex-col items-center justify-center overflow-hidden
                ${preview ? 'border-[#6739b7] h-48' : 'border-gray-300 hover:border-[#6739b7] hover:bg-purple-50 h-32'}`}
            >
              {preview ? (
                <>
                  <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <p className="text-white text-sm font-medium flex items-center gap-2">
                      <UploadCloud size={18} /> Change Image
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center space-y-2">
                  <div className="p-2 bg-purple-100 rounded-full inline-block text-[#6739b7]">
                    <ImageIcon size={24} />
                  </div>
                  <p className="text-sm text-gray-500">Click to upload image</p>
                </div>
              )}
              
              <input
                type="file"
                hidden
                accept="image/*"
                ref={fileInputRef}
                onChange={(e) => {
                  if (e.target.files[0]) {
                    setImage(e.target.files[0]);
                    setPreview(URL.createObjectURL(e.target.files[0]));
                  }
                }}
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-gray-100 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-[2] bg-[#1a237e] hover:bg-[#283593] text-white px-4 py-2.5 rounded-xl font-semibold shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Processing...
                </>
              ) : (
                editingBlog ? "Update Blog" : "Publish Blog"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BlogModal;