import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default PageLayout;
