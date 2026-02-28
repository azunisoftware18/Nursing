import axios from "axios";
import { store } from "../redux/store";
import { logout } from "../redux/slices/authSlice";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/v1`,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = store.getState().auth?.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      store.dispatch(logout());

      // redirect to login
      window.location.href = "/admin/login";
    }

    return Promise.reject(error);
  }
);

export default api;