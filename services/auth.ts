import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export const authenticate = async (data: any) => {
  const payload = {
    username: data.email,
    password: data.password,
  };
  const response = await apiClient.post<{ token: string }>(
    "auth/login",
    payload
  );

  return response.data;
};
