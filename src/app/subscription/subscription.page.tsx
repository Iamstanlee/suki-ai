import FpScaffold from '@/design-system/scaffold';
import { StyleSheet, View } from 'react-native';
import FpText from '@/design-system/text';
import { FpSpacing, FpVSpace } from '@/design-system/spacing';
import { FpColor } from '@/design-system/color';
import { FpButton } from '@/design-system/button';
import { useUser } from '@/core/context/user-context';
import { useInAppPurchaseMutation } from '@/app/subscription/hooks/use-inapp-purchase-mutation';
import { useGetOfferingsQuery } from '@/app/subscription/hooks/use-inapp-purchase-query';
import { PurchasesPackage } from 'react-native-purchases';
import PlanItem, {
  PlanItem_Skeleton,
} from '@/app/subscription/components/plan-item';
import Clickable from '@/design-system/components/clickable';
import { useMemo } from 'react';
import { Check } from 'phosphor-react-native';
import { openUrl } from '@/app/settings/settings.page';

export const SubscriptionPageTag = 'Subscription';

export default function SubscriptionPage({ route }) {
  const params = route.params;
  const { saveBootstrapState } = useUser();
  const { isLoading, isError, offerings, retryFetch } = useGetOfferingsQuery();
  const {
    purchaseProduct,
    isPurchaseProductLoading,
    restorePurchase,
    isRestorePurchaseLoading,
  } = useInAppPurchaseMutation();

  const onPurchase = (subscriptionPackage: PurchasesPackage) => {
    purchaseProduct(
      { purchasePackage: subscriptionPackage, prefs: params },
      { onSuccess: () => saveBootstrapState() },
    );
  };

  const onRestorePurchase = () => {
    restorePurchase(
      { prefs: params },
      {
        onSuccess: () => {
          saveBootstrapState();
        },
      },
    );
  };

  const isPurchaseOrRestoreLoading = useMemo(
    () => [isPurchaseProductLoading, isRestorePurchaseLoading].some(Boolean),
    [isPurchaseProductLoading, isRestorePurchaseLoading],
  );

  return (
    <FpScaffold
      type='dark'
      withBackButton
      isLoading={isPurchaseOrRestoreLoading}
    >
      <FpText type='h5' color={FpColor.white}>
        Get unlimited reading with a subscription.
      </FpText>
      <FpVSpace.sm />
      <FpText type='label' color={FpColor.primary200}>
        SUBSCRIBER BENEFITS:
      </FpText>
      <FpVSpace.sm />
      {[
        'Curated feed of valuable insights from your preferred and \ngoto sources',
        'AI short sentence insights and summary',
        'AI powered feeds that learns from your reading habits',
      ].map((benefit) => (
        <View key={benefit} style={styles.benefitsRow}>
          <Check color={FpColor.primary200} size={18} />
          <FpText type='spanSm' color={FpColor.gray300}>
            {benefit}
          </FpText>
        </View>
      ))}
      <FpVSpace.md />
      {isLoading && (
        <View>
          <PlanItem_Skeleton />
          <PlanItem_Skeleton />
        </View>
      )}

      {isError && (
        <FpText type='spanSm' color={FpColor.white} center>
          An error occured while loading subscription plans
        </FpText>
      )}

      <View>
        {offerings?.map((offering, index) => (
          <PlanItem
            {...offering}
            key={index}
            onPress={(pkg) => onPurchase(pkg)}
          />
        ))}
        <FpVSpace.sm />
        <Clickable onPress={onRestorePurchase}>
          <FpText type='spanXs' color={FpColor.primary100}>
            Have existing subscription?
          </FpText>
          <FpText type='spanSm' color={FpColor.primary100} underline>
            Restore purchase.
          </FpText>
        </Clickable>
      </View>
      {isError && (
        <>
          <FpVSpace.lg />
          <FpButton onPress={() => retryFetch()} type='light'>
            Retry
          </FpButton>
        </>
      )}
      <FpVSpace.max />
      <View style={styles.policyRow}>
        <FpText type='label' color={FpColor.primary100}>
          By continuing, You agree to Suki AI's
        </FpText>
        <Clickable onPress={() => openUrl('https://getsuki.xyz/terms')}>
          <FpText type='label' color={FpColor.primary100} underline>
            Terms of Use
          </FpText>
        </Clickable>
        <FpText type='label' color={FpColor.primary100}>
          and
        </FpText>
        <Clickable
          onPress={() => openUrl('https://getsuki.xyz/privacy-policy')}
        >
          <FpText type='label' color={FpColor.primary100} underline>
            Privacy Policy
          </FpText>
        </Clickable>
      </View>
      <FpVSpace.md />
    </FpScaffold>
  );
}

const styles = StyleSheet.create({
  perksContainer: {
    flex: 1,
    borderColor: FpColor.white,
    borderWidth: 1.0,
    padding: FpSpacing.sm,
    borderRadius: 10,
  },
  benefitsRow: {
    flexDirection: 'row',
    gap: FpSpacing.md,
    alignItems: 'center',
    marginBottom: FpSpacing.sm,
  },
  policyRow: {
    flexDirection: 'row',
    gap: FpSpacing.xs,
    flexWrap: 'wrap',
  },
});
