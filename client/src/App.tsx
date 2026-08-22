import React from "react";
import AppRoutes from "./routes/AppRoutes";

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased">
      <AppRoutes />
    </div>
  );
};

export default App;