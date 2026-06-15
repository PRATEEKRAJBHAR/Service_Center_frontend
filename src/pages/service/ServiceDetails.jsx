// this is working code


// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom'
// import { ListingSingleService, removeServiceLog, removeServiceLogImg, removeServiceLogReport, TechnicianAddedParts, updateStatus } from '../../features/service/serviceThunk';
// import { deleteParts, getParts } from '../../features/parts/partThunk';

// function ServiceDetails() {
//   const { id } = useParams();
//   // console.log(id,"iddd");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { singleService } = useSelector((state) => state.service);
//     // console.log(singleService, "singleService");//yaha par mujhe all data find ho jaa rha hai,,,,,,

//   const { parts } = useSelector((state) => state.parts);
//   // console.log(parts,"hfjshfk");
//   const [selectedPartId, setSelectedPartId] = useState("");
// const [quantity, setQuantity] = useState(1);
//   const selectedPart = parts.find(
//     (part) => part._id === selectedPartId
//   );

//   // useEffect(() => {
//   //   if (parts.length === 0) {
//   //     dispatch(getParts());
//   //   }
//   // }, [dispatch, parts.length]);
// useEffect(() => {
//   if (parts.length === 0) {
//     dispatch(getParts({
//       search: '',
//       minPrice: '',
//       maxPrice: '',
//       sortBy: 'createdAt',
//       sortOrder: 'desc',
//       page: 1,
//       limit: 100
//     }));
//   }
// }, [dispatch, parts.length]);

//   useEffect(() => {
//     dispatch(ListingSingleService(id))
//   }, [dispatch, id])

//   const handleLog = () => {
//     navigate(`/add-log/${id}`)
//   }


//   // remove log

//   const handleRemoveLog = (logId) => {
//     dispatch(removeServiceLog({
//       id: singleService._id,
//       logId: logId
//     })
//     )
//   }


//   // add img
//   const handleAddImg = () => {
//     navigate(`/add-img/${id}`)
//   }


//   // delete img

//   const handleImgDel = (imgId) => {
//     dispatch(removeServiceLogImg({
//       id: singleService._id,
//       imgId: imgId
//     }))
//   }


//   // add report
//   const handleAddReport = () => {
//     navigate(`/add-report/${id}`)
//   }

//   // remove report

//   const handleRemoveReport = (reportId) => {
//     dispatch(removeServiceLogReport(
//       {
//         id: singleService._id,
//         reportId: reportId
//       }
//     ))

//   }


//   const handleStatusChange = (id, status) => {
//     dispatch(updateStatus({ id, data: { status } }))
//       .unwrap()
//       .then(() => {
//         console.log("Updated successfully");
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   };


//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-6xl mx-auto space-y-6">
//         <div>
//        <select
//   value={selectedPartId}
//   onChange={(e) => {
//     setSelectedPartId(e.target.value);
//   }}
//   className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg"
// >
//   <option value="">Select Part</option>
// {parts?.map((part) => {
//   // console.log(part, "partsss");
//   return (
//     <option key={part._id} value={part._id}>
//       {part.partName} (Stock: {part.stock})
//     </option>
//   );
// })}
// </select>
// <div className="mt-3">
//   <input
//     type="number"
//     // min="1"
//     value={quantity}
//     onChange={(e) => setQuantity(Number(e.target.value))}
//     className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg"
//     placeholder="Enter Quantity"
//   />
//   <button
//   onClick={() => {
//     if (!selectedPartId) {
//       alert("Please select part");
//       return;
//     }

//     dispatch(
//       TechnicianAddedParts({
//         id: singleService._id,
//         techId: singleService?.technicianId?._id,
//         data: {
//           partId: selectedPartId,
//           quantity: quantity
//         }
//       })
//     )
//       .unwrap()
//       .then(() => {
//         setQuantity(1);
//         setSelectedPartId("");
//             dispatch(getParts());


//       })
//       .catch((err) => {
//         alert(err.message);
//       });

//       dispatch(getParts({
//       search: '',
//       minPrice: '',
//       maxPrice: '',
//       sortBy: 'createdAt',
//       sortOrder: 'desc',
//       page: 1,
//       limit: 100
//     }));

