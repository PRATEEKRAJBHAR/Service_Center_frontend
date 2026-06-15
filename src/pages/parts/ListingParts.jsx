// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteParts, getParts } from "../../features/parts/partThunk";
// import { useNavigate } from "react-router-dom";
// import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import Button from "../../component/commonButton";
// import AddIcon from "@mui/icons-material/Add";

// function ListingParts() {
//   const [search, setSearch] = useState('');
//   const [minPrice, setMinPrice] = useState('');
//   const [maxPrice, setMaxPrice] = useState('');
//   const [sortBy, setSortBy] = useState('createdAt');
//   const [sortOrder, setSortOrder] = useState('desc');
//    const [page, setPage] = useState(1);
//     const [limit, setLimit] = useState(10);
//   const { parts } = useSelector((state) => state.parts);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   useEffect(() => {
//     dispatch(getParts({ search, minPrice, maxPrice, sortBy, sortOrder,page,limit }))
//   }, [dispatch, search, minPrice, maxPrice, sortBy, sortOrder,page,limit])



//   const partsHead = [
//     { label: "S.N", field: null },
//     { label: "Part Name", field: "partName" },
//     { label: "Stock", field: "stock" },
//     { label: "Per Unit Price", field: "price" },
//     { label: "Action", field: null },
//   ];

//   //   edit button

//   const handleEdit = (id) => {
//     navigate(`/parts/${id}`)
//   }


//   // delete


//   const handleDelete = (id) => {
//     dispatch(deleteParts({ id }))
//   }


//   useEffect(() => {
//     dispatch(deleteParts())
//   }, [dispatch])

//   const handleAdd = () => {
//     navigate('/parts')
//   }


//   // sorting

//   const handleSort = (field, order) => {
//     if (!field) return;
//     setSortBy(field);
//     setSortOrder(order)
//   }
//   return (
//     <div className="p-6">
//       <div className="bg-white shadow-lg rounded-xl overflow-hidden">
//         {/* <div> */}
//           {/* <button
//             onClick={handleAdd}
//             //     onClick={()=>navigate('/parts')}
//             className="m-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
//           >+ Add Part</button>
//         </div> */}.


//         <div>

//        <Button
//   text="Add Parts"
//   onClick={handleAdd}
//   icon={<AddIcon />}
// />
//         </div>
//         {/* searching */}
//         <div>
//           <input
//             placeholder="Searching..."
//             onChange={(e) => setSearch(e.target.value)}
//             className="border border-black p-2 m-2"
//           />

//           {/* filter apply on price */}

//           <input
//             placeholder="enter minimum price"
//             onChange={(e) => setMinPrice(e.target.value)}
//             className="border border-black p-2 m-2"
//           />

//           <input
//             placeholder="enter maximum price"
//             onChange={(e) => setMaxPrice(e.target.value)}
//             className="border border-black p-2 m-2"
//           />


//   {/* pagination limit */}
//         <label>Pagination</label>

//         <select
//           value={limit}
//           onChange={(e) => {
//             setLimit(e.target.value);
//             setPage(1);
//           }}
//           className="p-2 border border-black m-2 ml-2"

//         >
//           <option value="5">5</option>
//           <option value="10">10</option>
//           <option value="20">20</option>
//         </select>
//         </div>
//         {/* Title */}
//         <div className="bg-blue-600 text-white px-6 py-4 text-lg font-semibold">
//           Parts Listing
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">

//             {/* Table Head */}
//             <thead className="bg-gray-100">
//               <tr>
//                 {partsHead.map((head, index) => (
//                   <th
//                     key={index}
//                     className="px-6 py-3 text-sm font-semibold text-gray-600 uppercase tracking-wider"
//                   >
//                     {head.field && (
//                       <>
//                         <ArrowDropUpIcon
//                           className="cursor-pointer inline"
//                           onClick={() => handleSort(head.field, "asc")}
//                         />

//                         <ArrowDropDownIcon
//                           className="cursor-pointer inline"
//                           onClick={() => handleSort(head.field, "desc")}
//                         />
//                       </>
//                     )}

//                     {head.label}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             {/* Table Body */}
//             <tbody className="divide-y divide-gray-200">
//               {parts && parts.length > 0 ? (
//                 parts.map((part, index) => (
//                   <tr
//                     key={part._id || index}
//                     className="hover:bg-gray-50 transition duration-200"
//                   >
//                     <td className="px-6 py-4">{index + 1}</td>
//                     <td className="px-6 py-4 font-medium text-gray-800">
//                       {part.partName}
//                     </td>
//                     <td className="px-6 py-4">{part.stock}</td>
//                     <td className="px-6 py-4 text-green-600 font-semibold">
//                       ₹ {part.price}
//                     </td>
//                     <td className="px-6 py-4">
//                       <button onClick={() => handleEdit(part._id)} className="bg-blue-500  text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition">
//                         Edit
//                       </button>
//                       <button onClick={() => handleDelete(part._id)} className="bg-red-500 ml-3 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition">
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan="5"
//                     className="text-center py-6 text-gray-500"
//                   >
//                     No Parts Available
//                   </td>
//                 </tr>
//               )}
//             </tbody>

//           </table>
//         </div>
//       </div>
//       {/* pagination */}
//       <button
//         disabled={page === 1}
//         onClick={() => setPage(page - 1)}
//         className="border border-black bg-gray-300"
//       >
//         Prev
//       </button>

//       <span>Page {page}</span>

//       <button
//         onClick={() => setPage(page + 1)}
//                 className="border border-black bg-gray-500"

