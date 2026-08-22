import React from "react";

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Create Your Trip",
      description: "Choose your destination, travel dates, and companion preferences.",
    },
    {
      number: "02",
      title: "Build Your Route",
      description: "Add cities, stops, activities, and experiences day-by-day.",
    },
    {
      number: "03",
      title: "Balance Your Budget",
      description: "See estimated costs across stay, transport, activities, and food.",
    },
    {
      number: "04",
      title: "Travel & Share",
      description: "Follow your timeline itinerary and share your journey with friends.",
    },
  ];

  return (
    <section id="how-it-works" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Plan Your Perfect Journey in Four Simple Steps
          </h2>
          <p className="text-slate-600 text-sm font-medium">
            A structured workflow empowering stress-free travel planning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-3xl border border-slate-200 relative space-y-4 hover:border-[#02639B] transition-colors"
            >
              <span className="text-4xl font-black text-[#02639B]/30">{step.number}</span>
              <h3 className="text-lg font-black text-slate-900">{step.title}</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
