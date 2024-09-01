import { Tables } from '@/core/types/db';

export type Vendor = Tables<'vendors'>;

export type VendorWithAvgRating = Tables<'vendors_with_average_ratings'>;

export type Menu = Tables<'menus'>;

type Option = {
  separator?: string;
};

const defaultOption: Option = {
  separator: ', ',
};

export const vendorAverageRating = (vendor: VendorWithAvgRating) => {
  return (
    (vendor.average_service_rating +
      vendor.average_food_rating +
      vendor.average_vibes_rating) /
    3
  );
};

export const vendorDietOptions = (
  vendor: Vendor,
  option: Option = defaultOption,
) => {
  return vendor.diet_options.join(option.separator);
};

export const vendorBookingUrls = (
  vendor: Vendor,
  option: Option = defaultOption,
) => {
  return (
    vendor.booking_urls
      ?.map((url) => `https://${url}`)
      .join(option.separator) ?? 'N/A'
  );
};

export const availableDietOptions = [
  'Vegan',
  'Vegetarian',
  'Gluten free',
  'Dairy free',
  'Nut free',
  'Keto',
  'Paleo',
  'Vegan options',
  'Vegetarian options',
  'Gluten free options',
  'Dairy free options',
  'Nut free options',
  'Keto options',
  'Paleo options',
];
