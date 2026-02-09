import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios.config";

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const res = await api.get("/dashboard/stats");
      return res.data.data;
    },
  });
};
