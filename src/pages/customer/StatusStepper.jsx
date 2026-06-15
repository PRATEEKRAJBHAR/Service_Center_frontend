// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getCustomerServices } from "../../features/service/serviceThunk";
// import { useParams } from "react-router-dom";

// const StatusStepper = () => {
//   const dispatch = useDispatch();

//   const { userId } = useParams(); // ✅ FIXED

//   const { services, loading } = useSelector((state) => state.service);
// console.log(services,"servie");
//   useEffect(() => {
//     console.log("API CALL with userId:", userId);

//     if (userId) {
//       dispatch(getCustomerServices(userId));
//     }
//   }, [dispatch, userId]);

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Customer Tickets Status</h2>

//       {loading && <p>Loading...</p>}

//       {!loading && services?.length === 0 && (
//         <p>No tickets found</p>
//       )}

//       {services?.map((service, i) => {
//         const steps = ["Pending", "In Progress", "Completed"];
//         const status = service.status;

//         return (
//           <div key={service._id} style={{ marginBottom: 20 }}>
//             <div>
//             <p className="p-2 bg-gray-300 ">{i+1}. {service.problemDescription}</p>
// <p>updated status {service.updatedAt}</p>
//             </div>
//             <p><b>Ticket {i + 1}</b> - {status}</p>

//             <div style={{ display: "flex", alignItems: "center" }}>
//               {steps.map((step, index) => {
//                 const isActive = steps.indexOf(status) >= index;

//                 return (
//                   <div key={step} style={{ display: "flex", alignItems: "center" }}>
//                     <div
//                       style={{
//                         width: 20,
//                         height: 20,
//                         borderRadius: "50%",
//                         backgroundColor: isActive ? "green" : "gray",
//                       }}
//                     />
//                     {index < steps.length - 1 && (
//                       <div
//                         style={{
//                           width: 50,
//                           height: 3,
//                           backgroundColor:
//                             steps.indexOf(status) > index ? "green" : "gray",
//                         }}
//                       />
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default StatusStepper;









import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerServices } from "../../features/service/serviceThunk";
import { useParams } from "react-router-dom";

const StatusStepper = () => {
  const dispatch = useDispatch();

  const { userId,ticketId } = useParams(); // ✅ FIXED

  const { services, loading } = useSelector((state) => state.service);
console.log(ticketId,"servie");
  useEffect(() => {
  if (userId && ticketId) {
    dispatch(getCustomerServices({ customerId: userId, ticketId }));
  }
}, [dispatch, userId, ticketId]);
  return (
    <div style={{ padding: 20 }}>
      {/* <h2>Customer Tickets Status</h2> */}

      {loading && <p>Loading...</p>}

      {!loading && services?.length === 0 && (
        // <p>No tickets found</p>
        <div className="text-center text-gray-600 text-lg font-semibold mt-20">
          No tickets found 🚫
        </div>
      )}

      {services?.map((service, i) => {
        const steps = ["Pending", "In Progress", "Completed"];
        const status = service.status;

        return (
          <div key={service._id} style={{ marginBottom: 20 }}>
            <div>
            <p className="p-2 bg-gray-300 ">{i+1}. {service.problemDescription}</p>
<p>updated status {service.updatedAt}</p>
            </div>
            <p><b>Ticket {i + 1}</b> - {status}</p>

            <div style={{ display: "flex", alignItems: "center" }}>
              {steps.map((step, index) => {
                const isActive = steps.indexOf(status) >= index;

                return (
                  <div key={step} style={{ display: "flex", alignItems: "center" }}>
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        backgroundColor: isActive ? "green" : "gray",
                      }}
                    />
                    {index < steps.length - 1 && (
                      <div
                        style={{
                          width: 50,
                          height: 3,
                          backgroundColor:
                            steps.indexOf(status) > index ? "green" : "gray",
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatusStepper;