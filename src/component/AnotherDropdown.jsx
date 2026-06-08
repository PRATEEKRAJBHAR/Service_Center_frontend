import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function DropDownField({
  icon,
  name,
  value,
  onChange,
  onBlur,
  options = [],
  placeholder = "Select Option",
  error,
  touched,
}) {
  return (
    <div className="w-full">

      <div className="relative group">

        {/* Left Icon */}
        {icon && (
          <span
            className={`absolute left-3 top-1/2 -translate-y-1/2 transition
            ${touched && error ? "text-red-500" : "text-gray-500"}`}
          >
            {icon}
          </span>
        )}

        {/* Select */}
        <select
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`w-full appearance-none py-2.5 pl-10 pr-10 rounded-lg
          bg-white text-black border outline-none text-sm
          transition-all duration-200 cursor-pointer
          ${
            touched && error
              ? "border-red-500"
              : "border-gray-300 focus:border-black focus:ring-1 focus:ring-black"
          }`}
        >
          <option value="" className="text-gray-400">
            {placeholder}
          </option>

          {options.map((opt, i) => (
            <option key={i} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Right Arrow */}
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none transition group-focus-within:rotate-180">
          <KeyboardArrowDownIcon />
        </span>

      </div>

      {/* Error */}
      {touched && error && (
        <p className="text-red-500 text-xs mt-1 ml-1">
          {error}
        </p>
      )}
    </div>
  );
}

export default DropDownField;