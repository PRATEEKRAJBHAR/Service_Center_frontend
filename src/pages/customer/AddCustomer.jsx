// import { useFormik } from "formik";
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addCustomer } from "../../features/customer/customerThunk";

// function AddCustomer() {
//   const [preview, setPreview] = useState(null);

//   const { loading, error } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();

//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       phone: "",
//       address: "",
//       deviceName: "",
//       devicePrice: "",
//       purchaseBill: null,
//       deviceImage: null,
//     },

//     onSubmit: async (values, { resetForm }) => {
//       const formData = new FormData();

//       // Append all fields
//       Object.keys(values).forEach((key) => {
//         formData.append(key, values[key]);
//       });

//       const result = await dispatch(addCustomer(formData));

//       if (addCustomer.fulfilled.match(result)) {
//         alert("Customer added successfully ✅");
//         resetForm();
//         setPreview(null);
//       } else {
//         alert(result.payload?.message || "Something went wrong ❌");
//       }
//     },
//   });

//   const fields = [
//     { name: "name", placeholder: "Enter name", type: "text" },
//     { name: "phone", placeholder: "Enter phone", type: "text" },
//     { name: "address", placeholder: "Enter address", type: "text" },
//     { name: "deviceName", placeholder: "Enter device name", type: "text" },
//     { name: "devicePrice", placeholder: "Enter device price", type: "number" },
//     { name: "deviceImage", type: "image" },
//     { name: "purchaseBill", type: "document" },
//   ];

//   const inputStyle = () =>
//     "w-full border border-gray-300 p-2 rounded";

//   return (
//     <div className="max-w-lg mx-auto mt-10 bg-white shadow-xl p-6 rounded-xl">
//       <h2 className="text-2xl font-bold mb-6 text-center">
//         Add Customer
//       </h2>

//       <form onSubmit={formik.handleSubmit} className="space-y-4">
//         {fields.map((val) => {
//           if (val.type === "image") {
//             return (
//               <div key={val.name}>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => {
//                     const file = e.target.files[0];
//                     formik.setFieldValue(val.name, file);
//                     if (file) {
//                       setPreview(URL.createObjectURL(file));
//                     }
//                   }}
//                   className={inputStyle()}
//                 />

//                 {preview && (
//                   <img
//                     src={preview}
//                     alt="preview"
//                     className="mt-2 h-20"
//                   />
//                 )}
//               </div>
//             );
//           }

//           if (val.type === "document") {
//             return (
//               <div key={val.name}>
//                 <input
//                   type="file"
//                   accept=".pdf"
//                   onChange={(e) =>
//                     formik.setFieldValue(val.name, e.target.files[0])
//                   }
//                   className={inputStyle()}
//                 />
//               </div>
//             );
//           }

//           return (
//             <div key={val.name}>
//               <input
//                 name={val.name}
//                 type={val.type}
//                 placeholder={val.placeholder}
//                 value={formik.values[val.name]}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 className={inputStyle()}
//               />
//             </div>
//           );
//         })}

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-indigo-600 text-white py-2 rounded"
//         >
//           {loading ? "Submitting..." : "Submit"}
//         </button>

//         {error && (
//           <p className="text-red-600 text-center mt-2">
//             {error.message || error}
//           </p>
//         )}
//       </form>
//     </div>
//   );
// }

// export default AddCustomer;





// here edit operation perform
// when i edit icon all data autofilled but img and pdf cannot filled because its technically not posible


// import React, { useEffect, useState } from "react";
// import { useFormik } from "formik";
// import { useDispatch, useSelector } from "react-redux";
// import { addCustomer, editCustomer, ViewCustomer } from "../../features/customer/customerThunk";
// import { useNavigate, useParams } from "react-router-dom";

// function AddCustomer() {
//   const [preview, setPreview] = useState(null);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const isEdit = Boolean(id);

//   const { loading, error, customers } = useSelector(
//     (state) => state.customer
//   );

//   // handle both API shapes
//   const customerList = Array.isArray(customers)
//     ? customers
//     : customers?.data || [];

