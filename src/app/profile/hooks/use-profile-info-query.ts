import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/core/constants';
import { useUser } from '@/core/context/user-context';
import _ from 'lodash';

export const useProfileInfoQuery = () => {
  const { member_id } = useUser();
  const { isLoading, isError, data } = useQuery({
    queryKey: ['profile-info'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('activations')
        .select('vendor_id')
        .eq('status', 'approved')
        .eq('member_id', member_id);

      if (error) {
        throw new Error(error.message);
      }

      const places = _.uniqBy(data, 'vendor_id').length;
      const feasts = data.length;

      return { places, feasts };
    },
  });

  return {
    isLoading,
    isError,
    places: data?.places,
    feasts: data?.feasts,
  };
};
