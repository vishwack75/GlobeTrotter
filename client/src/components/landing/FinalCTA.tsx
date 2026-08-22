import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
        <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
          Your Next Adventure Starts Here.
        </h2>
        <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto font-medium">
          Stop collecting travel ideas. Start turning them into perfectly organized journeys.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link
            to="/signup"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm rounded-full shadow-2xl shadow-blue-600/40 flex items-center space-x-2 transition-all hover:scale-105"
          >
            <span>Start Planning for Free</span>
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </Link>
          <Link
            to="/explore/cities"
            className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-extrabold text-sm rounded-full border border-white/20 transition-all"
          >
            Explore Destinations
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
