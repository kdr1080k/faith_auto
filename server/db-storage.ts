import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { eq, sql } from 'drizzle-orm';
import {
  users, type User, type InsertUser,
  cars, type Car, type InsertCar,
  features, type Feature, type InsertFeature,
  subscriptionPlans, type SubscriptionPlan, type InsertSubscriptionPlan
} from "@shared/schema";
import type { IStorage } from './storage';

export class DbStorage implements IStorage {
  private db;
  private pool;

  constructor() {
    // Use the provided database configuration
    this.pool = new Pool({
      user: 'melbournerushcarrental',
      password: 'rushrcm@250401',
      host: 'all-data-for-sql.postgres.database.azure.com',
      database: 'rush-website-and-management-system',
      port: 5432,
      ssl: {
        rejectUnauthorized: true
      }
    });
    this.db = drizzle(this.pool);
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await this.db.insert(users).values(user).returning();
    return result[0];
  }

  // Car methods - Updated to use actual database table
  async getCars(category?: string, location?: string): Promise<Car[]> {
    try {
      let allCars: Car[] = [];

      // Fetch subscription cars from Faith Auto with proper JOINs
      const subscriptionQuery = `
        SELECT 
          fc.id,
          fc.registration_number,
          fc.year,
          fc.mileage,
          fc.status,
          fc.description,
          fc.subscription_plan1 as price,
          fc.image1,
          fc.image2,
          fc.image3,
          vm.model_name,
          vmake.name as make_name,
          vc.name as category_name,
          vf.fuel_type as fuel_type_name,
          'subscription' as car_type
        FROM faithauto_carsubscription fc
        LEFT JOIN app_vehiclemodel vm ON fc.model_id = vm.id
        LEFT JOIN app_vehiclemake vmake ON vm.make_id = vmake.id
        LEFT JOIN app_vehiclecategory vc ON fc.vehicle_category_id = vc.id  
        LEFT JOIN app_vehiclefuel vf ON fc.fuel_type_id = vf.id
        ORDER BY fc.created_at DESC
      `;

      const subscriptionResult = await this.pool.query(subscriptionQuery);
      
      const subscriptionCars: Car[] = subscriptionResult.rows.map((row: any) => {
        // Use actual database data with fallbacks
        const dbMake = row.make_name || 'Faith Auto';
        const dbModel = row.model_name || `Vehicle ${row.registration_number}`;
        const dbCategory = row.category_name || 'Standard';
        const dbFuelType = row.fuel_type_name || 'Petrol';
        const dbImage = row.image1 
          ? `https://allpicsandvideos.blob.core.windows.net/rush-car-rental-media/${row.image1}`
          : '/src/assets/car-placeholder.jpg';
        
        // Use 'example' for all subscription cars but store the database ID
        const carId = 'example';
        
        console.log(`Faith Auto Subscription Car - Database Year: ${row.year} for ${dbModel}, dbId: ${row.id}`);
        
        return {
          id: carId,
          dbId: row.id, // Store the actual database ID
          make: dbMake,
          model: dbModel,
          year: row.year || new Date().getFullYear(), // Use actual database year or current year as fallback
          fuelType: this.mapFuelType(dbFuelType),
          bodyType: this.mapBodyType(dbCategory),
          seats: 5,
          driveType: 'FWD',
          weeklyPrice: Math.round((parseFloat(row.price) || 0) / 3), // Convert 3-month price to monthly
          available: row.status?.toLowerCase() === 'available' || row.status?.toLowerCase() === 'active',
          status: row.status?.toLowerCase() || 'available', // Use database status
          isGreatValue: parseFloat(row.price) < 300,
          category: 'subscription',
          location: location || 'Melbourne',
          image: dbImage
        };
      });

      // Fetch second-hand cars with proper JOINs
      const secondHandQuery = `
        SELECT 
          fc.id,
          fc.registration_number,
          fc.year,
          fc.mileage,
          fc.status,
          fc.description,
          fc.price,
          fc.image1,
          fc.image2,
          fc.image3,
          vm.model_name,
          vmake.name as make_name,
          vc.name as category_name,
          vf.fuel_type as fuel_type_name,
          'secondhand' as car_type
        FROM faithauto_secondhandcar fc
        LEFT JOIN app_vehiclemodel vm ON fc.model_id = vm.id
        LEFT JOIN app_vehiclemake vmake ON vm.make_id = vmake.id
        LEFT JOIN app_vehiclecategory vc ON fc.vehicle_category_id = vc.id  
        LEFT JOIN app_vehiclefuel vf ON fc.fuel_type_id = vf.id
        WHERE fc.status = 'available'
        ORDER BY fc.created_at DESC
      `;

      const secondHandResult = await this.pool.query(secondHandQuery);
      
      const secondHandCars: Car[] = secondHandResult.rows.map((row: any) => {
        // Use actual database data with fallbacks
        const dbMake = row.make_name || 'Used Vehicle';
        const dbModel = row.model_name || `Vehicle ${row.registration_number}`;
        const dbCategory = row.category_name || 'Standard';
        const dbFuelType = row.fuel_type_name || 'Petrol';
        const dbImage = row.image1 
          ? `https://allpicsandvideos.blob.core.windows.net/rush-car-rental-media/${row.image1}`
          : '/src/assets/car-placeholder.jpg';
        
        const carId = `secondhand-${row.id}`;
        
        console.log(`Faith Auto Second-hand Car - Database Year: ${row.year} for ${dbModel}`);
        
        return {
          id: carId,
          dbId: row.id, // Store the actual database ID
          make: dbMake,
          model: dbModel,
          year: row.year || new Date().getFullYear(), // Use actual database year or current year as fallback
          fuelType: this.mapFuelType(dbFuelType),
          bodyType: this.mapBodyType(dbCategory), 
          seats: 5,
          driveType: 'FWD',
          weeklyPrice: Math.round((parseFloat(row.price) || 0) / 12), // Convert annual price to monthly
          available: row.status?.toLowerCase() === 'available' || row.status?.toLowerCase() === 'active',
          status: row.status?.toLowerCase() || 'available', // Use database status
          isGreatValue: parseFloat(row.price) < 15000, // Consider under $15k as great value
          category: 'secondhand',
          location: location || 'Melbourne',
          image: dbImage
        };
      });

      // Combine both types of cars
      allCars = [...subscriptionCars, ...secondHandCars];

      // Apply category filtering
      if (category) {
        allCars = allCars.filter(car => car.category === category);
      }

      console.log(`Fetched ${subscriptionCars.length} subscription cars and ${secondHandCars.length} second-hand cars from database`);
      return allCars;
    } catch (error) {
      console.error('Error fetching cars from database:', error);
      return [];
    }
  }

