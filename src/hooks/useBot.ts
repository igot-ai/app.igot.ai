import { useQuery } from "@tanstack/react-query";
import { BOT_API, BUILDER_API } from "../services";

interface UseBotOptions {
  query?: Record<string, any>;
  fetchBots?: boolean;
  fetchBuilders?: boolean;
}

export const useBot = (options?: UseBotOptions) => {
  const { query, fetchBots = true, fetchBuilders = false } = options || {};
  const bots = useQuery({
    queryKey: [BOT_API.getBots.name],
    queryFn: BOT_API.getBots,
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
