// // import { useFormik } from "formik";
// // import React, { useState } from "react";
// // import { registerSchema } from "../../validation/ValidationSchema";

// // function Register() {
// //   const [preview, setPreview] = useState(null);

// //   const formik = useFormik({
// //     initialValues: {
// //       name: "",
// //       email: "",
// //       password: "",
// //       role: "",
// //       profileImage: null,
// //       documents: null,
// //     },
// //     validationSchema: registerSchema,
// //     onSubmit: (values) => {
// //       console.log(values,"my values");
// //       alert("Data submitted successfully");
// //     },
// //   });

// //   const fields = [
// //     { name: "name", placeholder: "Enter your name", type: "text" },
// //     { name: "email", placeholder: "Enter your email", type: "email" },
// //     { name: "password", placeholder: "Enter your password", type: "password" },
// //     { name: "role", placeholder: "Select role", type: "select" },
// //     { name: "profileImage", type: "image" },
// //     { name: "documents", type: "document" },
// //   ];

// //   const inputStyle = (fieldName) =>
// //     `w-full border p-2 rounded outline-none transition ${
// //       formik.touched[fieldName] && formik.errors[fieldName]
// //         ? "border-red-500"
// //         : "border-gray-300"
// //     }`;

// //   return (
// //     <div className="max-w-lg mx-auto mt-10 bg-white shadow-xl p-6 rounded-xl">
// //       <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

// //       <form onSubmit={formik.handleSubmit} className="space-y-4">
// //         {fields.map((val) => {

// //           // SELECT FIELD
// //           if (val.type === "select") {
// //             return (
// //               <div key={val.name}>
// //                 <select
// //                   name={val.name}
// //                   value={formik.values[val.name]}
// //                   onChange={formik.handleChange}
// //                   onBlur={formik.handleBlur}
// //                   className={inputStyle(val.name)}
// //                 >
// //                   <option value="">Select Role</option>
// //                   <option value="customer">Customer</option>
// //                   <option value="technician">Technician</option>
// //                   <option value="admin">Admin</option>
// //                 </select>

// //                 {formik.touched[val.name] && formik.errors[val.name] && (
// //                   <p className="text-red-500 text-sm mt-1">
// //                     {formik.errors[val.name]}
// //                   </p>
// //                 )}
// //               </div>
// //             );
// //           }

// //           // IMAGE UPLOAD
// //           if (val.type === "image") {
// //             return (
// //               <div key={val.name}>
// //                 <input
// //                   type="file"
// //                   accept="image/*"
// //                   onChange={(event) => {
// //                     const file = event.currentTarget.files[0];
// //                     formik.setFieldValue(val.name, file);
// //                     if (file) {
// //                       setPreview(URL.createObjectURL(file));
// //                     }
// //                   }}
// //                   onBlur={formik.handleBlur}
// //                   className={inputStyle(val.name)}
// //                 />

// //                 {preview && (
// //                   <img
// //                     src={preview}
// //                     alt="Preview"
// //                     className="mt-2 h-20 rounded shadow"
// //                   />
// //                 )}

// //                 {formik.touched[val.name] && formik.errors[val.name] && (
// //                   <p className="text-red-500 text-sm mt-1">
// //                     {formik.errors[val.name]}
// //                   </p>
// //                 )}
// //               </div>
// //             );
// //           }

// //           // DOCUMENT UPLOAD
// //           if (val.type === "document") {
// //             return (
// //               <div key={val.name}>
// //                 <input
// //                   type="file"
// //                   accept=".pdf,.doc,.docx"
// //                   onChange={(event) =>
// //                     formik.setFieldValue(
// //                       val.name,
// //                       event.currentTarget.files[0]
// //                     )
// //                   }
// //                   onBlur={formik.handleBlur}
// //                   className={inputStyle(val.name)}
// //                 />

// //                 {formik.touched[val.name] && formik.errors[val.name] && (
// //                   <p className="text-red-500 text-sm mt-1">
// //                     {formik.errors[val.name]}
// //                   </p>
// //                 )}
// //               </div>
// //             );
// //           }

