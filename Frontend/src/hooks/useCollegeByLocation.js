import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios.config";

export const useCollegesByLocation = (state, city) => {
  return useQuery({
    queryKey: ["colleges-location", state, city],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (state) params.append("state", state);
      if (city) params.append("city", city);

      const res = await api.get(`/college/filter?${params.toString()}`);
      return res.data;
    },
    enabled: !!state || !!city, // 🔥 key
  });
};
