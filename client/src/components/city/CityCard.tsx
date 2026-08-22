import React from "react";

export const CityCard: React.FC<{ city?: any }> = ({ city }) => {
  return <div className="city-card">{city?.name || "City Card"}</div>;
};

export default CityCard;
