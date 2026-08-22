import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  Compass,
  Search,
  User as UserIcon,
  Shield,
  LogOut,
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
    <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col justify-between p-6 h-screen sticky top-0 shadow-sm shrink-0 font-sans z-40">
      <div className="space-y-6">
        {/* Header with user avatar and title */}
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
          </div>
        </div>

        {/* Nav list */}
        <nav className="space-y-2 pt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-[#E5F2FB] text-[#02639B] font-extrabold shadow-xs"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className={`w-4.5 h-4.5 ${isActive ? "text-[#02639B]" : "text-slate-400"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom section with ONLY Sign Out button */}
      <div className="pt-4 border-t border-slate-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-xs font-extrabold text-rose-600 hover:bg-rose-50 rounded-2xl transition-colors cursor-pointer"
        >
          <LogOut className="w-4.5 h-4.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
