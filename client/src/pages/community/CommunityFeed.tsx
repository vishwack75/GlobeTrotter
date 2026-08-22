import React from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { Copy, MapPin, Calendar } from "lucide-react";
import { useGetPublicTripQuery, useCopyTripMutation } from "../../store/api/apiSlice";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../components/common/ToastContext";

export const CommunityFeed: React.FC = () => {
  const { data: featuredTrip, isLoading } = useGetPublicTripQuery("euro-tour-2026");
  const [copyTrip, { isLoading: copying }] = useCopyTripMutation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleCopy = async () => {
    try {
      const newTrip = await copyTrip("euro-tour-2026").unwrap();
      showToast("Trip copied to your profile successfully!", "success");
      navigate(`/trips/${newTrip._id}`);
    } catch (err: any) {
      showToast("Please sign in to copy this itinerary.", "error");
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Community Tab Screen (Screen 10)</h1>
          <p className="text-slate-500 text-xs mt-1">Discover, share, and copy community itineraries created by fellow global travelers</p>
        </div>

        {isLoading ? (
          <div className="p-12 text-center text-slate-400">Loading community feed...</div>
        ) : featuredTrip ? (
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-700 font-extrabold flex items-center justify-center text-lg">
                    GR
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">{featuredTrip.name}</h2>
                    <p className="text-xs text-slate-500">Shared by Global Traveler • Public Community Trip</p>
                  </div>
                </div>

                <button
                  onClick={handleCopy}
                  disabled={copying}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl flex items-center space-x-2 shadow-md"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copying ? "Copying..." : "Copy Trip"}</span>
                </button>
              </div>

              <p className="text-slate-700 text-sm leading-relaxed">{featuredTrip.description}</p>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-medium">
                <div className="flex items-center space-x-1.5">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                  <span>{new Date(featuredTrip.startDate).toLocaleDateString()} - {new Date(featuredTrip.endDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>{featuredTrip.stops?.length || 0} Cities Scheduled</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-bold text-slate-800">Itinerary Preview</h3>
                {featuredTrip.stops?.map((stop: any, idx: number) => (
                  <div key={stop._id || idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>Stop #{idx + 1}: {stop.cityId?.name}, {stop.cityId?.country}</span>
                      <span className="text-slate-500 font-normal">
                        {new Date(stop.startDate).toLocaleDateString()} - {new Date(stop.endDate).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      {stop.activities?.map((act: any) => (
                        <div key={act._id} className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                          <span className="font-semibold text-slate-700">{act.activityId?.title || act.customTitle}</span>
                          <span className="font-bold text-emerald-600">${act.cost}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center text-slate-400 bg-white rounded-3xl border border-slate-200">
            No public community itineraries available yet.
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CommunityFeed;