//       >
//         Next
//       </button>
//     </div>
//   );
// }

// export default ListingParts;


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteParts, getParts } from "../../features/parts/partThunk";
import { useNavigate } from "react-router-dom";

import {
  TableRow,
  TableCell,
  IconButton,
  Paper,
  TableContainer,
  Tooltip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import CommonTable from "../../component/commonTable";
import CommonFilters from "../../component/commonFilter";
import Pagination from "../../component/Pagination";
import Button from "../../component/commonButton";
import InputField from "../../component/InputField";
import { showLoader ,hideLoader, showSuccess, showError,confirmAction} from "../../component/swalLoader";
import SearchBar from "../../component/searchBar";

function ListingParts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ STATES
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // ✅ DEBOUNCED STATES
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [debouncedMinPrice, setDebouncedMinPrice] = useState("");
  const [debouncedMaxPrice, setDebouncedMaxPrice] = useState("");

  const { parts, loading,pagination } = useSelector((state) => state.parts);
console.log(parts,'my parts');
  // ✅ DEBOUNCE ALL FILTERS
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setDebouncedMinPrice(minPrice);
      setDebouncedMaxPrice(maxPrice);
    }, 1000);

    return () => clearTimeout(timer);
  }, [search, minPrice, maxPrice]); // ✅ FIXED

  // ✅ API CALL (ONLY DEBOUNCED VALUES)
  useEffect(() => {
    dispatch(
      getParts({
        search: debouncedSearch,
        minPrice: debouncedMinPrice,
        maxPrice: debouncedMaxPrice,
        sortBy,
        sortOrder,
        page,
        limit,
      })
    );
  }, [
    dispatch,
    debouncedSearch,
    debouncedMinPrice,
    debouncedMaxPrice,
    sortBy,
    sortOrder,
    page,
    limit,
  ]); // ✅ FIXED
useEffect(() => {
  setPage(1);
}, [
  debouncedSearch,
  debouncedMinPrice,
  debouncedMaxPrice,
  sortBy,
  sortOrder,
]);
  // ✅ TABLE HEADERS
  const partsColumns = [
    { label: "S.N", field: null },
    { label: "Part Name", field: "partName" },
    { label: "Stock", field: "stock" },
    { label: "Price", field: "price" },
    { label: "Action", field: null },
  ];

  // ✅ ACTIONS
  const handleEdit = (id) => {
    navigate(`/parts/${id}`);
  };
const handleDelete = async (id) => {
  const confirm = await confirmAction("Delete this part?");
  if (!confirm) return;

  try {
    showLoader("Deleting Part...");

    await dispatch(deleteParts({ id })).unwrap();

    hideLoader();
    showSuccess("Part deleted successfully");

  } catch (err) {
    hideLoader();
    showError(err?.message || "Delete failed");
  }
};
  const handleAdd = () => {
    navigate("/add-parts");
  };

  const handleSort = (field, order) => {
    if (!field) return;
    setSortBy(field);
    setSortOrder(order);
  };

  const allParts = parts?.data || parts || [];
//
// const allParts = parts?.data || [];
  return (
    <div style={{ padding: 20 }}>
      {/* TOP BAR */}
        {/* <Button text="Add Part" onClick={handleAdd} icon={<AddIcon />} /> */}

        <h2 className="p-2 text-2xl text-black">Parts List</h2>
        <div className="flex items-center justify-between gap-3 mb-4">

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

<Button
  text="Add Parts"
  onClick={handleAdd}
  icon={<AddIcon />}
/>


      </div>


      {/* ✅ COMMON FILTER */}
      <CommonFilters
  limit={limit}
  setLimit={setLimit}
  showStatus={false}
  showDate={false}
  showPrice={true}
  minPrice={minPrice}
  setMinPrice={setMinPrice}
  maxPrice={maxPrice}
  setMaxPrice={setMaxPrice}
/>
      {/* ✅ PRICE FILTER */}
      {/* <div className="flex gap-3 mb-4">
        <InputField
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <InputField
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div> */}

      {/* TABLE */}
      <TableContainer component={Paper} sx={{ maxHeight: 520,  marginTop:2}}>
        <CommonTable
          columns={partsColumns}
          data={allParts}
          loading={loading}
          onSort={handleSort}
          renderRow={(part, index) => (
            <TableRow key={part._id || index} hover>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{part.partName}</TableCell>
              <TableCell>{part.stock}</TableCell>
              <TableCell>₹ {part.price}</TableCell>

              <TableCell>
                <div className="flex gap-2">

                    <Tooltip title="Edit">

  <IconButton onClick={() => handleEdit(part._id)} color="primary">
    <EditIcon />
  </IconButton>
                  </Tooltip>
  <Tooltip title="Delete">

  <IconButton onClick={() => handleDelete(part._id)} color="error">
    <DeleteIcon />
  </IconButton>
</Tooltip>
</div>
              </TableCell>
            </TableRow>
          )}
        />
      </TableContainer>

      {/* PAGINATION */}
      {/* <Pagination
        page={page}
        limit={limit}
        // totalCount={parts?.totalCount || 0}
        totalCount={parts.pagination.totalRecords}
        onPageChange={(newPage) => setPage(newPage)}
      /> */}
<Pagination
        page={page}
        limit={limit}
totalCount={pagination?.totalRecords || 0}
        onPageChange={(newPage) => setPage(newPage)}
      />

{/*
      <Pagination
  page={page}
  limit={limit}
  totalCount={parts?.pagination?.totalRecords || 0}
  onPageChange={(newPage) => setPage(newPage)}
/> */}
    </div>
  );
}

export default ListingParts;