import { createSlice } from "@reduxjs/toolkit";
import {
  addServiceLog,
  addServiceLogImg,
  addServiceLogreport,
  assignTechnician,
  BulkStatus,
  CreateService,
  customerHistory,
  deleteService,
  downloadTicket,
  EditService,
  getCustomerServices,
  getTicketsByCustomer,
  //  EditService,
  ListingService,
  ListingSingleService,
  removeServiceLog,
  removeServiceLogImg,
  removeServiceLogReport,
  sendMail,
  TechnicianAddedParts,
  updateStatus
} from "./serviceThunk";

const initialState = {
  services: [],
  singleService:null,
  loading: false,
  error: null,
  success: false,
  customerHistory:[],
  tickets: [],
  pagination: {
    page: 1,
    limit: 10,
    totalPages: 1,
    total: 0,
  }
};

const createServiceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    clearServiceState: (state) => {
      state.success = false;
      state.error = null;
        state.tickets = []; // ✅ ADD THIS

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CreateService.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(CreateService.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        // If backend returns { data: {...} }
        state.services.push(action.payload.data);
      })
      .addCase(CreateService.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      //   here listing services data

      .addCase(ListingService.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.success = false
      })
      .addCase(ListingService.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        // If  returns { data: {...} }
        // state.pagination = action.payload.pagination;
        state.services = action.payload.data;
          state.pagination = action.payload.pagination;

        // its  updated
                // state.services = action.payload;
  //               state.pagination = {
  //   page: action.payload.page,
  //   limit: action.payload.limit,
  //   total: action.payload.totalCount,
  //   totalPages: Math.ceil(action.payload.totalCount / action.payload.limit)
  // };
  // console.log("Pagination:", action.pagination);
console.log("Pagination:", action.payload.pagination);
      })
      .addCase(ListingService.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })


      //   here edit operation perform

      .addCase(EditService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(EditService.fulfilled, (state, action) => {
        state.loading = false;

        const updatedService = action.payload;

        const index = state.services.findIndex(
          (c) => c._id === updatedService._id
        );

        if (index !== -1) {
          state.services[index] = updatedService;
        }
      })

      .addCase(EditService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      //   status update

      .addCase(updateStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateStatus.fulfilled, (state, action) => {
        state.loading = false;

        const updatedServices = action.payload.data;

        const index = state.services.findIndex(
          (c) => c._id === updatedServices._id
        );
// if (index !== -1) {
//           state.services[index] = updatedServices;
//         }
        if (index !== -1) {
          state.services[index] = {
            ...state.services[index],
            ...updatedServices
          };
        }
          // state.singleService = updatedServices;
          state.singleService = {
    ...state.singleService,
    ...updatedServices
  };

      })


      .addCase(updateStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // here added bulk update
      .addCase(BulkStatus.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.success = false;
      })
      // .addCase(BulkStatus.fulfilled, (state) => {
      //   state.loading = false;
      //   state.success = true;


      // })
      .addCase(BulkStatus.fulfilled, (state, action) => {
  state.loading = false;
  state.success = true;

  const { oldStatus, newStatus } = action.meta.arg;

  // 🔥 update all matching items instantly
  state.services = state.services.map(service =>
    service.status === oldStatus
      ? { ...service, status: newStatus }
      : service
  );
})
      .addCase(BulkStatus.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })


      // single service detials slice

      .addCase(ListingSingleService.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.success = false;
      })
      .addCase(ListingSingleService.fulfilled, (state,action) => {
        state.loading = false;
        state.success = true;
        state.singleService=action.payload.data;

      })
      .addCase(ListingSingleService.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })


      // add  service log


            .addCase(addServiceLog.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.success = false;
      })
      .addCase(addServiceLog.fulfilled, (state,action) => {
        state.loading = false;
        state.success = true;
        state.singleService=action.payload.data;

      })
      .addCase(addServiceLog.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })


      // remove service log


          .addCase(removeServiceLog.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.success = false;
      })
      .addCase(removeServiceLog.fulfilled, (state,action) => {
        state.loading = false;
        state.success = true;
        state.singleService=action.payload.data;

      })
      .addCase(removeServiceLog.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
// added img
 .addCase(addServiceLogImg.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.success = false;
      })
      .addCase(addServiceLogImg.fulfilled, (state,action) => {
        state.loading = false;
        state.success = true;
        state.singleService=action.payload.data;

      })
      .addCase(addServiceLogImg.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })


      // remove img


      .addCase(removeServiceLogImg.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.success = false;
      })
      .addCase(removeServiceLogImg.fulfilled, (state,action) => {
        state.loading = false;
        state.success = true;
        state.singleService=action.payload.data;

      })
      .addCase(removeServiceLogImg.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })


      // added report
 .addCase(addServiceLogreport.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.success = false;
      })
      .addCase(addServiceLogreport.fulfilled, (state,action) => {
        state.loading = false;
        state.success = true;
        state.singleService=action.payload.data;

      })
      .addCase(addServiceLogreport.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })


      // remove img


      .addCase(removeServiceLogReport.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.success = false;
      })
      .addCase(removeServiceLogReport.fulfilled, (state,action) => {
        state.loading = false;
        state.success = true;
        state.singleService=action.payload.data;

      })
      .addCase(removeServiceLogReport.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

// technnician assign


      .addCase(assignTechnician.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.success = false;
      })
