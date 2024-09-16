import { ReactNode } from 'react';
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { FpSpacing } from '@/design-system/spacing';
import FpStatusBar from '@/design-system/status-bar';
import { FpBackIconButton } from '@/design-system/button';
import { FpColor } from '@/design-system/color';

type FpScaffoldProps = {
  children: ReactNode;
  type?: 'light' | 'dark';
  scrollable?: boolean;
  withBackButton?: boolean;
  appBar?: ReactNode;
  withZeroPadding?: boolean;
  scrollRef?: any;
  bottonType?: 'light' | 'dark';
  isLoading?: boolean;
};

export default function FpScaffold({
  children,
  appBar,
  scrollable,
  withBackButton,
  withZeroPadding,
  type,
  scrollRef,
  bottonType,
  isLoading,
}: FpScaffoldProps) {
  const bgTheme = type === 'dark' ? styles.dark : styles.light;
  const hPadding = withZeroPadding ? 0 : FpSpacing.md;

  const _AppBar = appBar && (
    <View
      style={{
        ...(scrollable && { paddingHorizontal: hPadding }),
        paddingVertical: FpSpacing.sm,
      }}
    >
      {appBar}
    </View>
  );

  const _BackButton = withBackButton && !appBar && (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: FpSpacing.md,
        ...(scrollable && { paddingHorizontal: FpSpacing.md }),
      }}
    >
      <FpBackIconButton type={bottonType} />
      {isLoading && (
        <ActivityIndicator
          size={27}
          color={type == 'dark' ? FpColor.white : FpColor.black}
        />
      )}
    </View>
  );

  const _Scrollable = (
    <View style={[styles.container, bgTheme]}>
      <FpStatusBar type={type} />
      {_BackButton}
      {_AppBar}
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: hPadding }}
      >
        {children}
      </ScrollView>
    </View>
  );

  const _NotScrollable = (
    <View style={[styles.container, bgTheme, { paddingHorizontal: hPadding }]}>
      <FpStatusBar type={type} />
      {_AppBar}
      {_BackButton}
      {children}
    </View>
  );

  return scrollable ? _Scrollable : _NotScrollable;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 40 : 0,
  },
  light: {
    backgroundColor: FpColor.primary200,
  },
  dark: {
    backgroundColor: FpColor.black,
  },
});
