import { Tables } from '@/core/types/db';

export type MemberNotification = Tables<'_notifications'>;

export type PushNotificationData = {
  identifier: `platform:${string}` | `vendor:${string}` | `system:${string}`;
  title?: string;
  subtitle?: string;
  [key: string]: any;
};

export type NotificationPrefs = {
  all?: boolean;
  app_updates?: boolean;
  vendor_updates?: boolean;
};
