import React from "react";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { Search, Bell } from "lucide-react";
import { useGetProfileQuery } from "../../store/api/apiSlice";
import { Link } from "react-router-dom";

export const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: profile } = useGetProfileQuery(undefined);

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans antialiased text-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center space-x-4 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Quick search places, trips..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-600"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-50 transition-colors relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full" />
            </button>
            {profile && (
              <Link to="/profile" className="flex items-center space-x-2 pl-2 border-l border-slate-200">
                {profile.avatarUrl ? (
                  <img src={profile.avatarUrl} alt={profile.name} className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center font-extrabold text-xs">
                    {profile.name?.charAt(0)}
                  </div>
                )}
                <span className="text-xs font-extrabold text-slate-800 hidden sm:inline">{profile.name}</span>
              </Link>
            )}
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8 max-w-7xl w-full mx-auto">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default PageLayout;
