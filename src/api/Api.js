import axios from "axios";
// console.log("my env file is :",import.meta.env.VITE_API_URL);
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,   // important if using cookies
});

// attach token automatically
API.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;

});
export default API;




