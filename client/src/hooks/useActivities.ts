import { useState } from "react";

export const useActivities = () => {
  const [activities, setActivities] = useState([]);
  return { activities, setActivities };
};
