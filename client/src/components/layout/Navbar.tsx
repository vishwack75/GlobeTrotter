import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Compass, User as UserIcon, LogOut, Globe, Shield } from "lucide-react";
import { useGetProfileQuery, useLogoutMutation } from "../../store/api/apiSlice";

interface NavbarProps {
  isAdminPanel?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isAdminPanel = false }) => {
  const navigate = useNavigate();
  const { data: profile } = useGetProfileQuery(undefined);
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    await logout(undefined);
    navigate("/login");
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-[#02639B] flex items-center justify-center shadow-md shadow-sky-950/20 group-hover:scale-105 transition-transform">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-black text-slate-900 tracking-tight">
            GlobeTrotter
          </span>
        </Link>

        {/* User Nav Links - Hidden in Admin Panel */}
        {!isAdminPanel && (
          <div className="hidden md:flex items-center space-x-6 text-xs font-extrabold text-slate-600">
            <Link to="/dashboard" className="hover:text-[#02639B] transition-colors">
              Dashboard
            </Link>
            <Link to="/trips" className="hover:text-[#02639B] transition-colors">
              My Trips
            </Link>
            <Link to="/explore/cities" className="hover:text-[#02639B] transition-colors flex items-center space-x-1">
              <Compass className="w-3.5 h-3.5 text-[#02639B]" />
              <span>Explore Places</span>
            </Link>
            <Link to="/calendar" className="hover:text-[#02639B] transition-colors">
              Calendar
            </Link>
            <Link to="/community" className="hover:text-[#02639B] transition-colors">
              Community
            </Link>
            {profile?.role === "ADMIN" && (
              <Link to="/admin" className="text-[#02639B] hover:text-[#024E7B] flex items-center space-x-1 font-bold">
                <Shield className="w-3.5 h-3.5" />
                <span>Admin Panel</span>
              </Link>
            )}
          </div>
        )}

        {/* Right side profile / actions */}
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
                  <div className="w-8 h-8 rounded-full bg-sky-50 border border-sky-100 flex items-center justify-center text-[#02639B]">
                    <UserIcon className="w-4 h-4" />
                  </div>
                )}
                <span className="text-xs font-bold text-slate-800 hidden sm:inline">{profile.name}</span>
              </Link>

              <button
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                to="/login"
                className="px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:text-[#02639B] transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-[#02639B] hover:bg-[#024E7B] text-white text-xs font-extrabold rounded-xl shadow-md transition-all"
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
