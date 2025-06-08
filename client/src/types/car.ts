import { Car as BaseCar } from "@shared/schema";

export interface Car extends BaseCar {
  description?: string;
  highlights?: string[];
}

// Use this type for the example car that includes all optional fields
export interface FullCar extends Required<Car> {} 