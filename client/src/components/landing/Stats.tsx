import React from "react";

export const Stats: React.FC = () => {
  const stats = [
    { label: "Travelers", value: "50K+" },
    { label: "Destinations & Cities", value: "120+" },
    { label: "Trips Planned", value: "15K+" },
    { label: "User Rating", value: "4.9 / 5" },
  ];

  return (
    <section className="py-12 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">{stat.value}</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
