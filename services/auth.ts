import axios from "axios";
import { LoginDto, TokenResponse } from "../components/auth/login-form/types";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export const authenticate = async (data: LoginDto) => {
  const response = await apiClient.post("auth/login", data);
  return response.data;
};
