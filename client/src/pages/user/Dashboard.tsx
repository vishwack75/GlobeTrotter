import React, { useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "../../components/layout/PageLayout";
import { Plus, Search, Filter, ArrowUpDown, Calendar, Star } from "lucide-react";
import { useGetTripsQuery, useGetCitiesQuery, useGetProfileQuery } from "../../store/api/apiSlice";
import { useDebounce } from "../../hooks/useDebounce";
import { CardSkeleton } from "../../components/common/Skeleton";

export const Dashboard: React.FC = () => {
  const { data: profile } = useGetProfileQuery(undefined);
  const { data: trips, isLoading: tripsLoading, isFetching: tripsFetching } = useGetTripsQuery(undefined);
  const { data: popularCities, isLoading: citiesLoading } = useGetCitiesQuery({ limit: 5 });

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);

  const filteredTrips = trips?.filter((t: any) =>
    t.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <PageLayout>
      <div className="space-y-6 sm:space-y-8">
        {/* Dashboard Header with Create Trip Action Button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Dashboard</h1>
            <p className="text-slate-500 text-xs sm:text-sm font-medium mt-0.5">
              Welcome back, <strong className="text-slate-800 font-extrabold">{profile?.name || "Explorer"}</strong>! Manage your Indian temple yatras and multi-city itineraries.
            </p>
          </div>

          <Link
            to="/trips/create"
            className="px-6 py-3 bg-[#02639B] hover:bg-[#024E7B] text-white font-extrabold text-xs rounded-full flex items-center space-x-2 shadow-md shadow-sky-900/15 transition-all hover:scale-105 shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Create Trip</span>
          </Link>
        </div>

        {/* Search & Action Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search places or trip itineraries..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#02639B]"
            />
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto pb-1 md:pb-0">
            <button className="px-4 py-2 bg-[#02639B] hover:bg-[#024E7B] text-white text-xs font-bold rounded-xl shadow-xs shrink-0 cursor-pointer">
              Group by
            </button>
            <button className="px-4 py-2 bg-[#02639B] hover:bg-[#024E7B] text-white text-xs font-bold rounded-xl shadow-xs shrink-0 cursor-pointer">
              <Filter className="w-3.5 h-3.5 text-white inline mr-1" />
              Filter
            </button>
            <button className="px-4 py-2 bg-[#02639B] hover:bg-[#024E7B] text-white text-xs font-bold rounded-xl shadow-xs shrink-0 cursor-pointer">
              <ArrowUpDown className="w-3.5 h-3.5 text-white inline mr-1" />
              Sort by...
            </button>
          </div>
        </div>

        {/* Top Regional Selections */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">Top Regional Selections</h2>
            <Link to="/explore/cities" className="text-xs font-bold text-[#02639B] hover:underline">Explore All</Link>
          </div>

          {citiesLoading ? (
            <div className="p-8 text-center text-slate-400">Loading selections...</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
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

        {/* Previous Trips & Active Plans */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">Previous Trips & Active Plans</h2>
            <Link to="/trips" className="text-xs font-bold text-[#02639B] hover:underline">View All Trips</Link>
          </div>

          {tripsLoading || tripsFetching ? (
            <CardSkeleton count={3} />
          ) : filteredTrips && filteredTrips.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredTrips.map((trip: any) => (
                <Link
                  key={trip._id}
                  to={`/trips/${trip._id}`}
                  className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md hover:shadow-xl transition-all space-y-4 group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    {trip.coverPhoto && (
                      <div className="h-36 rounded-2xl overflow-hidden bg-slate-100 relative">
                        <img
                          src={trip.coverPhoto}
                          alt={trip.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#02639B] transition-colors">
                      {trip.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2">{trip.description || "No description provided."}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-[#02639B]" />
                      <span>{new Date(trip.startDate).toLocaleDateString()}</span>
                    </div>
                    <span className="font-extrabold text-slate-800">₹{trip.budgetLimit}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-500">
              No trips matching search query found.
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
