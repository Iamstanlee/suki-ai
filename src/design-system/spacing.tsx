import { Platform, View } from 'react-native';
import { ReactElement } from 'react';

type FpSpacingProps = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  statusBar?: number;
  max?: any;
};
export const FpSpacing: FpSpacingProps = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  statusBar: Platform.OS === 'ios' ? 50 : 20,
};

export const FpHSpace: { [key in keyof typeof FpSpacing]: () => ReactElement } =
  {
    xs: () => <View style={{ width: FpSpacing.xs }} />,
    sm: () => <View style={{ width: FpSpacing.sm }} />,
    md: () => <View style={{ width: FpSpacing.md }} />,
    lg: () => <View style={{ width: FpSpacing.lg }} />,
    xl: () => <View style={{ width: FpSpacing.xl }} />,
    xxl: () => <View style={{ width: FpSpacing.xxl }} />,
    max: () => <View style={{ flex: 1 }} />,
  };

export const FpVSpace: { [key in keyof typeof FpSpacing]: () => ReactElement } =
  {
    xs: () => <View style={{ height: FpSpacing.xs }} />,
    sm: () => <View style={{ height: FpSpacing.sm }} />,
    md: () => <View style={{ height: FpSpacing.md }} />,
    lg: () => <View style={{ height: FpSpacing.lg }} />,
    xl: () => <View style={{ height: FpSpacing.xl }} />,
    xxl: () => <View style={{ height: FpSpacing.xxl }} />,
    max: () => <View style={{ flex: 1 }} />,
  };
