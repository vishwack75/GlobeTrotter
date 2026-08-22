import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, ArrowRight, AlertCircle, Eye, EyeOff } from "lucide-react";
import { useLoginMutation } from "../../store/api/apiSlice";
import { useToast } from "../../components/common/ToastContext";
import loginSidebarImg from "../../assets/images/login_sidebar.avif";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);

  const [login, { isLoading }] = useLoginMutation();
  const { showToast } = useToast();

  const isEmailValid = email.trim().length >= 3;
  const isPasswordValid = password.length >= 6;
  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouchedEmail(true);
    setTouchedPassword(true);

    if (!isEmailValid) {
      showToast("Please enter your Username or Email Address.", "error");
      return;
    }
    if (!isPasswordValid) {
      showToast("Password must be at least 6 characters long.", "error");
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
    <div className="h-screen w-screen overflow-hidden bg-slate-50 flex font-sans">
      {/* Left side: Cover Image Asset */}
      <div className="hidden lg:block lg:w-1/2 relative bg-slate-900 overflow-hidden h-full">
        <img
          src={loginSidebarImg}
          alt="Login Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-12 text-white">
          <h2 className="text-3xl font-black tracking-tight">GlobeTrotter</h2>
          <p className="text-sm font-semibold text-slate-300 mt-1">Empowering personalized multi-city travel planning.</p>
        </div>
      </div>

      {/* Right side: Form without outer white card box */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-10 h-full overflow-y-auto">
        <div className="max-w-md w-full space-y-6">
          {/* Welcome Heading */}
          <div className="space-y-1.5 text-center">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Welcome to GlobeTrotter
            </h1>
            <p className="text-xs font-semibold text-slate-500">
              Enter your username and password to log in.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Username *
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouchedEmail(true)}
                  placeholder="Username or email..."
                  className={`w-full pl-10 pr-3 py-3 bg-white border rounded-xl text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 shadow-xs ${
                    touchedEmail && !isEmailValid
                      ? "border-rose-500 focus:ring-rose-500 bg-rose-50/30"
                      : "border-slate-300 focus:ring-[#02639B]"
                  }`}
                />
              </div>
              {touchedEmail && !isEmailValid && (
                <p className="text-[10px] font-bold text-rose-500 mt-1 flex items-center space-x-1">
                  <AlertCircle className="w-3 h-3 inline mr-1" />
                  <span>Username or email is required</span>
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700">
                  Password *
                </label>
                <Link to="/forgot-password" className="text-[10px] font-bold text-[#02639B] hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setTouchedPassword(true)}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-10 py-3 bg-white border rounded-xl text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 shadow-xs ${
                    touchedPassword && !isPasswordValid
                      ? "border-rose-500 focus:ring-rose-500 bg-rose-50/30"
                      : "border-slate-300 focus:ring-[#02639B]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
              {touchedPassword && !isPasswordValid && (
                <p className="text-[10px] font-bold text-rose-500 mt-1 flex items-center space-x-1">
                  <AlertCircle className="w-3 h-3 inline mr-1" />
                  <span>Password must be at least 6 characters</span>
                </p>
              )}
            </div>

            {/* Login Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={!isFormValid || isLoading}
                className={`w-full py-3.5 px-4 text-white font-black text-sm rounded-xl shadow-md flex items-center justify-center space-x-2 transition-all ${
                  isFormValid && !isLoading
                    ? "bg-[#02639B] hover:bg-[#024E7B] shadow-sky-900/20 cursor-pointer hover:scale-[1.01]"
                    : "bg-slate-300 text-slate-500 cursor-not-allowed opacity-60"
                }`}
              >
                <span>{isLoading ? "Logging in..." : "Login"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="text-center text-xs font-bold text-slate-500 pt-2 border-t border-slate-200">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#02639B] font-extrabold hover:underline">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
