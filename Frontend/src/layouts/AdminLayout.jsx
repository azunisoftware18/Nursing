import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/admin/Navbar";
import AdminSidebar from "../components/admin/Sidebar";
import { useState } from "react";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-[#f6f7fb] relative">
      {/* Sidebar - fixed positioning */}
      <div className="fixed top-0 left-0 h-screen z-50">
        <AdminSidebar
          isOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      </div>

      {/* Main Content - with margin to account for sidebar */}
      <div
        className={`flex-1 min-h-screen transition-all duration-300 ${
          isSidebarOpen ? "ml-72" : "ml-20"
        }`}
      >
        <AdminNavbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;