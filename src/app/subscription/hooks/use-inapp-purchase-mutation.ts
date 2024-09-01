import { useMutation } from '@tanstack/react-query';
import { useSnackBar } from '@/core/context/snackbar-context';
import Purchases, { PurchasesPackage } from 'react-native-purchases';
import { fpAnalyticsEventIds, mixpanel } from '@/core/constants';

export const useInAppPurchaseMutation = () => {
  const snackBar = useSnackBar();

  const { mutate: purchaseProduct, isPending: isPurchaseProductLoading } =
    useMutation({
      mutationFn: async ({
        purchasePackage,
      }: {
        purchasePackage: PurchasesPackage;
      }) => Purchases.purchasePackage(purchasePackage),
      onSuccess: async (
        _,
        {
          purchasePackage: {
            product: { title, priceString },
          },
        },
      ) => {
        mixpanel.track(fpAnalyticsEventIds.subscribeToFpMembership, {
          plan: title,
          price: priceString,
        });
        mixpanel.getPeople().set({
          subscriptionPlan: title,
          subscriptionPrice: priceString,
        });
        snackBar.SUCCESS(
          'Your subscription to FeastPass Membership is successful!',
        );
      },
      onError: (error) => snackBar.ERROR(error.message),
    });

  return {
    purchaseProduct,
    isPurchaseProductLoading,
  };
};
