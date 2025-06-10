import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Car, Feature } from "@shared/schema";
import { getCarImageUrl } from "@/lib/utils";
import { useState, useEffect } from "react";

interface CarDetailsProps {
  carId: string;
}

const CarDetails = ({ carId }: CarDetailsProps) => {
  // Static data for second-hand cars
  const staticCars: Record<string, Car & { description?: string }> = {
    "smart-1": {
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
      location: "Brisbane",
      description: "Experience the future of mobility with the Smart #1. This all-electric SUV combines premium design with cutting-edge technology. Featuring a spacious interior, advanced driver assistance systems, and impressive range, the Smart #1 is perfect for modern urban living."
    },
    "smart-3": {
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
      location: "Melbourne",
      description: "The Smart #3 represents the perfect blend of style and substance. This electric SUV offers exceptional performance, premium comfort, and the latest in automotive technology. With its sleek design and impressive range, it's the ideal choice for those seeking a sustainable luxury driving experience."
    },
    "hyundai-venue": {
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
      location: "Brisbane",
      description: "The Hyundai Venue is a stylish and practical compact SUV that's perfect for city living. With its efficient petrol engine, modern safety features, and comfortable interior, it offers excellent value for money. The high driving position and compact dimensions make it ideal for urban navigation."
    }
  };

  // Get static car data
  const car = staticCars[carId];

  // Static features data
  const staticFeatures: Record<string, Feature[]> = {
    "smart-1": [
      { id: 1, carId: "smart-1", name: "ABS Brakes", icon: "shield-alt" },
      { id: 2, carId: "smart-1", name: "Android Auto", icon: "android" },
      { id: 3, carId: "smart-1", name: "Apple CarPlay", icon: "apple" },
      { id: 4, carId: "smart-1", name: "360° Camera", icon: "video" },
      { id: 5, carId: "smart-1", name: "Adaptive Cruise Control", icon: "tachometer-alt" },
      { id: 6, carId: "smart-1", name: "Heated Seats", icon: "fire" }
    ],
    "smart-3": [
      { id: 1, carId: "smart-3", name: "ABS Brakes", icon: "shield-alt" },
      { id: 2, carId: "smart-3", name: "Android Auto", icon: "android" },
      { id: 3, carId: "smart-3", name: "Apple CarPlay", icon: "apple" },
      { id: 4, carId: "smart-3", name: "360° Camera", icon: "video" },
      { id: 5, carId: "smart-3", name: "Adaptive Cruise Control", icon: "tachometer-alt" },
      { id: 6, carId: "smart-3", name: "Panoramic Sunroof", icon: "sun" }
    ],
    "hyundai-venue": [
      { id: 1, carId: "hyundai-venue", name: "ABS Brakes", icon: "shield-alt" },
      { id: 2, carId: "hyundai-venue", name: "Android Auto", icon: "android" },
      { id: 3, carId: "hyundai-venue", name: "Apple CarPlay", icon: "apple" },
      { id: 4, carId: "hyundai-venue", name: "Reversing Camera", icon: "video" },
      { id: 5, carId: "hyundai-venue", name: "Cruise Control", icon: "tachometer-alt" },
      { id: 6, carId: "hyundai-venue", name: "Power Mirrors", icon: "adjust" }
    ]
  };

  const features = staticFeatures[carId];

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

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.animate-fade-up, .animate-fade-right');
    animatedElements.forEach(element => animationObserver.observe(element));

    return () => {
      animationObserver.disconnect();
      document.head.removeChild(style);
    };
  }, []);

  if (!car) {
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
              src={getCarImageUrl(car.id)} 
              alt={`${car.make} ${car.model}`}
              className="w-full aspect-[16/10] object-cover rounded-xl"
            />
            <span className={`absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              car.available 
                ? 'bg-success/90 text-white' 
                : 'bg-danger/90 text-white'
            }`}>
              {car.available ? 'Available Now' : 'Coming Soon'}
            </span>
          </div>

          {/* Details Section */}
          <div className="flex flex-col h-full">
            <div className="mb-6">
              <div className="animate-fade-right flex items-center gap-3 mb-2" style={{ animationDelay: '300ms' }}>
                <span className="text-sm text-gray-600">{car.location}</span>
                <span className="text-sm text-gray-600">•</span>
                <span className="text-sm text-gray-600">{car.category}</span>
              </div>
              <h1 className="animate-fade-up text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ animationDelay: '400ms' }}>
                {car.year} {car.make} {car.model}
              </h1>
              <p className="animate-fade-right text-gray-600 text-lg leading-relaxed" style={{ animationDelay: '500ms' }}>
                {car.description || `Experience luxury and performance with the ${car.year} ${car.make} ${car.model}. 
                This premium vehicle combines sophisticated design with cutting-edge technology, 
                offering an exceptional driving experience.`}
              </p>
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
                  {car.description || `Experience luxury and performance with the ${car.year} ${car.make} ${car.model}. 
                  This premium vehicle combines sophisticated design with cutting-edge technology, 
                  offering an exceptional driving experience. Perfect for those who demand the best 
                  in automotive excellence.`}
                </p>
              </div>

              {/* Car Specifications */}
              <div className="animate-fade-up bg-white rounded-xl shadow-sm p-8 mb-8" style={{ animationDelay: '400ms' }}>
                <h2 className="text-2xl font-bold mb-6">Vehicle Specifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="animate-fade-right bg-gray-50 p-4 rounded-lg" style={{ animationDelay: '500ms' }}>
                    <p className="text-sm text-gray-500 mb-1">Model Category</p>
                    <p className="font-medium">{car.category}</p>
                  </div>
                  <div className="animate-fade-right bg-gray-50 p-4 rounded-lg" style={{ animationDelay: '600ms' }}>
                    <p className="text-sm text-gray-500 mb-1">Body Type</p>
                    <p className="font-medium">{car.bodyType}</p>
                  </div>
                  <div className="animate-fade-right bg-gray-50 p-4 rounded-lg" style={{ animationDelay: '700ms' }}>
                    <p className="text-sm text-gray-500 mb-1">Drive Type</p>
                    <p className="font-medium">{car.driveType}</p>
                  </div>
                  <div className="animate-fade-right bg-gray-50 p-4 rounded-lg" style={{ animationDelay: '800ms' }}>
                    <p className="text-sm text-gray-500 mb-1">Fuel Type</p>
                    <p className="font-medium">{car.fuelType}</p>
                  </div>
                  <div className="animate-fade-right bg-gray-50 p-4 rounded-lg" style={{ animationDelay: '900ms' }}>
                    <p className="text-sm text-gray-500 mb-1">Seats</p>
                    <p className="font-medium">{car.seats} seats</p>
                  </div>
                  <div className="animate-fade-right bg-gray-50 p-4 rounded-lg" style={{ animationDelay: '1000ms' }}>
                    <p className="text-sm text-gray-500 mb-1">Location</p>
                    <p className="font-medium">{car.location}</p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="animate-fade-up bg-white rounded-xl shadow-sm p-8" style={{ animationDelay: '500ms' }}>
                <h2 className="text-2xl font-bold mb-6">Vehicle Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {features?.map((feature, index) => (
                    <div key={feature.id} className="animate-fade-right flex items-center text-gray-700" style={{ animationDelay: `${600 + (index * 100)}ms` }}>
                      <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center mr-4">
                        <i className={`fas fa-${feature.icon} text-success`}></i>
                      </div>
                      <span>{feature.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - Price and Contact */}
            <div className="lg:col-span-1">
              <div className="animate-fade-up bg-white rounded-xl shadow-sm p-8 sticky top-8" style={{ animationDelay: '600ms' }}>
                <h2 className="text-2xl font-bold mb-6">Purchase Details</h2>
                <div className="mb-6">
                  <p className="animate-fade-right text-sm text-gray-600 mb-2" style={{ animationDelay: '700ms' }}>Price</p>
                  <div className="animate-fade-right text-3xl font-bold text-primary" style={{ animationDelay: '800ms' }}>
                    ${(car.weeklyPrice * 52).toLocaleString()}
                  </div>
                  <p className="animate-fade-right text-sm text-gray-500 mt-1" style={{ animationDelay: '900ms' }}>Drive away price</p>
                </div>

                <div className="space-y-4">
                  <Link 
                    href="/contact"
                    className="animate-fade-up w-full inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium bg-primary hover:bg-primary/90 text-white transition-all"
                    style={{ animationDelay: '1000ms' }}
                  >
                    <i className="fas fa-envelope mr-2"></i>
                    Make an Enquiry
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

export default CarDetails;