//     // 🔥 ALSO REFETCH SERVIC
//         dispatch(ListingSingleService(id));

//   }}
//   className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg"
// >
//   Add Part
// </button>
// </div>
//         </div>

//         <div className="mt-3">
//           <input
//             placeholder="Parts Price"
//             value={selectedPart ? selectedPart.price : ""}
//             readOnly
//             className="px-4 py-2.5
//                bg-gray-100 border border-gray-300
//                rounded-lg shadow-sm
//                text-gray-700
//                focus:outline-none"
//           />
//         </div>
//         {/* Top Section */}
//         <div className="bg-white shadow-lg rounded-2xl p-6 flex justify-between items-center">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-800">
//               {singleService?.customerId?.name}
//             </h2>
//             <p className="text-gray-500 text-sm">
//               {singleService?.customerId?.phone} • {singleService?.customerId?.deviceName}
//             </p>
//           </div>

//           <div>
//             <select
//               value={singleService?.status || ""}
//               onChange={(e) => handleStatusChange(singleService._id, e.target.value)}
//               className={`px-4 py-2 rounded-full text-sm font-medium outline-none cursor-pointer
//       ${singleService?.status === "Completed"
//                   ? "bg-green-100 text-green-700"
//                   : singleService?.status === "In Progress"
//                     ? "bg-yellow-100 text-yellow-700"
//                     : "bg-red-100 text-red-700"
//                 }`}
//             >
//               <option value="Pending">Pending</option>
//               <option value="In Progress">In Progress</option>
//               <option value="Completed">Completed</option>
//             </select>
//           </div>
//         </div>

//         {/* Grid Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

//           {/* LEFT SIDE */}
//           <div className="lg:col-span-2 space-y-6">

//             {/* Problem + Charge */}
//             <div className="bg-white shadow-md rounded-xl p-6">
//               <h3 className="text-lg font-semibold mb-3 text-gray-700">
//                 Service Information
//               </h3>
//               <p className="mb-2">
//                 <span className="font-medium">Technician Name:</span>{" "}
//                 {singleService?.technicianId?.name}
//               </p>
//               <p className="mb-2">
//                 <span className="font-medium">Problem:</span>{" "}
//                 {singleService?.problemDescription}
//               </p>
//               <p>
//                 <span className="font-medium">Service Charge:</span> ₹{" "}
//                 {singleService?.serviceCharge}
//               </p>
//             </div>

//             {/* Images Section */}
//             <div className="bg-white shadow-md rounded-xl p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-semibold text-gray-700">
//                   Service Images
//                 </h3>
//                 <button onClick={handleAddImg} className="bg-blue-600 text-white px-4 py-1 rounded-lg text-sm">
//                   + Add Image
//                 </button>
//               </div>

//               <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                 {singleService?.images?.map((img) => (
//                   <div
//                     key={img._id}
//                     className="relative group rounded-lg overflow-hidden shadow"
//                   >
//                     <img
//                       // src={`http://localhost:4000/uploads/${img.url}`}
//                       src={`https://res.cloudinary.com/dclpdu68p/image/upload/${img.public_id}`}
//                       alt="service"
//                       className="h-32 w-full object-cover"
//                     />

//                     {/* Remove Button */}
//                     <button onClick={() => handleImgDel(img._id)} className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
//                       Remove
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Reports Section */}
//             <div className="bg-white shadow-md rounded-xl p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-semibold text-gray-700">
//                   Service Reports
//                 </h3>
//                 <button onClick={handleAddReport} className="bg-indigo-600 text-white px-4 py-1 rounded-lg text-sm">
//                   + Upload Report
//                 </button>
//               </div>

//               <ul className="space-y-2">
//                 {singleService?.reports?.map((file) => (
//                   <li
//                     key={file._id}
//                     className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
//                   >
//                     <span className="text-sm truncate">
//                       {file.url}
//                     </span>

