import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { Plus, Trash2, Calendar, MapPin, Share2, DollarSign, Clock } from "lucide-react";
import {
  useGetTripByIdQuery,
  useGetCitiesQuery,
  useAddStopMutation,
  useDeleteStopMutation,
  useGetActivitiesQuery,
  useAddStopActivityMutation,
  useRemoveStopActivityMutation,
  useGetTripBudgetSummaryQuery,
} from "../../store/api/apiSlice";
import { useToast } from "../../components/common/ToastContext";

export const TripDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: trip, isLoading, refetch } = useGetTripByIdQuery(id);
  const { data: budget } = useGetTripBudgetSummaryQuery(id, { skip: !id });
  const { showToast } = useToast();

  const { data: cities } = useGetCitiesQuery(undefined);
  const [addStop] = useAddStopMutation();
  const [deleteStop] = useDeleteStopMutation();

  const [selectedCityId, setSelectedCityId] = useState("");
  const [stopStartDate, setStopStartDate] = useState("2026-09-01");
  const [stopEndDate, setStopEndDate] = useState("2026-09-04");

  const [activeStopId, setActiveStopId] = useState<string | null>(null);
  const [selectedActivityId, setSelectedActivityId] = useState("");
  const [customTitle, setCustomTitle] = useState("");
  const [activityCost, setActivityCost] = useState<number>(0);
  const [dayNumber, setDayNumber] = useState<number>(1);
  const [startTime, setStartTime] = useState("10:00");

  const { data: stopCityActivities } = useGetActivitiesQuery(
    { cityId: trip?.stops?.find((s: any) => s._id === activeStopId)?.cityId?._id },
    { skip: !activeStopId }
  );

  const [addStopActivity] = useAddStopActivityMutation();
  const [removeStopActivity] = useRemoveStopActivityMutation();

  const handleAddStop = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCityId || !id) return;
    try {
      await addStop({
        tripId: id,
        cityId: selectedCityId,
        startDate: stopStartDate,
        endDate: stopEndDate,
      }).unwrap();
      showToast("Destination stop added to itinerary!", "success");
      setSelectedCityId("");
      refetch();
    } catch (err: any) {
      showToast(err?.data?.message || "Failed to add stop.", "error");
    }
  };

  const handleAddActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeStopId) return;
    try {
      await addStopActivity({
        stopId: activeStopId,
        activityId: selectedActivityId || undefined,
        customTitle: customTitle || undefined,
        cost: Number(activityCost),
        dayNumber: Number(dayNumber),
        startTime,
      }).unwrap();

      showToast("Activity assigned to stop successfully!", "success");
      setActiveStopId(null);
      setSelectedActivityId("");
      setCustomTitle("");
      setActivityCost(0);
      refetch();
    } catch (err: any) {
      showToast(err?.data?.message || "Failed to add activity.", "error");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-400">
        Loading itinerary details...
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center text-slate-400">Trip not found</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
          <div className="h-64 sm:h-80 relative bg-slate-900">
            <img
              src={trip.coverPhoto || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80"}
              alt={trip.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          </div>

          <div className="p-6 sm:p-8 -mt-20 relative z-10 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{trip.name}</h1>
                <p className="text-slate-300 text-sm mt-1">{trip.description || "No description available."}</p>
              </div>

              <div className="flex items-center space-x-3">
                {trip.shareCode && (
                  <Link
                    to={`/shared/${trip.shareCode}`}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center space-x-2 border border-slate-700"
                  >
                    <Share2 className="w-4 h-4 text-indigo-400" />
                    <span>Public Share Link</span>
                  </Link>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-indigo-400" />
                <span>{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>{trip.stops?.length || 0} Cities Scheduled</span>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-amber-400" />
                <span>Spent ${budget?.totalSpent || 0} of ${trip.budgetLimit} Limit</span>
              </div>
            </div>
          </div>
        </div>

        {budget && (
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-amber-400" />
              <span>Budget Overview & Cost Breakdown</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {budget.categories.map((cat: any) => (
                <div key={cat.category} className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                  <p className="text-xs text-slate-400 font-medium">{cat.category}</p>
                  <p className="text-base font-bold text-slate-100">${cat.spent}</p>
                  <p className="text-[10px] text-slate-500">Allocated: ${cat.allocated}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="text-lg font-bold text-white">Add City Stop to Itinerary</h2>
          <form onSubmit={handleAddStop} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <select
              value={selectedCityId}
              onChange={(e) => setSelectedCityId(e.target.value)}
              required
              className="px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 text-sm"
            >
              <option value="">Select Destination City</option>
              {cities?.map((c: any) => (
                <option key={c._id} value={c._id}>
                  {c.name}, {c.country}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={stopStartDate}
              onChange={(e) => setStopStartDate(e.target.value)}
              className="px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 text-sm"
            />
            <input
              type="date"
              value={stopEndDate}
              onChange={(e) => setStopEndDate(e.target.value)}
              className="px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 text-sm"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl flex items-center justify-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Stop</span>
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-extrabold text-white">Scheduled Stops & Activities</h2>

          {trip.stops?.length > 0 ? (
            <div className="space-y-6">
              {trip.stops.map((stop: any, index: number) => (
                <div key={stop._id} className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
                  <div className="p-6 bg-slate-900/60 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 font-bold flex items-center justify-center border border-indigo-500/30">
                        #{index + 1}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{stop.cityId?.name}, {stop.cityId?.country}</h3>
                        <p className="text-xs text-slate-400">
                          {new Date(stop.startDate).toLocaleDateString()} - {new Date(stop.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setActiveStopId(stop._id)}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg flex items-center space-x-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Activity</span>
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm("Delete this stop?")) {
                            await deleteStop(stop._id);
                            showToast("Stop removed.", "info");
                            refetch();
                          }
                        }}
                        className="p-2 text-slate-500 hover:text-rose-400"
                        title="Delete stop"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    {stop.activities?.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {stop.activities.map((act: any) => (
                          <div
                            key={act._id}
                            className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-start justify-between space-x-3"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2 text-xs font-semibold text-indigo-400">
                                <Clock className="w-3.5 h-3.5" />
                                <span>Day {act.dayNumber} {act.startTime ? `• ${act.startTime}` : ""}</span>
                              </div>
                              <h4 className="font-bold text-white text-sm">
                                {act.activityId?.title || act.customTitle || "Scheduled Activity"}
                              </h4>
                              {act.notes && <p className="text-xs text-slate-400">{act.notes}</p>}
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className="font-bold text-emerald-400 text-xs">${act.cost}</span>
                              <button
                                onClick={async () => {
                                  await removeStopActivity(act._id);
                                  showToast("Activity removed from stop.", "info");
                                  refetch();
                                }}
                                className="text-slate-500 hover:text-rose-400"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500 italic">No activities added to this stop yet.</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-slate-500 bg-slate-950 rounded-2xl border border-slate-800">
              No stops added to this trip itinerary yet. Select a city destination above.
            </div>
          )}
        </div>

        {activeStopId && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6">
              <h3 className="text-xl font-bold text-white">Add Activity to Stop</h3>

              <form onSubmit={handleAddActivity} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Select Curated City Activity
                  </label>
                  <select
                    value={selectedActivityId}
                    onChange={(e) => {
                      setSelectedActivityId(e.target.value);
                      const selected = stopCityActivities?.find((a: any) => a._id === e.target.value);
                      if (selected) {
                        setActivityCost(selected.cost);
                      }
                    }}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 text-sm"
                  >
                    <option value="">Custom Activity / Select from City List</option>
                    {stopCityActivities?.map((a: any) => (
                      <option key={a._id} value={a._id}>
                        {a.title} (${a.cost})
                      </option>
                    ))}
                  </select>
                </div>

                {!selectedActivityId && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Custom Activity Title
                    </label>
                    <input
                      type="text"
                      value={customTitle}
                      onChange={(e) => setCustomTitle(e.target.value)}
                      placeholder="e.g. Local Street Food Tour"
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 text-sm"
                    />
                  </div>
                )}

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Day #
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={dayNumber}
                      onChange={(e) => setDayNumber(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Cost ($)
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={activityCost}
                      onChange={(e) => setActivityCost(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Time
                    </label>
                    <input
                      type="text"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      placeholder="10:00"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 text-sm"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setActiveStopId(null)}
                    className="px-4 py-2 text-xs text-slate-400 hover:text-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl"
                  >
                    Save Activity
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default TripDetails;
