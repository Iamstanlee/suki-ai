import FpBottomSheetModal, {
  FpBottomSheetModalProps,
} from '@/design-system/components/bottom-sheet';
import { FpSpacing, FpVSpace } from '@/design-system/spacing';
import { ScrollView, StyleSheet, View } from 'react-native';
import FpText from '@/design-system/text';
import { Clock } from '@/design-system/icons';
import { FpColor } from '@/design-system/color';

export default function FullstoryBottomsheetModal(
  props: FpBottomSheetModalProps,
) {
  return (
    <FpBottomSheetModal {...props} scrollable snapPoints={['75%', '95%']}>
      <ScrollView>
        <FpText type='h5' left>
          Daily feed of insights extracted from your go-to sources
        </FpText>
        <FpVSpace.xs />
        <View style={styles.row}>
          <Clock size={12} color={FpColor.black200} />
          <FpText type='spanXs' color={FpColor.black100}>
            8th Sept 2024
          </FpText>
        </View>
        <FpVSpace.md />
        <FpText>
          Suki is the mobile app that brings together your newsletters, research
          papers, podcasts, and more, in one place Suki is the mobile app that
          brings together your newsletters, research papers, podcasts, and more,
          in one place Suki is the mobile app that brings together your
          newsletters, research papers, podcasts, and more, in one place Suki is
          the mobile app that brings together your newsletters, research papers,
          podcasts, and more, in one place Suki is the mobile app that brings
          together your newsletters, research papers, podcasts, and more, in one
          place Suki is the mobile app that brings together your newsletters,
          research papers, podcasts, and more, in one place Suki is the mobile
          app that brings together your newsletters, research papers, podcasts,
          and more, in one place
        </FpText>
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
