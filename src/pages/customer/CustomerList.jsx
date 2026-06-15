// this is latesst working



// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Paper,
//   TableContainer,
//   IconButton,
//   Tooltip,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import HistoryIcon from '@mui/icons-material/History';
// import { useDispatch, useSelector } from "react-redux";
// import { statusCustomer, ViewCustomer } from "../../features/customer/customerThunk";
// import { Switch } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import Pagination from "@mui/material/Pagination";
// import AssignmentIcon from '@mui/icons-material/Assignment';
// import { lime } from "@mui/material/colors";
// import Button from "../../component/commonButton";
// import AddIcon from "@mui/icons-material/Add";
// function CustomerList() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [search, setSearch] = useState();
//   const [status, setStatus] = useState();
//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [sortBy, setSortBy] = useState('createdAt');
//   const [sortOrder, setSortOrder] = useState('desc');
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const FILE_BASE_URL = import.meta.env.VITE_API_URL.split("/api")[0];
//   console.log(FILE_BASE_URL, "file base url");

//   const { customers, loading, error } = useSelector(
//     (state) => state.customer
//   );
//   // console.log(customers,"my customer data is here shoq");

//   // ✅ handle both API shapes
//   const AllCustomer = Array.isArray(customers)
//     ? customers
//     : customers?.data || [];
//   console.log(customers,"my customr data");
//   // console.log(AllCustomer.deviceImage);

// const {user}=useSelector((state)=>state.auth);
// const Role=user?.role

// // console.log(user,"mu su user");
// // console.log(Role,"Role mu su user");



//   // here searching operaion perform
//   useEffect(() => {
//     dispatch(ViewCustomer({ search, status, minPrice, maxPrice, startDate, endDate, sortBy, sortOrder, page, limit }));
//   }, [dispatch, search, status, maxPrice, minPrice, startDate, endDate, sortOrder, sortBy, page, limit]);


//   const customerHead = [
//     { label: "S.N", field: null },
//     { label: "Name", field: "name" },
//     { label: "Phone", field: "phone" },
//     { label: "Address", field: "address" },
//     { label: "Device", field: "deviceName" },
//     { label: "Price", field: "devicePrice" },
//     { label: "Problem Description", field: "problemDescription" },
//     { label: "Purchase Bill", field: "purchaseBill" },
//     { label: "Device Image", field: "deviceImage" },
//     { label: "Status", field: "isActive" },
//     { label: "Date", field: "createdAt" },
//     { label: "Updated At", field: "updatedAt" },
//     { label: "Action", field: null },
//   ];

//   const handleToggle = async (id, currentStatus) => {
//     console.log(id, "my original id for each rows.");
//     try {
//       await dispatch(
//         statusCustomer({
//           id,
//           data: { isActive: !currentStatus },
//         })
//       );
//     } catch (error) {
//       console.error("Status update failed", error);
//     }
//   };

//   const handleEdit = (id) => {
//     console.log(id, "my id");
//     navigate(`/edit-cutomer/${id}`)
//   }
//   const handleAdd = () => {
//     navigate('/add-cutomer')
//   }

//   // sorting


//   const handleSort = (field, order) => {
//     if (!field) return;

//     setSortBy(field)
//     setSortOrder(order);
//   }


//   // histoty button

//   const handleHistory = (userId) => {
//     // console.log("USER:", userId);
//   // console.log("TICKET:", ticketId); // 👈 must not be undefined

//   navigate(`/customer-history/${userId}`);
// };


// //   const handleViewStatus = (userId) => {
// //     console.log(userId,"user id");
// //   navigate(`/status-stepper/${userId}`);
// // };




//   const handleViewStatus = (userId,ticketId) => {
//     // console.log(ticketId,"ticketId id");
//     // console.log("USER:", userId);
//   // console.log("TICKET:", ticketId); // 👈 must not be undefined
//   navigate(`/status-stepper/${userId}/${ticketId}`);
// };

