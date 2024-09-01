import { ReactNode } from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

export default function Clickable({
  onPress,
  disabled,
  children,
  style,
}: {
  onPress: () => void;
  disabled?: boolean;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.8}
      onPress={onPress}
      style={style}
    >
      {children}
    </TouchableOpacity>
  );
}