  // Helper methods to map database values to our expected format
  private mapFuelType(dbFuelType: string): string {
    const fuelTypeMap: Record<string, string> = {
      'petrol': 'Petrol',
      'diesel': 'Diesel', 
      'hybrid': 'Hybrid',
      'electric': 'Electric'
    };
    return fuelTypeMap[dbFuelType?.toLowerCase()] || 'Petrol';
  }

  private mapBodyType(categoryName: string): string {
    const bodyTypeMap: Record<string, string> = {
      'suv': 'SUV',
      'sedan': 'Sedan',
      'hatchback': 'Hatchback',
      'wagon': 'Wagon',
      'ute': 'Ute',
      'van': 'Van',
      'coupe': 'Coupe'
    };
    return bodyTypeMap[categoryName?.toLowerCase()] || 'SUV';
  }

  private capitalizeFirst(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  private generateCarInfo(id: number, registrationNumber: string): {
    make: string;
    model: string;
    year: number;
    fuelType: string;
    bodyType: string;
    seats: number;
    driveType: string;
  } {
    // Create realistic car variations based on ID to ensure consistency
    const carVariations = [
      { make: 'Toyota', model: 'Camry', bodyType: 'Sedan', fuelType: 'Petrol', seats: 5, year: 2020 },
      { make: 'Honda', model: 'Civic', bodyType: 'Sedan', fuelType: 'Petrol', seats: 5, year: 2019 },
      { make: 'Mazda', model: 'CX-5', bodyType: 'SUV', fuelType: 'Petrol', seats: 5, year: 2021 },
      { make: 'Nissan', model: 'X-Trail', bodyType: 'SUV', fuelType: 'Petrol', seats: 7, year: 2020 },
      { make: 'Hyundai', model: 'i30', bodyType: 'Hatchback', fuelType: 'Petrol', seats: 5, year: 2021 },
      { make: 'Subaru', model: 'Forester', bodyType: 'SUV', fuelType: 'Petrol', seats: 5, year: 2020 },
      { make: 'Volkswagen', model: 'Golf', bodyType: 'Hatchback', fuelType: 'Petrol', seats: 5, year: 2019 },
      { make: 'Ford', model: 'Focus', bodyType: 'Hatchback', fuelType: 'Petrol', seats: 5, year: 2018 },
      { make: 'Kia', model: 'Cerato', bodyType: 'Sedan', fuelType: 'Petrol', seats: 5, year: 2020 },
      { make: 'Mitsubishi', model: 'Outlander', bodyType: 'SUV', fuelType: 'Petrol', seats: 7, year: 2019 }
    ];

    // Use ID to consistently select the same car for the same database record
    const selectedCar = carVariations[id % carVariations.length];
    
    return {
      ...selectedCar,
      driveType: selectedCar.bodyType === 'SUV' ? 'AWD' : 'FWD'
    };
  }

  async getCarById(id: string): Promise<Car | undefined> {
    try {
      // Get all cars and find by ID
      const allCars = await this.getCars();
      const car = allCars.find(c => c.id === id);
      
      if (car) {
        console.log(`Found car by ID ${id}:`, car);
        return car;
      }
      
      console.log(`Car not found with ID: ${id}`);
      return undefined;
    } catch (error) {
      console.error('Error fetching car by ID:', error);
      return undefined;
    }
  }

  async getCarByDbId(dbId: string): Promise<Car | undefined> {
    try {
      // First check if it's a subscription car and get subscription plan prices
      const subscriptionQuery = `
        SELECT 
          fc.id,
          fc.registration_number,
          fc.year,
          fc.mileage,
          fc.status,
          fc.description,
          fc.subscription_plan1,
          fc.subscription_plan2,
          fc.subscription_plan3,
          fc.image1,
          fc.image2,
          fc.image3,
          vm.model_name,
          vmake.name as make_name,
          vc.name as category_name,
          vf.fuel_type as fuel_type_name,
          'subscription' as car_type
        FROM faithauto_carsubscription fc
        LEFT JOIN app_vehiclemodel vm ON fc.model_id = vm.id
        LEFT JOIN app_vehiclemake vmake ON vm.make_id = vmake.id
        LEFT JOIN app_vehiclecategory vc ON fc.vehicle_category_id = vc.id  
        LEFT JOIN app_vehiclefuel vf ON fc.fuel_type_id = vf.id
        WHERE fc.id = $1
      `;

      const subscriptionResult = await this.pool.query(subscriptionQuery, [dbId]);
      
      if (subscriptionResult.rows.length > 0) {
        const row = subscriptionResult.rows[0];
        const dbMake = row.make_name || 'Faith Auto';
        const dbModel = row.model_name || `Vehicle ${row.registration_number}`;
        const dbCategory = row.category_name || 'Standard';
        const dbFuelType = row.fuel_type_name || 'Petrol';
        const dbImage = row.image1 
          ? `https://allpicsandvideos.blob.core.windows.net/rush-car-rental-media/${row.image1}`
          : '/src/assets/car-placeholder.jpg';
        
        const carId = `subscription-${row.id}`;
        
        console.log(`Found subscription car by database ID ${dbId}:`, {
          subscription_plan1: row.subscription_plan1,
          subscription_plan2: row.subscription_plan2,
          subscription_plan3: row.subscription_plan3
        });
        
        const car: any = {
          id: carId,
          dbId: row.id,
          make: dbMake,
          model: dbModel.replace(' (Subscription)', ''), // Remove suffix for cleaner display
          year: row.year || new Date().getFullYear(),
          fuelType: this.mapFuelType(dbFuelType),
          bodyType: this.mapBodyType(dbCategory), 
          seats: 5,
          driveType: 'FWD',
          weeklyPrice: Math.round((parseFloat(row.subscription_plan2) || 0) / 26), // Use 6-month price as base weekly rate
          available: true, // Always show subscription cars as available
          status: this.capitalizeFirst(row.status) || 'Available',
          isGreatValue: parseFloat(row.subscription_plan1) < 30000,
          category: 'subscription',
          location: 'Brisbane',
          image: dbImage,
          // Add database fields
          description: row.description || `Experience luxury and performance with the ${row.year} ${dbMake} ${dbModel}.`,
          mileage: row.mileage || 0,
          // Add subscription plan prices
          subscriptionPlans: {
            threeMonth: parseFloat(row.subscription_plan1) || 0,
            sixMonth: parseFloat(row.subscription_plan2) || 0,
            nineMonth: parseFloat(row.subscription_plan3) || 0
          }
        };
        
        return car;
      }
      
      // If not found in subscription cars, check second-hand cars
      const secondHandQuery = `
        SELECT 
          fc.id,
          fc.registration_number,
          fc.year,
          fc.mileage,
          fc.status,
          fc.description,
          fc.price,
          fc.image1,
          fc.image2,
          fc.image3,
          vm.model_name,
          vmake.name as make_name,
          vc.name as category_name,
          vf.fuel_type as fuel_type_name,
          'secondhand' as car_type
        FROM faithauto_secondhandcar fc
        LEFT JOIN app_vehiclemodel vm ON fc.model_id = vm.id
        LEFT JOIN app_vehiclemake vmake ON vm.make_id = vmake.id
        LEFT JOIN app_vehiclecategory vc ON fc.vehicle_category_id = vc.id  
        LEFT JOIN app_vehiclefuel vf ON fc.fuel_type_id = vf.id
        WHERE fc.id = $1
      `;

      const secondHandResult = await this.pool.query(secondHandQuery, [dbId]);
      
      if (secondHandResult.rows.length > 0) {
        const row = secondHandResult.rows[0];
        const dbMake = row.make_name || 'Used Vehicle';
        const dbModel = row.model_name || `Vehicle ${row.registration_number}`;
        const dbCategory = row.category_name || 'Standard';
        const dbFuelType = row.fuel_type_name || 'Petrol';
        const dbImage = row.image1 
          ? `https://allpicsandvideos.blob.core.windows.net/rush-car-rental-media/${row.image1}`
          : '/src/assets/car-placeholder.jpg';
        
        const carId = `secondhand-${row.id}`;
        
        const car: Car = {
          id: carId,
          dbId: row.id,
          make: dbMake,
          model: dbModel,
          year: row.year || new Date().getFullYear(),
          fuelType: this.mapFuelType(dbFuelType),
          bodyType: this.mapBodyType(dbCategory), 
          seats: 5,
          driveType: 'FWD',
          weeklyPrice: Math.round((parseFloat(row.price) || 0) / 12),
          available: row.status?.toLowerCase() === 'available' || row.status?.toLowerCase() === 'active',
          status: row.status?.toLowerCase() || 'available', // Use database status
          isGreatValue: parseFloat(row.price) < 15000, // Consider under $15k as great value
          category: 'secondhand',
          location: 'Melbourne',
          image: dbImage
        };
        
        return car;
      }
      
      console.log(`Car not found with database ID: ${dbId}`);
      return undefined;
    } catch (error) {
      console.error('Error fetching car by database ID:', error);
      return undefined;
    }
  }

  async createCar(car: InsertCar): Promise<Car> {
    const result = await this.db.insert(cars).values(car).returning();
    return result[0];
  }

  // Feature methods
  async getFeaturesByCarId(carId: string): Promise<Feature[]> {
    return await this.db.select().from(features).where(eq(features.carId, carId));
  }

  async createFeature(feature: InsertFeature): Promise<Feature> {
    const result = await this.db.insert(features).values(feature).returning();
    return result[0];
  }

  // Subscription plan methods
  async getSubscriptionPlansByCarId(carId: string): Promise<SubscriptionPlan[]> {
    return await this.db.select().from(subscriptionPlans).where(eq(subscriptionPlans.carId, carId));
  }

  async createSubscriptionPlan(plan: InsertSubscriptionPlan): Promise<SubscriptionPlan> {
    const result = await this.db.insert(subscriptionPlans).values(plan).returning();
    return result[0];
  }
} 