//   return (
//     <div style={{ padding: 20 }}>
//       {Role==='customer'&&(
//         <>
//        <Button
//   text="Add Customer"
//   onClick={handleAdd}
//   icon={<AddIcon />}
// />
//         </>
//       )}

//       <h2 className="p-2 text-2xl text-black">Customer List</h2>

//       {loading && <p>Loading...</p>}
//       {error && (
//         <p style={{ color: "red" }}>
//           {error.message || error}
//         </p>
//       )}
//       <div>

//         {/*searching fields */}
//         <input
//           placeholder="Searching......"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="p-2 border border-black m-2"
//         />
//         {/* status  */}
//         <select
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//           className="p-2 border border-black m-2 ml-2"

//         >
//           <option value="">All</option>
//           <option value="true">Active</option>
//           <option value="false">Inactive</option>
//         </select>


//         {/* filter apply for price */}
//         <input
//           // value={minPrice}
//           type="number"
//           placeholder="Enter Minimum Price"
//           onChange={(e) => setMinPrice(e.target.value)}
//           className="p-2 border border-black m-2 ml-2"

//         />
//         <input
//           type="number"
//           // value={maxPrice}
//           placeholder="Enter Maximum Price"
//           onChange={(e) => setMaxPrice(e.target.value)}
//           className="p-2 border border-black m-2 ml-2"

//         />
//         {/* filter apply for start and end date */}
//         <label>Start Date</label>
//         <input
//           type="date"
//           className="p-2 border border-black m-2 ml-2"
//           onChange={(e) => setStartDate(e.target.value)}
//         />
//         <label>End Date</label>
//         <input
//           type="date"
//           onChange={(e) => setEndDate(e.target.value)}
//           className="p-2 border border-black m-2 ml-2"

//         />

//         {/* pagination limit */}
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
//       </div>
//       <TableContainer
//         component={Paper}
//         sx={{
//           maxHeight: 520,
//           borderRadius: 2,
//         }}
//       >
//         <Table stickyHeader>

//           {/* ✅ Highlighted header */}
//           <TableHead>
//             <TableRow>
//               {customerHead.map((val, index) => (
//                 <TableCell
//                   key={index}
//                   sx={{
//                     fontWeight: "bold",
//                     backgroundColor: "#1976d2",
//                     color: "#fff",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   <ArrowDropUpIcon sx={{ cursor: "pointer" }} onClick={() => handleSort(val.field, "asc")} />
//                   <ArrowDropDownIcon sx={{ cursor: "pointer" }} onClick={() => handleSort(val.field, "desc")} />
//                   {val.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {AllCustomer.length === 0 && !loading && (
//               <TableRow>
//                 <TableCell colSpan={11} align="center">
//                   No customer found
//                 </TableCell>
//               </TableRow>
//             )}

//             {AllCustomer.map((customer, index) => (

//               <TableRow
//                 key={customer._id || index}
//                 hover
//               >
//                 <TableCell>{index + 1}</TableCell>
//                 <TableCell>{customer.userId?.name}</TableCell>
//                 <TableCell>{customer.phone}</TableCell>
//                 <TableCell>{customer.address}</TableCell>
//                 <TableCell>{customer.deviceName}</TableCell>
//                 <TableCell>₹ {customer.devicePrice}</TableCell>
//                 <TableCell> {customer.problemDescription}</TableCell>
// {/* Purchase Bill */}
//                 <TableCell>
//                   {customer.purchaseBill ? (
//                     <a
//   href={customer.purchaseBill}
//   target="_blank"
//   rel="noreferrer"
// >
//   View
// </a>
//                   ) : (
//                     "N/A"
//                   )}
//                 </TableCell>


//                 {/* Device Image */}
//                 <TableCell>
//                   {customer.deviceImage ? (
//                     <img
//   src={customer.deviceImage}
//   alt="device"
//   style={{
//     width: 45,
//     height: 45,
//     objectFit: "cover",
//     borderRadius: 4,
//   }}
// />
//                   ) : (
//                     "N/A"
//                   )}
//                 </TableCell>

