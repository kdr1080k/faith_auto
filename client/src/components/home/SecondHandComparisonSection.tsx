import { useEffect, useRef, useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { Car } from "@shared/schema";
import { Link } from "wouter";
import CarCard from "@/components/cars/CarCard";
import styles from './ComparisonSection.module.css';

const StockListSection = () => {
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

  const { data: cars, isLoading } = useQuery<Car[]>({
    queryKey: ['/api/cars'],
    queryFn: async () => {
      const response = await fetch('http://localhost:5006/api/cars');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.cars;
    }
  });

  // Group cars into rows of 3
  const rows = cars ? cars.reduce((acc, car, index) => {
    const rowIndex = Math.floor(index / 3);
    if (!acc[rowIndex]) {
      acc[rowIndex] = [];
    }
    acc[rowIndex].push(car);
    return acc;
  }, [] as Car[][]) : [];

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
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Available Vehicles</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse our selection of quality vehicles. Each car is thoroughly inspected and comes with our quality guarantee.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-gray-100 h-64 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {row.map((car) => (
                  <div 
                    key={car.id}
                    className={`${styles.card} ${isInView ? styles.visible : ''}`}
                    style={{ '--delay': `${rowIndex * 400}ms` } as React.CSSProperties}
                  >
                    <CarCard 
                      car={car} 
                      isSubscription={false}
                      size="default"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default StockListSection; 