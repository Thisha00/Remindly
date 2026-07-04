import axios from "axios";
import { getAccessToken } from "../services/tokenService";

const api = axios.create({
  baseURL: "http://10.0.2.2:3000/api/v1",
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Refresh token logic goes here
    }

    return Promise.reject(error);
  },
);

export default api;
