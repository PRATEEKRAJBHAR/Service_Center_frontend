import Swal from "sweetalert2";

// ✅ Common Dark Theme
const darkTheme = {
  background: "#0f172a", // dark navy
  color: "#e2e8f0",
  customClass: {
    popup:
      "rounded-2xl border border-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.25)]",
    title: "text-cyan-400 font-bold text-xl",
    htmlContainer: "text-slate-300",
    confirmButton:
      "bg-cyan-400 text-slate-900 px-5 py-2 rounded-full font-semibold hover:bg-cyan-300 transition",
    cancelButton:
      "bg-slate-700 text-white px-5 py-2 rounded-full font-semibold hover:bg-slate-600 transition",
  },
  buttonsStyling: false,
};

// ✅ Show Loader
export const showLoader = (message = "Processing...") => {
  Swal.fire({
    ...darkTheme,
    title: message,
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

// ✅ Hide Loader
export const hideLoader = () => {
  Swal.close();
};

// ✅ Success Alert
export const showSuccess = (message = "Success 🎉") => {
  Swal.fire({
    ...darkTheme,
    icon: "success",
    title: message,
    timer: 1500,
    showConfirmButton: false,
  });
};

// ✅ Error Alert
export const showError = (message = "Something went wrong ❌") => {
  Swal.fire({
    ...darkTheme,
    icon: "error",
    title: message,
    confirmButtonText: "OK",
  });
};

// ✅ Confirm Dialog
export const confirmAction = async (message = "Are you sure?") => {
  const result = await Swal.fire({
    ...darkTheme,
    icon: "warning",
    title: message,
    text: "This action cannot be undone",
    showCancelButton: true,
    confirmButtonText: "Yes, Delete",
    cancelButtonText: "Cancel",
  });

  return result.isConfirmed;
};