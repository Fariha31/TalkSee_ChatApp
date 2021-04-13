import axios from "axios";
axios.defaults.headers.common["x-auth-token"] =localStorage.getItem("token");
export const signup = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post("http://localhost:8000/api/auth/signup", data, config);
  return response;
};
export const login = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post("http://localhost:8000/api/auth/login", data, config);
  return response;
};
