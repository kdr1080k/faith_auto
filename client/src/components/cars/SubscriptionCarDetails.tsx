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
  // Get the actual car ID from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const actualCarId = urlParams.get('carId') || carId;
  
  // Debug logging
  console.log('SubscriptionCarDetails - carId:', carId, 'actualCarId:', actualCarId, 'URL search:', window.location.search);
  // For the example page, we'll use hardcoded data
  const exampleCar: FullCar = {
    id: "example",
    dbId: null,
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
    status: "available",
    image: null,
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

  // Fetch car data by database ID if available
  const { data: car, isLoading, error } = useQuery<Car>({
    queryKey: [`/api/cars/db/${actualCarId}`],
    enabled: !!actualCarId && actualCarId !== "example"
  });

  // Use fetched car data if available, otherwise fallback to example
  const displayCar = car || exampleCar;

  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  useEffect(() => {
    // Add professional CSS animations from About page
    const style = document.createElement('style');
    style.textContent = `
      .animate-element {
        will-change: transform, opacity;
        backface-visibility: hidden;
      }
      
      @keyframes professionalFadeUp {
        0% { 
          opacity: 0; 
          transform: translate3d(0, 25px, 0) scale3d(0.98, 0.98, 1); 
        }
        100% { 
          opacity: 1; 
          transform: translate3d(0, 0, 0) scale3d(1, 1, 1); 
        }
      }
      
      @keyframes professionalSlideIn {
        0% { 
          opacity: 0; 
          transform: translate3d(-25px, 0, 0) scale3d(0.98, 0.98, 1); 
        }
        100% { 
          opacity: 1; 
          transform: translate3d(0, 0, 0) scale3d(1, 1, 1); 
        }
      }
      
      @keyframes professionalFadeRight {
        0% { 
          opacity: 0; 
          transform: translate3d(35px, 0, 0) scale3d(0.96, 0.96, 1); 
        }
        60% {
          opacity: 0.8;
          transform: translate3d(-2px, 0, 0) scale3d(1.01, 1.01, 1);
        }
        100% { 
          opacity: 1; 
          transform: translate3d(0, 0, 0) scale3d(1, 1, 1); 
        }
      }
      
      @keyframes professionalScale {
        0% { 
          opacity: 0; 
          transform: translate3d(0, 0, 0) scale3d(0.95, 0.95, 1); 
        }
        100% { 
          opacity: 1; 
          transform: translate3d(0, 0, 0) scale3d(1, 1, 1); 
        }
      }

      /* Cleanup will-change after animations */
      .animation-complete {
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

  const handleSelectPlan = (months: number) => {
    setSelectedPlan(months === selectedPlan ? null : months);
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center pt-32">
      <div className="text-center opacity-0 animate-[professionalFadeUp_0.8s_cubic-bezier(0.25,0.46,0.45,0.94)_forwards]">
        <div className="text-lg text-gray-600">Loading car details...</div>
      </div>
    </div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center pt-32">
      <div className="text-center opacity-0 animate-[professionalFadeUp_0.8s_cubic-bezier(0.25,0.46,0.45,0.94)_forwards]">
        <div className="text-lg text-red-600">Error: {String(error)}</div>
      </div>
    </div>;
  }

  if (!displayCar) {
    return <div className="min-h-screen flex items-center justify-center pt-32">
      <div className="text-center opacity-0 animate-[professionalFadeUp_0.8s_cubic-bezier(0.25,0.46,0.45,0.94)_forwards]">
        <div className="text-lg text-gray-600">Car not found</div>
      </div>
    </div>;
  }

  try {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Image + Title Section */}
            <div className="opacity-0 animate-[professionalSlideIn_0.8s_cubic-bezier(0.25,0.46,0.45,0.94)_forwards]" style={{ animationDelay: '200ms' }}>
              <div className="relative rounded-xl overflow-hidden mb-6">
                <img
                  src={displayCar.image || "/placeholder.jpg"}
                  alt={`${displayCar.make} ${displayCar.model}`}
                  className="w-full aspect-[16/10] object-cover rounded-xl"
                  onError={(e) => {
                    console.log('Image failed to load:', displayCar.image);
                    e.currentTarget.src = "/placeholder.jpg";
                  }}
                />
                <span className={`absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  displayCar.status?.toLowerCase() === 'available' || displayCar.status?.toLowerCase() === 'active'
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                }`}>
                  {displayCar.status 
                    ? displayCar.status.charAt(0).toUpperCase() + displayCar.status.slice(1)
                    : (displayCar.available ? 'Available' : 'Unavailable')}
                </span>
              </div>
              
              {/* Car Title */}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {displayCar.make} {displayCar.model} {displayCar.year}
              </h1>

              {/* Vehicle Description */}
              <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Vehicle Description</h2>
                <p className="text-gray-600 leading-relaxed">
                  {displayCar.description || "No description available."}
                </p>
              </div>

              {/* Vehicle Specifications */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Vehicle Specifications</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Body Type</p>
                      <p className="font-medium text-gray-900">{displayCar.bodyType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Fuel Type</p>
                      <p className="font-medium text-gray-900">{displayCar.fuelType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Drive Type</p>
                      <p className="font-medium text-gray-900">{displayCar.driveType}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Year</p>
                      <p className="font-medium text-gray-900">{displayCar.year}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Category</p>
                      <p className="font-medium text-gray-900">{displayCar.category}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subscription Plans Section */}
            <div className="opacity-0 animate-[professionalFadeRight_0.9s_cubic-bezier(0.25,0.46,0.45,0.94)_forwards]" style={{ animationDelay: '400ms' }}>
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-2xl font-bold mb-6">Subscription Plans</h2>
                <div className="space-y-4">
                  {[9, 6, 3].map((months, index) => {
                    const planLabels: Record<number, string> = {
                      9: 'BEST VALUE',
                      6: 'POPULAR',
                      3: 'MOST FLEXIBLE',
                    };
                    
                    // Get the subscription plan price directly from the database
                    let price = 0;
                    if (displayCar.dbId) {
                      const planPrices: Record<number, number> = {
                        3: displayCar.subscriptionPlans?.threeMonth || 0,
                        6: displayCar.subscriptionPlans?.sixMonth || 0,
                        9: displayCar.subscriptionPlans?.nineMonth || 0
                      };
                      price = planPrices[months];
                    }

                    return (
                      <button
                        key={months}
                        onClick={() => handleSelectPlan(months)}
                        className={`w-full p-6 rounded-lg border-2 transition-all ${
                          selectedPlan === months
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 hover:border-primary/50'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-sm font-medium text-primary">
                            {planLabels[months]}
                          </span>
                          <div className="text-right">
                            <span className="text-2xl font-bold">${price}</span>
                            <span className="text-gray-500">/total</span>
                          </div>
                        </div>
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
                  {selectedPlan ? (
                    <Link 
                      href={`/enquiry?carId=${displayCar.dbId || displayCar.id}&make=${displayCar.make}&model=${displayCar.model}&type=subscription&plan=${selectedPlan}`}
                      className="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium bg-primary hover:bg-primary/90 text-white"
                    >
                      Make an Enquiry
                    </Link>
                  ) : (
                    <button
                      className="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium bg-gray-300 text-gray-500 cursor-not-allowed"
                      disabled
                    >
                      Select a plan to enquire
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error('Error rendering SubscriptionCarDetails:', error);
    return (
      <div className="text-center py-10">
        <h1>Error loading car details</h1>
        <p>Please try again later.</p>
      </div>
    );
  }
};

export default SubscriptionCarDetails; 