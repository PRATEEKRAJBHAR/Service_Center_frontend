// import React, { useEffect, useState } from "react";
// import {
//     Table,
//     TableHead,
//     TableRow,
//     TableCell,
//     TableBody,
//     Paper,
//     TableContainer,
//     IconButton,
//     Tooltip,
//     Checkbox,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import PreviewIcon from '@mui/icons-material/Preview';
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { assignTechnician, BulkStatus, ListingService, sendMail, updateStatus } from "../../features/service/serviceThunk";
// import { getTechnicians } from "../../features/auth/authThunk";
// import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import EmailIcon from '@mui/icons-material/Email';
// import Swal from "sweetalert2";

// function ServiceList() {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [oldStatus, setOldStatus] = React.useState("");
//     const [newStatus, setNewStatus] = React.useState("");
//     const [status, setStatus] = useState('')
//     const [search, setSearch] = useState('');
//     const [startDate, setStartDate] = useState('');
//     const [endDate, setEndDate] = useState('');
//     const [technician, setTechnician] = useState('');
//     const [sortBy, setSortBy] = useState('createdAt');
//     const [sortOrder, setSortOrder] = useState('desc');
//     const [page, setPage] = useState(1);
//     const [limit, setLimit] = useState(10);
//     useEffect(() => {
//         dispatch(ListingService({
//             search, status, startDate, endDate,
//             technician, sortBy, sortOrder, page, limit
//         }));
//     }, [dispatch, search, status, startDate, endDate, technician, sortBy, sortOrder, page, limit]);


//     const { services, loading, error } = useSelector(
//         (state) => state.service
//     );
//     // here assign technician

// // console.log(services,"servicesssfjhfdkjsdh");
//     // here fond user is which role technician

//     const { technicians } = useSelector(
//         (state) => state.auth
//     );
//     // console.log(technicians, "technicians");
//     useEffect(() => {
//         dispatch(getTechnicians()).then((res) => {
//             console.log("API Response:", res);
//         });
//     }, [dispatch]);
//     // ✅ handle both API shapes
//     const AllCustomer = Array.isArray(services)
//         ? services
//         : services?.data || [];
//     console.log(AllCustomer,"all custom");

//     const {user}=useSelector((state)=>state.auth);
//     const Role=user?.role;

//     const customerServiceHead = [
//         { label: "S.N", field: null },
//         { label: "Name", field: "customer.name" },
//         { label: "Phone", field: "customer.phone" },
//         { label: "Device", field: "customer.deviceName" },
//         { label: "Price", field: "customer.devicePrice" },
//         { label: "Problem Description", field: "problemDescription" },
//         { label: "Service Charge", field: "serviceCharge" },
//         { label: "Status", field: "status" },
//         { label: "Technician Assign", field: "technician.name" },
//         { label: "Date", field: "createdAt" },
//         { label: "Updated At", field: "updatedAt" },
//         { label: "Action", field: null },
//     ];


//     const handleEdit = (id) => {
//         // console.log(id, "my id");
//         navigate(`/edit-service/${id}`)
//     }


//     const handleAdd = () => {
//         navigate('/add-service')
//     }
//     const handleStatusChange = (id, status) => {
//         dispatch(updateStatus({ id, data: { status } }))
//             .unwrap()
//             .then(() => {
//                 // console.log("Updated successfully");
//                 dispatch(ListingService());
//             })
//             .catch((err) => {
//                 console.error(err);
//             });
//     };

//     const handleBulkUpdate = () => {
//         if (!oldStatus || !newStatus) {
//             alert("Please select both statuses");
//             return;
//         }

//         dispatch(
//             BulkStatus({
//                 oldStatus,
//                 newStatus,
//             })
//         )
//             .unwrap()
//             .then(() => {
//                 dispatch(ListingService());
//                 setOldStatus("");
//                 setNewStatus("");
//             })
//             .catch((err) => console.log(err));
//     };


//     // here view button

//     const handleView = (id) => {
//         // console.log(id, "my id");
//         navigate(`/service-details/${id}`)
//     }

//     // here sending mail operation


//     const handleSend = async (id) => {
//         Swal.fire({
//             title: "Sending Mail...",
//             text: "Please wait",
//             allowOutsideClick: false,
//             didOpen: () => {
//                 Swal.showLoading();
//             }
//         });

