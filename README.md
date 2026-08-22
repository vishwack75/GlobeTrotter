# GlobeTrotter - Empowering Personalized Travel Planning

> **Transforming the way individuals plan, visualize, and experience multi-city travel through intelligent, collaborative, and interactive tools.**

---

## 📌 Direct Module Documentation Links

- 🖥️ **[Client Documentation (Frontend React + Vite)](./client/README.md)**
- ⚙️ **[Server Documentation (Backend Node.js + Express + MongoDB)](./server/README.md)**
- 📚 **[API Documentation Reference](./API_Documentation.md)**

---

## 🌟 Overall Vision

The overarching vision for **GlobeTrotter** is to become a personalized, intelligent, and collaborative platform that transforms the way individuals plan and experience travel. The platform aims to empower users to dream, design, and organize trips with ease by offering an end-to-end travel planning tool that combines flexibility and interactivity. It envisions a world where users can explore global destinations, visualize their journeys through structured itineraries, make cost-effective decisions, and share their travel plans within a community making travel planning as exciting as the trip itself.

---

## 🎯 Mission

The mission is to build a user-centric, responsive application that simplifies the complexity of planning multi-city travel. The platform provides travelers with intuitive tools to:
- 🗺️ **Add and manage travel stops and durations**
- 🏙️ **Explore sacred cities and activities of interest**
- 💰 **Estimate trip budgets automatically with category breakdowns**
- 📅 **Visualize timelines and plans via interactive calendars**
- 🔗 **Share trip plans publicly or copy shared itineraries**



---

## 🛠️ Problem Statements & GlobeTrotter Solutions

### 1. Login / Signup Screen
- **Problem**: Travelers need a secure entry point to manage their confidential travel plans.
- **GlobeTrotter Solution**: Built dual split-screen authentication forms with mandatory field validation (Name, Phone Number with interactive country flag picker, City, Country, Avatar Photo Upload), password complexity rules (≥6 chars with uppercase, lowercase, number, and special character), and JWT access/refresh token rotation.

### 2. Dashboard / Home Screen
- **Problem**: Lack of a centralized hub showing active itineraries, destination recommendations, and budget highlights.
- **GlobeTrotter Solution**: Responsive dashboard featuring personal welcome banners, active trip countdown cards, quick action buttons ("Plan New Trip"), recommended sacred places, and real-time expense highlights.

### 3. Create Trip Screen
- **Problem**: Starting a multi-city travel plan can be overwhelming without structured inputs.
- **GlobeTrotter Solution**: Clean modal form allowing users to name their trip, specify start and end dates, set budget limits, toggle public visibility, and write custom descriptions.

### 4. My Trips (Trip List) Screen
- **Problem**: Difficulty organizing multiple past, current, and upcoming itineraries.
- **GlobeTrotter Solution**: Interactive trip card gallery with date ranges, destination stop counts, budget badges, and direct actions to view, edit, or delete trips.

### 5. Itinerary Builder Screen
- **Problem**: Constructing day-by-day itineraries across multiple cities is complex.
- **GlobeTrotter Solution**: Flexible multi-stop builder where users can add cities, adjust stop dates, attach specific activities to days, and manage stop orders.

### 6. Itinerary View Screen
- **Problem**: Travelers need a clean, structured overview of their entire journey.
- **GlobeTrotter Solution**: Detailed day-by-day layout showing city headers, activity blocks with timing and estimated costs, and view mode toggles (List/Calendar).

### 7. City Search
- **Problem**: Finding relevant destinations with pricing index and popularity data.
- **GlobeTrotter Solution**: Real-time city search engine with region filters, star ratings, cost index indicators (`₹` to `₹₹₹`), and one-click "Add to Trip" actions.

### 8. Activity Search
- **Problem**: Discovering memorable experiences (spiritual darshans, food tours, sightseeing) tailored to specific stops.
- **GlobeTrotter Solution**: Activity finder with interest filters (Spiritual, Heritage, Nature, Adventure), rating displays, cost estimates, and direct attachment to trip stops.

### 9. Trip Budget & Cost Breakdown Screen
- **Problem**: Unexpected travel expenses leading to overbudget trips.
- **GlobeTrotter Solution**: Automated financial dashboard calculating total spent vs budget limit, remaining balance, category breakdowns (Accommodation, Travel, Food, Activities), and visual percentage progress bars.

### 10. Trip Calendar / Timeline Screen
- **Problem**: Difficulty visualizing multi-day travel schedules chronologically.
- **GlobeTrotter Solution**: Interactive timeline and calendar view mapping trip stops and scheduled activities across calendar dates.

