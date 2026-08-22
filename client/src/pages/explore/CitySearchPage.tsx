import React, { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { Search, Star, Heart } from "lucide-react";
import { useGetCitiesQuery, useToggleSaveDestinationMutation } from "../../store/api/apiSlice";
import { useToast } from "../../components/common/ToastContext";

export const CitySearchPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const { data: cities, isLoading } = useGetCitiesQuery({ q: query });
  const [toggleSave] = useToggleSaveDestinationMutation();
  const { showToast } = useToast();

  const handleToggleSave = async (cityId: string) => {
    try {
      const res = await toggleSave(cityId).unwrap();
      showToast(res.message || "Destination saved state toggled.", "info");
    } catch (err: any) {
      showToast(err?.data?.message || "Failed to save destination.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">City Search Page (Screen 8)</h1>
          <p className="text-slate-500 text-xs mt-1">Search, filter, and discover destination options and details</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search city, country or region..."
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
          <div className="p-12 text-center text-slate-400">Loading options...</div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Results</h2>

            <div className="space-y-4">
              {cities?.map((city: any) => (
                <div key={city._id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md hover:shadow-lg transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 rounded-2xl bg-slate-100 overflow-hidden shrink-0">
                      <img src={city.imageUrl} alt={city.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-extrabold text-slate-900 text-lg">{city.name}</h3>
                      <p className="text-xs text-slate-500">{city.country} • {city.region}</p>
                      <p className="text-xs text-slate-600 max-w-xl line-clamp-2">{city.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 shrink-0">
                    <div className="text-right text-xs">
                      <div className="font-extrabold text-amber-500 flex items-center justify-end space-x-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{city.popularity}</span>
                      </div>
                      <div className="text-slate-400 mt-1">Cost Index: {"$".repeat(city.costIndex)}</div>
                    </div>
                    <button
                      onClick={() => handleToggleSave(city._id)}
                      className="p-2.5 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 rounded-2xl border border-slate-200"
                    >
                      <Heart className="w-4 h-4" />
                    </button>
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

export default CitySearchPage;