//         try {
//             await dispatch(sendMail(id)).unwrap();

//             Swal.fire({
//                 icon: "success",
//                 title: "Email Sent Successfully",
//             });
//         } catch (error) {
//             Swal.fire({
//                 icon: "error",
//                 title: "Email Failed",
//             });
//         }
//     };
//     // here technician assign
//     const handleTechnicianAssign = (id, technicianId) => {
//         dispatch(assignTechnician({ id, data: { technicianId } }))
//             .unwrap()
//             .then(() => {
//                 console.log("Technician assigned successfully");
//                 dispatch(ListingService());
//             })
//             .catch((err) => {
//                 console.error(err);
//             });
//     };




//     const handleSort = (field, order) => {
//         if (!field) return;

//         setSortBy(field)
//         setSortOrder(order);
//     }
//     return (
//         <div style={{ padding: 20 }}>
//             <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-6">

//                 {/* Left Side */}
//                 {Role=='admin'&&(
//                     <>
//                     <button
//                     onClick={handleAdd}
//                     className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
//                 >
//                     + Add Service
//                 </button>

//                     </>
//                 )}
//                 {/* Right Side */}
//                 <div className="flex items-center gap-3">

//                     <select
//                         value={oldStatus}
//                         onChange={(e) => setOldStatus(e.target.value)}
//                         className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                     >
//                         <option value="">Old Status</option>
//                         <option value="Pending">Pending</option>
//                         <option value="In Progress">In Progress</option>
//                         <option value="Completed">Completed</option>
//                     </select>

//                     <select
//                         value={newStatus}
//                         onChange={(e) => setNewStatus(e.target.value)}
//                         className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
//                     >
//                         <option value="">New Status</option>
//                         <option value="Pending">Pending</option>
//                         <option value="In Progress">In Progress</option>
//                         <option value="Completed">Completed</option>
//                     </select>

//                     <button
//                         onClick={handleBulkUpdate}
//                         disabled={!oldStatus || !newStatus}
//                         className={`px-4 py-2 text-white rounded-md transition
//                              ${!oldStatus || !newStatus
//                                 ? "bg-gray-400 cursor-not-allowed"
//                                 : "bg-green-500 hover:bg-green-600"}`}
//                     >
//                         Update
//                     </button>

//                 </div>
//             </div>


//             <h2 className="p-2 text-2xl text-black">Service List</h2>
//             {/* searching  */}
//             <div>
//                 <input
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                     className="border border-black p-2 m-2"
//                     placeholder="Searching...."
//                 />
//                 {/* status update */}
//                 <select
//                     value={status}
//                     onChange={(e) => setStatus(e.target.value)}
//                     className="border border-black p-2 m-2"
//                 >
//                     <option value="">All</option>
//                     <option value="Pending">Pending</option>
//                     <option value="In Progress">In Progress</option>
//                     <option value="Completed">Completed</option>
//                 </select>

//                 {/* filter apply for start and end date */}
//                 <label>Start Date</label>
//                 <input
//                     type="date"
//                     className="p-2 border border-black m-2 ml-2"
//                     onChange={(e) => setStartDate(e.target.value)}
//                 />
//                 <label>End Date</label>
//                 <input
//                     type="date"
//                     onChange={(e) => setEndDate(e.target.value)}
//                     className="p-2 border border-black m-2 ml-2"

//                 />
//                 {/* technician */}

//                 <select
//                     value={technician}
//                     onChange={(e) => setTechnician(e.target.value)}
//                     className="border border-black p-2 m-2"
//                 >
//                     <option value="">All Technician</option>

//                     {technicians?.map((tech) => (
//                         <option key={tech._id} value={tech._id}>
//                             {tech.name}
//                         </option>
//                     ))}

//                 </select>

//                 {/* pagination */}

//                 <select
//                     value={limit}
//                     onChange={(e) => setLimit(e.target.value)}
//                     className="p-2 border border-black m-2 ml-2"

//                 >
//                     <option value="5">5</option>
//                     <option value="10">10</option>
//                     <option value="20">20</option>
//                     <option value="30">30</option>
//                     <option value="100">100</option>

//                 </select>
//             </div>
//             {loading && <p>Loading...</p>}
//             {error && (
//                 <p style={{ color: "red" }}>
//                     {error.message || error}
//                 </p>
//             )}

