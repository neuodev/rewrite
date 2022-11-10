import React from "react";

const Input: React.FC<{
  placeholder?: string;
  label: string;
  helperText?: string;
  error?: boolean;
  value?: string;
  onChange?(val: string): void;
  as: "input" | "textarea";
}> = ({ placeholder, helperText, error, label, as, value, onChange }) => {
  const props = {
    className:
      "rounded-md placeholder:text-gray-400 font-medium w-full focus:outline-none focus:ring-2 focus:ring-indigo-300 py-2 px-3 bg-gray-200",
    type: "text",
    placeholder,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange && onChange(e.target.value),
  };

  return (
    <div>
      <p className="text-base capitalize font-medium mb-1">{label}</p>
      {as === "input" ? (
        <input {...props} />
      ) : (
        <textarea {...props} className={props.className + " h-24 w-full"} />
      )}
      <p className={`text-xs mt-1 text-gray-600 font-thin`}>{helperText}</p>
    </div>
  );
};

export default Input;

Input.defaultProps = {
  error: false,
};
