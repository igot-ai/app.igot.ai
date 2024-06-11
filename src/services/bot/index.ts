import { api } from "@/api";
import { Bot } from "@/types";
import { API_URLS } from "@/constants";

export const BOT_API = {
  getBots: async (): Promise<any[]> =>
    await api.get(`${API_URLS.TOOLS}`),
};
