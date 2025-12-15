import React from "react";
import { Currency, TabType } from "../definitions/type";
import { ChevronDown, CryptoIcon, FlagIcon } from "./Icons";
import Image from "next/image";

interface AmountInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  currency: Currency;
  onCurrencyClick: () => void;
  error?: string;
}

export const AmountInput: React.FC<AmountInputProps> = ({
  label,
  value,
  onChange,
  currency,
  onCurrencyClick,
  error,
}) => {
  return (
    <div className="w-full">
      <div
        className={`border ${
          error ? "border-red-500" : "border-gray-200"
        } rounded-3xl p-4 bg-white relative hover:border-gray-300 transition-colors`}
      >
        <div className="flex justify-between items-center mb-1">
          <label
            className={`text-sm font-medium ${
              error ? "text-red-500" : "text-gray-400"
            }`}
          >
            {label}
          </label>
        </div>
        <div className="flex justify-between items-center">
          <input
            type="text"
            value={value}
            onChange={(e) => {
              // Only allow numbers and one decimal point
              if (/^\d*\.?\d*$/.test(e.target.value)) {
                onChange(e.target.value);
              }
            }}
            className="text-2xl font-bold text-gray-900 bg-transparent outline-none w-full placeholder-gray-300"
            placeholder="0.00"
          />
          <button
            onClick={onCurrencyClick}
            className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 py-1.5 px-3 rounded-full border border-gray-100 transition-colors shrink-0"
          >
            <Image
              src={currency.iconPath}
              alt={currency.code}
              className="w-6 h-6 rounded-full object-cover"
              width={100}
              height={100}
            />
            <span className="font-semibold text-primary text-sm">
              {currency.code}
            </span>
            <ChevronDown className="text-gray-400 w-4 h-4" />
          </button>
        </div>
      </div>
      {error && <p className="text-red-500 text-xs mt-1.5 pl-4">{error}</p>}
    </div>
  );
};
