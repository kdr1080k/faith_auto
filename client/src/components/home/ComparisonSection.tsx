import { useEffect, useRef, useState } from 'react';
import { Link } from "wouter";
import styles from './ComparisonSection.module.css';

interface ComparisonSectionProps {
  filters?: {
    location: string;
    bodyType: string;
    fuelType: string;
    seats: string;
  };
}

const ComparisonSection: React.FC<ComparisonSectionProps> = ({ filters }) => {
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

  const features = [
    {
      title: "Toyota",
      description: "RAV4",
      price: "$299/week",
      available: true,
      icon: "car",
      location: "Brisbane",
      bodyType: "SUV",
      fuelType: "Hybrid",
      seats: 5
    },
    {
      title: "BMW",
      description: "X5",
      price: "$899/week",
      available: true,
      icon: "car",
      location: "Melbourne",
      bodyType: "SUV",
      fuelType: "Petrol",
      seats: 7
    },
    {
      title: "Hyundai",
      description: "Tucson",
      price: "$459/week",
      available: false,
      icon: "car",
      location: "Sydney",
      bodyType: "SUV",
      fuelType: "Hybrid",
      seats: 5
    },
    {
      title: "Tesla",
      description: "Model 3",
      price: "$659/week",
      available: true,
      icon: "car",
      location: "Brisbane",
      bodyType: "Sedan",
      fuelType: "Electric",
      seats: 5
    },
    {
      title: "Mercedes-Benz",
      description: "GLE",
      price: "$929/week",
      available: false,
      icon: "car",
      location: "Melbourne",
      bodyType: "SUV",
      fuelType: "Hybrid",
      seats: 7
    },
    {
      title: "Volkswagen",
      description: "Tiguan",
      price: "$529/week",
      available: true,
      icon: "car",
      location: "Adelaide",
      bodyType: "SUV",
      fuelType: "Petrol",
      seats: 5
    },
    {
      title: "Audi",
      description: "Q7",
      price: "$999/week",
      available: true,
      icon: "car",
      location: "Perth",
      bodyType: "SUV",
      fuelType: "Hybrid",
      seats: 7
    },
    {
      title: "Mazda",
      description: "CX-5",
      price: "$489/week",
      available: true,
      icon: "car",
      location: "Brisbane",
      bodyType: "SUV",
      fuelType: "Petrol",
      seats: 5
    },
    {
      title: "Honda",
      description: "CR-V",
      price: "$469/week",
      available: false,
      icon: "car",
      location: "Sydney",
      bodyType: "SUV",
      fuelType: "Hybrid",
      seats: 5
    }
  ];

  // Filter features based on props
  const filteredFeatures = features.filter(feature => {
    if (!filters) return true;
    
    if (filters.location !== "All" && feature.location !== filters.location) return false;
    if (filters.bodyType !== "All" && feature.bodyType !== filters.bodyType) return false;
    if (filters.fuelType !== "All" && feature.fuelType !== filters.fuelType) return false;
    if (filters.seats !== "All" && feature.seats !== parseInt(filters.seats)) return false;
    
    return true;
  });

  // Group filtered features into rows of 3
  const rows = filteredFeatures.reduce((acc, feature, index) => {
    const rowIndex = Math.floor(index / 3);
    if (!acc[rowIndex]) {
      acc[rowIndex] = [];
    }
    acc[rowIndex].push(feature);
    return acc;
  }, [] as typeof filteredFeatures[]);

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
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Subscription Vehicles</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {filteredFeatures.length} subscription vehicles found. All-inclusive weekly pricing with no hidden fees.
          </p>
        </div>

        {filteredFeatures.length > 0 ? (
          <div className="space-y-8">
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {row.map((feature) => (
                  <div 
                    key={feature.title}
                    className={`bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-gray-100 ${styles.card} ${
                      isInView ? styles.visible : ''
                    }`}
                    style={{ '--delay': `${rowIndex * 400}ms` } as React.CSSProperties}
                  >
                    <Link href="/subscription-car/example">
                      <div className="relative h-40 overflow-hidden">
                        <img 
                          src="/pexels-prime-cinematics-1005175-2036544.jpg" 
                          alt={feature.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <i className={`fas fa-${feature.icon} text-primary text-xl`}></i>
                          <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
                        </div>
                        <p className="text-gray-600 mb-4">{feature.description}</p>
                        <div className="flex justify-between items-center">
                          <div className="text-primary font-semibold">{feature.price}</div>
                          <div className={`text-sm font-medium ${feature.available ? 'text-green-600' : 'text-red-600'}`}>
                            {feature.available ? 'Available' : 'Not Available'}
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
              <p className="text-gray-600 mb-4">No subscription cars match your selected filters.</p>
              <p className="text-sm text-gray-500">Try adjusting your filter criteria to see more vehicles.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ComparisonSection;
