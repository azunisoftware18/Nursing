import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../lib/axios.config";

export const useApply = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/leads", data);
      return res.data;
    },
  });
};

export const useLeads = () => {
  return useQuery({
    queryKey: ["leads"],
    queryFn: async () => {
      const res = await api.get("/leads");
      return res.data;
    },
  });
};
