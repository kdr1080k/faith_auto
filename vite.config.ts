import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  define: {
    'process.env': process.env
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    sourcemap: command === 'serve',
    minify: command === 'build',
    target: 'es2015',
    cssTarget: 'chrome61',
  },
  server: {
    port: 5173,
    host: true,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      'faithauto-v1-arb6hddnedhef6c9.australiacentral-01.azurewebsites.net',
      '.azurewebsites.net'
    ],
    proxy: {
      '/api': {
        target: 'http://localhost:5006',
        changeOrigin: true
      }
    }
  }
}));