//   const formik = useFormik({
//     initialValues: {
//       // name: "",
//       phone: "",
//       address: "",
//       deviceName: "",
//       devicePrice: "",
//       purchaseBill: null,
//       deviceImage: null,
//     },

//     onSubmit: async (values) => {
//       const formData = new FormData();

//       Object.keys(values).forEach((key) => {
//         if (values[key] !== null) {
//           formData.append(key, values[key]);
//         }
//       });

//       let result;

//       if (isEdit) {
//         result = await dispatch(editCustomer({ id, data: formData }));
//       } else {
//         result = await dispatch(addCustomer(formData));
//       }

//       if (result.meta.requestStatus === "fulfilled") {
//         alert(isEdit ? "Customer updated ✅" : "Customer added ✅");
//         navigate("/listing-cutomer");
//       } else {
//         alert("Something went wrong");
//       }
//     },
//   });

//   // ✅ fetch customers when edit page opened
//   useEffect(() => {
//     if (isEdit && customerList.length === 0) {
//       dispatch(ViewCustomer());
//     }
//   }, [isEdit, customerList.length, dispatch]);

//   // ✅ autofill form when customer is available
//   useEffect(() => {
//     if (isEdit && customerList.length > 0) {
//       const customer = customerList.find((c) => c._id === id);

//       if (customer) {
//         formik.setValues({
//           // name: customer.name || "",
//           phone: customer.phone || "",
//           address: customer.address || "",
//           deviceName: customer.deviceName || "",
//           devicePrice: customer.devicePrice || "",
//           purchaseBill: null,
//           deviceImage: null,
//         });

//         // show existing image preview if you want
//         if (customer.deviceImage) {
//           setPreview(customer.deviceImage);
//         }
//       }
//     }
//   }, [isEdit, id, customerList]);

//   const fields = [
//     // { name: "name", placeholder: "Enter name", type: "text" },
//     { name: "phone", placeholder: "Enter phone", type: "text" },
//     { name: "address", placeholder: "Enter address", type: "text" },
//     { name: "deviceName", placeholder: "Enter device name", type: "text" },
//     { name: "devicePrice", placeholder: "Enter device price", type: "number" },
//     { name: "deviceImage", type: "image" },
//     { name: "purchaseBill", type: "document" },
//   ];

//   const inputStyle = () =>
//     "w-full border border-gray-300 p-2 rounded";

//   return (
//     <div className="max-w-lg mx-auto mt-10 bg-white shadow-xl p-6 rounded-xl">
//       <h2 className="text-2xl font-bold mb-6 text-center">
//         {isEdit ? "Edit Customer" : "Add Customer"}
//       </h2>

//       <form onSubmit={formik.handleSubmit} className="space-y-4">
//         {fields.map((val) => {
//           if (val.type === "image") {
//             return (
//               <div key={val.name}>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => {
//                     const file = e.target.files[0];
//                     formik.setFieldValue(val.name, file);

//                     if (file) {
//                       setPreview(URL.createObjectURL(file));
//                     }
//                   }}
//                   className={inputStyle()}
//                 />

//                 {preview && (
//                   <img
//                     src={preview}
//                     alt="preview"
//                     className="mt-2 h-20 object-cover"
//                   />
//                 )}
//               </div>
//             );
//           }

//           if (val.type === "document") {
//             return (
//               <div key={val.name}>
//                 <input
//                   type="file"
//                   accept=".pdf"
//                   onChange={(e) =>
//                     formik.setFieldValue(val.name, e.target.files[0])
//                   }
//                   className={inputStyle()}
//                 />
//               </div>
//             );
//           }

//           return (
//             <div key={val.name}>
//               <input
//                 name={val.name}
//                 type={val.type}
//                 placeholder={val.placeholder}
//                 value={formik.values[val.name]}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 className={inputStyle()}
//               />
//             </div>
//           );
//         })}

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-indigo-600 text-white py-2 rounded"
//         >
//           {loading
//             ? isEdit
//               ? "Updating..."
//               : "Submitting..."
//             : isEdit
//             ? "Update"
//             : "Submit"}
//         </button>

