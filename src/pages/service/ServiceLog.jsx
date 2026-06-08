// working code


// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { addServiceLog, ListingSingleService } from "../../features/service/serviceThunk";
// import { useNavigate, useParams } from "react-router-dom";

// function ServiceLog() {
// const navigate=useNavigate();
//     const dispatch = useDispatch();
//     const { id } = useParams(); // service id
//     console.log(id,"ids");
//     useEffect(() => {
//         dispatch(addServiceLog(id))
//     }, [dispatch,id])
//     const formik = useFormik({
//         initialValues: {
//             message: "",
//         },

//         validationSchema: Yup.object({
//             message: Yup.string()
//                 .required("Log message is required")
//                 .min(3, "Minimum 3 characters required"),
//         }),

//         onSubmit: (values, { resetForm }) => {
//             dispatch(
//                 addServiceLog({
//                     id,
//                     data: values,
//                 })
//             )
//                 .unwrap()
//                 .then(() => {
//                     resetForm();
//                     navigate(-1)
//                 })
//                 .catch((err) => console.log(err));
//         },
//     });

//     return (
//         <div className="bg-white shadow-md rounded-xl p-6">
//             <h3 className="text-lg font-semibold mb-4 text-gray-700">
//                 Add Service Log
//             </h3>

//             <form onSubmit={formik.handleSubmit} className="space-y-4">
//                 <div>
//                     <textarea
//                         name="message"
//                         placeholder="Enter service log..."
//                         className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         value={formik.values.message}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         rows="3"
//                     />

//                     {formik.touched.message && formik.errors.message && (
//                         <p className="text-red-500 text-sm mt-1">
//                             {formik.errors.message}
//                         </p>
//                     )}
//                 </div>

//                 <button
//                     type="submit"
//                     className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//                 >
//                     Add Log
//                 </button>
//             </form>
//         </div>
//     );
// }

// export default ServiceLog;







import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addServiceLog } from "../../features/service/serviceThunk";
import { useNavigate, useParams } from "react-router-dom";
import {showLoader, hideLoader, showSuccess, showError } from "../../component/swalLoader";

import InputField from "../../component/InputField";
import Button from "../../component/commonButton";

function ServiceLog() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      message: "",
    },

    validationSchema: Yup.object({
      message: Yup.string()
        .required("Log message is required")
        .min(3, "Minimum 3 characters required"),
    }),

    onSubmit: (values, { resetForm }) => {
  // ✅ Show loader
  showLoader("Adding Log...");

  dispatch(
    addServiceLog({
      id,
      data: values,
    })
  )
    .unwrap()
    .then(() => {
      // ✅ Hide loader
      hideLoader();

      // ✅ Success
      showSuccess("Log added successfully");

      resetForm();

      // optional delay for better UX
      setTimeout(() => navigate(-1), 1500);
    })
    .catch((err) => {
      // ❌ Hide loader
      hideLoader();

      // ❌ Error
      showError(err?.message || "Failed to add log");
    });
},
  });

  return (
    <div className="bg-white shadow-md rounded-xl p-6">

      <h3 className="text-lg font-semibold mb-4 text-gray-700">
        Add Service Log
      </h3>

      <form onSubmit={formik.handleSubmit} className="space-y-4">

        {/* ✅ Reusable Textarea */}
        <InputField
          name="message"
          value={formik.values.message}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter service log..."
          isTextarea={true}
          rows={3}
          touched={formik.touched.message}
          error={formik.errors.message}
        />

        {/* ✅ Reusable Button */}
        <Button text="Add Log" type="submit" />

      </form>
    </div>
  );
}

export default ServiceLog;