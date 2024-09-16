import { useMutation } from '@tanstack/react-query';
import { useSnackBar } from '@/core/context/snackbar-context';
import Purchases, { PurchasesPackage } from 'react-native-purchases';
import { fpAnalyticsEventIds, mixpanel } from '@/core/constants';
import {
  subscriptionEntitlementId,
  useUser,
} from '@/core/context/user-context';
import { User_prefs } from '@/core/types/user_prefs';
import { useHttp } from '@/core/hooks/use-http';

export const useInAppPurchaseMutation = () => {
  const { userId } = useUser();
  const snackBar = useSnackBar();
  const http = useHttp();

  const saveUserPrefs = async (prefs: User_prefs) => {
    await http.post(`/users/${userId}/prefs`, prefs);
  };

  const { mutate: purchaseProduct, isPending: isPurchaseProductLoading } =
    useMutation({
      mutationFn: async ({
        purchasePackage,
      }: {
        purchasePackage: PurchasesPackage;
        prefs: User_prefs;
      }) => Purchases.purchasePackage(purchasePackage),
      onSuccess: async (
        _,
        {
          purchasePackage: {
            product: { title, priceString },
          },
          prefs,
        },
      ) => {
        await saveUserPrefs(prefs);
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
      mutationFn: async ({}: { prefs: User_prefs }) => {
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
      onSuccess: async (_, { prefs }) => {
        await saveUserPrefs(prefs);
        snackBar.SUCCESS('Purchase restored. Enjoy unlimited reading!');
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
