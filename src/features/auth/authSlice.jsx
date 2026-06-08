// import { createSlice } from "@reduxjs/toolkit";
// import { getCustomer, getTechnicians, loginUser, registerUser } from "./authThunk";

// const initialState = {
//   user: null,
//   loading: false,
//   error: null,
//   technicians: [],
//   customers:[]

// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     clearError: (state) => {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // here login slice
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//   state.loading = false;
//   state.user = action.payload.user;
//   state.token = action.payload.token;
// })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload
//       })


//       // here listing all technician

//       .addCase(getTechnicians.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getTechnicians.fulfilled, (state, action) => {
//         state.loading = false;
//         state.technicians = action.payload;
//       })
//       .addCase(getTechnicians.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload
//       })


//       .addCase(getCustomer.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getCustomer.fulfilled, (state, action) => {
//         state.loading = false;
//         state.customers = action.payload;
//       })
//       .addCase(getCustomer.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload
//       })
//   },
// });

// export const { clearError } = authSlice.actions;
// export default authSlice.reducer;










import { createSlice } from "@reduxjs/toolkit";
import { AllRegisterUser, AssignRole, getCustomer, getTechnicians, loginUser, registerUser, resetPassword, UserForgetPassword } from "./authThunk";

const initialState = {
  // user: JSON.parse(localStorage.getItem("data")) || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
  technicians: [],
  customers: [],
  allRegisterUser:[]
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // here login slice
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      //       .addCase(loginUser.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.user = action.payload.user;
      //   state.token = action.payload.token;
      // })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;  // ✅ FIX
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })


      // here listing all technician

      .addCase(getTechnicians.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTechnicians.fulfilled, (state, action) => {
        state.loading = false;
        state.technicians = action.payload;
      })
      .addCase(getTechnicians.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })


      .addCase(getCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(getCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })
      // forget pass

      .addCase(UserForgetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })


      .addCase(UserForgetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(UserForgetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })


      // reset password


      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })


      // get all register


      .addCase(AllRegisterUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AllRegisterUser.fulfilled, (state, action) => {
        state.loading = false;
        state.allRegisterUser = action.payload.data;
      })
      .addCase(AllRegisterUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })


//assign role

      .addCase(AssignRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AssignRole.fulfilled, (state, action) => {
  state.loading = false;

  const updatedUser = action.payload.data;

  // ✅ update only one user in list
  state.allRegisterUser = state.allRegisterUser.map((user) =>
    user._id === updatedUser._id ? updatedUser : user
  );
})
      .addCase(AssignRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })
  },
});

export const { clearError, logout } = authSlice.actions;
export default authSlice.reducer;
