import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/Api";

export const CreateService = createAsyncThunk(
    'service/create',
    async (serviceData, thunkApi) => {
        try {
            const response = await API.post('/services', serviceData);
            // console.log(response, "service response data");
            return response.data

        } catch (err) {
            console.log(err);
            return thunkApi.rejectWithValue(
                err.response?.data || { message: "Something went wrong" }
            );
        }
    }
)


// listing customer service

export const ListingService = createAsyncThunk(
    'service/listing',
    async ({ search, status, startDate, endDate ,technician,sortBy,sortOrder,page,limit}, thunkApi) => {
        try {
            let url = `/services?`;

if (search) url += `search=${search}&`;
if (status) url += `status=${status}&`;
if (startDate) url += `startDate=${startDate}&`;
if (endDate) url += `endDate=${endDate}&`;
if (technician) url += `technician=${technician}&`;
if (sortBy) url += `sortBy=${sortBy}&`;
if (sortOrder) url += `sortOrder=${sortOrder}&`;
if (page) url += `page=${page}&`;
if (limit) url += `limit=${limit}`;
            // console.log(response, "service listing response data");
            const response = await API.get(url);
            console.log(response,"response data heresss");
            return response.data

        } catch (err) {
            // console.log(err);
            return thunkApi.rejectWithValue(
                err.response?.data || { message: "Something went wrong" }
            );
        }
    }
)



// here edit operation perfomr


