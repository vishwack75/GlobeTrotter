import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-slate-800 border-t border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="flex items-center">
              <span className="text-xl font-black tracking-tight bg-gradient-to-r from-[#02639B] via-sky-500 to-indigo-600 bg-clip-text text-transparent">
                GlobeTrotter
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-sm">
              Plan Less. Travel More. Architecting personalized Indian temple yatras and multi-city adventures worldwide.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <h4 className="font-extrabold uppercase tracking-wider text-slate-900">Company</h4>
            <ul className="space-y-2 text-slate-500 font-semibold">
              <li><Link to="/explore/cities" className="hover:text-[#02639B]">Explore Destinations</Link></li>
              <li><Link to="/signup" className="hover:text-[#02639B]">Start Planning</Link></li>
              <li><Link to="/login" className="hover:text-[#02639B]">Account Login</Link></li>
            </ul>
          </div>

          <div className="space-y-3 text-xs">
            <h4 className="font-extrabold uppercase tracking-wider text-slate-900">Legal</h4>
            <ul className="space-y-2 text-slate-500 font-semibold">
              <li><Link to="/privacy" className="hover:text-[#02639B]">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-[#02639B]">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 font-semibold gap-4">
          <p>© 2026 GlobeTrotter | All rights reserved.</p>
          <div className="flex items-center space-x-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Indian & Global travelers.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
