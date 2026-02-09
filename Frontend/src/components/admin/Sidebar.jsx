import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    GraduationCap,
    BookOpen,
    Users,
    ChevronLeft,
    LogOut,
    Newspaper,
    Globe,
    UserPlus
} from 'lucide-react';

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
    const brandPurple = "#6739b7";

    const menuItems = [
        { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={22} /> },
        { name: 'Colleges', path: '/admin/admin-colleges', icon: <GraduationCap size={22} /> },
        { name: 'Courses', path: '/admin/admin-courses', icon: <BookOpen size={22} /> },
        { name: 'Blog', path: '/admin/admin-blog', icon: <Newspaper size={22} /> },
        { name: 'Leads', path: '/admin/leads', icon: <UserPlus size={22} /> },
        { name: 'Audit Logs', path: '/admin/audit-logs', icon: <Users size={22} /> },
    ];


    // Premium active style with a high-end "glow" effect
    const activeStyle = "bg-purple-50 text-[#6739b7] shadow-[inset_4px_0px_0px_0px_#6739b7]";
    const normalStyle = "text-gray-500 hover:bg-gray-50 hover:text-[#6739b7]";

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={toggleSidebar}
            ></div>

            {/* Sidebar Container */}
            <aside
                className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-100 z-50 transition-all duration-500 ease-in-out flex flex-col ${isOpen ? "w-72" : "w-20"}`}
            >
                {/* Logo & Toggle Section */}
                <div className={`h-20 flex items-center justify-between px-4 border-b border-gray-50 mb-4`}>
                    <div className="flex items-center gap-3 overflow-hidden">
                        {/* Iconic Logo */}

                        {isOpen && (
                            <div className="flex flex-col leading-none whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">
                                <span className="text-lg font-black text-gray-800 tracking-tight">myNursing</span>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Admin Panel</span>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={toggleSidebar}
                        className="p-1.5 rounded-lg bg-gray-50 text-gray-400 hover:bg-purple-50 hover:text-[#6739b7] transition-all border border-gray-100"
                    >
                        <ChevronLeft size={18} className={`transition-transform duration-500 ${!isOpen && "rotate-180"}`} />
                    </button>
                </div>

                {/* Main Navigation */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 space-y-8 custom-scrollbar">

                    {/* General Group */}
                    <div className="space-y-1">
                        {isOpen && <p className="px-4 mb-4 text-[10px] uppercase font-black text-gray-400 tracking-[0.2em] animate-in fade-in duration-500">General</p>}
                        {menuItems.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                title={!isOpen ? item.name : ""}
                                className={({ isActive }) => `flex items-center gap-4 px-[10px] py-3 rounded-xl font-bold transition-all duration-300 group ${isActive ? activeStyle : normalStyle}`}
                            >
                                <span className="shrink-0 transition-transform group-hover:scale-110">{item.icon}</span>
                                <span className={`transition-all duration-300 whitespace-nowrap ${!isOpen ? "opacity-0 translate-x-10" : "opacity-100 translate-x-0"}`}>
                                    {item.name}
                                </span>
                            </NavLink>
                        ))}
                    </div>
                </div>
            </aside>
        </>
    );
};

export default AdminSidebar;