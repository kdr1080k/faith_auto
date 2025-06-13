import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Car, Feature } from "@shared/schema";
import { getCarImageUrl } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Car as FullCar } from "@/types/car";
import { useRoute, useSearch } from 'wouter';
import { Helmet } from "react-helmet-async";

interface CarDetailsProps {
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

const CarDetails = ({ carId }: CarDetailsProps) => {
  // Get the actual car ID from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const actualCarId = urlParams.get('carId') || carId;
  
  // Debug logging
  console.log('CarDetails - carId:', carId, 'actualCarId:', actualCarId, 'URL search:', window.location.search);

  // Fetch car data by database ID if available
  const { data: car, isLoading, error } = useQuery<Car>({
    queryKey: [`/api/cars/db/${actualCarId}?carType=secondhand`],
    enabled: !!actualCarId
  });

  useEffect(() => {
    // Add professional CSS animations
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
          transform: translate3d(-30px, 0, 0) scale3d(0.96, 0.96, 1); 
        }
        100% { 
          opacity: 1; 
          transform: translate3d(0, 0, 0) scale3d(1, 1, 1); 
        }
      }

      @keyframes professionalFadeRight {
        0% { 
          opacity: 0; 
          transform: translate3d(30px, 0, 0) scale3d(0.96, 0.96, 1); 
        }
        100% { 
          opacity: 1; 
          transform: translate3d(0, 0, 0) scale3d(1, 1, 1); 
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

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

  if (!car) {
    return <div className="min-h-screen flex items-center justify-center pt-32">
      <div className="text-center opacity-0 animate-[professionalFadeUp_0.8s_cubic-bezier(0.25,0.46,0.45,0.94)_forwards]">
        <div className="text-lg text-gray-600">Car not found</div>
      </div>
    </div>;
  }

  // Use actual price if available (for second-hand cars), otherwise calculate from weekly price
  const annualPrice = (car as any).actualPrice || (car.weeklyPrice ? car.weeklyPrice * 52 : 0);

  try {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Image + Title Section */}
            <div className="opacity-0 animate-[professionalSlideIn_0.8s_cubic-bezier(0.25,0.46,0.45,0.94)_forwards]" style={{ animationDelay: '200ms' }}>
              <ImageCarousel images={car.images || []} carName={`${car.make} ${car.model}`} status={car.status} available={car.available} />
              
              {/* Car Title */}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {car.model}
              </h1>

              {/* Vehicle Description */}
              <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Vehicle Description</h2>
                <p className="text-gray-600 leading-relaxed">
                  {car.description || "No description available."}
                </p>
              </div>

              {/* Vehicle Specifications */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Vehicle Specifications</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Year</p>
                      <p className="font-medium text-gray-900">{car.year || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Fuel Type</p>
                      <p className="font-medium text-gray-900">{car.fuelType || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Seats</p>
                      <p className="font-medium text-gray-900">{car.seats ? `${car.seats} seats` : 'Not specified'}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Body Type</p>
                      <p className="font-medium text-gray-900">{car.bodyType || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium text-gray-900">{car.location || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Mileage</p>
                      <p className="font-medium text-gray-900">{car.mileage !== undefined && car.mileage > 0 ? `${car.mileage.toLocaleString()} km` : 'Not specified'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Purchase Details Section */}
            <div className="opacity-0 animate-[professionalFadeRight_0.9s_cubic-bezier(0.25,0.46,0.45,0.94)_forwards]" style={{ animationDelay: '400ms' }}>
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-2xl font-bold mb-6">Purchase Details</h2>
                
                {/* Price Display */}
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">Price</p>
                  <div className="text-3xl font-bold text-primary mb-2">
                    ${annualPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </div>
                  <p className="text-sm text-gray-500">Drive away price</p>
                </div>

                {/* Additional Details */}
                {(car.mileage || car.registrationNumber) && (
                  <div className="mb-6 space-y-3">
                    {car.mileage && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mileage:</span>
                        <span className="font-medium">{car.mileage?.toLocaleString()} km</span>
                      </div>
                    )}
                   
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-4">
                  <Link 
                     href="/contact"
                    className="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium bg-primary hover:bg-primary/90 text-white transition-all"
                  >
                    <i className="fas fa-envelope mr-2"></i>
                    Contact Us
                  </Link>
                  

                </div>

                {/* Additional Info */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">What's Included:</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Full vehicle inspection</li>
                    <li>• Roadworthy certificate</li>
                    <li>• Registration transfer assistance</li>
                    <li>• Comprehensive warranty options</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error('Error rendering CarDetails:', error);
    return (
      <div className="text-center py-10">
        <h1>Error loading car details</h1>
        <p>Please try again later.</p>
      </div>
    );
  }
};

export default CarDetails;
