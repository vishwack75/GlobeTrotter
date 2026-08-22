import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";

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

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-xs py-3"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between relative">
        <Link to="/" className="flex items-center group">
          <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-[#02639B] via-sky-500 to-indigo-600 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
            GlobeTrotter
          </span>
        </Link>

        {/* Centered Menu Navigation */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600 absolute left-1/2 -translate-x-1/2">
          <button
            onClick={() => scrollToSection("explore")}
            className="hover:text-[#02639B] transition-colors cursor-pointer"
          >
            Explore
          </button>
          <button
            onClick={() => scrollToSection("how-it-works")}
            className="hover:text-[#02639B] transition-colors cursor-pointer"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection("features")}
            className="hover:text-[#02639B] transition-colors cursor-pointer"
          >
            Features
          </button>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login" className="px-4 py-2.5 text-sm font-bold text-slate-700 hover:text-[#02639B] transition-colors">
            Log In
          </Link>
          <Link
            to="/signup"
            className="px-6 py-3 bg-[#02639B] hover:bg-[#024E7B] text-white font-extrabold text-xs rounded-full shadow-md shadow-sky-900/20 flex items-center space-x-2 transition-all hover:scale-105"
          >
            <span>Start Planning</span>
            <ArrowRight className="w-3.5 h-3.5" />
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
          <button onClick={() => scrollToSection("explore")} className="block text-left w-full text-slate-800 font-bold">
            Explore
          </button>
          <button onClick={() => scrollToSection("how-it-works")} className="block text-left w-full text-slate-800 font-bold">
            How It Works
          </button>
          <button onClick={() => scrollToSection("features")} className="block text-left w-full text-slate-800 font-bold">
            Features
          </button>
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            <Link to="/login" className="text-center py-2.5 font-bold text-slate-700">Log In</Link>
            <Link to="/signup" className="text-center py-3 bg-[#02639B] text-white font-extrabold rounded-full flex items-center justify-center space-x-2">
              <span>Start Planning</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
