import { useEffect, useRef, useState } from 'react';
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Car } from "@shared/schema";
import styles from './ComparisonSection.module.css';

interface ComparisonSectionProps {
  filters?: {
    location: string;
    bodyType: string;
    fuelType: string;
    seats: string;
  };
  category?: 'subscription' | 'secondhand' | 'all';
}

const ComparisonSection: React.FC<ComparisonSectionProps> = ({ filters, category = 'all' }) => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Fetch cars from database based on category
  const { data: cars = [], isLoading } = useQuery<Car[]>({
    queryKey: ['/api/cars', category, filters?.location, filters?.bodyType, filters?.fuelType, filters?.seats],
    queryFn: async () => {
      const url = category === 'all' ? '/api/cars' : `/api/cars?category=${category}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    staleTime: 30000, // Consider data stale after 30 seconds
    gcTime: 60000, // Keep in cache for 1 minute (replaces cacheTime in v5)
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnMount: true // Always refetch when component mounts
  });

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

  // Filter cars based on props - ensure cars is an array
  const filteredCars = Array.isArray(cars) ? cars.filter((car: Car) => {
    if (!filters) return true;
    
    if (filters.location !== "All" && car.location !== filters.location) return false;
    if (filters.bodyType !== "All" && car.bodyType !== filters.bodyType) return false;
    if (filters.fuelType !== "All" && car.fuelType !== filters.fuelType) return false;
    if (filters.seats !== "All") {
      if (filters.seats === "7+") {
        if (car.seats < 7) return false;
      } else {
        if (car.seats.toString() !== filters.seats) return false;
      }
    }
    
    return true;
  }) : [];

  // Group filtered cars into rows of 3
  const rows = filteredCars.reduce((acc: Car[][], car: Car, index: number) => {
    const rowIndex = Math.floor(index / 3);
    if (!acc[rowIndex]) {
      acc[rowIndex] = [];
    }
    acc[rowIndex].push(car);
    return acc;
  }, [] as Car[][]);

  return (
    <section 
      ref={sectionRef}
      className="relative pt-32 pb-32 bg-cover bg-center bg-no-repeat"
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
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            {category === 'subscription' ? 'Our Subscription Vehicles' : 
             category === 'secondhand' ? 'Car Listings' : 
             'Faith Auto Vehicle Collection'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {isLoading ? 'Loading...' : `${filteredCars.length} vehicles available`}. 
            {category === 'subscription' ? 'All-inclusive weekly pricing with no hidden fees.' :
             category === 'secondhand' ? 'Quality assured vehicles with warranty.' :
             'Subscription and Car Listings vehicles with competitive weekly pricing.'}
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
                  <div 
                    key={car.id}
                    className={`bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-gray-100 ${styles.card} ${
                      isInView ? styles.visible : ''
                    }`}
                    style={{ '--delay': `${rowIndex * 400}ms` } as React.CSSProperties}
                  >
                                            <Link href={car.category === 'subscription' ? `/subscription-car/example?carId=${car.dbId || car.id}` : `/car/detail?carId=${car.dbId || (car.id.includes('secondhand-') ? car.id.replace('secondhand-', '') : car.id)}`}>
                      <div className="relative h-40 overflow-hidden">
                        <img 
                          src={car.image || "/pexels-prime-cinematics-1005175-2036544.jpg"} 
                          alt={car.make}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <i className="fas fa-car text-primary text-xl"></i>
                            <h3 className="text-xl font-semibold text-gray-800">{car.model}</h3>
                          </div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            car.category === 'subscription' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {car.category === 'subscription' ? 'Subscription' : 'Car Listings'}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">{car.bodyType || car.category}</p>
                        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                          <span>{car.year}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-primary font-semibold">
                            {car.category === 'secondhand' && (car as any).actualPrice ? (
                              // For second-hand cars, show the actual selling price
                              `$${((car as any).actualPrice).toLocaleString()}`
                            ) : car.category === 'subscription' && (car as any).subscriptionPlans?.threeMonth ? (
                              // For subscription cars with subscription plans, show the 3-month total price
                              `$${((car as any).subscriptionPlans.threeMonth).toLocaleString()}/per week`
                            ) : (
                              // Fallback to weekly price calculation
                              `$${Math.round(car.weeklyPrice).toLocaleString()}/week`
                            )}
                            {car.isGreatValue && (
                              <span className="ml-2 text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                                Great Value!
                              </span>
                            )}
                          </div>
                          <div className={`text-sm font-medium ${car.available ? 'text-green-600' : 'text-red-600'}`}>
                            {car.status ? car.status.charAt(0).toUpperCase() + car.status.slice(1) : (car.available ? 'Available' : 'Not Available')}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 max-w-md mx-auto">
              <p className="text-gray-600 mb-4">No vehicles match your selected filters.</p>
              <p className="text-sm text-gray-500">Try adjusting your filter criteria to see more vehicles.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ComparisonSection;
