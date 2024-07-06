import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { BOT_API, BUILDER_API } from "../services";
import { PAGE_SIZE } from "@/constants";
import { Builder } from "@/types";

interface UseBotOptions {
  query?: Record<string, any>;
  fetchBots?: boolean;
  fetchBuilders?: boolean;
  contextId?: string;
}

export const useBot = (options?: UseBotOptions) => {
  const { query, fetchBots = true, fetchBuilders = false, contextId} = options || {};

  const bots = useInfiniteQuery({
    queryKey: [BOT_API.getBots.name].concat(query?.search || []),
    queryFn: async ({ pageParam, queryKey }) =>
      await BOT_API.getBots({ page: pageParam, query: queryKey[1] }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.length === PAGE_SIZE ? pages?.length + 1 : undefined,
    enabled: fetchBots,
  });

  const builders = useQuery({
    queryKey: [BUILDER_API.getBuilders.name].concat(
      JSON.stringify(query) || []
    ),
    queryFn: async () => await BUILDER_API.getBuilders(query),
    enabled: fetchBuilders,
  });

  const builder = useQuery({
    queryKey: [BUILDER_API.getBuilder.name, contextId],
    queryFn: async () => await BUILDER_API.getBuilder({ contextId }),
    enabled: !!contextId,
  });

  return {
    bots,
    builders,
    builder
  };
};
