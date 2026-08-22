import React from "react";

export const AdminLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <div className="admin-layout">{children}</div>;
};

export default AdminLayout;
