import React from "react";

function InputField({
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
}) {
  return (
    <div>
      <div className="relative">
        {icon && !isTextarea && (
          <span className="absolute top-3 left-2 text-gray-400">
            {icon}
          </span>
        )}

        {isTextarea ? (
          <textarea
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            rows={4}
            className={`w-full border p-2 pl-10 rounded-lg focus:ring-2
    ${touched && error
      ? "border-red-500 focus:ring-red-400"
      : "border-gray-300 focus:ring-blue-400"
    }`}
          />
        ) : (
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className={`w-full border p-2 pl-10 rounded-lg focus:ring-2
    ${touched && error
      ? "border-red-500 focus:ring-red-400"
      : "border-gray-300 focus:ring-blue-400"
    }`}
          />
        )}
      </div>

      {touched && error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}

export default InputField;