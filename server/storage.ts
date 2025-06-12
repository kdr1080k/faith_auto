import { 
  users, type User, type InsertUser, 
  cars, type Car, type InsertCar,
  features, type Feature, type InsertFeature,
  subscriptionPlans, type SubscriptionPlan, type InsertSubscriptionPlan
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Car methods
  getCars(category?: string, location?: string): Promise<Car[]>;
  getCarById(id: string): Promise<Car | undefined>;
  createCar(car: InsertCar): Promise<Car>;
  
  // Feature methods
  getFeaturesByCarId(carId: string): Promise<Feature[]>;
  createFeature(feature: InsertFeature): Promise<Feature>;
  
  // Subscription plan methods
  getSubscriptionPlansByCarId(carId: string): Promise<SubscriptionPlan[]>;
  createSubscriptionPlan(plan: InsertSubscriptionPlan): Promise<SubscriptionPlan>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private cars: Map<string, Car>;
  private features: Map<number, Feature>;
  private subscriptionPlans: Map<number, SubscriptionPlan>;
  
  private userId: number;
  private featureId: number;
  private subscriptionPlanId: number;

  constructor() {
    this.users = new Map();
    this.cars = new Map();
    this.features = new Map();
    this.subscriptionPlans = new Map();
    
    this.userId = 1;
    this.featureId = 1;
    this.subscriptionPlanId = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Car methods
  async getCars(category?: string, location?: string): Promise<Car[]> {
    let result = Array.from(this.cars.values());
    
    if (category) {
      result = result.filter(car => car.category === category);
    }
    
    if (location) {
      result = result.filter(car => car.location === location);
    }
    
    return result;
  }

  async getCarById(id: string): Promise<Car | undefined> {
    return this.cars.get(id);
  }

  async createCar(car: InsertCar): Promise<Car> {
    const newCar: Car = { ...car };
    this.cars.set(car.id, newCar);
    return newCar;
  }

  // Feature methods
  async getFeaturesByCarId(carId: string): Promise<Feature[]> {
    return Array.from(this.features.values()).filter(
      (feature) => feature.carId === carId
    );
  }

  async createFeature(feature: InsertFeature): Promise<Feature> {
    const id = this.featureId++;
    const newFeature: Feature = { ...feature, id };
    this.features.set(id, newFeature);
    return newFeature;
  }

  // Subscription plan methods
  async getSubscriptionPlansByCarId(carId: string): Promise<SubscriptionPlan[]> {
    return Array.from(this.subscriptionPlans.values()).filter(
      (plan) => plan.carId === carId
    );
  }

  async createSubscriptionPlan(plan: InsertSubscriptionPlan): Promise<SubscriptionPlan> {
    const id = this.subscriptionPlanId++;
    const newPlan: SubscriptionPlan = { ...plan, id };
    this.subscriptionPlans.set(id, newPlan);
    return newPlan;
  }

  // Initialize with sample data for development
  private initializeSampleData() {
    // Sample cars
    const sampleCars: InsertCar[] = [
      {
        id: "smart-1",
        make: "Smart",
        model: "#1",
        year: 2023,
        fuelType: "Electric",
        bodyType: "SUV",
        seats: 5,
        driveType: "RWD",
        weeklyPrice: 289,
        available: true,
        isGreatValue: true,
        category: "smart",
        location: "Brisbane"
      },
      {
        id: "smart-3",
        make: "Smart",
        model: "#3",
        year: 2023,
        fuelType: "Electric",
        bodyType: "SUV",
        seats: 5,
        driveType: "AWD",
        weeklyPrice: 299,
        available: true,
        isGreatValue: true,
        category: "smart",
        location: "Melbourne"
      },
      {
        id: "hyundai-venue",
        make: "Hyundai",
        model: "Venue",
        year: 2024,
        fuelType: "Petrol",
        bodyType: "SUV",
        seats: 5,
        driveType: "FWD",
        weeklyPrice: 230,
        available: true,
        isGreatValue: true,
        category: "standard",
        location: "Sydney"
      },
      {
        id: "nissan-xtrail",
        make: "Nissan",
        model: "X-Trail",
        year: 2023,
        fuelType: "Petrol",
        bodyType: "SUV",
        seats: 7,
        driveType: "AWD",
        weeklyPrice: 260,
        available: true,
        isGreatValue: false,
        category: "standard",
        location: "Perth"
      },
      {
        id: "toyota-yaris-cross",
        make: "Toyota",
        model: "Yaris Cross Hybrid",
        year: 2023,
        fuelType: "Hybrid",
        bodyType: "SUV",
        seats: 5,
        driveType: "FWD",
        weeklyPrice: 279,
        available: true,
        isGreatValue: false,
        category: "standard",
        location: "Adelaide"
      },
      {
        id: "suzuki-swift",
        make: "Suzuki",
        model: "Swift",
        year: 2023,
        fuelType: "Petrol",
        bodyType: "Hatchback",
        seats: 5,
        driveType: "FWD",
        weeklyPrice: 280,
        available: true,
        isGreatValue: false,
        category: "standard",
        location: "Brisbane"
      },
      {
        id: "toyota-camry",
        make: "Toyota",
        model: "Camry",
        year: 2023,
        fuelType: "Hybrid",
        bodyType: "Sedan",
        seats: 5,
        driveType: "FWD",
        weeklyPrice: 290,
        available: true,
        isGreatValue: true,
        category: "standard",
        location: "Melbourne"
      },
      {
        id: "tesla-model3",
        make: "Tesla",
        model: "Model 3",
        year: 2023,
        fuelType: "Electric",
        bodyType: "Sedan",
        seats: 5,
        driveType: "RWD",
        weeklyPrice: 320,
        available: true,
        isGreatValue: true,
        category: "premium",
        location: "Sydney"
      },
      {
        id: "mazda-cx5",
        make: "Mazda",
        model: "CX-5",
        year: 2023,
        fuelType: "Petrol",
        bodyType: "SUV",
        seats: 5,
        driveType: "AWD",
        weeklyPrice: 275,
        available: true,
        isGreatValue: false,
        category: "standard",
        location: "Perth"
      },
      {
        id: "volkswagen-golf",
        make: "Volkswagen",
        model: "Golf",
        year: 2023,
        fuelType: "Petrol",
        bodyType: "Hatchback",
        seats: 5,
        driveType: "FWD",
        weeklyPrice: 265,
        available: true,
        isGreatValue: true,
        category: "standard",
        location: "Adelaide"
      },
      {
        id: "kia-carnival",
        make: "Kia",
        model: "Carnival",
        year: 2023,
        fuelType: "Petrol",
        bodyType: "Van",
        seats: 7,
        driveType: "FWD",
        weeklyPrice: 310,
        available: true,
        isGreatValue: false,
        category: "standard",
        location: "Brisbane"
      },
      {
        id: "ford-ranger",
        make: "Ford",
        model: "Ranger",
        year: 2023,
        fuelType: "Diesel",
        bodyType: "Ute",
        seats: 5,
        driveType: "4WD",
        weeklyPrice: 295,
        available: true,
        isGreatValue: true,
        category: "commercial",
        location: "Melbourne"
      }
    ];

    // Add all sample cars
    for (const car of sampleCars) {
      this.createCar(car);
    }

    // Sample features for Hyundai Venue
    const hyundaiFeatures: InsertFeature[] = [
      { carId: "hyundai-venue", name: "ABS Brakes", icon: "shield-alt" },
      { carId: "hyundai-venue", name: "Android Auto", icon: "android" },
      { carId: "hyundai-venue", name: "Apple CarPlay", icon: "apple" },
      { carId: "hyundai-venue", name: "Child Seat Anchors", icon: "child" },
      { carId: "hyundai-venue", name: "Cruise Control", icon: "tachometer-alt" },
      { carId: "hyundai-venue", name: "Power Mirrors", icon: "adjust" },
      { carId: "hyundai-venue", name: "Reversing Camera", icon: "video" }
    ];

    // Sample features for Smart #1
    const smart1Features: InsertFeature[] = [
      { carId: "smart-1", name: "ABS Brakes", icon: "shield-alt" },
      { carId: "smart-1", name: "Android Auto", icon: "android" },
      { carId: "smart-1", name: "Apple CarPlay", icon: "apple" },
      { carId: "smart-1", name: "360° Camera", icon: "video" },
      { carId: "smart-1", name: "Adaptive Cruise Control", icon: "tachometer-alt" },
      { carId: "smart-1", name: "Heated Seats", icon: "fire" },
      { carId: "smart-1", name: "Voice Control", icon: "microphone" }
    ];

    // Sample features for Smart #3
    const smart3Features: InsertFeature[] = [
      { carId: "smart-3", name: "ABS Brakes", icon: "shield-alt" },
      { carId: "smart-3", name: "Android Auto", icon: "android" },
      { carId: "smart-3", name: "Apple CarPlay", icon: "apple" },
      { carId: "smart-3", name: "360° Camera", icon: "video" },
      { carId: "smart-3", name: "Adaptive Cruise Control", icon: "tachometer-alt" },
      { carId: "smart-3", name: "Heated Seats", icon: "fire" },
      { carId: "smart-3", name: "Voice Control", icon: "microphone" }
    ];

    // Sample features for Nissan X-Trail
    const nissanFeatures: InsertFeature[] = [
      { carId: "nissan-xtrail", name: "ABS Brakes", icon: "shield-alt" },
      { carId: "nissan-xtrail", name: "Android Auto", icon: "android" },
      { carId: "nissan-xtrail", name: "Apple CarPlay", icon: "apple" },
      { carId: "nissan-xtrail", name: "Child Seat Anchors", icon: "child" },
      { carId: "nissan-xtrail", name: "Cruise Control", icon: "tachometer-alt" },
      { carId: "nissan-xtrail", name: "Power Tailgate", icon: "door-open" }
    ];

    // Add all sample features
    for (const feature of [...hyundaiFeatures, ...smart1Features, ...smart3Features, ...nissanFeatures]) {
      this.createFeature(feature);
    }

    // Sample subscription plans
    const samplePlans: InsertSubscriptionPlan[] = [
      // Hyundai Venue plans
      {
        carId: "hyundai-venue",
        weeklyPrice: 230,
        bond: 500,
        minimumTerm: "4 months",
        weeklyKm: 385,
        primaryDrivers: 1
      },
      {
        carId: "hyundai-venue",
        weeklyPrice: 250,
        bond: 500,
        minimumTerm: "2 months",
        weeklyKm: 385,
        primaryDrivers: 1
      },
      // Smart #1 plans
      {
        carId: "smart-1",
        weeklyPrice: 289,
        bond: 750,
        minimumTerm: "4 months",
        weeklyKm: 385,
        primaryDrivers: 1
      },
      {
        carId: "smart-1",
        weeklyPrice: 309,
        bond: 750,
        minimumTerm: "2 months",
        weeklyKm: 500,
        primaryDrivers: 2
      },
      // Smart #3 plans
      {
        carId: "smart-3",
        weeklyPrice: 299,
        bond: 750,
        minimumTerm: "4 months",
        weeklyKm: 385,
        primaryDrivers: 1
      },
      {
        carId: "smart-3",
        weeklyPrice: 319,
        bond: 750,
        minimumTerm: "2 months",
        weeklyKm: 500,
        primaryDrivers: 2
      },
      // Nissan X-Trail plans
      {
        carId: "nissan-xtrail",
        weeklyPrice: 260,
        bond: 600,
        minimumTerm: "3 months",
        weeklyKm: 385,
        primaryDrivers: 1
      }
    ];

    // Add all sample subscription plans
    for (const plan of samplePlans) {
      this.createSubscriptionPlan(plan);
    }
  }
}

import { DbStorage } from './db-storage';

// Use database storage to fetch real Faith Auto/Rush data
export const storage = new DbStorage();
