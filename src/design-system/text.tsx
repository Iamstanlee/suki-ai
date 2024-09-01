import { ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export type FpTextProps = {
  children: ReactNode;
  type?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'span'
    | 'spanSm'
    | 'spanXs'
    | 'label'
    | 'button';
  bold?: boolean;
  color?: string;
  link?: boolean;
  onPress?: () => void;
  center?: boolean;
  left?: boolean;
  right?: boolean;
  opacity?: number;
  p8?: boolean;
  p12?: boolean;
  p16?: boolean;
  p20?: boolean;
  p24?: boolean;
  paddingAxis?: 'horizontal' | 'vertical';
  numberOfLines?: number;
};

export default function FpText({
  children,
  type,
  bold,
  color,
  center,
  left,
  right,
  link,
  opacity,
  p8,
  p12,
  p16,
  p20,
  p24,
  paddingAxis,
  numberOfLines,
  onPress,
}: FpTextProps) {
  const padding = p8 ? 8 : p12 ? 12 : p16 ? 16 : p20 ? 20 : p24 ? 24 : 0;
  const _text = (
    <Text
      numberOfLines={numberOfLines}
      style={{
        color,
        opacity,
        ...(paddingAxis === 'vertical'
          ? { paddingVertical: padding }
          : { paddingHorizontal: padding }),
        textAlign: center ? 'center' : left ? 'left' : right ? 'right' : 'auto',
        ...styles[type ?? 'span'],
        ...(link && styles.link),
        ...(bold && styles.bold),
      }}
    >
      {children}
    </Text>
  );

  if (onPress) {
    return <TouchableOpacity onPress={onPress}>{_text}</TouchableOpacity>;
  }
  return _text;
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 40,
    lineHeight: 40,
    fontFamily: 'DMSerifDisp',
  },
  h2: {
    fontSize: 35,
    lineHeight: 40,
    fontFamily: 'DMSerifDisp',
  },
  h3: {
    lineHeight: 40,
    fontSize: 30,
    fontFamily: 'DMSerifDisp',
  },
  h4: {
    fontSize: 25,
    lineHeight: 40,
    fontFamily: 'DMSerifDisp',
  },
  h5: {
    fontSize: 20,
    lineHeight: 20,
    fontFamily: 'DMSerifDisp',
  },
  h6: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: 'DMSerifDisp',
  },
  span: {
    fontSize: 16,
    fontFamily: 'DMSans',
  },
  spanSm: {
    fontSize: 14,
    fontFamily: 'DMSans',
  },
  spanXs: {
    fontSize: 10,
    fontFamily: 'DMSans',
  },
  label: {
    fontSize: 12,
    fontFamily: 'DMSans',
  },
  button: {
    fontSize: 17,
    fontFamily: 'DMSansBold',
  },
  bold: {
    fontWeight: '500',
    fontFamily: 'DMSansBold',
  },
  link: {
    fontFamily: 'DMSans',
    color: '#6848F5',
    textDecorationLine: 'underline',
  },
});
