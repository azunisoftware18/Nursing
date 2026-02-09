import React, { useState } from "react";
import Button from "./Button"; // Reusable button import karein
import { useNavigate } from "react-router-dom";
import { useIndiaCities, useIndiaStates } from "../../hooks/useIndia";
import { Search } from "lucide-react";

function SearchCollegeCard() {
  const brandColor = "#6739b7";

  const navigate = useNavigate();

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const { data: statesRes } = useIndiaStates();
  const { data: citiesRes } = useIndiaCities(selectedState);

  const states = statesRes?.data || [];
  const cities = citiesRes?.data || [];

  const handleSearch = () => {
    if (!selectedState) return;

    const params = new URLSearchParams();

    params.append("state", selectedState);
    if (selectedCity) params.append("city", selectedCity);

    navigate(
      `/colleges?state=${selectedState || ""}&city=${selectedCity || ""}`
    );
  };


  return (
    <div className="flex justify-center items-center p-4 bg-gray-50 min-h-[400px]">
      <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 w-full max-w-lg">
        {/* Card Title */}
        <h2 className="text-2xl font-bold text-center text-[#1a237e] mb-8">
          Search Nursing College
        </h2>

        {/* Form Inputs */}
        <div className="space-y-4">
          <div className="relative">
            <select
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedCity(""); // 🔥 state change = city reset
              }}
              className="w-full p-4 bg-white border border-gray-200 rounded-lg"
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.name} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>

            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">

            </div>
          </div>

          <div className="relative">
            <select
              value={selectedCity}
              disabled={!selectedState}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full p-4 bg-white border border-gray-200 rounded-lg"
            >
              <option value="">
                {!selectedState ? "Select State First" : "Select City"}
              </option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">

            </div>
          </div>

          {/* Search Button using Reusable Component */}
          <Button
            className="w-full py-4 rounded-xl text-lg mt-2"
            onClick={handleSearch}>
            <Search />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SearchCollegeCard;
