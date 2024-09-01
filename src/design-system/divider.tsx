import { View } from 'react-native';
import { FpColor } from '@/design-system/color';

export default function FpDivider({
  vPadding,
  hPadding,
  color,
  vertical,
}: {
  vPadding?: number;
  hPadding?: number;
  color?: string;
  vertical?: boolean;
}) {
  return (
    <View
      style={{
        height: vertical ? '100%' : 0.8,
        width: vertical ? 0.8 : 'auto',
        backgroundColor: color ?? FpColor.gray400,
        marginVertical: vPadding,
        marginHorizontal: hPadding,
      }}
    />
  );
}
