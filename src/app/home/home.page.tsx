import { FlatList, StyleSheet, View } from 'react-native';
import NewsListItem from '@/app/home/components/news-list-item';
import FpStatusBar from '@/design-system/status-bar';
import { FpColor } from '@/design-system/color';
import FullstoryBottomsheetModal from '@/app/home/components/fullstory-bottomsheet';
import { useMemo, useState } from 'react';
import { useGetInsightsQuery } from '@/app/home/hooks/use-get-insights-query';
import Loading_Skeleton from '@/app/home/components/loading-skeleton';
import { Feed } from '@/core/types/feed';
import EmptyPage from '@/design-system/components/empty-page';
import { useGetBookmarksQuery } from '@/app/bookmark/hooks/use-get-bookmarks-query';
import { useSaveBookmarkMutation } from '@/app/bookmark/hooks/use-save-bookmark-mutation';
import { useShareInsights } from '@/app/home/hooks/use-share-insights';

export const HomePageTag = 'For you';

export default function HomePage() {
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const { insights, isLoading, isError, retryFetch } = useGetInsightsQuery();
  const [currentStory, setCurrentStory] = useState<Feed>();
  const { bookmarks } = useGetBookmarksQuery();
  const { saveBookmark, deleteBookmark } = useSaveBookmarkMutation();
  const { share } = useShareInsights();

  const bookmarkIds = useMemo(
    () => bookmarks?.map((feed) => feed.id),
    [bookmarks],
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Loading_Skeleton />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <EmptyPage
          withIcon
          title='Failed to load insights'
          actionBtnText='Retry'
          actionBtnOnPress={retryFetch}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FpStatusBar type='light' />
      <FlatList
        data={insights}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, i) => 'insight-' + i}
        renderItem={({ item }) => (
          <NewsListItem
            feed={item}
            isBookmarked={bookmarkIds?.includes(item.id)}
            onSaveBookmarkPress={() => saveBookmark({ bookmark: item })}
            onDeleteBookmarkPress={() =>
              deleteBookmark({ bookmarkId: item.id })
            }
            onReadFullStoryPress={() => {
              setBottomSheetOpen(true);
              setCurrentStory(item);
            }}
            onShareContent={() =>
              share({ title: item.title, content: item.text_summary })
            }
          />
        )}
      />
      <FullstoryBottomsheetModal
        open={bottomSheetOpen}
        feed={currentStory}
        onClose={() => setBottomSheetOpen(false)}
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
