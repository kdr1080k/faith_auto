import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  contactSubmissions, 
  enquirySubmissions, 
  carEnquirySubmissions,
  type InsertContactSubmission,
  type InsertEnquirySubmission,
  type InsertCarEnquirySubmission
} from "@shared/schema";

// Input validation schemas using Zod
const ContactFormSchema = z.object({
  name: z.string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name contains invalid characters"),
  email: z.string()
    .email("Invalid email format")
    .max(255, "Email must be less than 255 characters"),
  phone: z.string()
    .min(1, "Phone is required")
    .max(20, "Phone must be less than 20 characters")
    .regex(/^[\+]?[0-9\s\-\(\)]+$/, "Phone contains invalid characters"),
  message: z.string()
    .min(1, "Message is required")
    .max(2000, "Message must be less than 2000 characters")
});

const EnquiryFormSchema = z.object({
  purpose: z.enum(['rideshare', 'personal', 'fleet']),
  employmentStatus: z.enum(['Full-time', 'Part-time', 'Self employed', 'Casual', 'Unemployed']),
  income: z.enum(['Under $50K', '$50K to $75K', '$75K to $100K', 'Over $100K']),
  location: z.string().min(1).max(100),
  fuelType: z.array(z.string()).min(1, "At least one fuel type must be selected"),
  vehicleType: z.enum(['Affordable', 'Comfortable', 'Luxury']),
  drivingRestrictions: z.enum([
    'None (Open & unrestricted licenses)',
    'Provisional (P1 or P2)',
    'Probationary (P)'
  ]),
  firstName: z.string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "First name contains invalid characters"),
  lastName: z.string()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Last name contains invalid characters"),
  email: z.string()
    .email("Invalid email format")
    .max(255, "Email must be less than 255 characters"),
  phone: z.string()
    .min(1, "Phone is required")
    .max(20, "Phone must be less than 20 characters")
    .regex(/^[\+]?[0-9\s\-\(\)]+$/, "Phone contains invalid characters"),
  agreeToPrivacy: z.boolean().refine(val => val === true, "Privacy agreement is required")
});

const CarEnquiryFormSchema = z.object({
  name: z.string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name contains invalid characters"),
  email: z.string()
    .email("Invalid email format")
    .max(255, "Email must be less than 255 characters"),
  phone: z.string()
    .min(1, "Phone is required")
    .max(20, "Phone must be less than 20 characters")
    .regex(/^[\+]?[0-9\s\-\(\)]+$/, "Phone contains invalid characters"),
  message: z.string()
    .min(1, "Message is required")
    .max(2000, "Message must be less than 2000 characters"),
  carMake: z.string().optional(),
  carModel: z.string().optional(),
  selectedPlan: z.object({
    term: z.string(),
    price: z.number()
  }).optional()
});

