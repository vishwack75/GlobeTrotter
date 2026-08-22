import React from "react";
import { Link } from "react-router-dom";
import { Star, ArrowRight } from "lucide-react";
import { useGetCitiesQuery } from "../../store/api/apiSlice";

export const Destinations: React.FC = () => {
  const { data: cities } = useGetCitiesQuery({ limit: 6 });

  return (
    <section id="explore" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Where Will You Go Next?
            </h2>
            <p className="text-slate-600 text-sm font-medium">
              Explore curated Indian and global destinations with popularity ratings & cost indexes.
            </p>
          </div>
          <Link
            to="/explore/cities"
            className="text-xs font-black text-[#02639B] hover:underline flex items-center space-x-1"
          >
            <span>Explore All Places</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities?.map((city: any) => (
            <div
              key={city._id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden group flex flex-col justify-between hover:border-[#02639B] transition-colors"
            >
              <div className="h-56 relative bg-slate-100 overflow-hidden">
                <img
                  src={city.imageUrl}
                  alt={city.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <div className="absolute top-4 right-4 px-2.5 py-1 bg-white/90 rounded-xl text-amber-600 font-extrabold text-xs flex items-center space-x-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{city.popularity}</span>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-black">{city.name}</h3>
                  <p className="text-xs text-slate-200 font-semibold">{city.country} • {city.region}</p>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-xs text-slate-600 line-clamp-2 font-medium">{city.description}</p>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-semibold">Cost Index: {"$".repeat(city.costIndex)}</span>
                  <Link
                    to="/signup"
                    className="px-4 py-2 bg-[#02639B] hover:bg-[#024E7B] text-white font-extrabold rounded-full transition-colors"
                  >
                    Add to Trip
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;
