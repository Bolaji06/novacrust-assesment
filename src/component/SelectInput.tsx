import React from "react";
import { ChevronDown } from "./Icons";

interface SelectInputProps {
  label: string;
  value?: string | React.ReactNode;
  placeholder?: string;
  onClick: () => void;
  isOpen: boolean;
  error?: string;
}

export const SelectInput: React.FC<SelectInputProps> = ({
  label,
  value,
  placeholder = "Select an option",
  onClick,
  isOpen,
  error,
}) => {
  return (
    <div className="mb-4">
      <label
        className={`block font-medium text-sm mb-2 pl-1 ${
          error ? "text-red-500" : "text-primary"
        }`}
      >
        {label}
      </label>
      <button
        onClick={onClick}
        className={`w-full bg-white border ${
          error
            ? "border-red-500 focus:ring-red-200"
            : isOpen
            ? "border-primary ring-1 ring-primary"
            : "border-gray-200"
        } rounded-full py-3.5 px-5 flex items-center justify-between transition-all hover:border-gray-300 text-primary`}
      >
        <div className="text-gray-700 font-medium truncate">
          {value || (
            <span className="text-primary font-normal">{placeholder}</span>
          )}
        </div>
        <ChevronDown
          className={`text-gray-400 w-5 h-5 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {error && <p className="text-red-500 text-xs mt-1.5 pl-4">{error}</p>}
    </div>
  );
};
