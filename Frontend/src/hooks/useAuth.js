import { useMutation } from "@tanstack/react-query";
import api from "../lib/axios.config";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../redux/slices/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/auth/login", data);
      return res.data;
    },

    onSuccess: (data) => {
      dispatch(loginSuccess(data));
      navigate("/admin/dashboard");
    },

    onError: (err) => {
      console.error("Login failed:", err.response?.data);
    },
  });
};
