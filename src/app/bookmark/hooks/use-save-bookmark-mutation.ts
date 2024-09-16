import { useMutation } from '@tanstack/react-query';
import { useUser } from '@/core/context/user-context';
import { useHttp } from '@/core/hooks/use-http';
import { Feed } from '@/core/types/feed';
import { useQ } from '@/core/hooks/use-q';

export const useSaveBookmarkMutation = () => {
  const { invalidate } = useQ();
  const { userId } = useUser();
  const http = useHttp();

  const { mutate: saveBookmark } = useMutation({
    mutationFn: async ({ bookmark }: { bookmark: Feed }) =>
      http.post(`/users/${userId}/bookmarks`, bookmark),
    onSuccess: () => {
      invalidate({ queryKey: ['bookmarks'] });
    },
  });

  const { mutate: deleteBookmark } = useMutation({
    mutationFn: async ({ bookmarkId }: { bookmarkId: string }) =>
      http.delete(`/users/${userId}/bookmarks/${bookmarkId}`),
    onSuccess: () => {
      invalidate({ queryKey: ['bookmarks'] });
    },
  });

  return {
    saveBookmark,
    deleteBookmark,
  };
};
