import React from "react";

export const CardSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4 animate-pulse"
        >
          <div className="h-36 bg-slate-200 rounded-2xl w-full" />
          <div className="space-y-2">
            <div className="h-5 bg-slate-200 rounded-lg w-3/4" />
            <div className="h-3 bg-slate-200 rounded-lg w-full" />
            <div className="h-3 bg-slate-200 rounded-lg w-1/2" />
          </div>
          <div className="pt-3 border-t border-slate-100 flex justify-between">
            <div className="h-4 bg-slate-200 rounded w-1/3" />
            <div className="h-4 bg-slate-200 rounded w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const ListSkeleton: React.FC<{ count?: number }> = ({ count = 4 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex items-center justify-between animate-pulse"
        >
          <div className="flex items-center space-x-4 w-full">
            <div className="w-20 h-20 bg-slate-200 rounded-2xl shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="h-5 bg-slate-200 rounded w-1/3" />
              <div className="h-3 bg-slate-200 rounded w-2/3" />
              <div className="h-3 bg-slate-200 rounded w-1/4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardSkeleton;
