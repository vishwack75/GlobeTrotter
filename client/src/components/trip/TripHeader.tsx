import React from "react";

export const TripHeader: React.FC<{ title?: string }> = ({ title = "Trip Header" }) => {
  return <div className="trip-header">{title}</div>;
};

export default TripHeader;
