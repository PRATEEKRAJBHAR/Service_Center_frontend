// this is my working code

// import React, { useState } from "react";
// import { useFormik } from "formik";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addServiceLogreport } from "../../features/service/serviceThunk";

// function ReportServiceLog() {
//   const [fileName, setFileName] = useState(null);
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading } = useSelector((state) => state.service);

//   const formik = useFormik({
//     initialValues: {
//       reports: null,
//     },
//     onSubmit: async (values) => {
//       if (!values.reports) {
//         alert("Please select a document first");
//         return;
//       }

//       const formData = new FormData();
//       formData.append("file", values.reports);

//       await dispatch(addServiceLogreport({ id, data: formData }));

//       alert("Document added successfully");
//       navigate(-1);

//       formik.resetForm();
//       setFileName(null);
//     },
//   });

//   const handleFileChange = (event) => {
//     const file = event.currentTarget.files[0];

//     if (file) {
//       formik.setFieldValue("reports", file);
//       setFileName(file.name); // show file name only
//     }
//   };

//   const handleRemove = () => {
//     formik.setFieldValue("reports", null);
//     setFileName(null);
//   };

//   return (
//     <div className="p-6 bg-white shadow-md rounded-lg max-w-md w-full">
//       <h2 className="text-xl font-semibold mb-4">
//         Upload Service Report
//       </h2>

//       <form onSubmit={formik.handleSubmit}>

//         {/* File Input */}
//         <input
//           type="file"
//           name="reports"
//           accept=".pdf,.doc,.docx"
//           onChange={handleFileChange}
//           className="mb-4"
//         />

//         {/* File Name Preview */}
//         {fileName && (
//           <div className="mb-4 p-3 border rounded bg-gray-50">
//             <p className="text-sm text-gray-700">
//               Selected File: <strong>{fileName}</strong>
//             </p>

//             <button
//               type="button"
//               onClick={handleRemove}
//               className="mt-2 text-red-500 text-sm"
//             >
//               Remove File
//             </button>
//           </div>
//         )}

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
//         >
//           {loading ? "Uploading..." : "Upload Document"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default ReportServiceLog;






import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addServiceLogreport } from "../../features/service/serviceThunk";
import {showLoader, hideLoader, showSuccess, showError } from "../../component/swalLoader";

import FileUpload from "../../component/FileUpload";
import Button from "../../component/commonButton";

function ReportServiceLog() {
  const [preview, setPreview] = useState(null); // not used but required for consistency

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.service);

  const formik = useFormik({
  initialValues: {
    reports: null,
  },

  onSubmit: async (values) => {
    if (!values.reports) {
      showError("Please select a document first");
      return;
    }

    const formData = new FormData();
    formData.append("file", values.reports);

    try {
      // ✅ Show loader popup
      showLoader("Uploading Document...");

      // ✅ Wait for API
      await dispatch(addServiceLogreport({ id, data: formData })).unwrap();

      // ✅ Hide loader
      hideLoader();

      // ✅ Success popup
      showSuccess("Document added successfully");

      formik.resetForm();
      setPreview(null);

      // optional delay for better UX
      setTimeout(() => navigate(-1), 1500);

    } catch (err) {
      // ❌ Hide loader
      hideLoader();

      // ❌ Error popup
      showError(err?.message || "Upload failed");
    }
  },
});

  return (
    <div className="min-h-screen flex items-center justify-center">
  <div className="p-6 bg-white shadow-md rounded-lg w-1/2 border">

      <h2 className="text-xl font-semibold mb-4">
        Upload Service Report
      </h2>

      <form onSubmit={formik.handleSubmit}>

        {/* ✅ Reusable File Upload */}
        <FileUpload
          label="Upload Document"
          name="reports"
          accept=".pdf,.doc,.docx"
          file={formik.values.reports}
          preview={preview}         // ❌ no image preview
          setPreview={setPreview}
          setFieldValue={formik.setFieldValue}
          showPreview={false}       // 🔥 IMPORTANT
        />

        {/* ✅ Reusable Button */}
        <div className="mt-4">
          <Button
            text={loading ? "Uploading..." : "Upload Document"}
            type="submit"
            disabled={loading}
          />
        </div>

      </form>

  </div>
</div>
  );
}

export default ReportServiceLog;