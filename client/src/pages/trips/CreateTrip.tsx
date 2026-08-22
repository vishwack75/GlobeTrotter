import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { Calendar, Plus, Compass } from "lucide-react";
import { useCreateTripMutation, useGetCitiesQuery, useGetActivitiesQuery } from "../../store/api/apiSlice";
import { useToast } from "../../components/common/ToastContext";

export const CreateTrip: React.FC = () => {
  const navigate = useNavigate();
  const [createTrip, { isLoading }] = useCreateTripMutation();
  const { data: cities } = useGetCitiesQuery({ limit: 6 });
  const { data: activities } = useGetActivitiesQuery({ limit: 6 });
  const { showToast } = useToast();

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [budgetLimit, setBudgetLimit] = useState<number>(1000);
  const [coverPhoto, setCoverPhoto] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !startDate || !endDate) {
      showToast("Please fill in required trip fields.", "info");
      return;
    }

    try {
      const res = await createTrip({
        name,
        startDate,
        endDate,
        description,
        budgetLimit,
        coverPhoto: coverPhoto || cities?.[0]?.imageUrl || "",
      }).unwrap();

      showToast("New trip created successfully!", "success");
      navigate(`/trips/${res._id}`);
    } catch (err: any) {
      showToast(err?.data?.message || "Failed to create trip.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Create Trip Screen (Screen 4)</h1>
          <p className="text-slate-500 text-xs mt-1">Plan a new trip by setting dates, budget, and discovering destinations</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
            <h2 className="text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-3">
              Plan a new trip
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Trip Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Royal Rajasthan Yatra 2026"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-xs font-medium focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Start Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="date"
                      required
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-xs font-medium focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    End Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="date"
                      required
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-xs font-medium focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Estimated Budget ($)
                  </label>
                  <input
                    type="number"
                    value={budgetLimit}
                    onChange={(e) => setBudgetLimit(Number(e.target.value))}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-xs font-medium focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Cover Photo URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={coverPhoto}
                    onChange={(e) => setCoverPhoto(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-xs font-medium focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Trip Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Notes, expectations, companion details..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-xs font-medium focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isLoading ? "Creating Plan..." : "Create Itinerary Plan"}</span>
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center space-x-2">
                <Compass className="w-4 h-4 text-indigo-600" />
                <span>Suggestions for Places to Visit</span>
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {cities?.slice(0, 4).map((c: any) => (
                  <div key={c._id} className="rounded-xl overflow-hidden bg-slate-100 relative group">
                    <img src={c.imageUrl} alt={c.name} className="w-full h-20 object-cover" />
                    <div className="p-1.5 bg-slate-900/80 text-white text-[10px] font-bold text-center truncate">
                      {c.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base">Suggestions for Activities</h3>
              <div className="space-y-2">
                {activities?.slice(0, 3).map((act: any) => (
                  <div key={act._id} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 truncate max-w-[180px]">{act.title}</span>
                    <span className="text-emerald-600 font-black">${act.cost}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreateTrip;
