import { Image, View } from 'react-native';
import { FpColor } from '@/design-system/color';

type FpCheckboxProps = {
  type?: 'light' | 'dark';
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  filled?: boolean;
};

export default function FpCheckbox(props: FpCheckboxProps) {
  return (
    <View
      style={{
        height: 27,
        width: 27,
        borderRadius: 8,
        borderWidth: 1.7,
        backgroundColor: props.filled ? FpColor.black : FpColor.white,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {props.checked && (
        <Image source={require('@/assets/icons/check-dark.png')} />
      )}
    </View>
  );
}
