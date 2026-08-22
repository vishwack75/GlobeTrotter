import React from "react";

export const ErrorMessage: React.FC<{ message: string }> = ({ message }) => {
  return <div className="text-red-500 font-medium">{message}</div>;
};

export default ErrorMessage;
