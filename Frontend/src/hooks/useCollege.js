import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios.config";

export const useColleges = () => {
  return useQuery({
    queryKey: ["colleges"],
    queryFn: async () => {
      const res = await api.get("/college");
      return res.data;
    },
  });
};

export const useCollegeById = (id) => {
  return useQuery({
    queryKey: ["college", id],
    queryFn: async () => {
      const res = await api.get(`/college/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useAddCollege = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData) => {
      const res = await api.post("/college", formData);
      return res.data; 
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["colleges"] });
    },
  });
};

export const useUpdateCollege = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await api.put(`/college/${id}`, data);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["colleges"] });
    },
  });
};

export const useDeleteCollege = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const res = await api.delete(`/college/${id}`);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["colleges"] });
    },
  });
};


export const useCollegesByCourse = (courseId) => {
  return useQuery({
    queryKey: ["colleges-by-course", courseId],
    queryFn: async () => {
      const res = await api.get(`/college/college/by-course?course=${courseId}`);
      return res.data;
    },
    enabled: !!courseId,
  });
};


export const useCollegeCourses = (collegeId) => {
  return useQuery({
    queryKey: ["college-courses", collegeId],
    queryFn: async () => {
      const res = await api.get(`/college/${collegeId}/courses`);
      return res.data;
    },
    enabled: !!collegeId,
  });
};