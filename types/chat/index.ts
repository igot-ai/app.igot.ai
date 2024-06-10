export interface GetSession {
  context_id?: string;
  session_id?: string;
  query?: {
    page?: number;
    filter?: string;
    page_size?: number;
    idx?: number;
    scroll?: 0 | 1;
  };
}

export interface Session {
  session_id: string;
  response: string;
  created_at: string; // Consider using Date if you parse it
  rank: number;
}

export interface Conversation {
  session_id: string;
  content: string;
  created_at: Date;
  id: number;
  bot_id: string;
  chain_response: string;
  role: "user" | "assistant";
  created_by: string;
}

export interface SendMessage {
  session_id: string;
  prompt: string;
}
