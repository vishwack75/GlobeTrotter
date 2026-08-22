import React from "react";
import Navbar from "../../components/landing/Navbar";
import Hero from "../../components/landing/Hero";
import Stats from "../../components/landing/Stats";
import Features from "../../components/landing/Features";
import ProductShowcase from "../../components/landing/ProductShowcase";
import HowItWorks from "../../components/landing/HowItWorks";
import Destinations from "../../components/landing/Destinations";
import PersonalizedPlanning from "../../components/landing/PersonalizedPlanning";
import BudgetPreview from "../../components/landing/BudgetPreview";
import ItineraryPreview from "../../components/landing/ItineraryPreview";
import Community from "../../components/landing/Community";
import FinalCTA from "../../components/landing/FinalCTA";
import Footer from "../../components/landing/Footer";

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900 selection:bg-blue-600 selection:text-white">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <ProductShowcase />
      <HowItWorks />
      <Destinations />
      <PersonalizedPlanning />
      <BudgetPreview />
      <ItineraryPreview />
      <Community />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default LandingPage;
