// import { useFormik } from "formik";
// import React, { useEffect } from "react";
// import { serviceSchema } from "../../validation/ValidationSchema";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   CreateService,
//   EditService,
//   ListingService,
// } from "../../features/service/serviceThunk";
// import { clearServiceState } from "../../features/service/serviceSlice";
// import Swal from "sweetalert2";
// import { ViewCustomer } from "../../features/customer/customerThunk";
// import { useParams, useNavigate } from "react-router-dom";

// function AddService() {
//   const { loading, error, services } = useSelector(
//     (state) => state.service
//   );

//   const { customers } = useSelector((state) => state.customer);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { id } = useParams();
//   const isEdit = Boolean(id);

//   const ServiceList = Array.isArray(services)
//     ? services
//     : services?.data || [];

//   // 🔹 Load customers
//   useEffect(() => {
//     dispatch(ViewCustomer());
//   }, [dispatch]);

//   // 🔹 If edit mode → fetch service list
//   useEffect(() => {
//     if (isEdit && ServiceList.length === 0) {
//       dispatch(ListingService());
//     }
//   }, [isEdit, ServiceList.length, dispatch]);

//   const formik = useFormik({
//     initialValues: {
//       customerId: "",
//       problemDescription: "",
//       serviceCharge: "",
//       status: "",
//     },
//     validationSchema: serviceSchema,
//     onSubmit: async (values, actions) => {
//       let result;

//       if (isEdit) {
//         result = await dispatch(EditService({ id, data: values }));
//       } else {
//         result = await dispatch(CreateService(values));
//       }

//       // ✅ FIXED SUCCESS CHECK
//       if (
//         CreateService.fulfilled.match(result) ||
//         EditService.fulfilled.match(result)
//       ) {
//         Swal.fire({
//           icon: "success",
//           title: isEdit
//             ? "Service Updated Successfully"
//             : "Service Created Successfully",
//           confirmButtonColor: "#4f46e5",
//         });

//         actions.resetForm();
//         navigate("/listing-service");
//       }
//     },
//   });

//   // 🔥 AUTOFILL LOGIC FIXED
//   useEffect(() => {
//     if (isEdit && ServiceList.length > 0) {
//       const service = ServiceList.find((c) => c._id === id);

//       if (service) {
//         formik.setValues({
//           problemDescription: service.problemDescription || "",
//           serviceCharge: service.serviceCharge || "",
//           status: service.status || "",
//           // ✅ FIX HERE
//           customerId: service.customerId?._id || "",
//         });
//       }
//     }
//   }, [isEdit, id, ServiceList]);

//   // clear state on unmount
//   useEffect(() => {
//     return () => {
//       dispatch(clearServiceState());
//     };
//   }, [dispatch]);

//   const inputStyle =
//     "w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition";

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center px-4">
//       <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8">

//         <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">
//           {isEdit ? "Edit Service" : "Add New Service"}
//         </h2>

//         <form onSubmit={formik.handleSubmit} className="space-y-6">

//           {/* Problem */}
//           <div>
//             <label>Problem Description</label>
//             <input
//               type="text"
//               name="problemDescription"
//               value={formik.values.problemDescription}
//               onChange={formik.handleChange}
//               className={inputStyle}
//             />
//           </div>

//           {/* Charge */}
//           <div>
//             <label>Service Charge</label>
//             <input
//               type="number"
//               name="serviceCharge"
//               value={formik.values.serviceCharge}
//               onChange={formik.handleChange}
//               className={inputStyle}
//             />
//           </div>

//           {/* Status */}
//           <div>
//             <label>Status</label>
//             <select
//               name="status"
//               value={formik.values.status}
//               onChange={formik.handleChange}
//               className={inputStyle}
//             >
//               <option value="">Select Status</option>
//               <option value="Pending">Pending</option>
//               <option value="In Progress">In Progress</option>
//               <option value="Completed">Completed</option>
//             </select>
//           </div>

//           {/* Customer */}
//           <div>
//             <label>Select Customer</label>
//             <select
//               name="customerId"
//               value={formik.values.customerId}
//               onChange={formik.handleChange}
//               className={inputStyle}
//             >
//               <option value="">Select Customer</option>

