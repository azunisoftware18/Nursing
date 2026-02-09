import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios.config";

export const useCollegeSearch = ({ search, state, city }) => {
  return useQuery({
    queryKey: ["college-search", search, state, city],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (search) params.append("q", search);
      if (state) params.append("state", state);
      if (city) params.append("city", city);

      const res = await api.get(`/college/search?${params.toString()}`);
      return res.data;
    },
    enabled: !!search || !!state || !!city,
  });
};

