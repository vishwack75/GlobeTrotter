import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import PageLayout from "../../components/layout/PageLayout";
import {
  useGetTripByIdQuery,
  useAddStopMutation,
  useDeleteStopMutation,
  useGetCitiesQuery,
  useRemoveStopActivityMutation,
  useGetTripBudgetSummaryQuery,
} from "../../store/api/apiSlice";
import { useToast } from "../../components/common/ToastContext";
import { Calendar, Share2, Plus, Trash2, MapPin } from "lucide-react";

export const TripDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: trip, isLoading } = useGetTripByIdQuery(id!, { skip: !id });
  const { data: budgetSummary } = useGetTripBudgetSummaryQuery(id!, { skip: !id });

  const [addStop] = useAddStopMutation();
  const [deleteStop] = useDeleteStopMutation();
  const [removeStopActivity] = useRemoveStopActivityMutation();
  const { showToast } = useToast();

  const { data: cities } = useGetCitiesQuery(undefined);
  const [selectedCityId, setSelectedCityId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleAddStop = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCityId || !startDate || !endDate) {
      showToast("Please fill all stop fields.", "info");
      return;
    }
    try {
      await addStop({ tripId: id!, cityId: selectedCityId, startDate, endDate }).unwrap();
      showToast("City stop added to itinerary!", "success");
      setSelectedCityId("");
      setStartDate("");
      setEndDate("");
    } catch (err: any) {
      showToast(err?.data?.message || "Failed to add stop.", "error");
    }
  };

  const handleDeleteStop = async (stopId: string) => {
    if (confirm("Remove this stop from trip?")) {
      try {
        await deleteStop(stopId).unwrap();
        showToast("Stop removed.", "info");
      } catch (err: any) {
        showToast(err?.data?.message || "Failed to remove stop.", "error");
      }
    }
  };

  const handleRemoveActivity = async (stopId: string, activityId: string) => {
    try {
      await removeStopActivity({ stopId, activityId }).unwrap();
      showToast("Activity removed from stop.", "info");
    } catch (err: any) {
      showToast(err?.data?.message || "Failed to remove activity.", "error");
    }
  };

  if (isLoading) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500">Loading trip details...</div>;
  }

  if (!trip) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500">Trip not found.</div>;
  }

  return (
    <PageLayout>
      <div className="space-y-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="space-y-1">
              <span className="px-3 py-1 bg-sky-50 text-[#02639B] border border-sky-200 text-xs font-black rounded-full uppercase">
                Trip Overview (Screen 4 & 5)
              </span>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">{trip.name}</h1>
              <p className="text-xs text-slate-500 max-w-xl">{trip.description || "No description provided."}</p>
            </div>

            <div className="flex items-center space-x-3">
              <Link
                to={`/shared/${trip.shareCode}`}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl flex items-center space-x-2"
              >
                <Share2 className="w-4 h-4 text-[#02639B]" />
                <span>Share Code</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Trip Duration</span>
              <div className="flex items-center space-x-2 text-slate-800 font-extrabold text-sm">
                <Calendar className="w-4 h-4 text-[#02639B]" />
                <span>{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Budget Limit</span>
              <p className="text-slate-900 font-black text-lg">₹{trip.budgetLimit}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Total Spent</span>
              <p className="text-emerald-600 font-black text-lg">₹{budgetSummary?.totalSpent || 0}</p>
            </div>
          </div>

          {budgetSummary?.categories && (
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h3 className="text-sm font-extrabold text-slate-900">Budget Breakdown by Category</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {budgetSummary.categories.map((cat: any, idx: number) => (
                  <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                    <span className="text-xs font-bold text-slate-500 capitalize">{cat.name}</span>
                    <p className="text-base font-extrabold text-slate-800">₹{cat.spent}</p>
                    <p className="text-[10px] text-slate-400">Allocated: ₹{cat.allocated}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg space-y-6">
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Add Destination Stop to Itinerary</h2>
          <form onSubmit={handleAddStop} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">City</label>
              <select
                value={selectedCityId}
                onChange={(e) => setSelectedCityId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium"
              >
                <option value="">Select City</option>
                {cities?.map((c: any) => (
                  <option key={c._id} value={c._id}>{c.name} ({c.country})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2.5 bg-[#02639B] hover:bg-[#024E7B] text-white text-xs font-extrabold rounded-xl flex items-center justify-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>Add Stop</span>
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Timeline & City Stops</h2>
          {trip.stops && trip.stops.length > 0 ? (
            <div className="space-y-6">
              {trip.stops.map((stop: any, idx: number) => {
                const stopCost = stop.activities?.reduce((sum: number, a: any) => sum + (a.cost || 0), 0) || 0;
                return (
                  <div key={stop._id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                      <div className="flex items-center space-x-3">
                        <span className="w-8 h-8 rounded-full bg-sky-100 text-[#02639B] flex items-center justify-center font-black text-xs">
                          {idx + 1}
                        </span>
                        <div>
                          <h3 className="text-lg font-black text-slate-900 flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-[#02639B]" />
                            <span>{stop.cityId?.name || "City Stop"}</span>
                          </h3>
                          <p className="text-xs text-slate-500 font-medium">
                            {new Date(stop.startDate).toLocaleDateString()} - {new Date(stop.endDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <span className="font-extrabold text-emerald-600 text-sm">₹{stopCost}</span>
                        <button onClick={() => handleDeleteStop(stop._id)} className="p-1.5 text-slate-400 hover:text-rose-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-xs font-extrabold text-slate-700 uppercase">Scheduled Activities</h4>
                      {stop.activities && stop.activities.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {stop.activities.map((act: any) => (
                            <div key={act._id} className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
                              <div>
                                <span className="font-bold text-slate-900">{act.title}</span>
                                <span className="text-[10px] text-slate-500 block">{act.category} • {act.duration}m</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="font-extrabold text-emerald-600">₹{act.cost}</span>
                                <button onClick={() => handleRemoveActivity(stop._id, act._id)} className="text-slate-400 hover:text-rose-600">
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-slate-400 italic">No activities added to this stop yet.</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-500">
              No city stops added to this trip itinerary yet.
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default TripDetails;
