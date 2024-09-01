import { useUser } from '@/core/context/user-context';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/core/constants';
import { useQ } from '@/core/hooks/use-q';

export const useMemberReviewQuery = () => {
  const { member_id } = useUser();
  const { invalidate } = useQ();
  const {
    isLoading,
    isError,
    data: reviews,
  } = useQuery({
    queryKey: ['member-reviews'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*, vendor:vendors(*)')
        .eq('member_id', member_id);

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });

  const retryFetch = async () => {
    await invalidate({ queryKey: ['member-reviews'] });
  };

  return {
    isLoading,
    isError,
    reviews,
    retryFetch,
  };
};
