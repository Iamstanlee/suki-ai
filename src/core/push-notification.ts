import { OneSignal, OSNotification } from 'react-native-onesignal';
import { notTrue } from '@/core/utils/boolean';
import { PushNotificationData } from '@/core/types/notification';
import { NotificationInfoPageTag } from '@/app/notifications/notification-info.page';
import _ from 'lodash';
import { ActivationOngoingPageTag } from '@/app/activation/activation-ongoing.page';

export const requestNotificationPermission = async (): Promise<boolean> => {
  try {
    return OneSignal.Notifications.requestPermission(true);
  } catch (e) {
    return notTrue;
  }
};

export const notificationPermissionGranted = async (): Promise<boolean> => {
  try {
    return OneSignal.Notifications.getPermissionAsync();
  } catch (e) {
    return notTrue;
  }
};

export const handleNotificationClickOnSystemTray = (
  notification: OSNotification,
  navigation: any,
) => {
  const additionalData = notification.additionalData as PushNotificationData;

  if (!additionalData['identifier']) return;

  const identifier = _.first(additionalData.identifier.split(':'));

  switch (identifier) {
    case 'platform':
    case 'vendor':
      navigation.navigate(NotificationInfoPageTag, {
        notification: additionalData,
      });
      break;
    case 'system':
      const systemNotificationId = _.last(additionalData.identifier.split(':'));
      switch (systemNotificationId) {
        case 'activation.approved':
          navigation.navigate(ActivationOngoingPageTag, {
            activation: additionalData,
          });
          break;
      }
      break;
  }
};
