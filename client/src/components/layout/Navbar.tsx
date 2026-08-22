import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Compass, User as UserIcon, LogOut, Globe, Shield } from "lucide-react";
import { useGetProfileQuery, useLogoutMutation } from "../../store/api/apiSlice";

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { data: profile } = useGetProfileQuery(undefined);
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    await logout(undefined);
    navigate("/login");
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-600/30 group-hover:scale-105 transition-transform">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-black bg-gradient-to-r from-indigo-600 to-slate-900 bg-clip-text text-transparent tracking-tight">
            GlobeTrotter
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-6 text-xs font-extrabold text-slate-600">
          <Link to="/dashboard" className="hover:text-indigo-600 transition-colors">
            Dashboard
          </Link>
          <Link to="/trips" className="hover:text-indigo-600 transition-colors">
            My Trips
          </Link>
          <Link to="/explore/cities" className="hover:text-indigo-600 transition-colors flex items-center space-x-1">
            <Compass className="w-3.5 h-3.5 text-indigo-600" />
            <span>Explore Places</span>
          </Link>
          <Link to="/calendar" className="hover:text-indigo-600 transition-colors">
            Calendar
          </Link>
          <Link to="/community" className="hover:text-indigo-600 transition-colors">
            Community
          </Link>
          {profile?.role === "ADMIN" && (
            <Link to="/admin" className="text-indigo-600 hover:text-indigo-700 flex items-center space-x-1 font-bold">
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Panel</span>
            </Link>
          )}
        </div>

        <div className="flex items-center space-x-3">
          {profile ? (
            <div className="flex items-center space-x-3">
              <Link to="/profile" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                {profile.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="w-8 h-8 rounded-full object-cover border border-slate-200"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                    <UserIcon className="w-4 h-4" />
                  </div>
                )}
                <span className="text-xs font-bold text-slate-800 hidden sm:inline">{profile.name}</span>
              </Link>

              <button
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                to="/login"
                className="px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:text-indigo-600 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold rounded-xl shadow-md transition-all"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
