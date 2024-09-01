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
        return [`${product.priceString} / year`, 'Yearly Plan'];
      case 'P1M':
        return [`${product.priceString} / month`, 'Monthly Plan'];
    }
  }, [product]);

  return (
    <Clickable
      onPress={() => props.onPress(props)}
      style={[styles.planItem, props.selected && styles.selectedPlan]}
    >
      <View>
        <FpText type='h6' color={FpColor.white}>
          {titleStr}
        </FpText>
        <FpText type='spanSm' color={FpColor.white}>
          {priceStr}
        </FpText>
      </View>
      {product.subscriptionPeriod == 'P1Y' && (
        <View style={styles.mostPopular}>
          <FpText type='label' color={FpColor.primary500}>
            Most Popular
          </FpText>
        </View>
      )}
    </Clickable>
  );
}

export function PlanItem_Skeleton() {
  const opacity = useSkeletonPulseAnim();

  return (
    <View
      style={[
        styles.planItem,
        { justifyContent: 'flex-start', borderColor: FpColor.gray600 },
      ]}
    >
      <Animated.View
        style={{
          height: 16,
          backgroundColor: FpColor.gray600,
          opacity,
        }}
      />
      <FpVSpace.sm />
      <Animated.View
        style={{
          height: 8,
          width: '50%',
          backgroundColor: FpColor.gray600,
          opacity,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  planItem: {
    width: '48%',
    height: 138,
    padding: FpSpacing.md,
    borderWidth: 1.0,
    borderColor: FpColor.white,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  selectedPlan: {
    backgroundColor: FpColor.primary500,
    borderColor: FpColor.primary500,
  },
  mostPopular: {
    backgroundColor: FpColor.white,
    padding: FpSpacing.xs + 3,
    borderRadius: 16,
    alignSelf: 'flex-end',
  },
});
