import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export const authenticate = async (data) => {
  const response = await apiClient.post("/auth/login", data);
  return response.data;
};
