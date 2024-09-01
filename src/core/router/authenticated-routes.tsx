import VendorPage, { VendorPageTag } from '@/app/vendor/vendor.page';
import VendorSearchPage, {
  VendorSearchPageTag,
} from '@/app/vendor/vendor-search.page';
import MapPage, { MapPageTag } from '@/app/map/map.page';
import ActivationPage, {
  ActivationPageTag,
} from '@/app/activation/activation.page';
import BookmarkVendorPage, {
  BookmarkVendorPageTag,
} from '@/app/bookmark/bookmark-vendor.page';
import ActivationRequestSuccessPage, {
  ActivationRequestSuccessPageTag,
} from '@/app/activation/activation-request-success.page';
import ActivationOngoingPage, {
  ActivationOngoingPageTag,
} from '@/app/activation/activation-ongoing.page';
import ReviewPage, { ReviewPageTag } from '@/app/review/review.page';
import NotificationInfoPage, {
  NotificationInfoPageTag,
} from '@/app/notifications/notification-info.page';
import RewardInfoPage, {
  RewardInfoPageTag,
} from '@/app/reward/reward-info.page';
import RewardStickerMetadataPage, {
  RewardStickerMetadataTag,
} from '@/app/reward/additional-metadata-pages/reward-sticker-metadata.page';
import RewardHatMetadataPage, {
  RewardHatMetadataPageTag,
} from '@/app/reward/additional-metadata-pages/reward-hat-metadata.page';
import RewardClaimSuccessPage, {
  RewardClaimSuccessPageTag,
} from '@/app/reward/reward-claim-success.page';
import ProfilePage, { ProfilePageTag } from '@/app/profile/profile.page';
import SettingsPage, { SettingsPageTag } from '@/app/settings/settings.page';
import AccountSettingsPage, {
  AccountSettingsPageTag,
} from '@/app/settings/account-settings.page';
import NotificationSettingsPage, {
  NotificationSettingsPageTag,
} from '@/app/settings/notification-settings.page';
import EditProfileSettingsPage, {
  EditProfileSettingsPageTag,
} from '@/app/settings/edit-profile-settings.page';
import ChangePasswordPage, {
  ChangePasswordPageTag,
} from '@/app/settings/change-password.page';
import DeleteAccountPage, {
  DeleteAccountPageTag,
} from '@/app/settings/delete-account.page';
import SeeYouSoonPage, {
  SeeYouSoonPageTag,
} from '@/app/settings/see-you-soon.page';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image, ImageSourcePropType, Platform, View } from 'react-native';
import HomePage, { HomePageTag } from '@/app/home/home.page';
import BookmarkPage, { BookmarkPageTag } from '@/app/bookmark/bookmark.page';
import NotificationsPage, {
  NotificationsPageTag,
} from '@/app/notifications/notifications.page';
import { FpColor } from '@/design-system/color';
import { FpSpacing } from '@/design-system/spacing';
import { notTrue } from '@/core/utils/boolean';
import RewardPage, { RewardPageTag } from '@/app/reward/reward.page';
import { StackRouter, TabRouter } from '@/core/router/app-router';

