import React, { useState, useRef, useEffect } from 'react';
import { Car } from "@shared/schema";
import CarCard from "@/components/cars/CarCard";
import { useQuery } from "@tanstack/react-query";

const SubscriptionCarsSection = () => {
  // Filter states
  const [location, setLocation] = useState("All");
  const [bodyType, setBodyType] = useState("All");
  const [fuelType, setFuelType] = useState("All");
  const [seats, setSeats] = useState("All");
  
  // Animation state
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const LOCATIONS = ["All", "Brisbane", "Sydney", "Melbourne", "Adelaide", "Perth"];
  const BODY_TYPES = ["All", "SUV", "Sedan", "Hatchback", "Wagon", "Ute", "Van", "Coupe"];
  const FUEL_TYPES = ["All", "Petrol", "Diesel", "Hybrid", "Electric"];
  const SEATS = ["All", "2", "4", "5", "6", "7+"];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.2
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Fetch subscription cars from Faith Auto database
  const { data: allCars = [], isLoading } = useQuery<Car[]>({
    queryKey: ['/api/cars', 'subscription', location, bodyType, fuelType, seats],
    queryFn: async () => {
      const response = await fetch('/api/cars?category=subscription');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    staleTime: 30000, // Consider data stale after 30 seconds
    gcTime: 60000, // Keep in cache for 1 minute
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnMount: true // Always refetch when component mounts
  });

  // Filter cars based on selected criteria
  const filteredCars = allCars.filter((car: Car) => {
    if (location !== "All" && car.location !== location) return false;
    if (bodyType !== "All" && car.bodyType !== bodyType) return false;
    if (fuelType !== "All" && car.fuelType !== fuelType) return false;
    if (seats !== "All") {
      if (seats === "7+") {
        if (car.seats < 7) return false;
      } else {
        if (car.seats.toString() !== seats) return false;
      }
    }
    return true;
  });

  // Group filtered cars into rows of 3 for animation
  const rows = filteredCars.reduce((acc: Car[][], car: Car, index: number) => {
    const rowIndex = Math.floor(index / 3);
    if (!acc[rowIndex]) {
      acc[rowIndex] = [];
    }
    acc[rowIndex].push(car);
    return acc;
  }, [] as Car[][]);

  return (
    <>
      {/* Filter Section */}
      <section className="relative py-16 bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/95 to-gray-900/85" style={{ 
          backgroundImage: `url('/pexels-bertellifotografia-13872477.jpg')`
        }}></div>
        <div className="relative z-10">
          <form className="w-full max-w-6xl mx-auto translate-y-1/2 rounded-xl shadow-lg bg-[#23292B]/90 backdrop-blur flex flex-col md:flex-row items-center px-4 py-6 gap-4 md:gap-0 relative z-10">
            {/* Location */}
            <div className="flex-1 flex flex-col min-w-[120px]">
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
            <div className="flex-1 flex flex-col min-w-[120px]">
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
            <div className="flex-1 flex flex-col min-w-[120px]">
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
            <div className="flex-1 flex flex-col min-w-[80px]">
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
        </div>
      </section>

      {/* Subscription Cars Listings */}
      <section 
        ref={sectionRef}
        className="relative py-32 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `
            linear-gradient(to bottom, 
              rgba(249, 250, 251, 0.9), 
              rgba(243, 244, 246, 0.9)
            ),
            url('/pexels-bertellifotografia-13872477.jpg')
          `
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Subscription Vehicles</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {isLoading ? 'Loading...' : `${filteredCars.length} subscription vehicles available`}. All-inclusive weekly pricing with no hidden fees.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-lg h-64 animate-pulse"></div>
              ))}
            </div>
          ) : filteredCars.length > 0 ? (
            <div className="space-y-8">
              {rows.map((row: Car[], rowIndex: number) => (
                <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {row.map((car: Car) => (
                    <CarCard 
                      key={car.id} 
                      car={car} 
                      isSubscription={true}
                      size="default"
                      isVisible={isInView}
                      animationDelay={rowIndex * 400}
                      customLink={`/subscription-car/example?carId=${car.dbId || car.id}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 max-w-md mx-auto">
                <p className="text-gray-600 mb-4">No subscription cars match your selected filters.</p>
                <button
                  onClick={() => {
                    setLocation("All");
                    setBodyType("All");
                    setFuelType("All");
                    setSeats("All");
                  }}
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/80 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SubscriptionCarsSection; 