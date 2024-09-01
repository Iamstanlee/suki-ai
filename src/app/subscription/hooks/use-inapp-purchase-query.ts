import { useQuery } from '@tanstack/react-query';
import { useQ } from '@/core/hooks/use-q';
import Purchases from 'react-native-purchases';

export const useGetOfferingsQuery = () => {
  const { invalidate } = useQ();

  const {
    isLoading,
    isError,
    data: offerings,
  } = useQuery({
    queryKey: ['iap-offerings'],
    queryFn: async () => {
      const offerings = await Purchases.getOfferings();
      if (
        offerings.current !== null &&
        offerings.current.availablePackages.length !== 0
      ) {
        return offerings.current.availablePackages;
      }

      throw new Error('No offerings available');
    },
  });

  const retryFetch = async () => {
    await invalidate({ queryKey: ['iap-offerings'] });
  };

  return {
    isLoading,
    isError,
    offerings,
    retryFetch,
  };
};
