import { Login } from "@/types";
import { api } from "../../api";
import { API_URLS } from "../../constants";

export const AUTH_API = {
  login: async (payload: Login) => await api.post(API_URLS.LOGIN, payload),
};
