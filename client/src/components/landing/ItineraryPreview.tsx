import React from "react";
import { Clock } from "lucide-react";

export const ItineraryPreview: React.FC = () => {
  const days = [
    {
      day: "DAY 01",
      city: "Jaipur, Rajasthan",
      activities: [
        { time: "09:00", title: "Breakfast at Local Haveli" },
        { time: "11:00", title: "Amber Fort & Mirror Palace Tour" },
        { time: "14:00", title: "Traditional Rajasthani Thali Lunch" },
        { time: "16:00", title: "Hawa Mahal & Johari Bazaar Walk" },
      ],
    },
    {
      day: "DAY 02",
      city: "Agra, Uttar Pradesh",
      activities: [
        { time: "06:00", title: "Taj Mahal Sunrise Guided Walk" },
        { time: "10:00", title: "Agra Fort Mughal Architecture Tour" },
        { time: "15:00", title: "Marble Inlay Craft Workshop" },
        { time: "19:00", title: "Rooftop Dinner overlooking Taj Mahal" },
      ],
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            See Your Entire Journey at a Glance.
          </h2>
          <p className="text-slate-600 text-sm font-medium">
            Structured timeline visualization making every day clear and actionable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {days.map((d, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-xs font-black text-blue-600 uppercase tracking-widest">{d.day}</span>
                <h3 className="text-lg font-black text-slate-900">{d.city}</h3>
              </div>

              <div className="space-y-3 pt-2">
                {d.activities.map((act, i) => (
                  <div key={i} className="flex items-center space-x-3 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <div className="flex items-center space-x-1 text-slate-500 font-extrabold shrink-0 w-16">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      <span>{act.time}</span>
                    </div>
                    <span className="font-bold text-slate-800 truncate">{act.title}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ItineraryPreview;
