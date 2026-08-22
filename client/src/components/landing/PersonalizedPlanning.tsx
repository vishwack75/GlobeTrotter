import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, Eye } from "lucide-react";
import { useGetCitiesQuery } from "../../store/api/apiSlice";
import dwarkaImg from "../../assets/images/dwarka.avif";

export const PersonalizedPlanning: React.FC = () => {
  const { data: cities } = useGetCitiesQuery({ limit: 4 });
  const cityImage = cities?.[2]?.imageUrl || dwarkaImg;

  const checklist = [
    "Choose your travel style & pace",
    "Add your favorite curated activities",
    "Organize multiple Indian & global cities",
    "Set your exact travel budget targets",
    "Reorder your daily itinerary anytime",
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-3xl overflow-hidden bg-slate-900 min-h-[350px] shadow-2xl group border border-slate-200">
            <img
              src={cityImage}
              alt="Dwarkadhish Temple Darshan"
              className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                (e.target as HTMLImageElement).src = dwarkaImg;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="text-white space-y-0.5">
                <h4 className="text-lg font-black">Dwarkadhish Temple Darshan</h4>
                <p className="text-xs font-semibold text-slate-300">📍 Dwarka, Gujarat</p>
              </div>
              <Link
                to="/signup"
                className="px-3.5 py-1.5 bg-white/90 hover:bg-white text-slate-900 font-extrabold text-xs rounded-xl flex items-center space-x-1 shadow-md transition-all hover:scale-105"
              >
                <Eye className="w-3.5 h-3.5 text-[#02639B]" />
                <span>See Details</span>
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Your Trip Should Feel Like You.
            </h2>
            <p className="text-slate-600 text-sm font-medium leading-relaxed">
              Whether you're chasing Himalayan adventures, relaxing in Kerala backwaters, exploring royal forts, or discovering local food markets, GlobeTrotter helps you build a journey around what matters to you.
            </p>

            <div className="space-y-3 pt-2">
              {checklist.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-3 text-xs font-extrabold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                to="/signup"
                className="px-8 py-3.5 bg-[#02639B] hover:bg-[#024E7B] text-white font-extrabold text-xs rounded-full inline-flex items-center space-x-2 transition-all hover:scale-105"
              >
                <span>Build My Trip</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalizedPlanning;
