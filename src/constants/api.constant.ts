const BASE_API_URL = process.env.EXPO_PUBLIC_API_URL || "https://x.igot.app";
export const API_URLS = {
  BASE_API_URL,
  AUTHOR_PROFILE: "/v1/authors",
  CHAT_PROMPT: "/v1/prompt",
  CHAT_SESSIONS: "/v1/chat/sessions",
  BUILDER_CONTEXT: "/v1/builder/context",
  CHAT: "/v1/chat",
  PROFILE: "/v1/me",
  WORKSPACES: "/v1/workspaces",
  LOGIN: "/v1/login",
  BUILDER: "/v1/builder",
  ITEMS_TEMPLATES: "/v1/items/templates",
  TEMPLATES: "/v1/templates",
  SEARCHING: "/v1/searching",
  CONNECTORS: "/v1/connectors",
  CONNECTORS_CC_PAIR: "/v1/connectors/cc_pair",
  CONNECTORS_INDEX_STATUS: "/v1/connectors/indexing-status",
  CREDENTIALS: "/v1/credentials",
  GMAIL_APP_CREDENTIAL: "/v1/connectors/gmail/app-credential",
  GMAIL_AUTHORIZE: "/v1/connectors/gmail/authorize",
  GOOGLE_DRIVE_APP_CREDENTIAL: "/v1/connectors/google-drive/app-credential",
  GOOGLE_DRIVE_AUTHORIZE: "/v1/connectors/google-drive/authorize",
  WORKSPACES_MEMBERS: "/v1/workspaces/members",
  BOTS_CONFIGS: "/v1/bots/configs",
  INVITE_USER: "/v1/workspaces/invite",
  TOOLS: "/v1/items/tools",
  SSE_LISTENER: BASE_API_URL + "/sse/sub",
};

export const BOT_PAGE_SIZE = 10;
export enum SCROLL_DIRECTION {
  UP = 0,
  DOWN = 1,
}

export const AUTH_TOKEN_KEY = "TOKEN";
