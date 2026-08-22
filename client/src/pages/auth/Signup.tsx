import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, User as UserIcon, ArrowRight, AlertCircle, Eye, EyeOff } from "lucide-react";
import { useSignupMutation } from "../../store/api/apiSlice";
import { useToast } from "../../components/common/ToastContext";
import registerSidebarImg from "../../assets/images/register_sidebar.avif";

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [touchedName, setTouchedName] = useState(false);
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);
  const [touchedConfirmPassword, setTouchedConfirmPassword] = useState(false);

  const [signup, { isLoading }] = useSignupMutation();
  const { showToast } = useToast();

  const isNameValid = name.trim().length >= 2;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 6;
  const isConfirmPasswordValid = confirmPassword.length >= 6 && confirmPassword === password;
  const isFormValid = isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouchedName(true);
    setTouchedEmail(true);
    setTouchedPassword(true);
    setTouchedConfirmPassword(true);

    if (!isNameValid) {
      showToast("Please enter your full name.", "error");
      return;
    }
    if (!isEmailValid) {
      showToast("Please enter a valid email address (e.g. user@gmail.com).", "error");
      return;
    }
    if (!isPasswordValid) {
      showToast("Password must be at least 6 characters long.", "error");
      return;
    }
    if (!isConfirmPasswordValid) {
      showToast("Passwords do not match. Please verify your confirm password.", "error");
      return;
    }

    try {
      const res = await signup({ name, email, password }).unwrap();
      showToast(`Account created successfully! Welcome ${res.user?.name}!`, "success");
      navigate("/dashboard");
    } catch (err: any) {
      showToast(err?.data?.message || "Failed to register account.", "error");
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-50 flex">
      {/* Left side: Register Form with comfortable input spacing */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-10 lg:p-12 h-full overflow-hidden">
        <div className="max-w-md w-full mx-auto space-y-4 mt-4 mb-auto">
          <div className="space-y-1 text-center">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Create your account
            </h1>
            <p className="text-xs font-semibold text-slate-500">
              Fill in your details to get started with GlobeTrotter.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name *
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => setTouchedName(true)}
                  placeholder="John Doe"
                  className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl text-slate-900 text-xs font-bold focus:outline-none focus:ring-2 shadow-sm ${
                    touchedName && !isNameValid
                      ? "border-rose-500 focus:ring-rose-500 bg-rose-50/30"
                      : "border-slate-300 focus:ring-[#02639B]"
                  }`}
                />
              </div>
              {touchedName && !isNameValid && (
                <p className="text-[10px] font-bold text-rose-500 mt-1 flex items-center space-x-1 justify-center">
                  <AlertCircle className="w-3 h-3 inline mr-1" />
                  <span>Name must be at least 2 characters</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouchedEmail(true)}
                  placeholder="user@gmail.com"
                  className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl text-slate-900 text-xs font-bold focus:outline-none focus:ring-2 shadow-sm ${
                    touchedEmail && !isEmailValid
                      ? "border-rose-500 focus:ring-rose-500 bg-rose-50/30"
                      : "border-slate-300 focus:ring-[#02639B]"
                  }`}
                />
              </div>
              {touchedEmail && !isEmailValid && (
                <p className="text-[10px] font-bold text-rose-500 mt-1 flex items-center space-x-1 justify-center">
                  <AlertCircle className="w-3 h-3 inline mr-1" />
                  <span>Please enter a valid email address (e.g. user@gmail.com)</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setTouchedPassword(true)}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-10 py-2.5 bg-white border rounded-xl text-slate-900 text-xs font-bold focus:outline-none focus:ring-2 shadow-sm ${
                    touchedPassword && !isPasswordValid
                      ? "border-rose-500 focus:ring-rose-500 bg-rose-50/30"
                      : "border-slate-300 focus:ring-[#02639B]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
              {touchedPassword && !isPasswordValid && (
                <p className="text-[10px] font-bold text-rose-500 mt-1 flex items-center space-x-1 justify-center">
                  <AlertCircle className="w-3 h-3 inline mr-1" />
                  <span>Password must be at least 6 characters</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={() => setTouchedConfirmPassword(true)}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-10 py-2.5 bg-white border rounded-xl text-slate-900 text-xs font-bold focus:outline-none focus:ring-2 shadow-sm ${
                    touchedConfirmPassword && !isConfirmPasswordValid
                      ? "border-rose-500 focus:ring-rose-500 bg-rose-50/30"
                      : "border-slate-300 focus:ring-[#02639B]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showConfirmPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
              {touchedConfirmPassword && !isConfirmPasswordValid && (
                <p className="text-[10px] font-bold text-rose-500 mt-1 flex items-center space-x-1 justify-center">
                  <AlertCircle className="w-3 h-3 inline mr-1" />
                  <span>{confirmPassword !== password ? "Passwords do not match" : "Confirm password is required"}</span>
                </p>
              )}
            </div>

            <div className="pt-1">
              <button
                type="submit"
                disabled={!isFormValid || isLoading}
                className={`w-full py-3 px-4 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center space-x-2 transition-all ${
                  isFormValid && !isLoading
                    ? "bg-[#02639B] hover:bg-[#024E7B] shadow-sky-900/20 cursor-pointer hover:scale-[1.01]"
                    : "bg-slate-300 text-slate-500 cursor-not-allowed opacity-60"
                }`}
              >
                <span>{isLoading ? "Registering..." : "Create Account"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="text-center text-xs font-bold text-slate-500 pt-1">
            Already have an account?{" "}
            <Link to="/login" className="text-[#02639B] font-extrabold hover:underline">
              Log in here
            </Link>
          </div>
        </div>
      </div>

      {/* Right side: Local Image Asset */}
      <div className="hidden lg:block lg:w-1/2 relative bg-slate-900 overflow-hidden h-full">
        <img
          src={registerSidebarImg}
          alt="Register Cover"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Signup;
