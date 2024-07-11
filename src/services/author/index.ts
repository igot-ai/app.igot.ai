import { api } from "@/api";
import { API_URLS } from "@/constants";
import { Profile } from "@/types";

export const AUTHOR_API = {
  getAuthorInfo: async (id?: string): Promise<Profile> =>
    await api.get(`${API_URLS.AUTHOR_PROFILE}/${id}`),
};
