import FpScaffold from '@/design-system/scaffold';
import FpText from '@/design-system/text';
import { StyleSheet, View } from 'react-native';
import { FpSpacing, FpVSpace } from '@/design-system/spacing';
import { FpBackIconButton } from '@/design-system/button';
import { useNavigation } from '@react-navigation/native';
import Clickable from '@/design-system/components/clickable';
import { ChangePasswordPageTag } from '@/app/settings/change-password.page';
import { DeleteAccountPageTag } from '@/app/settings/delete-account.page';

export const AccountSettingsPageTag = 'AccountSettings';

export default function AccountSettingsPage() {
  const navigation = useNavigation();

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
        <FpText type='h3'>Account Settings</FpText>
      </View>

      <_Item
        title='Change Password'
        onPress={() =>
          // @ts-ignore
          navigation.navigate(ChangePasswordPageTag)
        }
      />

      <_Item
        title='Delete Account'
        onPress={() =>
          // @ts-ignore
          navigation.navigate(DeleteAccountPageTag)
        }
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
