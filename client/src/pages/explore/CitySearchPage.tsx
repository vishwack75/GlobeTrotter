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
      showToast(res.message || "Saved destination updated.", "info");
    } catch (err: any) {
      showToast(err?.data?.message || "Failed to save destination.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Explore Destinations</h1>
          <p className="text-slate-400 text-sm">Discover top rated global cities and add them to your travel plans</p>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by city, country or region..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {isLoading ? (
          <div className="p-12 text-center text-slate-500">Loading cities...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cities?.map((city: any) => (
              <div key={city._id} className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex flex-col group">
                <div className="h-44 relative bg-slate-900">
                  <img src={city.imageUrl} alt={city.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <button
                    onClick={() => handleToggleSave(city._id)}
                    className="absolute top-3 right-3 p-2 bg-slate-950/80 backdrop-blur-md rounded-full text-slate-300 hover:text-rose-400 border border-slate-700"
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-3 left-3 flex items-center space-x-1 text-xs text-amber-400 font-bold bg-slate-950/80 px-2 py-0.5 rounded-md border border-slate-800">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{city.popularity}</span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-bold text-white text-base">{city.name}</h3>
                    <p className="text-xs text-slate-400">{city.country} • {city.region}</p>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-2">{city.description}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-500">Cost Index: {"$".repeat(city.costIndex)}</span>
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

export default CitySearchPage;
