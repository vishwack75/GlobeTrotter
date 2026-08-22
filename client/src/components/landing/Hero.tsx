import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Star } from "lucide-react";

export const Hero: React.FC = () => {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-linear-to-b from-slate-50 via-slate-50 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="px-4 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-black uppercase tracking-widest inline-block">
              Plan Less. Travel More.
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-slate-900 leading-tight tracking-tight">
              Plan Your Journey. <br />
              <span className="font-serif italic text-amber-600 font-normal">Discover Your World.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl font-medium">
              Architecting personalized multi-city itineraries, smart budgets, beautiful timelines, and Indian and global destinations around the way you want to travel.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                to="/signup"
                className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm rounded-full shadow-xl shadow-slate-900/10 flex items-center justify-center space-x-2 transition-all hover:scale-105"
              >
                <span>Start Planning — It's Free</span>
                <ArrowRight className="w-4 h-4 text-cyan-400" />
              </Link>
              <a
                href="#explore"
                className="px-8 py-4 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-extrabold text-sm rounded-full flex items-center justify-center transition-all shadow-sm"
              >
                Explore Destinations
              </a>
            </div>

            <div className="pt-4 flex flex-wrap gap-6 text-xs font-bold text-slate-500">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Multi-City Itineraries</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Automatic Budget Breakdown</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1000&q=80"
                alt="Jaipur Royal Palace Travel"
                className="w-full h-100 object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 via-transparent to-transparent" />
            </div>

            <div className="absolute -top-6 -left-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-xl space-y-1 hidden sm:block">
              <p className="text-xs font-extrabold text-slate-900">✈ Jaipur → Agra → Varanasi</p>
              <p className="text-[11px] text-slate-500 font-bold">9 Days • 3 Cities • ₹45,000 Estimated</p>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-xl hidden sm:flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 font-black flex items-center justify-center text-sm border border-emerald-200">
                ✓
              </div>
              <div>
                <p className="text-xs font-extrabold text-slate-900">Budget Optimized</p>
                <div className="flex items-center space-x-1 text-amber-500 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>4.9/5 Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
