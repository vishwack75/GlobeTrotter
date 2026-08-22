import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/landing/Navbar";
import Footer from "../../components/landing/Footer";
import { FileText, ArrowLeft } from "lucide-react";

export const TermsOfService: React.FC = () => {
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
              <FileText className="w-5 h-5" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Terms of Service
            </h1>
          </div>
          <p className="text-xs text-slate-500 font-semibold">Last updated: August 2026</p>
        </div>

        <div className="space-y-6 text-sm text-slate-600 leading-relaxed font-medium">
          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-slate-900">1. Agreement to Terms</h2>
            <p>
              By accessing or using GlobeTrotter, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our travel planning platform.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-slate-900">2. User Accounts</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials and for all activities occurring under your account. You agree to provide accurate information when registering.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-slate-900">3. Travel Content & Recommendations</h2>
            <p>
              GlobeTrotter provides destination recommendations, activity options, and budget calculators for informational purposes. Users are advised to verify local travel requirements, temple timings, and entry fees directly with official travel providers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-slate-900">4. Intellectual Property</h2>
            <p>
              All branding, platform interface elements, and custom travel tools remain the property of GlobeTrotter. User-submitted trip itineraries remain owned by the user.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-slate-900">5. Limitation of Liability</h2>
            <p>
              GlobeTrotter shall not be liable for third-party travel disruptions, hotel cancellations, or weather events occurring during your trip.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;
