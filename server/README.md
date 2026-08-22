# ⚙️ GlobeTrotter - Server Documentation (Backend)

The backend server for **GlobeTrotter** is a high-performance RESTful API service built with **Node.js**, **Express**, **TypeScript**, and **MongoDB / Mongoose**.

---

## 🔗 Quick Links
- ⬅️ **[Return to Main Root README](../README.md)**
- 🖥️ **[Client Frontend Documentation](../client/README.md)**
- 📚 **[API Documentation](../API_Documentation.md)**

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| **Node.js & Express** | Core API web application framework |
| **TypeScript** | Static typing & backend architecture robustness |
| **MongoDB & Mongoose** | NoSQL Document Database & Object Data Modeling |
| **Zod** | Request validation & schema enforcement |
| **jsonwebtoken (JWT)** | Token-based stateless authentication |
| **bcryptjs** | Password hashing & verification |
| **cors & cookie-parser** | Cross-Origin Resource Sharing & HTTP cookie parsing |

---

## 📁 Source Code Directory Structure (`server/src`)

```
📁 server/src/
├── 📁 config/                       # Database Configuration (`db.ts`)
├── 📁 controllers/                  # Request Handling Layer
│   ├── 📄 admin.controller.ts       # Admin Analytics & User Management
│   ├── 📄 auth.controller.ts        # Registration, Login, Logout, Refresh
│   ├── 📄 city.controller.ts        # Destination Search & Info
│   ├── 📄 trip.controller.ts        # Trip CRUD & Itinerary Builder
│   └── 📄 user.controller.ts        # Profile & Saved Destinations
├── 📁 middleware/                   # Express Middleware
│   ├── 📄 auth.middleware.ts        # JWT Authentication & Role Guards
│   └── 📄 error.middleware.ts       # Global Centralized Error Handler
├── 📁 models/                       # Mongoose Database Schemas
│   ├── 📄 Activity.ts               # Activity Model & Schema
│   ├── 📄 City.ts                   # City Model & Schema
│   ├── 📄 Trip.ts                   # Trip & Itinerary Stop Schemas
│   └── 📄 User.ts                   # User Account Schema
├── 📁 routes/                       # Express Route Definitions
│   ├── 📄 admin.routes.ts           # Admin Endpoints (`/api/admin`)
│   ├── 📄 auth.routes.ts            # Auth Endpoints (`/api/auth`)
│   ├── 📄 city.routes.ts            # City Endpoints (`/api/cities`)
│   ├── 📄 trip.routes.ts            # Trip Endpoints (`/api/trips`)
│   └── 📄 user.routes.ts            # User Profile Endpoints (`/api/user`)
├── 📁 scripts/                      # Database Seeder Scripts (`seeder.ts`)
├── 📁 services/                     # Business Logic Layer
│   ├── 📄 admin.service.ts          # Admin Service Layer
│   ├── 📄 auth.service.ts           # Auth & Token Service Layer
│   ├── 📄 city.service.ts           # City Search Service
│   ├── 📄 trip.service.ts           # Trip & Stop Service Layer
│   └── 📄 user.service.ts           # User Profile Service
├── 📁 validations/                  # Zod Validation Schemas
│   └── 📄 auth.validator.ts         # Password, Email & Signup Validators
└── 📄 server.ts                     # Main Express Application Entrypoint
```

---

## ⚡ Setup & Run Steps

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Configure Environment Variables
Create `.env` file in `server/`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/globetrotter
JWT_ACCESS_SECRET=your_super_secret_access_key
JWT_REFRESH_SECRET=your_super_secret_refresh_key
BREVO_API_KEY=your_brevo_api_key_forgot_password
CLIENT_URL=http://localhost:5173
```

### 3. Seed Database
Populate database with default cities, activities, admin, and user accounts:
```bash
npx ts-node src/scripts/seeder.ts
```

### 4. Start Development Server
```bash
npm run dev
```
*(Server will start on `http://localhost:5000`)*

### 5. Build for Production
```bash
npm run build
```
*(Runs TypeScript check `tsc --noEmit` and compiles to `dist/`)*