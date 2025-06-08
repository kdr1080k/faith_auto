import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Car } from "@shared/schema";
import CarCard from "@/components/cars/CarCard";
import { fuelTypes } from "@/lib/utils";

const SubscriptionCars = () => {
  const [selectedFuelType, setSelectedFuelType] = useState("ALL");
  
  const { data: cars, isLoading } = useQuery<Car[]>({
    queryKey: ['/api/cars'],
  });

  const filteredCars = Array.isArray(cars)
    ? cars.filter(car => 
        selectedFuelType === "ALL" || car.fuelType.toUpperCase() === selectedFuelType
      )
    : [];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Our subscription cars</h2>
          <Link href="/subscription-inventory" className="text-primary hover:text-accent flex items-center font-medium">
            View all vehicles
            <i className="fas fa-arrow-right ml-1 text-xs"></i>
          </Link>
        </div>
        
        {/* Filter tabs */}
        <div className="flex flex-wrap border-b border-gray-200 mb-8">
          {fuelTypes.map(fuelType => (
            <button
              key={fuelType}
              className={`px-4 py-2 text-sm font-medium ${
                selectedFuelType === fuelType 
                  ? "text-primary border-b-2 border-primary" 
                  : "text-gray-500 hover:text-primary"
              }`}
              onClick={() => setSelectedFuelType(fuelType)}
            >
              {fuelType}
            </button>
          ))}
        </div>
        
        {/* Car Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-gray-50 rounded-lg h-48 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars?.slice(0, 6).map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SubscriptionCars;
