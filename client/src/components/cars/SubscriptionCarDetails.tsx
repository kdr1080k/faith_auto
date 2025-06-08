import { useQuery } from "@tanstack/react-query";
import { Car } from "@shared/schema";
import { getCarImageUrl } from "@/lib/utils";
import { Link } from "wouter";
import { useState } from "react";

interface SubscriptionCarDetailsProps {
  carId: string;
}

const SubscriptionCarDetails = ({ carId }: SubscriptionCarDetailsProps) => {
  // For the example page, we'll use hardcoded data
  const exampleCar = {
    id: "example",
    make: "BMW",
    model: "X5",
    year: 2023,
    category: "Luxury SUV",
    bodyType: "SUV",
    driveType: "AWD",
    fuelType: "Diesel",
    seats: 5,
    weeklyPrice: 899,
    available: true,
    isGreatValue: true,
    location: "Brisbane"
  };

  // Only fetch from API if it's not the example page
  const { data: car, isLoading } = useQuery<Car>({
    queryKey: [`/api/cars/${carId}`],
    enabled: carId !== "example"
  });

  const displayCar = carId === "example" ? exampleCar : car;

  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

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
      <section className="relative min-h-[600px] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/95 to-gray-900/85" style={{ 
          backgroundImage: `url(${getCarImageUrl(displayCar.id)})`
        }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-full z-10 py-24">
          <div className="w-full max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {displayCar.make} {displayCar.model}
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              {displayCar.year} {displayCar.category}
            </p>
            <div className="flex items-center gap-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                displayCar.available 
                  ? 'bg-success/10 text-success' 
                  : 'bg-danger/10 text-danger'
              }`}>
                {displayCar.available ? 'Available' : 'Not Available'}
              </span>
              <span className="text-3xl font-bold text-white bg-primary/20 backdrop-blur-sm px-6 py-2 rounded-lg">
                ${displayCar.weeklyPrice}/week
              </span>
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
              <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                <h2 className="text-2xl font-bold mb-6">Vehicle Description</h2>
                <p className="text-gray-600 leading-relaxed">
                  Experience luxury and performance with the {displayCar.year} {displayCar.make} {displayCar.model}. 
                  This premium vehicle combines sophisticated design with cutting-edge technology, 
                  offering an exceptional driving experience. Perfect for those who demand the best 
                  in automotive excellence.
                </p>
              </div>

              {/* Car Specifications */}
              <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                <h2 className="text-2xl font-bold mb-6">Vehicle Specifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Model Category</p>
                    <p className="font-medium">{displayCar.category}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Body Type</p>
                    <p className="font-medium">{displayCar.bodyType}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Drive Type</p>
                    <p className="font-medium">{displayCar.driveType}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Fuel Type</p>
                    <p className="font-medium">{displayCar.fuelType}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Seats</p>
                    <p className="font-medium">{displayCar.seats} seats</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Location</p>
                    <p className="font-medium">{displayCar.location}</p>
                  </div>
                </div>
              </div>

              {/* Subscription Benefits */}
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-2xl font-bold mb-6">Subscription Benefits</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center mr-4">
                      <i className="fas fa-check-circle text-success text-lg"></i>
                    </div>
                    <div>
                      <p className="font-medium">Insurance Included</p>
                      <p className="text-sm text-gray-500">Comprehensive coverage</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center mr-4">
                      <i className="fas fa-check-circle text-success text-lg"></i>
                    </div>
                    <div>
                      <p className="font-medium">Maintenance Included</p>
                      <p className="text-sm text-gray-500">Regular servicing covered</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center mr-4">
                      <i className="fas fa-check-circle text-success text-lg"></i>
                    </div>
                    <div>
                      <p className="font-medium">Flexible Terms</p>
                      <p className="text-sm text-gray-500">Minimum 1 month</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subscription Plans Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-8 sticky top-8">
                <h2 className="text-2xl font-bold mb-6">Subscription Plans</h2>
                <div className="space-y-4">
                  {/* 4 Months Plan */}
                  <div 
                    className={`border rounded-lg p-6 transition-all ${
                      selectedPlan === 0 
                        ? 'border-primary bg-primary/5' 
                        : 'border-gray-200 hover:border-primary/50'
                    }`}
                    onClick={() => handleSelectPlan(0)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-gray-900">4 Months</h3>
                      <div className="mt-2">
                        <p className="text-3xl font-bold text-primary">${displayCar.weeklyPrice}</p>
                        <p className="text-gray-600">per week</p>
                      </div>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-center text-gray-700">
                        <i className="fas fa-check text-success mr-3"></i>
                        4-month commitment
                      </li>
                      <li className="flex items-center text-gray-700">
                        <i className="fas fa-check text-success mr-3"></i>
                        Insurance included
                      </li>
                      <li className="flex items-center text-gray-700">
                        <i className="fas fa-check text-success mr-3"></i>
                        Maintenance included
                      </li>
                    </ul>
                  </div>

                  {/* Enquiry Button */}
                  <Link 
                    href={selectedPlan !== null ? "/enquiry" : "#"}
                    className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all ${
                      selectedPlan !== null 
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