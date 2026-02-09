import React from 'react';
import { Home, ChevronRight, LayoutGrid } from 'lucide-react'; // Using lucide-react as requested
import { useBlogs } from '../../hooks/useBlog';
import { useNavigate } from 'react-router-dom';

const Blog = () => {
  const brandColor = "#6739b7";
  const brandDark = "#1a237e";
  const { data, isLoading } = useBlogs();
  const navigate = useNavigate();

  // Category list based on UI
  const categories = [
    { name: " Blogs", active: true },
    // { name: "Nursing Career", active: false },
    // { name: "Entrance Exams", active: false },
    // { name: "Admission Tips", active: false },
    // { name: "Top Colleges", active: false },
  ];
  return (
    <div className="bg-[#fbf9ff] min-h-screen font-sans pb-20">
      {/* 1. Header Section - Updated with Brand Colors */}
      <header className="w-full bg-white py-12 px-6 md:px-12 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h1 className={`text-3xl md:text-4xl font-extrabold mb-2`} style={{ color: brandDark }}>
              Nursing Blog Archives
            </h1>
            <p className="text-gray-500 font-medium">Get the latest news and admission updates</p>
          </div>

          {/* Breadcrumbs with Lucide Icons */}
          <nav className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100 text-sm">
            <Home size={16} className="text-gray-400" />
            <span className="text-gray-600 hover:text-[#6739b7] cursor-pointer transition-colors">Home</span>
            <ChevronRight size={14} className="text-gray-300" />
            <span className="text-gray-400">Blog</span>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-12 mt-10">
        {/* 2. Category Filters - Updated from Teal to Brand Purple */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.name}
              className={`px-6 py-2.5 rounded-lg font-bold transition-all border flex items-center gap-2 ${cat.active
                  ? "text-white shadow-md"
                  : "bg-white text-gray-500 border-gray-200 hover:text-[#6739b7]"
                }`}
              style={{
                backgroundColor: cat.active ? brandColor : 'white',
                borderColor: cat.active ? brandColor : '#e5e7eb'
              }}
              onMouseEnter={(e) => {
                if (!cat.active) e.currentTarget.style.borderColor = brandColor;
              }}
              onMouseLeave={(e) => {
                if (!cat.active) e.currentTarget.style.borderColor = '#e5e7eb';
              }}
            >
              {cat.active && <LayoutGrid size={16} />}
              {cat.name}
            </button>
          ))}
        </div>

        {/* 3. Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.data?.map((post) => (

            <article
              onClick={() => navigate(`/blog/${post.id}`)}
              key={post.id}
              className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-gray-50 transition-all hover:scale-[1.02] hover:shadow-2xl cursor-pointer group"
            >
              {/* Image Container */}
              <div className="h-60 overflow-hidden p-3">
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL}/uploads/blogs/${post.image}`}
                  alt={post.title}
                  className="w-full h-full object-cover rounded-[1.5rem]"
                />

              </div>

              {/* Content */}
              <div className="p-6 pt-2">
                <span className="inline-block bg-purple-50 text-[#6739b7] text-xs font-bold px-3 py-1 rounded-md mb-4 uppercase tracking-wider">
                  {post.tag}
                </span>
                <h3 className="text-xl font-extrabold mb-3 leading-snug group-hover:text-[#6739b7] transition-colors" style={{ color: brandDark }}>
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
                  {post.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Blog;