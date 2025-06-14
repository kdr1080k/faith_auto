import { useQuery } from "@tanstack/react-query";
import { Car } from "@shared/schema";
import { getCarImageUrl } from "@/lib/utils";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import { Car as FullCar } from "@/types/car";
import { useRoute, useSearch } from 'wouter';
import { Helmet } from "react-helmet-async";

interface SubscriptionCarDetailsProps {
  carId: string;
}

// Image Carousel Component
const ImageCarousel = ({ images, carName, status, available }: { images: string[], carName: string, status?: string, available?: boolean }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? Math.max(0, images.length - 1) : prevIndex - 1
    );
  };
  
  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const StatusBadge = () => (
    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold z-10 ${
      available 
        ? 'bg-green-100 text-green-800' 
        : 'bg-red-100 text-red-800'
    }`}>
      {status ? status.charAt(0).toUpperCase() + status.slice(1) : (available ? 'Available' : 'Not Available')}
    </div>
  );

  // Professional no-image placeholder
  const NoImagePlaceholder = () => (
    <div className="w-full h-80 bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center rounded-lg">
      <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mb-4">
        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <p className="text-gray-500 font-medium text-lg mb-1">{carName}</p>
      <p className="text-gray-400 text-sm">Image coming soon</p>
    </div>
  );

  if (!images || images.length === 0) {
    return (
      <div className="relative mb-6">
        <NoImagePlaceholder />
        <StatusBadge />
      </div>
    );
  }

  return (
    <div className="relative mb-6">
      <div className="relative w-full h-80 rounded-lg overflow-hidden">
        <img 
          src={images[currentImageIndex] || '/src/assets/car-placeholder.jpg'} 
          alt={`${carName} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            // If image fails to load, show placeholder
            (e.target as HTMLImageElement).style.display = 'none';
            const placeholder = (e.target as HTMLElement).nextElementSibling as HTMLElement;
            if (placeholder) placeholder.style.display = 'flex';
          }}
        />
        {/* Fallback placeholder for broken images */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center" style={{ display: 'none' }}>
          <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-gray-500 font-medium text-lg mb-1">{carName}</p>
          <p className="text-gray-400 text-sm">Image unavailable</p>
        </div>
        
        {images.length > 1 && (
          <>
            <button 
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={goToNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
        
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>
      <StatusBadge />
    </div>
  );
};

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
    queryKey: [`/api/cars/db/${actualCarId}?carType=subscription`],
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
              <ImageCarousel images={displayCar.images || []} carName={`${displayCar.make} ${displayCar.model}`} status={displayCar.status} available={displayCar.available} />
              
              {/* Car Title */}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
             {displayCar.model} 
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
                      <p className="text-sm text-gray-500">Year</p>
                      <p className="font-medium text-gray-900">{displayCar.year || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Fuel Type</p>
                      <p className="font-medium text-gray-900">{displayCar.fuelType || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Seats</p>
                      <p className="font-medium text-gray-900">{displayCar.seats ? `${displayCar.seats} seats` : 'Not specified'}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Body Type</p>
                      <p className="font-medium text-gray-900">{displayCar.bodyType || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium text-gray-900">{displayCar.location || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Mileage</p>
                      <p className="font-medium text-gray-900">{displayCar.mileage ? `${displayCar.mileage.toLocaleString()} km` : 'Not specified'}</p>
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
                            <span className="text-2xl font-bold">${price.toFixed(2)}</span>
                            <span className="text-gray-500">per week</span>
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