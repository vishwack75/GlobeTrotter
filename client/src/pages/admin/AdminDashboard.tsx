import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  Users,
  Map,
  Compass,
  Trash2,
  Activity as ActivityIcon,
  TrendingUp,
  Eye,
  LogOut,
  X,
  Calendar,
  Sparkles
} from "lucide-react";
import {
  useGetAdminAnalyticsQuery,
  useGetAdminUsersQuery,
  useGetUserTripsQuery,
  useGetPopularCitiesQuery,
  useGetUserTrendsQuery,
  useUpdateUserRoleMutation,
  useDeleteAdminUserMutation,
  useLogoutMutation,
  useGetProfileQuery
} from "../../store/api/apiSlice";
import { useToast } from "../../components/common/ToastContext";

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "cities" | "trends">("overview");
  const [selectedUserIdForTrips, setSelectedUserIdForTrips] = useState<string | null>(null);

  const { data: profile } = useGetProfileQuery(undefined);
  const { data: analytics, isLoading: analyticsLoading } = useGetAdminAnalyticsQuery(undefined);
  const { data: usersData, isLoading: usersLoading } = useGetAdminUsersQuery(undefined);
  const { data: popularCities, isLoading: citiesLoading } = useGetPopularCitiesQuery(undefined);
  const { data: userTrends } = useGetUserTrendsQuery(undefined);
  const { data: userTrips, isLoading: tripsLoading } = useGetUserTripsQuery(selectedUserIdForTrips, {
    skip: !selectedUserIdForTrips,
  });

  const { showToast } = useToast();
  const [updateUserRole] = useUpdateUserRoleMutation();
  const [deleteAdminUser] = useDeleteAdminUserMutation();
  const [logout] = useLogoutMutation();

  const handleRoleChange = async (userId: string, currentRole: string) => {
    const newRole = currentRole === "ADMIN" ? "USER" : "ADMIN";
    if (confirm(`Change user role to ${newRole}?`)) {
      try {
        await updateUserRole({ userId, role: newRole }).unwrap();
        showToast(`User role updated to ${newRole}.`, "success");
      } catch (err: any) {
        showToast(err?.data?.message || "Failed to update role.", "error");
      }
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (confirm("Permanently delete this user and all associated trips?")) {
      try {
        await deleteAdminUser(userId).unwrap();
        showToast("User account deleted.", "info");
      } catch (err: any) {
        showToast(err?.data?.message || "Failed to delete user.", "error");
      }
    }
  };

  const handleSignOut = async () => {
    try {
      await logout(undefined).unwrap();
      showToast("Signed out successfully", "info");
      navigate("/login");
    } catch {
      navigate("/login");
    }
  };

  const navItems = [
    { id: "overview", label: "Overview & Analytics", icon: LayoutGrid },
    { id: "users", label: "Manage Users", icon: Users },
    { id: "cities", label: "Popular Cities", icon: Compass },
    { id: "trends", label: "User Trends & Data", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Sidebar matching exact User Sidebar UI */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col justify-between p-6 h-screen sticky top-0 shadow-xs shrink-0 font-sans z-40">
        <div className="space-y-6">
          {/* Header with user avatar circle and GlobeTrotter logo */}
          <div className="flex items-center space-x-3 px-1">
            {profile?.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-xs"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-sky-100 border border-sky-200 flex items-center justify-center text-[#02639B] font-extrabold text-sm">
                {profile?.name ? profile.name.charAt(0).toLowerCase() : "g"}
              </div>
            )}
            <div className="truncate">
              <h2 className="text-lg font-black bg-gradient-to-r from-[#02639B] via-sky-500 to-indigo-600 bg-clip-text text-transparent leading-tight truncate">
                GlobeTrotter
              </h2>
            </div>
          </div>

          {/* Navigation items matching exact user sidebar button styling */}
          <nav className="space-y-2 pt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#E5F2FB] text-[#02639B] font-extrabold shadow-xs"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon className={`w-4.5 h-4.5 ${isActive ? "text-[#02639B]" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom section with Sign Out button */}
        <div className="pt-4 border-t border-slate-100">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center space-x-3 px-4 py-3 text-xs font-extrabold text-rose-600 hover:bg-rose-50 rounded-2xl transition-colors cursor-pointer"
          >
            <LogOut className="w-4.5 h-4.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content View */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-6 sm:p-8 space-y-6 max-w-6xl w-full mx-auto">
          {/* TAB 1: OVERVIEW & ANALYTICS */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Overview & Analytics</h1>
                <p className="text-xs font-semibold text-slate-500 mt-1">System metrics, active travel statistics, and recent activity.</p>
              </div>

              {analyticsLoading ? (
                <div className="p-8 text-center text-slate-400">Loading overview data...</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Total Users</span>
                      <div className="p-2 bg-sky-50 text-[#02639B] rounded-xl"><Users className="w-5 h-5" /></div>
                    </div>
                    <p className="text-3xl font-black text-slate-900">{analytics?.overview?.totalUsers || 0}</p>
                  </div>

                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Total Trips</span>
                      <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><Map className="w-5 h-5" /></div>
                    </div>
                    <p className="text-3xl font-black text-slate-900">{analytics?.overview?.totalTrips || 0}</p>
                  </div>

                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Sacred Cities</span>
                      <div className="p-2 bg-amber-50 text-amber-600 rounded-xl"><Compass className="w-5 h-5" /></div>
                    </div>
                    <p className="text-3xl font-black text-slate-900">{analytics?.overview?.totalCities || 0}</p>
                  </div>

                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Activities</span>
                      <div className="p-2 bg-rose-50 text-rose-600 rounded-xl"><ActivityIcon className="w-5 h-5" /></div>
                    </div>
                    <p className="text-3xl font-black text-slate-900">{analytics?.overview?.totalActivities || 0}</p>
                  </div>
                </div>
              )}

              {/* Recent User Trips & Popular Sacred Places */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
                  <h2 className="text-base font-black text-slate-900 flex items-center space-x-2">
                    <Map className="w-5 h-5 text-[#02639B]" />
                    <span>Recent Travel Itineraries</span>
                  </h2>
                  <div className="space-y-3">
                    {analytics?.recentTrips?.map((trip: any) => (
                      <div key={trip._id} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-slate-900">{trip.name}</p>
                          <p className="text-[10px] text-slate-500">By: {trip.userId?.name || "Explorer"} ({trip.userId?.email})</p>
                        </div>
                        <span className="text-[10px] font-bold text-[#02639B] bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">
                          ₹{trip.budgetLimit?.toLocaleString() || 0}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
                  <h2 className="text-base font-black text-slate-900 flex items-center space-x-2">
                    <Compass className="w-5 h-5 text-amber-500" />
                    <span>Top Trending Destinations</span>
                  </h2>
                  <div className="space-y-3">
                    {analytics?.topCities?.map((city: any) => (
                      <div key={city._id} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img src={city.imageUrl} alt={city.name} className="w-9 h-9 rounded-xl object-cover" />
                          <div>
                            <p className="text-xs font-bold text-slate-900">{city.name}</p>
                            <p className="text-[10px] text-slate-500">{city.region}, {city.country}</p>
                          </div>
                        </div>
                        <span className="text-[11px] font-black text-amber-600">⭐ {city.popularity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MANAGE USER SECTION */}
          {activeTab === "users" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Manage Users</h1>
                <p className="text-xs font-semibold text-slate-500 mt-1">Responsible for managing users, their actions, roles, and viewing their trip itineraries.</p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
                {usersLoading ? (
                  <div className="p-8 text-center text-slate-400">Loading user records...</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-700">
                      <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider border-b border-slate-200 font-bold">
                        <tr>
                          <th className="p-3.5">User</th>
                          <th className="p-3.5">Contact & Location</th>
                          <th className="p-3.5">Role</th>
                          <th className="p-3.5">Trips</th>
                          <th className="p-3.5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium">
                        {usersData?.users?.map((u: any) => (
                          <tr key={u._id} className="hover:bg-slate-50 transition-colors">
                            <td className="p-3.5">
                              <div className="flex items-center space-x-3">
                                {u.avatarUrl ? (
                                  <img src={u.avatarUrl} alt={u.name} className="w-8 h-8 rounded-full object-cover border border-slate-300" />
                                ) : (
                                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-xs">
                                    {u.name?.charAt(0) || "U"}
                                  </div>
                                )}
                                <div>
                                  <p className="font-bold text-slate-900 text-xs">{u.name}</p>
                                  <p className="text-[10px] text-slate-400">{u.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-3.5">
                              <p className="text-xs font-medium text-slate-800">{u.phone || "N/A"}</p>
                              <p className="text-[10px] text-slate-500">{u.city || "N/A"}, {u.country || "N/A"}</p>
                            </td>
                            <td className="p-3.5">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                                u.role === "ADMIN" ? "bg-indigo-100 text-indigo-700 border border-indigo-200" : "bg-slate-100 text-slate-700"
                              }`}>
                                {u.role}
                              </span>
                            </td>
                            <td className="p-3.5">
                              <span className="px-2.5 py-1 bg-sky-50 text-[#02639B] rounded-full text-xs font-black border border-sky-200">
                                {u.tripCount || 0} Trips
                              </span>
                            </td>
                            <td className="p-3.5 text-right space-x-2">
                              <button
                                onClick={() => setSelectedUserIdForTrips(u._id)}
                                className="px-2.5 py-1.5 bg-[#02639B] text-white hover:bg-[#024E7B] rounded-xl text-xs font-bold transition-all inline-flex items-center space-x-1 cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>View Trips</span>
                              </button>
                              <button
                                onClick={() => handleRoleChange(u._id, u.role)}
                                className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                              >
                                Toggle Role
                              </button>
                              <button
                                onClick={() => handleDeleteUser(u._id)}
                                className="p-1.5 text-slate-400 hover:text-rose-600 inline-block align-middle transition-colors cursor-pointer"
                                title="Delete User"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: POPULAR CITIES */}
          {activeTab === "cities" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Popular Cities</h1>
                <p className="text-xs font-semibold text-slate-500 mt-1">Lists all the popular sacred cities where users are visiting based on current user trends.</p>
              </div>

              {citiesLoading ? (
                <div className="p-8 text-center text-slate-400">Loading popular cities...</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {popularCities?.map((city: any) => (
                    <div key={city._id} className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden flex flex-col justify-between">
                      <div className="relative h-40 bg-slate-900">
                        <img src={city.imageUrl} alt={city.name} className="w-full h-full object-cover opacity-90" />
                        <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-amber-400 px-2.5 py-1 rounded-full text-xs font-black border border-amber-400/30">
                          ⭐ {city.popularity}
                        </div>
                      </div>
                      <div className="p-5 space-y-2">
                        <h3 className="text-lg font-black text-slate-900">{city.name}</h3>
                        <p className="text-xs font-bold text-slate-500">{city.region}, {city.country}</p>
                        <p className="text-xs text-slate-600 line-clamp-2">{city.description}</p>
                        <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                          <span className="text-[11px] font-bold text-slate-400">Cost Index: {"₹".repeat(city.costIndex || 1)}</span>
                          <span className="text-xs font-bold text-[#02639B]">Popular Destination</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: USER TRENDS & ANALYTICS */}
          {activeTab === "trends" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">User Trends & Analytics</h1>
                <p className="text-xs font-semibold text-slate-500 mt-1">Major focus on providing analysis across various points and useful insights for admin.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
                  <span className="text-xs text-slate-500 font-bold uppercase">Total Registered Users</span>
                  <p className="text-3xl font-black text-slate-900">{userTrends?.totalUsers || 0}</p>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
                  <span className="text-xs text-slate-500 font-bold uppercase">Total Created Itineraries</span>
                  <p className="text-3xl font-black text-slate-900">{userTrends?.totalTrips || 0}</p>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
                  <span className="text-xs text-slate-500 font-bold uppercase">Avg Travel Budget</span>
                  <p className="text-3xl font-black text-[#02639B]">₹{userTrends?.avgBudget?.toLocaleString() || 0}</p>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
                <h2 className="text-base font-black text-slate-900 flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                  <span>Recent User Signups & Registrations</span>
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider border-b border-slate-200 font-bold">
                      <tr>
                        <th className="p-3">User</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Location</th>
                        <th className="p-3">Joined Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {userTrends?.recentSignups?.map((user: any) => (
                        <tr key={user._id}>
                          <td className="p-3 font-bold text-slate-900">{user.name}</td>
                          <td className="p-3 text-slate-500">{user.email}</td>
                          <td className="p-3 text-slate-600">{user.city || "N/A"}, {user.country || "India"}</td>
                          <td className="p-3 text-slate-500">{new Date(user.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL: View User Trips */}
      {selectedUserIdForTrips && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white max-w-2xl w-full rounded-3xl border border-slate-200 shadow-2xl p-6 space-y-5 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-black text-slate-900">User Itineraries & Trips</h3>
                <p className="text-xs text-slate-500">Viewing trips created by selected traveler</p>
              </div>
              <button
                onClick={() => setSelectedUserIdForTrips(null)}
                className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {tripsLoading ? (
              <div className="p-8 text-center text-slate-400">Loading user itineraries...</div>
            ) : userTrips?.length === 0 ? (
              <div className="p-8 text-center text-slate-400">This user has not created any trips yet.</div>
            ) : (
              <div className="space-y-4">
                {userTrips?.map((trip: any) => (
                  <div key={trip._id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-black text-slate-900">{trip.name}</h4>
                      <span className="text-xs font-bold text-[#02639B] bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                        ₹{trip.budgetLimit?.toLocaleString() || 0}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">{trip.description || "No description provided."}</p>
                    <div className="flex items-center space-x-4 text-[11px] font-bold text-slate-500 pt-1">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</span>
                      </span>
                      <span className="text-emerald-600 font-extrabold">{trip.stops?.length || 0} Stops</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
