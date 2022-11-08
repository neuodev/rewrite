import React from "react";

const Button: React.FC<{
  variant: "primary" | "secondary";
  children?: React.ReactNode;
}> = ({ variant, children }) => {
  const isPrimary = variant === "primary";
  return (
    <button
      className={`px-3 py-1.5 rounded-md uppercase flex items-center justify-center ${
        isPrimary
          ? "bg-indigo-500 text-white hover:bg-indigo-600"
          : "bg-transparent border border-gray-500 text-gray-900 hover:bg-gray-100"
      } transition-colors duration-300 ease-in`}
    >
      {children}
    </button>
  );
};

export default Button;
