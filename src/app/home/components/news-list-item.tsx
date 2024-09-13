import { Dimensions, StyleSheet, View } from 'react-native';
import FpText from '@/design-system/text';
import { FpSpacing, FpVSpace } from '@/design-system/spacing';
import { Heart, Link, ThumbsDown } from 'phosphor-react-native';
import { FpColor } from '@/design-system/color';
import { Badge } from 'react-native-ui-lib';
import { Clock } from '@/design-system/icons';
import Clickable from '@/design-system/components/clickable';

type Props = {
  onReadFullStory?: () => void;
};

export default function NewsListItem({ onReadFullStory }: Props) {
  return (
    <View style={styles.container}>
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
      <FpVSpace.md />
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
      <FpText left numberOfLines={20}>
        Suki is the mobile app that brings together your newsletters, research
        papers, podcasts, and more, in one place Suki is the mobile app that
        brings together your newsletters, research papers, podcasts, and more,
        in one place Suki is the mobile app that brings together your
        newsletters, research papers, podcasts, and more, in one place Suki is
        the mobile app that brings together your newsletters, research papers,
        podcasts, and more, in one place Suki is the mobile app that brings
        together your newsletters, research papers, podcasts, and more, in one
        place Suki is the mobile app that brings together your newsletters,
        research papers, podcasts, and more, in one place Suki is the mobile app
        that brings together your newsletters, research papers, podcasts, and
        more, in one place
      </FpText>
      <FpVSpace.xs />
      <Clickable onPress={onReadFullStory}>
        <FpText color={FpColor.primary500} underline>
          Read Full Story
        </FpText>
      </Clickable>
      <View style={styles.actionRow}>
        <ThumbsDown size={50} weight='thin' />
        <Link size={50} weight='thin' />
        <Heart size={50} weight='thin' />
      </View>
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
