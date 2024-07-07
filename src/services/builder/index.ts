import { api } from "@/api";
import { API_URLS } from "@/constants";
import { Builder, GetBuilder } from "@/types";

import queryString from "query-string";

export const BUILDER_API = {
  getBuilders: async (query: Record<string, any> = {}): Promise<Builder[]> =>
    await api.get(`${API_URLS.BUILDER}?${queryString.stringify(query)}`),

  getBuilder: async ({ contextId = '' }: GetBuilder): Promise<Builder> =>
    await api.get(`${API_URLS.BUILDER_CONTEXT}/${contextId}`),
};