### 11. Shared/Public Itinerary View Screen
- **Problem**: Difficulty sharing travel itineraries with friends or the community.
- **GlobeTrotter Solution**: Public sharable URL generator (`/trips/share/:shareCode`) with read-only views, social share options, and a **"Copy Trip"** feature that clones the itinerary into another traveler's account.

### 12. User Profile / Settings Screen
- **Problem**: Lack of control over profile data, saved destinations, and personal preferences.
- **GlobeTrotter Solution**: User settings page allowing instant updates to avatar photos, contact numbers, city/country location, language preferences, and favorite saved destinations list.

### 13. Admin / Analytics Dashboard
- **Problem**: Platform administrators lack visibility into user trends, destination popularity, and user management.
- **GlobeTrotter Solution**: Admin control panel with sticky sidebar matching user panel styling, system overview metrics, user directory with trip counts, user trips inspection modal, popular city trends, and user registration growth statistics.

---

## 📁 Repository Directory Structure

```
📁 GlobeTrotter/
├── 📄 API_Documentation.md          # Comprehensive REST API Documentation
├── 📄 README.md                     # Main Project Root README
├── 📁 client/                       # Frontend Application (React + Vite + TS)
│   ├── 📄 README.md                 # Frontend Module Documentation
│   ├── 📄 package.json              # Frontend Dependencies
│   ├── 📄 vite.config.ts            # Vite Configuration
│   ├── 📄 index.html                # Entry HTML File
│   └── 📁 src/                      # Source Code
│       ├── 📁 assets/               # Cover Images & Media Assets
│       ├── 📁 components/           # Reusable UI & Layout Components
│       │   ├── 📁 common/           # Toast, Modals, Loading Spinners
│       │   ├── 📁 landing/          # Hero, Features, Testimonials
│       │   └── 📁 layout/           # Navbar, Footer, Sidebar
│       ├── 📁 hooks/                # Custom React Hooks (useDebounce)
│       ├── 📁 pages/                # Page Views
│       │   ├── 📁 admin/            # Admin Dashboard Panel
│       │   ├── 📁 auth/             # Login, Signup, Forgot Password
│       │   ├── 📁 dashboard/        # User Dashboard
│       │   ├── 📁 profile/          # Profile Settings
│       │   ├── 📁 shared/           # Public Sharable Itinerary View
│       │   └── 📁 trips/            # Trip List, Create, Itinerary View
│       ├── 📁 services/             # API Service Abstractions
│       ├── 📁 store/                # Redux Toolkit & RTK Query Store
│       ├── 📁 types/                # TypeScript Interfaces & Schemas
│       └── 📁 utils/                # Currency, Date & Validation Helpers
└── 📁 server/                       # Backend Application (Node.js + Express)
    ├── 📄 README.md                 # Backend Module Documentation
    ├── 📄 package.json              # Backend Dependencies
    ├── 📄 tsconfig.json             # Server TypeScript Configuration
    └── 📁 src/                      # Backend Source Code
        ├── 📁 config/               # Database Connection (MongoDB)
        ├── 📁 controllers/          # Request Handlers (Auth, Trip, City, Admin)
        ├── 📁 middleware/           # Auth JWT & Error Middleware
        ├── 📁 models/               # Mongoose Schemas (User, Trip, City, Activity)
        ├── 📁 routes/               # Express Route Definitions
        ├── 📁 scripts/              # Database Seeder Scripts
        ├── 📁 services/             # Business Logic Layer
        ├── 📁 validations/          # Zod Request Validation Schemas
        └── 📄 server.ts             # Server Entry Point
```

---

## ⚡ Quick Start Guide

### Prerequisites
- **Node.js**: `v22.x` or higher
- **npm**: `v9.x` or higher
- **MongoDB**: Local instance running on `mongodb://localhost:27017` or MongoDB Atlas URI.

---

### Step 1: Clone Repository & Setup Server

```bash
cd GlobeTrotter/server
npm install
```

Create a `.env` file in `GlobeTrotter/server`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/globetrotter
JWT_ACCESS_SECRET=your_super_secret_access_key
JWT_REFRESH_SECRET=your_super_secret_refresh_key
BREVO_API_KEY=your_brevo_api_key_forgot_password
CLIENT_URL=http://localhost:5173
```

Seed the Database with default Admin & Users:
```bash
npx ts-node src/scripts/seeder.ts
```

Start the Backend Development Server:
```bash
npm run dev
```
*(Server will run on `http://localhost:5000`)*

---

### Step 2: Setup & Launch Client

Open a new terminal window:
```bash
cd GlobeTrotter/client
npm install
```

Create a `.env` file in `GlobeTrotter/client`:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the Frontend Development Server:
```bash
npm run dev
```
*(Client app will run on `http://localhost:5173`)*

---


