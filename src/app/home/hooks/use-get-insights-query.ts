import { useQuery } from '@tanstack/react-query';
import { useQ } from '@/core/hooks/use-q';
import { useUser } from '@/core/context/user-context';
import { useHttp } from '@/core/hooks/use-http';
import { Feed } from '@/core/types/feed';

export const useGetInsightsQuery = () => {
  const { userId } = useUser();
  const { invalidate } = useQ();
  const http = useHttp();

  const {
    isLoading,
    isError,
    data: insights,
  } = useQuery({
    queryKey: ['insights'],
    queryFn: () => http.get<Feed[]>(`/insights/${userId}`),
  });

  const retryFetch = async () => {
    await invalidate({ queryKey: ['insights'] });
  };

  return {
    isLoading,
    isError,
    insights,
    retryFetch,
  };
};
