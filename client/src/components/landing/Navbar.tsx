import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Globe, Menu, X } from "lucide-react";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-600/30 group-hover:scale-105 transition-transform">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-black tracking-tight text-slate-900">
            GlobeTrotter
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600">
          <a href="#explore" className="hover:text-blue-600 transition-colors">Explore</a>
          <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How It Works</a>
          <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
          <a href="#community" className="hover:text-blue-600 transition-colors">Community</a>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login" className="px-4 py-2.5 text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors">
            Log In
          </Link>
          <Link
            to="/signup"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-full shadow-md shadow-blue-600/20 transition-all hover:scale-105"
          >
            Start Planning
          </Link>
        </div>

        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-700">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 shadow-xl">
          <a href="#explore" onClick={() => setMobileMenuOpen(false)} className="block text-slate-800 font-bold">Explore</a>
          <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block text-slate-800 font-bold">How It Works</a>
          <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block text-slate-800 font-bold">Features</a>
          <a href="#community" onClick={() => setMobileMenuOpen(false)} className="block text-slate-800 font-bold">Community</a>
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            <Link to="/login" className="text-center py-2.5 font-bold text-slate-700">Log In</Link>
            <Link to="/signup" className="text-center py-3 bg-blue-600 text-white font-extrabold rounded-full">Start Planning</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
