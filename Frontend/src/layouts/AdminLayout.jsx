import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/admin/Navbar";
import AdminSidebar from "../components/admin/Sidebar";
import { useState } from "react";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-[#f6f7fb]">

      <AdminSidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div
        className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "lg:ml-72" : "lg:ml-20"
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