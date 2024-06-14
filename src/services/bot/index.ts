import { api } from "@/api";
import { API_URLS } from "@/constants";

export const BOT_API = {
  getBots: async (): Promise<any[]> =>
    await api.get(`${API_URLS.CHAT_BOTS}`),
};
