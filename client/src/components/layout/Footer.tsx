import React from "react";
import { Globe, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center">
            <Globe className="w-4 h-4 text-white" />
          </div>
          <span className="font-extrabold text-slate-800 tracking-tight">GlobeTrotter</span>
          <span className="text-xs text-slate-400 font-medium">• Empowering Personalized Travel Planning</span>
        </div>
        <div className="flex items-center space-x-1 text-xs text-slate-500">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>for smart multi-city travelers worldwide.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
