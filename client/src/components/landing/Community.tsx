import React from "react";
import { Link } from "react-router-dom";
import { Copy } from "lucide-react";
import { useGetPublicTripQuery } from "../../store/api/apiSlice";

export const Community: React.FC = () => {
  const { data: featuredTrip } = useGetPublicTripQuery("royal-rajasthan-2026");

  return (
    <section id="community" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Your Journey Could Inspire Someone Else.
          </h2>
          <p className="text-slate-600 text-sm font-medium">
            Explore public community itineraries or duplicate public plans directly to your profile.
          </p>
        </div>

        {featuredTrip && (
          <div className="max-w-3xl mx-auto bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-lg space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-black rounded-full uppercase">
                  Featured Itinerary
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-2">{featuredTrip.name}</h3>
                <p className="text-xs font-semibold text-slate-500">Agra → Jaipur → Udaipur • 9 Days</p>
              </div>

              <Link
                to={`/shared/${featuredTrip.shareCode}`}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-2xl flex items-center space-x-2 shadow-md"
              >
                <Copy className="w-4 h-4" />
                <span>View & Copy Trip</span>
              </Link>
            </div>

            <p className="text-xs text-slate-600 font-medium leading-relaxed">{featuredTrip.description}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Community;
