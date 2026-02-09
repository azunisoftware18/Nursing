import React from "react";
import {
  Users,
  GraduationCap,
  FileText,
  TrendingUp,
  Loader2,
  ArrowUpRight,
  UserPlus,
  Newspaper,
  BookOpen,
} from "lucide-react";
import { useMe } from "../../hooks/useUser";
import { useDashboardStats } from "../../hooks/useDashboard";

const Dashboard = () => {
  const brandDark = "#1a237e";
  const { data: user } = useMe();
  const { data: stats, isLoading } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fbfbff]">
        <Loader2 className="animate-spin text-[#6739b7] mb-4" size={40} />
        <p className="text-gray-500 font-medium animate-pulse">Loading stats...</p>
      </div>
    );
  }

  const fullName = user?.firstName
    ? `${user.firstName} ${user.lastName || ""}`
    : "Admin";

  return (
    <div className="p-6 md:p-12 bg-[#fbfbff] min-h-screen font-sans">
      {/* Header Section */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight" style={{ color: brandDark }}>
          Welcome back, <span className="text-[#6739b7]">{fullName}</span>!
        </h1>
        <div className="h-1 w-20 bg-gradient-to-r from-[#1a237e] to-[#6739b7] mt-3 rounded-full"></div>
      </div>

      {/* 2x2 Stats Grid */}
      <div className="max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Row 1: Colleges & Leads */}
        <StatCard
          title="TOTAL COLLEGES"
          value={stats?.colleges || 0}
          icon={<GraduationCap size={28} />}
          bgColor="bg-indigo-50"
          iconColor="text-[#1a237e]"
          borderColor="hover:border-indigo-200"
        />

        <StatCard
          title="TOTAL LEADS"
          value={stats?.leads || 0}
          icon={<UserPlus size={28} />}
          bgColor="bg-purple-50"
          iconColor="text-[#6739b7]"
          borderColor="hover:border-purple-200"
        />

        {/* Row 2: Blogs & Courses */}
        <StatCard
          title="TOTAL BLOGS"
          value={stats?.blogs || 0}
          icon={<Newspaper size={28} />}
          bgColor="bg-orange-50"
          iconColor="text-orange-600"
          borderColor="hover:border-orange-200"
        />

        <StatCard
          title="ACTIVE COURSES"
          value={stats?.courses || 0}
          icon={<BookOpen size={28} />}
          bgColor="bg-emerald-50"
          iconColor="text-emerald-600"
          borderColor="hover:border-emerald-200"
        />
      </div>
    </div>
  );
};

// UI-Enhanced StatCard
const StatCard = ({ title, value, icon, bgColor, iconColor, borderColor }) => (
  <div className={`group bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm transition-all duration-300 ${borderColor} hover:shadow-xl hover:-translate-y-1 flex items-center gap-6`}>
    {/* Left: Icon Side */}
    <div className={`p-5 ${bgColor} ${iconColor} rounded-3xl group-hover:scale-110 transition-transform duration-300`}>
      {icon}
    </div>

    {/* Right: Content Side */}
    <div className="flex-1">
      <h3 className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1">
        {title}
      </h3>
      <div className="flex items-baseline gap-2">
        <p className="text-4xl font-black text-[#1a237e] tracking-tight">
          {value.toLocaleString()}
        </p>
        <ArrowUpRight size={18} className={`${iconColor} opacity-40 group-hover:opacity-100 transition-opacity`} />
      </div>
    </div>
  </div>
);

export default Dashboard;