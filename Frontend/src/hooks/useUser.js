import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios.config";
import toast from "react-hot-toast";

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await api.get("/user/me");
      return res.data.data; // <-- user object only
    },
  });
};

export const useUpdateMe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const res = await api.put("/user/me", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};