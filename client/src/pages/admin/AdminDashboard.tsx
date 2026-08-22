import React from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { Users, Map, Compass, Trash2, Activity as ActivityIcon } from "lucide-react";
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
    if (confirm("Permanently delete this user and all associated trips?")) {
      try {
        await deleteAdminUser(userId).unwrap();
        showToast("User account deleted.", "info");
      } catch (err: any) {
        showToast(err?.data?.message || "Failed to delete user.", "error");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div>
          <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-semibold uppercase">
            Platform Operations
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-2">Admin Control Panel & Analytics</h1>
          <p className="text-slate-400 text-sm">Track platform adoption metrics, destinations, and manage registered users.</p>
        </div>

        {analyticsLoading ? (
          <div className="p-8 text-center text-slate-500">Loading analytics metrics...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-semibold">Total Travelers</span>
                <Users className="w-5 h-5 text-indigo-400" />
              </div>
              <p className="text-3xl font-extrabold text-white">{analytics?.overview?.totalUsers || 0}</p>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-semibold">Total Trips Created</span>
                <Map className="w-5 h-5 text-emerald-400" />
              </div>
              <p className="text-3xl font-extrabold text-white">{analytics?.overview?.totalTrips || 0}</p>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-semibold">Cities Database</span>
                <Compass className="w-5 h-5 text-amber-400" />
              </div>
              <p className="text-3xl font-extrabold text-white">{analytics?.overview?.totalCities || 0}</p>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-semibold">Activities Listed</span>
                <ActivityIcon className="w-5 h-5 text-rose-400" />
              </div>
              <p className="text-3xl font-extrabold text-white">{analytics?.overview?.totalActivities || 0}</p>
            </div>
          </div>
        )}

        <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <Users className="w-5 h-5 text-indigo-400" />
            <span>User Management</span>
          </h2>

          {usersLoading ? (
            <div className="p-8 text-center text-slate-500">Loading user directory...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-3">User</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Trips Count</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {usersData?.users?.map((u: any) => (
                    <tr key={u._id} className="hover:bg-slate-900/50">
                      <td className="p-3 font-semibold text-white">{u.name}</td>
                      <td className="p-3 text-slate-400">{u.email}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          u.role === "ADMIN" ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30" : "bg-slate-800 text-slate-400"
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="p-3">{u._count?.trips || 0}</td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() => handleRoleChange(u._id, u.role)}
                          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] font-medium"
                        >
                          Toggle Role
                        </button>
                        <button
                          onClick={() => handleDeleteUser(u._id)}
                          className="p-1 text-slate-500 hover:text-rose-400 inline-block align-middle"
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
