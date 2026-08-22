import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { Copy, Calendar, MapPin } from "lucide-react";
import { useGetPublicTripQuery, useCopyTripMutation } from "../../store/api/apiSlice";

export const PublicItinerary: React.FC = () => {
  const { shareCode } = useParams<{ shareCode: string }>();
  const { data: trip, isLoading } = useGetPublicTripQuery(shareCode, { skip: !shareCode });
  const [copyTrip, { isLoading: copying }] = useCopyTripMutation();
  const navigate = useNavigate();

  const handleCopy = async () => {
    if (!shareCode) return;
    try {
      const newTrip = await copyTrip(shareCode).unwrap();
      navigate(`/trips/${newTrip._id}`);
    } catch (err: any) {
      alert("Please login first to copy this itinerary to your profile.");
      navigate("/login");
    }
  };

  if (isLoading) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-400">Loading public itinerary...</div>;
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center text-slate-400">Itinerary link not found or expired.</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-semibold uppercase">
                Shared Public Itinerary
              </span>
              <h1 className="text-3xl font-extrabold text-white mt-2">{trip.name}</h1>
              <p className="text-xs text-slate-400 mt-1">Created by {trip.userId?.name || "Traveler"}</p>
            </div>

            <button
              onClick={handleCopy}
              disabled={copying}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl flex items-center space-x-2 shadow-lg shadow-indigo-600/30"
            >
              <Copy className="w-4 h-4" />
              <span>{copying ? "Copying..." : "Copy Trip to My Profile"}</span>
            </button>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed">{trip.description}</p>

          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-6 text-xs text-slate-400">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-indigo-400" />
              <span>{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>{trip.stops?.length || 0} Cities Scheduled</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Itinerary Timeline</h2>
          {trip.stops?.map((stop: any, idx: number) => (
            <div key={stop._id || idx} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-white">#{idx + 1} {stop.cityId?.name}, {stop.cityId?.country}</h3>
              <p className="text-xs text-slate-400">
                {new Date(stop.startDate).toLocaleDateString()} - {new Date(stop.endDate).toLocaleDateString()}
              </p>

              <div className="space-y-2 pt-2">
                {stop.activities?.map((act: any) => (
                  <div key={act._id} className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-semibold text-white">{act.activityId?.title || act.customTitle}</span>
                      {act.startTime && <span className="text-slate-400 ml-2">({act.startTime})</span>}
                    </div>
                    <span className="font-bold text-emerald-400">${act.cost}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PublicItinerary;
