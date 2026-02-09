import React from 'react';
import { Home, ChevronRight } from 'lucide-react';
import ContactForm from '../../components/forms/ContactForm';

const Contact = () => {
    // Project Brand Theme Colors
    const brandColor = "#6739b7"; // PhonePe Purple
    const brandDark = "#1a237e";  // Dark Navy for headings

    return (
        <div className="bg-white min-h-screen font-sans">
            {/* 1. Hero Banner Section */}
            <section className="relative w-full h-[250px] md:h-[300px] overflow-hidden">
                {/* Background Image with Theme Overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('https://max-website20-images.s3.ap-south-1.amazonaws.com/Types_of_Doctors_1c5efbe677.jpg')`,
                    }}
                >
                    {/* Overlay ko theme ke according deep blue/purple tint diya gaya hai */}
                    <div className="absolute inset-0 "></div>
                </div>

                {/* Banner Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">
                                Contact Us
                            </h1>
                            <p className="text-purple-100/80 font-medium">
                                Fill the form to contact us.
                            </p>
                        </div>

                        {/* Breadcrumb Navigator */}
                        <nav className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl text-sm w-fit shadow-lg border border-purple-50">
                            <Home size={16} style={{ color: brandColor }} />
                            <span className="text-gray-600 hover:text-[#6739b7] cursor-pointer font-bold transition-colors">Home</span>
                            <ChevronRight size={14} className="text-gray-300" />
                            <span className="text-gray-400 font-medium">Contact Us</span>
                        </nav>
                    </div>
                </div>
            </section>

            {/* 2. Form Section - Background tint for section separation */}
            <main className="bg-[#fbf9ff] py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <ContactForm />
                </div>
            </main>
        </div>
    );
};

export default Contact;