export default function AuthenticatedRoutes() {
  return (
    <>
      <StackRouter.Screen name='_tab' component={_TabNavigator} />
      <StackRouter.Screen name={VendorPageTag} component={VendorPage} />
      <StackRouter.Screen
        name={VendorSearchPageTag}
        component={VendorSearchPage}
      />
      <StackRouter.Screen name={MapPageTag} component={MapPage} />
      <StackRouter.Screen name={ActivationPageTag} component={ActivationPage} />
      <StackRouter.Screen
        name={BookmarkVendorPageTag}
        component={BookmarkVendorPage}
      />
      <StackRouter.Screen
        name={ActivationRequestSuccessPageTag}
        component={ActivationRequestSuccessPage}
      />
      <StackRouter.Screen
        name={ActivationOngoingPageTag}
        component={ActivationOngoingPage}
      />
      <StackRouter.Screen name={ReviewPageTag} component={ReviewPage} />
      <StackRouter.Screen
        name={NotificationInfoPageTag}
        component={NotificationInfoPage}
      />
      <StackRouter.Screen name={RewardInfoPageTag} component={RewardInfoPage} />
      <StackRouter.Screen
        name={RewardStickerMetadataTag}
        component={RewardStickerMetadataPage}
      />
      <StackRouter.Screen
        name={RewardHatMetadataPageTag}
        component={RewardHatMetadataPage}
      />
      <StackRouter.Screen
        name={RewardClaimSuccessPageTag}
        component={RewardClaimSuccessPage}
      />
      <StackRouter.Screen name={ProfilePageTag} component={ProfilePage} />
      <StackRouter.Screen name={SettingsPageTag} component={SettingsPage} />
      <StackRouter.Screen
        name={AccountSettingsPageTag}
        component={AccountSettingsPage}
      />
      <StackRouter.Screen
        name={NotificationSettingsPageTag}
        component={NotificationSettingsPage}
      />
      <StackRouter.Screen
        name={EditProfileSettingsPageTag}
        component={EditProfileSettingsPage}
      />
      <StackRouter.Screen
        name={ChangePasswordPageTag}
        component={ChangePasswordPage}
      />
      <StackRouter.Screen
        name={DeleteAccountPageTag}
        component={DeleteAccountPage}
      />
      <StackRouter.Screen name={SeeYouSoonPageTag} component={SeeYouSoonPage} />
    </>
  );
}

function _TabNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <TabRouter.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let source: ImageSourcePropType;

          switch (route.name) {
            case HomePageTag:
              source = focused
                ? require('@/assets/icons/nav-bar/home-active.png')
                : require('@/assets/icons/nav-bar/home.png');
              break;

            case BookmarkPageTag:
              source = focused
                ? require('@/assets/icons/nav-bar/bookmark-active.png')
                : require('@/assets/icons/nav-bar/bookmark.png');
              break;

            case 'Reward':
              source = focused
                ? require('@/assets/icons/nav-bar/reward-active.png')
                : require('@/assets/icons/nav-bar/reward.png');
              break;

            case ActivationPageTag:
              source = focused
                ? require('@/assets/icons/nav-bar/activation-active.png')
                : require('@/assets/icons/nav-bar/activation.png');
              break;

            case NotificationsPageTag:
              source = focused
                ? require('@/assets/icons/nav-bar/notification-active.png')
                : require('@/assets/icons/nav-bar/notification.png');
              break;
          }

          return <_TabIcon focused={focused} source={source} />;
        },
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 90 : 60,
          elevation: 2,
          borderTopWidth: 0.5,
          backgroundColor: FpColor.white,
          borderTopColor: FpColor.gray500,
          paddingTop: FpSpacing.sm,
          paddingBottom:
            insets.bottom + (Platform.OS !== 'ios' ? FpSpacing.sm : 0),
        },
        tabBarLabelStyle: {
          fontFamily: 'DMSans',
        },
        tabBarActiveTintColor: FpColor.primary500,
        tabBarInactiveTintColor: FpColor.gray500,
        headerShown: notTrue,
      })}
    >
      <TabRouter.Screen name={HomePageTag} component={HomePage} />
      <TabRouter.Screen name={BookmarkPageTag} component={BookmarkPage} />
      <TabRouter.Screen name={RewardPageTag} component={RewardPage} />
      <TabRouter.Screen name={ActivationPageTag} component={ActivationPage} />
      <TabRouter.Screen
        name={NotificationsPageTag}
        component={NotificationsPage}
      />
    </TabRouter.Navigator>
  );
}

function _TabIcon({
  source,
  focused,
}: {
  source: ImageSourcePropType;
  focused: boolean;
}) {
  if (focused) {
    return (
      <View>
        <Image
          source={require('@/assets/icons/nav-bar/icon-bg.png')}
          style={{ position: 'absolute', left: -5 }}
        />
        <Image source={source} style={{ position: 'relative' }} />
      </View>
    );
  }
  return <Image source={source} />;
}
