import React from "react";
import Navbar from "../../components/landing/Navbar";
import Hero from "../../components/landing/Hero";
import Features from "../../components/landing/Features";
import HowItWorks from "../../components/landing/HowItWorks";
import Destinations from "../../components/landing/Destinations";
import PersonalizedPlanning from "../../components/landing/PersonalizedPlanning";
import Footer from "../../components/landing/Footer";

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans antialiased text-slate-900 selection:bg-[#02639B] selection:text-white">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Destinations />
      <PersonalizedPlanning />
      <Footer />
    </div>
  );
};

export default LandingPage;
