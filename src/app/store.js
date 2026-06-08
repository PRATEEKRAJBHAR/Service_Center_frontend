import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import CustomerList from "../features/customer/customerSlice";
import ServiceReducer from '../features/service/serviceSlice';
import PartReducer from '../features/parts/partSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,//authSlice me maine   name: "auth", likha hai issi liye yaha par 'auth' likha hua hai..
    customer: CustomerList,
    service:ServiceReducer,
    parts:PartReducer

  },
});
