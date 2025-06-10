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
    // Add professional CSS animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fade-up {
        from {
          opacity: 0;
          transform: translate3d(0, 40px, 0);
        }
        to {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
      }

      @keyframes fade-right {
        from {
          opacity: 0;
          transform: translate3d(-50px, 0, 0);
        }
        to {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
      }

      .animate-fade-up {
        opacity: 0;
        transform: translate3d(0, 40px, 0);
        will-change: opacity, transform;
        backface-visibility: hidden;
      }

      .animate-fade-right {
        opacity: 0;
        transform: translate3d(-50px, 0, 0);
        will-change: opacity, transform;
        backface-visibility: hidden;
      }

      .animate-fade-up.animate-in {
        animation: fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }

      .animate-fade-right.animate-in {
        animation: fade-right 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }

      .animate-fade-up.animate-in,
      .animate-fade-right.animate-in {
        will-change: auto;
      }
    `;
    document.head.appendChild(style);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.2
      }
    );

    // Animation observer
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          // Clean up performance properties after animation
          setTimeout(() => {
            (entry.target as HTMLElement).style.willChange = 'auto';
          }, 1000);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '-50px'
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.animate-fade-up, .animate-fade-right');
    animatedElements.forEach(element => animationObserver.observe(element));

    return () => {
      observer.disconnect();
      animationObserver.disconnect();
      document.head.removeChild(style);
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
      <section className="relative h-[600px] bg-cover bg-center bg-no-repeat flex items-center" style={{
        backgroundImage: `
          linear-gradient(to bottom, 
            rgba(0, 0, 0, 0.55), 
            rgba(0, 0, 0, 0.55)
          ),
          url('/pexels-bertellifotografia-13872477.jpg')
        `
      }}>

        {/* Content container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="pt-24">
            <h1 className="animate-fade-up tex3t-4xl md:text-5xl font-bold text-white mb-4" style={{ animationDelay: '200ms' }}>
              Quality Used Cars
            </h1>
            <p className="animate-fade-right text-xl text-white max-w-3xl mx-auto" style={{ animationDelay: '400ms' }}>
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
            <form className="animate-fade-up w-full max-w-6xl mx-auto translate-y-1/2 rounded-xl shadow-lg bg-[#23292B]/90 backdrop-blur flex flex-col md:flex-row items-center px-4 py-6 gap-4 md:gap-0 relative z-10" style={{ animationDelay: '300ms' }}>
              {/* Location */}
              <div className="flex-1 flex flex-col min-w-[120px]">
                <label className="text-xs text-[#90A4AE] mb-1 font-medium">LOCATION</label>
                <select
                  className="bg-transparent text-white font-semibold py-1 focus:outline-none"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  {LOCATIONS.map((loc) => (
                    <option key={loc} value={loc} className="bg-[#23292B] text-white">
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-12 bg-[#90A4AE]/30 mx-4"></div>

              {/* Body Type */}
              <div className="flex-1 flex flex-col min-w-[120px]">
                <label className="text-xs text-[#90A4AE] mb-1 font-medium">BODY TYPE</label>
                <select
                  className="bg-transparent text-white font-semibold py-1 focus:outline-none"
                  value={bodyType}
                  onChange={(e) => setBodyType(e.target.value)}
                >
                  {BODY_TYPES.map((type) => (
                    <option key={type} value={type} className="bg-[#23292B] text-white">
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-12 bg-[#90A4AE]/30 mx-4"></div>

              {/* Fuel Type */}
              <div className="flex-1 flex flex-col min-w-[120px]">
                <label className="text-xs text-[#90A4AE] mb-1 font-medium">FUEL TYPE</label>
                <select
                  className="bg-transparent text-white font-semibold py-1 focus:outline-none"
                  value={fuelType}
                  onChange={(e) => setFuelType(e.target.value)}
                >
                  {FUEL_TYPES.map((fuel) => (
                    <option key={fuel} value={fuel} className="bg-[#23292B] text-white">
                      {fuel}
                    </option>
                  ))}
                </select>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-12 bg-[#90A4AE]/30 mx-4"></div>

              {/* Seats */}
              <div className="flex-1 flex flex-col min-w-[120px]">
                <label className="text-xs text-[#90A4AE] mb-1 font-medium">SEATS</label>
                <select
                  className="bg-transparent text-white font-semibold py-1 focus:outline-none"
                  value={seats}
                  onChange={(e) => setSeats(e.target.value)}
                >
                  {SEATS.map((seatCount) => (
                    <option key={seatCount} value={seatCount} className="bg-[#23292B] text-white">
                      {seatCount}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          </div>
        </section>

        {/* Cars Grid Section */}
        <section ref={sectionRef} className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="animate-fade-up text-3xl font-bold text-gray-900 mb-4" style={{ animationDelay: '200ms' }}>
                Available Vehicles ({filteredCars.length})
              </h2>
              <p className="animate-fade-right text-lg text-gray-600" style={{ animationDelay: '300ms' }}>
                Find your perfect second-hand vehicle from our quality assured collection
              </p>
            </div>

            {filteredCars.length === 0 ? (
              <div className="animate-fade-up text-center py-16" style={{ animationDelay: '400ms' }}>
                <div className="text-gray-500">
                  <i className="fas fa-car text-6xl mb-4"></i>
                  <h3 className="text-2xl font-semibold mb-2">No Vehicles Found</h3>
                  <p>Try adjusting your filters to see more vehicles.</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCars.map((car, index) => (
                  <div 
                    key={car.id} 
                    className="animate-fade-up"
                    style={{ animationDelay: `${400 + (index * 100)}ms` }}
                  >
                    <CarCard car={car} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Why Choose Our Second Hand Cars Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="animate-fade-up text-3xl font-bold text-gray-900 mb-6" style={{ animationDelay: '200ms' }}>
                Why Choose Our Second Hand Cars?
              </h2>
              <p className="animate-fade-right text-xl text-gray-600 max-w-3xl mx-auto" style={{ animationDelay: '300ms' }}>
                Every vehicle in our collection undergoes rigorous inspection and comes with our quality guarantee
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="animate-fade-up text-center p-6" style={{ animationDelay: '400ms' }}>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-search text-primary text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">Thorough Inspection</h3>
                <p className="animate-fade-right text-gray-600" style={{ animationDelay: '500ms' }}>
                  100-point quality check ensures every vehicle meets our high standards
                </p>
              </div>

              <div className="animate-fade-up text-center p-6" style={{ animationDelay: '500ms' }}>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-shield-alt text-primary text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">Warranty Included</h3>
                <p className="animate-fade-right text-gray-600" style={{ animationDelay: '600ms' }}>
                  All vehicles come with comprehensive warranty for peace of mind
                </p>
              </div>

              <div className="animate-fade-up text-center p-6" style={{ animationDelay: '600ms' }}>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-history text-primary text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">Clear History</h3>
                <p className="animate-fade-right text-gray-600" style={{ animationDelay: '700ms' }}>
                  Complete vehicle history reports with transparent documentation
                </p>
              </div>

              <div className="animate-fade-up text-center p-6" style={{ animationDelay: '700ms' }}>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-dollar-sign text-primary text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">Fair Pricing</h3>
                <p className="animate-fade-right text-gray-600" style={{ animationDelay: '800ms' }}>
                  Competitive market pricing with flexible financing options
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default SecondHandCars; 