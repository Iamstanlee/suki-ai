import FpBottomSheetModal, {
  FpBottomSheetModalProps,
} from '@/design-system/components/bottom-sheet';
import { FpSpacing, FpVSpace } from '@/design-system/spacing';
import { ScrollView, StyleSheet, View } from 'react-native';
import FpText from '@/design-system/text';
import { FpColor } from '@/design-system/color';
import { Feed } from '@/core/types/feed';
import { Clock } from 'phosphor-react-native';
import { formatAsDayMonthYear } from '@/core/utils/date';

export default function FullstoryBottomsheetModal(
  props: FpBottomSheetModalProps & { feed?: Feed },
) {
  const feed = props.feed;

  if (!feed) return <View />;

  return (
    <FpBottomSheetModal {...props} scrollable snapPoints={['75%', '95%']}>
      <ScrollView>
        <FpText type='h5' left>
          {feed.title}
        </FpText>
        <FpVSpace.xs />
        <View style={styles.row}>
          <Clock size={12} color={FpColor.black200} weight='fill' />
          <FpText type='spanXs' color={FpColor.black100}>
            {formatAsDayMonthYear(feed.date)}
          </FpText>
        </View>
        <FpVSpace.md />
        <FpText>{feed.fullstory}</FpText>
      </ScrollView>
    </FpBottomSheetModal>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: FpSpacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: FpSpacing.xs,
  },
});
