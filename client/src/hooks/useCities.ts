import { useState } from "react";

export const useCities = () => {
  const [cities, setCities] = useState([]);
  return { cities, setCities };
};
