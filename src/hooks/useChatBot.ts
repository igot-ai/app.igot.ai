import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { CHAT_API } from "../services";
import { AGENT_TASKS, PAGE_SIZE, DATA_TASKS } from "../constants";
import { useGlobalSearchParams } from "expo-router";
import { GetSession } from "@/types";
import { useMemo } from "react";
import { uniq } from "lodash";
import { useChatStore, useSessionStore } from "@/store";

export const RESET_TIMESTAMP = null;

interface ChatBotOptions {
  filter?: string | undefined;
  sessionId?: string;
}

export const useChatBot = (options: ChatBotOptions = {}) => {
  const queryClient = useQueryClient();
  const { context_id } = useGlobalSearchParams();

  const { setSessionId, session_id } = useSessionStore();

  const { setConversations, setLoading, resetConversations, setMessage } =
    useChatStore();

  const sessions = useQuery({
    queryKey: [CHAT_API.getSessions.name, context_id],
    queryFn: async () => await CHAT_API.getSessions(context_id as string),
    enabled: !!context_id,
  });

  const contextInfo = useQuery({
    queryKey: [CHAT_API.getContextInfo.name, context_id],
    queryFn: async () => await CHAT_API.getContextInfo(context_id as string),
    enabled: !!context_id,
  });

  const getConversations = useMutation({
    mutationKey: [CHAT_API.getConversations.name, session_id],
    mutationFn: async ({
      session_id,
      query,
    }: Pick<GetSession, "session_id" | "query">) =>
      await CHAT_API.getConversations({
        context_id: context_id as string,
        session_id,
        query: {
          ...query,
          page_size: PAGE_SIZE,
        },
      }),
    onSuccess: (conversations, { query }) => {
      if (!query || !query.idx) {
        resetConversations();
      }

      setConversations({
        conversations,
        prepend: query?.idx ? true : false,
      });
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
      resetConversations();
      await queryClient.invalidateQueries({
        queryKey: [CHAT_API.getSessions.name],
      });
    },
  });

  const conversationsMedia = useQuery({
    queryKey: [
      CHAT_API.getConversations.name,
      context_id,
      session_id,
      options.filter,
    ],
    queryFn: async () =>
      await CHAT_API.getConversations({
        context_id: context_id as string,
        session_id,
        query: {
          filter: options.filter,
        },
      }),
    enabled: !!session_id && !!context_id && !!options.filter,
  });

  const createSession = useMutation({
    mutationKey: [CHAT_API.createSession.name],
    mutationFn: async ({ ctx }: { ctx?: string }) =>
      await CHAT_API.createSession(ctx ? ctx : (context_id as string)),
    onSuccess: async ({ session_id }) => {
      await queryClient.resetQueries({
        queryKey: [CHAT_API.getConversations.name],
      });
      setSessionId(session_id);
    },
  });

  const createNewSession = async (ctx?: string) => {
    resetConversations();
    setSessionId("");
    const { session_id } = await createSession.mutateAsync({ ctx });

    setSessionId(session_id);

    return session_id;
  };

  const sendPrompt = async ({
    message,
    session_id,
  }: {
    message: string;
    session_id: string;
  }) => {
    setLoading(true);
    setMessage("");

    await CHAT_API.sendMessage({ session_id, prompt: message });
  };

  const getTaskType = (text: string) => {
    const regex = /Action_(\w+)_\d+/;
    const match = regex.exec(text);

    return match ? match[1] : "";
  };

  const agentTasks = useMemo(() => {
    return uniq(contextInfo.data?.tasks.map((task) => task.action.type)).filter(
      (action): action is keyof typeof AGENT_TASKS =>
        Object.values(AGENT_TASKS).includes(action as AGENT_TASKS)
    );
  }, [contextInfo.data]);

  const dataTasks = useMemo(() => {
    return uniq(contextInfo.data?.tasks.map((task) => task.action.type)).filter(
      (action): action is keyof typeof DATA_TASKS =>
        Object.values(DATA_TASKS).includes(action as DATA_TASKS)
    );
  }, [contextInfo.data]);

  return {
    contextInfo,
    sessions: { ...sessions, data: sessions.data || [] },
    getConversations,
    createSession,
    createNewSession,
    sendPrompt,
    getTaskType,
    deleteSessions,
    agentTasks,
    dataTasks,
    conversationsMedia,
  };
};
