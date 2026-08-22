import React, { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { Search, Clock } from "lucide-react";
import { useGetActivitiesQuery } from "../../store/api/apiSlice";

export const ActivitySearchPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const { data: activities, isLoading } = useGetActivitiesQuery({ q: query });

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Explore Things to Do</h1>
          <p className="text-slate-400 text-sm">Browse curated sightseeing, cultural, food, and adventure activities</p>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search activities by keyword..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {isLoading ? (
          <div className="p-12 text-center text-slate-500">Loading activities...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {activities?.map((act: any) => (
              <div key={act._id} className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex flex-col group">
                <div className="h-44 relative bg-slate-900">
                  <img src={act.imageUrl} alt={act.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold rounded-md">
                    {act.category}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-bold text-white text-base">{act.title}</h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{act.description}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{act.duration} mins</span>
                    </div>
                    <div className="font-bold text-emerald-400 text-sm">
                      ${act.cost}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ActivitySearchPage;
