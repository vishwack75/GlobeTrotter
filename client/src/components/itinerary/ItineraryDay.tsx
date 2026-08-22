import React from "react";

export const ItineraryDay: React.FC<{ dayNumber?: number }> = ({ dayNumber = 1 }) => {
  return <div className="itinerary-day">Day {dayNumber}</div>;
};

export default ItineraryDay;
