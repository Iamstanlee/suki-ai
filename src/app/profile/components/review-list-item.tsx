import { memo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Clickable from '@/design-system/components/clickable';
import FpText from '@/design-system/text';
import { FpColor } from '@/design-system/color';
import { useSkeletonPulseAnim } from '@/core/hooks/use-skeleton-pulse-anim';
import Animated from 'react-native-reanimated';
import { FpSpacing } from '@/design-system/spacing';
import { ReviewWithVendor } from '@/core/types/review';

type Props = {
  review: ReviewWithVendor;
  onPress: () => void;
};

const ReviewListItem = memo(({ review, onPress }: Props) => {
  return (
    <Clickable onPress={onPress} style={[styles.container]}>
      <View style={styles.row}>
        <View style={styles.column}>
          <FpText numberOfLines={2} type='h5'>
            {review.vendor.name}
          </FpText>
          <FpText numberOfLines={1} type='spanSm'>
            {review.free_text['experience'] || 'No review text'}
          </FpText>
          <FpText numberOfLines={1} type='spanXs'>
            <FpText type='spanXs' bold>
              Avg Rating:{' '}
            </FpText>
            Vibes: {review.vibes} | Food & Bev: {review.food} | Service:{' '}
            {review.service}
          </FpText>
          <FpText numberOfLines={1} type='spanXs'>
            <FpText type='spanXs' bold>
              Recommended Menu:{' '}
            </FpText>
            {review.free_text['recommended'] || 'n/a'}
          </FpText>
        </View>
        <Image
          source={require('@/assets/icons/fire.png')}
          style={styles.image}
        />
      </View>
    </Clickable>
  );
});

export function ReviewListItem_Skeleton() {
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
          <Animated.View
            style={{
              height: 8,
              width: '70%',
              backgroundColor: FpColor.gray200,
              opacity,
            }}
          />
          <Animated.View
            style={{
              height: 8,
              width: '50%',
              backgroundColor: FpColor.gray200,
              opacity,
            }}
          />
        </View>
        <Animated.View style={[styles.image, { opacity }]} />
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
  label: {
    fontSize: 10,
    fontFamily: 'DMSans',
  },
  rightAction: {
    backgroundColor: FpColor.primary500,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
  actionText: {
    color: FpColor.white,
    fontFamily: 'DMSansBold',
  },
});

export default ReviewListItem;
