import { LoginType, RegisterType } from "../types";
import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import axiosInstance from "../axios/axiosInterceptors";

export const loginUser = async (loginData: LoginType) => {
  const response = await axios.post(`${API_BASE_URL}/login`, loginData);
  return response.data;
};

export const logoutUser = async () => {
  const response = await axiosInstance.delete(`${API_BASE_URL}/logout`);
  return response.data;
};

export const registerUser = async (registerData: RegisterType) => {
  // admin registration url ---? /register-admin
  const response = await axios.post(
    `${API_BASE_URL}/register-customer`,
    registerData
  );
  return response.data;
};
