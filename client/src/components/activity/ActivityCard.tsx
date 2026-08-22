import React from "react";

export const ActivityCard: React.FC<{ activity?: any }> = ({ activity }) => {
  return <div className="activity-card">{activity?.title || "Activity Card"}</div>;
};

export default ActivityCard;
