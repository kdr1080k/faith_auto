import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { formatCurrency } from "@/lib/utils";
import CarCard from "@/components/cars/CarCard";
import { Car } from "@shared/schema";

interface FeaturedCarsProps {
  title: string;
  carCategory?: string;
}

const FeaturedCars = ({ title, carCategory = "smart" }: FeaturedCarsProps) => {
  const { data: cars, isLoading } = useQuery<Car[]>({
    queryKey: [`/api/cars?category=${carCategory}`],
  });

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg h-64 animate-pulse"></div>
            <div className="bg-gray-50 rounded-lg h-64 animate-pulse"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.isArray(cars) && cars.slice(0, 2).map(car => (
              <CarCard key={car.id} car={car} size="large" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCars;
