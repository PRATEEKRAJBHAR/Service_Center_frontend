// // thsi sis working ui



// // import { useFormik } from "formik";
// // import * as Yup from "yup";
// // import React from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { createParts, updateParts } from "../../features/parts/partThunk";
// // import { useNavigate, useParams } from "react-router-dom";

// // function Parts() {

// //     const dispatch=useDispatch();
// // const {id}=useParams();
// // const {parts}=useSelector((state)=>state.parts);
// // const navigate=useNavigate();
// // // console.log(parts,"parts");
// // const SelectedParts=parts.find((val)=>(
// //     val._id===id
// // ));
// // console.log(SelectedParts,"selecteparts");
// // // console.log(id,"id");
// // const isEdit=Boolean(id)
// //   const validationSchema = Yup.object({
// //     partName: Yup.string()
// //       .required("Part name is required")
// //       .min(2, "Minimum 2 characters required"),

// //     stock: Yup.number()
// //       .typeError("Stock must be a number")
// //       .required("Stock is required")
// //       .positive("Stock must be greater than 0")
// //       .integer("Stock must be an integer"),

// //     price: Yup.number()
// //       .typeError("Price must be a number")
// //       .required("Price is required")
// //       .positive("Price must be greater than 0"),
// //   });

// //   const formik = useFormik({
// //      initialValues: {
// //     partName: SelectedParts?.partName || "",
// //     stock: SelectedParts?.stock || "",
// //     price: SelectedParts?.price || "",
// //   },
// //   enableReinitialize: true,
// //     validationSchema: validationSchema,
// //     onSubmit: async (values, action) => {
// //         if(isEdit){
// //             dispatch(updateParts({id,xxx:values}))
// //         }else{

// //             dispatch(createParts(values))
// //         }
// //       console.log(values);
// //       alert("Successfully added parts");
// //       navigate(-1)
// //       action.resetForm();
// //     },


// //   });

// //   const fields = [
// //     { name: "partName", placeholder: "Enter part name", type: "text" },
// //     { name: "stock", placeholder: "Enter stock", type: "number" },
// //     { name: "price", placeholder: "Per Units price", type: "number" },
// //   ];

// //   return (
// //     <div className="p-5">
// //       <form onSubmit={formik.handleSubmit}>
// //         {fields.map((val, index) => (
// //           <div key={index} className="mb-4">
// //             <input
// //               type={val.type}
// //               name={val.name}
// //               placeholder={val.placeholder}
// //               value={formik.values[val.name]}
// //               onChange={formik.handleChange}
// //               onBlur={formik.handleBlur}
// //               className="border border-black p-2 w-full"
// //             />

// //             {formik.touched[val.name] && formik.errors[val.name] && (
// //               <p className="text-red-500 text-sm mt-1">
// //                 {formik.errors[val.name]}
// //               </p>
// //             )}
// //           </div>
// //         ))}

// //         <button
// //           type="submit"
// //           className="bg-blue-600 text-white px-4 py-2 rounded"
// //         >
// //           {isEdit?'update':"add"}
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }

// // export default Parts;






// import { useFormik } from "formik";
// import * as Yup from "yup";
// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createParts, updateParts } from "../../features/parts/partThunk";
// import { useNavigate, useParams } from "react-router-dom";
// import Swal from "sweetalert2";

// // Icons
// import BuildIcon from "@mui/icons-material/Build";
// import InventoryIcon from "@mui/icons-material/Inventory";
// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

// function Parts() {
//   const dispatch = useDispatch();
//   const { id } = useParams();
//   const { parts } = useSelector((state) => state.parts);
//   const navigate = useNavigate();

//   const SelectedParts = parts.find((val) => val._id === id);
//   const isEdit = Boolean(id);

//   const validationSchema = Yup.object({
//     partName: Yup.string()
//       .required("Part name is required")
//       .min(2, "Minimum 2 characters required"),

//     stock: Yup.number()
//       .typeError("Stock must be a number")
//       .required("Stock is required")
//       .positive("Stock must be greater than 0")
//       .integer("Stock must be an integer"),

//     price: Yup.number()
//       .typeError("Price must be a number")
//       .required("Price is required")
//       .positive("Price must be greater than 0"),
//   });

//   const formik = useFormik({
//     initialValues: {
//       partName: SelectedParts?.partName || "",
//       stock: SelectedParts?.stock || "",
//       price: SelectedParts?.price || "",
//     },
//     enableReinitialize: true,
//     validationSchema,
//     onSubmit: async (values, action) => {
//       let result;

//       if (isEdit) {
//         result = await dispatch(updateParts({ id, xxx: values }));
//       } else {
//         result = await dispatch(createParts(values));
//       }

//       if (result.meta.requestStatus === "fulfilled") {
//         Swal.fire({
//           icon: "success",
//           title: isEdit
//             ? "Part Updated 🎉"
//             : "Part Added 🎉",
//           timer: 1500,
//           showConfirmButton: false,
//         });

//         navigate(-1);
//         action.resetForm();
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Error ❌",
//           text: "Something went wrong",
//         });
//       }
//     },
//   });

//   const inputStyle =
//     "w-full border p-2 rounded-lg pl-10 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400";

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200">

//       <form
//         onSubmit={formik.handleSubmit}
//         className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-5"
//       >
//         <h2 className="text-2xl font-bold text-center text-gray-700">
//           {isEdit ? "Edit Part" : "Add Part"}
//         </h2>

