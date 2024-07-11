import { AUTHOR_API } from "@/services";
import { useQuery } from "@tanstack/react-query";

interface UseAuthorOptions {
  id?: string;
}

export const useAuthor = (options?: UseAuthorOptions) => {
  const author = useQuery({
    queryKey: [AUTHOR_API.getAuthorInfo.name, options?.id],
    queryFn: async () => await AUTHOR_API.getAuthorInfo(options?.id),
    enabled: !!options?.id,
  });

  return {
    author,
  };
};
