import React from "react";

export const StopCard: React.FC<{ stop?: any }> = ({ stop }) => {
  return <div className="stop-card">{stop?.city?.name || "Stop Card"}</div>;
};

export default StopCard;
