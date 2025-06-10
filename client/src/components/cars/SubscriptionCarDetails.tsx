import { useQuery } from "@tanstack/react-query";
import { Car as BaseCar } from "@shared/schema";
import { getCarImageUrl } from "@/lib/utils";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import { Car, FullCar } from "@/types/car";

interface SubscriptionCarDetailsProps {
  carId: string;
}

const SubscriptionCarDetails = ({ carId }: SubscriptionCarDetailsProps) => {
  // For the example page, we'll use hardcoded data
  const exampleCar: FullCar = {
    id: "example",
    make: "BMW",
    model: "X5 M Sport",
    year: 2024,
    category: "Luxury Performance SUV",
    bodyType: "SUV",
    driveType: "xDrive (AWD)",
    fuelType: "Diesel",
    seats: 5,
    weeklyPrice: 899,
    available: true,
    isGreatValue: true,
    location: "Brisbane",
    description: "Experience unparalleled luxury with the latest BMW X5 M Sport. This commanding SUV combines athletic performance with sophisticated elegance, featuring M Sport-specific design elements, advanced driver assistance systems, and BMW's latest iDrive technology.",
    highlights: [
      "M Sport Package",
      "21-inch M light alloy wheels",
      "Adaptive M Suspension",
      "BMW Live Cockpit Professional"
    ]
  };

  // Only fetch from API if it's not the example page
  const { data: car, isLoading } = useQuery<Car>({
    queryKey: [`/api/cars/${carId}`],
    enabled: carId !== "example"
  });

  const displayCar = carId === "example" ? exampleCar : car;

  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

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

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    // Animation observer - only observe static elements, not interactive ones
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animate-in')) {
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

    // Observe all elements with animation classes that don't already have animate-in
    const animatedElements = document.querySelectorAll('.animate-fade-up:not(.animate-in), .animate-fade-right:not(.animate-in)');
    animatedElements.forEach(element => animationObserver.observe(element));

    return () => {
      animationObserver.disconnect();
    };
  }, []); // Only run once since we removed animations from interactive elements

  const handleSelectPlan = (planIndex: number) => {
    setSelectedPlan(planIndex === selectedPlan ? null : planIndex);
  };

  if (isLoading && carId !== "example") {
    return <div className="text-center py-10">Loading car details...</div>;
  }

  if (!displayCar) {
    return <div className="text-center py-10">Car not found</div>;
  }

  return (
    <>
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Image Section */}
          <div className="animate-fade-up relative rounded-xl overflow-hidden" style={{ animationDelay: '200ms' }}>
            <img
              src={getCarImageUrl(displayCar.id)}
              alt={`${displayCar.make} ${displayCar.model}`}
              className="w-full aspect-[16/10] object-cover rounded-xl"
            />
            <span className={`absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${displayCar.available
              ? 'bg-success/90 text-white'
              : 'bg-danger/90 text-white'
              }`}>
              {displayCar.available ? 'Available Now' : 'Coming Soon'}
            </span>
          </div>

          {/* Details Section */}
          <div className="flex flex-col h-full">
            <div className="mb-6">
              <div className="animate-fade-right flex items-center gap-3 mb-2" style={{ animationDelay: '300ms' }}>
                <span className="text-sm text-gray-600">{displayCar.location}</span>
                <span className="text-sm text-gray-600">•</span>
                <span className="text-sm text-gray-600">{displayCar.category}</span>
              </div>
              <h1 className="animate-fade-up text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ animationDelay: '400ms' }}>
                {displayCar.year} {displayCar.make} {displayCar.model}
              </h1>
              <p className="animate-fade-right text-gray-600 text-lg leading-relaxed" style={{ animationDelay: '500ms' }}>
                {displayCar.description}
              </p>
              {/* Quick Actions */}

            </div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Car Description */}
              <div className="animate-fade-up bg-white rounded-xl shadow-sm p-8 mb-8" style={{ animationDelay: '300ms' }}>
                <h2 className="text-2xl font-bold mb-6">Vehicle Description</h2>
                <p className="animate-fade-right text-gray-600 leading-relaxed" style={{ animationDelay: '400ms' }}>
                  Experience luxury and performance with the {displayCar.year} {displayCar.make} {displayCar.model}.
                  This premium vehicle combines sophisticated design with cutting-edge technology,
                  offering an exceptional driving experience. Perfect for those who demand the best
                  in automotive excellence.
                </p>
              </div>

              {/* Car Specifications */}
              <div className="animate-fade-up bg-white rounded-xl shadow-sm p-8 mb-8" style={{ animationDelay: '400ms' }}>
                <h2 className="text-2xl font-bold mb-6">Vehicle Specifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="animate-fade-right bg-gray-50 p-4 rounded-lg" style={{ animationDelay: '500ms' }}>
                    <p className="text-sm text-gray-500 mb-1">Model Category</p>
                    <p className="font-medium">{displayCar.category}</p>
                  </div>
                  <div className="animate-fade-right bg-gray-50 p-4 rounded-lg" style={{ animationDelay: '600ms' }}>
                    <p className="text-sm text-gray-500 mb-1">Body Type</p>
                    <p className="font-medium">{displayCar.bodyType}</p>
                  </div>
                  <div className="animate-fade-right bg-gray-50 p-4 rounded-lg" style={{ animationDelay: '700ms' }}>
                    <p className="text-sm text-gray-500 mb-1">Drive Type</p>
                    <p className="font-medium">{displayCar.driveType}</p>
                  </div>
                  <div className="animate-fade-right bg-gray-50 p-4 rounded-lg" style={{ animationDelay: '800ms' }}>
                    <p className="text-sm text-gray-500 mb-1">Fuel Type</p>
                    <p className="font-medium">{displayCar.fuelType}</p>
                  </div>
                  <div className="animate-fade-right bg-gray-50 p-4 rounded-lg" style={{ animationDelay: '900ms' }}>
                    <p className="text-sm text-gray-500 mb-1">Seats</p>
                    <p className="font-medium">{displayCar.seats} seats</p>
                  </div>
                  <div className="animate-fade-right bg-gray-50 p-4 rounded-lg" style={{ animationDelay: '1000ms' }}>
                    <p className="text-sm text-gray-500 mb-1">Location</p>
                    <p className="font-medium">{displayCar.location}</p>
                  </div>
                </div>
              </div>


            </div>
            {/* Sidebar - Subscription Plans */}
            <div className="lg:col-span-1">
              <div className="animate-fade-up bg-white rounded-xl shadow-sm p-8 sticky top-8" style={{ animationDelay: '500ms' }}>
                <h2 className="text-2xl font-bold mb-6">Subscription Plans</h2>
                <div className="space-y-4">
                  {[9, 6, 4].map((months, index) => {
                    const planLabels: Record<number, string> = {
                      9: 'BEST VALUE',
                      6: 'POPULAR',
                      4: 'MOST FLEXIBLE',
                    };
                    const planPrices: Record<number, number> = {
                      9: 260,
                      6: 280,
                      4: 300,
                    };
                    const isSelected = selectedPlan === months;

                    return (
                      <button
                        key={months}
                        onClick={() => setSelectedPlan(months)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all ${isSelected
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 hover:border-primary/50'
                          }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold text-gray-900">{planLabels[months]}</span>
                          <div className="text-right">
                            <div className="flex items-baseline gap-1">
                              <span className={`text-2xl font-bold ${isSelected ? 'text-primary' : 'text-gray-900'}`}>
                                ${planPrices[months]}
                              </span>
                              <span className="text-sm text-gray-600">/week</span>
                            </div>
                          </div>
                        </div>

                        {/* Divider line */}
                        <hr className="my-3 border-t border-gray-200" />

                        <ul className="ml-5 list-disc text-sm text-gray-700">
                          <li>{months} months minimum term Subscription</li>
                          <li>385 km weekly mileage included (30c per excess KM)</li>
                          <li>1x primary driver</li>
                        </ul>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6">
                  <Link
                    href={selectedPlan !== null ? "/enquiry" : "#"}
                    className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all ${selectedPlan !== null
                        ? "bg-primary hover:bg-primary/90 text-white"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    onClick={(e) => {
                      if (selectedPlan === null) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <i className="fas fa-envelope mr-2"></i>
                    {selectedPlan !== null
                      ? "Make an Enquiry"
                      : "Select a plan to enquire"}
                  </Link>
                </div>
              </div>
            </div>


          </div>
        </div>
      </section>
    </>
  );
};

export default SubscriptionCarDetails; 