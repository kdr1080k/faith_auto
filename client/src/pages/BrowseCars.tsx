import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import CarCard from "@/components/cars/CarCard";
import CarFilters from "@/components/cars/CarFilters";
import { Car } from "@shared/schema";

const CITIES = ["Brisbane", "Sydney", "Melbourne", "Adelaide", "Perth"];
const SORTS = [
  { label: "Price (low to high)", value: "price-asc" },
  { label: "Price (high to low)", value: "price-desc" },
  { label: "Newest", value: "newest" },
];

function useQueryParams() {
  const [location] = useLocation();
  return useMemo(() => {
    const params = new URLSearchParams(location.split("?")[1] || "");
    return {
      location: params.get("location") || CITIES[0],
      bodyType: params.get("bodyType") || "All",
      fuelType: params.get("fuelType") || "All",
      seats: params.get("seats") || "All",
      make: params.get("make") || "All",
      model: params.get("model") || "All",
      sort: params.get("sort") || SORTS[0].value,
    };
  }, [location]);
}

const BrowseCars = () => {
  const filters = useQueryParams();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  const [, navigate] = useLocation();
  const [city, setCity] = useState(filters.location);
  const [sort, setSort] = useState(filters.sort);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    params.append("location", city);
    if (filters.bodyType) params.append("bodyType", filters.bodyType);
    if (filters.fuelType) params.append("fuelType", filters.fuelType);
    if (filters.seats) params.append("seats", filters.seats);
    if (filters.make) params.append("make", filters.make);
    if (filters.model) params.append("model", filters.model);
    params.append("sort", sort);
    fetch(`/api/cars?${params.toString()}`)
      .then(res => res.json())
      .then(data => setCars(data.cars || []))
      .finally(() => setLoading(false));
  }, [city, sort, filters.bodyType, filters.fuelType, filters.seats, filters.make, filters.model]);

  const handleApplyFilters = (newFilters: Record<string, string>) => {
    const params = new URLSearchParams({ ...filters, ...newFilters, location: city, sort });
    navigate(`/browse-cars?${params.toString()}`);
  };

  return (
    <div className="relative w-full min-h-screen bg-gray-50">
      {/* 顶部大图和标题 */}
      <div className="relative h-64 w-full bg-cover bg-center flex items-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80)' }}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 px-8">
          <h1 className="text-4xl font-bold text-white mb-2">Subscription Inventory</h1>
          <p className="text-lg text-white">Explore the widest range of SUVs, Utes, EVs, and premium cars with Australia's largest car subscription provider.</p>
        </div>
      </div>
      {/* 主体内容 */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 px-4 py-8">
        {/* 左侧筛选栏 */}
        <aside className="w-full md:w-64 bg-white rounded-xl shadow p-6 mb-8 md:mb-0">
          <CarFilters initial={filters} onApply={handleApplyFilters} />
        </aside>
        {/* 右侧车辆列表 */}
        <main className="flex-1">
          {/* 顶部工具栏 */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <div className="text-gray-700 font-medium">{cars.length} Models Available</div>
            <div className="flex gap-2">
              <select className="border rounded p-2" value={city} onChange={e => setCity(e.target.value)}>
                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <select className="border rounded p-2" value={sort} onChange={e => setSort(e.target.value)}>
                {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
          </div>
          {/* 车辆网格 */}
          {loading ? (
            <div className="text-center text-gray-400 py-12">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.length === 0 ? (
                <div className="col-span-full text-center text-gray-400 py-12">No cars found matching your criteria.</div>
              ) : (
                cars.map(car => <CarCard key={car.id} car={car} />)
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default BrowseCars; 