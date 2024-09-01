import { IBootstrapState } from '@/core/context/user-context';
import { notTrue } from '@/core/utils/boolean';
import UnauthenticatedRoutes from '@/core/router/unauthenticated-routes';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { FpColor } from '@/design-system/color';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AuthenticatedRoutes from '@/core/router/authenticated-routes';
import SharedRoutes from '@/core/router/shared-routes';

export const StackRouter = createNativeStackNavigator();
export const TabRouter = createBottomTabNavigator();

export default function AppRouter({
  bootstrapState,
}: {
  bootstrapState: IBootstrapState;
}) {
  return (
    <StackRouter.Navigator screenOptions={{ headerShown: notTrue }}>
      <>
        {bootstrapState.select({
          loading: <StackRouter.Screen name='_loading' component={_Loading} />,
          'not-authenticated': UnauthenticatedRoutes(),
          authenticated: AuthenticatedRoutes(),
        })}
        {SharedRoutes({ navigationKey: bootstrapState })}
      </>
    </StackRouter.Navigator>
  );
}

function _Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={FpColor.primary500} size='large' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