//                 {/* Status */}
//                 <TableCell>
//                   <Switch
//                     checked={customer.isActive}
//                     onChange={() => handleToggle(customer._id, customer.isActive)}
//                     color="primary"
//                   />
//                 </TableCell>

//                 <TableCell>
//                   {customer.createdAt
//                     ? new Date(customer.createdAt).toLocaleDateString()
//                     : "-"}
//                 </TableCell>

//                 <TableCell>
//                   {customer.updatedAt
//                     ? new Date(customer.updatedAt).toLocaleDateString()
//                     : "-"}
//                 </TableCell>

//                 {/* ✅ Action column */}
//                 <TableCell>
//                   <Tooltip title="Edit">
//                     <IconButton
//                       size="small"
//                       onClick={() => handleEdit(customer._id)}

//                     >
//                       <EditIcon fontSize="small" />
//                     </IconButton>
//                   </Tooltip>
//  <Tooltip title="History">
//     <IconButton
//       color="primary"
//       // onClick={() => handleHistory(customer.userId?._id)}
//             onClick={() => handleHistory(customer.userId?._id)}

//     >
//       <HistoryIcon fontSize="small" />
//     </IconButton>
//   </Tooltip>


//   <Tooltip title="View Status">
//     <IconButton
//       color="primary"
//       onClick={() => handleViewStatus(customer.userId?._id,customer?._id)}
//     >
//       <AssignmentIcon fontSize="small" />
//     </IconButton>
//   </Tooltip>
//                   {/* <Tooltip title="Delete">
//                     <IconButton
//                       size="small"
//                       color="error"
//                       onClick={() => {
//                         console.log("Delete:", customer._id);
//                       }}
//                     >
//                       <DeleteIcon fontSize="small" />
//                     </IconButton>
//                   </Tooltip> */}
//                 </TableCell>

//               </TableRow>
//             ))}
//           </TableBody>

//         </Table>

//       </TableContainer>
//       {/* <button
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
//       </button> */}


//       <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "20px" }}>

//   <button
//     disabled={page === 1}
//     onClick={() => setPage(page - 1)}
//     style={{
//       padding: "8px 16px",
//       backgroundColor: page === 1 ? "#ccc" : "#1976d2",
//       color: "#fff",
//       border: "none",
//       borderRadius: "5px",
//       cursor: page === 1 ? "not-allowed" : "pointer",
//       fontWeight: "bold"
//     }}
//   >
//     Prev
//   </button>

//   <span style={{ fontWeight: "bold", fontSize: "16px" }}>
//     Page {page}
//   </span>

//   <button
//     onClick={() => setPage(page + 1)}
//     style={{
//       padding: "8px 16px",
//       backgroundColor: "#1976d2",
//       color: "#fff",
//       border: "none",
//       borderRadius: "5px",
//       cursor: "pointer",
//       fontWeight: "bold"
//     }}
//   >
//     Next
//   </button>

// </div>
//     </div>
//   );
// }

// export default CustomerList;