//             <TableContainer
//                 component={Paper}
//                 sx={{
//                     maxHeight: 520,
//                     borderRadius: 2,
//                 }}
//             >
//                 <Table stickyHeader>

//                     {/* ✅ Highlighted header */}
//                     <TableHead>
//                         <TableRow>
//                             {customerServiceHead.map((val, index) => (
//                                 <TableCell
//                                     key={index}
//                                     sx={{
//                                         fontWeight: "bold",
//                                         backgroundColor: "#1976d2",
//                                         color: "#fff",
//                                         whiteSpace: "nowrap",
//                                     }}
//                                 >
//                                     <ArrowDropUpIcon sx={{ cursor: "pointer" }} onClick={() => handleSort(val.field, "asc")} />
//                                     <ArrowDropDownIcon sx={{ cursor: "pointer" }} onClick={() => handleSort(val.field, "desc")} />
//                                     {val.label}
//                                 </TableCell>
//                             ))}
//                         </TableRow>
//                     </TableHead>

//                     <TableBody>
//                         {AllCustomer.length === 0 && !loading && (
//                             <TableRow>
//                                 <TableCell colSpan={11} align="center">
//                                     No customer found
//                                 </TableCell>
//                             </TableRow>
//                         )}

//                         {AllCustomer.map((customer, index) => (

//                             <TableRow
//                                 key={customer._id || index}
//                                 hover
//                             >
//                                 <TableCell>{index + 1}</TableCell>
//                                 <TableCell>{customer?.user?.name || "N/A"}</TableCell>
//                                 <TableCell>{customer?.ticket?.phone || "N/A"}</TableCell>
//                                 <TableCell>{customer?.ticket?.deviceName || "N/A"}</TableCell>
//                                 <TableCell>
//                                     ₹ {customer?.ticket?.devicePrice || "N/A"}
//                                 </TableCell>
//                                 {/* <TableCell>{customer.customer?.name || "N/A"}</TableCell>
// <TableCell>{customer.customer?.phone || "N/A"}</TableCell>
// <TableCell>{customer.customer?.deviceName || "N/A"}</TableCell>
// <TableCell>₹ {customer.customer?.devicePrice || "N/A"}</TableCell> */}

//                                 <TableCell>
//                                     {customer?.ticket?.problemDescription || "N/A"}
//                                 </TableCell>

//                                 <TableCell>
//                                     ₹ {customer?.serviceCharge || "N/A"}
//                                 </TableCell>
//                                 <TableCell>
//                                     <select
//                                         value={customer.status}
//                                             disabled={Role !== "admin"}   // ✅ only admin can edit
//                                         onChange={(e) => handleStatusChange(customer._id, e.target.value)}
//                                     >
//                                         <option value="Pending">Pending</option>
//                                         <option value="In Progress">In Progress</option>
//                                         <option value="Completed">Completed</option>
//                                     </select>
//                                 </TableCell>
//                                 <TableCell>
//                                     <select
//                                         value={customer.technician?._id || ""}
//                                             disabled={Role !== "admin"}   // ✅ only admin can edit
//                                         onChange={(e) =>
//                                             handleTechnicianAssign(customer._id, e.target.value)
//                                         }
//                                     >
//                                         <option value="">Select Technician</option>

//                                         {technicians.map((tech) => (
//                                             <option key={tech._id} value={tech._id}>
//                                                 {tech.name}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </TableCell>


//                                 <TableCell>
//                                     {customer.createdAt
//                                         ? new Date(customer.createdAt).toLocaleDateString()
//                                         : "-"}
//                                 </TableCell>

//                                 <TableCell>
//                                     {customer.updatedAt
//                                         ? new Date(customer.updatedAt).toLocaleDateString()
//                                         : "-"}
//                                 </TableCell>

//                                 {/* ✅ Action column */}
//                                 <TableCell>
//                                     <div className="flex items-center gap-2">
//                                         {Role=="admin"&&(
//                                             <>
// <Tooltip title="Edit Service">
//                                             <IconButton
//                                                 onClick={() => handleEdit(customer._id)}
//                                                 size="small"
//                                                 sx={{
//                                                     backgroundColor: "#E3F2FD",
//                                                     "&:hover": { backgroundColor: "#BBDEFB" }
//                                                 }}
//                                             >
//                                                 <EditIcon fontSize="small" sx={{ color: "#1976D2" }} />
//                                             </IconButton>
//                                         </Tooltip>
//                                             </>
//                                         )}



