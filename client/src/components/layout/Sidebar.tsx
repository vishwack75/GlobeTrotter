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
    <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col justify-between p-6 min-h-screen sticky top-0 shadow-sm shrink-0 font-sans">
      <div className="space-y-6">
        {/* Header matching Excalidraw mockup with colorful blue combo text */}
        <div className="flex items-center space-x-3 px-1">
          {profile?.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-sky-100 border border-sky-200 flex items-center justify-center text-[#02639B] font-extrabold text-sm">
              {profile?.name ? profile.name.charAt(0) : "G"}
            </div>
          )}
          <div className="truncate">
            <h2 className="text-base font-black bg-gradient-to-r from-[#02639B] via-sky-500 to-indigo-600 bg-clip-text text-transparent leading-tight truncate">
              GlobeTrotter
            </h2>
            <p className="text-[10px] font-bold text-sky-600 tracking-tight">Premium Explorer</p>
          </div>
        </div>

        {/* + New Trip Pill Button */}
        <div className="pt-1">
          <Link
            to="/trips/create"
            className="w-full py-3 px-4 bg-[#02639B] hover:bg-[#024E7B] text-white font-extrabold text-xs rounded-full flex items-center justify-center space-x-2 shadow-md shadow-sky-900/15 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>New Trip</span>
          </Link>
        </div>

        {/* Nav list with right capsule active indicator */}
        <nav className="space-y-2 pt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-l-2xl rounded-r-full text-xs font-bold transition-all relative ${
                  isActive
                    ? "bg-[#E5F2FB] text-[#02639B] font-extrabold shadow-sm"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className={`w-4.5 h-4.5 ${isActive ? "text-[#02639B]" : "text-slate-400"}`} />
                <span>{item.label}</span>
                {isActive && (
                  <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-[#02639B] rounded-r-full" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom links */}
      <div className="pt-6 border-t border-slate-100 space-y-1">
        <Link
          to="/profile"
          className="flex items-center space-x-3 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors"
        >
          <Settings className="w-4 h-4 text-slate-400" />
          <span>Settings</span>
        </Link>
        <a
          href="#support"
          className="flex items-center space-x-3 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors"
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
