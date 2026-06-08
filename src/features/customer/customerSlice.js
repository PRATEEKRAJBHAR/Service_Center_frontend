import { createSlice } from "@reduxjs/toolkit";
import { addCustomer,
  // CustomerFilter, CustomerPagination, CustomerSeaching, Customersort,fetchCustomers,
   editCustomer, statusCustomer, ViewCustomer } from "./customerThunk";

const initialState = {
  customers: [],
  loading: false,
  error: null,
  success: false,
  status: true,

   pagination: {
    page: 1,
    limit: 10,
    totalPages: 1,
    total: 0,
  }
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    clearCustomerState: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔵 Pending
      .addCase(addCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      // 🟢 Fulfilled
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.customers.push(action.payload.data); // Add new customer to list
      })

      // 🔴 Rejected
      .addCase(addCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })


      //   here view slice

      .addCase(ViewCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(ViewCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload.data;
                // state.customers = action.payload;
                  state.pagination = action.payload.pagination;


      })

      .addCase(ViewCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // here edit operation perform

      .addCase(editCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(editCustomer.fulfilled, (state, action) => {
        state.loading = false;

        const updatedCustomer = action.payload;

        const index = state.customers.findIndex(
          (c) => c._id === updatedCustomer._id
        );

        if (index !== -1) {
          state.customers[index] = updatedCustomer;
        }
      })

      .addCase(editCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // status update
      .addCase(statusCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(statusCustomer.fulfilled, (state, action) => {
        state.loading = false;

        const updatedCustomer = action.payload.data;

        const index = state.customers.findIndex(
          (c) => c._id === updatedCustomer._id
        );

        if (index !== -1) {
          state.customers[index] = updatedCustomer;
        }
      })

      .addCase(statusCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })



//       // seaching

//  .addCase(CustomerSeaching.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })

//       .addCase(CustomerSeaching.fulfilled, (state, action) => {
//         state.loading = false;
//         state.customers = action.payload.data;
//       })

//       .addCase(CustomerSeaching.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })


// // here filter


//  .addCase(CustomerFilter.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })

//       .addCase(CustomerFilter.fulfilled, (state, action) => {
//         state.loading = false;
//         state.customers = action.payload.data;
//       })

//       .addCase(CustomerFilter.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })


//       // sort


//  .addCase(Customersort.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })

//       .addCase(Customersort.fulfilled, (state, action) => {
//         state.loading = false;
//         state.customers = action.payload.data;
//       })

//       .addCase(Customersort.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })


// // pagination





//  .addCase(CustomerPagination.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })

//       .addCase(CustomerPagination.fulfilled, (state, action) => {
//           console.log(action.payload, "PAGINATION RESPONSE");

//   state.loading = false;
//   state.customers = action.payload.data;
//   state.pagination = action.payload.pagination;
// })


//       .addCase(CustomerPagination.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
// // here all oprtaon perform like searching,sorting,filtering and pagaination

//  .addCase(fetchCustomers.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })

//       .addCase(fetchCustomers.fulfilled, (state, action) => {
//         state.loading = false;
//         state.customers = action.payload.data;
//         state.pagination = action.payload.pagination;
//       })

//       .addCase(fetchCustomers.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })


  },
});

export const { clearCustomerState } = customerSlice.actions;
export default customerSlice.reducer;
