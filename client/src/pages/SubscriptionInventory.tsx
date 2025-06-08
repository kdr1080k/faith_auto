import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { Car } from "@shared/schema";
import CarFilters from "@/components/cars/CarFilters";
import CarCard from "@/components/cars/CarCard";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const SubscriptionInventory = () => {
  const [sortOrder, setSortOrder] = useState('price-low');
  const [appliedFilters, setAppliedFilters] = useState({
    fuelTypes: [] as string[],
    bodyTypes: [] as string[],
    seats: [] as string[],
    makes: [] as string[]
  });

  const { data: cars, isLoading } = useQuery<Car[]>({
    queryKey: ['/api/cars'],
    queryFn: async () => {
      const response = await fetch('/api/cars');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    }
  });

  const handleApplyFilters = (filters: typeof appliedFilters) => {
    setAppliedFilters(filters);
  };

  const filteredCars = cars?.filter(car => {
    if (appliedFilters.fuelTypes.length > 0 && !appliedFilters.fuelTypes.includes(car.fuelType)) {
      return false;
    }
    if (appliedFilters.bodyTypes.length > 0 && !appliedFilters.bodyTypes.includes(car.bodyType)) {
      return false;
    }
    if (appliedFilters.seats.length > 0 && !appliedFilters.seats.includes(car.seats.toString())) {
      return false;
    }
    if (appliedFilters.makes.length > 0 && !appliedFilters.makes.includes(car.make)) {
      return false;
    }
    return true;
  });

  const sortedCars = [...(filteredCars || [])].sort((a, b) => {
    switch (sortOrder) {
      case 'price-low':
        return a.weeklyPrice - b.weeklyPrice;
      case 'price-high':
        return b.weeklyPrice - a.weeklyPrice;
      case 'newest':
        return b.year - a.year;
      default:
        return 0;
    }
  });

  const availableMakes = [...new Set(cars?.map(car => car.make) || [])];

  return (
    <>
      <Helmet>
        <title>Vehicle Inventory | Faith Auto</title>
        <meta name="description" content="Browse our selection of quality Japanese imported vehicles. All vehicles thoroughly inspected and verified by Faith Auto's expert team." />
      </Helmet>
      
      {/* Hero Section */}
      <section className="relative py-24 bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/95 to-gray-900/85" style={{ 
          backgroundImage: `url('/pexels-svonhorst-2920064.jpg')`
        }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Available Subscription Vehicles
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Browse our selection of premium vehicles available for subscription. 
            All-inclusive weekly pricing with no hidden fees.
          </p>
        </div>
      </section>

      {/* Inventory Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-start">
            {/* Filters Sidebar */}
            <CarFilters 
              onApplyFilters={handleApplyFilters} 
              availableMakes={availableMakes}
            />
            
            {/* Car Listings */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Select value={sortOrder} onValueChange={setSortOrder}>
                    <SelectTrigger className="w-full sm:w-auto">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="price-low">Price (low to high)</SelectItem>
                        <SelectItem value="price-high">Price (high to low)</SelectItem>
                        <SelectItem value="newest">Newest first</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Car Grid */}
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="bg-white rounded-lg h-48 animate-pulse"></div>
                  ))}
                </div>
              ) : sortedCars.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedCars.map(car => (
                    <CarCard key={car.id} car={car} isSubscription={true} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-white rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-gray-900">No vehicles match your filters</h3>
                  <p className="mt-2 text-sm text-gray-500">Try adjusting your filter criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SubscriptionInventory;