//                     <div className="space-x-2">
//                       <a
//                         // href={`http://localhost:4000/uploads/${file.url}`}
//                         href={file.url}
//                         // href={`https://res.cloudinary.com/dclpdu68p/raw/upload/${file.public_id}`}
//                         // href={`https://res.cloudinary.com/dclpdu68p/raw/upload/${file.public_id}`}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="text-blue-600 text-sm"
//                       >
//                         View
//                       </a>
//                       <button onClick={() => handleRemoveReport(file._id)} className="text-red-600 text-sm">
//                         Delete
//                       </button>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           {/* RIGHT SIDE - LOGS */}
//           <div className="space-y-6">

//             <div className="bg-white shadow-md rounded-xl p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-semibold text-gray-700">
//                   Service Logs
//                 </h3>
//                 <button onClick={handleLog} className="bg-green-600 text-white px-4 py-1 rounded-lg text-sm">
//                   + Add Log
//                 </button>
//               </div>

//               <div className="space-y-3 max-h-96 overflow-y-auto">
//                 {singleService?.serviceLogs?.length === 0 && (
//                   <p className="text-gray-400 text-sm">No logs available</p>
//                 )}

//                 {singleService?.serviceLogs?.map((log, index) => (
//                   <div
//                     key={index}
//                     className="bg-gray-50 p-3 rounded-lg border-l-4 border-blue-500"
//                   >
//                     <p className="text-sm">{log.message}</p>
//                     <p className="text-xs text-gray-400 mt-1">
//                       {new Date(log.createdAt).toLocaleString()}
//                     </p>

//                     <button onClick={() => handleRemoveLog(log._id)} className="text-red-500 text-xs mt-1">
//                       Remove
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
// <div className="bg-white shadow-md rounded-xl p-6 mt-4">
//   <h3 className="text-lg font-semibold mb-3 text-gray-700">
//     Used Parts
//   </h3>

//   {singleService?.parts?.length === 0 && (
//     <p className="text-gray-400 text-sm">No parts added</p>
//   )}

//   {singleService?.parts?.map((item) => (
//     <div
//       key={item._id}
//       className="flex justify-between items-center border-b py-2"
//     >
//       <div>
//         <p className="font-medium">
//           {item.partId?.partName}
//         </p>
//         <p className="text-sm text-gray-500">
//           ₹ {item.price} × {item.quantity}
//         </p>
//       </div>

//       <p className="font-semibold">
//         ₹ {item.total}
//       </p>
//     </div>
//   ))}

//   <div className="mt-3 text-right">
//     <p>Parts Total: ₹ {singleService?.partsTotal}</p>
//     <p>Service Charge: ₹ {singleService?.serviceCharge}</p>
//     <p className="font-bold text-lg">
//       Grand Total: ₹ {singleService?.grandTotal}
//     </p>
//   </div>
// </div>
//           </div>
//         </div>
//       </div>
//     </div>


//   )
// }

// export default ServiceDetails ;











import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  ListingSingleService,
  removeServiceLog,
  removeServiceLogImg,
  removeServiceLogReport,
  TechnicianAddedParts,
  updateStatus,
} from "../../features/service/serviceThunk";

import { getParts } from "../../features/parts/partThunk";

import SelectField from "../../component/SelectField";
import InputField from "../../component/InputField";
import Button from "../../component/commonButton";
import { showLoader ,hideLoader, showSuccess, showError,confirmAction} from "../../component/swalLoader";
import { useFormik } from "formik";
import { addedPartsStock } from "../../validation/ValidationSchema";

function ServiceDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const { singleService ,loading, success, error} = useSelector((state) => state.service);
  const { parts } = useSelector((state) => state.parts);
  // const partsData = parts?.data || [];
  const partsData = parts || [];
// console.log("singleService:", singleService);
// console.log("parts:", parts);
  const [selectedPartId, setSelectedPartId] = useState("");
  const [quantity, setQuantity] = useState(1);
const [addingPart, setAddingPart] = useState(false);
  const Role = user?.role;
// console.log(Role,"role");

  // ✅ Fetch Parts
  useEffect(() => {
    if (partsData.length === 0) {
      dispatch(
        getParts({
          search: "",
          minPrice: "",
          maxPrice: "",
          sortBy: "createdAt",
          sortOrder: "desc",
          page: 1,
          limit: 100,
        })
      );
    }
  }, [dispatch, partsData.length]);

  // ✅ Fetch Service
  useEffect(() => {
    dispatch(ListingSingleService(id));
  }, [dispatch, id]);

  // ✅ Convert Parts to Options
  const partOptions = partsData?.map((part) => ({
    label: `${part.partName} (Stock: ${part.stock})`,
    value: part._id,
  }));

  // ✅ Add Part
