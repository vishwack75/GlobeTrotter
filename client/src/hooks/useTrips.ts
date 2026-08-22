import { useState } from "react";

export const useTrips = () => {
  const [trips, setTrips] = useState([]);
  return { trips, setTrips };
};
