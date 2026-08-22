import React from "react";
import { Compass } from "lucide-react";

export const Loader: React.FC<{ message?: string }> = ({ message = "Loading data..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-4">
      <div className="relative">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center animate-pulse">
          <Compass className="w-6 h-6 text-indigo-600 animate-spin" />
        </div>
      </div>
      <p className="text-xs font-bold text-slate-500 tracking-wide">{message}</p>
    </div>
  );
};

export default Loader;
