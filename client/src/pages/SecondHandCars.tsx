import React, { useState, useRef, useEffect } from 'react';
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
  
  // Animation state
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  // Group filtered cars into rows of 3 for animation
  const rows = filteredCars.reduce((acc, car, index) => {
    const rowIndex = Math.floor(index / 3);
    if (!acc[rowIndex]) {
      acc[rowIndex] = [];
    }
    acc[rowIndex].push(car);
    return acc;
  }, [] as typeof filteredCars[]);

  return (
    <>
      <Helmet>
        <title>Second Hand Cars | Faith Auto</title>
        <meta name="description" content="Browse our selection of quality second-hand cars. Each vehicle is thoroughly inspected and comes with a warranty." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-32 bg-cover bg-center bg-no-repeat">
        {/* Black gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/55 to-black/55"
          style={{
            backgroundImage: `url('/pexels-bertellifotografia-13872477.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>

        {/* Content container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="pt-24">
            <h1 className="tex3t-4xl md:text-5xl font-bold text-white mb-4">
              Quality Used Cars
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto">
              Browse our selection of thoroughly inspected second-hand vehicles.
              All cars come with warranty and our quality guarantee.
            </p>
          </div>
        </div>
      </section>



      <main className="min-h-screen bg-background">
        {/* Filter Section */}
        <section className="relative py-16 bg-cover bg-center bg-no-repeat">
       
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

                 {/* Car Listings */}
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
               <h2 className="text-3xl font-bold mb-4 text-gray-800">Available Used Cars</h2>
               <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                 {filteredCars.length} quality vehicles found. All thoroughly inspected with warranty included.
               </p>
             </div>

             {filteredCars.length > 0 ? (
               <div className="space-y-8">
                 {rows.map((row, rowIndex) => (
                   <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                     {row.map((car, carIndex) => (
                       <CarCard 
                         key={car.id} 
                         car={car} 
                         isSubscription={false}
                         size="default"
                         isVisible={isInView}
                         animationDelay={rowIndex * 400}
                       />
                     ))}
                   </div>
                 ))}
               </div>
             ) : (
               <div className="text-center py-12">
                 <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 max-w-md mx-auto">
                   <p className="text-gray-600 mb-4">No cars match your selected filters.</p>
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
      </main>
    </>
  );
};

export default SecondHandCars; 