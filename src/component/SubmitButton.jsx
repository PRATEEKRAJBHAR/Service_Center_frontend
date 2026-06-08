import React from "react";

function SubmitButton({
  loading = false,
  isEdit = false,
  addText = "Submit",
  updateText = "Update",
  type = "submit",
  disabled = false,
  className = "",
  icon = null,
}) {
  return (
    <>
      <button
        type={type}
        disabled={loading || disabled}
        className={`relative w-full py-3 rounded-full font-bold text-[#061a2e] overflow-hidden transition-all duration-300
        bg-gradient-to-r from-cyan-400 to-cyan-300
        hover:scale-105 hover:shadow-[0_0_25px_rgba(34,211,238,0.7)]
        active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed ${className}`}
      >
        {/* Shine Animation */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shine_2s_linear_infinite]" />

        {/* Text */}
        <span className="relative z-10 flex items-center justify-center gap-2 tracking-wide">
          {icon}

          {loading
            ? isEdit
              ? "Updating..."
              : "Submitting..."
            : isEdit
            ? updateText
            : addText}
        </span>
      </button>

      <style>
        {`
          @keyframes shine {
            100% {
              transform: translateX(200%);
            }
          }
        `}
      </style>
    </>
  );
}

export default SubmitButton;