// partSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { createParts, deleteParts, getParts, updateParts } from "./partThunk";
import { TechnicianAddedParts } from "../service/serviceThunk";
const initialState = {
  loading: false,
  error: null,
  parts: [],
  pagination: {
    totalRecords: 0,
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
  },
};
const partSlice = createSlice({
  name: "parts",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // 🔹 CREATE PART
      .addCase(createParts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createParts.fulfilled, (state, action) => {
        state.loading = false;
        state.parts.push(action.payload.data);
      })
      .addCase(createParts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 GET PARTS
      // .addCase(getParts.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(getParts.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.parts = action.payload.data;
      //                     state.pagination = action.payload.pagination;

      //           // state.parts = action.payload;

      // })

      .addCase(getParts.fulfilled, (state, action) => {
  state.loading = false;

  state.parts = action.payload.data;        // ✅ array
  state.pagination = action.payload.pagination; // ✅ pagination
})
      .addCase(getParts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


    //   update parts


      .addCase(updateParts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateParts.fulfilled, (state, action) => {
        state.loading = false;
        // state.parts = action.payload.data;
        const updatedData=action.payload.data;
        const index=state.parts.findIndex((part)=>(
            part._id==updatedData._id
        ))
        if (index !== -1) {
    state.parts[index] = updatedData;
  }
      })
      .addCase(updateParts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


    //   delete


     .addCase(deleteParts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
  .addCase(deleteParts.fulfilled, (state, action) => {
      state.loading = false; // ✅ IMPORTANT
  state.parts = state.parts.filter(
    (part) => part._id !== action.payload
  );
})
      .addCase(deleteParts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // jab main stock added kar rha tha tha to stock immedeated kam nhi ho rha tha issi liye maine technician parts ko add kiya


      .addCase(TechnicianAddedParts.fulfilled, (state, action) => {
      const { partId, quantity } = action.meta.arg.data;

      const part = state.parts.find(p => p._id === partId);

      if (part) {
        part.stock = part.stock - quantity;
      }
    });
  },
});

export const { clearError } = partSlice.actions;
export default partSlice.reducer;