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
    const token = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
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
