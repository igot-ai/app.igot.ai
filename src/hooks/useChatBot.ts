import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { CHAT_API } from "../services";
import { BOT_PAGE_SIZE } from "../constants";
import { useLocalSearchParams, usePathname } from "expo-router";
import { GetSession } from "@/types";

export const RESET_TIMESTAMP = null;

interface ChatBotOptions {
  filter?: string | undefined;
}

export const useChatBot = (options: ChatBotOptions = {}) => {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  //   const { setSessionId, session_id } = useSessionStore();

  const { context_id } = useLocalSearchParams();
  //   const { setConversations, setLoading, resetConversations, setMessage } =
  //     useChatStore();

  const sessions = useQuery({
    queryKey: [CHAT_API.getSessions.name, context_id],
    queryFn: async () => await CHAT_API.getSessions(context_id as string),
    enabled: !!context_id && pathname.includes("/chat"),
  });

  const contextInfo = useQuery({
    queryKey: [CHAT_API.getContextInfo.name, context_id],
    queryFn: async () => await CHAT_API.getContextInfo(context_id as string),
    enabled: !!context_id,
  });

  const getConversations = useMutation({
    mutationKey: [CHAT_API.getConversations.name], // add dynamic session_id
    mutationFn: async ({
      session_id,
      query,
    }: Pick<GetSession, "session_id" | "query">) =>
      await CHAT_API.getConversations({
        context_id: context_id as string,
        session_id,
        query: {
          ...query,
          page_size: BOT_PAGE_SIZE,
        },
      }),
    onSuccess: (conversations, { query }) => {
      if (!query || !query.idx) {
        // resetConversations();
      }

      //   setConversations({
      //     conversations,
      //     prepend: query?.idx ? true : false,
      //   });
    },
  });

  const deleteSessions = useMutation({
    mutationKey: [CHAT_API.deleteSession.name],
    mutationFn: async (payload: GetSession) =>
      await CHAT_API.deleteSession({
        context_id: context_id as string,
        session_id: payload.session_id,
      }),
    onSuccess: async () => {
      //   resetConversations();
      await queryClient.invalidateQueries({
        queryKey: [CHAT_API.getSessions.name],
      });
    },
  });

  const createSession = useMutation({
    mutationKey: [CHAT_API.createSession.name],
    mutationFn: async () => await CHAT_API.createSession(context_id as string),
    onSuccess: async ({ session_id }) => {
      await queryClient.resetQueries({
        queryKey: [CHAT_API.getConversations.name],
      });
      //   setSessionId(session_id);
    },
  });

  const createNewSession = async () => {
    // resetConversations();
    // setSessionId("");
    const { session_id } = await createSession.mutateAsync();
    // setSessionId(session_id);

    return session_id;
  };

  const sendPrompt = async ({
    message,
    session_id,
  }: {
    message: string;
    session_id: string;
  }) => {
    // setLoading(true);
    // setMessage("");

    await CHAT_API.sendMessage({ session_id, prompt: message });
  };

  const getTaskType = (text: string) => {
    const regex = /Action_(\w+)_\d+/;
    const match = regex.exec(text);

    return match ? match[1] : "";
  };

  return {
    contextInfo,
    sessions: { ...sessions, data: sessions.data || [] },
    getConversations,
    createSession,
    createNewSession,
    sendPrompt,
    getTaskType,
    deleteSessions,
  };
};
