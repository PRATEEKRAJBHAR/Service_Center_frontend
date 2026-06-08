import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/Api";
export const createParts = createAsyncThunk(
  "parts/create",
  async (data, thunkApi) => {
    try {
      const response = await API.post("/parts", data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data || {
          message: error.message,
        }
      );
    }
  }
);



// get all parts


// export const getParts=createAsyncThunk(
//     'parts/get',
//     async(_,thunkApi)=>{
//         try{
//             const response=await API.get('/parts');
//             console.log(response,"response");
//             return response.data

//         }catch(error){
//             return thunkApi.rejectWithValue(error.response?.data?.message || error.message)
//         }
//     }
// )


// here searching,sorting,filtering and pagination



export const getParts = createAsyncThunk(
    'parts/get',
    async ({ search, minPrice, maxPrice, sortBy, sortOrder, page, limit }, thunkApi) => {
        try {
            let url = `/parts?search=${search || ''}`;
            if (minPrice) {
                url += `&minPrice=${minPrice}`
            }
            if (maxPrice) {
                url += `&maxPrice=${maxPrice}`
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
            console.log(response, "response");
            return response.data

        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message || error.message)
        }
    }
)



// update parts

export const updateParts = createAsyncThunk(
  "parts/update",
  async ({ id, xxx }, thunkApi) => {
    try {
      const response = await API.put(`/parts/${id}`, xxx);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data || {
          message: error.message,
        }
      );
    }
  }
);
// delete



export const deleteParts = createAsyncThunk(
    'parts/delete',
    async ({ id }, thunkApi) => {
        try {
            const response = await API.delete(`/parts/${id}`);
            console.log(response, "response");
            return id;

        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message || error.message)
        }
    }
)
