import FpScaffold from '@/design-system/scaffold';
import FpText from '@/design-system/text';
import { FpVSpace } from '@/design-system/spacing';
import BookmarkListItem from '@/app/bookmark/components/bookmark-list-item';

export const BookmarkPageTag = 'Bookmark';

export default function BookmarkPage() {
  return (
    <FpScaffold>
      <FpVSpace.md />
      <FpText type='h4'>Bookmark</FpText>
      <BookmarkListItem
        title='Daily feed of insights extracted from your go-to sources'
        subtitle={
          'You don’t have to read everything, just the important bits, Get the latest insights from your goto sources in one place, Curated and summarized for you with AI.'
        }
        date={'2 sept 2024'}
      />
      <BookmarkListItem
        title='Daily feed of insights extracted from your go-to sources'
        subtitle={
          'You don’t have to read everything, just the important bits, Get the latest insights from your goto sources in one place, Curated and summarized for you with AI.'
        }
        date={'2 sept 2024'}
      />
      <BookmarkListItem
        title='Daily feed of insights extracted from your go-to sources'
        subtitle={
          'You don’t have to read everything, just the important bits, Get the latest insights from your goto sources in one place, Curated and summarized for you with AI.'
        }
        date={'2 sept 2024'}
      />
      <FpVSpace.md />
    </FpScaffold>
  );
}
