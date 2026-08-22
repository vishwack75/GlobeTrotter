import React from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { Users, Map, Compass, Trash2, Activity as ActivityIcon, BarChart3, TrendingUp } from "lucide-react";
import {
  useGetAdminAnalyticsQuery,
  useGetAdminUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteAdminUserMutation,
} from "../../store/api/apiSlice";
import { useToast } from "../../components/common/ToastContext";

export const AdminDashboard: React.FC = () => {
  const { data: analytics, isLoading: analyticsLoading } = useGetAdminAnalyticsQuery(undefined);
  const { data: usersData, isLoading: usersLoading } = useGetAdminUsersQuery(undefined);
  const { showToast } = useToast();

  const [updateUserRole] = useUpdateUserRoleMutation();
  const [deleteAdminUser] = useDeleteAdminUserMutation();

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
    if (confirm("Permanently delete this user?")) {
      try {
        await deleteAdminUser(userId).unwrap();
        showToast("User account deleted.", "info");
      } catch (err: any) {
        showToast(err?.data?.message || "Failed to delete user.", "error");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div>
          <span className="px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full text-xs font-bold uppercase">
            Platform Analytics
          </span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-2">Admin Dashboard Panel</h1>
          <p className="text-slate-500 text-xs">Manage Users, Popular Sacred Cities, Popular Activities, User Trends and Analytics</p>
        </div>

        {analyticsLoading ? (
          <div className="p-8 text-center text-slate-400">Loading analytics metrics...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-bold uppercase">Total Travelers</span>
                <Users className="w-5 h-5 text-indigo-600" />
              </div>
              <p className="text-3xl font-black text-slate-900">{analytics?.overview?.totalUsers || 0}</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-bold uppercase">Total Trips</span>
                <Map className="w-5 h-5 text-emerald-600" />
              </div>
              <p className="text-3xl font-black text-slate-900">{analytics?.overview?.totalTrips || 0}</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-bold uppercase">Cities Database</span>
                <Compass className="w-5 h-5 text-amber-500" />
              </div>
              <p className="text-3xl font-black text-slate-900">{analytics?.overview?.totalCities || 0}</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-bold uppercase">Activities</span>
                <ActivityIcon className="w-5 h-5 text-rose-500" />
              </div>
              <p className="text-3xl font-black text-slate-900">{analytics?.overview?.totalActivities || 0}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md space-y-4">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              <span>User Trends & Analytics</span>
            </h2>
            <div className="h-48 bg-slate-50 rounded-2xl border border-slate-200 p-4 flex flex-col justify-end space-y-2">
              <div className="flex items-end justify-between h-32 px-4 gap-2">
                <div className="w-full bg-indigo-200 rounded-t h-[40%]" />
                <div className="w-full bg-indigo-300 rounded-t h-[65%]" />
                <div className="w-full bg-indigo-400 rounded-t h-[50%]" />
                <div className="w-full bg-indigo-500 rounded-t h-[85%]" />
                <div className="w-full bg-indigo-600 rounded-t h-full" />
              </div>
              <p className="text-[11px] text-center text-slate-500 font-medium">Monthly Active Travelers Growth Trend</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md space-y-4">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-emerald-600" />
              <span>Popular Cities & Destinations</span>
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>Kedarnath, Uttarakhand</span>
                <span className="text-indigo-600">4.98 Star Rating</span>
              </div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>Dwarka, Gujarat</span>
                <span className="text-indigo-600">4.92 Star Rating</span>
              </div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>Ujjain, Madhya Pradesh</span>
                <span className="text-indigo-600">4.9 Star Rating</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md space-y-4">
          <h2 className="text-base font-extrabold text-slate-900 flex items-center space-x-2">
            <Users className="w-5 h-5 text-indigo-600" />
            <span>User Management</span>
          </h2>

          {usersLoading ? (
            <div className="p-8 text-center text-slate-400">Loading user directory...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider border-b border-slate-200 font-bold">
                  <tr>
                    <th className="p-3">User</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Role</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {usersData?.users?.map((u: any) => (
                    <tr key={u._id} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-slate-900">{u.name}</td>
                      <td className="p-3 text-slate-500">{u.email}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                          u.role === "ADMIN" ? "bg-indigo-50 text-indigo-700 border border-indigo-200" : "bg-slate-100 text-slate-600"
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() => handleRoleChange(u._id, u.role)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-bold"
                        >
                          Toggle Role
                        </button>
                        <button
                          onClick={() => handleDeleteUser(u._id)}
                          className="p-1 text-slate-400 hover:text-rose-600 inline-block align-middle"
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
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