// //           // NORMAL INPUT
// //           return (
// //             <div key={val.name}>
// //               <input
// //                 name={val.name}
// //                 type={val.type}
// //                 placeholder={val.placeholder}
// //                 value={formik.values[val.name]}
// //                 onChange={formik.handleChange}
// //                 onBlur={formik.handleBlur}
// //                 className={inputStyle(val.name)}
// //               />

// //               {formik.touched[val.name] && formik.errors[val.name] && (
// //                 <p className="text-red-500 text-sm mt-1">
// //                   {formik.errors[val.name]}
// //                 </p>
// //               )}
// //             </div>
// //           );
// //         })}

// //         <button
// //           type="submit"
// //           className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
// //         >
// //           Submit
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }

// // export default Register;




// // here register api is includes



// // import { useFormik } from "formik";
// // import React, { useState } from "react";
// // import { registerSchema } from "../../validation/ValidationSchema";
// // import { useDispatch, useSelector } from "react-redux";
// // import { registerUser } from "../../features/auth/authThunk";

// // function Register() {
// //   const [preview, setPreview] = useState(null);

// //   const dispatch = useDispatch();
// //   const { loading, error } = useSelector((state) => state.auth);
// // // const state = useSelector((state) => state);

// // // console.log(state.auth?.user?.data?.name, "my state");

// //   const formik = useFormik({
// //     initialValues: {
// //       name: "",
// //       email: "",
// //       password: "",
// //       // role: "",
// //       profileImage: null,
// //       documents: null,
// //     },
// //     validationSchema: registerSchema,
// //     onSubmit: async (values, { resetForm }) => {
// //       const formData = new FormData();//agr hum backend me directly img,pdf,document etc bhejenge to o json ke form me nhi jayega
// //       // issi liye hum log FormData ka use karte hai...

// //       formData.append("name", values.name);
// //       formData.append("email", values.email);
// //       formData.append("password", values.password);
// //       // formData.append("role", values.role);
// //       formData.append("profileImage", values.profileImage);
// //       formData.append("documents", values.documents);

// //       try {
// //         await dispatch(registerUser(formData)).unwrap();
// //         alert("Registration Successful ✅");
// //         resetForm();
// //         setPreview(null);
// //       } catch (err) {
// //         console.log("Error:", err);
// //       }
// //     },
// //   });

// //   const fields = [
// //     { name: "name", placeholder: "Enter your name", type: "text" },
// //     { name: "email", placeholder: "Enter your email", type: "email" },
// //     { name: "password", placeholder: "Enter your password", type: "password" },
// //     // { name: "role", type: "select" },
// //     { name: "profileImage", type: "image" },
// //     { name: "documents", type: "document" },
// //   ];

// //   const inputStyle = (fieldName) =>
// //     `w-full border p-2 rounded ${
// //       formik.touched[fieldName] && formik.errors[fieldName]
// //         ? "border-red-500"
// //         : "border-gray-300"
// //     }`;

// //   return (
// //     <div className="max-w-lg mx-auto mt-10 bg-white shadow-xl p-6 rounded-xl">
// //       <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

// //       <form onSubmit={formik.handleSubmit} className="space-y-4">

// //         {fields.map((val) => {

// //           // if (val.type === "select") {
// //           //   return (
// //           //     <div key={val.name}>
// //           //       <select
// //           //         name={val.name}
// //           //         value={formik.values[val.name]}
// //           //         onChange={formik.handleChange}
// //           //         onBlur={formik.handleBlur}
// //           //         className={inputStyle(val.name)}
// //           //       >
// //           //         <option value="">Select Role</option>
// //           //         <option value="customer">Customer</option>
// //           //         <option value="technician">Technician</option>
// //           //         <option value="admin">Admin</option>
// //           //       </select>
// //           //       {formik.touched[val.name] && formik.errors[val.name] && (
// //           //         <p className="text-red-500 text-sm">
// //           //           {formik.errors[val.name]}
// //           //         </p>
// //           //       )}
// //           //     </div>
// //           //   );
// //           // }

