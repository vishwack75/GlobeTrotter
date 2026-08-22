# GlobeTrotter -  API Documentation

API Endpoint documentation for **GlobeTrotter** travel & sacred itinerary planner.

---

## 🔑 Base URL & Authentication

- **Base URL**: `http://localhost:5000/api`
- **Authentication**: JWT Access Token (`Authorization: Bearer <token>`) & HTTP-Only Refresh Token Cookie.

---

# 👤 USER SIDE APIs

### 1. Authentication & Authorization
| HTTP Method | API Endpoint | Auth Required | Purpose & Description |
|---|---|---|---|
| `POST` | `/api/auth/signup` | No | Register a new user account (e.g. John Doe) with contact info & photo. |
| `POST` | `/api/auth/login` | No | Authenticate user credentials and return access token. |
| `POST` | `/api/auth/refresh` | Refresh Cookie | Issue a new JWT access token using the HTTP-only refresh cookie. |
| `POST` | `/api/auth/logout` | Yes | Log out user and clear refresh token session. |
| `POST` | `/api/auth/forgot-password` | No | Send password reset request. |
| `POST` | `/api/auth/reset-password` | No | Execute password reset with reset token. |

---

### 2. User Profile & Preferences
| HTTP Method | API Endpoint | Auth Required | Purpose & Description |
|---|---|---|---|
| `GET` | `/api/user/profile` | Yes | Retrieve current logged-in user profile and saved favorite cities. |
| `PUT` | `/api/user/profile` | Yes | Update user profile details (name, phone, city, country, avatar photo). |
| `POST` | `/api/user/saved-destinations/toggle` | Yes | Save or unsave a destination city to user favorites. |

---

### 3. Trip & Itinerary Management
| HTTP Method | API Endpoint | Auth Required | Purpose & Description |
|---|---|---|---|
| `GET` | `/api/trips` | Yes | Fetch all travel itineraries created by the logged-in user. |
| `GET` | `/api/trips/:id` | Yes | Retrieve single trip itinerary with stops and activities. |
| `GET` | `/api/trips/share/:shareCode` | No | Publicly view a shared trip itinerary using a share code. |
| `POST` | `/api/trips` | Yes | Create a new multi-city travel itinerary. |
| `PUT` | `/api/trips/:id` | Yes | Update trip details (dates, budget limit, public status). |
| `DELETE` | `/api/trips/:id` | Yes | Delete a trip itinerary. |
| `POST` | `/api/trips/:id/stops` | Yes | Add a city stop to an itinerary. |
| `DELETE` | `/api/trips/:id/stops/:stopId` | Yes | Remove a city stop from an itinerary. |
| `POST` | `/api/trips/share/:shareCode/copy` | Yes | Clone/copy a shared public trip to the logged-in user's profile. |

---

### 4. Cities & Destinations
| HTTP Method | API Endpoint | Auth Required | Purpose & Description |
|---|---|---|---|
| `GET` | `/api/cities` | No | Search and filter cities by name, region, rating, or popularity with pagination. |
| `GET` | `/api/cities/:id` | No | Fetch detailed information and activities for a specific city. |

---

### 5. Activities & Experiences
| HTTP Method | API Endpoint | Auth Required | Purpose & Description |
|---|---|---|---|
| `GET` | `/api/activities/search` | No | Search activities by city, category, and price range. |
| `POST` | `/api/activities/stop-activity` | Yes | Add a specific activity to a trip stop. |
| `DELETE` | `/api/activities/stop-activity/:id` | Yes | Remove an activity from a trip stop. |

---

### 6. Budget & Expense Management
| HTTP Method | API Endpoint | Auth Required | Purpose & Description |
|---|---|---|---|
| `GET` | `/api/budget/:tripId` | Yes | Retrieve budget limit, category allocations, and total spent for a trip. |
| `PUT` | `/api/budget/:tripId` | Yes | Update budget category allocations for a trip. |

---

# 🛡️ ADMIN SIDE APIs

### 7. Platform Overview & System Analytics
| HTTP Method | API Endpoint | Auth Required | Purpose & Description |
|---|---|---|---|
| `GET` | `/api/admin/analytics` | Admin | Get overall system statistics (total users, total trips, top cities, recent itineraries). |

---

### 8. User Management
| HTTP Method | API Endpoint | Auth Required | Purpose & Description |
|---|---|---|---|
| `GET` | `/api/admin/users` | Admin | Get paginated directory of all registered users with their trip counts. |
| `GET` | `/api/admin/users/:userId/trips` | Admin | Fetch all travel itineraries created by a specific user (for admin modal view). |
| `PUT` | `/api/admin/users/:userId/role` | Admin | Toggle or update a user's role (`USER` <-> `ADMIN`). |
| `DELETE` | `/api/admin/users/:userId` | Admin | Permanently delete a user account and all their created trips. |

---

### 9. Destinations & Activity Trends
| HTTP Method | API Endpoint | Auth Required | Purpose & Description |
|---|---|---|---|
| `GET` | `/api/admin/popular-cities` | Admin | Fetch top popular sacred cities sorted by user trend popularity. |
| `GET` | `/api/admin/popular-activities` | Admin | Fetch top rated activities sorted by user trend rating. |
| `GET` | `/api/admin/user-trends` | Admin | Get overall platform user trends, average travel budget, and recent user signups. |

---