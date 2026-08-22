import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="page-layout">
      <Navbar />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
};

export default PageLayout;