// //           if (val.type === "image") {
// //             return (
// //               <div key={val.name}>
// //                 <input
// //                   type="file"
// //                   accept="image/*"
// //                   onChange={(e) => {
// //                     const file = e.currentTarget.files[0];
// //                     formik.setFieldValue(val.name, file);
// //                     if (file) {
// //                       setPreview(URL.createObjectURL(file));
// //                     }
// //                   }}
// //                   className={inputStyle(val.name)}
// //                 />
// //                 {preview && (
// //                   <img
// //                     src={preview}
// //                     alt="preview"
// //                     className="mt-2 h-20"
// //                   />
// //                 )}
// //               </div>
// //             );
// //           }

// //           if (val.type === "document") {
// //             return (
// //               <div key={val.name}>
// //                 <input
// //                   type="file"
// //                   accept=".pdf,.doc,.docx"
// //                   onChange={(e) =>
// //                     formik.setFieldValue(val.name, e.currentTarget.files[0])
// //                   }
// //                   className={inputStyle(val.name)}
// //                 />
// //               </div>
// //             );
// //           }

// //           return (
// //             <div key={val.name}>
// //               <input
// //                 name={val.name}
// //                 type={val.type}
// //                 placeholder={val.placeholder}
// //                 value={formik.values[val.name]}
// //                 onChange={formik.handleChange}
// //                 onBlur={formik.handleBlur}
// //                 className={inputStyle(val.name)}
// //               />
// //               {formik.touched[val.name] && formik.errors[val.name] && (
// //                 <p className="text-red-500 text-sm">
// //                   {formik.errors[val.name]}
// //                 </p>
// //               )}
// //             </div>
// //           );
// //         })}

// //         <button
// //           type="submit"
// //           disabled={loading}
// //           className="w-full bg-indigo-600 text-white py-2 rounded disabled:bg-gray-400"
// //         >
// //           {loading ? "Submitting..." : "Submit"}
// //         </button>

// //         {error && (
// //           <p className="text-red-600 text-center mt-2">
// //             {error}
// //           </p>
// //         )}
// //       </form>
// //     </div>
// //   );
// // }

// // export default Register;




// import { useFormik } from "formik";
// import React, { useState } from "react";
// import { registerSchema } from "../../validation/ValidationSchema";
// import { useDispatch, useSelector } from "react-redux";
// import { registerUser } from "../../features/auth/authThunk";
// import Swal from "sweetalert2";
// import { useNavigate, NavLink } from "react-router-dom";

// import EmailIcon from "@mui/icons-material/Email";
// import LockIcon from "@mui/icons-material/Lock";
// import PersonIcon from "@mui/icons-material/Person";
// import LoginIcon from "@mui/icons-material/Login";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// function Register() {
//   const [preview, setPreview] = useState(null);
//   const [showPassword, setShowPassword] = useState(false);

//   const dispatch = useDispatch();
//   const { loading } = useSelector((state) => state.auth);
//   const navigate = useNavigate();

//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       password: "",
//       // profileImage: null,
//       // documents: null,
//     },
//     validationSchema: registerSchema,
//     onSubmit: async (values, { resetForm }) => {
//       const formData = new FormData();

//       formData.append("name", values.name);
//       formData.append("email", values.email);
//       formData.append("password", values.password);
//       // formData.append("profileImage", values.profileImage);
//       // formData.append("documents", values.documents);

//       try {
//         await dispatch(registerUser(formData)).unwrap();

//         Swal.fire({
//           icon: "success",
//           title: "Registration Successful ",
//           text: "Account created successfully!",
//           timer: 1500,
//           showConfirmButton: false,
//         });

//         resetForm();
//         setPreview(null);

//         setTimeout(() => {
//           navigate("/login");
//         }, 1500);

//       } catch (err) {
//         Swal.fire({
//           icon: "error",
//           title: "Registration Failed ",
//           text: err?.message || "Something went wrong!",
//         });
//       }
//     },
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
//           Create Account
//         </h2>

