import React, { useState } from 'react'; // useState import kiya
import { MessageCircle, PhoneCall } from 'lucide-react';
import ApplyNowModal from '../modals/ApplyNowModal';

const FloatingActionButtons = () => {
  // Modal ki state
  const [isModalOpen, setIsModalOpen] = useState(false);

  const phoneNumber = "918233317530";
  const whatsappMessage = "Hello, I am interested in Nursing Admission.";

  return (
    <>
      <div className="fixed bottom-6 left-0 right-0 z-[100] px-2 pointer-events-none">
        <div className="w-full mx-auto flex justify-between items-center pointer-events-auto">

          {/* Left Side: WhatsApp Button */}
          <a
            href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#128C7E] text-white px-3 py-2.5 rounded-full shadow-lg transition-all active:scale-95 group"
          >
            <MessageCircle size={18} className="fill-current" />
            <span className="font-bold text-xs md:text-sm">Let's Chat</span>
          </a>

          {/* Right Side: Request Call Back - Ab ye Modal Open Karega */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 bg-[#1a237e] hover:bg-[#0d144d] text-white px-3 py-2.5 rounded-full shadow-lg transition-all active:scale-95 cursor-pointer border-none"
          >
            <PhoneCall size={16} />
            <span className="font-bold text-xs md:text-sm">Request Call Back</span>
          </button>
        </div>
      </div>

      {/* Modal Component */}
      <ApplyNowModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default FloatingActionButtons;