import React from "react";

export const BudgetPreview: React.FC = () => {
  const categories = [
    { name: "Accommodation", amount: "₹32,000", percentage: "38%" },
    { name: "Transportation", amount: "₹18,500", percentage: "22%" },
    { name: "Activities", amount: "₹15,000", percentage: "17%" },
    { name: "Food & Meals", amount: "₹12,000", percentage: "14%" },
    { name: "Other / Misc", amount: "₹7,900", percentage: "9%" },
  ];

  return (
    <section className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Know Your Budget Before You Go.
          </h2>
          <p className="text-slate-600 text-sm font-medium">
            Real-time financial breakdown eliminating unexpected travel expenses.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-slate-900 text-white rounded-3xl p-8 shadow-2xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Estimated Trip Budget</span>
              <p className="text-3xl font-black text-emerald-400 mt-1">₹85,400 Total</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 font-bold uppercase">Daily Average</span>
              <p className="text-xl font-extrabold text-cyan-400 mt-1">₹7,117 / Day</p>
            </div>
          </div>

          <div className="space-y-4">
            {categories.map((cat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-extrabold">
                  <span className="text-slate-300">{cat.name}</span>
                  <span className="text-slate-100">{cat.amount}</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-linear-to-r from-blue-500 to-cyan-400 h-full" style={{ width: cat.percentage }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BudgetPreview;