//         {error && (
//           <p className="text-red-600 text-center mt-2">
//             {error.message || error}
//           </p>
//         )}
//       </form>
//     </div>
//   );
// }

// export default AddCustomer;




import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  addCustomer,
  editCustomer,
  ViewCustomer,
} from "../../features/customer/customerThunk";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import DevicesIcon from "@mui/icons-material/Devices";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { customerSchema } from "../../validation/ValidationSchema";
import InputField from "../../component/InputField";
import FileUpload from "../../component/FileUpload";
import SubmitButton from "../../component/SubmitButton";
import RegistrationBUtton from "../../component/CommonRegistrationButton";
import RegistrationField from "../../component/CommonRegistrationField";
import { showLoader, hideLoader, showSuccess, showError } from "../../component/swalLoader";

function AddCustomer() {
  const [preview, setPreview] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [existingPdf, setExistingPdf] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  const { loading, error, customers } = useSelector(
    (state) => state.customer
  );

  const customerList = Array.isArray(customers)
    ? customers
    : customers?.data || [];
  console.log(customerList, " customerList service listing");

  const formik = useFormik({
    initialValues: {
      phone: "",
      address: "",
      deviceName: "",
      devicePrice: "",
      purchaseBill: null,
      deviceImage: null,
      problemDescription: null,
    },
    validationSchema: customerSchema,
    onSubmit: async (values) => {
      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        if (values[key] !== null) {
          formData.append(key, values[key]);
        }
      });

      try {
        // Loader Start
        showLoader(isEdit ? "Updating Customer..." : "Adding Customer...");

        let result;

        if (isEdit) {
          result = await dispatch(
            editCustomer({ id, data: formData })
          );
        } else {
          result = await dispatch(
            addCustomer(formData)
          );
        }

        // Loader Close
        hideLoader();

        if (result.meta.requestStatus === "fulfilled") {

          // Success Popup
          showSuccess(
            isEdit
              ? "Customer Updated 🎉"
              : "Customer Added 🎉"
          );

          setTimeout(() => {
            navigate("/listing-cutomer");
          }, 1500);

        } else {
          showError("Something went wrong ❌");
        }

      } catch (error) {
        hideLoader();
        showError("Something went wrong ❌");
      }
    },
  });

  useEffect(() => {
    if (isEdit && customerList.length === 0) {
      dispatch(ViewCustomer());
    }
  }, [isEdit, customerList.length, dispatch]);

  // useEffect(() => {
  //   if (isEdit && customerList.length > 0) {
  //     const customer = customerList.find((c) => c._id === id);

  //     if (customer) {
  //       formik.setValues({
  //         phone: customer.phone || "",
  //         address: customer.address || "",
  //         deviceName: customer.deviceName || "",
  //         devicePrice: customer.devicePrice || "",
  //         purchaseBill: null,
  //         deviceImage: null,
  //         problemDescription:customer.problemDescription||""
  //       });

  //       if (customer.deviceImage) {
  //         setPreview(customer.deviceImage);
  //       }
  //     }
  //   }
  // }, [isEdit, id, customerList]);



  useEffect(() => {
    if (isEdit && customerList.length > 0) {
      const customer = customerList.find((c) => c._id === id);

      if (customer) {
        formik.setValues({
          phone: customer.phone || "",
          address: customer.address || "",
          deviceName: customer.deviceName || "",
          devicePrice: customer.devicePrice || "",
          purchaseBill: null,
          deviceImage: null,
          problemDescription: customer.problemDescription || "",
        });

        // ✅ Set existing files
        setExistingImage(customer.deviceImage || null);
        setExistingPdf(customer.purchaseBill || null);

        // preview for image
        if (customer.deviceImage) {
          setPreview(customer.deviceImage);
        }
      }
    }
  }, [isEdit, id, customerList]);
  const inputStyle =
    "w-full border p-2 rounded-lg pl-10 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400";

  return (
    <div className="min-h-screen bg-[#081426] flex items-center justify-center overflow-hidden relative">

      <form
        onSubmit={formik.handleSubmit}
        className="bg-[#0d1c30]/70 p-8 rounded-2xl shadow-xl w-full max-w-4xl space-y-8"
      >
        <h2 className="text-cyan-400 text-4xl font-bold text-center mb-8 animate-bounce">
          {isEdit ? "Edit Customer" : "Add Customer"}
        </h2>

        {/* Phone */}
        <div className="relative">
          <PhoneIcon className="absolute top-3 left-2 text-gray-400" />
          {/* <input
            name="phone"
            placeholder="Enter phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            className={inputStyle}
          /> */}


          <RegistrationField
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            placeholder="Enter phone number"
            onBlur={formik.handleBlur}
            touched={formik.touched.phone}
            error={formik.errors.phone}
          />
        </div>

        {/* Address */}
        <div className="relative">
          <HomeIcon className="absolute top-3 left-2 text-gray-400" />
          <RegistrationField
            name="address"
            placeholder="Enter address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            touched={formik.touched.address}
            error={formik.errors.address}
          />
        </div>

        {/* Device Name */}
        <div className="relative">
          <DevicesIcon className="absolute top-3 left-2 text-gray-400" />
          <RegistrationField
            name="deviceName"
            placeholder="Enter device name"
            value={formik.values.deviceName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            touched={formik.touched.deviceName}
            error={formik.errors.deviceName} />
        </div>

        {/* Device Price */}
        <div className="relative">
          <CurrencyRupeeIcon className="absolute top-3 left-2 text-gray-400" />
          <RegistrationField
            name="devicePrice"
            type="number"
            placeholder="Enter device price"
            value={formik.values.devicePrice}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            touched={formik.touched.devicePrice}
            error={formik.errors.devicePrice} />
        </div>


        {/* Image */}
        <div className="border border-cyan-800 rounded-lg p-3 text-center">

          <FileUpload
            label="Upload Device Image"
            name="deviceImage"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              formik.setFieldValue("deviceImage", file);

              if (file) {
                setPreview(URL.createObjectURL(file));
                setExistingImage(null);
              }
            }}
          />

          {/* ✅ Show preview INSIDE box */}
          {(preview || existingImage) && (
            <div className="mt-2">
              <img
                src={preview || existingImage}
                alt="preview"
                className="h-20 w-20 rounded object-cover mx-auto"
              />
            </div>
          )}

        </div>

        {/* Document */}
        <div className="border border-cyan-800 rounded-lg p-3 text-center">

          <FileUpload
            label="Upload Purchase Bill"
            name="purchaseBill"
            accept=".pdf"
            onChange={(e) => {
              const file = e.target.files[0];
              formik.setFieldValue("purchaseBill", file);

              if (file) {
                setExistingPdf(null);
              }
            }}
          />

          {/* ✅ Show inside same box */}
          {(existingPdf || formik.values.purchaseBill) && (
            <div className="mt-2 text-sm">

              {/* Existing PDF */}
              {existingPdf && !formik.values.purchaseBill && (
                <a
                  href={existingPdf}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 underline block"
                >
                  📄 View Existing PDF
                </a>
              )}

              {/* New Selected PDF */}
              {formik.values.purchaseBill && (
                <p className="text-green-600">
                  📄 {formik.values.purchaseBill.name}
                </p>
              )}

            </div>
          )}

        </div>
        {/* problem description*/}
        <div className="relative">
          {/* <DevicesIcon className="absolute top-3 left-2 text-gray-400" /> */}
          <RegistrationField
            name="problemDescription"
            placeholder="Describe the problem..."
            value={formik.values.problemDescription}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            touched={formik.touched.problemDescription}
            error={formik.errors.problemDescription}
            isTextarea={true}
          />
        </div>
        {/* Button */}
        <SubmitButton
          loading={loading}
          isEdit={isEdit}
          addText="Add Ticket"
          updateText="Update Part"
        />
        {/* Error */}
        {error && (
          <p className="text-red-600 text-center">
            {error.message || error}
          </p>
        )}
      </form>
    </div>
  );
}

export default AddCustomer;
