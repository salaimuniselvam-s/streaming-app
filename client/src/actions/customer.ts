import axiosInstance from "../axios/axiosInterceptors";
import { API_BASE_URL } from "../utils/constants";

export const getAllMoviesForCustomer = async () => {
  const response = await axiosInstance.get(
    `${API_BASE_URL}/customer/get-all-videos`
  );
  return response.data;
};

export const getFavouriteMoviesForCustomer = async () => {
  const response = await axiosInstance.get(
    `${API_BASE_URL}/customer/favourite-movies`
  );
  return response.data;
};

export const addToFavouriteMovie = async (id: string) => {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/customer/add-to-favourite-movie/${id}`
  );
  return response.data;
};
export const removeFromFavouriteMovie = async (id: string) => {
  const response = await axiosInstance.delete(
    `${API_BASE_URL}/customer/remove-from-favourite-movie/${id}`
  );
  return response.data;
};
