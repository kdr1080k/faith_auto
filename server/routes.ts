import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all cars with optional filters
  app.get("/api/cars", async (req: Request, res: Response) => {
    try {
      const category = req.query.category as string | undefined;
      const location = req.query.location as string | undefined;
      const bodyType = req.query.bodyType as string | undefined;
      const fuelType = req.query.fuelType as string | undefined;
      const seats = req.query.seats as string | undefined;
      let cars = await storage.getCars(category, location);
      // 进一步过滤
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

  // Get features for a specific car
  app.get("/api/cars/:id/features", async (req: Request, res: Response) => {
    try {
      const features = await storage.getFeaturesByCarId(req.params.id);
      res.json(features);
    } catch (error) {
      console.error("Error fetching features:", error);
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

  const httpServer = createServer(app);

  return httpServer;
}
