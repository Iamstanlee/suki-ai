import { Tables } from '@/core/types/db';

export type Activation = Tables<'activations'>;

export type ActivationWithVendor = Tables<'activations'> & {
  vendor: Tables<'vendors'>;
};