// const handleAddPart = () => {
//   if (!selectedPartId) {
//     showError("Please select part");
//     return;
//   }

//   setAddingPart(true); // ✅ start loader
//   showLoader("Adding Part...");

//   dispatch(
//     TechnicianAddedParts({
//       id: singleService._id,
//       techId: singleService?.technicianId?._id,
//       data: {
//         partId: selectedPartId,
//         quantity: quantity,
//       },
//     })
//   )
//     .unwrap()
//     .then(() => {
//       hideLoader();
//       showSuccess("Part Added Successfully");

//       setQuantity();
//       setSelectedPartId("");
//     })
//     .catch((err) => {
//       hideLoader();
//       showError(err.message);
//     })
//     .finally(() => {
//       setAddingPart(false); // ✅ stop loader
//     });
// };


const formik = useFormik({
  initialValues: {
    partId: "",
    quantity: 1,
  },
  validationSchema:addedPartsStock,
  onSubmit: (values, { resetForm }) => {
    setAddingPart(true);
    showLoader("Adding Part...");

    dispatch(
      TechnicianAddedParts({
        id: singleService._id,
        techId: singleService?.technicianId?._id,
        data: {
          partId: values.partId,
          quantity: values.quantity,
        },
      })
    )
      .unwrap()
      .then(() => {
        hideLoader();
        showSuccess("Part Added Successfully");
        resetForm(); // ✅ reset form
      })
      .catch((err) => {
        hideLoader();
        showError(err.message);
      })
      .finally(() => {
        setAddingPart(false);
      });
  },
});

const selectedPart = partsData.find(
  (part) => part._id === formik.values.partId
);
  // ✅ Status Change
  const handleStatusChange = (status) => {
    dispatch(updateStatus({ id: singleService._id, data: { status } }));
  };


  // delete img

  const handleDeleteImage = async (img) => {
  const confirm = await confirmAction("Delete this image?");

  if (!confirm) return;

  try {
    showLoader("Deleting Image...");

    await dispatch(
      removeServiceLogImg({
        id: singleService._id,
        imgId: img._id,
      })
    ).unwrap();

    hideLoader();
    showSuccess("Image deleted successfully");

  } catch (err) {
    hideLoader();
    showError(err?.message || "Delete failed");
  }
};


// repost delete


const handleDeleteReport = async (file) => {
  const confirm = await confirmAction("Delete this report?");

  if (!confirm) return;

  try {
    showLoader("Deleting Report...");

    await dispatch(
      removeServiceLogReport({
        id: singleService._id,
        reportId: file._id,
      })
    ).unwrap();

    hideLoader();
    showSuccess("Report deleted successfully");

  } catch (err) {
    hideLoader();
    showError(err?.message || "Delete failed");
  }
};


// delete log


const handleDeleteLog = async (log) => {
  const confirm = await confirmAction("Delete this log?");

  if (!confirm) return;

  try {
    showLoader("Deleting Log...");

    await dispatch(
      removeServiceLog({
        id: singleService._id,
        logId: log._id,
      })
    ).unwrap();

    hideLoader();
    showSuccess("Log deleted successfully");

  } catch (err) {
    hideLoader();
    showError(err?.message || "Delete failed");
  }
};
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* ================= ADD PART SECTION ================= */}
        <div className="bg-white p-5 rounded-xl shadow">

          <h3 className="font-semibold mb-3">Add Parts</h3>
{/*
          <SelectField
  name="partId"
  value={formik.values.partId}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  touched={formik.touched.partId}
  error={formik.errors.partId}
  options={partOptions}
  placeholder="Select Part"
/> */}

<select
  name="partId"
  value={formik.values.partId}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  className="
    w-full
    px-4 py-3
    border border-gray-300
    rounded-lg
    bg-white
    text-gray-700
    focus:outline-none
    focus:ring-2
    focus:ring-blue-500
    focus:border-blue-500
    transition-all
    duration-200
    cursor-pointer
  "
