import { isArray } from "lodash";
import * as SecureStore from "expo-secure-store";
import axios, { AxiosResponse } from "axios";
import { API_URLS, AUTH_TOKEN_KEY } from "@/constants";

const api = axios.create({
  baseURL: API_URLS.BASE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    // const token = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ODhkM2VhLWNhM2YtNGYyZi05ZTI0LWM2ZmQxOTcxY2ExYyIsImVtYWlsIjoibXV0dGFraW5faGFzaWJAaWdvdC5haSIsIndzX2lkIjoiaWdvdGFpIiwid29ya3NwYWNlX2lkIjoiaWdvdGFpIiwiZXhwIjoxNzUyMjM3MjM2fQ.nFkxLwcjsGCqyzyzxqr8PrLydL8ue8F_hvs6Jsn8zww";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  async (error) => {
    if (error.response?.data?.message) {
      if (isArray(error.response?.data?.message)) {
        // TODO: Handle array of error message
      }
    }
    if (error.response?.status === 401 || error.response?.status === 403) {
    }

    return Promise.reject(error.response?.data);
  }
);

export { api };
