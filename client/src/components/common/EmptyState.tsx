import React from "react";

export const EmptyState: React.FC<{ message?: string }> = ({ message = "No data found" }) => {
  return <div className="empty-state">{message}</div>;
};

export default EmptyState;
