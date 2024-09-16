import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';
import { FpSpacing } from '@/design-system/spacing';
import { FpColor } from '@/design-system/color';

export default function Loading_Skeleton() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color={FpColor.black} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 80,
    padding: FpSpacing.md,
    justifyContent: 'center',
  },
  badge: {
    fontFamily: 'workSans',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: FpSpacing.xs,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: FpSpacing.xl,
    padding: FpSpacing.md,
  },
  badgeRow: { flexDirection: 'row', gap: FpSpacing.sm },
});
