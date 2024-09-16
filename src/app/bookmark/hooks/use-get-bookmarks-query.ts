import { useQuery } from '@tanstack/react-query';
import { useQ } from '@/core/hooks/use-q';
import { useUser } from '@/core/context/user-context';
import { useHttp } from '@/core/hooks/use-http';
import { Feed } from '@/core/types/feed';

export const useGetBookmarksQuery = () => {
  const { userId } = useUser();
  const { invalidate } = useQ();
  const http = useHttp();

  const {
    isLoading,
    isError,
    data: bookmarks,
  } = useQuery({
    queryKey: ['bookmarks'],
    queryFn: () => http.get<Feed[]>(`/users/${userId}/bookmarks`),
  });

  const retryFetch = async () => {
    await invalidate({ queryKey: ['bookmarks'] });
  };

  return {
    isLoading,
    isError,
    bookmarks,
    retryFetch,
  };
};
