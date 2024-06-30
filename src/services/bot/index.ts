import { api } from "@/api";
import { Builder, Pagination } from "@/types";
import { API_URLS } from "@/constants";
import queryString from "query-string";

export const BOT_API = {
  getBots: async (query: Pagination): Promise<Builder[]> =>
    await api.get(`${API_URLS.CHAT_BOTS}?${queryString.stringify(query)}`),
};
