import { PurchasesPackage } from 'react-native-purchases';
import Clickable from '@/design-system/components/clickable';
import { StyleSheet, View } from 'react-native';
import FpText from '@/design-system/text';
import { FpColor } from '@/design-system/color';
import { FpSpacing, FpVSpace } from '@/design-system/spacing';
import { useSkeletonPulseAnim } from '@/core/hooks/use-skeleton-pulse-anim';
import Animated from 'react-native-reanimated';
import { useMemo } from 'react';

type SelectableSubscriptionPlan = PurchasesPackage & {
  selected?: boolean;
  onPress?: (pkg: PurchasesPackage) => void;
};

export default function PlanItem(props: SelectableSubscriptionPlan) {
  const product = props.product;

  const [priceStr, titleStr] = useMemo(() => {
    switch (product.subscriptionPeriod) {
      case 'P1Y':
        return [product.priceString, 'Annual'];
      case 'P1M':
        return [product.priceString, 'Monthly'];
      default:
        return [product.priceString, product.subscriptionPeriod];
    }
  }, [product]);

  return (
    <Clickable
      onPress={() => props.onPress(props)}
      style={[styles.planItem, props.selected && styles.selectedPlan]}
    >
      <View>
        <View style={styles.row}>
          <FpText type='h6' color={FpColor.white}>
            {titleStr} — {priceStr}
          </FpText>
          {product.subscriptionPeriod == 'P1Y' && (
            <View style={styles.mostPopular}>
              <FpText type='label' color={FpColor.white} bold>
                Best Offer
              </FpText>
            </View>
          )}
        </View>
        <FpText type='label' color={FpColor.gray500}>
          3 Days Free Trial, Cancel anytime.
        </FpText>
      </View>
      <FpText type='label' color={FpColor.white}>
        Billed {product.subscriptionPeriod == 'P1Y' ? 'annually' : 'monthly'}
      </FpText>
    </Clickable>
  );
}

export function PlanItem_Skeleton() {
  const opacity = useSkeletonPulseAnim();

  return (
    <View
      style={[
        styles.planItem,
        { justifyContent: 'flex-start', borderColor: FpColor.gray500 },
      ]}
    >
      <Animated.View
        style={{
          height: 16,
          backgroundColor: FpColor.gray500,
          opacity,
        }}
      />
      <FpVSpace.sm />
      <Animated.View
        style={{
          height: 8,
          width: '50%',
          backgroundColor: FpColor.gray500,
          opacity,
        }}
      />
      <FpVSpace.max />
      <Animated.View
        style={{
          height: 8,
          width: '30%',
          backgroundColor: FpColor.gray500,
          opacity,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  planItem: {
    width: '100%',
    height: 138,
    padding: FpSpacing.md,
    marginBottom: FpSpacing.md,
    borderWidth: 0.5,
    borderColor: FpColor.white,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  row: { flexDirection: 'row', gap: FpSpacing.md, alignItems: 'center' },
  selectedPlan: {
    backgroundColor: FpColor.primary500,
    borderColor: FpColor.primary500,
  },
  mostPopular: {
    backgroundColor: FpColor.primary500,
    padding: FpSpacing.xs,
    borderRadius: FpSpacing.xs,
  },
});
