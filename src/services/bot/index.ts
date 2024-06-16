import { api } from "@/api";
import { API_URLS } from "@/constants";
import { Builder } from "@/types";

export const BOT_API = {
  getBots: async (): Promise<Builder[]> =>
    await api.get(`${API_URLS.CHAT_BOTS}`),
};
