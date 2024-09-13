import { User } from '@/core/types/user';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  fpAnalyticsEventIds,
  mixpanel,
  onesignalAppId,
  revenueCatKey,
} from '@/core/constants';
import { OneSignal } from 'react-native-onesignal';
import { useNavigation } from '@react-navigation/native';
import { handleNotificationClickOnSystemTray } from '@/core/push-notification';
import Purchases, { PurchasesEntitlementInfo } from 'react-native-purchases';

export type BootstrapStateType =
  | 'loading'
  | 'authenticated'
  | 'not-authenticated'
  | 'no-active-subscription';

export interface IBootstrapState {
  type: BootstrapStateType;

  select<T>(specifics: { [platform in BootstrapStateType]?: T }): T | undefined;
}

export const BootstrapState = {
  loading: {
    type: 'loading',
    select<T>(specifics: { [platform in BootstrapStateType]?: T }):
      | T
      | undefined {
      return specifics['loading'];
    },
  },
  authenticated: {
    type: 'authenticated',
    select<T>(specifics: { [platform in BootstrapStateType]?: T }):
      | T
      | undefined {
      return specifics['authenticated'];
    },
  },
  notAuthenticated: {
    type: 'not-authenticated',
    select<T>(specifics: { [platform in BootstrapStateType]?: T }):
      | T
      | undefined {
      return specifics['not-authenticated'];
    },
  },
  noActiveSubscription: {
    type: 'no-active-subscription',
    select<T>(specifics: { [platform in BootstrapStateType]?: T }):
      | T
      | undefined {
      return specifics['no-active-subscription'];
    },
  },
} as const;

type UserState = {
  userId?: string;
  bootstrapState?: IBootstrapState;
  saveBootstrapState?: (state?: IBootstrapState) => void;
  updateUserData?: (user?: User) => void;
  subscription?: PurchasesEntitlementInfo;
};

const initialUserState: UserState = {
  bootstrapState: BootstrapState.loading,
};

export const UserContext = createContext<Partial<UserState>>(initialUserState);

export const UserConsumer = UserContext.Consumer;

export const subscriptionEntitlementId = 'Pro';

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<Partial<UserState>>(initialUserState);
  const navigation = useNavigation();

  // Initialize services
  useEffect(() => {
    // OneSignal
    OneSignal.initialize(onesignalAppId);
    OneSignal.Notifications.addEventListener('click', ({ notification }) =>
      handleNotificationClickOnSystemTray(notification, navigation),
    );

    // RevenueCat
    Purchases.configure({
      apiKey: revenueCatKey,
    });

    // Mixpanel
    mixpanel.init();
    mixpanel.track(fpAnalyticsEventIds.appLaunch);
  }, []);

  // Check subscription
  useEffect(() => {
    (async () => {
      try {
        const [userId, customerInfo] = await Promise.all([
          Purchases.getAppUserID(),
          Purchases.getCustomerInfo(),
        ]);
        if (process.env.NODE_ENV == 'development') {
          setState({
            ...state,
            userId,
            bootstrapState: BootstrapState.authenticated,
          });
          return;
        }
        if (
          typeof customerInfo.entitlements.active[subscriptionEntitlementId] !==
          'undefined'
        ) {
          const subscription =
            customerInfo.entitlements.active[subscriptionEntitlementId];
          setState({
            ...state,
            userId,
            subscription,
            bootstrapState: BootstrapState.authenticated,
          });
          mixpanel.getPeople().set({
            membership: subscription.productIdentifier,
          });
        } else {
          setState({
            ...state,
            userId,
            bootstrapState: BootstrapState.noActiveSubscription,
          });
        }
      } catch (e) {
        setState({
          ...state,
          bootstrapState: BootstrapState.noActiveSubscription,
        });
      }
    })();
  }, []);

  const saveBootstrapState = (state?: IBootstrapState) => {
    setState({
      ...state,
      bootstrapState: state ?? BootstrapState.authenticated,
    });
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        saveBootstrapState,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserContextProvider');
  }

  return context;
};