>
  <option value="">Select Part</option>

  {partOptions.map((part) => (
    <option key={part.value} value={part.value}>
      {part.label}
    </option>
  ))}
</select>

          <div className="mt-3">
           <InputField
  type="number"
  name="quantity"
  value={formik.values.quantity}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  touched={formik.touched.quantity}
  error={formik.errors.quantity}
  placeholder="Enter Quantity"
/>
          </div>

          <div className="mt-3">
            <h2 className="text-2xl font-bold">

          <b>Per Part Price :</b>
              {selectedPart ? selectedPart.price : ""}
</h2>
            {/* <input
              value={selectedPart ? selectedPart.price : ""}
              placeholder="Part Price"
              disabled
              className="p-2 border border-black"
            /> */}
          </div>

            <div className="mt-4">
              {/* <Button text="Add Part" onClick={handleAddPart} /> */}
{/* <Button
  text={addingPart ? "Adding..." : "Add Part"}
  onClick={formik.handleSubmit}
  disabled={addingPart}
/> */}

 {Role === "technician" && (
          <Button
  text={addingPart ? "Adding..." : "Add Part"}
  onClick={formik.handleSubmit}
  disabled={addingPart}
          />
        )}

            </div>
        </div>

        {/* ================= TOP SECTION ================= */}
        <div className="bg-white shadow-lg rounded-2xl p-6 flex justify-between items-center">

          <div>
            <h2 className="text-2xl font-bold">
              {singleService?.customerId?.name}
            </h2>
            <p className="text-gray-500 text-sm">
              {singleService?.ticketId?.phone} •{" "}
              {singleService?.ticketId?.deviceName}
            </p>
          </div>

          {/* ✅ Reusable Select for Status */}
          <div className="w-48">
            {/* <SelectField
              name="status"
              value={singleService?.status || ""}
              onChange={(e) => handleStatusChange(e.target.value)}
              options={[
                { label: "Pending", value: "Pending" },
                { label: "In Progress", value: "In Progress" },
                { label: "Completed", value: "Completed" },
              ]}
            /> */}

             <select
  name="status"
  value={singleService?.status || ""}
  onChange={(e) => handleStatusChange(e.target.value)}
  className="
    w-full
    px-4
    py-3
    border
    border-gray-300
    rounded-lg
    bg-white
    text-gray-700
    focus:outline-none
    focus:ring-2
    focus:ring-blue-500
    focus:border-blue-500
    transition-all
    duration-200
    cursor-pointer
    appearance-none
  "
>
  <option value="Pending">Pending</option>
  <option value="In Progress">In Progress</option>
  <option value="Completed">Completed</option>
