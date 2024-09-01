import { supabase } from '@/core/constants';
import { useQuery } from '@tanstack/react-query';
import { useQ } from '@/core/hooks/use-q';
import _ from 'lodash';

export const useVendorQuery = () => {
  const { invalidate } = useQ();

  const {
    isLoading,
    isError,
    data: locationAndVendor,
  } = useQuery({
    queryKey: ['vendors'],
    queryFn: async () => {
      const { data, error } = await supabase.from('vendors').select();

      if (error) {
        throw new Error(error.message);
      }

      return _.countBy(data, (value) => {
        return value.address['city'];
      });
    },
  });

  const retryFetch = async () => {
    await invalidate({ queryKey: ['vendors'] });
  };

  return {
    isLoading,
    isError,
    locationAndVendor,
    retryFetch,
  };
};
