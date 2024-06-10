import queryString from "query-string";

import { isEmpty } from "lodash";
import { api } from "@/api";
import {
  Builder,
  Conversation,
  GetSession,
  SendMessage,
  Session,
} from "@/types";
import { API_URLS } from "@/constants";

export const CHAT_API = {
  getSessions: async (id: string): Promise<Session[]> =>
    await api.get(`${API_URLS.CHAT_SESSIONS}/${id}`),

  getContextInfo: async (id: string): Promise<Builder> =>
    await api.get(`${API_URLS.BUILDER_CONTEXT}/${id}`),

  getConversations: async (payload: GetSession): Promise<Conversation[]> =>
    await api.get(
      `${API_URLS.CHAT_SESSIONS}/${payload.context_id}/${payload.session_id}${
        isEmpty(payload.query) ? "" : "?" + queryString.stringify(payload.query)
      }`
    ),

  createSession: async (id: string): Promise<{ session_id: string }> =>
    await api.post(`${API_URLS.CHAT}/${id}`),

  deleteSession: async (payload: GetSession) =>
    await api.delete(
      `${API_URLS.CHAT}/sessions/${payload.context_id}/${payload.session_id}`
    ),

  sendMessage: async (payload: SendMessage) =>
    await api.post(`${API_URLS.CHAT_PROMPT}/${payload.session_id}`, payload),
};
