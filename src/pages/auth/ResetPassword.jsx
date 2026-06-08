// this is working code


// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, useNavigate, NavLink } from "react-router-dom";
// import Swal from "sweetalert2";
// import { resetPassword } from "../../features/auth/authThunk";

// import LockIcon from "@mui/icons-material/Lock";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import LockResetIcon from "@mui/icons-material/LockReset";

// function ResetPassword() {
//   const { token } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { loading } = useSelector((state) => state.auth);

//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       Swal.fire({
//         icon: "error",
//         title: "Error ❌",
//         text: "Passwords do not match",
//       });
//       return;
//     }

//     const result = await dispatch(
//       resetPassword({ val: { password }, token })
//     );

//     if (resetPassword.fulfilled.match(result)) {
//       Swal.fire({
//         icon: "success",
//         title: "Password Reset Successful ",
//         timer: 1500,
//         showConfirmButton: false,
//       });

//       setTimeout(() => {
//         navigate("/");
//       }, 1500);

//     } else {
//       Swal.fire({
//         icon: "error",
//         title: "Reset Failed ",
//         text: result.payload?.message || "Something went wrong",
//       });
//     }
//   };

//   const inputStyle =
//     "w-full border p-2 rounded-lg pl-10 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400";

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200">

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-5"
//       >
//         <h2 className="text-2xl font-bold text-center text-gray-700">
//           Reset Password
//         </h2>

//         {/* New Password */}
//         <div className="relative">
//           <LockIcon className="absolute top-3 left-2 text-gray-400" />
//           <input
//             type={showPassword ? "text" : "password"}
//             placeholder="Enter new password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className={inputStyle}
//             required
//           />
//         </div>

//         {/* Confirm Password */}
//         <div className="relative">
//           <LockIcon className="absolute top-3 left-2 text-gray-400" />
//           <input
//             type={showPassword ? "text" : "password"}
//             placeholder="Confirm password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className={inputStyle}
//             required
//           />

//           <div
//             className="absolute top-3 right-2 cursor-pointer"
//             onClick={() => setShowPassword(!showPassword)}
//           >
//             {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
//           </div>
//         </div>

//         {/* Button */}
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold"
//         >
//           <LockResetIcon />
//           {loading ? "Resetting..." : "Reset Password"}
//         </button>

//         {/* Back to Login */}
//         <div className="text-center text-sm">
//           <NavLink to="/login" className="text-blue-600 hover:underline">
//             Back to Login
//           </NavLink>
//         </div>

//       </form>
//     </div>
//   );
// }

// export default ResetPassword;





import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { resetPassword } from "../../features/auth/authThunk";
import { showLoader, hideLoader, showSuccess, showError } from "../../component/swalLoader";

import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockResetIcon from "@mui/icons-material/LockReset";

import InputField from "../../component/InputField";
import Button from "../../component/commonButton";
import { ResetPasswordSchema } from "../../validation/ValidationSchema";
import RegistrationField from "../../component/CommonRegistrationField";
import RegistrationBUtton from "../../component/CommonRegistrationButton";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = React.useState(false);

  // ✅ Formik setup
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        showLoader("Resetting Password...");

        const result = await dispatch(
          resetPassword({ val: { password: values.password }, token })
        );

        hideLoader();

        if (resetPassword.fulfilled.match(result)) {
          showSuccess("Password Reset Successful");

          resetForm();

          setTimeout(() => {
            navigate("/login");
          }, 1500);
        } else {
          showError(result.payload?.message || "Reset failed");
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

    {/* Reset Password Card */}
    <div className="relative z-10 w-[380px] p-8 rounded-3xl bg-[#0d1c30]/70 backdrop-blur-xl shadow-2xl animate-[fadeIn_1s_ease-in-out]">

      {/* Heading */}
      <h2 className="text-cyan-400 text-4xl font-bold text-center mb-8 animate-bounce">
        Reset Password
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-5">

        {/* New Password */}
        <div className="relative animate-[fadeIn_0.8s_ease-in-out]">
          <RegistrationField
            icon={<LockIcon />}
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter new password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            touched={formik.touched.password}
            error={formik.errors.password}
          />
        </div>

        {/* Confirm Password */}
        <div className="relative animate-[fadeIn_1s_ease-in-out]">
          <RegistrationField
            icon={<LockIcon />}
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            touched={formik.touched.confirmPassword}
            error={formik.errors.confirmPassword}
          />

          {/* Show / Hide */}
          <div
            className="absolute top-3 right-4 text-cyan-400 cursor-pointer hover:scale-110 duration-300"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </div>
        </div>

        {/* Reset Button */}
        <div className="animate-[fadeIn_1.3s_ease-in-out]">
          <RegistrationBUtton
            text={loading ? "Resetting..." : "Reset Password"}
            type="submit"
            disabled={loading}
            icon={<LockResetIcon />}
          />
        </div>

        {/* Back to Login */}
        <div className="text-center pt-2 animate-[fadeIn_1.5s_ease-in-out]">
          <NavLink
            to="/login"
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

export default ResetPassword;