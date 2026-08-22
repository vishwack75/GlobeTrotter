import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/landing/Navbar";
import Footer from "../../components/landing/Footer";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main className="pt-28 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 flex-1">
        <div className="space-y-4 border-b border-slate-200 pb-6">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-xs font-bold text-[#02639B] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 text-[#02639B] flex items-center justify-center border border-sky-100">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Privacy Policy
            </h1>
          </div>
          <p className="text-xs text-slate-500 font-semibold">Last updated: August 2026</p>
        </div>

        <div className="space-y-6 text-sm text-slate-600 leading-relaxed font-medium">
          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-slate-900">1. Information We Collect</h2>
            <p>
              GlobeTrotter collects information you provide directly to us when creating an account, building travel itineraries, entering daily budgets, or saving favorite destinations. This includes your name, email address, password, profile photo, and trip planning preferences.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-slate-900">2. How We Use Your Information</h2>
            <p>
              We use the collected information strictly to personalize your trip planning experience, manage your account securely, calculate budget estimates across multi-city routes, and allow you to share itineraries with fellow travelers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-slate-900">3. Data Security & Storage</h2>
            <p>
              Your personal data is encrypted in transit and at rest using industry-standard protocols. We never sell or monetize your personal travel data to third-party advertisers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-slate-900">4. Sharing & Public Trips</h2>
            <p>
              By default, your created itineraries are private to your profile. If you choose to generate a public share code for a trip, anyone with the link can view the route details without accessing your personal account information.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-slate-900">5. Your Rights & Control</h2>
            <p>
              You retain full rights to request account deletion, edit your profile details, or export your trip data at any time through your Profile Settings.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
