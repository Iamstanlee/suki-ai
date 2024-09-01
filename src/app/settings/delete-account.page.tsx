import FpText from '@/design-system/text';
import FpScaffold from '@/design-system/scaffold';
import { StyleSheet, View } from 'react-native';
import { FpSpacing, FpVSpace } from '@/design-system/spacing';
import Animated from 'react-native-reanimated';
import { useTranslateXAnim } from '@/core/hooks/use-translate-x-anim';
import { FpButton } from '@/design-system/button';
import { useMemo, useState } from 'react';
import { SeeYouSoonPageTag } from '@/app/settings/see-you-soon.page';
import { FpColor } from '@/design-system/color';
import Clickable from '@/design-system/components/clickable';
import { useNavigation } from '@react-navigation/native';
import { Checkbox } from 'react-native-ui-lib';
import { useSettingsMutation } from '@/app/settings/hooks/use-settings-mutation';

export const DeleteAccountPageTag = 'DeleteAccount';

const selectableDeleteReasons = [
  'Too expensive',
  "I couldn't Feast enough",
  "The cost to benefit wasn't there",
  "I don't want to feast anymore",
  "I'm leaving to explore different worlds. It's not you, it's me.",
];

export default function DeleteAccountPage() {
  const flipAnimation = useTranslateXAnim();
  const navigation = useNavigation();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [deleteReasons, setDeleteReasons] = useState<string[]>([]);
  const { deleteAccount, deleteAccountLoading } = useSettingsMutation();

  const reasonPicked = useMemo(() => deleteReasons.length > 0, [deleteReasons]);

  const _StepOne = () => (
    <View style={styles.container}>
      <Animated.Image
        style={[styles.viking, flipAnimation]}
        source={require('@/assets/activation-viking.png')}
      />
      <FpVSpace.lg />
      <FpText type='h3' center>
        You want to delete your account?
      </FpText>
      <FpVSpace.md />
      <FpButton variant='outlined' type='dark' onPress={() => setStep(2)}>
        Yes
      </FpButton>
    </View>
  );

  const _StepTwoAndThree = () => (
    <View style={styles.container}>
      <Animated.Image
        style={[styles.vikingSm]}
        source={require('@/assets/activation-viking.png')}
      />
      <FpVSpace.lg />
      <FpText type='h3' center>
        How come?
      </FpText>
      <FpVSpace.md />
      <View style={styles.box}>
        {selectableDeleteReasons.map((reason) => (
          <Clickable
            style={[styles.row, { marginBottom: FpSpacing.sm }]}
            key={reason}
            onPress={() => {
              if (deleteReasons.includes(reason)) {
                setDeleteReasons(deleteReasons.filter((r) => r !== reason));
              } else {
                setDeleteReasons([...deleteReasons, reason]);
              }
            }}
          >
            <Checkbox
              color={FpColor.black}
              value={deleteReasons.includes(reason)}
            />
            <FpText>{reason}</FpText>
          </Clickable>
        ))}
      </View>
      <FpVSpace.md />
      {step === 2 && (
        <View style={styles.row}>
          <FpButton
            variant={reasonPicked ? 'contained' : 'outlined'}
            type='dark'
            onPress={() => setStep(2)}
          >
            Get 1 Month off
          </FpButton>
          <FpButton variant='outlined' type='dark' onPress={() => setStep(3)}>
            No
          </FpButton>
        </View>
      )}

      {step === 3 && (
        <FpButton
          variant={reasonPicked ? 'contained' : 'outlined'}
          type='dark'
          isLoading={deleteAccountLoading}
          onPress={() =>
            deleteAccount(
              { delete_reasons: deleteReasons },
              {
                onSuccess: () =>
                  // @ts-ignore
                  navigation.navigate(SeeYouSoonPageTag),
              },
            )
          }
        >
          Delete Account
        </FpButton>
      )}
    </View>
  );

  return (
    <FpScaffold withBackButton>
      {step === 1 && <_StepOne />}
      {[2, 3].includes(step) && <_StepTwoAndThree />}
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
  vikingSm: {
    height: 200,
    width: 200,
  },
  box: {
    borderColor: FpColor.black,
    borderWidth: 1.2,
    padding: FpSpacing.md,
    borderRadius: FpSpacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: FpSpacing.md,
  },
});
