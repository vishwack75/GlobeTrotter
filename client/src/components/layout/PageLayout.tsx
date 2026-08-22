import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Search, Menu, X, LayoutGrid, Compass, User as UserIcon, Shield, LogOut } from "lucide-react";
import { useGetProfileQuery, useLogoutMutation } from "../../store/api/apiSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: profile } = useGetProfileQuery(undefined);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
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
    <div className="min-h-screen bg-slate-50 flex font-sans antialiased text-slate-900">
      {/* Desktop Sticky Sidebar */}
      <Sidebar />

      {/* Mobile Drawer Overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={() => setMobileSidebarOpen(false)} />

          <div className="relative w-64 max-w-xs bg-white h-full p-6 flex flex-col justify-between shadow-2xl z-10">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {profile?.avatarUrl ? (
                    <img src={profile.avatarUrl} alt={profile.name} className="w-9 h-9 rounded-full object-cover" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-sky-100 text-[#02639B] flex items-center justify-center font-bold text-xs">
                      {profile?.name?.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h2 className="text-sm font-black text-slate-900 leading-tight">GlobeTrotter</h2>
                  </div>
                </div>
                <button onClick={() => setMobileSidebarOpen(false)} className="p-1 text-slate-500 hover:text-slate-800">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-2 pt-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                        isActive ? "bg-[#E5F2FB] text-[#02639B] font-extrabold shadow-xs" : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? "text-[#02639B]" : "text-slate-400"}`} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 text-xs font-extrabold text-rose-600 hover:bg-rose-50 rounded-2xl cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center space-x-3 flex-1 max-w-md">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 text-slate-600 hover:text-slate-900 md:hidden rounded-xl hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="relative w-full">
              <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Quick search places, trips..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#02639B]"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            {profile && (
              <Link to="/profile" className="flex items-center space-x-2 pl-2">
                {profile.avatarUrl ? (
                  <img src={profile.avatarUrl} alt={profile.name} className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-sky-100 text-[#02639B] flex items-center justify-center font-extrabold text-xs">
                    {profile.name?.charAt(0)}
                  </div>
                )}
                <span className="text-xs font-extrabold text-slate-800 hidden sm:inline">{profile.name}</span>
              </Link>
            )}
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
};

export default PageLayout;