//       .addCase(assignTechnician.fulfilled, (state, action) => {
//   state.loading = false;
//   state.success = true;

//   const updatedService = action.payload.data;

//   const index = state.services.findIndex(
//     (s) => s._id === updatedService._id
//   );

//   if (index !== -1) {
//     state.services[index] = updatedService; // full object replace safe hai
//   }
// })
// .addCase(assignTechnician.fulfilled, (state, action) => {
//   state.loading = false;

//   const updatedService = action.payload.data;

//   const index = state.services.findIndex(
//     (s) => s._id === updatedService._id
//   );

//   if (index !== -1) {
//     state.services[index] = {
//       ...state.services[index],   // old data
//       ...updatedService           // new technicianId
//     };
//   }

//   state.singleService = {
//     ...state.singleService,
//     ...updatedService
//   };
// })



.addCase(assignTechnician.fulfilled, (state, action) => {
  state.loading = false;

  const updatedService = action.payload.data;

  const index = state.services.findIndex(
    (s) => s._id === updatedService._id
  );

  if (index !== -1) {
    state.services[index] = {
      ...state.services[index],
      ...updatedService,
      technician: updatedService.technicianId // ✅ fix
    };
  }

  state.singleService = {
    ...state.singleService,
    ...updatedService
  };
})
      .addCase(assignTechnician.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })



      // technician added parts
  .addCase(TechnicianAddedParts.pending, (state) => {
  state.error = null;
  state.loading = true;
  state.success = false;
})

.addCase(TechnicianAddedParts.fulfilled, (state, action) => {
  state.loading = false;
  state.success = true;

  const updatedService = action.payload.data;

  // ✅ Update single service (important)
  state.singleService = updatedService;

  // ✅ Update services list if exists
  const index = state.services.findIndex(
    (s) => s._id === updatedService._id
  );

  if (index !== -1) {
    state.services[index] = updatedService;
  }

  // Optional: full response store karna ho toh
  state.message = action.payload.message;
})

.addCase(TechnicianAddedParts.rejected, (state, action) => {
  state.loading = false;
  state.success = false;
  state.error = action.payload;
})



// send mail



      .addCase(sendMail.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.success = false;
      })
      .addCase(sendMail.fulfilled, (state,action) => {
        state.loading = false;
        state.success = true;

      })
      .addCase(sendMail.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })



      // download pdf




      .addCase(downloadTicket.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.success = false;
      })
      // .addCase(downloadTicket.fulfilled, (state,action) => {
      //   state.loading = false;
      //   state.success = true;

      // })
      .addCase(downloadTicket.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      // history listing



        .addCase(customerHistory.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.success = false
      })
      .addCase(customerHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        // If  returns { data: {...} }
        state.customerHistory = action.payload.data;
      })
      .addCase(customerHistory.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

// view customer our status



      .addCase(getCustomerServices.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.success = false;
      })
      .addCase(getCustomerServices.fulfilled, (state,action) => {
          console.log(action.payload.data, "REDUX STORE DATA"); // 👈 ADD THIS

        state.loading = false;
        state.success = true;
        state.services=action.payload.data;

      })
      .addCase(getCustomerServices.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })



      //getTicketsByCustomer




      .addCase(getTicketsByCustomer.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.success = false;
      })
      .addCase(getTicketsByCustomer.fulfilled, (state, action) => {
  state.loading = false;
  state.success = true;
  state.tickets = action.payload.data; // ✅ correct
})
      .addCase(getTicketsByCustomer.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })



      // delete services


    //   delete


     .addCase(deleteService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
.addCase(deleteService.fulfilled, (state, action) => {
  state.loading = false;

  state.services = state.services.filter(
    (service) => service._id !== action.payload
  );

  state.pagination.totalRecords =
    (state.pagination.totalRecords || 0) - 1;
})
      .addCase(deleteService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })




  },
});

export const { clearServiceState } = createServiceSlice.actions;
export default createServiceSlice.reducer;
