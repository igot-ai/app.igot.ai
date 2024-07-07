import { useQuery } from "@tanstack/react-query";
import { SEARCH_API } from "../services";

interface SearchingOptions {
  query?: string;
}

export const useSearching = (options?: SearchingOptions) => {
  const { query } = options || {};
  const search = useQuery({
    queryKey: [SEARCH_API.search.name, query],
    queryFn: async () => await SEARCH_API.search({ query }),
    enabled: !!query,
  });

  return { search };
};
