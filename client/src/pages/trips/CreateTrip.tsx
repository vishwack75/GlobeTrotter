import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { ArrowLeft } from "lucide-react";
import { useCreateTripMutation, useGetCitiesQuery } from "../../store/api/apiSlice";
import { useToast } from "../../components/common/ToastContext";

export const CreateTrip: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("2026-09-01");
  const [endDate, setEndDate] = useState("2026-09-10");
  const [selectedPlace, setSelectedPlace] = useState("");
  const coverPhoto = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80";
  const budgetLimit = 2500;

  const { data: cities } = useGetCitiesQuery(undefined);
  const [createTrip, { isLoading }] = useCreateTripMutation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const tripName = name || `Trip to ${selectedPlace || "New Destination"}`;
      const result = await createTrip({
        name: tripName,
        description,
        startDate,
        endDate,
        coverPhoto,
        budgetLimit: Number(budgetLimit),
        isPublic: true,
      }).unwrap();

      showToast(`Trip '${tripName}' created!`, "success");
      navigate(`/trips/${result._id}`);
    } catch (err: any) {
      showToast(err?.data?.message || "Failed to create trip.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
            Create a new Trip (Screen 4)
          </span>
        </div>

        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Plan a new trip</h1>
            <p className="text-xs text-slate-500 mt-1">Specify schedule dates and destination preferences</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Trip Title
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Autumn Adventure"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Select a Place :
                </label>
                <select
                  value={selectedPlace}
                  onChange={(e) => setSelectedPlace(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600"
                >
                  <option value="">Select Primary City</option>
                  {cities?.map((c: any) => (
                    <option key={c._id} value={c.name}>
                      {c.name}, {c.country}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Start Date:
                </label>
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  End Date:
                </label>
                <input
                  type="date"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Trip Description & Notes
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Trip highlights or companion notes..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <div className="pt-2 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-5 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all disabled:opacity-50"
              >
                {isLoading ? "Creating..." : "Save Trip & Continue"}
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-black text-slate-900 tracking-tight">
            Suggestion for Places to Visit/Activities to perform
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {cities?.map((city: any) => (
              <div
                key={city._id}
                onClick={() => setSelectedPlace(city.name)}
                className={`bg-white rounded-2xl border p-3 shadow-sm hover:shadow-md cursor-pointer transition-all space-y-2 text-center ${
                  selectedPlace === city.name ? "border-indigo-600 ring-2 ring-indigo-600/20" : "border-slate-200"
                }`}
              >
                <div className="h-20 rounded-xl bg-slate-100 overflow-hidden">
                  <img src={city.imageUrl} alt={city.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-xs truncate">{city.name}</h3>
                  <p className="text-[10px] text-slate-500 truncate">{city.country}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreateTrip;
