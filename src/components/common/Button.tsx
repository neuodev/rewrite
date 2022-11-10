import React from "react";

const Button: React.FC<{
  variant: "primary" | "secondary";
  children?: React.ReactNode;
  link?: string;
  onClick?(): void;
}> = ({ link, variant, children, onClick }) => {
  const isPrimary = variant === "primary";
  return (
    <button
      onClick={() => {
        onClick && onClick();
        link && window.open(link, "_self");
      }}
      className={`text-base px-4 py-1.5 rounded-md uppercase flex items-center justify-center ${
        isPrimary
          ? "bg-indigo-500 text-white hover:bg-indigo-600"
          : "bg-transparent border border-gray-500 text-gray-900 hover:bg-gray-100"
      } transition-colors duration-300 ease-in`}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  variant: "primary",
};

export default Button;