</select>
          </div>
        </div>

        {/* ================= SERVICE INFO ================= */}
        <div className="bg-white p-6 rounded-xl shadow">
          <p>
            <b>Technician:</b> {singleService?.technicianId?.name}
          </p>
          <p>
            <b>Problem:</b> {singleService?.ticketId?.problemDescription}
          </p>
          <p>
            <b>Service Charge:</b> ₹ {singleService?.serviceCharge}
          </p>
        </div>

        {/* ================= IMAGES ================= */}
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex justify-between mb-3">
            <h3>Service Images</h3>

            {/* <Button
              text="+ Add Image"
              onClick={() => navigate(`/add-img/${id}`)}
            /> */}
            {Role === "technician" && (
          <Button
  text={addingPart ? "Adding..." : "Add Image"}
              onClick={() => navigate(`/add-img/${id}`)}
  disabled={addingPart}
          />
        )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            {singleService?.images?.map((img) => (
              <div key={img._id} className="relative">
                <img
                  src={`https://res.cloudinary.com/dclpdu68p/image/upload/${img.public_id}`}
                  className="h-32 w-full object-cover rounded"
                />

               {/* <Button
  text="Remove"
  onClick={() => handleDeleteImage(img)}
/> */}

{Role === "technician" && (
          <Button
  text="Remove"
  onClick={() => handleDeleteImage(img)}
  disabled={addingPart}
    variant="danger"

          />
        )}
              </div>
            ))}
          </div>
        </div>

        {/* ================= REPORTS ================= */}
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex justify-between mb-3">
            <h3>Reports</h3>

            {/* <Button
              text="+ Upload Report"
              onClick={() => navigate(`/add-report/${id}`)}
            /> */}
            {Role === "technician" && (
          <Button
  text="+ Upload Report"
              onClick={() => navigate(`/add-report/${id}`)}
  disabled={addingPart}
          />
        )}
          </div>

          {singleService?.reports?.map((file) => (
            <div key={file._id} className="flex justify-between m-3">
              <a href={file.url} target="_blank">
                View
              </a>

             {/* <Button
  text="Delete"
  onClick={() => handleDeleteReport(file)}
/> */}

{Role === "technician" && (
          <Button
  text="Delete"
  onClick={() => handleDeleteReport(file)}
  disabled={addingPart}
    variant="danger"

          />
        )}
            </div>
          ))}
        </div>

        {/* ================= LOGS ================= */}
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex justify-between mb-3">
            <h3>Logs</h3>

            {/* <Button
              text="+ Add Log"
              onClick={() => navigate(`/add-log/${id}`)}
            /> */}
            {Role === "technician" && (
          <Button
  text="+ Add Log"
              onClick={() => navigate(`/add-log/${id}`)}
  disabled={addingPart}
          />
        )}
          </div>

          {singleService?.serviceLogs?.map((log) => (
            <div key={log._id} className="mb-2 border p-2 rounded">
              <p>{log.message}</p>

             {/* <Button
  text="Remove"
  onClick={() => handleDeleteLog(log)}
/> */}


{Role === "technician" && (
          <Button
  text="Remove"
  onClick={() => handleDeleteLog(log)}
  disabled={addingPart}
    variant="danger"

          />
        )}
            </div>
          ))}
        </div>

        {/* ================= PARTS SUMMARY ================= */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="mb-3 font-semibold">Used Parts</h3>

          {singleService?.parts?.map((item) => (
            <div key={item._id} className="flex justify-between">
              <div>
                {item.partId?.partName} (₹ {item.price} × {item.quantity})
              </div>
              <div>₹ {item.total}</div>
            </div>
          ))}

          <div className="mt-3 text-right">
            <p>Parts Total: ₹ {singleService?.partsTotal}</p>
            <p>Service Charge: ₹ {singleService?.serviceCharge}</p>
            <p className="font-bold">
              Grand Total: ₹ {singleService?.grandTotal}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ServiceDetails;

















//  import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom'
// import { ListingSingleService, removeServiceLog, removeServiceLogImg, removeServiceLogReport, TechnicianAddedParts, updateStatus } from '../../features/service/serviceThunk';
// import { deleteParts, getParts } from '../../features/parts/partThunk';

// function ServiceDetails() {
//   const { id } = useParams();
//   // console.log(id,"iddd");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { singleService } = useSelector((state) => state.service);
//   const { parts } = useSelector((state) => state.parts);
//   // console.log(parts,"hfjshfk");
//   const [selectedPartId, setSelectedPartId] = useState("");
// const [quantity, setQuantity] = useState(1);
//   const selectedPart = parts.find(
//     (part) => part._id === selectedPartId
//   );

//   useEffect(() => {
//     if (parts.length === 0) {
//       dispatch(getParts());
//     }
//   }, [dispatch, parts.length]);


//   useEffect(() => {
//     dispatch(ListingSingleService(id))
//   }, [dispatch, id])
//   console.log(singleService, "singleService");

//   const handleLog = () => {
//     navigate(`/add-log/${id}`)
//   }


//   // remove log

//   const handleRemoveLog = (logId) => {
//     dispatch(removeServiceLog({
//       id: singleService._id,
//       logId: logId
//     })
//     )
//   }


//   // add img
//   const handleAddImg = () => {
//     navigate(`/add-img/${id}`)
//   }


//   // delete img

//   const handleImgDel = (imgId) => {
//     dispatch(removeServiceLogImg({
//       id: singleService._id,
//       imgId: imgId
//     }))
//   }


//   // add report
//   const handleAddReport = () => {
//     navigate(`/add-report/${id}`)
//   }

//   // remove report

//   const handleRemoveReport = (reportId) => {
//     dispatch(removeServiceLogReport(
//       {
//         id: singleService._id,
//         reportId: reportId
//       }
//     ))

//   }


//   const handleStatusChange = (id, status) => {
//     dispatch(updateStatus({ id, data: { status } }))
//       .unwrap()
//       .then(() => {
//         console.log("Updated successfully");
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   };


//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-6xl mx-auto space-y-6">
//         <div>
//        <select
//   value={selectedPartId}
//   onChange={(e) => {
//     setSelectedPartId(e.target.value);
//   }}
//   className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg"
// >
//   <option value="">Select Part</option>
//   {parts?.map((part) => (
//     <option key={part._id} value={part._id}>
//       {part.partName} (Stock: {part.stock})
//     </option>
//   ))}
// </select>
// <div className="mt-3">
//   <input
//     type="number"
//     min="1"
//     value={quantity}
//     onChange={(e) => setQuantity(Number(e.target.value))}
//     className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg"
//     placeholder="Enter Quantity"
//   />
// </div>
// <button
//   onClick={() => {
//     if (!selectedPartId) {
//       alert("Please select part");
//       return;
//     }

//     dispatch(
//       TechnicianAddedParts({
//         id: singleService._id,
//         techId: singleService?.technicianId?._id,
//         data: {
//           partId: selectedPartId,
//           quantity: quantity
//         }
//       })
//     )
//       .unwrap()
//       .then(() => {
//         setQuantity(1);
//         setSelectedPartId("");
//       })
//       .catch((err) => {
//         alert(err.message);
//       });
//   }}
//   className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg"
// >
//   Add Part
// </button>
//         </div>

//         <div className="mt-3">
//           <input
//             placeholder="Parts Price"
//             value={selectedPart ? selectedPart.price : ""}
//             readOnly
//             className="px-4 py-2.5
//                bg-gray-100 border border-gray-300
//                rounded-lg shadow-sm
//                text-gray-700
//                focus:outline-none"
//           />
//         </div>
//         {/* Top Section */}
//         <div className="bg-white shadow-lg rounded-2xl p-6 flex justify-between items-center">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-800">
//               {singleService?.customerId?.name}
//             </h2>
//             <p className="text-gray-500 text-sm">
//               {singleService?.customerId?.phone} • {singleService?.customerId?.deviceName}
//             </p>
//           </div>

//           <div>
//             <select
//               value={singleService?.status || ""}
//               onChange={(e) => handleStatusChange(singleService._id, e.target.value)}
//               className={`px-4 py-2 rounded-full text-sm font-medium outline-none cursor-pointer
//       ${singleService?.status === "Completed"
//                   ? "bg-green-100 text-green-700"
//                   : singleService?.status === "In Progress"
//                     ? "bg-yellow-100 text-yellow-700"
//                     : "bg-red-100 text-red-700"
//                 }`}
//             >
//               <option value="Pending">Pending</option>
//               <option value="In Progress">In Progress</option>
//               <option value="Completed">Completed</option>
//             </select>
//           </div>
//         </div>

//         {/* Grid Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

//           {/* LEFT SIDE */}
//           <div className="lg:col-span-2 space-y-6">

//             {/* Problem + Charge */}
//             <div className="bg-white shadow-md rounded-xl p-6">
//               <h3 className="text-lg font-semibold mb-3 text-gray-700">
//                 Service Information
//               </h3>
//               <p className="mb-2">
//                 <span className="font-medium">Technician Name:</span>{" "}
//                 {singleService?.technicianId?.name}
//               </p>
//               <p className="mb-2">
//                 <span className="font-medium">Problem:</span>{" "}
//                 {singleService?.problemDescription}
//               </p>
//               <p>
//                 <span className="font-medium">Service Charge:</span> ₹{" "}
//                 {singleService?.serviceCharge}
//               </p>
//             </div>

//             {/* Images Section */}
//             <div className="bg-white shadow-md rounded-xl p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-semibold text-gray-700">
//                   Service Images
//                 </h3>
//                 <button onClick={handleAddImg} className="bg-blue-600 text-white px-4 py-1 rounded-lg text-sm">
//                   + Add Image
//                 </button>
//               </div>

//               <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                 {singleService?.images?.map((img) => (
//                   <div
//                     key={img._id}
//                     className="relative group rounded-lg overflow-hidden shadow"
//                   >
//                     <img
//                       // src={`http://localhost:4000/uploads/${img.url}`}
//                       src={`https://res.cloudinary.com/dclpdu68p/image/upload/${img.public_id}`}
//                       alt="service"
//                       className="h-32 w-full object-cover"
//                     />

//                     {/* Remove Button */}
//                     <button onClick={() => handleImgDel(img._id)} className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
//                       Remove
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Reports Section */}
//             <div className="bg-white shadow-md rounded-xl p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-semibold text-gray-700">
//                   Service Reports
//                 </h3>
//                 <button onClick={handleAddReport} className="bg-indigo-600 text-white px-4 py-1 rounded-lg text-sm">
//                   + Upload Report
//                 </button>
//               </div>

