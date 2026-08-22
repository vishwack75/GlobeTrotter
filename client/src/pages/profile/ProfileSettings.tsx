import React, { useState, useEffect } from "react";
import PageLayout from "../../components/layout/PageLayout";
import { Save, User as UserIcon } from "lucide-react";
import { useGetProfileQuery, useUpdateProfileMutation, useGetTripsQuery } from "../../store/api/apiSlice";
import { useToast } from "../../components/common/ToastContext";
import { Link } from "react-router-dom";

export const ProfileSettings: React.FC = () => {
  const { data: profile, isLoading: profileLoading } = useGetProfileQuery(undefined);
  const { data: trips, isLoading: tripsLoading } = useGetTripsQuery(undefined);
  const [updateProfile, { isLoading: updating }] = useUpdateProfileMutation();
  const { showToast } = useToast();

  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setAvatarUrl(profile.avatarUrl || "");
      setLanguage(profile.language || "en");
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({ name, avatarUrl, language }).unwrap();
      showToast("User Profile details updated!", "success");
    } catch (err: any) {
      showToast(err?.data?.message || "Failed to update profile.", "error");
    }
  };

  if (profileLoading) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500">Loading profile...</div>;
  }

  return (
    <PageLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">User Profile Pages (Screen 7)</h1>
          <p className="text-slate-500 text-xs mt-1">User Details with appropriate option to edit those information</p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 pb-6 border-b border-slate-100">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={name}
                className="w-24 h-24 rounded-full object-cover border-4 border-sky-100 shadow-inner"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-sky-50 border-4 border-sky-100 flex items-center justify-center text-[#02639B]">
                <UserIcon className="w-10 h-10" />
              </div>
            )}
            <div className="text-center sm:text-left space-y-1">
              <h2 className="text-2xl font-extrabold text-slate-900">{profile?.name}</h2>
              <p className="text-xs font-semibold text-slate-500">{profile?.email}</p>
              <span className="inline-block px-2.5 py-0.5 bg-sky-50 text-[#02639B] border border-sky-200 rounded text-[10px] font-bold uppercase">
                {profile?.role} Account
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Avatar Image URL
                </label>
                <input
                  type="url"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-xs font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address (Read-Only)
                </label>
                <input
                  type="email"
                  disabled
                  value={profile?.email || ""}
                  className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 text-xs cursor-not-allowed font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Preferred Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-xs font-medium"
                >
                  <option value="en">English (US)</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={updating}
                className="px-6 py-2.5 bg-[#02639B] hover:bg-[#024E7B] text-white font-extrabold text-xs rounded-xl flex items-center space-x-2 shadow-md"
              >
                <Save className="w-4 h-4" />
                <span>{updating ? "Saving..." : "Save Profile Details"}</span>
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Preplanned Trips</h2>
          {tripsLoading ? (
            <div className="p-8 text-center text-slate-400">Loading preplanned trips...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {trips?.map((t: any) => (
                <div key={t._id} className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-3">
                  <h3 className="font-extrabold text-slate-900 text-base">{t.name}</h3>
                  <p className="text-xs text-slate-500">{t.stops?.length || 0} Destination Stops</p>
                  <div className="pt-2">
                    <Link
                      to={`/trips/${t._id}`}
                      className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl inline-block"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default ProfileSettings;
