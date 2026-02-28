import { useMutation } from "@tanstack/react-query";
import api from "../lib/axios.config";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../redux/slices/authSlice";
import toast from "react-hot-toast";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/auth/login", data);
      return res.data; // ✅ return backend response
    },

    onSuccess: (data) => {
      dispatch(loginSuccess(data));

      if (data?.message) {
        toast.success(data.message); // ✅ backend message only
      }

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1000);
    },

    onError: (err) => {
      const message = err?.response?.data?.message;

      if (message) {
        toast.error(message); // ✅ backend error only
      }
    },
  });
};