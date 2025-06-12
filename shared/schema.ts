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

export const insertCarSchema = createInsertSchema(cars);
export const insertFeatureSchema = createInsertSchema(features);
export const insertSubscriptionPlanSchema = createInsertSchema(subscriptionPlans);

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type Car = typeof cars.$inferSelect;
export type InsertCar = z.infer<typeof insertCarSchema>;

export type Feature = typeof features.$inferSelect;
export type InsertFeature = z.infer<typeof insertFeatureSchema>;

export type SubscriptionPlan = typeof subscriptionPlans.$inferSelect;
export type InsertSubscriptionPlan = z.infer<typeof insertSubscriptionPlanSchema>;
