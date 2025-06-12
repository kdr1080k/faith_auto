import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import CarCard from "@/components/cars/CarCard";
import CarFilters from "@/components/cars/CarFilters";
import { Car } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";

interface FiltersState {
  location: string;
  bodyType: string;
  fuelType: string;
  seats: string;
  make: string;
}

const SORTS = [
  { label: "Price (low to high)", value: "price-asc" },
  { label: "Price (high to low)", value: "price-desc" },
  { label: "Newest", value: "newest" },
];

function useQueryParams(): FiltersState & { sort: string } {
  const [location] = useLocation();
  return useMemo(() => {
    const params = new URLSearchParams(location.split("?")[1] || "");
    return {
      location: params.get("location") || "All",
      bodyType: params.get("bodyType") || "All",
      fuelType: params.get("fuelType") || "All",
      seats: params.get("seats") || "All",
      make: params.get("make") || "All",
      sort: params.get("sort") || SORTS[0].value,
    };
  }, [location]);
}

const BrowseCars = () => {
  const filters = useQueryParams();
  const [, navigate] = useLocation();
  const [sort, setSort] = useState(filters.sort);

  // Fetch cars from the API
  const { data: cars = [], isLoading } = useQuery<Car[]>({
    queryKey: ['/api/cars', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.location !== 'All') params.append('location', filters.location);
      if (filters.bodyType !== 'All') params.append('bodyType', filters.bodyType);
      if (filters.fuelType !== 'All') params.append('fuelType', filters.fuelType);
      if (filters.seats !== 'All') params.append('seats', filters.seats);
      
      const response = await fetch(`/api/cars?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch cars');
      }
      return response.json();
    }
  });

  // Apply remaining filters and sorting
  const filteredCars = useMemo(() => {
    let filtered = [...(cars || [])];

    // Apply make filter (since it's not handled by the backend)
    if (filters.make !== "All") {
      filtered = filtered.filter(car => car.make === filters.make);
    }

    // Apply sorting
    if (sort === "price-asc") {
      filtered.sort((a, b) => a.weeklyPrice - b.weeklyPrice);
    } else if (sort === "price-desc") {
      filtered.sort((a, b) => b.weeklyPrice - a.weeklyPrice);
    } else if (sort === "newest") {
      filtered.sort((a, b) => b.year - a.year);
    }

    return filtered;
  }, [cars, filters.make, sort]);

  const handleApplyFilters = (newFilters: FiltersState) => {
    const params = new URLSearchParams({ ...newFilters, sort });
    navigate(`/browse-cars?${params.toString()}`);
  };

  return (
    <div className="relative w-full min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-64 w-full bg-cover bg-center flex items-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80)' }}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 px-8">
          <h1 className="text-4xl font-bold text-white mb-2">Subscription Inventory</h1>
          <p className="text-lg text-white">Explore the widest range of SUVs, Utes, EVs, and premium cars with Australia's largest car subscription provider.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 px-4 py-8">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-64 bg-white rounded-xl shadow p-6 mb-8 md:mb-0 h-fit">
          <CarFilters initial={filters} onApply={handleApplyFilters} />
        </aside>

        {/* Car List */}
        <main className="flex-1">
          {/* Sort Controls */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <div className="text-gray-700 font-medium">{filteredCars.length} Models Available</div>
            <div className="flex gap-2">
              <select 
                className="border rounded p-2" 
                value={sort} 
                onChange={e => setSort(e.target.value)}
              >
                {SORTS.map(s => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Car Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg h-64 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.length === 0 ? (
                <div className="col-span-full text-center text-gray-400 py-12">
                  <p className="text-lg font-medium mb-2">No vehicles match your selected filters.</p>
                  <p>Try adjusting your filter criteria to see more vehicles.</p>
                </div>
              ) : (
                filteredCars.map(car => (
                  <CarCard key={car.id} car={car} isSubscription />
                ))
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default BrowseCars; 