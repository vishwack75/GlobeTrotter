import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { Plus, Search, Filter, ArrowUpDown, Calendar, Star } from "lucide-react";
import { useGetTripsQuery, useGetCitiesQuery, useGetProfileQuery } from "../../store/api/apiSlice";

export const Dashboard: React.FC = () => {
  const { data: profile } = useGetProfileQuery(undefined);
  const { data: trips, isLoading: tripsLoading } = useGetTripsQuery(undefined);
  const { data: popularCities, isLoading: citiesLoading } = useGetCitiesQuery({ limit: 5 });

  const [searchQuery, setSearchQuery] = useState("");

  const filteredTrips = trips?.filter((t: any) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-12 shadow-2xl border border-indigo-800/40">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="px-3.5 py-1 bg-white/10 backdrop-blur-md text-sky-300 rounded-full text-xs font-extrabold uppercase tracking-widest border border-white/20">
              Welcome Back, {profile?.name || "Traveler"}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Main Landing Page (Screen 3)
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Design personalized multi-city itineraries, organize daily activities, and manage travel budgets dynamically.
            </p>
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden md:block opacity-30 mix-blend-overlay">
            <img
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80"
              alt="Banner Image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search bar ...."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div className="flex items-center space-x-2">
            <button className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200">
              Group by
            </button>
            <button className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200">
              <Filter className="w-3.5 h-3.5 text-slate-500 inline mr-1" />
              Filter
            </button>
            <button className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500 inline mr-1" />
              Sort by...
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Top Regional Selections</h2>
            <Link to="/explore/cities" className="text-xs font-bold text-indigo-600 hover:underline">Explore All</Link>
          </div>

          {citiesLoading ? (
            <div className="p-8 text-center text-slate-400">Loading selections...</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {popularCities?.map((city: any) => (
                <div key={city._id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all group">
                  <div className="h-28 relative bg-slate-100">
                    <img src={city.imageUrl} alt={city.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-white/90 rounded text-[10px] font-extrabold text-amber-500 flex items-center space-x-1">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{city.popularity}</span>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold text-slate-900 text-sm truncate">{city.name}</h3>
                    <p className="text-[11px] text-slate-500 truncate">{city.country}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Previous Trips & Active Plans</h2>
            <Link to="/trips" className="text-xs font-bold text-indigo-600 hover:underline">View All Trips</Link>
          </div>

          {tripsLoading ? (
            <div className="p-8 text-center text-slate-400">Loading trips...</div>
          ) : filteredTrips && filteredTrips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredTrips.map((trip: any) => (
                <Link
                  key={trip._id}
                  to={`/trips/${trip._id}`}
                  className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md hover:shadow-xl transition-all space-y-4 group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="h-36 rounded-2xl overflow-hidden bg-slate-100 relative">
                      <img
                        src={trip.coverPhoto || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80"}
                        alt={trip.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {trip.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2">{trip.description || "No description provided."}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{new Date(trip.startDate).toLocaleDateString()}</span>
                    </div>
                    <span className="font-extrabold text-slate-800">${trip.budgetLimit}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-500">
              No trips created yet. Click below to start planning!
            </div>
          )}
        </div>

        <div className="fixed bottom-6 right-6 z-40">
          <Link
            to="/trips/create"
            className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-full flex items-center space-x-2 text-sm shadow-2xl shadow-indigo-600/40 transition-all hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            <span>+ Plan a trip</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
