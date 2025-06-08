# Rush Car Subscription Service

## Overview

Rush is a car subscription service application built with a React frontend and Node.js Express backend. The application allows users to browse, filter, and view details about available cars for subscription. The project uses a modern tech stack including React, Express, Drizzle ORM, and shadcn/ui components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

The frontend is built with React and uses the following key technologies:

- **React**: Core UI library
- **Wouter**: Lightweight router for navigation
- **TanStack Query**: Data fetching and state management
- **shadcn/ui**: Component library based on Radix UI primitives
- **Tailwind CSS**: Utility-first CSS framework for styling

The frontend follows a component-based architecture with pages representing different routes of the application. All UI components are built using the shadcn/ui library which provides accessible and customizable components with Tailwind CSS styling.

### Backend Architecture

The backend is a simple Express server that serves both the API routes and the frontend application in production:

- **Express**: Web server framework for handling HTTP requests
- **Drizzle ORM**: SQL query builder and ORM for database interactions
- **PostgreSQL**: (Will be added later) Database for storing application data

The backend provides REST API endpoints for fetching car data, features, and subscription plans. In development mode, it integrates with Vite for hot module reloading.

### Data Flow

1. Client makes requests to the server API endpoints
2. Server processes the request, retrieves data from the database 
3. Data is returned as JSON to the client
4. TanStack Query handles caching and state management on the client side

## Key Components

### 1. Frontend Components

- **Page Components**: Located in `client/src/pages/`, these represent different routes in the application
- **UI Components**: Located in `client/src/components/ui/`, these are shadcn/ui components
- **Custom Components**: Contains specialized components like car listing cards, filters, etc.
- **Hooks**: Custom React hooks for logic reuse

### 2. Backend Components

- **Express Server**: Main server setup in `server/index.ts`
- **API Routes**: Defined in `server/routes.ts`
- **Storage**: Database interaction layer in `server/storage.ts`
- **Schema**: Data models defined in `shared/schema.ts`

### 3. Database Schema

The database schema is defined using Drizzle ORM in `shared/schema.ts` and includes the following main tables:

- **Users**: User accounts with authentication data
- **Cars**: Available cars for subscription
- **Features**: Car features like ABS, cruise control, etc.
- **SubscriptionPlans**: Various subscription plans for cars

## External Dependencies

### Frontend Dependencies

- **@radix-ui/react-***: UI primitives for building accessible components
- **@tanstack/react-query**: Data fetching and state management
- **class-variance-authority**: Utility for creating variants of components
- **clsx & tailwind-merge**: Utilities for managing class names
- **wouter**: Lightweight router
- **lucide-react**: Icon library
- **react-helmet-async**: Document head manager

### Backend Dependencies

- **express**: Web server framework
- **drizzle-orm**: SQL query builder and ORM
- **@neondatabase/serverless**: PostgreSQL client (for future integration)
- **drizzle-zod**: Schema validation

## Deployment Strategy

The application is configured for deployment on Replit with the following workflow:

1. **Development**: `npm run dev` - Runs the express server with Vite for hot module reloading
2. **Build**: `npm run build` - Builds the frontend with Vite and bundles the server with esbuild
3. **Production**: `npm run start` - Runs the built application from the dist directory

Deployment configuration is defined in `.replit` file, which specifies:
- Node.js 20 as the runtime
- PostgreSQL 16 as the database (to be set up)
- Deployment configuration for Replit's autoscaling service

## Getting Started

1. The application needs a PostgreSQL database connection. Add the `DATABASE_URL` environment variable.
2. Run `npm run db:push` to create the database schema.
3. Run `npm run dev` to start the development server.
4. Access the application at [http://localhost:5000](http://localhost:5000).

## Development Notes

- The application currently uses a memory-based storage implementation (`MemStorage`) but is designed to be easily switched to PostgreSQL.
- The frontend is set up for client-side rendering with React.
- Styling is done with Tailwind CSS with a customized theme defined in `tailwind.config.ts`.
- The application includes a light/dark mode theme system.