//         {/* Name */}
//         <div className="relative">
//           <PersonIcon className="absolute top-3 left-2 text-gray-400" />
//           <input
//             type="text"
//             name="name"
//             placeholder="Enter your name"
//             value={formik.values.name}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             className={inputStyle("name")}
//           />
//         </div>

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
//         </div>

//         {/* Profile Image */}
//         {/* <div>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => {
//               const file = e.currentTarget.files[0];
//               formik.setFieldValue("profileImage", file);
//               if (file) setPreview(URL.createObjectURL(file));
//             }}
//             className={inputStyle("profileImage")}
//           />

//           {preview && (
//             <img
//               src={preview}
//               alt="preview"
//               className="mt-2 h-20 w-20 rounded-full object-cover mx-auto"
//             />
//           )}
//         </div> */}

//         {/* Documents */}
//         {/* <div>
//           <input
//             type="file"
//             accept=".pdf,.doc,.docx"
//             onChange={(e) =>
//               formik.setFieldValue("documents", e.currentTarget.files[0])
//             }
//             className={inputStyle("documents")}
//           />
//         </div> */}

//         {/* Button */}
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold"
//         >
//           <LoginIcon />
//           {loading ? "Registering..." : "Register"}
//         </button>

//         {/* Links */}
//         <div className="text-center text-sm">
//           <span>Already have an account? </span>
//           <NavLink to="/" className="text-blue-600 hover:underline">
//             Login
//           </NavLink>
//         </div>

//       </form>
//     </div>
//   );
// }

// export default Register;






import { useFormik } from "formik";
import React, { useState } from "react";
import { registerSchema } from "../../validation/ValidationSchema";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/auth/authThunk";
import { useNavigate, NavLink } from "react-router-dom";

import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import InputField from "../../component/InputField";
import Button from "../../component/commonButton";

// ✅ Swal utils
import {
  showLoader,
  hideLoader,
  showSuccess,
  showError,
} from "../../component/swalLoader";
import RegistrationField from "../../component/CommonRegistrationField";
import RegistrationBUtton from "../../component/CommonRegistrationButton";

function Register() {
  const [preview, setPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",

    },
    validationSchema: registerSchema,

    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        if (values[key]) {
          formData.append(key, values[key]);
        }
      });

      try {
        // ✅ Loader start
        showLoader("Creating Account...");

        await dispatch(registerUser(formData)).unwrap();

        // ✅ Loader stop
        hideLoader();

        // ✅ Success
        showSuccess("Registration Successful");

        resetForm();
        setPreview(null);

        setTimeout(() => navigate("/login"), 1500);

      } catch (err) {
        // ✅ Loader stop
        hideLoader();

        // ✅ Error
        showError(err?.message || "Something went wrong!");
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

    {/* Signup Card */}
    <div className="relative z-10 w-[380px] p-8 rounded-3xl bg-[#0d1c30]/70 backdrop-blur-xl shadow-2xl animate-[fadeIn_1s_ease-in-out]">

      {/* Heading */}
      <h2 className="text-cyan-400 text-4xl font-bold text-center mb-8 animate-bounce">
        Signup
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-5">

        {/* Name */}
        <div className="animate-[fadeIn_0.7s_ease-in-out]">
          <RegistrationField
            icon={<PersonIcon />}
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Full Name"
            touched={formik.touched.name}
            error={formik.errors.name}
          />
        </div>

        {/* Email */}
        <div className="animate-[fadeIn_0.9s_ease-in-out]">
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
        <div className="relative animate-[fadeIn_1.1s_ease-in-out]">
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

        {/* Register Button */}
        <div className="animate-[fadeIn_1.3s_ease-in-out]">
          <RegistrationBUtton
            text={loading ? "Registering..." : "Register"}
            type="submit"
            disabled={loading}
            icon={<LoginIcon />}
          />
        </div>

        {/* Login Link */}
        <div className="text-center pt-2 animate-[fadeIn_1.5s_ease-in-out]">
          <NavLink
            to="/login"
            className="text-cyan-400 hover:underline hover:scale-105 inline-block duration-300"
          >
            Already have account?
          </NavLink>
        </div>

      </form>
    </div>
  </div>
);
}

export default Register;