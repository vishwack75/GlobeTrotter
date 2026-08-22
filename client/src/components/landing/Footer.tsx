import React from "react";
import { Globe, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-white border-t border-slate-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black tracking-tight">GlobeTrotter</span>
            </div>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              Plan Less. Travel More. Empowering personalized multi-city travel planning worldwide.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <h4 className="font-extrabold uppercase tracking-wider text-slate-300">Product</h4>
            <ul className="space-y-2 text-slate-400 font-semibold">
              <li><a href="#features" className="hover:text-blue-400">Features</a></li>
              <li><Link to="/trips" className="hover:text-blue-400">My Trips</Link></li>
              <li><Link to="/explore/cities" className="hover:text-blue-400">Explore Cities</Link></li>
              <li><Link to="/calendar" className="hover:text-blue-400">Calendar View</Link></li>
            </ul>
          </div>

          <div className="space-y-3 text-xs">
            <h4 className="font-extrabold uppercase tracking-wider text-slate-300">Company</h4>
            <ul className="space-y-2 text-slate-400 font-semibold">
              <li><a href="#about" className="hover:text-blue-400">About Us</a></li>
              <li><a href="#contact" className="hover:text-blue-400">Contact</a></li>
              <li><a href="#careers" className="hover:text-blue-400">Careers</a></li>
            </ul>
          </div>

          <div className="space-y-3 text-xs">
            <h4 className="font-extrabold uppercase tracking-wider text-slate-300">Legal</h4>
            <ul className="space-y-2 text-slate-400 font-semibold">
              <li><a href="#privacy" className="hover:text-blue-400">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-blue-400">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-semibold gap-4">
          <p>© 2026 GlobeTrotter. All rights reserved.</p>
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