//               <ul className="space-y-2">
//                 {singleService?.reports?.map((file) => (
//                   <li
//                     key={file._id}
//                     className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
//                   >
//                     <span className="text-sm truncate">
//                       {file.url}
//                     </span>

//                     <div className="space-x-2">
//                       <a
//                         // href={`http://localhost:4000/uploads/${file.url}`}
//                         href={file.url}
//                         // href={`https://res.cloudinary.com/dclpdu68p/raw/upload/${file.public_id}`}
//                         // href={`https://res.cloudinary.com/dclpdu68p/raw/upload/${file.public_id}`}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="text-blue-600 text-sm"
//                       >
//                         View
//                       </a>
//                       <button onClick={() => handleRemoveReport(file._id)} className="text-red-600 text-sm">
//                         Delete
//                       </button>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           {/* RIGHT SIDE - LOGS */}
//           <div className="space-y-6">

//             <div className="bg-white shadow-md rounded-xl p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-semibold text-gray-700">
//                   Service Logs
//                 </h3>
//                 <button onClick={handleLog} className="bg-green-600 text-white px-4 py-1 rounded-lg text-sm">
//                   + Add Log
//                 </button>
//               </div>

//               <div className="space-y-3 max-h-96 overflow-y-auto">
//                 {singleService?.serviceLogs?.length === 0 && (
//                   <p className="text-gray-400 text-sm">No logs available</p>
//                 )}

