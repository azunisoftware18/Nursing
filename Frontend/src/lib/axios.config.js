import axios from "axios";
import { store } from "../redux/store";

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

export default api;
