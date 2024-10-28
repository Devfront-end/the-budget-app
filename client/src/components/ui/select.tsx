import React from "react";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
}

export const Select: React.FC<SelectProps> = ({ error, className = "", children, ...props }) => {
  return (
    <div>
      <select
        className={`w-full px-3 py-2 border rounded-md ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Select;