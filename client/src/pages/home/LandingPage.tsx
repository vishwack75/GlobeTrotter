import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { Compass, Star, Plus, ArrowRight } from "lucide-react";
import { useGetCitiesQuery, useGetPublicTripQuery } from "../../store/api/apiSlice";

export const LandingPage: React.FC = () => {
  const { data: popularCities } = useGetCitiesQuery({ limit: 4 });
  const { data: samplePublicTrip } = useGetPublicTripQuery("euro-tour-2026");

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 space-y-16 py-8">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-14 shadow-2xl border border-indigo-800/40">
            <div className="relative z-10 max-w-2xl space-y-6">
              <span className="px-3.5 py-1 bg-white/10 backdrop-blur-md text-sky-300 rounded-full text-xs font-extrabold uppercase tracking-widest border border-white/20">
                End-To-End Travel Intelligence
              </span>
              <h1 className="text-4xl sm:text-6xl font-black leading-tight tracking-tight">
                Dream, Design & Explore Global Journeys
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                Build personalized multi-city itineraries, estimate exact daily budgets, assign activities, and share travel plans with a global community.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/trips/create"
                  className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold rounded-2xl flex items-center space-x-2 text-sm shadow-xl shadow-indigo-600/30 transition-all hover:scale-105"
                >
                  <Plus className="w-5 h-5" />
                  <span>Plan a New Trip</span>
                </Link>
                <Link
                  to="/explore/cities"
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-extrabold rounded-2xl flex items-center space-x-2 text-sm border border-white/20 transition-all"
                >
                  <Compass className="w-5 h-5 text-sky-400" />
                  <span>Explore Destinations</span>
                </Link>
              </div>
            </div>

            <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block opacity-40 mix-blend-overlay">
              <img
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80"
                alt="Banner Image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Top Regional Selections</h2>
              <p className="text-slate-500 text-xs mt-1">Populated dynamically from backend API database</p>
            </div>
            <Link to="/explore/cities" className="text-xs font-bold text-indigo-600 hover:underline flex items-center space-x-1">
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {popularCities?.slice(0, 4).map((city: any) => (
              <div key={city._id} className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden hover:shadow-xl transition-all group">
                <div className="h-40 relative bg-slate-100">
                  <img src={city.imageUrl} alt={city.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-3 right-3 px-2 py-1 bg-white/90 backdrop-blur-md rounded-lg text-amber-500 font-extrabold text-xs flex items-center space-x-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{city.popularity}</span>
                  </div>
                </div>
                <div className="p-4 space-y-1">
                  <h3 className="font-bold text-slate-900 text-base">{city.name}</h3>
                  <p className="text-xs text-slate-500">{city.country} • {city.region}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {samplePublicTrip && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Featured Public Itinerary</h2>
              <p className="text-slate-500 text-xs mt-1">Get inspired by real community journeys</p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-3 max-w-xl">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold uppercase">
                  Community Favorite
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900">{samplePublicTrip.name}</h3>
                <p className="text-slate-600 text-sm">{samplePublicTrip.description}</p>
                <div className="flex items-center space-x-4 text-xs font-bold text-slate-500">
                  <span>{samplePublicTrip.stops?.length || 0} Destination Stops</span>
                  <span>Budget: ${samplePublicTrip.budgetLimit}</span>
                </div>
              </div>

              <Link
                to={`/shared/${samplePublicTrip.shareCode}`}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all shrink-0"
              >
                View & Copy Itinerary
              </Link>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
