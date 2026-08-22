import React from "react";
import { Calendar, MapPin } from "lucide-react";

export const ProductShowcase: React.FC = () => {
  return (
    <section className="py-20 bg-white border-t border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            From Dreaming to Departure.
          </h2>
          <p className="text-slate-600 text-sm font-medium">
            Experience our intelligent SaaS planning interface built for multi-city travel.
          </p>
        </div>

        <div className="bg-slate-900 rounded-3xl p-4 sm:p-8 shadow-2xl border border-slate-800 space-y-4">
          <div className="flex items-center space-x-2 pb-4 border-b border-slate-800">
            <div className="w-3 h-3 rounded-full bg-rose-500" />
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-xs text-slate-400 font-mono ml-4">globetrotter.app/trips/royal-rajasthan-2026</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 pt-2">
            <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/50 space-y-3 text-white">
              <span className="px-2.5 py-1 bg-blue-500/20 text-blue-400 text-[10px] font-extrabold rounded uppercase">
                Active Itinerary
              </span>
              <h4 className="font-extrabold text-base">Golden Triangle & Rajasthan</h4>
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Jaipur → Agra → Udaipur</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Oct 1 – Oct 10 (9 Days)</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/50 space-y-3 text-white">
              <span className="text-xs text-slate-400 font-bold uppercase">Estimated Budget</span>
              <p className="text-3xl font-black text-emerald-400">₹85,400</p>
              <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full w-[65%]" />
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Under budget target</p>
            </div>

            <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/50 space-y-3 text-white">
              <span className="text-xs text-slate-400 font-bold uppercase">Scheduled Stops</span>
              <p className="text-3xl font-black text-cyan-400">3 Cities</p>
              <p className="text-xs text-slate-300">12 Curated Activities Included</p>
            </div>

            <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/50 space-y-3 text-white">
              <span className="text-xs text-slate-400 font-bold uppercase">Average / Day</span>
              <p className="text-3xl font-black text-amber-400">₹9,488</p>
              <p className="text-xs text-slate-300">Optimized across transport & stay</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
