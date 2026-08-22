import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { Plus, Trash2, Share2, DollarSign } from "lucide-react";
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
      showToast("Section stop added to itinerary!", "success");
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

      showToast("Activity saved!", "success");
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
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500">Loading itinerary...</div>;
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center text-slate-500">Trip not found</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">{trip.name}</h1>
            <p className="text-slate-500 text-xs mt-1">{trip.description || "Build Itinerary Screen (Screen 5 & Screen 9)"}</p>
          </div>

          {trip.shareCode && (
            <Link
              to={`/shared/${trip.shareCode}`}
              className="px-4 py-2 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-bold flex items-center space-x-1.5"
            >
              <Share2 className="w-4 h-4" />
              <span>Public Share Link</span>
            </Link>
          )}
        </div>

        {budget && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-amber-500" />
              <span>Itinerary Budget Overview</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {budget.categories.map((cat: any) => (
                <div key={cat.category} className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1">
                  <p className="text-[11px] text-slate-500 font-medium">{cat.category}</p>
                  <p className="text-base font-extrabold text-slate-800">${cat.spent}</p>
                  <p className="text-[10px] text-slate-400">Allocated: ${cat.allocated}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-6">
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Itinerary Sections</h2>

          {trip.stops?.map((stop: any, index: number) => {
            const stopCost = stop.activities?.reduce((acc: number, a: any) => acc + (a.cost || 0), 0) || 0;

            return (
              <div key={stop._id} className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 sm:p-8 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Section {index + 1}: {stop.cityId?.name}, {stop.cityId?.country}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      All the necessary information about this section (travel, hotel or activity)
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setActiveStopId(stop._id)}
                      className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center space-x-1.5 shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Activity</span>
                    </button>
                    <button
                      onClick={async () => {
                        if (confirm("Delete this section stop?")) {
                          await deleteStop(stop._id);
                          showToast("Section removed", "info");
                          refetch();
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-500">Date Range:</span>
                    <span className="font-extrabold text-slate-800">
                      {new Date(stop.startDate).toLocaleDateString()} to {new Date(stop.endDate).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-500">Budget of this section:</span>
                    <span className="font-extrabold text-emerald-600 text-sm">${stopCost}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  {stop.activities?.map((act: any) => (
                    <div key={act._id} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-slate-800">{act.activityId?.title || act.customTitle}</span>
                        {act.startTime && <span className="text-slate-400 ml-2">({act.startTime})</span>}
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="font-extrabold text-emerald-600">${act.cost}</span>
                        <button
                          onClick={async () => {
                            await removeStopActivity(act._id);
                            showToast("Activity removed", "info");
                            refetch();
                          }}
                          className="text-slate-400 hover:text-rose-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800">Add Destination Section to Itinerary</h3>

            <form onSubmit={handleAddStop} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <select
                value={selectedCityId}
                onChange={(e) => setSelectedCityId(e.target.value)}
                required
                className="px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-xs font-medium"
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
                className="px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-xs font-medium"
              />
              <input
                type="date"
                value={stopEndDate}
                onChange={(e) => setStopEndDate(e.target.value)}
                className="px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-xs font-medium"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-extrabold text-xs rounded-xl flex items-center justify-center space-x-2 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add another Section</span>
              </button>
            </form>
          </div>
        </div>

        {activeStopId && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
              <h3 className="text-lg font-bold text-slate-900">Add Activity to Section</h3>

              <form onSubmit={handleAddActivity} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
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
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-xs font-medium"
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
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Custom Activity Title
                    </label>
                    <input
                      type="text"
                      value={customTitle}
                      onChange={(e) => setCustomTitle(e.target.value)}
                      placeholder="e.g. Local Museum Tour"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-xs font-medium"
                    />
                  </div>
                )}

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Day #
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={dayNumber}
                      onChange={(e) => setDayNumber(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Cost ($)
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={activityCost}
                      onChange={(e) => setActivityCost(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Time
                    </label>
                    <input
                      type="text"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      placeholder="10:00"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-xs"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setActiveStopId(null)}
                    className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md"
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
