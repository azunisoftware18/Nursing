import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Check,
  X,
  Loader2,
  ShieldCheck,
  AtSign,
} from "lucide-react";
import { useMe, useUpdateMe } from "../../hooks/useUser";

const ProfileInput = ({ label, icon: Icon, isEditing, ...props }) => (
  <div className="space-y-1.5">
    <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
      {Icon && <Icon size={14} className="text-[#6739b7]" />} {label}
    </label>
    <input
      {...props}
      className={`w-full px-4 py-3 rounded-xl border outline-none transition-all duration-200
        ${isEditing
          ? 'border-purple-200 bg-white focus:ring-2 focus:ring-purple-500 shadow-sm'
          : 'border-transparent bg-gray-50 text-gray-600 cursor-not-allowed font-medium'}`}
    />
  </div>
);

const Profile = () => {
  const { data: user, isLoading } = useMe();
  const updateMutation = useUpdateMe();

  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [tempData, setTempData] = useState(null);

  useEffect(() => {
    if (user) {
      setTempData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        username: user.username || "",
        email: user.email || "",
        password: "",
      });
    }
  }, [user]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const payload = {
      firstName: tempData.firstName,
      lastName: tempData.lastName,
      username: tempData.username,
      email: tempData.email,
    };

    if (tempData.password) {
      payload.password = tempData.password;
    }

    updateMutation.mutate(payload, {
      onSuccess: () => {
        setIsEditing(false);
        setTempData({ ...tempData, password: "" });
      },
    });
  };

  if (isLoading || !tempData) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-gray-400">
        <Loader2 className="animate-spin text-[#6739b7] mb-4" size={40} />
        <p className="font-medium animate-pulse text-indigo-900">Fetching your credentials...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-[2rem] shadow-2xl shadow-indigo-100 border border-gray-100 overflow-hidden">

        {/* Header Banner */}
        <div className="h-28 bg-gradient-to-r from-[#1a237e] to-[#6739b7] flex items-center px-8 relative">
          <div className="absolute right-0 top-0 opacity-10 p-4">
            <ShieldCheck size={100} color="white" />
          </div>
          <h1 className="text-white text-xl md:text-2xl font-bold flex items-center gap-3 relative z-10">
            <ShieldCheck className="text-purple-200" /> Account Settings
          </h1>
        </div>

        <div className="p-6 md:p-10">
          {/* Profile Identity Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-50 pb-8 mb-8 gap-4">
            <div className="text-center sm:text-left">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#1a237e]">
                {user.firstName} {user.lastName}
              </h2>
              <div className="flex items-center gap-2 text-gray-500 justify-center sm:justify-start mt-1">
                <AtSign size={16} className="text-[#6739b7]" />
                <span className="font-medium">{user.username}</span>
              </div>
            </div>

            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-8 py-2.5 bg-indigo-50 text-[#1a237e] font-bold rounded-xl hover:bg-indigo-100 transition-all active:scale-95 shadow-sm"
              >
                Edit Profile
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setTempData({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                    email: user.email,
                    password: "",
                  });
                }}
                className="p-2 text-gray-400 hover:bg-red-50 hover:text-red-500 rounded-full transition-all"
              >
                <X size={28} />
              </button>
            )}
          </div>

          {/* Settings Form */}
          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <ProfileInput
                label="First Name"
                isEditing={isEditing}
                disabled={!isEditing}
                value={tempData.firstName}
                onChange={(e) => setTempData({ ...tempData, firstName: e.target.value })}
              />

              <ProfileInput
                label="Last Name"
                isEditing={isEditing}
                disabled={!isEditing}
                value={tempData.lastName}
                onChange={(e) => setTempData({ ...tempData, lastName: e.target.value })}
              />

              <ProfileInput
                label="Username"
                icon={User}
                isEditing={isEditing}
                disabled={!isEditing}
                value={tempData.username}
                onChange={(e) => setTempData({ ...tempData, username: e.target.value })}
              />

              <ProfileInput
                label="Email Address"
                icon={Mail}
                type="email"
                isEditing={isEditing}
                disabled={!isEditing}
                value={tempData.email}
                onChange={(e) => setTempData({ ...tempData, email: e.target.value })}
              />

              {/* Password Field */}
              <div className="md:col-span-2 space-y-1.5 relative">
                <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
                  <Lock size={14} className="text-[#6739b7]" />
                  {isEditing ? "New Password (Leave blank to keep current)" : "Password"}
                </label>
                <div className="relative">
                  <input
                    disabled={!isEditing}
                    type={showPassword ? "text" : "password"}
                    value={isEditing ? tempData.password : "••••••••••••"}
                    onChange={(e) => setTempData({ ...tempData, password: e.target.value })}
                    placeholder={isEditing ? "Enter new password" : ""}
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-all pr-12
                            ${isEditing
                        ? 'border-purple-200 bg-white focus:ring-2 focus:ring-purple-500 shadow-sm'
                        : 'border-transparent bg-gray-50 text-gray-400 cursor-not-allowed'}`}
                  />
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#6739b7]"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="pt-6 animate-in slide-in-from-bottom-4 duration-300">
                <button
                  type="submit"
                  disabled={updateMutation.isLoading}
                  className="w-full bg-[#1a237e] hover:bg-[#283593] text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-3 disabled:opacity-70 active:scale-[0.98]"
                >
                  {updateMutation.isLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Saving Changes...
                    </>
                  ) : (
                    <>
                      <Check size={20} />
                      Update Profile Information
                    </>
                  )}
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Footer Security Badge */}
        <div className="bg-gray-50 p-6 flex justify-center border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-widest">
            <ShieldCheck size={14} /> 256-bit Secure Encryption
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;