export const EditService = createAsyncThunk(
    "service/editService",
    async ({ id, data }, thunkAPI) => {
        try {
            const response = await API.put(`/services/${id}`, data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);



// status update


export const updateStatus = createAsyncThunk(
    "service/statusupdate",
    async ({ id, data }, thunkAPI) => {
        try {
            const response = await API.patch(`/services/${id}`, data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);


// here adding bulk status update

export const BulkStatus = createAsyncThunk(
    "service/bulkstatus",
    async (bulkStatusUpdate, thunkAPI) => {
        try {
            const response = await API.put("/services/bulk-status", bulkStatusUpdate);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || "Something went wrong"
            );
        }
    }
);



// here listing single service details thunks



export const ListingSingleService = createAsyncThunk(
    'service/singlelisting',
    async (id, thunkApi) => {
        try {
            const response = await API.get(`/services/${id}`);
            console.log(response, "service listing response data");
            return response.data

        } catch (err) {
            console.log(err);
            return thunkApi.rejectWithValue(
                err.response?.data || { message: "Something went wrong" }
            );
        }
    }
)



// add service log



export const addServiceLog = createAsyncThunk(
    'service/addservice',
    async ({ id, data }, thunkApi) => {
        try {
            const response = await API.put(`/services/add-log/${id}`, data);
            // console.log(response, "service log created response data");
            return response.data

        } catch (err) {
            console.log(err);
            return thunkApi.rejectWithValue(
                err.response?.data || { message: "Something went wrong" }
            );
        }
    }
)





// remove service log



export const removeServiceLog = createAsyncThunk(
    'service/removeservice',
    async ({ id, logId }, thunkApi) => {
        try {
            const response = await API.put(`/services/remove-log/${id}/${logId}`);
            return response.data

        } catch (err) {
            console.log(err);
            return thunkApi.rejectWithValue(
                err.response?.data || { message: "Something went wrong" }
            );
        }
    }
)



// here added img api



export const addServiceLogImg = createAsyncThunk(
    'service/imgservice',
    async ({ id, data }, thunkApi) => {
        try {
            const response = await API.put(`/services/add-img/${id}`, data);
            return response.data

        } catch (err) {
            console.log(err);
            return thunkApi.rejectWithValue(
                err.response?.data || { message: "Something went wrong" }
            );
        }
    }
)



// remove img thunk


export const removeServiceLogImg = createAsyncThunk(
    'service/removeimgservice',
    async ({ id, imgId }, thunkApi) => {
        try {
            const response = await API.put(`/services/remove-img/${id}/${imgId}`);
            return response.data

        } catch (err) {
            console.log(err);
            return thunkApi.rejectWithValue(
                err.response?.data || { message: "Something went wrong" }
            );
        }
    }
)



// adding reports



export const addServiceLogreport = createAsyncThunk(
    'service/reportservice',
    async ({ id, data }, thunkApi) => {
        try {
            const response = await API.put(`/services/add-report/${id}`, data);
            return response.data

        } catch (err) {
            console.log(err);
            return thunkApi.rejectWithValue(
                err.response?.data || { message: "Something went wrong" }
            );
        }
    }
)



// remove report thunk


export const removeServiceLogReport = createAsyncThunk(
    'service/removereportservice',
    async ({ id, reportId }, thunkApi) => {
        try {
            const response = await API.put(`/services/remove-report/${id}/${reportId}`);
            return response.data

        } catch (err) {
            console.log(err);
            return thunkApi.rejectWithValue(
                err.response?.data || { message: "Something went wrong" }
            );
        }
    }
)



// here technician assign

export const assignTechnician = createAsyncThunk(
    'service/assigntech',
    async ({ id, data }, thunkApi) => {
        try {
            const response = await API.put(`/services/${id}/assign`, data)
            console.log(response.data, "res");
            return response.data

        } catch (err) {
            console.log(err);
            return thunkApi.rejectWithValue(
                err.response?.data || { message: "Something went wrong" }
            );
        }
    }
)




// technician added parts





export const TechnicianAddedParts = createAsyncThunk(
    'service/technicianAddparts',
    async ({ id, data, techId }, thunkApi) => {
        try {
            const response = await API.put(`/services/${id}/technician/${techId}/parts`, data)
            console.log(response.data, "res");
            return response.data

        } catch (err) {
            console.log(err);
            return thunkApi.rejectWithValue(
                err.response?.data || { message: "Something went wrong" }
            );
        }
    }
)


// send mail pdf




export const sendMail=createAsyncThunk(
    'service/sendmail',
    async (id, thunkApi) => {
        try {
            const response = await API.get(`/services/pdf/${id}`);
            // console.log(response, "send mail");
            return response.data

        } catch (err) {
            console.log(err);
            return thunkApi.rejectWithValue(
                err.response?.data || { message: "Something went wrong" }
            );
        }
    }
)



// customer history

export const customerHistory=createAsyncThunk(
    'service/customerHistoty',
    async(userId,thunkApi)=>{
        try{
            const history=await API.get(`/services/customer-history/${userId}`);
            console.log(history,"histoy");
            return history.data

        }catch(err){
            return thunkApi.rejectWithValue(
                err.response?.data || { message: "Something went wrong" }
            );
        }
    }
)


// here download ticket

export const downloadTicket = createAsyncThunk(
  "service/downloadticket",
  async (id, thunkApi) => {
    try {
      const response = await API.get(
        `/services/download-pdf/${id}`,
        {
          responseType: "blob", // ✅ IMPORTANT
        }
      );

      return response.data; // blob
    } catch (err) {
      return thunkApi.rejectWithValue(
        err.response?.data || { message: "Something went wrong" }
      );
    }
  }
);




// staus view


// export const getCustomerServices = createAsyncThunk(
//   "service/getCustomerServices",
//   async (customerId, thunkApi) => {
//     try {
//       const res = await API.get(`/services/customer/${customerId}`);
//       console.log(res,"sfjs");
//       return res.data;
//     } catch (err) {
//       return thunkApi.rejectWithValue(err.response?.data);
//     }
//   }
// );




export const getCustomerServices = createAsyncThunk(
  "service/getCustomerServices",
  async ({customerId,ticketId}, thunkApi) => {
    try {
      const res = await API.get(`/services/customer/${customerId}/${ticketId}`);
    //   console.log(res,"sfjjk jskjfhk ijoisdjfo iiosfddjio ijsids");
      return res.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response?.data);
    }
  }
);



// customer regarding ticket choose


export const getTicketsByCustomer = createAsyncThunk(
  "service/getTicketsByCustomer",
  async ({customerId}, thunkApi) => {
    try {
      const res = await API.get(`/services/ticket-by-customer/${customerId}`);
    //   console.log(res,"sfjjk jskjfhk ijoisdjfo iiosfddjio ijsids");
      return res.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response?.data);
    }
  }
);


// listing all customer



// export const listingCustomer = createAsyncThunk(
//     'service/assigntech',
//     async ({ id, data }, thunkApi) => {
//         try {
//             const response = await API.put(`/services/${id}/assign`, data)
//             console.log(response.data, "res");
//             return response.data

//         } catch (err) {
//             console.log(err);
//             return thunkApi.rejectWithValue(
//                 err.response?.data || { message: "Something went wrong" }
//             );
//         }
//     }
// )




