import { api } from '../../api';
import { API_URLS } from '../../constants';
import { Search } from "@/types";

export const SEARCH_API = {
  search: async ({ query = '' }: { query?: string }): Promise<Search[]> =>
    await api.get(API_URLS.SEARCHING + '?q=' + query),
};
