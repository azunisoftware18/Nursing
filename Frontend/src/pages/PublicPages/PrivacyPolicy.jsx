import React from 'react';
import { Home, ChevronRight } from 'lucide-react';

const PrivacyPolicy = () => {
  const brandDark = "#1a237e";

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* 1. Hero Banner Section */}
      <section className="relative w-full h-[250px] md:h-[300px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://cdn.prod.website-files.com/66bd394eedeb9d6ee29898c6/682f5450a046c241920c1e6f_Three%20doctors%20standing%20side%20by%20side%2C%20crossing%20their%20arms.jpg')` }}
        >
          <div className="absolute inset-0 bg-[#0a0e31]/80"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">Privacy Policy</h1>
              <p className="text-gray-300 font-medium italic">Privacy policy of Mynursingadmission.com</p>
            </div>

            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 bg-white/95 px-4 py-2 rounded-lg text-sm w-fit shadow-sm">
              <Home size={16} className="text-[#6739b7]" />
              <span className="text-gray-600 hover:text-[#6739b7] cursor-pointer font-medium">Home</span>
              <ChevronRight size={14} className="text-gray-300" />
              <span className="text-gray-400 font-medium">Privacy Policy</span>
            </nav>
          </div>
        </div>
      </section>

      {/* 2. Content Section */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed">
          <p className="text-sm text-gray-400 mb-8">Last updated: March 12, 2023</p>

          <p className="mb-10">
            This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information
            when You use the Service and tells You about Your privacy rights and how the law protects You.
          </p>

          <section className="mb-12">
            <h2 className="text-3xl font-extrabold mb-6" style={{ color: brandDark }}>Interpretation and Definitions</h2>
            <h3 className="text-xl font-bold mb-4" style={{ color: brandDark }}>Interpretation</h3>
            <p className="mb-6">
              The words of which the initial letter is capitalized have meanings defined under the following conditions.
              The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
            </p>

            <h3 className="text-xl font-bold mb-4" style={{ color: brandDark }}>Definitions</h3>
            <ul className="space-y-3 list-none p-0">
              <li><strong>Account:</strong> means a unique account created for You to access our Service.</li>
              <li><strong>Company:</strong> refers to Mynursingadmission.com.</li>
              <li><strong>Cookies:</strong> are small files placed on Your computer or mobile device by a website.</li>
              <li><strong>Personal Data:</strong> is any information that relates to an identified or identifiable individual.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-extrabold mb-6" style={{ color: brandDark }}>Collecting and Using Your Personal Data</h2>
            <h3 className="text-xl font-bold mb-4" style={{ color: brandDark }}>Types of Data Collected</h3>
            <h4 className="font-bold mb-2" style={{ color: brandDark }}>Personal Data</h4>
            <p className="mb-4">Personally identifiable information may include, but is not limited to:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Email address</li>
              <li>First name and last name</li>
              <li>Phone number</li>
              <li>Usage Data</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-extrabold mb-6" style={{ color: brandDark }}>Contact Us</h2>
            <p className="mb-4">If you have any questions about this Privacy Policy, You can contact us:</p>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <p className="mb-2"><strong>By email:</strong> info@mynursingadmission.com</p>
              <p><strong>By phone number:</strong> 917558881111</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;