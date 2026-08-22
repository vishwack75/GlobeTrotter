import React, { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { Search, Clock } from "lucide-react";
import { useGetActivitiesQuery } from "../../store/api/apiSlice";

export const ActivitySearchPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const { data: activities, isLoading } = useGetActivitiesQuery({ q: query });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Activity Search Page (Screen 8)</h1>
          <p className="text-slate-500 text-xs mt-1">Explore options and details for activities, tours, and sightseeing</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Paragliding, Food tour, Museum..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div className="flex items-center space-x-2">
            <button className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200">
              Group by
            </button>
            <button className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200">
              Filter
            </button>
            <button className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200">
              Sort by...
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="p-12 text-center text-slate-400">Loading activity options...</div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Results</h2>

            <div className="space-y-4">
              {activities?.map((act: any) => (
                <div key={act._id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md hover:shadow-lg transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 rounded-2xl bg-slate-100 overflow-hidden shrink-0">
                      <img src={act.imageUrl} alt={act.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-extrabold text-slate-900 text-lg">{act.title}</h3>
                        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-bold rounded">
                          {act.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 max-w-xl line-clamp-2">{act.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-xs shrink-0">
                    <div className="flex items-center space-x-1 text-slate-500 font-medium">
                      <Clock className="w-4 h-4 text-indigo-600" />
                      <span>{act.duration} mins</span>
                    </div>
                    <span className="text-emerald-600 font-extrabold text-base">${act.cost}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ActivitySearchPage;
