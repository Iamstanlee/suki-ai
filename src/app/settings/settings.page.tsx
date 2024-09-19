import FpScaffold from '@/design-system/scaffold';
import FpText from '@/design-system/text';
import { Linking, StyleSheet, View } from 'react-native';
import { FpSpacing, FpVSpace } from '@/design-system/spacing';
import Clickable from '@/design-system/components/clickable';
import { SubscriptionPageTag } from '@/app/subscription/subscription.page';

export const SettingsPageTag = 'Settings';

export const openUrl = async (url: string) => {
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  }
};

export default function SettingsPage({ navigation }) {
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
      <View style={styles.padding}>
        <FpVSpace.md />
        <FpText type='h4'>Settings</FpText>
      </View>
      <_Item
        title='Subscription Plan'
        onPress={() =>
          // @ts-ignore
          navigation.navigate(SubscriptionPageTag)
        }
      />
      <_Item
        title='Terms Of Service'
        onPress={() => openUrl('https://getsuki.xyz/terms')}
      />
      <_Item
        title='Privacy Policy'
        onPress={() => openUrl('https://getsuki.xyz/privacy-policy')}
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
    borderBottomWidth: 0.4,
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
