// import React, { useEffect, useState } from 'react'
// import { Navigate, Route, Routes } from 'react-router-dom'
// import Register from './pages/auth/Register'
// import Sidebar from './Sidebar'
// import Header from './pages/headAndFoot/Header'
// import Login from './pages/auth/Login'
// import AddCustomer from './pages/customer/AddCustomer'
// import CustomerList from './pages/customer/CustomerList'
// import AddService from './pages/service/AddService'
// import ServiceList from './pages/service/ServiceList'
// import ServiceDetails from './pages/service/ServiceDetails'
// import ServiceLog from './pages/service/ServiceLog'
// import ImagesServiceLog from './pages/service/ImagesServiceLog'
// import ReportServiceLog from './pages/service/ReportServiceLog'
// import Parts from './pages/parts/Parts'
// import ListingParts from './pages/parts/ListingParts'
// import ProtectedRoute from './component/ProtectedRoutes'
// import ForgetPassword from './pages/auth/ForgetPassword'
// import TicketHistory from './pages/customer/TicketHistory'
// import StatusStepper from './pages/customer/StatusStepper'

// // import Footer from './pages/headAndFoot/Footer'
// function App() {
//   // const token = localStorage.getItem("token");
// // console.log(token,"app.jsx tokrn");
//  const [token, setToken] = useState(null);
// console.log(token,"app token");
//   useEffect(() => {
//     setToken(localStorage.getItem("token"));
//   }, []);
//   // Define Auth Routes (Pages visible without login)
//   if (!token) {
//     return (
//       <Routes>
//         <Route path='/login' element={<Login />} />
//         <Route path='/register' element={<Register />} />
//         <Route path='/forget-password' element={<ForgetPassword />} />
//         {/* Redirect any other path to login if not authenticated */}
//         <Route path="*" element={<Navigate to="/login" />} />
//       </Routes>
//     );
//   }

//   // Define Protected Layout (Pages visible only when logged in)
//   return (
//     <div className="flex h-screen">
//       <Sidebar />
//       <div className="flex flex-col flex-1">
//         <Header />
//         <div className="flex-1 overflow-auto p-6 bg-gray-100">
//           <Routes>
//             {/* Redirect root or login to a default dashboard/list if already logged in */}
//             <Route path='/login' element={<Navigate to="/listing-cutomer" />} />

//             <Route path="/listing-cutomer" element={
//               <ProtectedRoute roles={["admin", 'customer']}>
//                 <CustomerList />
//               </ProtectedRoute>
//             } />

//             <Route path='/listing-service' element={
//               <ProtectedRoute roles={['admin', 'technician']}>
//                 <ServiceList />
//               </ProtectedRoute>
//             } />

//             {/* Other Protected Routes */}
//             <Route path='/add-cutomer' element={<AddCustomer />} />
//             <Route path='/edit-cutomer/:id' element={<AddCustomer />} />
//             <Route path='/add-service' element={<AddService />} />
//             <Route path='/edit-service/:id' element={<AddService />} />
//             <Route path='/service-details/:id' element={<ServiceDetails />} />
//             <Route path='/add-log/:id' element={<ServiceLog />} />
//             <Route path='/add-img/:id' element={<ImagesServiceLog />} />
//             <Route path='/add-report/:id' element={<ReportServiceLog />} />
//             <Route path='/parts-list' element={<ListingParts />} />
//             <Route path='/parts' element={<Parts />} />
//             <Route path='/parts/:id' element={<Parts />} />
//             <Route path='/customer-history/:userId' element={<TicketHistory />} />
//             <Route path='/status-stepper/:userId/:ticketId' element={<StatusStepper />} />

//             {/* Fallback for authenticated users */}
//             <Route path="*" element={<Navigate to="/listing-cutomer" />} />
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App




import React from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Register from './pages/auth/Register'
import Sidebar from './Sidebar'
import Header from './pages/headAndFoot/Header'
import Login from './pages/auth/Login'
import AddCustomer from './pages/customer/AddCustomer'
import CustomerList from './pages/customer/CustomerList'
import AddService from './pages/service/AddService'
import ServiceList from './pages/service/ServiceList'
import ServiceDetails from './pages/service/ServiceDetails'
import ServiceLog from './pages/service/ServiceLog'
import ImagesServiceLog from './pages/service/ImagesServiceLog'
import ReportServiceLog from './pages/service/ReportServiceLog'
import Parts from './pages/parts/Parts'
import ListingParts from './pages/parts/ListingParts'
import ProtectedRoute from './component/ProtectedRoutes'
import ForgetPassword from './pages/auth/ForgetPassword'
import TicketHistory from './pages/customer/TicketHistory'
import StatusStepper from './pages/customer/StatusStepper'
import MainLayout from './layout/MainLayout'
import ResetPassword from './pages/auth/ResetPassword'
import ListingAllRegisterUser from './pages/customer/ListingAllRegisterUser'
import { useSelector } from 'react-redux'


function App() {

  const {user}=useSelector((state)=>state.auth);
  const roles=user?.role;
  return (
<Routes>
  {/* Public Routes */}
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/forget-password" element={<ForgetPassword />} />
  <Route path="/reset-password/:token" element={<ResetPassword />} />

  {/* Protected Layout */}
  <Route element={<ProtectedRoute />}>
    <Route element={<MainLayout />}>

      {/* ✅ Admin + Customer */}
      <Route element={<ProtectedRoute roles={["admin", "customer"]} />}>
        <Route path="/listing-cutomer" element={<CustomerList />} />
        <Route path="/edit-cutomer/:id" element={<AddCustomer />} />
         <Route path='/customer-history/:userId' element={<TicketHistory />} />
        <Route path='/status-stepper/:userId/:ticketId' element={<StatusStepper />} />
      </Route>

      {/* ✅ Only Customer */}
      <Route element={<ProtectedRoute roles={["customer"]} />}>
        <Route path="/add-cutomer" element={<AddCustomer />} />
      </Route>

      {/* ✅ Admin + Technician */}
      <Route element={<ProtectedRoute roles={["admin", "technician"]} />}>
        <Route path="/listing-service" element={<ServiceList />} />
      </Route>

      {/* ✅ Only Admin */}
      {/* <Route element={<ProtectedRoute roles={["admin"]} />}>
        <Route path="/add-service" element={<AddService />} />
        <Route path="/edit-service/:id" element={<AddService />} />
               <Route path="/service-details/:id" element={<ServiceDetails />} />

      </Route> */}

      {/* only technicain see and added rerposts ,services,log etc */}
      <Route element={<ProtectedRoute roles={["technician",'admin']} />}>
        <Route path="/add-service" element={<AddService />} />
        <Route path="/edit-service/:id" element={<AddService />} />
        <Route path="/service-details/:id" element={<ServiceDetails />} />
        <Route path="/add-log/:id" element={<ServiceLog />} />
        <Route path="/add-img/:id" element={<ImagesServiceLog />} />
        <Route path="/add-report/:id" element={<ReportServiceLog />} />

        <Route path="/parts-list" element={<ListingParts />} />
        <Route path="/add-parts" element={<Parts />} />
        <Route path="/parts/:id" element={<Parts />} />
      </Route>

      {/* ✅ Common (All Logged-in Users) */}
      <Route path="/listing-allregisteruser" element={<ListingAllRegisterUser />} />

    </Route>
  </Route>

  {/* Redirect unknown routes */}
  <Route path="*" element={<Navigate to="/login" />} />
</Routes>
  );
}

export default App;
