import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Compass,
  Map,
  Calendar,
  Users,
  User,
  Shield,
  LogOut,
  Globe,
  PlusCircle,
  Activity as ActivityIcon,
} from "lucide-react";
import { useGetProfileQuery, useLogoutMutation } from "../../store/api/apiSlice";

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data: profile } = useGetProfileQuery(undefined);
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    await logout(undefined);
    navigate("/login");
  };

  const navItems = [
    { label: "Dashboard", icon: Globe, path: "/dashboard" },
    { label: "My Trips", icon: Map, path: "/trips" },
    { label: "Explore Cities", icon: Compass, path: "/explore/cities" },
    { label: "Activities", icon: ActivityIcon, path: "/explore/activities" },
    { label: "Calendar", icon: Calendar, path: "/calendar" },
    { label: "Community", icon: Users, path: "/community" },
    { label: "Profile", icon: User, path: "/profile" },
  ];

  if (profile?.role === "ADMIN") {
    navItems.push({ label: "Admin Panel", icon: Shield, path: "/admin" });
  }

  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col justify-between p-5 min-h-screen sticky top-0 shadow-sm shrink-0">
      <div className="space-y-6">
        <Link to="/" className="flex items-center space-x-3 group px-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-black bg-gradient-to-r from-blue-600 via-slate-900 to-cyan-600 bg-clip-text text-transparent tracking-tight block leading-none">
              GlobeTrotter
            </span>
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Plan Less. Travel More.</span>
          </div>
        </Link>

        <div className="px-2 pt-2">
          <Link
            to="/trips/create"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-2xl flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/25 transition-all hover:scale-[1.02]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Plan a New Trip</span>
          </Link>
        </div>

        <nav className="space-y-1.5 pt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-3.5 py-3 rounded-2xl text-xs font-extrabold transition-all ${
                  isActive
                    ? "bg-blue-50 text-blue-700 border border-blue-200 shadow-sm"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {profile && (
        <div className="pt-4 border-t border-slate-100 space-y-3 px-2">
          <div className="flex items-center space-x-3">
            <img
              src={profile.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
              alt={profile.name}
              className="w-9 h-9 rounded-full object-cover border border-slate-200"
            />
            <div className="flex-1 truncate">
              <p className="text-xs font-extrabold text-slate-900 truncate">{profile.name}</p>
              <p className="text-[10px] text-slate-400 font-semibold truncate">{profile.email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full py-2 px-3 text-slate-500 hover:text-rose-600 hover:bg-rose-50 text-xs font-bold rounded-xl flex items-center space-x-2 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
