// src/components/ui/Input.tsx
import type { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
}

const Input = ({
  label,
  error,
  leftIcon,
  className = "",
  ...props
}: InputProps) => {
  return (
    <div className="flex flex-col gap-1">
      {/* Label */}
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}

      {/* Input wrapper */}
      <div className="relative">
        {/* Left icon */}
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}

        <input
          className={`
            w-full rounded-lg border px-3 py-2 text-sm
            text-gray-900 placeholder-gray-400
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            disabled:bg-gray-50 disabled:cursor-not-allowed
            ${error ? "border-red-400" : "border-gray-300"}
            ${leftIcon ? "pl-10" : ""}
            ${className}
          `}
          {...props}
        />
      </div>

      {/* Error message */}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
