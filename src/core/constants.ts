import { mixPanelStorage } from '@/core/storage';
import { Platform } from 'react-native';
import { Mixpanel } from 'mixpanel-react-native';

export const apiUrl: string = Platform.select({
  ios: process.env.EXPO_PUBLIC_BASE_URL_IOS ?? process.env.EXPO_PUBLIC_BASE_URL,
  android: process.env.EXPO_PUBLIC_BASE_URL,
});

export const revenueCatKey: string = Platform.select({
  ios: 'appl_FRScZWIDKRfWVdaKxMuziAmxyql',
  android: 'goog_jvULQYXmKmkpeNQDzRbYVNmaTLk',
});

export const onesignalAppId: string = process.env.EXPO_PUBLIC_ONESIGNAL_APPID;

export const mixpanel = new Mixpanel(
  process.env.EXPO_PUBLIC_MIXPANEL_TOKEN,
  false,
  false,
  mixPanelStorage,
);

export const fpAnalyticsEventIds = {
  appLaunch: 'App launch',
  signUp: 'Sign up',
  login: 'Login',
  logout: 'Logout',
  requestActivation: 'Request activation',
  submitReview: 'Submit review',
  updateReview: 'Update review',
  deleteAccount: 'Delete account',
  subscribeToFpMembership: 'Subscribe to FeastPass membership',
};
