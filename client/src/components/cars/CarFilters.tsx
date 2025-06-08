import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FUEL_TYPES = ["All", "Petrol", "Diesel", "Hybrid", "Electric"];
const BODY_TYPES = ["All", "SUV", "Sedan", "Hatchback", "Wagon", "Ute", "Van", "Coupe"];
const SEATS = ["All", "2", "4", "5", "6", "7+"];
const LOCATIONS = ["All", "Brisbane", "Sydney", "Melbourne", "Adelaide", "Perth"];

interface FiltersState {
  fuelTypes: string[];
  bodyTypes: string[];
  seats: string[];
  makes: string[];
  location: string;
}

interface CarFiltersProps {
  initialFilters: FiltersState;
  onApplyFilters: (filters: FiltersState) => void;
  availableMakes: string[];
}

const CarFilters: React.FC<CarFiltersProps> = ({ initialFilters, onApplyFilters, availableMakes }) => {
  const [filters, setFilters] = useState<FiltersState>(initialFilters);

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const handleFilterChange = (type: keyof FiltersState, value: string) => {
    if (type === 'location') {
      setFilters(prev => ({
        ...prev,
        location: value === 'All' ? '' : value
      }));
    } else {
      const arrayType = type as keyof Omit<FiltersState, 'location'>;
      setFilters(prev => ({
        ...prev,
        [arrayType]: value === 'All' ? [] : [value]
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyFilters(filters);
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
              <label className="text-sm font-medium text-text-secondary mb-1.5 block">Location</label>
              <Select 
                value={filters.location || 'All'} 
                onValueChange={v => handleFilterChange('location', v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {LOCATIONS.map(loc => (
                      <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-text-secondary mb-1.5 block">Fuel Type</label>
              <Select 
                value={filters.fuelTypes[0] || 'All'} 
                onValueChange={v => handleFilterChange('fuelTypes', v)}
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
                value={filters.bodyTypes[0] || 'All'} 
                onValueChange={v => handleFilterChange('bodyTypes', v)}
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
                value={filters.seats[0] || 'All'} 
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
                value={filters.makes[0] || 'All'} 
                onValueChange={v => handleFilterChange('makes', v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select make" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="All">All</SelectItem>
                    {availableMakes.map(make => (
                      <SelectItem key={make} value={make}>{make}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" className="w-full mt-2">
            Apply Filters
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CarFilters;
