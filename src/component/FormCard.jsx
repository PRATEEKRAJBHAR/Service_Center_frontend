// src/components/common/FormCard.jsx
import React from "react";

function FormCard({ title, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-5">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}

export default FormCard;