import React from "react";
import Navbar from "../../components/layout/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGetTripsQuery } from "../../store/api/apiSlice";
import { Link } from "react-router-dom";

export const CalendarView: React.FC = () => {
  const { data: trips, isLoading } = useGetTripsQuery(undefined);

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Travel Calendar</h1>
            <p className="text-slate-500 text-xs mt-1">Visualize your itinerary dates and schedules across months</p>
          </div>

          <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
            <button className="text-slate-500 hover:text-slate-900"><ChevronLeft className="w-4 h-4" /></button>
            <span className="text-sm font-bold text-slate-800">September 2026</span>
            <button className="text-slate-500 hover:text-slate-900"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>

        {isLoading ? (
          <div className="p-12 text-center text-slate-400">Loading calendar view...</div>
        ) : (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">
              <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
            </div>

            <div className="grid grid-cols-7 gap-3">
              {daysInMonth.map((day) => {
                const activeTrips = trips?.filter((t: any) => {
                  const startDay = new Date(t.startDate).getDate();
                  const endDay = new Date(t.endDate).getDate();
                  return day >= startDay && day <= endDay;
                });

                return (
                  <div
                    key={day}
                    className={`min-h-[90px] p-2 rounded-2xl border transition-all flex flex-col justify-between ${
                      activeTrips && activeTrips.length > 0
                        ? "bg-indigo-50/70 border-indigo-200 text-indigo-950 font-semibold"
                        : "bg-slate-50/50 border-slate-200 text-slate-600"
                    }`}
                  >
                    <span className="text-xs font-bold text-slate-500">{day}</span>
                    {activeTrips && activeTrips.length > 0 && (
                      <div className="space-y-1 mt-1">
                        {activeTrips.map((t: any) => (
                          <Link
                            key={t._id}
                            to={`/trips/${t._id}`}
                            className="block p-1 bg-[#02639B] text-white text-[10px] font-bold rounded-lg truncate shadow-sm hover:bg-[#024E7B]"
                            title={t.name}
                          >
                            {t.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CalendarView;
