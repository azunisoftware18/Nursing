import React, { useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useIndiaCities, useIndiaStates } from "../../hooks/useIndia";
import { Search } from "lucide-react";

function SearchCollegeCard() {
  const navigate = useNavigate();

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const { data: statesRes } = useIndiaStates();
  const { data: citiesRes } = useIndiaCities(selectedState);

  const states = statesRes?.data || [];
  const cities = citiesRes?.data || [];

  const handleSearch = () => {
    console.log();
    if (!selectedState) return;

    const params = new URLSearchParams();

    params.append("state", selectedState);
    if (selectedCity) params.append("city", selectedCity);

    navigate(
      `/colleges?state=${selectedState || ""}&city=${selectedCity || ""}`,
    );
  };

  return (
    <div className="flex justify-center items-center p-4 bg-gray-50 min-h-[400px]">
      <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-[#11B1CC] mb-8">
          Search Nursing College
        </h2>

        <div className="space-y-4">
          {/* State */}
          <select
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value);
              setSelectedCity("");
            }}
            className="w-full p-4 bg-white border border-gray-200 rounded-lg"
          >
            <option value="">Select State</option>

            {states.map((state) => (
              <option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </option>
            ))}
          </select>

          {/* City */}
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
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>

          <Button
            className="w-full py-4 rounded-xl text-lg mt-2"
            onClick={handleSearch}
          >
            <Search />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SearchCollegeCard;
