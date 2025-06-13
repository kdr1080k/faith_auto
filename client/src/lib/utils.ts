import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const cities = [
  "Brisbane",
  "Sydney",
  "Melbourne",
  "Adelaide",
  "Perth"
];

export const fuelTypes = [
  "All",
  "Petrol",
  "Diesel",
  "Hybrid"
];

export const bodyTypes = [
  "All",
  "Sedan",
  "SUV",
  "Hatchback",
  "Wagon",
  "Ute"
];

export const seatOptions = [
  { value: "all", label: "All" },
  { value: "2", label: "2 Seats" },
  { value: "4", label: "4 Seats" },
  { value: "5", label: "5 Seats" },
  { value: "7", label: "7 Seats" },
  { value: "8", label: "8+ Seats" }
];

export const getCarImageUrl = (carId: string): string => {
  // In a real application, this would return actual URLs for each car
  switch (carId) {
    case 'example':
      return "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500";
    case 'smart-1':
      return "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500";
    case 'smart-3':
      return "https://images.unsplash.com/photo-1582639510494-c80b5de9f148?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500";
    case 'hyundai-venue':
      return "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500";
    case 'nissan-xtrail':
      return "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500";
    case 'toyota-yaris-cross':
      return "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500";
    case 'suzuki-swift':
      return "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500";
    default:
      return "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500";
  }
};

export function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}
