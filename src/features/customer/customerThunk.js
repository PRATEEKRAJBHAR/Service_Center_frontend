import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/Api";

export const addCustomer = createAsyncThunk(
  "customer/addCustomer",
  async (customerData, thunkAPI) => {
    try {
      const response = await API.post("/auth/customers", customerData);
      return response.data;
    } catch (error) {
      console.error("Add Customer Error:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);


// here view All customer api

// export const ViewCustomer = createAsyncThunk(
//   "customer/viewCustomer",
//   async (_, thunkAPI) => {
//     try {
//       const response = await API.get("/auth/customers");
//       // console.log(response,"my respnse");
//       return response.data;
//     } catch (error) {
//       console.error("Add Customer Error:", error);
//       return thunkAPI.rejectWithValue(
//         error.response?.data || { message: "Something went wrong" }
//       );
//     }
//   }
// );


// export const ViewCustomer = createAsyncThunk(
//   "customer/viewCustomer",
//   async ({search,status}, thunkAPI) => {
//     try {
//       const response = await API.get(`/auth/customers?search=${search||""}&isActive=${status}`);
//       // console.log(response,"my respnse");
//       return response.data;
//     } catch (error) {
//       console.error("Add Customer Error:", error);
//       return thunkAPI.rejectWithValue(
//         error.response?.data || { message: "Something went wrong" }
//       );
//     }
//   }
// );

export const ViewCustomer = createAsyncThunk(
  "customer/viewCustomer",
  async ({ search, status, minPrice, maxPrice, startDate, endDate, sortBy, sortOrder, page, limit }, thunkAPI) => {
    try {

      let url = `/auth/customers?search=${search || ""}`;

      if (status) {
        url += `&isActive=${status}`;
      }
      if (minPrice) {
        url += `&minPrice=${minPrice}`
      }
      if (maxPrice) {
        url += `&maxPrice=${maxPrice}`
      }

      if (startDate) {
        url += `&startDate=${startDate}`
      }

      if (endDate) {
        url += `&endDate=${endDate}`
      }

      if (sortBy) {
        url += `&sortBy=${sortBy}`
      }

      if (sortOrder) {
        url += `&sortOrder=${sortOrder}`
      }
      if (page) {
        url += `&page=${page}`;
      }

      if (limit) {
        url += `&limit=${limit}`;
      }



      const response = await API.get(url);
      console.log(response,"my response");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);



// edit operation perform

export const editCustomer = createAsyncThunk(
  'customer/editcustomer',
  async ({ id, data }, thunkAPI) => {
    try {
      const respones = await API.put(`/auth/customers/${id}`, data)
      // console.log(respones,"respomse");
      return respones.data

    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response?.data || { message: "something went wrong" })
    }
  }
)



// its status update thunk for customer

export const statusCustomer = createAsyncThunk(
  "customer/statuscustomer",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await API.patch(
        `/auth/customers/status/${id}`,
        data
      );


      return response.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "something went wrong" }
      );
    }
  }
);





export const deleteCustomer = createAsyncThunk(
    'customers/delete',
    async ({ id }, thunkApi) => {
        try {
            const response = await API.delete(`/auth/customers/${id}`);
            console.log(response, "response");
            return id;

        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message || error.message)
        }
    }
)


// // seaching api here


// export const CustomerSeaching = createAsyncThunk(
//   "customer/searching",
//   async (search, thunkAPI) => {
//     try {
//       const response = await API.get(
//         `/auth/customers/searching?search=${search}`
//       );

//       return response.data;

//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data || { message: "Something went wrong" }
//       );
//     }
//   }
// );





// // filter api


// export const CustomerFilter = createAsyncThunk(
//   "customer/filter",
//   async (devicePrice, thunkAPI) => {
//     try {
//       const response = await API.get(
//         "/auth/customers/filter",
//         { params: { devicePrice } }   // ✅ correct param name
//       );

//       return response.data;

//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data || { message: "Something went wrong" }
//       );
//     }
//   }
// );




// // sorting api





// // sort api

// export const Customersort = createAsyncThunk(
//   "customer/sort",
//   async ({ sortBy, order }, thunkAPI) => {
//     try {
//       const response = await API.get("/auth/customers/sort", {
//         params: { sortBy, order },
//       });

//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data || { message: "Something went wrong" }
//       );
//     }
//   }
// );




// // pagination



// export const CustomerPagination = createAsyncThunk(
//   "customer/pagination",
//   async ({ page, limit }, thunkAPI) => {
//     try {
//       const response = await API.get("/auth/customers/pagination", {
//         params: { page, limit },
//       });

//       return response.data;

//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data || { message: "Something went wrong" }
//       );
//     }
//   }
// );




// // all in one


// export const fetchCustomers = createAsyncThunk(
//   "customer/fetchCustomers",
//   async (
//     { page, limit, search, devicePrice, sortBy, order },
//     thunkAPI
//   ) => {
//     try {
//       const response = await API.get("/auth/customers/details", {
//         params: {
//           page,
//           limit,
//           search,
//           devicePrice,
//           sortBy,
//           order,
//         },
//       });

//       return response.data;

//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data || { message: "Something went wrong" }
//       );
//     }
//   }
// );
