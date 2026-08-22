import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "../pages/home/LandingPage";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import ForgotPassword from "../pages/auth/ForgotPassword";

import Dashboard from "../pages/user/Dashboard";
import MyTrips from "../pages/trips/MyTrips";
import CreateTrip from "../pages/trips/CreateTrip";
import TripDetails from "../pages/trips/TripDetails";

import CitySearchPage from "../pages/explore/CitySearchPage";
import ActivitySearchPage from "../pages/explore/ActivitySearchPage";

import PublicItinerary from "../pages/shared/PublicItinerary";
import ProfileSettings from "../pages/profile/ProfileSettings";
import AdminDashboard from "../pages/admin/AdminDashboard";

import CalendarView from "../pages/calendar/CalendarView";
import CommunityFeed from "../pages/community/CommunityFeed";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trips"
        element={
          <ProtectedRoute>
            <MyTrips />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trips/create"
        element={
          <ProtectedRoute>
            <CreateTrip />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trips/:id"
        element={
          <ProtectedRoute>
            <TripDetails />
          </ProtectedRoute>
        }
      />

      <Route path="/explore/cities" element={<CitySearchPage />} />
      <Route path="/explore/activities" element={<ActivitySearchPage />} />

      <Route
        path="/calendar"
        element={
          <ProtectedRoute>
            <CalendarView />
          </ProtectedRoute>
        }
      />
      <Route path="/community" element={<CommunityFeed />} />

      <Route path="/shared/:shareCode" element={<PublicItinerary />} />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfileSettings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
