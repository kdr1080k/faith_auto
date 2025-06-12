import { Car as BaseCar } from "@shared/schema";

export interface Car extends BaseCar {
  description?: string;
  highlights?: string[];
  mileage?: number;
  subscriptionPlans?: {
    threeMonth: number;
    sixMonth: number;
    nineMonth: number;
  };
}

// Use this type for the example car that includes all optional fields
export interface FullCar extends Required<Omit<Car, 'subscriptionPlans' | 'mileage'>> {
  subscriptionPlans?: Car['subscriptionPlans'];
  mileage?: Car['mileage'];
} 