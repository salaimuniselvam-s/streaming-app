import axiosInstance from "../axios/axiosInterceptors";
import { movieType, planType } from "../types";
import { API_BASE_URL } from "../utils/constants";

export const uploadVideoToServer = async (video: movieType) => {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/admin/upload-video`,
    video
  );
  return response.data;
};

export const getAllMovies = async () => {
  const response = await axiosInstance.get(
    `${API_BASE_URL}/admin/get-all-videos`
  );
  return response.data;
};

export const updatePlansByMovieId = async (id: string, plan: string[]) => {
  const response = await axiosInstance.put(
    `${API_BASE_URL}/admin/update-movie-plans/${id}`,
    { plans: plan }
  );
  return response.data;
};

export const getAllPlans = async () => {
  const response = await axiosInstance.get(`${API_BASE_URL}/get-all-plans`);
  return response.data;
};

export const addNewPlan = async (plan: planType) => {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/admin/add-new-plans`,
    plan
  );
  return response.data;
};

export const removePlan = async (id: string) => {
  const response = await axiosInstance.delete(
    `${API_BASE_URL}/admin/remove-plan/${id}`
  );
  return response.data;
};
