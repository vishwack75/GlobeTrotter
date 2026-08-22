import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/layout/PageLayout";
import { ArrowLeft, Sparkles, MapPin } from "lucide-react";
import { useCreateTripMutation, useGetCitiesQuery, useGetActivitiesQuery } from "../../store/api/apiSlice";
import { useToast } from "../../components/common/ToastContext";

export const CreateTrip: React.FC = () => {
  const navigate = useNavigate();
  const [createTrip, { isLoading }] = useCreateTripMutation();
  const { showToast } = useToast();

  const { data: cities } = useGetCitiesQuery(undefined);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budgetLimit, setBudgetLimit] = useState(1000);
  const [selectedCityId, setSelectedCityId] = useState("");

  const { data: activities } = useGetActivitiesQuery(
    { cityId: selectedCityId },
    { skip: !selectedCityId }
  );

  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  const toggleActivity = (id: string) => {
    if (selectedActivities.includes(id)) {
      setSelectedActivities(selectedActivities.filter((aId) => aId !== id));
    } else {
      setSelectedActivities([...selectedActivities, id]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !startDate || !endDate) {
      showToast("Please enter trip name and travel dates.", "info");
      return;
    }

    try {
      const stops = selectedCityId
        ? [
            {
              cityId: selectedCityId,
              startDate,
              endDate,
              activities: selectedActivities,
            },
          ]
        : [];

      const res = await createTrip({
        name,
        description,
        startDate,
        endDate,
        budgetLimit: Number(budgetLimit),
        stops,
      }).unwrap();

      showToast("Trip plan created successfully!", "success");
      navigate(`/trips/${res._id}`);
    } catch (err: any) {
      showToast(err?.data?.message || "Failed to create trip.", "error");
    }
  };

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 text-slate-500 hover:text-slate-800 bg-white rounded-xl border border-slate-200"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Interactive Trip Form (Screen 4)</h1>
            <p className="text-slate-500 text-xs">Architect your Indian multi-city itinerary step-by-step</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-[#02639B]" />
              <span>Step 1: General Trip Info</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Trip Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sacred Temple Yatra 2026"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#02639B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Estimated Budget (₹)
                </label>
                <input
                  type="number"
                  required
                  min={0}
                  value={budgetLimit}
                  onChange={(e) => setBudgetLimit(Number(e.target.value))}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#02639B]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#02639B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#02639B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Short Overview / Description
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your travel goals or notes..."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#02639B]"
              />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-[#02639B]" />
              <span>Step 2: Primary Destination City</span>
            </h2>

            <div>
              <select
                value={selectedCityId}
                onChange={(e) => setSelectedCityId(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#02639B]"
              >
                <option value="">Choose Primary Destination City</option>
                {cities?.map((c: any) => (
                  <option key={c._id} value={c._id}>
                    {c.name} ({c.country})
                  </option>
                ))}
              </select>
            </div>

            {selectedCityId && activities && activities.length > 0 && (
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  Select Initial Curated Activities
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activities.map((act: any) => (
                    <div
                      key={act._id}
                      onClick={() => toggleActivity(act._id)}
                      className={`p-3 rounded-2xl border text-xs cursor-pointer flex items-center justify-between transition-all ${
                        selectedActivities.includes(act._id)
                          ? "bg-sky-50 border-[#02639B] text-[#02639B] font-extrabold"
                          : "bg-slate-50 border-slate-200 text-slate-700"
                      }`}
                    >
                      <div>
                        <p className="font-bold">{act.title}</p>
                        <p className="text-[10px] text-slate-500">{act.duration} mins</p>
                      </div>
                      <span className="text-emerald-600 font-black">₹{act.cost}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-3 bg-[#02639B] hover:bg-[#024E7B] text-white text-xs font-extrabold rounded-full shadow-lg shadow-sky-900/20 transition-all hover:scale-105"
            >
              {isLoading ? "Creating Plan..." : "Create Trip Plan"}
            </button>
          </div>
        </form>
      </div>
    </PageLayout>
  );
};

export default CreateTrip;
