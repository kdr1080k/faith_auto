import React from 'react';
import { Helmet } from "react-helmet-async";
import { Car } from "@shared/schema";
import CarCard from "@/components/cars/CarCard";

const SecondHandCars: React.FC = () => {
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
        {/* Featured Car Listings */}
        <section className="py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-6">Featured Vehicles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hardcodedCars.map(car => (
                <CarCard 
                  key={car.id} 
                  car={car} 
                  isSubscription={false}
                  size="default"
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default SecondHandCars; 