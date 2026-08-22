import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, User as UserIcon, MapPin, Globe, ArrowRight, Eye, EyeOff, Camera, AlertCircle } from "lucide-react";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useSignupMutation } from "../../store/api/apiSlice";
import { useToast } from "../../components/common/ToastContext";
import registerSidebarImg from "../../assets/images/register_sidebar.avif";

const PhoneInput: any = (ReactPhoneInput as any).default || ReactPhoneInput;

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("India");
  const [password, setPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [touchedFirstName, setTouchedFirstName] = useState(false);
  const [touchedLastName, setTouchedLastName] = useState(false);
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedPhone, setTouchedPhone] = useState(false);
  const [touchedCity, setTouchedCity] = useState(false);
  const [touchedCountry, setTouchedCountry] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);

  const [signup, { isLoading }] = useSignupMutation();
  const { showToast } = useToast();

  const isFirstNameValid = firstName.trim().length >= 1;
  const isLastNameValid = lastName.trim().length >= 1;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPhoneValid = phone.trim().length >= 5;
  const isCityValid = city.trim().length >= 1;
  const isCountryValid = country.trim().length >= 1;
  const isPasswordValid = password.length >= 6;

  const isFormValid =
    isFirstNameValid &&
    isLastNameValid &&
    isEmailValid &&
    isPhoneValid &&
    isCityValid &&
    isCountryValid &&
    isPasswordValid;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        showToast("Image file size should be less than 10MB.", "error");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 400;
          const MAX_HEIGHT = 400;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
          setAvatarUrl(dataUrl);
          showToast("Photo uploaded & optimized successfully!", "info");
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouchedFirstName(true);
    setTouchedLastName(true);
    setTouchedEmail(true);
    setTouchedPhone(true);
    setTouchedCity(true);
    setTouchedCountry(true);
    setTouchedPassword(true);

    if (!isFirstNameValid) {
      showToast("First Name is required.", "error");
      return;
    }
    if (!isLastNameValid) {
      showToast("Last Name is required.", "error");
      return;
    }
    if (!isEmailValid) {
      showToast("Please enter a valid email address.", "error");
      return;
    }
    if (!isPhoneValid) {
      showToast("Phone Number is required.", "error");
      return;
    }
    if (!isCityValid) {
      showToast("City is required.", "error");
      return;
    }
    if (!isCountryValid) {
      showToast("Country is required.", "error");
      return;
    }
    if (!isPasswordValid) {
      showToast("Password must be at least 6 characters long.", "error");
      return;
    }

    try {
      const res = await signup({
        firstName,
        lastName,
        name: `${firstName} ${lastName}`.trim(),
        email,
        phone,
        city,
        country,
        password,
        avatarUrl,
      }).unwrap();

      showToast(`Account registered! Welcome, ${res.user?.firstName || res.user?.name || "Explorer"}!`, "success");
      navigate("/dashboard");
    } catch (err: any) {
      showToast(err?.data?.message || "Failed to register account.", "error");
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-50 flex font-sans">
      {/* Left side: Signup Form Container without outer white box */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 sm:p-8 h-full overflow-y-auto">
        <div className="max-w-xl w-full space-y-4 my-auto">
          {/* Hidden File Input for Computer Photo Selection */}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Top Centered Photo / Avatar Circle */}
          <div className="flex flex-col items-center justify-center space-y-1">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-16 h-16 rounded-full bg-slate-200 border-2 border-slate-300 flex flex-col items-center justify-center text-slate-400 shadow-inner relative cursor-pointer group overflow-hidden"
              title="Click to choose photo from computer"
            >
              {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar Preview" className="w-full h-full object-cover rounded-full" />
              ) : (
                <>
                  <UserIcon className="w-6 h-6 text-slate-500" />
                  <span className="text-[8px] font-extrabold text-slate-500 uppercase">Photo</span>
                </>
              )}
              <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-full">
                <Camera className="w-4 h-4 text-white" />
              </div>
            </div>
            <span className="text-[10px] font-bold text-slate-400">Click photo circle to select from computer</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Row 1: First Name & Last Name (Both Required) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  onBlur={() => setTouchedFirstName(true)}
                  placeholder="First Name"
                  className={`w-full px-3.5 py-2.5 bg-white border rounded-xl text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 shadow-xs ${
                    touchedFirstName && !isFirstNameValid
                      ? "border-rose-500 focus:ring-rose-500 bg-rose-50/30"
                      : "border-slate-300 focus:ring-[#02639B]"
                  }`}
                />
                {touchedFirstName && !isFirstNameValid && (
                  <p className="text-[10px] font-bold text-rose-500 mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 inline mr-1 text-rose-500 shrink-0" />
                    <span>First Name is required</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  onBlur={() => setTouchedLastName(true)}
                  placeholder="Last Name"
                  className={`w-full px-3.5 py-2.5 bg-white border rounded-xl text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 shadow-xs ${
                    touchedLastName && !isLastNameValid
                      ? "border-rose-500 focus:ring-rose-500 bg-rose-50/30"
                      : "border-slate-300 focus:ring-[#02639B]"
                  }`}
                />
                {touchedLastName && !isLastNameValid && (
                  <p className="text-[10px] font-bold text-rose-500 mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 inline mr-1 text-rose-500 shrink-0" />
                    <span>Last Name is required</span>
                  </p>
                )}
              </div>
            </div>

            {/* Row 2: Email Address & Phone Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setTouchedEmail(true)}
                    placeholder="user@gmail.com"
                    className={`w-full pl-9 pr-3 py-2.5 bg-white border rounded-xl text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 shadow-xs ${
                      touchedEmail && !isEmailValid
                        ? "border-rose-500 focus:ring-rose-500 bg-rose-50/30"
                        : "border-slate-300 focus:ring-[#02639B]"
                    }`}
                  />
                </div>
                {touchedEmail && !isEmailValid && (
                  <p className="text-[10px] font-bold text-rose-500 mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 inline mr-1 text-rose-500 shrink-0" />
                    <span>Please enter a valid email address (e.g. user@gmail.com)</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Phone Number *
                </label>
                <div className="phone-input-container">
                  <PhoneInput
                    country={"in"}
                    value={phone}
                    onChange={(phoneVal: string, countryData: any) => {
                      setPhone(phoneVal);
                      if (countryData && countryData.name) {
                        setCountry(countryData.name);
                      }
                    }}
                    inputProps={{
                      required: true,
                      onBlur: () => setTouchedPhone(true),
                    }}
                    inputStyle={{
                      width: "100%",
                      height: "42px",
                      fontSize: "14px",
                      borderRadius: "12px",
                      borderColor: touchedPhone && !isPhoneValid ? "#f43f5e" : "#cbd5e1",
                      backgroundColor: "#ffffff",
                    }}
                    buttonStyle={{
                      borderRadius: "12px 0 0 12px",
                      borderColor: "#cbd5e1",
                      backgroundColor: "#f8fafc",
                    }}
                  />
                </div>
                {touchedPhone && !isPhoneValid && (
                  <p className="text-[10px] font-bold text-rose-500 mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 inline mr-1 text-rose-500 shrink-0" />
                    <span>Phone Number is required (at least 5 digits)</span>
                  </p>
                )}
              </div>
            </div>

            {/* Row 3: City & Country (Both Required) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  City *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onBlur={() => setTouchedCity(true)}
                    placeholder="e.g. Mumbai"
                    className={`w-full pl-9 pr-3 py-2.5 bg-white border rounded-xl text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 shadow-xs ${
                      touchedCity && !isCityValid
                        ? "border-rose-500 focus:ring-rose-500 bg-rose-50/30"
                        : "border-slate-300 focus:ring-[#02639B]"
                    }`}
                  />
                </div>
                {touchedCity && !isCityValid && (
                  <p className="text-[10px] font-bold text-rose-500 mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 inline mr-1 text-rose-500 shrink-0" />
                    <span>City is required</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Country *
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    onBlur={() => setTouchedCountry(true)}
                    placeholder="e.g. India"
                    className={`w-full pl-9 pr-3 py-2.5 bg-white border rounded-xl text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 shadow-xs ${
                      touchedCountry && !isCountryValid
                        ? "border-rose-500 focus:ring-rose-500 bg-rose-50/30"
                        : "border-slate-300 focus:ring-[#02639B]"
                    }`}
                  />
                </div>
                {touchedCountry && !isCountryValid && (
                  <p className="text-[10px] font-bold text-rose-500 mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 inline mr-1 text-rose-500 shrink-0" />
                    <span>Country is required</span>
                  </p>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setTouchedPassword(true)}
                  placeholder="••••••••"
                  className={`w-full pl-9 pr-9 py-2.5 bg-white border rounded-xl text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 shadow-xs ${
                    touchedPassword && !isPasswordValid
                      ? "border-rose-500 focus:ring-rose-500 bg-rose-50/30"
                      : "border-slate-300 focus:ring-[#02639B]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
              {touchedPassword && !isPasswordValid && (
                <p className="text-[10px] font-bold text-rose-500 mt-1 flex items-center">
                  <AlertCircle className="w-3 h-3 inline mr-1 text-rose-500 shrink-0" />
                  <span>Password must be at least 6 characters long</span>
                </p>
              )}
            </div>

            {/* Register Users Button */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={!isFormValid || isLoading}
                className={`w-full py-3.5 px-4 text-white font-black text-sm rounded-xl shadow-md flex items-center justify-center space-x-2 transition-all ${
                  isFormValid && !isLoading
                    ? "bg-[#02639B] hover:bg-[#024E7B] shadow-sky-900/20 cursor-pointer hover:scale-[1.01]"
                    : "bg-slate-300 text-slate-500 cursor-not-allowed opacity-60"
                }`}
              >
                <span>{isLoading ? "Registering..." : "Register Users"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="text-center text-xs font-bold text-slate-500 pt-1.5 border-t border-slate-200">
            Already have an account?{" "}
            <Link to="/login" className="text-[#02639B] font-extrabold hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Right side: Cover Image Asset */}
      <div className="hidden lg:block lg:w-1/2 relative bg-slate-900 overflow-hidden h-full">
        <img
          src={registerSidebarImg}
          alt="Register Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-12 text-white">
          <h2 className="text-3xl font-black tracking-tight">Join GlobeTrotter</h2>
          <p className="text-sm font-semibold text-slate-300 mt-1">Craft your dream temple & multi-city travel itineraries.</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