// Input sanitization function
function sanitizeInput(input: string): string {
  // Remove HTML tags using regex
  let sanitized = input.replace(/<[^>]*>/g, '');
  
  // Remove script content
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove SQL injection patterns
  sanitized = sanitized
    .replace(/['"`;\\]/g, '') // Remove quotes, semicolons, backslashes
    .replace(/\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE|UNION|OR|AND)\b/gi, '') // Remove SQL keywords
    .replace(/--/g, '') // Remove SQL comments
    .replace(/\/\*/g, '') // Remove multi-line comment start
    .replace(/\*\//g, '') // Remove multi-line comment end
    .trim();
    
  return sanitized;
}

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string, maxRequests = 5, windowMs = 15 * 60 * 1000): boolean {
  const now = Date.now();
  const userLimit = rateLimitStore.get(ip);
  
  if (!userLimit || now > userLimit.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (userLimit.count >= maxRequests) {
    return false;
  }
  
  userLimit.count++;
  return true;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", (req: Request, res: Response) => {
    res.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "development",
      port: process.env.PORT || "8000",
      version: "1.0.0"
    });
  });

  // Get all cars with optional filters
  app.get("/api/cars", async (req: Request, res: Response) => {
    try {
      const { category, location, bodyType, fuelType, seats } = req.query;
      
      let cars = await storage.getCars(category as string, location as string);
      
      // Apply additional filters
      if (bodyType && bodyType !== "All") {
        cars = cars.filter(car => car.bodyType === bodyType);
      }
      if (fuelType && fuelType !== "All") {
        cars = cars.filter(car => car.fuelType === fuelType);
      }
      if (seats && seats !== "All") {
        cars = cars.filter(car =>
          seats === "7+" ? car.seats >= 7 : String(car.seats) === seats
        );
      }
      res.json(cars);
    } catch (error) {
      console.error("Error fetching cars:", error);
      res.status(500).json({ message: "Failed to fetch cars" });
    }
  });

  // Get a specific car by ID
  app.get("/api/cars/:id", async (req: Request, res: Response) => {
    try {
      const car = await storage.getCarById(req.params.id);
      if (!car) {
        return res.status(404).json({ message: "Car not found" });
      }
      res.json(car);
    } catch (error) {
      console.error("Error fetching car:", error);
      res.status(500).json({ message: "Failed to fetch car details" });
    }
  });

  // Get a specific car by database ID
  app.get("/api/cars/db/:dbId", async (req: Request, res: Response) => {
    try {
      console.log(`API: Fetching car with database ID: ${req.params.dbId}`);
      
      // Get the carType from query parameters if provided
      const carType = req.query.carType as 'subscription' | 'secondhand' | undefined;
      console.log(`API: Car type specified: ${carType}`);
      
      const car = await storage.getCarByDbId(req.params.dbId, carType);
      if (!car) {
        console.log(`API: Car not found with database ID: ${req.params.dbId}`);
        return res.status(404).json({ message: "Car not found" });
      }
      console.log(`API: Found car with database ID: ${req.params.dbId}, car ID: ${car.id}, category: ${car.category}`);
      res.json(car);
    } catch (error) {
      console.error("Error fetching car by database ID:", error);
      res.status(500).json({ message: "Failed to fetch car details" });
    }
  });

  // Get features for a specific car
  app.get("/api/cars/:id/features", async (req: Request, res: Response) => {
    try {
      const features = await storage.getFeaturesByCarId(req.params.id);
      res.json(features);
    } catch (error) {
      console.error("Error fetching car features:", error);
      res.status(500).json({ message: "Failed to fetch car features" });
    }
  });

  // Get subscription plans for a specific car
  app.get("/api/cars/:id/subscription-plans", async (req: Request, res: Response) => {
    try {
      const plans = await storage.getSubscriptionPlansByCarId(req.params.id);
      res.json(plans);
    } catch (error) {
      console.error("Error fetching subscription plans:", error);
      res.status(500).json({ message: "Failed to fetch subscription plans" });
    }
  });

  // SECURE FORM SUBMISSION ENDPOINTS

  // Contact form submission with SQL injection protection
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      // Rate limiting
      const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
      if (!checkRateLimit(clientIp)) {
        return res.status(429).json({ 
          success: false, 
          message: "Too many requests. Please try again later." 
        });
      }

      // Validate and sanitize input
      const validationResult = ContactFormSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({
          success: false,
          message: "Invalid input data",
          errors: validationResult.error.errors
        });
      }

      const { name, email, phone, message } = validationResult.data;

      // Additional sanitization
      const sanitizedData = {
        name: sanitizeInput(name),
        email: sanitizeInput(email.toLowerCase()),
        phone: sanitizeInput(phone),
        message: sanitizeInput(message)
      };

      // Here you would store in database using parameterized queries
      // For now, we'll just log and return success
      console.log("Secure contact form submission:", {
        ...sanitizedData,
        submittedAt: new Date().toISOString(),
        ip: clientIp
      });

      res.json({
        success: true,
        message: "Thank you for contacting us. We'll get back to you soon."
      });

    } catch (error) {
      console.error("Error processing contact form:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error. Please try again later."
      });
    }
  });

  // Enquiry form submission with SQL injection protection
  app.post("/api/enquiry", async (req: Request, res: Response) => {
    try {
      // Rate limiting
      const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
      if (!checkRateLimit(clientIp)) {
        return res.status(429).json({ 
          success: false, 
          message: "Too many requests. Please try again later." 
        });
      }

      // Validate and sanitize input
      const validationResult = EnquiryFormSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({
          success: false,
          message: "Invalid input data",
          errors: validationResult.error.errors
        });
      }

      const data = validationResult.data;

      // Additional sanitization for text fields
      const sanitizedData = {
        ...data,
        firstName: sanitizeInput(data.firstName),
        lastName: sanitizeInput(data.lastName),
        email: sanitizeInput(data.email.toLowerCase()),
        phone: sanitizeInput(data.phone),
        location: sanitizeInput(data.location),
        fuelType: data.fuelType.map(fuel => sanitizeInput(fuel))
      };

      // Here you would store in database using parameterized queries
      console.log("Secure enquiry form submission:", {
        ...sanitizedData,
        submittedAt: new Date().toISOString(),
        ip: clientIp
      });

      res.json({
        success: true,
        message: "Thank you for your enquiry. We'll contact you soon with vehicle options."
      });

    } catch (error) {
      console.error("Error processing enquiry form:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error. Please try again later."
      });
    }
  });

  // Car-specific enquiry form submission with SQL injection protection
  app.post("/api/car-enquiry", async (req: Request, res: Response) => {
    try {
      // Rate limiting
      const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
      if (!checkRateLimit(clientIp)) {
        return res.status(429).json({ 
          success: false, 
          message: "Too many requests. Please try again later." 
        });
      }

      // Validate and sanitize input
      const validationResult = CarEnquiryFormSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({
          success: false,
          message: "Invalid input data",
          errors: validationResult.error.errors
        });
      }

      const data = validationResult.data;

      // Additional sanitization
      const sanitizedData = {
        name: sanitizeInput(data.name),
        email: sanitizeInput(data.email.toLowerCase()),
        phone: sanitizeInput(data.phone),
        message: sanitizeInput(data.message),
        carMake: data.carMake ? sanitizeInput(data.carMake) : undefined,
        carModel: data.carModel ? sanitizeInput(data.carModel) : undefined,
        selectedPlan: data.selectedPlan
      };

      // Here you would store in database using parameterized queries
      console.log("Secure car enquiry form submission:", {
        ...sanitizedData,
        submittedAt: new Date().toISOString(),
        ip: clientIp
      });

      res.json({
        success: true,
        message: "Thank you for your enquiry. We'll contact you soon with more information about this vehicle."
      });

    } catch (error) {
      console.error("Error processing car enquiry form:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error. Please try again later."
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