//                                         <Tooltip title="Preview Service">
//                                             <IconButton
//                                                 onClick={() => handleView(customer._id)}
//                                                 size="small"
//                                                 sx={{
//                                                     backgroundColor: "#F1F8E9",
//                                                     "&:hover": { backgroundColor: "#DCEDC8" }
//                                                 }}
//                                             >
//                                                 <PreviewIcon fontSize="small" sx={{ color: "#388E3C" }} />
//                                             </IconButton>
//                                         </Tooltip>


//                                        {Role=='admin'&&(
//                                         <>
//                                          <Tooltip title="Send Mail">
//                                             <IconButton
//                                                 onClick={() => handleSend(customer._id)}
//                                                 size="small"
//                                                 sx={{
//                                                     backgroundColor: "#F1F8E9",
//                                                     "&:hover": { backgroundColor: "#DCEDC8" }
//                                                 }}
//                                             >
//                                                 <EmailIcon fontSize="small" sx={{ color: "#388E3C" }} />
//                                             </IconButton>
//                                         </Tooltip>
//                                         </>
//                                        )}


//                                     </div>


//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>

//                 </Table>
//             </TableContainer>
//             <button
//                 disabled={page === 1}

//                 onClick={() => setPage(page - 1)}
//                 className="border border-black bg-gray-300"

//             >
//                 prev
//             </button>
//             <span>Page {page}</span>

//             <button
//                 onClick={() => setPage(page + 1)}
//                 className="border border-black bg-gray-300"


//             >next</button>
//         </div>
//     );
// }



// export default ServiceList



















import React, { useEffect, useState } from "react";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    TableContainer,
    IconButton,
    Tooltip,
    Checkbox,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PreviewIcon from '@mui/icons-material/Preview';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { assignTechnician, BulkStatus, ListingService, sendMail, updateStatus } from "../../features/service/serviceThunk";
import { getTechnicians } from "../../features/auth/authThunk";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import EmailIcon from '@mui/icons-material/Email';
import Swal from "sweetalert2";
import CommonTable from "../../component/commonTable";
import { serviceColumns } from "../../component/tableHeader";
import CommonFilters from "../../component/commonFilter";
import Pagination from "../../component/Pagination";
import Button from "../../component/commonButton";
import AddIcon from "@mui/icons-material/Add";
import SelectField from "../../component/SelectField";
import { Old_STATUS_OPTIONS } from "../../component/commnonDropdown";
import SearchBar from "../../component/searchBar";
import DropDownField from "../../component/AnotherDropdown";