//               {customers?.map((customer) => (
//                 <option key={customer._id} value={customer._id}>
//                   {customer.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {error && (
//             <div className="bg-red-100 text-red-600 p-3 rounded-lg text-sm">
//               {error.message || "Something went wrong"}
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-indigo-600 text-white py-2 rounded"
//           >
//             {loading
//               ? isEdit
//                 ? "Updating..."
//                 : "Submitting..."
//               : isEdit
//               ? "Update"
//               : "Submit"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AddService;





// here impliment adding imgs and pdfs
// this is working code

// import { useFormik } from "formik";
// import React, { useEffect, useState } from "react";
// import { serviceSchema } from "../../validation/ValidationSchema";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   CreateService,
//   EditService,
//   ListingService,
// } from "../../features/service/serviceThunk";
// import { clearServiceState } from "../../features/service/serviceSlice";
// import Swal from "sweetalert2";
// import { ViewCustomer } from "../../features/customer/customerThunk";
// import { useParams, useNavigate } from "react-router-dom";
// import { getCustomer } from "../../features/auth/authThunk";

// function AddService() {
//   const { loading, error, services } = useSelector(
//     (state) => state.service
//   );
//   const { customers } = useSelector((state) => state.auth);
//   console.log(customers,"customerssssss");

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const isEdit = Boolean(id);

//   const [previewImages, setPreviewImages] = useState([]);

//   const ServiceList = Array.isArray(services)
//     ? services
//     : services?.data || [];

//   useEffect(() => {
//     dispatch(getCustomer());
//   }, [dispatch]);

//   useEffect(() => {
//     if (isEdit && ServiceList.length === 0) {
//       dispatch(ListingService());
//     }
//   }, [isEdit, ServiceList.length, dispatch]);

//   const formik = useFormik({
//     initialValues: {
//       customerId: "",
//       problemDescription: "",
//       serviceCharge: "",
//       status: "",
//       images: [],
//       reports: [],
//     },
//     validationSchema: serviceSchema,
//     onSubmit: async (values, actions) => {
//   console.log("FORM SUBMIT WORKING", values);
//       const formData = new FormData();

//       formData.append("customerId", values.customerId);
//       formData.append("problemDescription", values.problemDescription);
//       formData.append("serviceCharge", values.serviceCharge);
//       formData.append("status", values.status);

//       // ✅ multiple images
//       values.images.forEach((file) => {
//         formData.append("images", file);
//       });

//       // ✅ multiple pdf
//       values.reports.forEach((file) => {
//         formData.append("reports", file);
//       });

//       let result;

//       if (isEdit) {
//         result = await dispatch(EditService({ id, data: formData }));
//       } else {
//         result = await dispatch(CreateService(formData));
//       }

//       if (
//         CreateService.fulfilled.match(result) ||
//         EditService.fulfilled.match(result)
//       ) {
//         Swal.fire({
//           icon: "success",
//           title: isEdit
//             ? "Service Updated Successfully"
//             : "Service Created Successfully",
//         });

//         actions.resetForm();
//         navigate("/listing-service");
//       }
//     },
//   });

//   useEffect(() => {
//     if (isEdit && ServiceList.length > 0) {
//       const service = ServiceList.find((c) => c._id === id);

//       if (service) {
//         formik.setValues({
//           problemDescription: service.problemDescription || "",
//           serviceCharge: service.serviceCharge || "",
//           status: service.status || "",
//           customerId: service.customerId?._id || "",
//           images: [],
//           reports: [],
//         });
//       }
//     }
//   }, [isEdit, id, ServiceList]);

//   useEffect(() => {
//     return () => {
//       dispatch(clearServiceState());
//     };
//   }, [dispatch]);

//   const inputStyle =
//     "w-full border border-gray-300 p-3 rounded-lg";

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100">
//       <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
//         <h2 className="text-2xl font-bold mb-6 text-center">
//           {isEdit ? "Edit Service" : "Add Service"}
//         </h2>

//         <form onSubmit={formik.handleSubmit} className="space-y-4">

//           {/* Problem */}
//           <input
//             type="text"
//             name="problemDescription"
//             placeholder="Problem Description"
//             value={formik.values.problemDescription}
//             onChange={formik.handleChange}
//             className={inputStyle}
//           />

//           {/* Charge */}
//           <input
//             type="number"
//             name="serviceCharge"
//             placeholder="Service Charge"
//             value={formik.values.serviceCharge}
//             onChange={formik.handleChange}
//             className={inputStyle}
//           />

