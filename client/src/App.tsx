import React from "react";
import AppRoutes from "./routes/AppRoutes";

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      <AppRoutes />
    </div>
  );
};

export default App;