import React from "react";
import { Navigate } from "react-router-dom";
import { useGetProfileQuery } from "../store/api/apiSlice";

export const UserRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: profile, isLoading, error } = useGetProfileQuery(undefined);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !profile) {
    return <Navigate to="/login" replace />;
  }

  if (profile.role === "ADMIN") {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};

export default UserRoute;
