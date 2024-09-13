import { FlatList, StyleSheet, View } from 'react-native';
import { notTrue } from '@/core/utils/boolean';
import NewsListItem from '@/app/home/components/news-list-item';
import FpStatusBar from '@/design-system/status-bar';
import { FpColor } from '@/design-system/color';
import FullstoryBottomsheetModal from '@/app/home/components/fullstory-bottomsheet';
import { useState } from 'react';

export const HomePageTag = 'For you';

export default function HomePage() {
  const [bottomSheetOpen, setBottomSheetOpen] = useState(notTrue);

  return (
    <View style={styles.container}>
      <FpStatusBar type='light' />
      <FlatList
        data={Array.from({ length: 5 })}
        pagingEnabled
        showsVerticalScrollIndicator={notTrue}
        keyExtractor={(_, i) => 'news-item-' + i}
        renderItem={({}) => (
          <NewsListItem onReadFullStory={() => setBottomSheetOpen(true)} />
        )}
      />
      <FullstoryBottomsheetModal
        open={bottomSheetOpen}
        onClose={() => setBottomSheetOpen(notTrue)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: FpColor.primary200,
  },
});
