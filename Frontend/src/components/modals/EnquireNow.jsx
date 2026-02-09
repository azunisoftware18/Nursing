import React, { useState } from 'react';
import Button from '../common/Button';
import { Check } from 'lucide-react';
import { useApply } from '../../hooks/useApply';
import toast from 'react-hot-toast';

const EnquireNow = () => {
  const brandColor = "#6739b7";

  const [phone, setPhone] = useState("");
  const { mutate, isLoading } = useApply();

  const handleSubmit = () => {
    if (phone.length < 10) {
      return toast.error("Enter valid mobile number");
    }

    const payload = {
      phone,          
    };

    mutate(payload, {
      onSuccess: () => {
        toast.success("We will contact you soon");
        setPhone("");
      },
      onError: (err) =>
        toast.error(err.response?.data?.message || "Something went wrong"),
    });
  };

  return (
    <section className="px-4 md:px-12 py-10">
      <div className="max-w-[95%] mx-auto">
        <div
          className="relative overflow-hidden rounded-[2.5rem] py-12 px-6 md:px-20 text-center shadow-xl"
          style={{ background: `linear-gradient(to right, ${brandColor}, #8e24aa)` }}
        >
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-8">
              Enquire now!
            </h2>

            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center bg-white p-2 rounded-2xl sm:rounded-full shadow-lg gap-2">
                <input
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, ""))
                  }
                  placeholder="Enter your phone here"
                  className="w-full flex-1 px-6 py-4 text-gray-700 outline-none rounded-full text-lg"
                />

                <Button
                  disabled={isLoading}
                  onClick={handleSubmit}
                  className="flex items-center gap-2"
                >
                  {isLoading ? "Sending..." : <> <Check size={18} /> Submit </>}
                </Button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default EnquireNow;
