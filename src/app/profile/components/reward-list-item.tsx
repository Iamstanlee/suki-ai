import { memo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import FpText from '@/design-system/text';
import { FpColor } from '@/design-system/color';
import { FpSpacing } from '@/design-system/spacing';
import { MemberReward } from '@/core/types/user';
import { useSkeletonPulseAnim } from '@/core/hooks/use-skeleton-pulse-anim';
import Animated from 'react-native-reanimated';

type Props = {
  reward: MemberReward;
};

const RewardListItem = memo(({ reward }: Props) => {
  return (
    <View style={[styles.container]}>
      <View style={styles.row}>
        <View style={styles.column}>
          <FpText numberOfLines={2} type='h5'>
            {reward.title}
          </FpText>
          <FpText type='spanXs' bold>
            {reward.subtitle}
          </FpText>
        </View>
        <Image
          source={require('@/assets/favicon-transparent.png')}
          style={styles.image}
        />
      </View>
    </View>
  );
});

export function RewardListItem_Skeleton() {
  const opacity = useSkeletonPulseAnim();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={{ flex: 1, gap: FpSpacing.sm }}>
          <Animated.View
            style={{
              height: 16,
              width: '70%',
              backgroundColor: FpColor.gray200,
              opacity,
            }}
          />
          <Animated.View
            style={{
              height: 8,
              width: '100%',
              backgroundColor: FpColor.gray200,
              opacity,
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: FpSpacing.md,
    paddingHorizontal: FpSpacing.md,
    marginTop: FpSpacing.md,
    borderRadius: FpSpacing.md,
    borderColor: FpColor.gray200,
    borderWidth: 1.4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: FpSpacing.md,
  },
  column: {
    flex: 1,
  },
  image: {
    height: 40,
    width: 40,
    objectFit: 'contain',
  },
});

export default RewardListItem;
