import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useGetCitiesQuery } from "../../store/api/apiSlice";

export const Hero: React.FC = () => {
  const { data: cities } = useGetCitiesQuery({ limit: 1 });
  const featuredCity = cities?.[0];

  return (
    <section className="pt-24 pb-8 md:pt-28 md:pb-12 bg-white relative overflow-hidden min-h-[calc(100vh-80px)] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column */}
          <div className="space-y-4">
            <span className="px-3.5 py-1 bg-sky-50 text-[#02639B] border border-sky-200 rounded-full text-[11px] font-black uppercase tracking-widest inline-block">
              Plan Less. Travel More.
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight">
              Plan Your Journey. <br />
              <span className="font-serif italic text-amber-600 font-normal">Discover Sacred India.</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg font-medium">
              Architecting multi-city spiritual yatras across Kedarnath, Dwarka, Ujjain, Varanasi, Ayodhya, and iconic Indian destinations around your travel preferences.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <Link
                to="/signup"
                className="px-6 py-3 bg-[#02639B] hover:bg-[#024E7B] text-white font-extrabold text-xs rounded-full flex items-center justify-center space-x-2 transition-all hover:scale-105"
              >
                <span>Start Planning</span>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </Link>
              <a
                href="#explore"
                className="px-6 py-3 bg-[#02639B] hover:bg-[#024E7B] text-white font-extrabold text-xs rounded-full flex items-center justify-center transition-all hover:scale-105"
              >
                Explore Temples & Cities
              </a>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden bg-slate-100 h-[300px] sm:h-[360px] lg:h-[400px]">
              {featuredCity && (
                <img
                  src={featuredCity.imageUrl}
                  alt={featuredCity.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