import React, { useEffect, useState } from "react";
import {
  TableRow,
  TableCell,
  Paper,
  TableContainer,
  IconButton,
  Tooltip,
  Switch,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import HistoryIcon from "@mui/icons-material/History";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import { useDispatch, useSelector } from "react-redux";
import { deleteCustomer, statusCustomer, ViewCustomer } from "../../features/customer/customerThunk";
import { useNavigate } from "react-router-dom";

import CommonTable from "../../component/commonTable";
import CommonFilters from "../../component/commonFilter";
import Pagination from "../../component/Pagination";
import Button from "../../component/commonButton";
import InputField from "../../component/InputField";

import { customerHead } from "../../component/tableHeader";
import { customerStatusOptions } from "../../component/commnonDropdown";
import SearchBar from "../../component/searchBar";
import { showLoader ,hideLoader, showSuccess, showError,confirmAction} from "../../component/swalLoader";

function CustomerList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ states
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [debouncedMinPrice, setDebouncedMinPrice] = useState(minPrice);
  const [debouncedMaxPrice, setDebouncedMaxPrice] = useState(maxPrice);

  const { customers, loading, pagination } = useSelector((state) => state.customer);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setDebouncedMinPrice(minPrice);   // ✅ correct
      setDebouncedMaxPrice(maxPrice);   // ✅ correct
    }, 700);

    return () => clearTimeout(timer);
  }, [search, minPrice, maxPrice]); // ✅ include all

  const Role = user?.role;
  // const AllCustomer = customers?.data || [];
  // const AllCustomer = customers?.data;.
  const AllCustomer = customers || [];
  // ✅ API Call (FIXED: minPrice & maxPrice added)
  useEffect(() => {
    // console.log(AllCustomer, "all customer");

    dispatch(
      ViewCustomer({
        search: debouncedSearch,
        status,
        startDate,
        endDate,
        minPrice: debouncedMinPrice,   // ✅ use debounced
        maxPrice: debouncedMaxPrice,   // ✅ use debounced
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
    status,
    startDate,
    endDate,
    sortBy,
    sortOrder,
    page,
    limit,
  ]);
  // ✅ handlers
  const handleEdit = (id) => navigate(`/edit-cutomer/${id}`);
  const handleAdd = () => navigate("/add-cutomer");

  const handleToggle = async (id, currentStatus) => {
    try {
      await dispatch(
        statusCustomer({
          id,
          data: { isActive: !currentStatus },
        })
      );
    } catch (error) {
      console.error("Status update failed", error);
    }
  };

  const handleHistory = (userId) => {
    // console.log(userId,"user id");
    navigate(`/customer-history/${userId}`);
  };

  const handleViewStatus = (userId, ticketId) => {
    navigate(`/status-stepper/${userId}/${ticketId}`);
  };

  const handleSort = (field, order) => {
    setSortBy(field);
    setSortOrder(order);
  };

const handleDelete = async (id) => {
  const confirm = await confirmAction("Delete this customer?");
  if (!confirm) return;

  try {
    showLoader("Deleting Customer...");

    await dispatch(deleteCustomer({ id })).unwrap();

    hideLoader();
    showSuccess("Customer deleted successfully");
  } catch (err) {
    hideLoader();
    showError(err || "Delete failed");
  }
};
  useEffect(() => {
    setPage(1);
  }, [
    debouncedSearch,
    debouncedMinPrice,
    debouncedMaxPrice,
    status,
    startDate,
    endDate,
    sortBy,
    sortOrder,
  ]);
  return (
    <div style={{ padding: 20 }}>
      <h2 className="p-2 text-2xl">Customer List</h2>

      <div className="flex items-center justify-between gap-3 mb-4">

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        {Role === "customer" && (
          <Button
            text="Add Customer"
            onClick={handleAdd}
            icon={<AddIcon />}
            className="whitespace-nowrap"
          />
        )}

      </div>

      {/* ✅ Common Filters */}
      <CommonFilters
        status={status}
        setStatus={setStatus}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        limit={limit}
        setLimit={setLimit}
        statusOptions={customerStatusOptions}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
      />

      {/* ✅ Price Filters */}
      {/* <div className="flex gap-3 my-3">
        <InputField
          value={minPrice}
          type="number"
          placeholder="Min Price"
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <InputField
          value={maxPrice}
          type="number"
          placeholder="Max Price"
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div> */}

      {/* ✅ Table */}
      <TableContainer component={Paper} sx={{ maxHeight: 520, borderRadius: 2, marginTop: 2 }}>
        <CommonTable
          columns={customerHead}
          data={AllCustomer}
          loading={loading}
          onSort={handleSort}
          renderRow={(customer, index) => (
            <TableRow key={customer._id || index} hover>

              <TableCell>{index + 1}</TableCell>
              <TableCell>{customer.userId?.name}</TableCell>
              <TableCell>{customer.phone}</TableCell>
              <TableCell>{customer.address}</TableCell>
              <TableCell>{customer.deviceName}</TableCell>
              <TableCell>₹ {customer.devicePrice}</TableCell>
              <TableCell>{customer.problemDescription}</TableCell>

              {/* Bill */}
              <TableCell>
                {customer.purchaseBill ? (
                  <a href={customer.purchaseBill} target="_blank" rel="noreferrer">
                    View
                  </a>
                ) : "N/A"}
              </TableCell>

              {/* Image */}
              <TableCell>
                {customer.deviceImage ? (
                  <img
                    src={customer.deviceImage}
                    alt="device"
                    style={{
                      width: 45,
                      height: 45,
                      objectFit: "cover",
                      borderRadius: 4,
                    }}
                  />
                ) : "N/A"}
              </TableCell>

              {/* Status */}
              <TableCell>
                <Switch
                  checked={customer.isActive}
                  onChange={() =>
                    handleToggle(customer._id, customer.isActive)
                  }
                />
              </TableCell>

              <TableCell>
                {new Date(customer.createdAt).toLocaleDateString()}
              </TableCell>

              <TableCell>
                {new Date(customer.updatedAt).toLocaleDateString()}
              </TableCell>

              {/* Actions */}
              <TableCell>
                <div className="flex gap-2">

                  <Tooltip title="Edit">
                    <IconButton color="primary" onClick={() => handleEdit(customer._id)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
<Tooltip title="Delete">

  <IconButton onClick={() => handleDelete(customer._id)} color="error">
    <DeleteIcon />
  </IconButton>
</Tooltip>
                  <Tooltip title="History">
                    <IconButton
                      onClick={() => handleHistory(customer.userId?._id)}
                      sx={{
                        color: "#6b7280", // gray-500
                        "&:hover": { backgroundColor: "#e5e7eb" }, // gray-200
                      }}
                    >
                      <HistoryIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Status">
                    <IconButton
                      onClick={() =>
                        handleViewStatus(customer.userId?._id, customer._id)
                      }
                      sx={{
                        color: "#f59e0b", // amber-500
                        "&:hover": { backgroundColor: "#fef3c7" }, // amber-100
                      }}
                    >
                      <AssignmentIcon />
                    </IconButton>
                  </Tooltip>

                </div>
              </TableCell>

            </TableRow>
          )}
        />
      </TableContainer>

      {/* ✅ Pagination */}
      <Pagination
        page={page}
        limit={limit}
        totalCount={pagination?.totalRecords || 0}
        onPageChange={(newPage) => setPage(newPage)}
      />

    </div>
  );
}

export default CustomerList;





// here seaching , sorting and filtering operations





// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Paper,
//   TableContainer,
//   IconButton,
//   Tooltip,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
// import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
// import { useDispatch, useSelector } from "react-redux";
// import { CustomerFilter, CustomerPagination, CustomerSeaching, Customersort, statusCustomer, ViewCustomer } from "../../features/customer/customerThunk";
// import { Switch } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// function CustomerList() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [sort, setSort] = useState("");
//   const [page, setPage] = useState(1);
// const limit = 10;
//   const [search, setSearch] = useState('')
//   const [filter, setFilter] = useState('')
//   const [sortField, setSortField] = useState("");
//   const [sortOrder, setSortOrder] = useState("");
//   const FILE_BASE_URL = import.meta.env.VITE_API_URL.split("/api")[0];
//   console.log(FILE_BASE_URL, "file base url");
//   const { customers, loading, error ,pagination} = useSelector(
//     (state) => state.customer
//   );

//   // ✅ handle both API shapes
//   const AllCustomer = Array.isArray(customers)
//     ? customers
//     : customers?.data || [];
//   // console.log(AllCustomer);
//   // console.log(AllCustomer.deviceImage);


//   // useEffect(() => {
//   //   dispatch(ViewCustomer());
//   // }, [dispatch]);

//   const customerHead = [
//     "S.N",
//     "Name",
//     "Phone",
//     "Address",
//     "Device Name",
//     "Device Price",
//     "Purchase Bill",
//     "Device Image",
//     "Status",
//     "Created At",
//     "Updated At",
//     "Action",
//   ];
//   const handleToggle = async (id, currentStatus) => {
//     console.log(id, "my original id for each rows.");
//     try {
//       await dispatch(
//         statusCustomer({
//           id,
//           data: { isActive: !currentStatus },
//         })
//       );
//     } catch (error) {
//       console.error("Status update failed", error);
//     }
//   };

//   const handleEdit = (id) => {
//     console.log(id, "my id");
//     navigate(`/add-cutomer/${id}`)
//   }
//   const handleAdd = () => {
//     navigate('/add-cutomer')
//   }
//  useEffect(() => {
//   if (search.trim() !== "") {
//     setPage(1);
//     dispatch(CustomerSeaching({ search, page: 1, limit }));
//   }
// }, [search, dispatch]);


//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (filter !== "") {
//         // dispatch(CustomerFilter(filter));
//         dispatch(CustomerFilter({ devicePrice: filter, page, limit }));

//       }
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [filter, dispatch]);



//   // sorting


//   const handleSort = (field, order) => {
//     setSortField(field);
//     setSortOrder(order);

//     dispatch(Customersort({ sortBy: field, order,page, limit }));
//   };


//   // pagination


//   useEffect(() => {
//   dispatch(CustomerPagination({ page, limit }));
// }, [page, dispatch]);

//   return (
//     <div style={{ padding: 20 }}>
//       <button className="p-2 m-2 bg-blue-300" onClick={handleAdd}>add Customer</button>
//       <h2 className="p-2 text-2xl text-black">Customer List</h2>

//       {loading && <p>Loading...</p>}
//       {error && (
//         <p style={{ color: "red" }}>
//           {error.message || error}
//         </p>
//       )}

//       <div className="flex justify-end mb-5">
//         <input
//           placeholder="filter apply for device price"
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//           type="number"

//           className="
//       w-72
//       px-4 py-2
//       text-sm
//       border border-gray-300
//       rounded-full
//       outline-none
//       bg-gray-50
//       focus:bg-white
//       focus:border-blue-500
//       focus:ring-2 focus:ring-blue-200
//       transition duration-300
//     "
//         />

//       </div>
//       <div className="flex justify-start mb-5">
//         <input
//           type="text"
//           placeholder="Search customers..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="
//       w-72
//       px-4 py-2
//       text-sm
//       border border-gray-300
//       rounded-full
//       outline-none
//       bg-gray-50
//       focus:bg-white
//       focus:border-blue-500
//       focus:ring-2 focus:ring-blue-200
//       transition duration-300
//     "
//         />
//       </div>
//       <TableContainer
//         component={Paper}
//         sx={{
//           maxHeight: 520,
//           borderRadius: 2,
//         }}
//       >
//         <Table stickyHeader>

//           {/* ✅ Highlighted header */}
//           {/* <TableHead>
//             <TableRow>
//               {customerHead.map((val, index) => (
//                 <TableCell
//                   key={index}
//                   sx={{
//                     fontWeight: "bold",
//                     backgroundColor: "#1976d2",
//                     color: "#fff",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   {val}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead> */}
//           <TableHead>
//             <TableRow>
//               {customerHead.map((val, index) => {
//                 let field = "";

//                 if (val === "Name") field = "name";
//                 if (val === "Device Price") field = "devicePrice";
//                 if (val === "Address") field = "address";
//                 if (val === "Phone") field = "phone";
//                 if (val === "Device Name") field = "deviceName";
//                 if (val === "Created At") field = "createdAt";
//                 if (val === "Updated At") field = "updatedAt";

//                 return (
//                   <TableCell
//                     key={index}
//                     sx={{
//                       fontWeight: "bold",
//                       backgroundColor: "#1976d2",
//                       color: "#fff",
//                       whiteSpace: "nowrap",
//                       cursor: field ? "pointer" : "default",
//                     }}
//                   >
//                     <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
//                       {val}

//                       {field && (
//                         <>
//                           {/* Ascending */}
//                           <span
//                             style={{
//                               opacity:
//                                 sortField === field && sortOrder === "asc" ? 1 : 0.4,
//                             }}
//                             onClick={() => handleSort(field, "asc")}
//                           >
//                             <ArrowUpwardIcon />
//                           </span>

//                           <span
//                             style={{
//                               opacity:
//                                 sortField === field && sortOrder === "desc" ? 1 : 0.4,
//                             }}
//                             onClick={() => handleSort(field, "desc")}
//                           >
//                             <ArrowDownwardIcon />
//                           </span>
//                         </>
//                       )}
//                     </div>
//                   </TableCell>
//                 );
//               })}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {AllCustomer.length === 0 && !loading && (
//               <TableRow>
//                 <TableCell colSpan={11} align="center">
//                   No customer found
//                 </TableCell>
//               </TableRow>
//             )}

//             {AllCustomer.map((customer, index) => (

//               <TableRow
//                 key={customer._id || index}
//                 hover
//               >
//                 <TableCell>{index + 1}</TableCell>
//                 <TableCell>{customer.name}</TableCell>
//                 <TableCell>{customer.phone}</TableCell>
//                 <TableCell>{customer.address}</TableCell>
//                 <TableCell>{customer.deviceName}</TableCell>
//                 <TableCell>₹ {customer.devicePrice}</TableCell>

//                 {/* Purchase Bill */}
//                 <TableCell>
//                   {customer.purchaseBill ? (
//                     <a
//                       href={`${FILE_BASE_URL}/uploads/${customer.purchaseBill}`}
//                       target="_blank"
//                       rel="noreferrer"
//                     >
//                       View
//                     </a>
//                   ) : (
//                     "N/A"
//                   )}
//                 </TableCell>


//                 {/* Device Image */}
//                 <TableCell>
//                   {customer.deviceImage ? (
//                     <img
//                       src={`${FILE_BASE_URL}/uploads/${customer.deviceImage}`}
//                       alt="device"
//                       style={{
//                         width: 45,
//                         height: 45,
//                         objectFit: "cover",
//                         borderRadius: 4,
//                       }}
//                     />
//                   ) : (
//                     "N/A"
//                   )}
//                 </TableCell>


//                 {/* Status */}
//                 <TableCell>
//                   <Switch
//                     checked={customer.isActive}
//                     onChange={() => handleToggle(customer._id, customer.isActive)}
//                     color="primary"
//                   />
//                 </TableCell>

//                 <TableCell>
//                   {customer.createdAt
//                     ? new Date(customer.createdAt).toLocaleDateString()
//                     : "-"}
//                 </TableCell>

//                 <TableCell>
//                   {customer.updatedAt
//                     ? new Date(customer.updatedAt).toLocaleDateString()
//                     : "-"}
//                 </TableCell>

//                 {/* ✅ Action column */}
//                 <TableCell>
//                   <Tooltip title="Edit">
//                     <IconButton
//                       size="small"
//                       onClick={() => handleEdit(customer._id)}

//                     >
//                       <EditIcon fontSize="small" />
//                     </IconButton>
//                   </Tooltip>

//                   {/* <Tooltip title="Delete">
//                     <IconButton
//                       size="small"
//                       color="error"
//                       onClick={() => {
//                         console.log("Delete:", customer._id);
//                       }}
//                     >
//                       <DeleteIcon fontSize="small" />
//                     </IconButton>
//                   </Tooltip> */}
//                 </TableCell>
//               </TableRow>
//             ))}

//           </TableBody>

//         </Table>

//       </TableContainer>
// <div className="flex justify-end items-center gap-3 mt-4">

//   <button
//     disabled={page === 1}
//     onClick={() => setPage((p) => p - 1)}
//     className="px-3 py-1 border rounded disabled:opacity-50"
//   >
//     Prev
//   </button>

//   <span>
//     Page {pagination?.page} of {pagination?.totalPages}
//   </span>

//   <button
//     disabled={page === pagination?.totalPages}
//     onClick={() => setPage((p) => p + 1)}
//     className="px-3 py-1 border rounded disabled:opacity-50"
//   >
//     Next
//   </button>

// </div>

//     </div>
//   );
// }

// export default CustomerList;
