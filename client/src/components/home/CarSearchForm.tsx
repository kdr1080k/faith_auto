import React, { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Car } from "@shared/schema";
import CarCard from "@/components/cars/CarCard";

const LOCATIONS = ["All", "Brisbane", "Sydney", "Melbourne", "Adelaide", "Perth"];
const BODY_TYPES = ["All", "SUV", "Sedan", "Hatchback", "Wagon", "Ute", "Van", "Coupe"];
const FUEL_TYPES = ["All", "Petrol", "Diesel", "Hybrid", "Electric"];
const SEATS = ["All", "2", "4", "5", "6", "7+"];

interface CarSearchFormProps {
  buttonText?: string;
  onFilterChange?: (filters: {
    location: string;
    bodyType: string;
    fuelType: string;
    seats: string;
  }) => void;
  initialLocation?: string;
}

const CarSearchForm: React.FC<CarSearchFormProps> = ({ 
  buttonText = "Find My Car", 
  onFilterChange,
  initialLocation = LOCATIONS[0]
}) => {
  const [location, setLocation] = useState(initialLocation);
  const [bodyType, setBodyType] = useState("All");
  const [fuelType, setFuelType] = useState("All");
  const [seats, setSeats] = useState("All");

  // Notify parent component when filters change
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange({
        location,
        bodyType,
        fuelType,
        seats
      });
    }
  }, [location, bodyType, fuelType, seats, onFilterChange]);
  const [isVisible, setIsVisible] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Fetch all cars
  const { data: cars = [], isLoading } = useQuery<Car[]>({
    queryKey: ['/api/cars'],
    queryFn: async () => {
      const response = await fetch('/api/cars');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }
  });

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
    setShowResults(true);
  };

  // Filter cars based on selected criteria
  const filteredCars = cars.filter(car => {
    if (car.location !== location) return false;
    if (bodyType !== "All" && car.bodyType !== bodyType) return false;
    if (fuelType !== "All" && car.fuelType !== fuelType) return false;
    if (seats !== "All" && car.seats.toString() !== seats) return false;
    return true;
  });

  return (
    <>
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

      </form>

      {/* Results Section */}
      {showResults && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32 mb-16">
          <h2 className="text-2xl font-bold mb-8">Available Cars</h2>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-lg h-64 animate-pulse"></div>
              ))}
            </div>
          ) : filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredCars.map(car => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900">No cars found</h3>
              <p className="mt-2 text-sm text-gray-500">Try adjusting your filters to see more results.</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CarSearchForm; 