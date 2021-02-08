import axios from "axios";

export const signup = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post("/auth/signup", data, config);
  return response;
};
export const login = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post("/auth/login", data, config);
  return response;
};
