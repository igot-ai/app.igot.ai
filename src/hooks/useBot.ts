import { useQuery } from '@tanstack/react-query';
import { BOT_API } from '../services';

export const useBot = () => {
  const bots = useQuery({
    queryKey: [BOT_API.getBots.name],
    queryFn: () => BOT_API.getBots(),
    enabled: true,
  });

  return {
    bots,
  };
};
