// this is working code


// import { useFormik } from "formik";
// import React, { useState } from "react";
// import { loginSchema } from "../../validation/ValidationSchema";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../../features/auth/authThunk";
// import { NavLink, useNavigate } from "react-router-dom";
// import EmailIcon from "@mui/icons-material/Email";
// import LockIcon from "@mui/icons-material/Lock";
// import LoginIcon from "@mui/icons-material/Login";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import Swal from "sweetalert2";
// function Login() {
//   const { loading, error } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);

//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validationSchema: loginSchema,
//     onSubmit: async (values) => {
//   const result = await dispatch(loginUser(values));
// console.log(result,"my rsult");
//   if (loginUser.fulfilled.match(result)) {
//     const role = result.payload.data.role;

//     // ✅ Success Popup
//     Swal.fire({
//       title: "Login Successful",
//       text: "Welcome back!",
//       icon: "success",
//       timer: 1500,
//       showConfirmButton: false,
//     });

//     // Navigate after short delay
//     setTimeout(() => {
//       if (role === "admin") {
//         navigate("/listing-cutomer");
//       } else if (role === "technician") {
//         navigate("/listing-service");
//       } else if (role === "customer") {
//         navigate("/add-cutomer");
//       }
//     }, 1500);

//   }
//   else {
//   // ❌ Error Popup
//   Swal.fire({
//     title: "Login Failed ❌",
//     text: result.payload?.message || "Invalid credentials",
//     icon: "error",
//     confirmButtonText: "Try Again",
//   }).then(() => {
//     window.location.reload();
//   });
// }
// },
//   });

//   const inputStyle = (fieldName) =>
//     `w-full border p-2 rounded-lg pl-10 ${
//       formik.touched[fieldName] && formik.errors[fieldName]
//         ? "border-red-500"
//         : "border-gray-300"
//     }`;

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200">
//       <form
//         onSubmit={formik.handleSubmit}
//         className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-5"
//       >
//         <h2 className="text-2xl font-bold text-center text-gray-700">
//           Login Account
//         </h2>

//         {/* Email */}
//         <div className="relative">
//           <EmailIcon className="absolute top-3 left-2 text-gray-400" />
//           <input
//             type="email"
//             name="email"
//             placeholder="Enter your email"
//             value={formik.values.email}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             className={inputStyle("email")}
//           />
//           {formik.touched.email && formik.errors.email && (
//             <p className="text-red-500 text-sm">{formik.errors.email}</p>
//           )}
//         </div>

//         {/* Password */}
//         <div className="relative">
//           <LockIcon className="absolute top-3 left-2 text-gray-400" />
//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             placeholder="Enter your password"
//             value={formik.values.password}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             className={inputStyle("password")}
//           />

//           <div
//             className="absolute top-3 right-2 cursor-pointer"
//             onClick={() => setShowPassword(!showPassword)}
//           >
//             {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
//           </div>

//           {formik.touched.password && formik.errors.password && (
//             <p className="text-red-500 text-sm">{formik.errors.password}</p>
//           )}
//         </div>

//         {/* Button */}
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition duration-200"
//         >
//           <LoginIcon />
//           {loading ? "Logging..." : "Login"}
//         </button>

//         {/* Links */}
//         <div className="flex justify-between text-sm">
//           <NavLink
//             to="/register"
//             className="text-blue-600 hover:underline"
//           >
//             Register
//           </NavLink>

//           <NavLink
//             to="/forget-password"
//             className="text-red-500 hover:underline"
//           >
//             Forgot Password?
//           </NavLink>
//         </div>

//         {/* Error */}
//         {error && (
//           <p className="text-red-600 text-center mt-2">{error}</p>
//         )}
//       </form>
//     </div>
//   );
// }

// export default Login;








import { useFormik } from "formik";
import React, { useState } from "react";
import { loginSchema } from "../../validation/ValidationSchema";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authThunk";
import { NavLink, useNavigate } from "react-router-dom";

import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import LoginIcon from "@mui/icons-material/Login";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// import Swal from "sweetalert2";
import {
  showLoader,
  hideLoader,
  showSuccess,
  showError,
} from "../../component/swalLoader";
// import InputField from "../../component/InputField";
// import Button from "../../component/commonButton";
import RegistrationField from "../../component/CommonRegistrationField";
import RegistrationBUtton from "../../component/CommonRegistrationButton";

function Login() {
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,

    onSubmit: async (values) => {
  try {
    showLoader("Logging in...");

    const result = await dispatch(loginUser(values));

    hideLoader();

    if (loginUser.fulfilled.match(result)) {
      const role = result.payload.data.role;

      showSuccess("Login Successful");

      setTimeout(() => {
        if (role === "admin") navigate("/listing-cutomer");
        else if (role === "technician") navigate("/listing-service");
        else if (role === "customer") navigate("/add-cutomer");
      }, 1500);
    } else {
      showError(result.payload?.message || "Invalid credentials");
    }
  } catch (err) {
    hideLoader();
    showError("Something went wrong");
  }
},
  });

  return (
  <div className="min-h-screen bg-[#081426] flex items-center justify-center overflow-hidden relative">

    {/* Animated Background Glow */}
    <div className="absolute w-[700px] h-[700px] rounded-full bg-cyan-500/10 blur-3xl animate-pulse"></div>

    {/* Rotating Ring */}
    <div className="absolute w-[500px] h-[500px] rounded-full border-[18px] border-cyan-500/10 animate-[spin_8s_linear_infinite]"></div>

    {/* Second Ring Reverse */}
    <div className="absolute w-[430px] h-[430px] rounded-full border-[10px] border-cyan-400/10 animate-[spin_6s_linear_infinite_reverse]"></div>

    {/* Login Card */}
    <div className="relative z-10 w-[380px] p-8 rounded-3xl bg-[#0d1c30]/70 backdrop-blur-xl shadow-2xl animate-[fadeIn_1s_ease-in-out]">

      {/* Heading */}
      <h2 className="text-cyan-400 text-4xl font-bold text-center mb-8 animate-bounce">
        Login
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-5">

        {/* Email */}
        <div className="animate-[fadeIn_0.8s_ease-in-out]">
          <RegistrationField
            icon={<EmailIcon />}
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Email"
            touched={formik.touched.email}
            error={formik.errors.email}
          />
        </div>

        {/* Password */}
        <div className="relative animate-[fadeIn_1s_ease-in-out]">
          <RegistrationField
            icon={<LockIcon />}
            type={showPassword ? "text" : "password"}
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Password"
            touched={formik.touched.password}
            error={formik.errors.password}
          />

          <div
            className="absolute top-3 right-4 text-cyan-400 cursor-pointer hover:scale-110 duration-300"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </div>
        </div>

        {/* Forgot Password */}
        <div className="text-center text-sm animate-[fadeIn_1.2s_ease-in-out]">
          <NavLink
            to="/forget-password"
            className="text-gray-300 hover:text-cyan-400 transition-all duration-300"
          >
            Forgot your password?
          </NavLink>
        </div>

        {/* Button */}
        <div className="animate-[fadeIn_1.4s_ease-in-out]">
          <RegistrationBUtton
            text={loading ? "Logging..." : "Login"}
            type="submit"
            disabled={loading}
            icon={<LoginIcon />}
          />
        </div>

        {/* Signup */}
        <div className="text-center pt-2 animate-[fadeIn_1.6s_ease-in-out]">
          <NavLink
            to="/register"
            className="text-cyan-400 hover:underline hover:scale-105 inline-block duration-300"
          >
            Signup
          </NavLink>
        </div>

      </form>
    </div>
  </div>
);
}

export default Login;