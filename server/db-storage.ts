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

      // Fetch subscription cars from Faith Auto - with proper JOINs to get real car data
      const subscriptionQuery = `
        SELECT 
          fc.id,
          fc.seat_number,
          fc.status,
          fc.description,
          fc.subscription_plan1 as price,
          fc.image1,
          fc.image2,
          fc.image3,
          fc.car_id,
          c.registration_no,
          c.year,
          c.currently_located_id,
          vm.model_name,
          vmake.name as make_name,
          vc.name as category_name,
          vf.fuel_type as fuel_type_name,
          loc.location_name,
          'subscription' as car_type
        FROM faithauto_carsubscription fc
        LEFT JOIN app_car c ON fc.car_id = c.id
        LEFT JOIN app_vehiclemodel vm ON c.model_id = vm.id
        LEFT JOIN app_vehiclemake vmake ON vm.make_id = vmake.id
        LEFT JOIN app_vehiclecategory vc ON c.category_id = vc.id
        LEFT JOIN app_vehiclefuel vf ON c.fuel_type_id = vf.id
        LEFT JOIN app_location loc ON c.currently_located_id = loc.id
        ORDER BY fc.created_at DESC
      `;

      const subscriptionResult = await this.pool.query(subscriptionQuery);
      
      const subscriptionCars: Car[] = subscriptionResult.rows.map((row: any) => {
        // Use actual database data from JOINs, with fallbacks only when data is missing
        const dbMake = row.make_name || 'Faith Auto';
        const dbModel = row.model_name || `Subscription Vehicle ${row.car_id || row.id}`;
        const dbCategory = row.category_name || 'SUV';
        const dbFuelType = row.fuel_type_name || 'Petrol';
        const dbYear = row.year || new Date().getFullYear();
        const dbLocation = row.location_name || location || 'Melbourne';
        const dbSeats = row.seat_number || 5;
        
        const dbImage = row.image1 
          ? `https://allpicsandvideos.blob.core.windows.net/rush-car-rental-media/${row.image1}`
          : '/src/assets/car-placeholder.jpg';
        
        // Use 'example' for all subscription cars but store the database ID
        const carId = 'example';
        
        console.log(`Faith Auto Subscription Car - ID: ${row.id}, Make: ${dbMake}, Model: ${dbModel}, Year: ${dbYear}, Price: ${row.price}`);
        console.log(`  Category: ${dbCategory} -> Body Type: ${this.mapBodyType(dbCategory)}`);
        console.log(`  Fuel: ${dbFuelType} -> Mapped: ${this.mapFuelType(dbFuelType)}`);
        console.log(`  Weekly Price: ${Math.round((parseFloat(row.price) || 500) / 13)}`);
        
        return {
          id: carId,
          dbId: row.id, // Store the actual database ID
          make: dbMake,
          model: dbModel,
          year: dbYear,
          fuelType: this.mapFuelType(dbFuelType),
          bodyType: this.mapBodyType(dbCategory),
          seats: dbSeats,
          driveType: this.mapBodyType(dbCategory) === 'SUV' ? 'AWD' : 'FWD',
          weeklyPrice: Math.round((parseFloat(row.price) || 500) / 13), // Convert 3-month price to weekly
          available: !row.status || row.status?.toLowerCase() === 'available',
          status: row.status?.toLowerCase() || 'available',
          isGreatValue: parseFloat(row.price) < 600,
          category: 'subscription',
          location: dbLocation,
          image: dbImage,
          // Add subscription plan prices for proper display
          subscriptionPlans: {
            threeMonth: parseFloat(row.price) || 0,
            sixMonth: 0, // Not available in this basic query
            nineMonth: 0  // Not available in this basic query
          }
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
        
        console.log(`Faith Auto Second-hand Car - Database Year: ${row.year} for ${dbModel}, DB ID: ${row.id}, Status: ${row.status}, Price: ${row.price}`);
        
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
          available: !row.status || ['available', 'active', 'in_stock', 'for_sale'].includes(row.status?.toLowerCase()),
          status: row.status?.toLowerCase() || 'available', // Use database status
          isGreatValue: parseFloat(row.price) < 15000, // Consider under $15k as great value
          category: 'secondhand',
          location: location || 'Melbourne',
          image: dbImage,
          // Add the actual selling price
          actualPrice: parseFloat(row.price) || 0
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
      'electric': 'Electric',
      'lpg': 'LPG'
    };
    return fuelTypeMap[dbFuelType?.toLowerCase()] || dbFuelType || 'Petrol';
  }

  private mapBodyType(categoryName: string): string {
    if (!categoryName) return 'SUV';
    
    const lowerCategory = categoryName.toLowerCase();
    const bodyTypeMap: Record<string, string> = {
      'suv': 'SUV',
      'suv category': 'SUV',
      'sedan': 'Sedan',
      'sedan category': 'Sedan',
      'hatchback': 'Hatchback',
      'hatchback category': 'Hatchback',
      'wagon': 'Wagon',
      'wagon category': 'Wagon',
      'ute': 'Ute',
      'ute category': 'Ute',
      'van': 'Van',
      'van category': 'Van',
      'coupe': 'Coupe',
      'coupe category': 'Coupe',
      'economy': 'Sedan',
      'economy category': 'Sedan',
      'premium': 'Sedan',
      'premium category': 'Sedan',
      'luxury': 'Sedan',
      'luxury category': 'Sedan'
    };
    
    return bodyTypeMap[lowerCategory] || 'SUV';
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

  async getCarByDbId(dbId: string, carType?: 'subscription' | 'secondhand'): Promise<Car | undefined> {
    try {
      // If carType is specified, search that table first
      if (carType === 'secondhand') {
        // Check second-hand cars first
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
            fc.image4,
            fc.image5,
            fc.seat_number,
            vm.model_name,
            vmake.name as make_name,
            vc.name as category_name,
            vf.fuel_type as fuel_type_name,
            loc.location_name,
            'secondhand' as car_type
          FROM faithauto_secondhandcar fc
          LEFT JOIN app_vehiclemodel vm ON fc.model_id = vm.id
          LEFT JOIN app_vehiclemake vmake ON vm.make_id = vmake.id
          LEFT JOIN app_vehiclecategory vc ON fc.vehicle_category_id = vc.id  
          LEFT JOIN app_vehiclefuel vf ON fc.fuel_type_id = vf.id
          LEFT JOIN app_location loc ON fc.location_id = loc.id
          WHERE fc.id = $1
        `;

        const secondHandResult = await this.pool.query(secondHandQuery, [dbId]);
        
        if (secondHandResult.rows.length > 0) {
          const row = secondHandResult.rows[0];
          const dbMake = row.make_name || null;
          const dbModel = row.model_name || null;
          const dbCategory = row.category_name || null;
          const dbFuelType = row.fuel_type_name || null;
          const dbLocation = row.location_name || null;
          
          const dbImages = [
            row.image1 ? `https://allpicsandvideos.blob.core.windows.net/rush-car-rental-media/${row.image1}` : null,
            row.image2 ? `https://allpicsandvideos.blob.core.windows.net/rush-car-rental-media/${row.image2}` : null,
            row.image3 ? `https://allpicsandvideos.blob.core.windows.net/rush-car-rental-media/${row.image3}` : null,
            row.image4 ? `https://allpicsandvideos.blob.core.windows.net/rush-car-rental-media/${row.image4}` : null,
            row.image5 ? `https://allpicsandvideos.blob.core.windows.net/rush-car-rental-media/${row.image5}` : null
          ].filter(Boolean); // Remove null values
          
          const mainImage = dbImages.length > 0 ? dbImages[0] : '/src/assets/car-placeholder.jpg';
          const carId = `secondhand-${row.id}`;
          
          console.log(`Found second-hand car by database ID ${dbId}:`, {
            make: dbMake,
            model: dbModel,
            year: row.year,
            category: dbCategory,
            price: row.price
          });
          
          const car: any = {
            id: carId,
            dbId: row.id,
            make: dbMake,
            model: dbModel,
            year: row.year || null,
            fuelType: dbFuelType ? this.mapFuelType(dbFuelType) : undefined,
            bodyType: dbCategory ? this.mapBodyType(dbCategory) : undefined, 
            seats: row.seat_number || null,
            driveType: dbCategory && this.mapBodyType(dbCategory) === 'SUV' ? 'AWD' : 'FWD',
            weeklyPrice: Math.round((parseFloat(row.price) || 0) / 12),
            available: !row.status || ['available', 'active', 'in_stock', 'for_sale'].includes(row.status?.toLowerCase()),
            status: row.status?.toLowerCase() || 'available',
            isGreatValue: parseFloat(row.price) < 15000,
            category: 'secondhand',
            location: dbLocation,
            image: mainImage,
            images: dbImages, // Add all images for carousel
            description: row.description || `Experience this quality ${row.year || ''} ${dbMake || ''} ${dbModel || ''}`.trim(),
            mileage: row.mileage || 0,
            registrationNumber: row.registration_number,
            // Add the actual selling price
            actualPrice: parseFloat(row.price) || 0
          };
          
          return car;
        }
      } else if (carType === 'subscription') {
        // Check subscription cars first
        const subscriptionQuery = `
          SELECT 
            fc.id,
            fc.seat_number,
            fc.subscription_plan1,
            fc.subscription_plan2,
            fc.subscription_plan3,
            fc.status,
            fc.description,
            fc.image1,
            fc.image2,
            fc.image3,
            fc.image4,
            fc.image5,
            fc.car_id,
            c.registration_no,
            c.year,
            c.currently_located_id,
            vm.model_name,
            vmake.name as make_name,
            vc.name as category_name,
            vf.fuel_type as fuel_type_name,
            loc.location_name,
            'subscription' as car_type
          FROM faithauto_carsubscription fc
          LEFT JOIN app_car c ON fc.car_id = c.id
          LEFT JOIN app_vehiclemodel vm ON c.model_id = vm.id
          LEFT JOIN app_vehiclemake vmake ON vm.make_id = vmake.id
          LEFT JOIN app_vehiclecategory vc ON c.category_id = vc.id
          LEFT JOIN app_vehiclefuel vf ON c.fuel_type_id = vf.id
          LEFT JOIN app_location loc ON c.currently_located_id = loc.id
          WHERE fc.id = $1
        `;

        const subscriptionResult = await this.pool.query(subscriptionQuery, [dbId]);
        
        if (subscriptionResult.rows.length > 0) {
          const row = subscriptionResult.rows[0];
          
          // Use actual database data from JOINs
          const dbMake = row.make_name || 'Faith Auto';
          const dbModel = row.model_name || `Subscription Vehicle ${row.car_id || row.id}`;
          const dbCategory = row.category_name || 'Subscription';
          const dbFuelType = row.fuel_type_name || null;
          const dbYear = row.year || null;
          const dbLocation = row.location_name || null;
          const dbSeats = row.seat_number || null;
          const dbRegistration = row.registration_no || `FAITH-${row.id}`;
          
          const dbImages = [
            row.image1 ? `https://allpicsandvideos.blob.core.windows.net/rush-car-rental-media/${row.image1}` : null,
            row.image2 ? `https://allpicsandvideos.blob.core.windows.net/rush-car-rental-media/${row.image2}` : null,
            row.image3 ? `https://allpicsandvideos.blob.core.windows.net/rush-car-rental-media/${row.image3}` : null,
            row.image4 ? `https://allpicsandvideos.blob.core.windows.net/rush-car-rental-media/${row.image4}` : null,
            row.image5 ? `https://allpicsandvideos.blob.core.windows.net/rush-car-rental-media/${row.image5}` : null
          ].filter(Boolean); // Remove null values
          
          const mainImage = dbImages.length > 0 ? dbImages[0] : '/src/assets/car-placeholder.jpg';
          
          const carId = `subscription-${row.id}`;
          
          console.log(`Found subscription car by database ID ${dbId}:`, {
            make: dbMake,
            model: dbModel,
            year: dbYear,
            fuelType: dbFuelType,
            category: dbCategory,
            location: dbLocation,
            seats: dbSeats,
            registration: dbRegistration,
            subscription_plan1: row.subscription_plan1,
            subscription_plan2: row.subscription_plan2,
            subscription_plan3: row.subscription_plan3,
            images: dbImages
          });
          
          const car: any = {
            id: carId,
            dbId: row.id,
            make: dbMake,
            model: dbModel,
            year: dbYear,
            fuelType: dbFuelType ? this.mapFuelType(dbFuelType) : undefined,
            bodyType: dbCategory ? this.mapBodyType(dbCategory) : undefined,
            seats: dbSeats,
            driveType: dbCategory && this.mapBodyType(dbCategory) === 'SUV' ? 'AWD' : 'FWD',
            weeklyPrice: Math.round((parseFloat(row.subscription_plan1) || 500) / 13), // Convert 3-month price to weekly
            available: !row.status || row.status?.toLowerCase() === 'available',
            status: row.status?.toLowerCase() || 'available',
            isGreatValue: parseFloat(row.subscription_plan1) < 600,
            category: 'subscription',
            location: dbLocation,
            image: mainImage,
            images: dbImages, // Add all images for carousel
            // Add database fields
            description: row.description || `Experience luxury and performance with the ${dbYear || 'latest'} ${dbMake} ${dbModel}.`,
            mileage: 0, // New subscription cars have 0 mileage
            registrationNumber: dbRegistration,
            // Add subscription plan prices
            subscriptionPlans: {
              threeMonth: parseFloat(row.subscription_plan1) || 0,
              sixMonth: parseFloat(row.subscription_plan2) || 0,
              nineMonth: parseFloat(row.subscription_plan3) || 0
            }
          };
          
          return car;
        }
      }

      // If no carType specified or not found in specified table, search both tables (original logic)
      // First, try to find in subscription cars with proper JOINs through app_car
      const subscriptionQuery = `
        SELECT 
          fc.id,
          fc.seat_number,
          fc.subscription_plan1,
          fc.subscription_plan2,
          fc.subscription_plan3,
          fc.status,
          fc.description,
          fc.image1,
          fc.image2,
          fc.image3,
          fc.image4,
          fc.image5,
          fc.car_id,
          c.registration_no,
          c.year,
          c.currently_located_id,
          vm.model_name,
          vmake.name as make_name,
          vc.name as category_name,
          vf.fuel_type as fuel_type_name,
          loc.location_name,
          'subscription' as car_type
        FROM faithauto_carsubscription fc
        LEFT JOIN app_car c ON fc.car_id = c.id
        LEFT JOIN app_vehiclemodel vm ON c.model_id = vm.id
        LEFT JOIN app_vehiclemake vmake ON vm.make_id = vmake.id
        LEFT JOIN app_vehiclecategory vc ON c.category_id = vc.id
        LEFT JOIN app_vehiclefuel vf ON c.fuel_type_id = vf.id
        LEFT JOIN app_location loc ON c.currently_located_id = loc.id
        WHERE fc.id = $1
      `;

      const subscriptionResult = await this.pool.query(subscriptionQuery, [dbId]);
      
      if (subscriptionResult.rows.length > 0) {
        const row = subscriptionResult.rows[0];
        
        // Use actual database data from JOINs
        const dbMake = row.make_name || 'Faith Auto';
        const dbModel = row.model_name || `Subscription Vehicle ${row.car_id || row.id}`;
        const dbCategory = row.category_name || 'Subscription';
        const dbFuelType = row.fuel_type_name || null;
        const dbYear = row.year || null;
        const dbLocation = row.location_name || null;
        const dbSeats = row.seat_number || null;
        const dbRegistration = row.registration_no || `FAITH-${row.id}`;
        
        const dbImages = [
          row.image1 ? `https://allpicsandvideos.blob.core.windows.net/rush-car-rental-media/${row.image1}` : null,
          row.image2 ? `https://allpicsandvideos.blob.core.windows.net/rush-car-rental-media/${row.image2}` : null,
          row.image3 ? `https://allpicsandvideos.blob.core.windows.net/rush-car-rental-media/${row.image3}` : null,
          row.image4 ? `https://allpicsandvideos.blob.core.windows.net/rush-car-rental-media/${row.image4}` : null,
          row.image5 ? `https://allpicsandvideos.blob.core.windows.net/rush-car-rental-media/${row.image5}` : null
        ].filter(Boolean); // Remove null values
        
        const mainImage = dbImages.length > 0 ? dbImages[0] : '/src/assets/car-placeholder.jpg';
        
        const carId = `subscription-${row.id}`;
        
        console.log(`Found subscription car by database ID ${dbId}:`, {
          make: dbMake,
          model: dbModel,
          year: dbYear,
          fuelType: dbFuelType,
          category: dbCategory,
          location: dbLocation,
          seats: dbSeats,
          registration: dbRegistration,
          subscription_plan1: row.subscription_plan1,
          subscription_plan2: row.subscription_plan2,
          subscription_plan3: row.subscription_plan3,
          images: dbImages
        });
        
        const car: any = {
          id: carId,
          dbId: row.id,
          make: dbMake,
          model: dbModel,
          year: dbYear,
          fuelType: dbFuelType ? this.mapFuelType(dbFuelType) : undefined,
          bodyType: dbCategory ? this.mapBodyType(dbCategory) : undefined,
          seats: dbSeats,
          driveType: dbCategory && this.mapBodyType(dbCategory) === 'SUV' ? 'AWD' : 'FWD',
          weeklyPrice: Math.round((parseFloat(row.subscription_plan1) || 500) / 13), // Convert 3-month price to weekly
          available: !row.status || row.status?.toLowerCase() === 'available',
          status: row.status?.toLowerCase() || 'available',
          isGreatValue: parseFloat(row.subscription_plan1) < 600,
          category: 'subscription',
          location: dbLocation,
          image: mainImage,
          images: dbImages, // Add all images for carousel
          // Add database fields
          description: row.description || `Experience luxury and performance with the ${dbYear || 'latest'} ${dbMake} ${dbModel}.`,
          mileage: 0, // New subscription cars have 0 mileage
          registrationNumber: dbRegistration,
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
          fc.image4,
          fc.image5,
          fc.seat_number,
          vm.model_name,
          vmake.name as make_name,
          vc.name as category_name,
          vf.fuel_type as fuel_type_name,
          loc.location_name,
          'secondhand' as car_type
        FROM faithauto_secondhandcar fc
        LEFT JOIN app_vehiclemodel vm ON fc.model_id = vm.id
        LEFT JOIN app_vehiclemake vmake ON vm.make_id = vmake.id
        LEFT JOIN app_vehiclecategory vc ON fc.vehicle_category_id = vc.id  
        LEFT JOIN app_vehiclefuel vf ON fc.fuel_type_id = vf.id
        LEFT JOIN app_location loc ON fc.location_id = loc.id
        WHERE fc.id = $1
      `;

      const secondHandResult = await this.pool.query(secondHandQuery, [dbId]);
      
      if (secondHandResult.rows.length > 0) {
        const row = secondHandResult.rows[0];
        const dbMake = row.make_name || null;
        const dbModel = row.model_name || null;
        const dbCategory = row.category_name || null;
        const dbFuelType = row.fuel_type_name || null;
        const dbLocation = row.location_name || null;
        
        const dbImages = [
          row.image1 ? `https://allpicsandvideos.blob.core.windows.net/rush-car-rental-media/${row.image1}` : null,
          row.image2 ? `https://allpicsandvideos.blob.core.windows.net/rush-car-rental-media/${row.image2}` : null,
          row.image3 ? `https://allpicsandvideos.blob.core.windows.net/rush-car-rental-media/${row.image3}` : null,
          row.image4 ? `https://allpicsandvideos.blob.core.windows.net/rush-car-rental-media/${row.image4}` : null,
          row.image5 ? `https://allpicsandvideos.blob.core.windows.net/rush-car-rental-media/${row.image5}` : null
        ].filter(Boolean); // Remove null values
        
        const mainImage = dbImages.length > 0 ? dbImages[0] : '/src/assets/car-placeholder.jpg';
        const carId = `secondhand-${row.id}`;
        
        const car: any = {
          id: carId,
          dbId: row.id,
          make: dbMake,
          model: dbModel,
          year: row.year || null,
          fuelType: dbFuelType ? this.mapFuelType(dbFuelType) : undefined,
          bodyType: dbCategory ? this.mapBodyType(dbCategory) : undefined, 
          seats: row.seat_number || null,
          driveType: dbCategory && this.mapBodyType(dbCategory) === 'SUV' ? 'AWD' : 'FWD',
          weeklyPrice: Math.round((parseFloat(row.price) || 0) / 12),
          available: !row.status || ['available', 'active', 'in_stock', 'for_sale'].includes(row.status?.toLowerCase()),
          status: row.status?.toLowerCase() || 'available',
          isGreatValue: parseFloat(row.price) < 15000,
          category: dbCategory,
          location: dbLocation,
          image: mainImage,
          images: dbImages, // Add all images for carousel
          description: row.description || `Experience this quality ${row.year || ''} ${dbMake || ''} ${dbModel || ''}`.trim(),
          mileage: row.mileage || 0,
          registrationNumber: row.registration_number,
          // Add the actual selling price
          actualPrice: parseFloat(row.price) || 0
        };
        
        return car;
      }
      
      console.log(`Car not found with database ID: ${dbId}. Searched in both subscription and second-hand tables.`);
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