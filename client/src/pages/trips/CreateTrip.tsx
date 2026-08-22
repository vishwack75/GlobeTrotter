import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/layout/PageLayout";
import { ArrowLeft, ChevronDown, Calendar as CalendarIcon, MapPin as MapPinIcon } from "lucide-react";
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
      <div className="max-w-4xl mx-auto space-y-8 pb-20">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2.5 text-slate-600 hover:text-slate-900 bg-white rounded-xl border border-slate-200 shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Create Trip Plan</h1>
            <p className="text-slate-500 text-sm font-medium mt-1">Architect your multi-city itinerary step-by-step</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: General Trip Info */}
          <div className="space-y-5">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Step 1: General Trip Info
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-1.5">
                  Trip Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sacred Temple Yatra 2026"
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#02639B] outline-none transition-all shadow-xs"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-800 mb-1.5">
                  Estimated Budget (₹)
                </label>
                <input
                  type="number"
                  required
                  min={0}
                  value={budgetLimit}
                  onChange={(e) => setBudgetLimit(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#02639B] outline-none transition-all shadow-xs"
                />
              </div>
            </div>

            {/* Travel Dates Section */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-800">
                Select Travel Dates
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="relative">
                  <span className="absolute left-3.5 top-3.5 text-slate-400">
                    <CalendarIcon className="w-4 h-4 text-[#02639B]" />
                  </span>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#02639B] outline-none transition-all shadow-xs cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-400 font-semibold mt-1 block">Start Date</span>
                </div>

                <div className="relative">
                  <span className="absolute left-3.5 top-3.5 text-slate-400">
                    <CalendarIcon className="w-4 h-4 text-[#02639B]" />
                  </span>
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#02639B] outline-none transition-all shadow-xs cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-400 font-semibold mt-1 block">End Date</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1.5">
                Short Overview / Description
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your travel goals or notes..."
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#02639B] outline-none transition-all shadow-xs"
              />
            </div>
          </div>

          {/* Step 2: Primary Destination City */}
          <div className="space-y-5 pt-6 border-t border-slate-200">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Step 2: Primary Destination City
            </h2>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-800">
                Destination City Selection
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3.5 text-slate-400 pointer-events-none">
                  <MapPinIcon className="w-4 h-4 text-[#02639B]" />
                </span>
                <select
                  value={selectedCityId}
                  onChange={(e) => setSelectedCityId(e.target.value)}
                  className="w-full pl-10 pr-10 py-3.5 bg-white border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#02639B] outline-none appearance-none cursor-pointer shadow-xs transition-all text-slate-800"
                >
                  <option value="">Choose Primary Destination City</option>
                  {cities?.map((c: any) => (
                    <option key={c._id} value={c._id}>
                      {c.name} ({c.country})
                    </option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-4 pointer-events-none text-slate-500">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            {selectedCityId && activities && activities.length > 0 && (
              <div className="space-y-3 pt-2">
                <label className="block text-sm font-bold text-slate-800">
                  Select Initial Curated Activities
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activities.map((act: any) => (
                    <div
                      key={act._id}
                      onClick={() => toggleActivity(act._id)}
                      className={`p-4 rounded-2xl border text-sm cursor-pointer flex items-center justify-between transition-all ${
                        selectedActivities.includes(act._id)
                          ? "bg-sky-50 border-[#02639B] text-[#02639B] font-extrabold shadow-sm"
                          : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      <div>
                        <p className="font-bold">{act.title}</p>
                        <p className="text-xs text-slate-500">{act.duration} mins</p>
                      </div>
                      <span className="text-emerald-600 font-black text-base">₹{act.cost}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="pt-6 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-3.5 bg-[#02639B] hover:bg-[#024E7B] text-white text-sm font-extrabold rounded-full shadow-md shadow-sky-900/20 transition-all hover:scale-105 cursor-pointer"
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
