import { OneSignal, OSNotification } from 'react-native-onesignal';

import { PushNotification } from '@/core/types/notification';
import _ from 'lodash';

export const requestNotificationPermission = async (): Promise<boolean> => {
  try {
    return OneSignal.Notifications.requestPermission(true);
  } catch (e) {
    return false;
  }
};

export const notificationPermissionGranted = async (): Promise<boolean> => {
  try {
    return OneSignal.Notifications.getPermissionAsync();
  } catch (e) {
    return false;
  }
};

export const handleNotificationClickOnSystemTray = (
  notification: OSNotification,
  navigation: any,
) => {
  const additionalData = notification.additionalData as PushNotification;

  if (!additionalData['identifier']) return;

  const identifier = _.first(additionalData.identifier.split(':'));

  switch (identifier) {
    case 'platform':
    case 'vendor':
      break;
    case 'system':
      const systemNotificationId = _.last(additionalData.identifier.split(':'));
      switch (systemNotificationId) {
        case 'activation.approved':
      }
      break;
  }
};
