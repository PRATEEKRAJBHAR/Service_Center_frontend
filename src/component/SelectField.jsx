import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function SelectField({
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

      {/* Select Wrapper */}
      <div className="relative group">

        {/* Left Icon */}
        {icon && (
          <span
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 transition-all duration-300
            ${
              touched && error
                ? "text-red-400"
                : "text-cyan-400 group-focus-within:text-cyan-300"
            }`}
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
          className={`w-full appearance-none py-3 pl-12 pr-12 rounded-full
          bg-white/5 backdrop-blur-md text-white border outline-none
          transition-all duration-300 cursor-pointer
          ${
            touched && error
              ? "border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]"
              : "border-cyan-400/40 focus:border-cyan-300 focus:shadow-[0_0_18px_rgba(34,211,238,0.5)]"
          }`}
        >
          <option value="" className="bg-[#0f172a] text-gray-300">
            {placeholder}
          </option>

          {options.map((opt, i) => (
            <option
              key={i}
              value={opt.value}
              className="bg-[#0f172a] text-white"
            >
              {opt.label}
            </option>
          ))}
        </select>

        {/* Right Arrow */}
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-400 pointer-events-none transition-all duration-300 group-focus-within:rotate-180">
          <KeyboardArrowDownIcon />
        </span>

        {/* Bottom Glow Line */}
        {/* <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-cyan-700 group-focus-within:w-full transition-all duration-500 rounded-full"></span> */}
      </div>

      {/* Error */}
      {touched && error && (
        <p className="text-red-400 text-sm mt-1 ml-2 animate-pulse">
          {error}
        </p>
      )}
    </div>
  );
}

export default SelectField;