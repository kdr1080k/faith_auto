import React, { useState } from 'react';
import { Helmet } from "react-helmet-async";
import { Car } from "@shared/schema";
import CarCard from "@/components/cars/CarCard";

const LOCATIONS = ["All", "Brisbane", "Sydney", "Melbourne", "Adelaide", "Perth"];
const BODY_TYPES = ["All", "SUV", "Sedan", "Hatchback", "Wagon", "Ute", "Van", "Coupe"];
const FUEL_TYPES = ["All", "Petrol", "Diesel", "Hybrid", "Electric"];
const SEATS = ["All", "2", "4", "5", "6", "7+"];

const SecondHandCars: React.FC = () => {
  // Filter states
  const [location, setLocation] = useState("All");
  const [bodyType, setBodyType] = useState("All");
  const [fuelType, setFuelType] = useState("All");
  const [seats, setSeats] = useState("All");
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  // Hardcoded car listings
  const hardcodedCars: Car[] = [
    {
      id: "smart-1",
      make: "Smart",
      model: "#1",
      weeklyPrice: 30056,
      available: true,
      isGreatValue: true,
      fuelType: "Electric",
      bodyType: "SUV",
      seats: 5,
      year: 2023,
      driveType: "AWD",
      category: "Electric SUV",
      location: "Brisbane"
    },
    {
      id: "smart-3",
      make: "Smart",
      model: "#3",
      weeklyPrice: 31096,
      available: true,
      isGreatValue: false,
      fuelType: "Electric",
      bodyType: "SUV",
      seats: 5,
      year: 2023,
      driveType: "AWD",
      category: "Electric SUV",
      location: "Melbourne"
    },
    {
      id: "hyundai-venue",
      make: "Hyundai",
      model: "Venue",
      weeklyPrice: 23920,
      available: true,
      isGreatValue: true,
      fuelType: "Petrol",
      bodyType: "SUV",
      seats: 5,
      year: 2023,
      driveType: "FWD",
      category: "Compact SUV",
      location: "Brisbane"
    },
    {
      id: "nissan-xtrail",
      make: "Nissan",
      model: "X-Trail",
      weeklyPrice: 27040,
      available: true,
      isGreatValue: false,
      fuelType: "Petrol",
      bodyType: "SUV",
      seats: 7,
      year: 2023,
      driveType: "AWD",
      category: "Family SUV",
      location: "Brisbane"
    },
    {
      id: "toyota-yaris",
      make: "Toyota",
      model: "Yaris Cross Hybrid",
      weeklyPrice: 29016,
      available: true,
      isGreatValue: false,
      fuelType: "Hybrid",
      bodyType: "SUV",
      seats: 5,
      year: 2023,
      driveType: "AWD",
      category: "Hybrid SUV",
      location: "Brisbane"
    },
    {
      id: "suzuki-swift",
      make: "Suzuki",
      model: "Swift",
      weeklyPrice: 29120,
      available: true,
      isGreatValue: false,
      fuelType: "Petrol",
      bodyType: "Hatchback",
      seats: 5,
      year: 2023,
      driveType: "FWD",
      category: "Compact",
      location: "Brisbane"
    }
  ];

  // Filter cars based on selected criteria
  const filteredCars = hardcodedCars.filter(car => {
    if (location !== "All" && car.location !== location) return false;
    if (bodyType !== "All" && car.bodyType !== bodyType) return false;
    if (fuelType !== "All" && car.fuelType !== fuelType) return false;
    if (seats !== "All" && car.seats !== parseInt(seats)) return false;
    return true;
  });

  return (
    <>
      <Helmet>
        <title>Second Hand Cars | Faith Auto</title>
        <meta name="description" content="Browse our selection of quality second-hand cars. Each vehicle is thoroughly inspected and comes with a warranty." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-24 bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/95 to-gray-900/85" style={{ 
          backgroundImage: `url('/pexels-bertellifotografia-13872477.jpg')`
        }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Quality Used Cars
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Browse our selection of thoroughly inspected second-hand vehicles. 
            All cars come with warranty and our quality guarantee.
          </p>
        </div>
      </section>

      <main className="min-h-screen bg-background">
        {/* Filter Section */}
        <div className="bg-gray-100 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Filter Cars</h2>
              <button
                onClick={() => setIsFilterVisible(!isFilterVisible)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <i className={`fas fa-chevron-${isFilterVisible ? 'up' : 'down'}`}></i>
                {isFilterVisible ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>
            
            {isFilterVisible && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-6 rounded-xl shadow-sm">
                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    {LOCATIONS.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                {/* Body Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Body Type</label>
                  <select
                    value={bodyType}
                    onChange={(e) => setBodyType(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    {BODY_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Fuel Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
                  <select
                    value={fuelType}
                    onChange={(e) => setFuelType(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    {FUEL_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Seats */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Seats</label>
                  <select
                    value={seats}
                    onChange={(e) => setSeats(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    {SEATS.map(seat => (
                      <option key={seat} value={seat}>{seat}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Car Listings */}
        <section className="py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Available Vehicles</h2>
              <p className="text-gray-600">{filteredCars.length} cars found</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map(car => (
                <CarCard 
                  key={car.id} 
                  car={car} 
                  isSubscription={false}
                  size="default"
                />
              ))}
            </div>
            {filteredCars.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">No cars match your selected filters.</p>
                <button
                  onClick={() => {
                    setLocation("All");
                    setBodyType("All");
                    setFuelType("All");
                    setSeats("All");
                  }}
                  className="mt-4 text-primary hover:text-primary/80"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default SecondHandCars; 