//           {/* Status */}
//           <select
//             name="status"
//             value={formik.values.status}
//             onChange={formik.handleChange}
//             className={inputStyle}
//           >
//             <option value="">Select Status</option>
//             <option value="Pending">Pending</option>
//             <option value="In Progress">In Progress</option>
//             <option value="Completed">Completed</option>
//           </select>

//           {/* Customer */}
//           <select
//             name="customerId"
//             value={formik.values.customerId}
//             onChange={formik.handleChange}
//             className={inputStyle}
//           >
//             <option value="">Select Customer</option>
//             {customers?.map((customer) => (
//               <option key={customer._id} value={customer._id}>
//                 {customer.name}
//               </option>
//             ))}
//           </select>

//           {/* Multiple Images */}
//           <div>
//             <label>Upload Images</label>
//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               onChange={(e) => {
//                 const files = Array.from(e.target.files);
//                 formik.setFieldValue("images", files);
//                 setPreviewImages(files.map(file => URL.createObjectURL(file)));
//               }}
//               className={inputStyle}
//             />

//             <div className="flex gap-2 mt-2">
//               {previewImages.map((src, index) => (
//                 <img
//                   key={index}
//                   src={src}
//                   alt="preview"
//                   className="h-16 w-16 object-cover rounded"
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Multiple PDF */}
//           <div>
//             <label>Upload Reports (PDF)</label>
//             <input
//               type="file"
//               multiple
//               accept=".pdf"
//               onChange={(e) => {
//                 const files = Array.from(e.target.files);
//                 formik.setFieldValue("reports", files);
//               }}
//               className={inputStyle}
//             />
//           </div>

//           {error && (
//             <div className="text-red-500 text-sm">
//               {error.message || "Something went wrong"}
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-indigo-600 text-white py-2 rounded"
//               // onClick={() => console.log("Clicked")}


//           >
//             {/* {console.log("ERRORS 👉", formik.errors)} */}
//             {loading ? "Processing..." : isEdit ? "Update" : "Submit"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AddService;





import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { serviceSchema } from "../../validation/ValidationSchema";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateService,
  EditService,
  getTicketsByCustomer,
  ListingService,
} from "../../features/service/serviceThunk";
import { clearServiceState } from "../../features/service/serviceSlice";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import { getCustomer } from "../../features/auth/authThunk";

// Icons
import BuildIcon from "@mui/icons-material/Build";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import PersonIcon from "@mui/icons-material/Person";

import InputField from "../../component/InputField";
import SelectField from "../../component/SelectField";
import SubmitButton from "../../component/SubmitButton";
import FileUpload from "../../component/FileUpload";
import { showLoader,hideLoader,showSuccess,showError, } from "../../component/swalLoader";
import RegistrationField from "../../component/CommonRegistrationField";
import RegistrationBUtton from "../../component/CommonRegistrationButton";

