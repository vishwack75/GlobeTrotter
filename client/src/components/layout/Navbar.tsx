import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Compass, Map, Shield, LogOut, Menu, X, Globe } from "lucide-react";
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
    <nav className="bg-slate-950/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
              GlobeTrotter
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/dashboard" className="text-slate-300 hover:text-white flex items-center space-x-2 text-sm font-medium transition-colors">
              <span>Dashboard</span>
            </Link>
            <Link to="/trips" className="text-slate-300 hover:text-white flex items-center space-x-2 text-sm font-medium transition-colors">
              <Map className="w-4 h-4 text-emerald-400" />
              <span>My Trips</span>
            </Link>
            <Link to="/explore/cities" className="text-slate-300 hover:text-white flex items-center space-x-2 text-sm font-medium transition-colors">
              <Compass className="w-4 h-4 text-indigo-400" />
              <span>Explore</span>
            </Link>

            {profile?.role === "ADMIN" && (
              <Link to="/admin" className="px-3 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 flex items-center space-x-1.5 text-xs font-semibold hover:bg-indigo-600/30 transition-all">
                <Shield className="w-3.5 h-3.5" />
                <span>Admin Panel</span>
              </Link>
            )}

            {profile ? (
              <div className="flex items-center space-x-4 pl-4 border-l border-slate-800">
                <Link to="/profile" className="flex items-center space-x-2 text-sm text-slate-300 hover:text-white">
                  <img
                    src={profile.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                    alt={profile.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/50"
                  />
                  <span className="font-medium">{profile.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-slate-400 hover:text-rose-400 p-2 rounded-lg hover:bg-slate-900 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
                  Sign In
                </Link>
                <Link to="/signup" className="px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-all shadow-md shadow-indigo-600/20">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-400 hover:text-white p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 pt-2 pb-4 space-y-2">
          <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300 hover:text-white font-medium">Dashboard</Link>
          <Link to="/trips" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300 hover:text-white font-medium">My Trips</Link>
          <Link to="/explore/cities" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300 hover:text-white font-medium">Explore Destinations</Link>
          {profile?.role === "ADMIN" && (
            <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-indigo-400 font-semibold">Admin Panel</Link>
          )}
          {profile ? (
            <>
              <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300 hover:text-white font-medium">Profile Settings</Link>
              <button onClick={() => { setMobileMenuOpen(false); handleLogout(); }} className="block w-full text-left py-2 text-rose-400 font-medium">Logout</button>
            </>
          ) : (
            <div className="pt-2 space-y-2">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center py-2 text-slate-300">Sign In</Link>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center py-2 bg-indigo-600 text-white rounded-lg">Get Started</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
