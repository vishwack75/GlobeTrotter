import React from "react";

export const TripCard: React.FC<{ trip?: any }> = ({ trip }) => {
  return <div className="trip-card">{trip?.name || "Trip Card"}</div>;
};

export default TripCard;
