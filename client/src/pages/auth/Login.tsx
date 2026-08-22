import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Lock, Mail } from "lucide-react";
import { useLoginMutation } from "../../store/api/apiSlice";
import { useToast } from "../../components/common/ToastContext";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("traveler@globetrotter.com");
  const [password, setPassword] = useState("Password123!");
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password }).unwrap();
      showToast("Successfully signed in!", "success");
      navigate("/dashboard");
    } catch (err: any) {
      showToast(err?.data?.message || "Invalid email or password.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-4">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Login Screen (Screen 1)</h1>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-8 shadow-xl border border-slate-200 rounded-3xl space-y-6">
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="w-24 h-24 rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center shadow-inner overflow-hidden">
              <User className="w-12 h-12 text-slate-400" />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Photo</span>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Username / Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm font-medium"
                  placeholder="Enter email address"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm font-medium"
                  placeholder="Enter password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <Link to="/signup" className="font-bold text-indigo-600 hover:underline">
                Create Account
              </Link>
              <Link to="/forgot-password" className="text-slate-500 hover:text-slate-700">
                Forgot password?
              </Link>
            </div>

            <div className="pt-2 flex justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3 bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm rounded-xl shadow-md transition-all disabled:opacity-50"
              >
                {isLoading ? "Signing in..." : "Login Button"}
              </button>
            </div>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
            <div>User: <code className="font-bold text-slate-700">traveler@globetrotter.com</code> / Password123!</div>
            <div>Admin: <code className="font-bold text-slate-700">admin@globetrotter.com</code> / Password123!</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
