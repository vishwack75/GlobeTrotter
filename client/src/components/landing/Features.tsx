import React from "react";
import { Map, Wallet, Compass, Share2 } from "lucide-react";

export const Features: React.FC = () => {
  const features = [
    {
      title: "Personalized Itineraries",
      description: "Build multi-city journeys around your dates, interests, and travel style.",
      icon: Map,
      color: "text-blue-600 bg-blue-50 border-blue-200",
    },
    {
      title: "Smart Budgeting",
      description: "Know exactly where your money goes with automatic cost breakdowns.",
      icon: Wallet,
      color: "text-cyan-600 bg-cyan-50 border-cyan-200",
    },
    {
      title: "Discover More",
      description: "Find cities, experiences, food, culture, and adventures worth adding to your trip.",
      icon: Compass,
      color: "text-amber-600 bg-amber-50 border-amber-200",
    },
    {
      title: "Share Your Journey",
      description: "Share your itinerary with friends or inspire other travelers.",
      icon: Share2,
      color: "text-emerald-600 bg-emerald-50 border-emerald-200",
    },
  ];

  return (
    <section id="features" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Travel Planning, Reimagined.
          </h2>
          <p className="text-slate-600 text-sm font-medium">
            Everything you need to turn a travel idea into a perfectly organized journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 space-y-4"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${feat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900">{feat.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">{feat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
