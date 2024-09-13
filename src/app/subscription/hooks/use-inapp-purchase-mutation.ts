import { useMutation } from '@tanstack/react-query';
import { useSnackBar } from '@/core/context/snackbar-context';
import Purchases, { PurchasesPackage } from 'react-native-purchases';
import { fpAnalyticsEventIds, mixpanel } from '@/core/constants';
import { subscriptionEntitlementId } from '@/core/context/user-context';

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
          'Your subscription to Suki was successful. Enjoy unlimited reading!',
        );
      },
      onError: (error) => snackBar.ERROR(error.message),
    });

  const { mutate: restorePurchase, isPending: isRestorePurchaseLoading } =
    useMutation({
      mutationFn: async () => {
        try {
          const customerInfo = await Purchases.restorePurchases();
          if (
            typeof customerInfo.entitlements.active[
              subscriptionEntitlementId
            ] !== 'undefined'
          ) {
            return customerInfo;
          }
        } catch (e) {
          throw new Error(e.message ?? 'Failed to restore purchase');
        }
      },
      onError: (error) => snackBar.ERROR(error.message),
    });

  return {
    purchaseProduct,
    isPurchaseProductLoading,
    restorePurchase,
    isRestorePurchaseLoading,
  };
};
