import { StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FpColor } from '@/design-system/color';
import { UserConsumer, UserContextProvider } from '@/core/context/user-context';
import { SnackBarContextProvider } from '@/core/context/snackbar-context';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import AppRouter from '@/core/router/app-router';

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    workSans: require('./assets/fonts/workSans.ttf'),
    atip: require('./assets/fonts/Atyp.ttf'),
  });

  if (!fontsLoaded && !fontError) {
    return <View />;
  }

  return (
    <QueryClientProvider client={new QueryClient()}>
      <SafeAreaProvider>
        <NavigationContainer>
          <SnackBarContextProvider>
            <UserContextProvider>
              <GestureHandlerRootView style={styles.container}>
                <BottomSheetModalProvider>
                  <UserConsumer>{() => <AppRouter />}</UserConsumer>
                </BottomSheetModalProvider>
              </GestureHandlerRootView>
            </UserContextProvider>
          </SnackBarContextProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1.0, backgroundColor: FpColor.white },
});
