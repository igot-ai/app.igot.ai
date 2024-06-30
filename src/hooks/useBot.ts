import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { BOT_API, BUILDER_API } from "../services";
import { ITEMS_PAGE_SIZE } from "@/constants";
import { Builder } from "@/types";

interface UseBotOptions {
  query?: Record<string, any>;
  fetchBots?: boolean;
  fetchBuilders?: boolean;
}

export const useBot = (options?: UseBotOptions) => {
  const { query, fetchBots = true, fetchBuilders = false } = options || {};

  const bots = useInfiniteQuery({
    queryKey: [BOT_API.getBots.name],
    queryFn: async ({ pageParam }) =>
      await BOT_API.getBots({ page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.length === ITEMS_PAGE_SIZE ? pages?.length + 1 : undefined,
    enabled: fetchBots,
  });

  const builders = useQuery({
    queryKey: [BUILDER_API.getBuilders.name].concat(
      JSON.stringify(query) || []
    ),
    queryFn: async () => await BUILDER_API.getBuilders(query),
    enabled: fetchBuilders,
  });

  return {
    bots,
    builders,
  };
};
