import React, { useState, useEffect } from 'react';

const StatsCard = ({ number, label, description }) => {
  const brandPurple = "#6739b7"; //
  const brandDark = "#1a237e"; //

  // State to hold the animated value
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    // Extracting only numbers from string (e.g., "35 K+" -> 35)
    const targetValue = parseInt(number.replace(/[^0-9]/g, ''));
    if (isNaN(targetValue)) return;

    let start = 0;
    const duration = 2000; // Animation duration in milliseconds (2 seconds)
    const increment = targetValue / (duration / 16); // 16ms approx for 60fps

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetValue) {
        setDisplayValue(targetValue);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [number]);

  // Formatting display: Adding suffix back (e.g., 35 -> 35 K+)
  const suffix = number.replace(/[0-9]/g, '').trim();

  return (
    <div className="flex flex-col items-center text-center group p-4">
      {/* Animated Stat Number */}
      <h2
        className="text-4xl md:text-5xl font-black mb-3"
        style={{ color: brandPurple }}
      >
        {displayValue} {suffix}
      </h2>

      {/* Stat Label */}
      <h3
        className="text-xl md:text-2xl font-extrabold mb-4"
        style={{ color: brandDark }}
      >
        {label}
      </h3>

      {/* Stat Description */}
      <p className="text-gray-500 text-sm md:text-xs leading-relaxed max-w-[220px]">
        {description}
      </p>

    </div>
  );
};

export default StatsCard;