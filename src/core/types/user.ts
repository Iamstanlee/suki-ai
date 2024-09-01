import { Tables } from '@/core/types/db';

export type User = Tables<'members'>;

export enum RewardId {
  fp_stickers = 'fp_stickers',
  fp_2monthsOff = 'fp_2monthsOff',
  fp_hat = 'fp_hat',
  fp_goldenticket = 'fp_goldenticket',
}

export type MemberReward = {
  id: RewardId;
  title: string;
  subtitle: string;
  info: string;
  points: number;
  status?: 'pending' | 'claimed';
  require_metadata?: boolean;
};
