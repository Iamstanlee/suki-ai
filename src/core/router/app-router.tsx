import { notTrue } from '@/core/utils/boolean';
import { Platform } from 'react-native';
import { FpColor } from '@/design-system/color';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FpSpacing } from '@/design-system/spacing';
import HomePage, { HomePageTag } from '@/app/home/home.page';
import OnboardingPage, {
  OnboardingPageTag,
} from '@/app/onboarding/onboarding.page';
import SettingsPage, { SettingsPageTag } from '@/app/settings/settings.page';
import SubscriptionPage, {
  SubscriptionPageTag,
} from '@/app/subscription/subscription.page';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GearSix, Heart, HouseSimple } from 'phosphor-react-native';
import NewsSourceSelectionPage, {
  NewsSourceSelectionPageTag,
} from '@/app/onboarding/news-source-selection.page';
import PreferredCategorySelectionPage, {
  PreferredCategorySelectionPageTag,
} from '@/app/onboarding/preferred-category-selection.page';

export const StackRouter = createNativeStackNavigator();
export const TabRouter = createBottomTabNavigator();

export default function AppRouter() {
  return (
    <StackRouter.Navigator screenOptions={{ headerShown: notTrue }}>
      <StackRouter.Screen name={OnboardingPageTag} component={OnboardingPage} />
      <StackRouter.Screen
        name={NewsSourceSelectionPageTag}
        component={NewsSourceSelectionPage}
      />
      <StackRouter.Screen
        name={PreferredCategorySelectionPageTag}
        component={PreferredCategorySelectionPage}
      />
      <StackRouter.Screen name={SettingsPageTag} component={SettingsPage} />
      <StackRouter.Screen name='_tab' component={_TabNavigator} />
      <StackRouter.Screen
        name={SubscriptionPageTag}
        component={SubscriptionPage}
      />
    </StackRouter.Navigator>
  );
}

function _TabNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <TabRouter.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          switch (route.name) {
            case HomePageTag:
              return (
                <HouseSimple
                  weight={focused ? 'fill' : 'regular'}
                  color={color}
                />
              );
            case 'Favorite':
              return (
                <Heart weight={focused ? 'fill' : 'regular'} color={color} />
              );
            case 'Settings':
              return (
                <GearSix weight={focused ? 'fill' : 'regular'} color={color} />
              );
          }
        },
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 90 : 60,
          elevation: 2,
          borderTopWidth: 0.5,
          backgroundColor: FpColor.white,
          borderTopColor: FpColor.gray500,
          paddingTop: FpSpacing.sm,
          paddingBottom:
            insets.bottom + (Platform.OS !== 'ios' ? FpSpacing.sm : 0),
        },
        tabBarLabelStyle: {
          fontFamily: 'workSans',
        },
        tabBarActiveTintColor: FpColor.primary500,
        tabBarInactiveTintColor: FpColor.gray500,
        headerShown: notTrue,
      })}
    >
      <TabRouter.Screen name={HomePageTag} component={HomePage} />
      <TabRouter.Screen name={'Favorite'} component={HomePage} />
      <TabRouter.Screen name={'Settings'} component={HomePage} />
    </TabRouter.Navigator>
  );
}
