import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FUEL_TYPES = ["All", "Petrol", "Diesel", "Hybrid", "Electric"];
const BODY_TYPES = ["All", "SUV", "Sedan", "Hatchback", "Wagon", "Ute", "Van", "Coupe"];
const SEATS = ["All", "2", "4", "5", "6", "7+"];
const MAKES = ["All", "Smart", "Tesla", "Toyota", "Hyundai", "Nissan", "Suzuki", "Mazda", "BMW", "Mercedes-Benz", "Audi", "Volkswagen", "Honda", "Kia", "Lexus", "Faith Auto", "Used Vehicle"];

interface FiltersState {
  location: string;
  bodyType: string;
  fuelType: string;
  seats: string;
  make: string;
}

interface CarFiltersProps {
  initial: FiltersState;
  onApply: (filters: FiltersState) => void;
}

const CarFilters: React.FC<CarFiltersProps> = ({ initial, onApply }) => {
  const [filters, setFilters] = useState<FiltersState>(initial);

  useEffect(() => {
    setFilters(initial);
  }, [initial]);

  const handleFilterChange = (key: keyof FiltersState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApply(filters);
  };

  const handleReset = () => {
    const resetFilters = {
      location: "All",
      bodyType: "All",
      fuelType: "All",
      seats: "All",
      make: "All"
    };
    setFilters(resetFilters);
    onApply(resetFilters);
  };

  return (
    <Card className="w-full md:w-72 h-fit sticky top-4">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-text-primary">Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-text-secondary mb-1.5 block">Fuel Type</label>
              <Select 
                value={filters.fuelType} 
                onValueChange={v => handleFilterChange('fuelType', v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select fuel type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {FUEL_TYPES.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-text-secondary mb-1.5 block">Body Type</label>
              <Select 
                value={filters.bodyType} 
                onValueChange={v => handleFilterChange('bodyType', v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select body type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {BODY_TYPES.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-text-secondary mb-1.5 block">No. of Seats</label>
              <Select 
                value={filters.seats} 
                onValueChange={v => handleFilterChange('seats', v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select seats" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {SEATS.map(seat => (
                      <SelectItem key={seat} value={seat}>{seat}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-text-secondary mb-1.5 block">Make</label>
              <Select 
                value={filters.make} 
                onValueChange={v => handleFilterChange('make', v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select make" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {MAKES.map(make => (
                      <SelectItem key={make} value={make}>{make}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button type="submit" className="w-full">
              Apply Filters
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              className="w-full"
              onClick={handleReset}
            >
              Reset Filters
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CarFilters;
