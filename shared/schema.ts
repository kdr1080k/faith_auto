import { pgTable, text, serial, integer, boolean, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const cars = pgTable("cars", {
  id: varchar("id").primaryKey(), // e.g., "smart-1", "hyundai-venue"
  dbId: integer("db_id"), // Original database ID for reference
  make: text("make").notNull(), // e.g., "Smart", "Hyundai"
  model: text("model").notNull(), // e.g., "#1", "Venue"
  year: integer("year").notNull(),
  fuelType: text("fuel_type").notNull(), // Petrol, Diesel, Electric, Hybrid
  bodyType: text("body_type").notNull(), // SUV, Sedan, Hatchback, etc.
  seats: integer("seats").notNull(),
  driveType: text("drive_type").notNull(), // FWD, RWD, AWD
  weeklyPrice: integer("weekly_price").notNull(), // in dollars, e.g., 289
  available: boolean("available").notNull().default(true),
  status: text("status").notNull().default("available"), // Database status: available, unavailable, sold, etc.
  isGreatValue: boolean("is_great_value").notNull().default(false),
  category: text("category").notNull(), // e.g., "smart", "standard"
  location: text("location").notNull(), // City - Brisbane, Sydney, etc.
  image: text("image"), // URL to car image
});

export const features = pgTable("features", {
  id: serial("id").primaryKey(),
  carId: varchar("car_id").notNull().references(() => cars.id),
  name: text("name").notNull(), // "ABS Brakes", "Apple CarPlay", etc.
  icon: text("icon").notNull(), // Font Awesome icon name, e.g., "shield-alt"
});

export const subscriptionPlans = pgTable("subscription_plans", {
  id: serial("id").primaryKey(),
  carId: varchar("car_id").notNull().references(() => cars.id),
  weeklyPrice: integer("weekly_price").notNull(),
  bond: integer("bond").notNull(),
  minimumTerm: text("minimum_term").notNull(), // e.g., "4 months"
  weeklyKm: integer("weekly_km").notNull(), // e.g., 385
  primaryDrivers: integer("primary_drivers").notNull().default(1),
});

// Secure form submission tables
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  message: text("message").notNull(),
  submittedAt: text("submitted_at").notNull(),
  ipAddress: varchar("ip_address", { length: 45 }), // Support IPv6
  processed: boolean("processed").notNull().default(false),
});

export const enquirySubmissions = pgTable("enquiry_submissions", {
  id: serial("id").primaryKey(),
  purpose: varchar("purpose", { length: 50 }).notNull(),
  employmentStatus: varchar("employment_status", { length: 50 }).notNull(),
  income: varchar("income", { length: 50 }).notNull(),
  location: varchar("location", { length: 100 }).notNull(),
  fuelType: text("fuel_type").notNull(), // JSON array as text
  vehicleType: varchar("vehicle_type", { length: 50 }).notNull(),
  drivingRestrictions: varchar("driving_restrictions", { length: 100 }).notNull(),
  firstName: varchar("first_name", { length: 50 }).notNull(),
  lastName: varchar("last_name", { length: 50 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  agreeToPrivacy: boolean("agree_to_privacy").notNull(),
  submittedAt: text("submitted_at").notNull(),
  ipAddress: varchar("ip_address", { length: 45 }),
  processed: boolean("processed").notNull().default(false),
});

export const carEnquirySubmissions = pgTable("car_enquiry_submissions", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  message: text("message").notNull(),
  carMake: varchar("car_make", { length: 50 }),
  carModel: varchar("car_model", { length: 50 }),
  selectedPlan: text("selected_plan"), // JSON as text
  submittedAt: text("submitted_at").notNull(),
  ipAddress: varchar("ip_address", { length: 45 }),
  processed: boolean("processed").notNull().default(false),
});

export const insertCarSchema = createInsertSchema(cars);
export const insertFeatureSchema = createInsertSchema(features);
export const insertSubscriptionPlanSchema = createInsertSchema(subscriptionPlans);

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type Car = typeof cars.$inferSelect & {
  // Additional optional fields from database
  images?: string[]; // Array of image URLs for carousel
  description?: string; // Car description
  mileage?: number; // Car mileage
  registrationNumber?: string; // Registration number
  subscriptionPlans?: {
    threeMonth: number;
    sixMonth: number;
    nineMonth: number;
  }; // Subscription plan pricing
};

export type InsertCar = z.infer<typeof insertCarSchema>;

export type Feature = typeof features.$inferSelect;
export type InsertFeature = z.infer<typeof insertFeatureSchema>;

export type SubscriptionPlan = typeof subscriptionPlans.$inferSelect;
export type InsertSubscriptionPlan = z.infer<typeof insertSubscriptionPlanSchema>;

// Form submission types
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = typeof contactSubmissions.$inferInsert;
export type EnquirySubmission = typeof enquirySubmissions.$inferSelect;
export type InsertEnquirySubmission = typeof enquirySubmissions.$inferInsert;
export type CarEnquirySubmission = typeof carEnquirySubmissions.$inferSelect;
export type InsertCarEnquirySubmission = typeof carEnquirySubmissions.$inferInsert;
