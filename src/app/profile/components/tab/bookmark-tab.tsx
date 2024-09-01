import { memo, useMemo, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import BookmarkList_Bookmark from '@/app/bookmark/components/bookmark-list';
import FilterBottomsheetModal_Bookmark from '@/app/bookmark/components/filter-bottomsheet-modal';
import {
  FilterBookmarkProvider_Bookmark,
  useFilter_Bookmark,
} from '@/app/bookmark/context/filter-context';
import { notTrue } from '@/core/utils/boolean';
import { FpButton } from '@/design-system/button';
import { FpSpacing } from '@/design-system/spacing';

function _BookMarkTab_Profile() {
  const [filterModalOpen, setFilterModalOpen] = useState(notTrue);

  return (
    <FilterBookmarkProvider_Bookmark>
      <View style={styles.container}>
        <BookmarkList_Bookmark hideEmptyIcon />
        <View style={styles.filter}>
          <_FilterBtn onPress={() => setFilterModalOpen(true)} />
        </View>
      </View>
      <FilterBottomsheetModal_Bookmark
        open={filterModalOpen}
        onChange={setFilterModalOpen}
      />
    </FilterBookmarkProvider_Bookmark>
  );
}

function _FilterBtn({ onPress }: { onPress: () => void }) {
  const { location, rating, dietType } = useFilter_Bookmark();

  const filterApplied = useMemo(
    () => [!!location, !!dietType, !!rating].includes(true),
    [location, dietType, rating],
  );
  return (
    <FpButton
      elevation={2}
      type={filterApplied ? 'dark' : 'light'}
      size='sm'
      onPress={onPress}
    >
      <Image
        style={{ height: 13, width: 14, objectFit: 'contain' }}
        source={
          filterApplied
            ? require('@/assets/icons/filter-light.png')
            : require('@/assets/icons/filter-dark.png')
        }
      />
      {filterApplied ? 'Filtered' : 'Filter'}
    </FpButton>
  );
}

const BookMarkTab_Profile = memo(_BookMarkTab_Profile);

export default BookMarkTab_Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  filter: {
    alignItems: 'center',
    position: 'absolute',
    bottom: FpSpacing.lg,
    right: 0,
    left: 0,
    zIndex: 99,
  },
});
