export type PushNotification = {
  identifier: `system:${string}` | `news:${string}`;
  title?: string;
  subtitle?: string;
  [key: string]: any;
};
