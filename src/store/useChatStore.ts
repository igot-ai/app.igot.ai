import { Conversation } from "@/types";
import { uniqBy } from "lodash";
import { create } from "zustand";

interface ChatProperties {
  conversations: Conversation[];
  loading: boolean;
  message: string;
  task_type: string;
  summarizeThought: string;
  answer: string;
  response: string | null;
  isRendered: boolean;
  lastConversationSize: number | null;
}

type SetConversations = {
  conversations: Conversation[];
  prepend?: boolean;
};

interface ChatStore extends ChatProperties {
  setConversations: (setConversations: SetConversations) => void;
  setLastConversationSize: (lastConversationSize: number | null) => void;
  resetConversations: () => void;
  setLoading: (loading: boolean) => void;
  setMessage: (message: string) => void;
  setTaskType: (task_type: string) => void;
  setSummarizeThought: (summarizeThought: string) => void;
  setAnswer: (answer: string) => void;
  setResponse: (response: string | null) => void;
  setIsRendered: (isRendered: boolean) => void;
}

export const DEFAULT_CHAT_STATE: ChatProperties = {
  message: "",
  conversations: [],
  loading: false,
  task_type: "",
  answer: "",
  summarizeThought: "",
  response: null,
  isRendered: false,
  lastConversationSize: null,
};

// TODO: without persisting state in local storage
export const useChatStore = create<ChatStore>((set) => ({
  ...DEFAULT_CHAT_STATE,
  setConversations: ({ conversations, prepend }) =>
    set((state) => ({
      conversations: prepend
        ? uniqBy([...conversations, ...state.conversations], "id")
        : uniqBy([...state.conversations, ...conversations], "id"),
    })),
  resetConversations: () => set({ conversations: [] }),
  setLoading: (loading) => set({ loading }),
  setMessage: (message) => set({ message }),
  setTaskType: (task_type) => set({ task_type }),
  setSummarizeThought: (summarizeThought) => set({ summarizeThought }),
  setAnswer: (answer) => set({ answer }),
  setResponse: (response) => set({ response }),
  setIsRendered: (isRendered) => set({ isRendered }),
  setLastConversationSize: (lastConversationSize) =>
    set({ lastConversationSize }),
}));

interface SessionStore {
  session_id: string;
  runningSessionId: string;
  setRunningSessionId: (runningSessionId: string) => void;
  setSessionId: (session_id: string) => void;
}

export const useSessionStore = create<SessionStore>((set) => ({
  session_id: "",
  runningSessionId: "",
  setSessionId: (session_id) => set({ session_id }),
  setRunningSessionId: (runningSessionId) => set({ runningSessionId }),
}));
