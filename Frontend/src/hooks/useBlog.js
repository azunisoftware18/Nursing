import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios.config";

export const useBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await api.get("/blog");
      return res.data;
    },
  });
};

export const useAddBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => {
      
      return api.post("/blog", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      return api.delete(`/blog/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
  });
};


export const useUpdateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      return api.put(`/blog/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
  });
};

export const useBlogById = (id) => {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const res = await api.get(`/blog/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};
