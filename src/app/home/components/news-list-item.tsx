import { Dimensions, StyleSheet, View } from 'react-native';
import FpText from '@/design-system/text';
import { FpSpacing, FpVSpace } from '@/design-system/spacing';
import { Clock, Heart, Link, ThumbsDown } from 'phosphor-react-native';
import { FpColor } from '@/design-system/color';
import { Badge } from 'react-native-ui-lib';
import Clickable from '@/design-system/components/clickable';
import { Feed } from '@/core/types/feed';
import { formatAsDayMonthYear } from '@/core/utils/date';
import { useMMKVBoolean } from 'react-native-mmkv';
import { storage } from '@/core/storage';

type Props = {
  feed: Feed;
  onReadFullStoryPress?: () => void;
  onSaveBookmarkPress?: () => void;
  onDeleteBookmarkPress?: () => void;
  isBookmarked?: boolean;
  onShareContent?: () => void;
};

export default function NewsListItem({
  feed,
  onReadFullStoryPress,
  isBookmarked,
  onSaveBookmarkPress,
  onDeleteBookmarkPress,
  onShareContent,
}: Props) {
  const [disliked, setDisliked] = useMMKVBoolean(
    `disliked:${feed.id}`,
    storage.store,
  );

  return (
    <View style={styles.container}>
      <View style={styles.badgeRow}>
        <Badge
          label={feed.category}
          labelStyle={styles.badge}
          borderColor={FpColor.black}
          size={24}
          backgroundColor={FpColor.primary500}
        />
        <Badge
          label={feed.source}
          labelStyle={styles.badge}
          borderColor={FpColor.black}
          size={24}
          backgroundColor={FpColor.orange500}
        />
      </View>
      <FpVSpace.md />
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
      <FpText left numberOfLines={24}>
        {feed.text_summary}
      </FpText>
      <FpVSpace.xs />
      <Clickable onPress={onReadFullStoryPress}>
        <FpText color={FpColor.primary500} underline>
          Read Full Story
        </FpText>
      </Clickable>
      <View style={styles.actionRow}>
        <Clickable onPress={() => setDisliked(!disliked)}>
          <ThumbsDown
            color={disliked ? FpColor.gray500 : FpColor.black}
            weight={disliked ? 'fill' : 'thin'}
            size={50}
          />
        </Clickable>
        <Clickable onPress={onShareContent}>
          <Link size={50} weight='thin' />
        </Clickable>
        <Clickable
          onPress={isBookmarked ? onDeleteBookmarkPress : onSaveBookmarkPress}
        >
          <Heart
            color={isBookmarked ? FpColor.primary500 : FpColor.black}
            size={50}
            weight={isBookmarked ? 'fill' : 'thin'}
          />
        </Clickable>
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
