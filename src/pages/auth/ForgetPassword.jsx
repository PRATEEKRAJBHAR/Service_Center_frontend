// this is working code

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";
// import { UserForgetPassword } from "../../features/auth/authThunk";
// import { NavLink } from "react-router-dom";

// import EmailIcon from "@mui/icons-material/Email";
// import SendIcon from "@mui/icons-material/Send";

// function ForgetPassword() {
//   const dispatch = useDispatch();
//   const { loading } = useSelector((state) => state.auth);

//   const [email, setEmail] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const result = await dispatch(UserForgetPassword({ email }));

//     if (UserForgetPassword.fulfilled.match(result)) {
//       Swal.fire({
//         icon: "success",
//         title: "Reset Link Sent ",
//         text: "Please check your email",
//         timer: 1500,
//         showConfirmButton: false,
//       });

//       setEmail("");
//     } else {
//       Swal.fire({
//         icon: "error",
//         title: "Error ",
//         text: result.payload?.message || "Something went wrong",
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200">

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-5"
//       >
//         <h2 className="text-2xl font-bold text-center text-gray-700">
//           Forgot Password
//         </h2>

//         {/* Email */}
//         <div className="relative">
//           <EmailIcon className="absolute top-3 left-2 text-gray-400" />
//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="w-full border p-2 pl-10 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//         </div>

//         {/* Button */}
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold"
//         >
//           <SendIcon />
//           {loading ? "Sending..." : "Send Reset Link"}
//         </button>

//         {/* Back to login */}
//         <div className="text-center text-sm">
//           <NavLink to="/" className="text-blue-600 hover:underline">
//             Back to Login
//           </NavLink>
//         </div>

//       </form>
//     </div>
//   );
// }

// export default ForgetPassword;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";

import EmailIcon from "@mui/icons-material/Email";
import SendIcon from "@mui/icons-material/Send";

import InputField from "../../component/InputField";
import Button from "../../component/commonButton";

import { UserForgetPassword } from "../../features/auth/authThunk";
import { showLoader, hideLoader, showSuccess, showError } from "../../component/swalLoader";
import { ForgetPasswordSchema } from "../../validation/ValidationSchema";
import RegistrationField from "../../component/CommonRegistrationField";
import RegistrationBUtton from "../../component/CommonRegistrationButton";

function ForgetPassword() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  // ✅ Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgetPasswordSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        showLoader("Sending Reset Link...");

        const result = await dispatch(UserForgetPassword(values));

        hideLoader();

        if (UserForgetPassword.fulfilled.match(result)) {
          showSuccess("Reset Link Sent");
          resetForm();
        } else {
          showError(result.payload?.message || "Something went wrong");
        }
      } catch (err) {
        hideLoader();
        showError("Something went wrong");
      }
    },
  });

  return (
  <div className="min-h-screen bg-[#081426] flex items-center justify-center overflow-hidden relative">

    {/* Background Glow */}
    <div className="absolute w-[700px] h-[700px] rounded-full bg-cyan-500/10 blur-3xl animate-pulse"></div>

    {/* Outer Rotating Ring */}
    <div className="absolute w-[500px] h-[500px] rounded-full border-[18px] border-cyan-500/10 animate-[spin_8s_linear_infinite]"></div>

    {/* Inner Reverse Ring */}
    <div className="absolute w-[420px] h-[420px] rounded-full border-[10px] border-cyan-400/10 animate-[spin_6s_linear_infinite_reverse]"></div>

    {/* Forgot Password Card */}
    <div className="relative z-10 w-[380px] p-8 rounded-3xl bg-[#0d1c30]/70 backdrop-blur-xl shadow-2xl animate-[fadeIn_1s_ease-in-out]">

      {/* Heading */}
      <h2 className="text-cyan-400 text-4xl font-bold text-center mb-8 animate-bounce">
        Forgot Password
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-5">

        {/* Email Input */}
        <div className="animate-[fadeIn_0.8s_ease-in-out]">
          <RegistrationField
            icon={<EmailIcon />}
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            touched={formik.touched.email}
            error={formik.errors.email}
          />
        </div>

        {/* Submit Button */}
        <div className="animate-[fadeIn_1.1s_ease-in-out]">
          <RegistrationBUtton
            text={loading ? "Sending..." : "Send Reset Link"}
            type="submit"
            disabled={loading}
            icon={<SendIcon />}
          />
        </div>

        {/* Back to Login */}
        <div className="text-center pt-2 animate-[fadeIn_1.4s_ease-in-out]">
          <NavLink
            to="/"
            className="text-cyan-400 hover:underline hover:scale-105 inline-block duration-300"
          >
            Back to Login
          </NavLink>
        </div>

      </form>
    </div>
  </div>
);
}

export default ForgetPassword;