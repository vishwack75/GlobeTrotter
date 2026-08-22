import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Eye, Sparkles } from "lucide-react";
import { useGetCitiesQuery } from "../../store/api/apiSlice";
import kedarnathImg from "../../assets/images/kedarnath.webp";

export const Hero: React.FC = () => {
  const { data: cities } = useGetCitiesQuery({ limit: 1 });
  const featuredCity = cities?.[0];
  const heroImageUrl = featuredCity?.imageUrl || kedarnathImg;

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
                className="px-6 py-3 bg-[#02639B] hover:bg-[#024E7B] text-white font-extrabold text-xs rounded-full flex items-center justify-center space-x-2 transition-all hover:scale-105 shadow-md shadow-sky-950/20"
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

          {/* Right Column: Kedarnath Temple Image Card */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden bg-slate-900 h-[320px] sm:h-[380px] lg:h-[420px] shadow-2xl group border border-slate-200">
              <img
                src={heroImageUrl}
                alt="Kedarnath Temple Darshan"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = kedarnathImg;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

              {/* Floating Top Badge */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-slate-900 text-xs font-black flex items-center space-x-1.5 shadow-md border border-white">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                <span>Kedarnath Temple Darshan & Yatra</span>
              </div>

              {/* Bottom Information Overlay */}
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div className="text-white space-y-1">
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight">Kedarnath Dham</h3>
                  <p className="text-xs font-semibold text-slate-200">📍 Rudraprayag, Uttarakhand • 3,583m Elevation</p>
                </div>

                <a
                  href="#explore"
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-xl flex items-center space-x-1.5 shadow-lg transition-transform hover:scale-105"
                >
                  <Eye className="w-4 h-4" />
                  <span>See Darshan</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
