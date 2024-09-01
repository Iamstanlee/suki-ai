import { Tables } from '@/core/types/db';

export type Bookmark = Tables<'bookmarks'>;

export type BookmarkWithVendor = Bookmark & {
  vendor: Tables<'vendors_with_average_ratings'>;
};
