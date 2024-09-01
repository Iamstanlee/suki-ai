import { StyleSheet, View } from 'react-native';
import { FpSpacing, FpVSpace } from '@/design-system/spacing';
import FpText from '@/design-system/text';
import { FpButton } from '@/design-system/button';
import { OrangeSlice } from 'phosphor-react-native';

type Props = {
  header?: string;
  title: string;
  actionBtnText?: string;
  actionBtnOnPress?: () => void;
  withSadFace?: boolean;
  flexible?: boolean;
};

export default function EmptyPage({
  header,
  title,
  actionBtnText,
  actionBtnOnPress,
  withSadFace,
  flexible,
}: Props) {
  return (
    <View style={[styles.container, flexible && { flex: 1 }]}>
      {withSadFace && <OrangeSlice size={36} />}
      {header && (
        <>
          <FpVSpace.md />
          <FpText type='h5' center>
            {header}
          </FpText>
        </>
      )}
      <FpVSpace.sm />
      <FpText type='spanSm' center>
        {title}
      </FpText>
      <FpVSpace.md />
      {actionBtnText && (
        <FpButton type='dark' size='sm' onPress={actionBtnOnPress}>
          {actionBtnText}
        </FpButton>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: FpSpacing.xxl,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
