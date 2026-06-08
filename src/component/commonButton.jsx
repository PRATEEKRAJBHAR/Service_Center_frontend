import React from "react";

const Button = ({
  text,
  type = "button",
  onClick,
  icon,
  variant = "primary",
  disabled = false,
  className = "",
}) => {
  const baseStyle =
    "flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium transition duration-200";

  const variants = {
    primary: "bg-gray-700 text-white hover:bg-gray-800",
    secondary: "bg-gray-200 text-black hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {icon && <span>{icon}</span>}
      {text}
    </button>
  );
};

export default Button;