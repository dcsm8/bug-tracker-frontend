import axios from "axios";

export const authenticate = async (data: any) => {
  const payload = {
    username: data.email,
    password: data.password,
  };
  const response = await axios.post<{ token: string }>(
    "https://bug-tracker-backend-one.herokuapp.com/api/auth/login",
    payload
  );

  return response.data;
};
