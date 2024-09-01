import { Tables } from '@/core/types/db';

export type Review = Tables<'reviews'>;

export type ReviewWithVendor = Tables<'reviews'> & {
  vendor: Tables<'vendors'>;
};
