import React, { useState } from 'react';
import Button from '../common/Button';
import { useIndiaCities, useIndiaStates } from '../../hooks/useIndia';
import toast from 'react-hot-toast';
import { useApply } from '../../hooks/useApply';

const ContactForm = () => {
    // Brand Theme Color constant
    const brandColor = "#6739b7";
    const brandDark = "#1a237e";


    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");

    const { data: statesRes } = useIndiaStates();
    const states = statesRes?.data || [];

    const { data: citiesRes } = useIndiaCities(selectedState);
    const cities = citiesRes?.data || [];

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const { mutate, isLoading } = useApply();
    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.phone.length < 10) {
            return toast.error("Please enter a valid phone number");
        }

        const payload = {
            name: formData.name.trim(),
            phone: formData.phone,
            email: formData.email?.trim() || undefined,
            state: selectedState,
            city: selectedCity,
            message: formData.message?.trim(),
        };

        mutate(payload, {
            onSuccess: () => {
                toast.success("Form submitted successfully");
                setFormData({
                    name: "",
                    phone: "",
                    email: "",
                    message: "",
                });
                setSelectedState("");
                setSelectedCity("");
            },
            onError: (err) =>
                toast.error(err.response?.data?.message || "Something went wrong"),
        });
    };

    return (
        <section className="bg-transparent py-10">
            <div className="max-w-3xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-2" style={{ color: brandDark }}>
                        Contact
                    </h2>
                    <p className="text-gray-500 font-medium italic">
                        Fill the contact form & submit.
                    </p>
                </div>

                {/* Form Container */}
                <form className="space-y-6" onSubmit={handleSubmit}>

                    {/* Full Name Field */}
                    <div className="space-y-2">
                        <label className="font-bold text-sm block" style={{ color: brandDark }}>
                            Full Name *
                        </label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Your Name"
                            className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl"
                        />

                    </div>

                    {/* Contact Number Field */}
                    <div className="space-y-2">
                        <label className="font-bold text-sm block" style={{ color: brandDark }}>
                            Contact Number *
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            maxLength={10}
                            value={formData.phone}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    phone: e.target.value.replace(/\D/g, ""),
                                })
                            }
                            required
                            placeholder="Your Contact Number"
                            className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl"
                        />

                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                        <label className="font-bold text-sm block" style={{ color: brandDark }}>
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your Email"
                            className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl"
                        />

                    </div>


                    {/* State Field */}
                    <div className="space-y-2">
                        <label className="font-bold text-sm block" style={{ color: brandDark }}>
                            State *
                        </label>
                        <select
                            required
                            value={selectedState}
                            onChange={(e) => {
                                setSelectedState(e.target.value);
                                setSelectedCity(""); // reset city
                            }}
                            className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 transition-all"
                        >
                            <option value="">Select State</option>
                            {states.map((state) => (
                                <option key={state.name} value={state.name}>
                                    {state.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* City Field */}
                    <div className="space-y-2">
                        <label className="font-bold text-sm block" style={{ color: brandDark }}>
                            City *
                        </label>
                        <select
                            required
                            disabled={!selectedState}
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                            className={`w-full px-5 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 transition-all ${!selectedState ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                        >
                            <option value="">
                                {selectedState ? "Select City" : "Select state first"}
                            </option>
                            {cities.map((city) => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </div>



                    {/* Message Field */}
                    <div className="space-y-2">
                        <label className="font-bold text-sm block" style={{ color: brandDark }}>
                            Message *
                        </label>
                        <textarea
                            required
                            name="message"
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Enter Your Message"
                            className="w-full px-5 py-4 bg-white border border-gray-100 rounded-xl resize-none"
                        />

                    </div>

                    {/* Submit Button: Teal changed to Brand Purple */}
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full text-white py-4 rounded-xl font-bold text-lg"
                    >
                        {isLoading ? "Submitting..." : "Submit"}
                    </Button>

                </form>
            </div>
        </section>
    );
};

export default ContactForm;