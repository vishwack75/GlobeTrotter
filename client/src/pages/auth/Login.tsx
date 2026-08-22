import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Globe, Lock, Mail, ArrowRight } from "lucide-react";
import { useLoginMutation, useGetCitiesQuery } from "../../store/api/apiSlice";
import { useToast } from "../../components/common/ToastContext";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const { showToast } = useToast();
  const { data: cities } = useGetCitiesQuery({ limit: 1 });
  const coverImage = cities?.[0]?.imageUrl;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast("Please enter email and password.", "info");
      return;
    }

    try {
      const res = await login({ email, password }).unwrap();
      showToast(`Welcome back, ${res.user?.name || "Explorer"}!`, "success");
      if (res.user?.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err: any) {
      showToast(err?.data?.message || "Invalid credentials. Please try again.", "error");
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-50 flex">
      {/* Left side: Cover Image */}
      <div className="hidden lg:block lg:w-1/2 relative bg-slate-900 overflow-hidden h-full">
        {coverImage && (
          <img
            src={coverImage}
            alt="Travel Cover"
            className="w-full h-full object-cover opacity-80"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        <div className="absolute bottom-16 left-16 right-16 text-white space-y-4">
          <span className="px-3.5 py-1 bg-white/10 backdrop-blur-md text-sky-300 rounded-full text-xs font-extrabold uppercase tracking-widest border border-white/20">
            GlobeTrotter Intelligence
          </span>
          <h2 className="text-3xl font-black leading-tight">
            "Plan less. Travel more. Experience sacred Indian places and multi-city adventures."
          </h2>
          <p className="text-xs font-semibold text-slate-300">
            Join thousands of travelers organizing personalized itineraries, smart budgets, and shared trip memories.
          </p>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-8 sm:p-12 lg:p-16 h-full overflow-y-auto">
        <div>
          <Link to="/" className="inline-flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-600/30 group-hover:scale-105 transition-transform">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900">
              GlobeTrotter
            </span>
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Welcome back
            </h1>
            <p className="text-xs font-semibold text-slate-500">
              Enter your email and password to log in.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-slate-900 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <Link to="/forgot-password" className="text-[11px] font-bold text-blue-600 hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-slate-900 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-xs rounded-full shadow-lg shadow-blue-700/20 flex items-center justify-center space-x-2 transition-all hover:scale-[1.01]"
              >
                <span>{isLoading ? "Signing In..." : "Sign In"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        <div className="text-center sm:text-left text-xs font-bold text-slate-500">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-extrabold hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
