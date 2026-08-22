# 🖥️ GlobeTrotter Client Documentation (Frontend)

The frontend application for **GlobeTrotter** is a modern, single-page web application built with **React 19**, **Vite**, **TypeScript**, **Tailwind CSS**, and **Redux Toolkit Query (RTK Query)**.

---

## 🔗 Quick Links
- ⬅️ **[Return to Main Root README](../README.md)**
- ⚙️ **[Server Backend Documentation](../server/README.md)**
- 📚 **[API Documentation](../API_Documentation.md)**

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI Component Architecture |
| **Vite** | Next-generation frontend build tool |
| **TypeScript** | Type safety & interface contracts |
| **Redux Toolkit & RTK Query** | Centralized state management & automated API caching |
| **Tailwind CSS** | Utility-first responsive styling system |
| **Lucide React** | Modern vector icon suite |
| **React Phone Input 2** | International telephone input with dynamic flag selection |

---

## 📁 Full Source Code Directory Structure (`client/src`)

```
📁 client/src/
├── 📄 App.css                       # Global App styles
├── 📄 App.tsx                       # Main React App Root Component
├── 📄 index.css                     # Tailwind CSS entrypoint & font styles
├── 📄 main.tsx                      # Vite React mounting entrypoint
├── 📁 assets/                       # Image assets & sidebars
│   ├── 📁 images/                   # Login/Signup split cover images
│   │   ├── 📄 login_sidebar.avif    # Login page cover image
│   │   └── 📄 register_sidebar.avif # Signup page cover image
│   └── 📄 react.svg
├── 📁 components/                   # Modular UI Components
│   ├── 📁 common/                   # Reusable UI Elements
│   │   └── 📄 ToastContext.tsx      # Global Toast notification provider
│   ├── 📁 landing/                  # Landing Page Components
│   │   ├── 📄 Hero.tsx              # Landing page hero banner
│   │   ├── 📄 Features.tsx          # Key features overview
│   │   ├── 📄 PersonalizedPlanning.tsx # AI planning showcase
│   │   ├── 📄 Navbar.tsx            # Landing page top navigation
│   │   └── 📄 Footer.tsx            # Landing page footer
│   └── 📁 layout/                   # Main Application Layouts
│       ├── 📄 Navbar.tsx            # Authenticated App Navbar
│       ├── 📄 Footer.tsx            # App Footer
│       └── 📄 Sidebar.tsx           # Dashboard Left Navigation Sidebar
├── 📁 hooks/                        # Custom React Hooks
│   └── 📄 useDebounce.ts            # Debounce hook for real-time search
├── 📁 pages/                        # Application Route Pages
│   ├── 📁 admin/                    # Admin Management
│   │   └── 📄 AdminDashboard.tsx    # Admin Control Panel & Analytics
│   ├── 📁 auth/                     # Authentication Screens
│   │   ├── 📄 Login.tsx             # User Login Screen
│   │   ├── 📄 Signup.tsx            # User Registration Screen
│   │   └── 📄 ForgotPassword.tsx    # Password Recovery Screen
│   ├── 📁 community/                # Shared Trips Feed
│   │   └── 📄 CommunityFeed.tsx     # Public itineraries community hub
│   ├── 📁 dashboard/                # User Central Hub
│   │   └── 📄 Dashboard.tsx         # User Dashboard Home
│   ├── 📁 legal/                    # Policy Pages
│   │   ├── 📄 PrivacyPolicy.tsx     # Privacy Policy Page
│   │   └── 📄 TermsOfService.tsx    # Terms of Service Page
│   ├── 📁 profile/                  # User Account
│   │   └── 📄 ProfileSettings.tsx   # User Settings & Saved Destinations
│   ├── 📁 shared/                   # Public Itinerary View
│   │   └── 📄 PublicItinerary.tsx   # Sharable Public Trip View (`/trips/share/:code`)
│   └── 📁 trips/                    # Travel Itinerary Builder
│       ├── 📄 TripList.tsx          # My Trips List Gallery
│       ├── 📄 CreateTripModal.tsx   # Create New Trip Modal
│       └── 📄 ItineraryView.tsx     # Day-by-Day Itinerary Builder & Timeline
├── 📁 routes/                       # Navigation & Route Guards
│   ├── 📄 AppRoutes.tsx             # React Router Route Definitions
│   └── 📄 ProtectedRoute.tsx        # Authentication Guard Component
├── 📁 services/                     # Business Services
│   ├── 📄 api.ts                    # Axios Base Service Configuration
│   ├── 📄 auth.service.ts           # Authentication Service Logic
│   ├── 📄 trip.service.ts           # Trip & Stop Service Logic
│   ├── 📄 city.service.ts           # City Search Service Logic
│   ├── 📄 activity.service.ts       # Activity Search Service Logic
│   └── 📄 user.service.ts           # User Profile Service Logic
├── 📁 store/                        # Redux State Management
│   ├── 📄 index.ts                  # Redux Store Setup & Reducers
│   ├── 📁 api/                      # RTK Query Layer
│   │   └── 📄 apiSlice.ts           # Unified API Slice & Endpoints
│   ├── 📁 auth/                     # Auth Redux Slice
│   │   └── 📄 authSlice.ts          # Auth State Reducer
│   ├── 📁 trip/                     # Trip Redux Slice
│   │   └── 📄 tripSlice.ts          # Trip State Reducer
│   └── 📁 user/                     # User Redux Slice
│       └── 📄 userSlice.ts          # User State Reducer
├── 📁 types/                        # TypeScript Interfaces
│   ├── 📄 auth.types.ts             # Auth Type Definitions
│   ├── 📄 trip.types.ts             # Trip & Stop Type Definitions
│   ├── 📄 city.types.ts             # City & Activity Type Definitions
│   └── 📄 user.types.ts             # User Profile Type Definitions
└── 📁 utils/                        # Utility & Helper Functions
    ├── 📄 validation.ts             # Password & Email Regex Validation
    ├── 📄 currency.ts               # Currency Formatting Helpers
    ├── 📄 date.ts                   # Date Calculation & Timeline Helpers
    └── 📄 constants.ts              # System Constants
```

---

## ⚡ Setup & Run Steps

### 1. Install Dependencies
```bash
cd client
npm install
```

### 2. Configure Environment Variables
Create `.env` file in `client/`:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 3. Start Development Server
```bash
npm run dev
```
Access client app at: `http://localhost:5173`

### 4. Build for Production
```bash
npm run build
```
*(Runs TypeScript check `tsc -b` and builds production bundle in `dist/`)*