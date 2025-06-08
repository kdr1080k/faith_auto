import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";

const LOCATIONS = ["Brisbane", "Sydney", "Melbourne", "Adelaide", "Perth"];
const BODY_TYPES = ["All", "SUV", "Sedan", "Hatchback", "Wagon", "Ute", "Van", "Coupe"];
const FUEL_TYPES = ["All", "Petrol", "Diesel", "Hybrid"];
const SEATS = ["All", "2", "4", "5", "6", "7+"];

const CarSearchForm = () => {
  const [location, setLocation] = useState(LOCATIONS[0]);
  const [bodyType, setBodyType] = useState("All");
  const [fuelType, setFuelType] = useState("All");
  const [seats, setSeats] = useState("All");
  const [isVisible, setIsVisible] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [, navigate] = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => {
      if (formRef.current) {
        observer.unobserve(formRef.current);
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      location,
      bodyType,
      fuelType,
      seats,
    });
    navigate(`/subscription-inventory?${params.toString()}`);
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={`w-full max-w-6xl mx-auto translate-y-1/2 rounded-xl shadow-lg bg-[#23292B]/90 backdrop-blur flex flex-col md:flex-row items-center px-4 py-6 gap-4 md:gap-0 relative z-10 transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 translate-y-1/2' : 'opacity-0 translate-y-[60%]'
      }`}
    >
      {/* Location */}
      <div className={`flex-1 flex flex-col min-w-[120px] transition-all duration-1000 delay-100 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <label className="text-xs text-[#90A4AE] mb-1 font-medium">LOCATION</label>
        <select
          className="bg-transparent text-white font-semibold py-1 focus:outline-none"
          value={location}
          onChange={e => setLocation(e.target.value)}
        >
          {LOCATIONS.map((loc) => (
            <option key={loc} value={loc} className="text-black">{loc}</option>
          ))}
        </select>
      </div>
      <div className="hidden md:block w-px h-8 bg-[#37474F] mx-4" />
      {/* Body Type */}
      <div className={`flex-1 flex flex-col min-w-[120px] transition-all duration-1000 delay-200 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <label className="text-xs text-[#90A4AE] mb-1 font-medium">BODY TYPE</label>
        <select
          className="bg-transparent text-white font-semibold py-1 focus:outline-none"
          value={bodyType}
          onChange={e => setBodyType(e.target.value)}
        >
          {BODY_TYPES.map((type) => (
            <option key={type} value={type} className="text-black">{type}</option>
          ))}
        </select>
      </div>
      <div className="hidden md:block w-px h-8 bg-[#37474F] mx-4" />
      {/* Fuel Type */}
      <div className={`flex-1 flex flex-col min-w-[120px] transition-all duration-1000 delay-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <label className="text-xs text-[#90A4AE] mb-1 font-medium">FUEL TYPE</label>
        <select
          className="bg-transparent text-white font-semibold py-1 focus:outline-none"
          value={fuelType}
          onChange={e => setFuelType(e.target.value)}
        >
          {FUEL_TYPES.map((type) => (
            <option key={type} value={type} className="text-black">{type}</option>
          ))}
        </select>
      </div>
      <div className="hidden md:block w-px h-8 bg-[#37474F] mx-4" />
      {/* Seats */}
      <div className={`flex-1 flex flex-col min-w-[80px] transition-all duration-1000 delay-400 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <label className="text-xs text-[#90A4AE] mb-1 font-medium">SEATS</label>
        <select
          className="bg-transparent text-white font-semibold py-1 focus:outline-none"
          value={seats}
          onChange={e => setSeats(e.target.value)}
        >
          {SEATS.map((seat) => (
            <option key={seat} value={seat} className="text-black">{seat}</option>
          ))}
        </select>
      </div>
      {/* Button */}
      <button
        type="submit"
        className={`ml-0 md:ml-8 mt-4 md:mt-0 flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-bold px-8 py-3 rounded-xl shadow transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        Find My Car
        <span className="inline-block transform translate-x-1">→</span>
      </button>
    </form>
  );
};

export default CarSearchForm; 