import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  Compass,
  Search,
  User as UserIcon,
  Settings,
  Shield,
  LogOut,
  Plus,
  HelpCircle,
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
    { label: "Dashboard", icon: LayoutGrid, path: "/dashboard" },
    { label: "My Trips", icon: Compass, path: "/trips" },
    { label: "Search", icon: Search, path: "/explore/cities" },
    { label: "Profile", icon: UserIcon, path: "/profile" },
  ];

  if (profile?.role === "ADMIN") {
    navItems.push({ label: "Admin Panel", icon: Shield, path: "/admin" });
  }

  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col justify-between p-6 min-h-screen sticky top-0 shadow-sm shrink-0">
      <div className="space-y-6">
        <div className="flex items-center space-x-3 px-2">
          {profile?.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-10 h-10 rounded-full object-cover border border-slate-200"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold">
              {profile?.name ? profile.name.charAt(0) : "G"}
            </div>
          )}
          <div className="truncate">
            <h2 className="text-base font-black text-slate-900 leading-tight truncate">GlobeTrotter</h2>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">PREMIUM EXPLORER</p>
          </div>
        </div>

        <div className="pt-2">
          <Link
            to="/trips/create"
            className="w-full py-3 px-4 bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-xs rounded-full flex items-center justify-center space-x-2 shadow-md shadow-blue-700/25 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4" />
            <span>New Trip</span>
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
                className={`flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-extrabold transition-all relative ${
                  isActive
                    ? "bg-blue-50/80 text-blue-700 shadow-sm font-black"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                <span>{item.label}</span>
                {isActive && (
                  <div className="absolute right-0 top-1.5 bottom-1.5 w-1 bg-blue-600 rounded-l-full" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-6 border-t border-slate-100 space-y-1.5">
        <Link
          to="/profile"
          className="flex items-center space-x-3 px-4 py-2.5 text-xs font-extrabold text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors"
        >
          <Settings className="w-4 h-4 text-slate-400" />
          <span>Settings</span>
        </Link>
        <a
          href="#support"
          className="flex items-center space-x-3 px-4 py-2.5 text-xs font-extrabold text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors"
        >
          <HelpCircle className="w-4 h-4 text-slate-400" />
          <span>Support</span>
        </a>
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-2.5 text-xs font-extrabold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors mt-2"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
