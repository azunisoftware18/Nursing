import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const brandColor = "#6739b7"; // Matching your Home.jsx theme
    const { mutate, isLoading, error } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();

        mutate({
            email,
            password,
        });
    };

    return (
        <div className="relative min-h-screen w-full bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center px-4 overflow-hidden">

            {/* Background Decorative Glow (Similar to your Image Section) */}
            <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-purple-100 rounded-full blur-3xl opacity-50 -z-10"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-blue-50 rounded-full blur-3xl opacity-50 -z-10"></div>

            {/* Login Card */}
            <div className="w-full max-w-md z-20">
                <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl shadow-purple-100/50 border border-purple-50">

                    {/* Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-extrabold text-[#1a237e] mb-2">
                            Admin <span style={{ color: brandColor }}>Portal</span>
                        </h1>
                        <p className="text-gray-500 text-sm">
                            Please enter your administrative credentials
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                            <input
                                type="email"
                                required
                                className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                                placeholder="admin@nursing.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Password Field */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className="w-full px-5 py-3 pr-12 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#6739b7]"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={isLoading}
                            style={{ backgroundColor: brandColor }}
                            className="w-full py-4 text-white font-bold rounded-2xl shadow-lg shadow-purple-200 hover:scale-[1.02] active:scale-95 transition-all duration-300 mt-4 disabled:opacity-70"
                        >
                            {isLoading ? "Logging in..." : "Access Dashboard"}
                        </Button>

                    </form>

                    {/* Footer Link */}
                    <div className="mt-8 text-center">
                        <p className="text-xs text-gray-400">
                            Go back to <a href="/" className="underline hover:text-[#6739b7]">Homepage</a>
                        </p>
                    </div>
                </div>

                {/* Support Text (Similar style to Popular Searches) */}
                <div className="mt-6 text-center text-[11px] text-gray-400">
                    <span className="font-semibold text-gray-700">Need Help? </span>
                    <span className="hover:text-[#6739b7] cursor-pointer underline decoration-purple-100">Contact Technical Support</span>
                </div>
            </div>

            {/* Reusing your Bottom Curve logic for consistency */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180 z-10">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] md:h-[60px] fill-white">
                    <path d="M1200 120L0 16.48V0h1200v120z"></path>
                </svg>
            </div>
        </div>
    );
};

export default Login;