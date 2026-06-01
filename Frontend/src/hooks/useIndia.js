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

export const useIndiaCities = (stateCode) => {
  return useQuery({
    queryKey: ["india-cities", stateCode],
    queryFn: async () => {
      const res = await api.get(`/college/india/cities/${stateCode}`);
      return res.data;
    },
    enabled: !!stateCode,
  });
};
