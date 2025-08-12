# Tiny Tap - URL Shortener Platform

A modern, full-stack URL shortening service built with TypeScript, React, MongoDB and Express. 

## 🌐 Live Demo

- **Frontend**: [https://tiny-tap.vercel.app/](https://tiny-tap.vercel.app/)
- **Backend API**: [https://tiny-tap-production-ec7a.up.railway.app](https://tiny-tap-production-ec7a.up.railway.app)

## ✨ Features

- **🔗 URL Shortening** - Create short, memorable URLs
- **📊 Analytics Dashboard** - Track clicks and performance
- **👤 User Authentication** - Secure email & password authentication
- **🛡️ Admin Panel** - Manage users and monitor platform usage
- **📱 Responsive Design** - Works perfectly on all devices
- **🔒 Secure** - Built with security best practices

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with concurrent features
- **TypeScript** - For type safety and improved developer experience
- **TanStack Router** - File-based routing with full type safety
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **shadcn/ui** - Beautiful, accessible UI components
- **Vite** - Fast build tool and dev server

### Backend
- **Express.js** - Fast, unopinionated web framework
- **Node.js** - Runtime environment
- **MongoDB** - NoSQL database engine
- **Mongoose** - TypeScript-first ODM for MongoDB
- **Better Auth** - Modern authentication system
- **Railway** - Cloud deployment platform

### Development Tools
- **Biome** - Fast linting and formatting
- **Turborepo** - Optimized monorepo build system
- **pnpm** - Fast, disk space efficient package manager

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- MongoDB database

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/subhamBharadwaz/tiny-tap
   cd tiny-tap
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Setup**
   
   Create `.env` files in both `apps/server/` and `apps/web/` directories:
   
   **Server Environment Variables** (`apps/server/.env`):
   ```env
   DATABASE_URL=your_mongodb_connection_string (atlas)
   CORS_ORIGIN=https://tiny-tap.vercel.app
   BETTER_AUTH_SECRET=your_secure_secret
   BETTER_AUTH_URL=https://tiny-tap-production-ec7a.up.railway.app
   PORT=4000
   NODE_ENV=development
   LOG_LEVEL=debug
   ```
   **Web Environment Variables** (`apps/web/.env`):
   ```env
   VITE_SERVER_URL=http://localhost:3000
   ```

5. **Start Development Servers**
   ```bash
   pnpm dev
   ```

## 🌍 Development URLs

- **Frontend**: [http://localhost:3001](http://localhost:3001)
- **Backend API**: [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
tiny-tap/
├── apps/
│   ├── web/                    # Frontend application
│   │   ├── src/
│   │   │   ├── components/     # Reusable UI components
│   │   │   ├── features/       # Feature-specific components
│   │   │   ├── routes/         # Application routes
│   │   │   └── lib/           # Utility functions
│   │   └── package.json
│   └── server/                 # Backend API
│       ├── src/
│       │   ├── modules/        # Feature modules
│       │   ├── middlewares/    # Express middlewares
│       │   ├── lib/           # Utility libraries
│       │   └── db/            # Database configuration
│       └── package.json
├── package.json
└── README.md
```

## 📜 Available Scripts

### Development
- `pnpm dev` - Start all applications in development mode
- `pnpm dev:web` - Start only the web application
- `pnpm dev:server` - Start only the server

### Building
- `pnpm build` - Build all applications for production
- `pnpm build:web` - Build only the web application
- `pnpm build:server` - Build only the server


### Code Quality
- `pnpm check-types` - Check TypeScript types across all apps
- `pnpm check` - Run Biome formatting and linting
- `pnpm format` - Format code with Biome

## 🚀 Deployment

### Frontend (Vercel)
The frontend is automatically deployed to Vercel from the main branch.

### Backend (Railway)
The backend is deployed on Railway with automatic deployments from the main branch.


## 🙏 Acknowledgments

- Built with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack)
- UI components from [shadcn/ui](https://ui.shadcn.com/)