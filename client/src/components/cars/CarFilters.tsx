import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FUEL_TYPES = ["All", "Petrol", "Diesel", "Hybrid"];
const BODY_TYPES = ["All", "SUV", "Sedan", "Hatchback", "Wagon", "Ute", "Van", "Coupe"];
const SEATS = ["All", "2", "4", "5", "6", "7+"];
const MAKES = ["All", "Hyundai", "Nissan", "Toyota", "Smart", "Suzuki"];
const MODELS = ["All", "Venue", "X-Trail", "Yaris Cross Hybrid", "#1", "#3", "Swift"];

interface Filters {
  fuelType: string;
  bodyType: string;
  seats: string;
  make: string;
  model: string;
}

interface CarFiltersProps {
  initial?: Filters;
  onApply: (filters: Filters) => void;
}

const CarFilters: React.FC<CarFiltersProps> = ({ initial, onApply }) => {
  const [fuelType, setFuelType] = useState(initial?.fuelType || "All");
  const [bodyType, setBodyType] = useState(initial?.bodyType || "All");
  const [seats, setSeats] = useState(initial?.seats || "All");
  const [make, setMake] = useState(initial?.make || "All");
  const [model, setModel] = useState(initial?.model || "All");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApply({ fuelType, bodyType, seats, make, model });
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
              <Select value={fuelType} onValueChange={setFuelType}>
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
              <Select value={bodyType} onValueChange={setBodyType}>
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
              <Select value={seats} onValueChange={setSeats}>
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
              <Select value={make} onValueChange={setMake}>
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

            <div>
              <label className="text-sm font-medium text-text-secondary mb-1.5 block">Model</label>
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {MODELS.map(model => (
                      <SelectItem key={model} value={model}>{model}</SelectItem>
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
