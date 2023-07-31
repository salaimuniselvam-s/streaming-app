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

export const getAllFriendsForCustomer = async (username: string) => {
  const response = await axiosInstance.get(
    `${API_BASE_URL}/customer/${username}/get-all-friends`
  );
  return response.data;
};

export const getAllCustomers = async () => {
  const response = await axiosInstance.get(
    `${API_BASE_URL}/customer/get-all-customers`
  );
  return response.data;
};

export const addFriendToFriendsGroup = async (
  username: string,
  friends: string[]
) => {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/customer/${username}/add-friends`,
    { friends }
  );
  return response.data;
};

export const removeFriendFromFriendsGroup = async (
  username: string,
  friendName: string
) => {
  const response = await axiosInstance.delete(
    `${API_BASE_URL}/customer/${username}/delete-friend/${friendName}`
  );
  return response.data;
};
