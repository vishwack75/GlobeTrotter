import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { Plus, Trash2, Globe, Share2 } from "lucide-react";
import { useGetTripsQuery, useDeleteTripMutation } from "../../store/api/apiSlice";
import { useToast } from "../../components/common/ToastContext";

export const MyTrips: React.FC = () => {
  const { data: trips, isLoading } = useGetTripsQuery(undefined);
  const [deleteTrip] = useDeleteTripMutation();
  const { showToast } = useToast();

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (confirm("Are you sure you want to delete this trip?")) {
      try {
        await deleteTrip(id).unwrap();
        showToast("Trip deleted successfully.", "info");
      } catch (err: any) {
        showToast(err?.data?.message || "Failed to delete trip.", "error");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white">My Trips</h1>
            <p className="text-slate-400 text-sm">Manage and track your travel itineraries</p>
          </div>
          <Link
            to="/trips/create"
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl flex items-center space-x-2 shadow-lg shadow-indigo-600/20"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Trip</span>
          </Link>
        </div>

        {isLoading ? (
          <div className="p-12 text-center text-slate-500">Loading trips...</div>
        ) : trips && trips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip: any) => (
              <div
                key={trip._id}
                className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden hover:border-slate-700 transition-all flex flex-col group"
              >
                <div className="h-48 relative bg-slate-900">
                  <img
                    src={trip.coverPhoto || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80"}
                    alt={trip.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute top-3 left-3 flex items-center space-x-2">
                    {trip.isPublic ? (
                      <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold rounded-md flex items-center space-x-1">
                        <Globe className="w-3 h-3" />
                        <span>Public</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 bg-slate-800/80 text-slate-400 text-xs font-medium rounded-md">
                        Private
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <Link to={`/trips/${trip._id}`} className="block">
                      <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                        {trip.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {trip.description || "No detailed description provided."}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                    <div className="text-xs text-slate-400">
                      <div>{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</div>
                      <div className="font-semibold text-slate-200 mt-0.5">{trip.stops?.length || 0} Cities Scheduled</div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {trip.shareCode && (
                        <Link
                          to={`/shared/${trip.shareCode}`}
                          className="p-2 text-slate-400 hover:text-indigo-400 rounded-lg hover:bg-slate-900"
                          title="Share Link"
                        >
                          <Share2 className="w-4 h-4" />
                        </Link>
                      )}
                      <button
                        onClick={(e) => handleDelete(e, trip._id)}
                        className="p-2 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-900"
                        title="Delete Trip"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-950 p-12 rounded-3xl border border-slate-800 text-center space-y-4">
            <h3 className="text-lg font-bold text-white">No trips found</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              Start building your multi-city travel plan by creating your first custom itinerary.
            </p>
            <Link
              to="/trips/create"
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Trip</span>
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default MyTrips;
