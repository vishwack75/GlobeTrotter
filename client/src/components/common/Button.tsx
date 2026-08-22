import React from "react";

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  return <button className="px-4 py-2 bg-blue-600 text-white rounded" {...props} />;
};

export default Button;