//                 {singleService?.serviceLogs?.map((log, index) => (
//                   <div
//                     key={index}
//                     className="bg-gray-50 p-3 rounded-lg border-l-4 border-blue-500"
//                   >
//                     <p className="text-sm">{log.message}</p>
//                     <p className="text-xs text-gray-400 mt-1">
//                       {new Date(log.createdAt).toLocaleString()}
//                     </p>

//                     <button onClick={() => handleRemoveLog(log._id)} className="text-red-500 text-xs mt-1">
//                       Remove
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
// <div className="bg-white shadow-md rounded-xl p-6 mt-4">
//   <h3 className="text-lg font-semibold mb-3 text-gray-700">
//     Used Parts
//   </h3>

//   {singleService?.parts?.length === 0 && (
//     <p className="text-gray-400 text-sm">No parts added</p>
//   )}

//   {singleService?.parts?.map((item) => (
//     <div
//       key={item._id}
//       className="flex justify-between items-center border-b py-2"
//     >
//       <div>
//         <p className="font-medium">
//           {item.partId?.partName}
//         </p>
//         <p className="text-sm text-gray-500">
//           ₹ {item.price} × {item.quantity}
//         </p>
//       </div>

//       <p className="font-semibold">
//         ₹ {item.total}
//       </p>
//     </div>
//   ))}

//   <div className="mt-3 text-right">
//     <p>Parts Total: ₹ {singleService?.partsTotal}</p>
//     <p>Service Charge: ₹ {singleService?.serviceCharge}</p>
//     <p className="font-bold text-lg">
//       Grand Total: ₹ {singleService?.grandTotal}
//     </p>
//   </div>
// </div>
//           </div>
//         </div>
//       </div>
//     </div>


//   )
// }

// export default ServiceDetails ;