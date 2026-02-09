import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios.config";

export const useIndiaStates = () => {
  return useQuery({
    queryKey: ["india-states"],
    queryFn: async () => {
      const res = await api.get("/college/india/states-cities");
      return res.data;
    },
  });
};

export const useIndiaCities = (state) => {
  return useQuery({
    queryKey: ["india-cities", state],
    queryFn: async () => {
      const res = await api.get(
        `/college/india/cities?state=${state}`
      );
      return res.data;
    },
    enabled: !!state, // 🔥 state select hone ke baad hi chale
  });
};
