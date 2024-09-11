import FpScaffold from '@/design-system/scaffold';
import FpText from '@/design-system/text';
import { Image, Linking, StyleSheet, View } from 'react-native';
import { FpSpacing, FpVSpace } from '@/design-system/spacing';
import { FpBackIconButton, FpButton } from '@/design-system/button';
import Clickable from '@/design-system/components/clickable';
import { notTrue } from '@/core/utils/boolean';
import { ActionSheet } from 'react-native-ui-lib';
import { useState } from 'react';
import { useSnackBar } from '@/core/context/snackbar-context';
import { useShareApp } from '@/app/settings/hooks/use-share-app';

export const SettingsPageTag = 'Settings';

export default function SettingsPage({ navigation }) {
  const [actionSheetOpen, setActionSheetOpen] = useState(notTrue);
  const snackBar = useSnackBar();
  const { shareReferralCode } = useShareApp();

  const openUrl = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      snackBar.INFO('Could not open url.');
    }
  };

  const _Item = ({
    title,
    onPress,
  }: {
    title: string;
    onPress: () => void;
  }) => (
    <Clickable onPress={onPress} style={styles.row}>
      <FpText bold>{title}</FpText>
    </Clickable>
  );

  return (
    <FpScaffold withZeroPadding>
      <FpVSpace.md />
      <View style={styles.padding}>
        <FpBackIconButton />
        <FpVSpace.sm />
        <FpText type='h3'>Settings</FpText>
      </View>

      <_Item
        title='Edit Profile'
        onPress={() => navigation.navigate('EditProfileSettingsPageTag')}
      />

      <_Item
        title='Notification'
        onPress={() => navigation.navigate('NotificationSettingsPageTag')}
      />

      <_Item
        title='Account Settings'
        onPress={() => navigation.navigate('AccountSettingsPageTag')}
      />

      <_Item
        title='Subscription/Plan'
        onPress={() =>
          // @ts-ignore
          navigation.navigate('SubscriptionPageTag', { isUpdate: true })
        }
      />

      <_Item title='Invite Friends' onPress={() => shareReferralCode()} />

      <_Item
        title='Terms And Service'
        onPress={() => openUrl('https://feastpasshq.com/terms')}
      />
      <_Item
        title='Privacy Policy'
        onPress={() => openUrl('https://feastpasshq.com/privacy-policy')}
      />
      <FpVSpace.max />
      <FpButton type='light' onPress={() => setActionSheetOpen(true)}>
        <Image
          style={styles.image}
          source={require('@/assets/icons/logout-dark.png')}
        />
        Logout
      </FpButton>
      <ActionSheet
        onDismiss={() => setActionSheetOpen(notTrue)}
        visible={actionSheetOpen}
        title='YOU DARE WISH TO LEAVE THE HORDE?'
        cancelButtonIndex={2}
        destructiveButtonIndex={2}
        options={[
          {
            label: 'Yes',
            onPress: () =>
              // @ts-ignore
              navigation.navigate(SeeYouSoonPageTag),
          },
          { label: 'No' },
        ]}
      />
      <FpVSpace.md />
    </FpScaffold>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: FpSpacing.lg,
    paddingHorizontal: FpSpacing.md,
    borderBottomWidth: 1.4,
    borderBottomColor: '#f0f0f0',
  },
  padding: {
    paddingHorizontal: FpSpacing.md,
  },
  image: {
    width: 16,
    height: 18,
    objectFit: 'contain',
  },
});
