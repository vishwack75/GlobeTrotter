import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { Plus, Trash2, Share2, Search, Calendar } from "lucide-react";
import { useGetTripsQuery, useDeleteTripMutation } from "../../store/api/apiSlice";
import { useToast } from "../../components/common/ToastContext";
import { useDebounce } from "../../hooks/useDebounce";
import { CardSkeleton } from "../../components/common/Skeleton";

export const MyTrips: React.FC = () => {
  const { data: trips, isLoading, isFetching } = useGetTripsQuery(undefined);
  const [deleteTrip] = useDeleteTripMutation();
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (confirm("Delete this trip?")) {
      try {
        await deleteTrip(id).unwrap();
        showToast("Trip deleted.", "info");
      } catch (err: any) {
        showToast(err?.data?.message || "Failed to delete trip.", "error");
      }
    }
  };

  const filteredTrips = trips?.filter((t: any) =>
    t.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  ) || [];

  const now = new Date();
  const ongoingTrips = filteredTrips.filter((t: any) => new Date(t.startDate) <= now && new Date(t.endDate) >= now);
  const upcomingTrips = filteredTrips.filter((t: any) => new Date(t.startDate) > now);
  const completedTrips = filteredTrips.filter((t: any) => new Date(t.endDate) < now);

  const renderTripCard = (trip: any) => (
    <div
      key={trip._id}
      className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md hover:shadow-xl transition-all flex flex-col justify-between space-y-4 group"
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
            {trip.stops?.length || 0} Cities Scheduled
          </span>
          <div className="flex items-center space-x-1">
            {trip.shareCode && (
              <Link to={`/shared/${trip.shareCode}`} className="p-1 text-slate-400 hover:text-indigo-600">
                <Share2 className="w-4 h-4" />
              </Link>
            )}
            <button onClick={(e) => handleDelete(e, trip._id)} className="p-1 text-slate-400 hover:text-rose-600">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <Link to={`/trips/${trip._id}`}>
          <h3 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
            {trip.name}
          </h3>
        </Link>

        <p className="text-xs text-slate-500 line-clamp-2">
          Short Over View of the Trip: {trip.description || "No description provided."}
        </p>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
        <div className="flex items-center space-x-1.5">
          <Calendar className="w-4 h-4 text-indigo-600" />
          <span>{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</span>
        </div>
        <span className="font-extrabold text-slate-800">${trip.budgetLimit}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">User Trip Listing (Screen 6)</h1>
            <p className="text-slate-500 text-xs mt-1">Classified view of ongoing, upcoming, and past travel itineraries</p>
          </div>
          <Link
            to="/trips/create"
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold rounded-xl flex items-center space-x-2 shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Trip</span>
          </Link>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search bar ...."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div className="flex items-center space-x-2">
            <button className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200">
              Group by
            </button>
            <button className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200">
              Filter
            </button>
            <button className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200">
              Sort by...
            </button>
          </div>
        </div>

        {isLoading || isFetching ? (
          <CardSkeleton count={3} />
        ) : (
          <div className="space-y-8">
            <div className="space-y-3">
              <h2 className="text-lg font-extrabold text-slate-900 border-b border-slate-200 pb-2">Ongoing</h2>
              {ongoingTrips.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{ongoingTrips.map(renderTripCard)}</div>
              ) : (
                <p className="text-xs text-slate-400 italic">No ongoing trips currently active.</p>
              )}
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-extrabold text-slate-900 border-b border-slate-200 pb-2">Up-coming</h2>
              {upcomingTrips.length > 0 || filteredTrips.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {(upcomingTrips.length > 0 ? upcomingTrips : filteredTrips).map(renderTripCard)}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">No upcoming trips scheduled.</p>
              )}
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-extrabold text-slate-900 border-b border-slate-200 pb-2">Completed</h2>
              {completedTrips.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{completedTrips.map(renderTripCard)}</div>
              ) : (
                <p className="text-xs text-slate-400 italic">No completed historical trips recorded.</p>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default MyTrips;
