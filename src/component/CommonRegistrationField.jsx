// ===============================
// src/component/RegistrationField.jsx
// ===============================

import React from "react";

function RegistrationField({
  icon,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  isTextarea = false,
  rows = 4,
}) {
  return (
    <div className="w-full">
      <div className="relative">

        {/* Icon */}
        {icon && !isTextarea && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 z-10">
            {icon}
          </span>
        )}

        {/* Textarea */}
        {isTextarea ? (
          <textarea
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            rows={rows}
            className={`w-full bg-transparent border rounded-2xl py-3 px-4 text-white placeholder-gray-400 outline-none resize-none transition-all duration-300
            ${
              touched && error
                ? "border-red-500"
                : "border-cyan-500 focus:shadow-[0_0_15px_#00eaff]"
            }`}
          />
        ) : (
          /* Input */
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className={`w-full bg-transparent border rounded-full py-3 pl-12 pr-4 text-white placeholder-gray-400 outline-none transition-all duration-300
            ${
              touched && error
                ? "border-red-500"
                : "border-cyan-500 focus:shadow-[0_0_15px_#00eaff]"
            }`}
          />
        )}
      </div>

      {/* Error */}
      {touched && error && (
        <p className="text-red-400 text-sm mt-1 ml-2">{error}</p>
      )}
    </div>
  );
}

export default RegistrationField;