//         {/* Part Name */}
//         <div className="relative">
//           <BuildIcon className="absolute top-3 left-2 text-gray-400" />
//           <input
//             type="text"
//             name="partName"
//             placeholder="Enter part name"
//             value={formik.values.partName}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             className={inputStyle}
//           />
//         </div>
//         {formik.touched.partName && formik.errors.partName && (
//           <p className="text-red-500 text-sm">
//             {formik.errors.partName}
//           </p>
//         )}

//         {/* Stock */}
//         <div className="relative">
//           <InventoryIcon className="absolute top-3 left-2 text-gray-400" />
//           <input
//             type="number"
//             name="stock"
//             placeholder="Enter stock"
//             value={formik.values.stock}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             className={inputStyle}
//           />
//         </div>
//         {formik.touched.stock && formik.errors.stock && (
//           <p className="text-red-500 text-sm">
//             {formik.errors.stock}
//           </p>
//         )}

//         {/* Price */}
//         <div className="relative">
//           <CurrencyRupeeIcon className="absolute top-3 left-2 text-gray-400" />
//           <input
//             type="number"
//             name="price"
//             placeholder="Per unit price"
//             value={formik.values.price}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             className={inputStyle}
//           />
//         </div>
//         {formik.touched.price && formik.errors.price && (
//           <p className="text-red-500 text-sm">
//             {formik.errors.price}
//           </p>
//         )}

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold"
//         >
//           {isEdit ? "Update" : "Add"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Parts;




import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createParts, updateParts } from "../../features/parts/partThunk";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

// Icons
import BuildIcon from "@mui/icons-material/Build";
import InventoryIcon from "@mui/icons-material/Inventory";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

// ✅ Reusable Components
import InputField from "../../component/InputField";
import SubmitButton from "../../component/SubmitButton";
import { showLoader, hideLoader, showSuccess, showError } from "../../component/swalLoader";
import RegistrationField from "../../component/CommonRegistrationField";
import RegistrationBUtton from "../../component/CommonRegistrationButton";

function Parts() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { parts, loading, error } = useSelector((state) => state.parts);
  const navigate = useNavigate();

  const selectedPart = parts.find((val) => val._id === id);
  const isEdit = Boolean(id);

  // ✅ Validation
  const validationSchema = Yup.object({
    partName: Yup.string()
      .required("Part name is required")
      .min(2, "Minimum 2 characters required"),

    stock: Yup.number()
      .typeError("Stock must be a number")
      .required("Stock is required")
      .positive("Stock must be greater than 0")
      .integer("Stock must be an integer"),

    price: Yup.number()
      .typeError("Price must be a number")
      .required("Price is required")
      .positive("Price must be greater than 0"),
  });

  // ✅ Formik
  const formik = useFormik({
  initialValues: {
    partName: selectedPart?.partName || "",
    stock: selectedPart?.stock || "",
    price: selectedPart?.price || "",
  },
  enableReinitialize: true,
  validationSchema,

  onSubmit: async (values, action) => {
    let result;

    try {
      // 🔄 Show loader
      showLoader(isEdit ? "Updating part..." : "Creating part...");

      if (isEdit) {
        result = await dispatch(updateParts({ id, xxx: values }));
      } else {
        result = await dispatch(createParts(values));
      }

      // ✅ Hide loader
      hideLoader();

      if (result.meta.requestStatus === "fulfilled") {
        showSuccess(
          isEdit
            ? "Part updated successfully!"
            : "Part created successfully!"
        );

        action.resetForm();

        // optional delay for better UX
        setTimeout(() => {
          navigate(-1);
        }, 1500);
      } else {
        // showError(result?.payload?.message || "Operation failed");
        showError(
  result?.payload?.message ||
  result?.payload?.error ||
  "Operation failed"
);
      }
    } catch (error) {
      hideLoader();
      showError("Something went wrong!");
    }
  },
});

  return (
  <div className="min-h-screen bg-[#081426] flex items-center justify-center overflow-hidden relative">

      <form
        onSubmit={formik.handleSubmit}
        className="bg-[#0d1c30]/70 p-8 rounded-2xl shadow-xl w-full max-w-4xl space-y-8"
      >
      <h2 className="text-cyan-400 text-4xl font-bold text-center mb-8 animate-bounce">
          {isEdit ? "Edit Part" : "Add Part"}
        </h2>

        {/* Part Name */}
        <div className="relative">
          <BuildIcon className="absolute top-3 left-2 text-gray-400" />
          <RegistrationField
            name="partName"
            placeholder="Enter part name"
            value={formik.values.partName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            touched={formik.touched.partName}
            error={formik.errors.partName}
          />
        </div>

        {/* Stock */}
        <div className="relative">
          <InventoryIcon className="absolute top-3 left-2 text-gray-400" />
          <RegistrationField
            name="stock"
            type="number"
            placeholder="Enter stock"
            value={formik.values.stock}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            touched={formik.touched.stock}
            error={formik.errors.stock}
          />
        </div>

        {/* Price */}
        <div className="relative">
          <CurrencyRupeeIcon className="absolute top-3 left-2 text-gray-400" />
          <RegistrationField
            name="price"
            type="number"
            placeholder="Per unit price"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            touched={formik.touched.price}
            error={formik.errors.price}
          />
        </div>

        {/* Submit Button */}
        {/* <RegistrationBUtton
        loading={loading} isEdit={isEdit} /> */}
<RegistrationBUtton
  loading={loading}
  text="Add Part"
  loadingText="Saving..."
  // icon={<SaveIcon />}
/>
        {/* Error */}
        {/* {error && (
          <p className="text-red-600 text-center">
            {error.message || error}
          </p>
        )} */}
      </form>
    </div>
  );
}

export default Parts;