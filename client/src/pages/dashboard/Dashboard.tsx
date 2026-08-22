import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { Plus, Compass, MapPin, Calendar, DollarSign, ArrowRight, Star } from "lucide-react";
import { useGetProfileQuery, useGetTripsQuery, useGetCitiesQuery } from "../../store/api/apiSlice";

export const Dashboard: React.FC = () => {
  const { data: profile } = useGetProfileQuery(undefined);
  const { data: trips, isLoading: tripsLoading } = useGetTripsQuery(undefined);
  const { data: popularCities, isLoading: citiesLoading } = useGetCitiesQuery({ limit: 4 });

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="bg-gradient-to-r from-indigo-900/60 via-slate-900 to-emerald-900/40 p-6 sm:p-8 rounded-3xl border border-indigo-500/20 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-3 max-w-2xl">
            <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-semibold uppercase tracking-wider border border-indigo-500/30">
              Travel Command Center
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              Hello, {profile?.name || "Traveler"}!
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Design multi-city itineraries, customize budgets, discover exciting local activities, and share your adventures seamlessly.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to="/trips/create"
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl flex items-center space-x-2 text-sm shadow-lg shadow-indigo-600/30 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Plan New Trip</span>
              </Link>
              <Link
                to="/explore/cities"
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-xl flex items-center space-x-2 text-sm border border-slate-700 transition-all"
              >
                <Compass className="w-4 h-4 text-indigo-400" />
                <span>Explore Destinations</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Total Trips</p>
              <p className="text-2xl font-bold text-white">{trips?.length || 0}</p>
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Saved Destinations</p>
              <p className="text-2xl font-bold text-white">{profile?.savedDestinations?.length || 0}</p>
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Account Role</p>
              <p className="text-2xl font-bold text-white uppercase">{profile?.role || "USER"}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">My Recent Trips</h2>
            <Link to="/trips" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center space-x-1">
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {tripsLoading ? (
            <div className="p-8 text-center text-slate-500">Loading trips...</div>
          ) : trips && trips.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips.slice(0, 3).map((trip: any) => (
                <Link
                  key={trip._id}
                  to={`/trips/${trip._id}`}
                  className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden hover:border-indigo-500/50 transition-all group"
                >
                  <div className="h-44 relative bg-slate-900">
                    <img
                      src={trip.coverPhoto || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80"}
                      alt={trip.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    <span className="absolute top-3 right-3 px-2.5 py-1 bg-slate-950/80 backdrop-blur-md border border-slate-700 text-xs text-slate-300 rounded-lg">
                      {trip.stops?.length || 0} Stops
                    </span>
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                      {trip.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {trip.description || "No description provided."}
                    </p>
                    <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
                      <span>{new Date(trip.startDate).toLocaleDateString()}</span>
                      <span className="font-semibold text-emerald-400">${trip.budgetLimit} Limit</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 text-center space-y-3">
              <p className="text-slate-400 text-sm">You haven't created any trips yet.</p>
              <Link
                to="/trips/create"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Create Your First Trip</span>
              </Link>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Recommended Destinations</h2>
            <Link to="/explore/cities" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center space-x-1">
              <span>Explore All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {citiesLoading ? (
            <div className="p-8 text-center text-slate-500">Loading destinations...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularCities?.slice(0, 4).map((city: any) => (
                <div key={city._id} className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden group">
                  <div className="h-36 relative bg-slate-900">
                    <img src={city.imageUrl} alt={city.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    <div className="absolute bottom-2 left-3 flex items-center space-x-1 text-amber-400 text-xs font-bold bg-slate-950/80 px-2 py-0.5 rounded-md border border-slate-800">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{city.popularity}</span>
                    </div>
                  </div>
                  <div className="p-4 space-y-1">
                    <h4 className="font-bold text-white text-sm">{city.name}</h4>
                    <p className="text-xs text-slate-400">{city.country} • {city.region}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
