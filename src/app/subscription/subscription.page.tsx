import FpScaffold from '@/design-system/scaffold';
import { StyleSheet, View } from 'react-native';
import FpText from '@/design-system/text';
import { FpSpacing, FpVSpace } from '@/design-system/spacing';
import { FpColor } from '@/design-system/color';
import { useState } from 'react';
import { FpButton } from '@/design-system/button';
import { useUser } from '@/core/context/user-context';
import { useInAppPurchaseMutation } from '@/app/subscription/hooks/use-inapp-purchase-mutation';
import { useGetOfferingsQuery } from '@/app/subscription/hooks/use-inapp-purchase-query';
import { PurchasesPackage } from 'react-native-purchases';
import PerkRow from '@/app/subscription/components/perk-item';
import PlanItem, {
  PlanItem_Skeleton,
} from '@/app/subscription/components/plan-item';

export const SubscriptionPageTag = 'Subscription';

export default function SubscriptionPage({ route }) {
  const isUpdate = route.params?.isUpdate;
  const { saveBootstrapState } = useUser();
  const { isLoading, isError, offerings, retryFetch } = useGetOfferingsQuery();
  const { purchaseProduct, isPurchaseProductLoading } =
    useInAppPurchaseMutation();
  const [selectedPackage, setSelectedPackage] = useState(() => {
    if (offerings) {
      return offerings[0];
    }
  });

  const onPurchase = (subscriptionPackage: PurchasesPackage) => {
    purchaseProduct(
      { purchasePackage: subscriptionPackage },
      { onSuccess: () => saveBootstrapState() },
    );
  };

  return (
    <FpScaffold scrollable type='dark' withBackButton={isUpdate}>
      <FpVSpace.sm />
      <FpText type='h5' center color={FpColor.white}>
        FeastPass
      </FpText>
      <View style={{ paddingHorizontal: FpSpacing.lg }}>
        <FpText type='label' center color={FpColor.white} opacity={0.8}>
          Simultaneously boosting the local economy while getting fantastic
          discounts.
        </FpText>
      </View>
      <FpVSpace.md />
      <View style={styles.perksContainer}>
        <PerkRow />
      </View>
      <FpVSpace.md />
      <FpText type='h5' center color={FpColor.white}>
        Choose a Plan
      </FpText>
      <View style={{ paddingHorizontal: FpSpacing.lg }}>
        <FpText type='label' center color={FpColor.white} opacity={0.8}>
          Save an average $12 when you subscribe annually
        </FpText>
      </View>
      <FpVSpace.md />

      {isLoading && (
        <View style={styles.planRow}>
          <PlanItem_Skeleton />
          <PlanItem_Skeleton />
        </View>
      )}

      {isError && (
        <FpText type='spanSm' color={FpColor.white} center>
          An error occured while loading subscription plans
        </FpText>
      )}

      <View style={styles.planRow}>
        {offerings?.map((offering, index) => (
          <PlanItem
            {...offering}
            key={index}
            selected={selectedPackage?.identifier === offering.identifier}
            onPress={(pkg) => setSelectedPackage(pkg)}
          />
        ))}
      </View>
      <FpVSpace.xl />
      {isError && (
        <FpButton onPress={() => retryFetch()} type='light'>
          Retry
        </FpButton>
      )}
      {offerings && (
        <FpButton
          isLoading={isPurchaseProductLoading}
          onPress={() => onPurchase(selectedPackage)}
          type='light'
        >
          Select Plan
        </FpButton>
      )}
      <FpVSpace.xxl />
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
  perkRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  perkItem: {
    flexDirection: 'row',
    width: '45%',
    paddingHorizontal: FpSpacing.md,
    paddingVertical: FpSpacing.sm,
  },
  planRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