function ServiceList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [oldStatus, setOldStatus] = React.useState("");
    const [newStatus, setNewStatus] = React.useState("");
    const [status, setStatus] = useState('')
    const [search, setSearch] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [technician, setTechnician] = useState('');
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('desc');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    // this is debausing concept


    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 1000);

        return () => clearTimeout(timer);
    }, [search]);



    useEffect(() => {
        dispatch(ListingService({
            search: debouncedSearch,
            status,
            startDate,
            endDate,
            technician,
            sortBy,
            sortOrder,
            page,
            limit
        }));
    }, [dispatch, debouncedSearch, status, startDate, endDate, technician, sortBy, sortOrder, page, limit]);


    const { services, loading, error, pagination } = useSelector(
        (state) => state.service
    );
    // console.log(pagination, "pagination pagination pagination");
    // here assign technician

    // console.log(services,"servicesssfjhfdkjsdh");
    // here fond user is which role technician

    const { technicians } = useSelector(
        (state) => state.auth
    );
    // console.log(technicians, "technicians");
    useEffect(() => {
        dispatch(getTechnicians()).then((res) => {
            console.log("API Response:", res);
        });
    }, [dispatch]);
    // ✅ handle both API shapes
    // const AllCustomer = Array.isArray(services)
    //     ? services
    //     : services?.data || [];


    // const AllCustomer = services?.data || services|| [];

    const AllCustomer = services || [];
    console.log(AllCustomer, "all custom");

    const { user } = useSelector((state) => state.auth);
    const Role = user?.role;



    const handleEdit = (id) => {
        // console.log(id, "my id");
        navigate(`/edit-service/${id}`)
    }


    const handleAdd = () => {
        navigate('/add-service')
    }
    const handleStatusChange = (id, status) => {
        dispatch(updateStatus({ id, data: { status } }))
            .unwrap()
            .catch((err) => {
                console.error(err);
            });
    };

    const handleBulkUpdate = async () => {
        if (!oldStatus || !newStatus) {
            Swal.fire({
                icon: "warning",
                title: "Missing Fields",
                text: "Please select both statuses",
            });
            return;
        }

        const result = await Swal.fire({
            title: "Are you sure?",
            text: `Change status from ${oldStatus} to ${newStatus}?`,
            icon: "question",
            showCancelButton: true,
        });

        if (!result.isConfirmed) return;

        try {
            await dispatch(
                BulkStatus({ oldStatus, newStatus })
            ).unwrap();

            // ✅ WAIT for popup to finish
            await Swal.fire({
                icon: "success",
                title: "Updated!",
                text: "Status updated successfully",
                timer: 1500,
                showConfirmButton: false,
            });

            // ⏳ runs AFTER popup closes
            dispatch(ListingService());
            setOldStatus("");
            setNewStatus("");

        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: err?.message || "Something went wrong",
            });
        }
    };


    // here view button

    const handleView = (id) => {
        console.log(id, "my id");
        navigate(`/service-details/${id}`)
    }

    // here sending mail operation


    const handleSend = async (id) => {
        console.log(id, "service id ");
        Swal.fire({
            title: "Sending Mail...",
            text: "Please wait",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            await dispatch(sendMail(id)).unwrap();

            Swal.fire({
                icon: "success",
                title: "Email Sent Successfully",
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Email Failed",
            });
        }
    };
    // here technician assign
    const handleTechnicianAssign = (id, technicianId) => {
        dispatch(assignTechnician({ id, data: { technicianId } }))
            .unwrap()
            .then(() => {
                console.log("Technician assigned successfully");
                dispatch(ListingService());
            })
            .catch((err) => {
                console.error(err);
            });
    };




    const handleSort = (field, order) => {
        if (!field) return;

        setSortBy(field)
        setSortOrder(order);
    }

    const technicianOptions = technicians.map((tech) => ({
        label: tech.name,
        value: tech._id,
    }));


    useEffect(() => {
        setPage(1);
    }, [debouncedSearch, status, startDate, endDate, technician, sortBy, sortOrder]);
    return (
        <div style={{ padding: 20 }}>

            {/* Left Side */}

            {/* Right Side */}



            <h2 className="p-2 text-2xl text-black">Service List</h2>
            <div className="bg-white p-4 rounded-xl shadow-sm mb-4">

                <div className="flex items-center justify-between flex-wrap gap-3">

                    {/* 🔍 LEFT: SEARCH */}
                    <div className="flex-1 min-w-[250px] max-w-[350px]">
                        <SearchBar
                            search={search}
                            setSearch={setSearch}
                        />
                    </div>

                    {/* 👉 RIGHT SIDE: BUTTON + FILTERS */}
                    <div className="flex items-center gap-3 flex-wrap justify-end">

                        {/* ➕ ADD BUTTON */}
                        <Button
                            text="Add Service"
                            onClick={handleAdd}
                            icon={<AddIcon />}
                            className="bg-black text-white hover:bg-gray-800 rounded-lg px-4 py-2"
                        />

                        {/* ⚙️ FILTERS (ADMIN ONLY) */}
                        {Role === "admin" && (
                            <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border">

                                {/* OLD STATUS */}
                                <div className="w-[130px]">
                                    <DropDownField
                                        value={oldStatus}
                                        onChange={(e) => setOldStatus(e.target.value)}
                                        options={Old_STATUS_OPTIONS}
                                        placeholder="Old Status"
                                    />
                                </div>

                                {/* NEW STATUS */}
                                <div className="w-[130px]">
                                    <DropDownField
                                        value={newStatus}
                                        onChange={(e) => setNewStatus(e.target.value)}
                                        options={Old_STATUS_OPTIONS}
                                        placeholder="New Status"
                                    />
                                </div>

                                {/* UPDATE BUTTON */}
                                <button
                                    onClick={handleBulkUpdate}
                                    disabled={!oldStatus || !newStatus}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition
              ${!oldStatus || !newStatus
                                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            : "bg-green-500 text-white hover:bg-green-600"
                                        }`}
                                >
                                    Update
                                </button>

                            </div>
                        )}

                    </div>

                </div>

            </div>
            {/* searching  */}
            <CommonFilters
                // search={search}
                // setSearch={setSearch}
                status={status}
                setStatus={setStatus}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                technician={technician}
                setTechnician={setTechnician}
                technicians={technicians}
                limit={limit}
                setLimit={setLimit}
                statusOptions={Old_STATUS_OPTIONS}

                // control visibility
                showTechnician={true}
                handleAdd={handleAdd}   // ✅ pass here
                role={Role}
            />



            {/* {loading && <p>Loading...</p>}
            {error && (
                <p style={{ color: "red" }}>
                    {error.message || error}
                </p>
            )} */}

            <TableContainer
                component={Paper}
                sx={{
                    maxHeight: 520,
                    borderRadius: 2,
                }}
            >
                <CommonTable
                    columns={serviceColumns}
                    data={AllCustomer}
                    loading={loading}
                    onSort={handleSort}
                    renderRow={(customer, index) => (
                        <TableRow key={customer._id || index} hover>

                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{customer?.user?.name || "N/A"}</TableCell>
                            <TableCell>{customer?.ticket?.phone || "N/A"}</TableCell>
                            <TableCell>{customer?.ticket?.deviceName || "N/A"}</TableCell>
                            <TableCell>₹ {customer?.ticket?.devicePrice || "N/A"}</TableCell>
                            <TableCell>{customer?.ticket?.problemDescription || "N/A"}</TableCell>
                            <TableCell>₹ {customer?.serviceCharge || "N/A"}</TableCell>

                            <TableCell>
                                {Role === "admin" ? (
                                    <DropDownField
                                        value={customer.status}
                                        onChange={(e) =>
                                            handleStatusChange(customer._id, e.target.value)
                                        }
                                        options={Old_STATUS_OPTIONS}
                                    />
                                ) : (
                                    <span>{customer.status}</span>
                                )}
                            </TableCell>

                            <TableCell>
                                <TableCell>
                                    {Role === "admin" ? (
                                        <DropDownField
                                            value={customer.technician?._id || ""}
                                            onChange={(e) =>
                                                handleTechnicianAssign(customer._id, e.target.value)
                                            }
                                            options={technicianOptions}
                                            placeholder="Select Technician"
                                        />
                                    ) : (
                                        <span>
                                            {customer.technician?.name || "Not Assigned"}
                                        </span>
                                    )}
                                </TableCell>

                                {/* <select
                                    value={customer.technician?._id || ""}
                                    disabled={Role !== "admin"}
                                    onChange={(e) =>
                                        handleTechnicianAssign(customer._id, e.target.value)
                                    }
                                >
                                    <option value="">Select Technician</option>
                                    {technicians.map((tech) => (
                                        <option key={tech._id} value={tech._id}>
                                            {tech.name}
                                        </option>
                                    ))}
                                </select> */}
                            </TableCell>

                            <TableCell>
                                {new Date(customer.createdAt).toLocaleDateString()}
                            </TableCell>

                            <TableCell>
                                {new Date(customer.updatedAt).toLocaleDateString()}
                            </TableCell>

                            <TableCell>
                                <div className="flex gap-2" >
                                    {Role === "admin" && (
                                        <Tooltip title="Edit">
                                            <IconButton color="primary" onClick={() => handleEdit(customer._id)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>

                                    )}
<Tooltip title="View Service">
  <IconButton
    onClick={() => handleView(customer._id)}
    
  >
    <PreviewIcon />
  </IconButton>
</Tooltip>

{Role === "admin" && (
  <Tooltip title="Send Mail">
    <IconButton
      onClick={() => handleSend(customer._id)}
      sx={{
        color: "#a855f7", // purple-500
        "&:hover": { backgroundColor: "#f3e8ff" }, // purple-100
      }}
    >
      <EmailIcon />
    </IconButton>
  </Tooltip>
)}
                                </div>
                            </TableCell>

                        </TableRow>
                    )}
                />
            </TableContainer>
            {/* <Pagination
                page={page}
                limit={limit}
                totalCount={services?.totalCount || 0}
                onPageChange={(newPage) => setPage(newPage)}
            /> */}

            {/* <Pagination
        page={page}
        limit={limit}
totalCount={pagination?.totalRecords || 0}
        onPageChange={(newPage) => setPage(newPage)}
      /> */}

            <Pagination
                page={pagination.page}
                limit={pagination.limit}
                totalCount={pagination.total}   // ✅ FIX HERE
                onPageChange={(newPage) => setPage(newPage)}
            />
        </div>
    );
}



export default ServiceList





// import React, { useEffect, useState } from "react";
// import {
//   TableRow,
//   TableCell,
//   Paper,
//   TableContainer,
//   IconButton,
// } from "@mui/material";

// import EditIcon from "@mui/icons-material/Edit";
// import PreviewIcon from "@mui/icons-material/Preview";
// import EmailIcon from "@mui/icons-material/Email";
// import AddIcon from "@mui/icons-material/Add";

// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// import {
//   assignTechnician,
//   BulkStatus,
//   ListingService,
//   sendMail,
//   updateStatus,
// } from "../../features/service/serviceThunk";

// import { getTechnicians } from "../../features/auth/authThunk";

// import CommonTable from "../../component/commonTable";
// import { serviceColumns } from "../../component/tableHeader";
// import CommonFilters from "../../component/commonFilter";
// import Pagination from "../../component/Pagination";
// import Button from "../../component/commonButton";
// import SelectField from "../../component/SelectField";
// import { Old_STATUS_OPTIONS } from "../../component/commnonDropdown";

// function ServiceList() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // ---------------- STATE ----------------
//   const [search, setSearch] = useState("");
//   const [debouncedSearch, setDebouncedSearch] = useState("");

//   const [status, setStatus] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [technician, setTechnician] = useState("");

//   const [sortBy, setSortBy] = useState("createdAt");
//   const [sortOrder, setSortOrder] = useState("desc");

//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);

//   const [oldStatus, setOldStatus] = useState("");
//   const [newStatus, setNewStatus] = useState("");

//   // ---------------- REDUX ----------------
//   const { services, loading, pagination } = useSelector(
//     (state) => state.service
//   );

//   const { technicians, user } = useSelector((state) => state.auth);
//   const Role = user?.role;

//   const AllCustomer = services || [];

//   // ---------------- DEBOUNCE SEARCH ----------------
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedSearch(search);
//       setPage(1); // ✅ reset page
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [search]);

//   // ---------------- RESET PAGE ON FILTER/SORT ----------------
//   useEffect(() => {
//     setPage(1);
//   }, [status, startDate, endDate, technician, sortBy, sortOrder]);

//   // ---------------- API CALL ----------------
//   useEffect(() => {
//     dispatch(
//       ListingService({
//         search: debouncedSearch,
//         status,
//         startDate,
//         endDate,
//         technician,
//         sortBy,
//         sortOrder,
//         page,
//         limit,
//       })
//     );
//   }, [
//     dispatch,
//     debouncedSearch,
//     status,
//     startDate,
//     endDate,
//     technician,
//     sortBy,
//     sortOrder,
//     page,
//     limit,
//   ]);

//   // ---------------- HANDLE INVALID PAGE ----------------
//   useEffect(() => {
//     if (pagination?.totalPages && page > pagination.totalPages) {
//       setPage(1);
//     }
//   }, [pagination?.totalPages]);

//   // ---------------- LOAD TECHNICIANS ----------------
//   useEffect(() => {
//     dispatch(getTechnicians());
//   }, [dispatch]);

//   // ---------------- HANDLERS ----------------
//   const handleEdit = (id) => navigate(`/edit-service/${id}`);
//   const handleAdd = () => navigate("/add-service");
//   const handleView = (id) => navigate(`/service-details/${id}`);

//   const handleSort = (field, order) => {
//     setSortBy(field);
//     setSortOrder(order);
//   };

//   const callListingAPI = () => {
//     dispatch(
//       ListingService({
//         search: debouncedSearch,
//         status,
//         startDate,
//         endDate,
//         technician,
//         sortBy,
//         sortOrder,
//         page,
//         limit,
//       })
//     );
//   };

//   const handleStatusChange = (id, status) => {
//     dispatch(updateStatus({ id, data: { status } }))
//       .unwrap()
//       .then(callListingAPI);
//   };

//   const handleTechnicianAssign = (id, technicianId) => {
//     dispatch(assignTechnician({ id, data: { technicianId } }))
//       .unwrap()
//       .then(callListingAPI);
//   };

//   const handleBulkUpdate = () => {
//     if (!oldStatus || !newStatus) return;

//     dispatch(BulkStatus({ oldStatus, newStatus }))
//       .unwrap()
//       .then(() => {
//         setOldStatus("");
//         setNewStatus("");
//         callListingAPI();
//       });
//   };

//   const handleSend = async (id) => {
//     Swal.fire({
//       title: "Sending Mail...",
//       allowOutsideClick: false,
//       didOpen: () => Swal.showLoading(),
//     });

//     try {
//       await dispatch(sendMail(id)).unwrap();
//       Swal.fire("Success", "Email Sent", "success");
//     } catch {
//       Swal.fire("Error", "Failed", "error");
//     }
//   };

//   const technicianOptions = technicians.map((tech) => ({
//     label: tech.name,
//     value: tech._id,
//   }));

//   // ---------------- UI ----------------
//   return (
//     <div style={{ padding: 20 }}>
//       {/* HEADER */}
//       <div className="flex justify-between mb-4">
//         {Role === "admin" && (
//           <Button text="Add Service" onClick={handleAdd} icon={<AddIcon />} />
//         )}

//         <div className="flex gap-2">
//           <SelectField
//             value={oldStatus}
//             onChange={(e) => setOldStatus(e.target.value)}
//             options={Old_STATUS_OPTIONS}
//             placeholder="Old Status"
//           />

//           <SelectField
//             value={newStatus}
//             onChange={(e) => setNewStatus(e.target.value)}
//             options={Old_STATUS_OPTIONS}
//             placeholder="New Status"
//           />

//           <button onClick={handleBulkUpdate}>Update</button>
//         </div>
//       </div>

//       {/* FILTERS */}
//       <CommonFilters
//         search={search}
//         setSearch={setSearch}
//         status={status}
//         setStatus={setStatus}
//         startDate={startDate}
//         setStartDate={setStartDate}
//         endDate={endDate}
//         setEndDate={setEndDate}
//         technician={technician}
//         setTechnician={setTechnician}
//         technicians={technicians}
//         limit={limit}
//         setLimit={setLimit}
//         statusOptions={Old_STATUS_OPTIONS}
//         showTechnician
//       />

//       {/* TABLE */}
//       <TableContainer component={Paper}>
//         <CommonTable
//           columns={serviceColumns}
//           data={AllCustomer}
//           loading={loading}
//           onSort={handleSort}
//           renderRow={(customer, index) => (
//             <TableRow key={customer._id}>
//               <TableCell>
//                 {(page - 1) * limit + index + 1}
//               </TableCell>

//               <TableCell>{customer?.user?.name}</TableCell>
//               <TableCell>{customer?.ticket?.phone}</TableCell>
//               <TableCell>{customer?.ticket?.deviceName}</TableCell>

//               <TableCell>
//                 <SelectField
//                   value={customer.status}
//                   onChange={(e) =>
//                     handleStatusChange(customer._id, e.target.value)
//                   }
//                   options={Old_STATUS_OPTIONS}
//                 />
//               </TableCell>

//               <TableCell>
//                 <SelectField
//                   value={customer?.technician?._id || ""}
//                   onChange={(e) =>
//                     handleTechnicianAssign(customer._id, e.target.value)
//                   }
//                   options={technicianOptions}
//                 />
//               </TableCell>

//               <TableCell>
//                 {new Date(customer.createdAt).toLocaleDateString()}
//               </TableCell>

//               <TableCell>
//                 <IconButton onClick={() => handleEdit(customer._id)}>
//                   <EditIcon />
//                 </IconButton>

//                 <IconButton onClick={() => handleView(customer._id)}>
//                   <PreviewIcon />
//                 </IconButton>

//                 <IconButton onClick={() => handleSend(customer._id)}>
//                   <EmailIcon />
//                 </IconButton>
//               </TableCell>
//             </TableRow>
//           )}
//         />
//       </TableContainer>

//       {/* PAGINATION */}
//       <Pagination
//         page={page}
//         limit={limit}
//         totalCount={pagination?.total || 0}
//         onPageChange={(newPage) => setPage(newPage)}
//       />
//     </div>
//   );
// }

// export default ServiceList;





