import express, { type Express, Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const vite = await createViteServer({
    ...viteConfig,
    server: {
      middlewareMode: true,
      hmr: {
        server,
        port: 5006,
        overlay: true
      }
    },
    appType: 'custom',
    configFile: false
  });

  app.use(vite.middlewares);

  app.use("*", async (req: Request, res: Response, next: NextFunction) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html",
      );

      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(template);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(process.cwd(), "dist", "public");
  
  if (!fs.existsSync(distPath)) {
    console.error("Build directory not found:", distPath);
    throw new Error("Could not find the build directory. Make sure to build the client first.");
  }

  // First handle API routes
  app.use('/api', (req: Request, res: Response, next: NextFunction) => {
    if (req.path.startsWith('/api')) {
      next();
    } else {
      const indexPath = path.join(distPath, 'index.html');
      res.sendFile(indexPath);
    }
  });

  // Serve static files with appropriate caching
  app.use(express.static(distPath, {
    maxAge: '1d',
    index: false,
    setHeaders: (res: Response, filePath: string) => {
      // Don't cache index.html
      if (filePath.endsWith('index.html')) {
        res.setHeader('Cache-Control', 'no-cache');
      }
    }
  }));

  // Handle all other routes by serving index.html
  app.get('*', (req: Request, res: Response) => {
    const indexPath = path.join(distPath, 'index.html');
    res.sendFile(indexPath, {
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'text/html'
      }
    });
  });
}
