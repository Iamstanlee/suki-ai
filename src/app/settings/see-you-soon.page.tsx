import FpText from '@/design-system/text';
import FpScaffold from '@/design-system/scaffold';
import { StyleSheet, View } from 'react-native';
import { FpSpacing, FpVSpace } from '@/design-system/spacing';
import { useEffect } from 'react';
import Animated from 'react-native-reanimated';
import { useTranslateXAnim } from '@/core/hooks/use-translate-x-anim';
import { useUser } from '@/core/context/user-context';

export const SeeYouSoonPageTag = 'SeeYouSoon';

export default function SeeYouSoonPage() {
  const { logout } = useUser();
  const flipAnimation = useTranslateXAnim();

  useEffect(() => {
    const timeout = setTimeout(() => {
      logout();
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <FpScaffold>
      <View style={styles.container}>
        <Animated.Image
          style={[styles.viking, flipAnimation]}
          source={require('@/assets/activation-viking.png')}
        />
        <FpVSpace.xl />
        <FpText type='h1' center>
          See you soon!
        </FpText>
      </View>
    </FpScaffold>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: FpSpacing.xl,
  },
  viking: {
    height: 300,
    width: 300,
  },
});
