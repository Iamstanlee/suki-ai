import FpScaffold from '@/design-system/scaffold';
import FpText from '@/design-system/text';
import { StyleSheet, View } from 'react-native';
import { FpSpacing, FpVSpace } from '@/design-system/spacing';
import { FpBackIconButton } from '@/design-system/button';
import { useNavigation } from '@react-navigation/native';
import { Switch } from 'react-native-ui-lib';
import { FpColor } from '@/design-system/color';
import { useUser } from '@/core/context/user-context';
import { useSettingsMutation } from '@/app/settings/hooks/use-settings-mutation';

export const NotificationSettingsPageTag = 'NotificationSettings';

export default function NotificationSettingsPage() {
  const navigation = useNavigation();
  const {
    user: { notification_prefs },
  } = useUser();
  const { updateNotificationPrefs } = useSettingsMutation();

  const _Item = ({
    title,
    value,
    onChange,
  }: {
    title: string;
    value?: boolean;
    onChange?: (value: boolean) => void;
  }) => (
    <View style={styles.row}>
      <FpText bold>{title}</FpText>
      <Switch
        value={value}
        onValueChange={onChange}
        onColor={FpColor.primary500}
      />
    </View>
  );

  return (
    <FpScaffold withZeroPadding>
      <FpVSpace.md />
      <View style={styles.padding}>
        <FpBackIconButton />
        <FpVSpace.sm />
        <FpText type='h3'>Notification</FpText>
      </View>
      <_Item
        title='All'
        value={notification_prefs['all']}
        onChange={(value) => updateNotificationPrefs({ all: value })}
      />
      <_Item
        title='New Vendor'
        value={notification_prefs['vendor_updates']}
        onChange={(value) => updateNotificationPrefs({ vendor_updates: value })}
      />
      <_Item
        title='FeastPass Update'
        value={notification_prefs['app_updates']}
        onChange={(value) => updateNotificationPrefs({ app_updates: value })}
      />
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
});
