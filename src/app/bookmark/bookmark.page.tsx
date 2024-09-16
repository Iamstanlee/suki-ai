import FpScaffold from '@/design-system/scaffold';
import FpText from '@/design-system/text';
import { FpVSpace } from '@/design-system/spacing';
import BookmarkListItem from '@/app/bookmark/components/bookmark-list-item';
import { useGetBookmarksQuery } from '@/app/bookmark/hooks/use-get-bookmarks-query';
import EmptyPage from '@/design-system/components/empty-page';
import { ActivityIndicator } from 'react-native';
import { FpColor } from '@/design-system/color';
import { useState } from 'react';
import { Feed } from '@/core/types/feed';
import { useSaveBookmarkMutation } from '@/app/bookmark/hooks/use-save-bookmark-mutation';
import FullstoryBottomsheetModal from '@/app/home/components/fullstory-bottomsheet';

export const BookmarkPageTag = 'Bookmark';

export default function BookmarkPage() {
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [currentStory, setCurrentStory] = useState<Feed>();
  const { deleteBookmark } = useSaveBookmarkMutation();

  const { bookmarks, isLoading, isError, retryFetch } = useGetBookmarksQuery();

  if (isLoading) {
    return (
      <FpScaffold>
        <ActivityIndicator color={FpColor.primary500} size='large' />
      </FpScaffold>
    );
  }

  if (isError) {
    return (
      <FpScaffold>
        <EmptyPage
          withIcon
          title='Failed to load bookmarks'
          actionBtnText='Retry'
          actionBtnOnPress={retryFetch}
        />
      </FpScaffold>
    );
  }

  if (bookmarks && bookmarks.length == 0) {
    return (
      <FpScaffold>
        <EmptyPage withIcon title='No bookmarks' />
      </FpScaffold>
    );
  }

  return (
    <FpScaffold scrollable withZeroPadding>
      <FpVSpace.md />
      <FpText type='h4' p16>
        Bookmark
      </FpText>
      {bookmarks?.map((bookmark) => (
        <BookmarkListItem
          key={bookmark.id}
          bookmark={bookmark}
          onPress={() => {
            setBottomSheetOpen(true);
            setCurrentStory(bookmark);
          }}
          onDelete={() => deleteBookmark({ bookmarkId: bookmark.id })}
        />
      ))}
      <FpVSpace.md />
      <FullstoryBottomsheetModal
        open={bottomSheetOpen}
        feed={currentStory}
        onClose={() => setBottomSheetOpen(false)}
      />
    </FpScaffold>
  );
}