function AddService() {
  const { loading, error, services, tickets } = useSelector(
    (state) => state.service
  );
  const { customers } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [previewImages, setPreviewImages] = useState([]);

  const ServiceList = Array.isArray(services)
    ? services
    : services?.data || [];

  // ✅ Load customers
  useEffect(() => {
    dispatch(getCustomer());
  }, [dispatch]);

  // ✅ Load services for edit
  useEffect(() => {
    if (isEdit && ServiceList.length === 0) {
      dispatch(ListingService());
    }
  }, [isEdit, ServiceList.length, dispatch]);

  // ✅ Formik
  const formik = useFormik({
    initialValues: {
      customerId: "",
      ticketId: "",
      serviceCharge: "",
      // images: [],
      // reports: [],
    },
    validationSchema: serviceSchema,
    onSubmit: async (values, actions) => {
  const formData = new FormData();

  Object.keys(values).forEach((key) => {
    if (key !== "images" && key !== "reports") {
      formData.append(key, values[key]);
    }
  });

  // values.images.forEach((file) =>
  //   formData.append("images", file)
  // );

  // values.reports.forEach((file) =>
  //   formData.append("reports", file)
  // );

  try {
  showLoader(isEdit ? "Updating Service..." : "Creating Service...");

  if (isEdit) {
    await dispatch(EditService({ id, data: formData })).unwrap();
  } else {
    await dispatch(CreateService(formData)).unwrap();
  }

  hideLoader();

  showSuccess(isEdit ? "Service Updated 🎉" : "Service Created 🎉");

  actions.resetForm();
  navigate("/listing-service");

} catch (err) {
  hideLoader();
  showError(err?.message || "Something went wrong");
}
},
  });

  // ✅ Fetch tickets on customer change
  useEffect(() => {
    if (formik.values.customerId) {
      dispatch(
        getTicketsByCustomer({ customerId: formik.values.customerId })
      );
    }
  }, [formik.values.customerId, dispatch]);

  // ✅ Edit autofill
  useEffect(() => {
    if (isEdit && ServiceList.length > 0) {
      const service = ServiceList.find((c) => c._id === id);

      if (service) {
        formik.setValues({
          serviceCharge: service.serviceCharge || "",
          customerId:
            service.customerId?._id || service.customerId || "",
          ticketId:
            service.ticketId?._id ||
            service.ticket?._id ||
            service.ticketId ||
            "",
          // images: [],
          // reports: [],
        });
      }
    }
  }, [isEdit, id, ServiceList]);

  useEffect(() => {
    return () => {
      dispatch(clearServiceState());
    };
  }, [dispatch]);

  // ✅ Convert data to Select options
  const customerOptions = customers?.map((c) => ({
    label: c.name,
    value: c._id,
  }));

  const ticketOptions = tickets?.map((t) => ({
    label: `${t.deviceName || "Device"} - ${t.problem || "Issue"}`,
    value: t._id,
  }));

  return (
  <div className="min-h-screen bg-[#081426] flex items-center justify-center overflow-hidden relative">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-[#0d1c30]/70 p-8 rounded-2xl shadow-xl w-full max-w-4xl space-y-8"
      >
      <h2 className="text-cyan-400 text-4xl font-bold text-center mb-8 animate-bounce">
          {isEdit ? "Edit Service" : "Add Service"}
        </h2>

        {/* Service Charge */}
        <RegistrationField
          icon={<CurrencyRupeeIcon />}
          type="number"
          name="serviceCharge"
          placeholder="Service Charge"
          value={formik.values.serviceCharge}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          touched={formik.touched.serviceCharge}
          error={formik.errors.serviceCharge}
        />

        {/* Customer */}
        <SelectField
          icon={<PersonIcon />}
          name="customerId"
          value={formik.values.customerId}
          onChange={(e) => {
            formik.handleChange(e);
            formik.setFieldValue("ticketId", "");
          }}
          options={customerOptions}
          placeholder="Select Customer"
          onBlur={formik.handleBlur}
          touched={formik.touched.customerId}
          error={formik.errors.customerId}
        />

        {/* Ticket */}
        <SelectField
          icon={<BuildIcon />}
          name="ticketId"
          value={formik.values.ticketId}
          onChange={formik.handleChange}
          options={ticketOptions}
          placeholder="Select Ticket"
          onBlur={formik.handleBlur}
          touched={formik.touched.ticketId}
          error={formik.errors.ticketId}
        />

        {/* Images */}
        {/* <FileUpload
          label="Upload Images"
          multiple
          accept="image/*"
          onChange={(e) => {
            const files = Array.from(e.target.files);
            formik.setFieldValue("images", files);
            setPreviewImages(files.map((f) => URL.createObjectURL(f)));
          }}
        /> */}

        {/* Preview */}
        {/* <div className="flex gap-2 flex-wrap">
          {previewImages.map((src, i) => (
            <img key={i} src={src} className="h-16 w-16 rounded" />
          ))}
        </div> */}

        {/* Reports */}
        {/* <FileUpload
          label="Upload Reports (PDF)"
          multiple
          accept=".pdf"
          onChange={(e) =>
            formik.setFieldValue(
              "reports",
              Array.from(e.target.files)
            )
          }
        /> */}

        {/* Error */}
        {/* {error && <p className="text-red-500">{error.message}</p>} */}

        {/* Submit */}
        {/* <SubmitButton loading={loading} isEdit={isEdit} /> */}
        <RegistrationBUtton
  loading={loading}
  text="Add Services"
  loadingText="Saving..."
  // icon={<SaveIcon />}
/>
      </form>
    </div>
  );
}

export default AddService;