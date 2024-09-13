import FpText from '@/design-system/text';
import Clickable from '@/design-system/components/clickable';
import { StyleSheet, View } from 'react-native';
import { FpSpacing } from '@/design-system/spacing';
import { FpColor } from '@/design-system/color';
import { Badge } from 'react-native-ui-lib';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

type Props = {
  title: string;
  subtitle: string;
  date: string;
  onPress?: () => void;
};

export default function BookmarkListItem({
  onPress,
  title,
  subtitle,
  date,
}: Props) {
  return (
    <Swipeable
      overshootFriction={8}
      renderRightActions={() => {
        return (
          <RectButton style={styles.rightAction} onPress={() => {}}>
            <Animated.Text style={styles.actionText}>Delete</Animated.Text>
          </RectButton>
        );
      }}
    >
      <Clickable onPress={onPress} style={styles.container}>
        <View style={styles.column}>
          <View style={styles.badgeRow}>
            <Badge
              label={'Health & Wellness'}
              labelStyle={styles.badge}
              borderColor={FpColor.black}
              size={24}
              backgroundColor={FpColor.primary500}
            />
            <Badge
              label={'Substack'}
              labelStyle={styles.badge}
              borderColor={FpColor.black}
              size={24}
              backgroundColor={FpColor.orange500}
            />
          </View>
          <FpText bold numberOfLines={2}>
            {title}
          </FpText>
          <FpText type='spanSm' numberOfLines={2} color={FpColor.black200}>
            {subtitle}
          </FpText>
        </View>
        <FpText type='label' color={FpColor.black100}>
          {date}
        </FpText>
      </Clickable>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingVertical: FpSpacing.lg,
    borderBottomWidth: 0.4,
    borderBottomColor: '#f0f0f0',
  },
  padding: {
    paddingHorizontal: FpSpacing.md,
  },
  column: {
    flex: 1,
    paddingRight: FpSpacing.sm,
  },
  badge: {
    fontFamily: 'workSans',
  },
  rightAction: {
    backgroundColor: FpColor.error500,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
  actionText: {
    color: FpColor.white,
    fontFamily: 'workSans',
  },
  badgeRow: { flexDirection: 'row', gap: FpSpacing.sm },
});
