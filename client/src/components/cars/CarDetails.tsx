import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Car, Feature } from "@shared/schema";
import { getCarImageUrl } from "@/lib/utils";
import SubscriptionPlan from "./SubscriptionPlan";

interface CarDetailsProps {
  carId: string;
}

const CarDetails = ({ carId }: CarDetailsProps) => {
  const { data: car, isLoading } = useQuery<Car>({
    queryKey: [`/api/cars/${carId}`],
  });

  const { data: features, isLoading: featuresLoading } = useQuery<Feature[]>({
    queryKey: [`/api/cars/${carId}/features`],
  });

  if (isLoading) {
    return <div className="text-center py-10">Loading car details...</div>;
  }

  if (!car) {
    return <div className="text-center py-10">Car not found</div>;
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="mb-6 text-sm">
          <Link href="/" className="text-gray-500 hover:text-primary">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/subscription-inventory" className="text-gray-500 hover:text-primary">Subscription Cars</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">{car.make} {car.model}</span>
        </div>
        
        <div className="flex flex-col lg:flex-row">
          {/* Car details */}
          <div className="w-full lg:w-2/3 lg:pr-8">
            <h1 className="text-3xl font-bold mb-6">{car.make} {car.model}</h1>
            
            {/* Car image */}
            <div className="mb-8 rounded-lg overflow-hidden">
              <img 
                src={getCarImageUrl(car.id)} 
                alt={`${car.make} ${car.model}`} 
                className="w-full h-auto" 
              />
            </div>
            
            <h2 className="text-xl font-bold mb-4">Vehicle details</h2>
            
            {/* Vehicle specs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-sm">
              <div>
                <p className="text-gray-500 uppercase">YEAR</p>
                <p className="font-medium">{car.year}</p>
              </div>
              <div>
                <p className="text-gray-500 uppercase">SEATS</p>
                <p className="font-medium">{car.seats}</p>
              </div>
              <div>
                <p className="text-gray-500 uppercase">FUEL TYPE</p>
                <p className="font-medium">{car.fuelType}</p>
              </div>
              <div>
                <p className="text-gray-500 uppercase">MODEL</p>
                <p className="font-medium">{car.model}</p>
              </div>
              <div>
                <p className="text-gray-500 uppercase">DRIVE TYPE</p>
                <p className="font-medium">{car.driveType}</p>
              </div>
              <div>
                <p className="text-gray-500 uppercase">BODY TYPE</p>
                <p className="font-medium">{car.bodyType}</p>
              </div>
            </div>
            
            <h2 className="text-xl font-bold mb-4">Popular features available</h2>
            
            {/* Features grid */}
            {featuresLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="border border-gray-200 rounded-md p-3 animate-pulse bg-gray-100 h-12"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {features?.map(feature => (
                  <div key={feature.id} className="border border-gray-200 rounded-md p-3 flex items-center">
                    <div className="w-8 h-8 flex items-center justify-center mr-3 text-primary">
                      <i className={`fas fa-${feature.icon} text-lg`}></i>
                    </div>
                    <span className="text-sm">{feature.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Subscription sidebar */}
          <div className="w-full lg:w-1/3">
            <SubscriptionPlan car={car} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarDetails;
