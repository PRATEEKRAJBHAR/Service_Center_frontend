import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/Api";



export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (formData, thunkAPI) => {
        try {
            const response = await API.post("/auth/register", formData);
            // console.log(response,"my response ");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
);


// its login thunk middleware


export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userLogin, thunkAPI) => {
        try {
            const response = await API.post('/auth/login', userLogin);
            const data=response.data;
            console.log(data,"finale data");
            localStorage.setItem('token',data.token);
            localStorage.setItem('user',JSON.stringify(data.data));

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data)
        }
    }
)



// get technician

export const getTechnicians = createAsyncThunk(
  "technician/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await API.get("/auth/technicians");
      return response.data.data; // only list
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);





export const getCustomer = createAsyncThunk(
  "customer/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await API.get("/auth/Allcustomers");
      return response.data.data; // only list
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);



// forget password


export const UserForgetPassword=createAsyncThunk(
  'customer/forgetpass',
  async(val,thunkAPI)=>{
    try{
      const res=await API.post('/auth/customers/forget-password',val);
      return res.data

    }catch(error){
            return thunkAPI.rejectWithValue(error.response?.data);

    }
  }
)



// reset password



export const resetPassword=createAsyncThunk(
  'customer/resetpass',
  async({val,token},thunkAPI)=>{
    try{
      const res=await API.post(`/auth/customers/reset-password/${token}`,val);
      return res.data

    }catch(error){
            return thunkAPI.rejectWithValue(error.response?.data);

    }
  }
)



// listing all registerd users



export const AllRegisterUser=createAsyncThunk(
  'customer/allregiseter',
  async(_,thunkAPI)=>{
    try{
      const res=await API.get(`auth/customers/getAllUser`);
      console.log(res);
      return res.data;

    }catch(error){
                  return thunkAPI.rejectWithValue(error.response?.data);

    }
  }
)



// admin assign role



export const AssignRole=createAsyncThunk(
  'customer/assignrole',
  async({id,role},thunkAPI)=>{
    try{
      const res=await API.put(`auth/customers/assign-role/${id}`,{role});
      console.log(res);
      return res.data;

    }catch(error){
      return thunkAPI.rejectWithValue(error.response?.data);

    }
  }
)