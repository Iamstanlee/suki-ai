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
import { IBootstrapState } from '@/core/context/user-context';
import BookmarkPage, { BookmarkPageTag } from '@/app/bookmark/bookmark.page';

export const StackRouter = createNativeStackNavigator();
export const TabRouter = createBottomTabNavigator();

export default function AppRouter({
  bootstrapState,
}: {
  bootstrapState: IBootstrapState;
}) {
  return bootstrapState.select({
    'authenticated': (
      <StackRouter.Navigator screenOptions={{ headerShown: false }}>
        <StackRouter.Screen name='_tab' component={_TabNavigator} />
        <StackRouter.Screen
          navigationKey={`${bootstrapState.type}`}
          name={SubscriptionPageTag}
          component={SubscriptionPage}
        />
      </StackRouter.Navigator>
    ),
    'no-active-subscription': (
      <StackRouter.Navigator screenOptions={{ headerShown: false }}>
        <StackRouter.Screen
          name={OnboardingPageTag}
          component={OnboardingPage}
        />
        <StackRouter.Screen
          name={NewsSourceSelectionPageTag}
          component={NewsSourceSelectionPage}
        />
        <StackRouter.Screen
          name={PreferredCategorySelectionPageTag}
          component={PreferredCategorySelectionPage}
        />
        <StackRouter.Screen
          navigationKey={`${bootstrapState.type}`}
          name={SubscriptionPageTag}
          component={SubscriptionPage}
        />
      </StackRouter.Navigator>
    ),
  });
}

function _TabNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <TabRouter.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          switch (route.name) {
            case HomePageTag:
              return <HouseSimple weight={'fill'} color={color} />;
            case BookmarkPageTag:
              return <Heart weight={'fill'} color={color} />;
            case SettingsPageTag:
              return <GearSix weight={'fill'} color={color} />;
          }
        },
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 90 : 60,
          elevation: 2,
          borderTopWidth: 0.5,
          backgroundColor: FpColor.primary200,
          borderTopColor: FpColor.gray500,
          paddingTop: FpSpacing.sm,
          paddingBottom:
            insets.bottom + (Platform.OS !== 'ios' ? FpSpacing.sm : 0),
        },
        tabBarLabelStyle: {
          fontFamily: 'workSans',
        },
        tabBarActiveTintColor: FpColor.primary500,
        tabBarInactiveTintColor: FpColor.black100,
        headerShown: false,
      })}
    >
      <TabRouter.Screen name={HomePageTag} component={HomePage} />
      <TabRouter.Screen name={BookmarkPageTag} component={BookmarkPage} />
      <TabRouter.Screen name={SettingsPageTag} component={SettingsPage} />
    </TabRouter.Navigator>
  );
}
