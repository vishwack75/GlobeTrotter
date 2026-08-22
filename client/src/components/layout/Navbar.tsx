import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Compass, Map, Shield, LogOut, Menu, X, Globe, Calendar, Users } from "lucide-react";
import { useGetProfileQuery, useLogoutMutation } from "../../store/api/apiSlice";

export const Navbar: React.FC = () => {
  const { data: profile } = useGetProfileQuery(undefined);
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout(undefined);
    navigate("/login");
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-sky-500 to-emerald-400 flex items-center justify-center shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-extrabold bg-gradient-to-r from-indigo-700 via-slate-800 to-sky-600 bg-clip-text text-transparent tracking-tight">
              GlobeTrotter
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/dashboard" className="text-slate-600 hover:text-indigo-600 text-sm font-semibold transition-colors">
              Dashboard
            </Link>
            <Link to="/trips" className="text-slate-600 hover:text-indigo-600 flex items-center space-x-1.5 text-sm font-semibold transition-colors">
              <Map className="w-4 h-4 text-emerald-500" />
              <span>My Trips</span>
            </Link>
            <Link to="/explore/cities" className="text-slate-600 hover:text-indigo-600 flex items-center space-x-1.5 text-sm font-semibold transition-colors">
              <Compass className="w-4 h-4 text-indigo-500" />
              <span>Explore</span>
            </Link>
            <Link to="/calendar" className="text-slate-600 hover:text-indigo-600 flex items-center space-x-1.5 text-sm font-semibold transition-colors">
              <Calendar className="w-4 h-4 text-amber-500" />
              <span>Calendar</span>
            </Link>
            <Link to="/community" className="text-slate-600 hover:text-indigo-600 flex items-center space-x-1.5 text-sm font-semibold transition-colors">
              <Users className="w-4 h-4 text-sky-500" />
              <span>Community</span>
            </Link>

            {profile?.role === "ADMIN" && (
              <Link to="/admin" className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center space-x-1.5 text-xs font-bold hover:bg-indigo-100 transition-all">
                <Shield className="w-3.5 h-3.5" />
                <span>Admin Panel</span>
              </Link>
            )}

            {profile ? (
              <div className="flex items-center space-x-4 pl-4 border-l border-slate-200">
                <Link to="/profile" className="flex items-center space-x-2 text-sm text-slate-700 hover:text-indigo-600">
                  <img
                    src={profile.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                    alt={profile.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/30"
                  />
                  <span className="font-semibold">{profile.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">
                  Sign In
                </Link>
                <Link to="/signup" className="px-4 py-2 text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md shadow-indigo-600/20 transition-all">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-600 hover:text-slate-900 p-2">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-2 shadow-lg">
          <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700 font-semibold">Dashboard</Link>
          <Link to="/trips" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700 font-semibold">My Trips</Link>
          <Link to="/explore/cities" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700 font-semibold">Explore Destinations</Link>
          <Link to="/calendar" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700 font-semibold">Calendar View</Link>
          <Link to="/community" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700 font-semibold">Community Feed</Link>
          {profile?.role === "ADMIN" && (
            <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-indigo-700 font-bold">Admin Panel</Link>
          )}
          {profile ? (
            <>
              <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700 font-semibold">Profile Settings</Link>
              <button onClick={() => { setMobileMenuOpen(false); handleLogout(); }} className="block w-full text-left py-2 text-rose-600 font-bold">Logout</button>
            </>
          ) : (
            <div className="pt-2 space-y-2">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center py-2 text-slate-700 font-semibold">Sign In</Link>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center py-2 bg-indigo-600 text-white rounded-xl font-bold">Get Started</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
