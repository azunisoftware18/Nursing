import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, Tag, ChevronLeft, Share2, Bookmark } from "lucide-react";
import { useBlogById } from "../../hooks/useBlog";

const ViewBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useBlogById(id);
  const blog = data?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading blog...
      </div>
    );
  }

  if (isError || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Blog not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate("/blog")}
            className="flex items-center gap-1 text-gray-500 hover:text-[#1a237e] font-medium"
          >
            <ChevronLeft size={20} /> Back to Blogs
          </button>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 mt-8">
        {/* Image */}
        <div className="relative h-[300px] md:h-[450px] rounded-3xl overflow-hidden shadow-xl mb-8">
          {blog.image ? (
            <img
              src={`${import.meta.env.VITE_API_BASE_URL}/uploads/blogs/${blog.image}`}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-indigo-50 flex items-center justify-center">
              <Tag size={80} className="text-indigo-200" />
            </div>
          )}

          <div className="absolute top-6 left-6">
            <span className="bg-[#6739b7] text-white px-4 py-1.5 rounded-full text-sm font-bold">
              {blog.tag}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl p-6 md:p-12 border shadow-sm">
          {/* Meta */}
          <div className="flex gap-6 text-sm text-gray-400 mb-6">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-[#6739b7]" />
              {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#1a237e] mb-8">
            {blog.title}
          </h1>

          {/* Body */}
          <div
            className="prose prose-lg max-w-none text-gray-600"
            dangerouslySetInnerHTML={{ __html: blog.description }}
          />
        </div>
      </article>
    </div>
  );
};

export default ViewBlog;
