import { Session } from '@supabase/supabase-js';
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
  mapBoxPublicKey,
  mixpanel,
  onesignalAppId,
  revenueCatKey,
  supabase,
} from '@/core/constants';
import { storage, storageKey } from '@/core/storage';
import { deserialize, serialize } from '@/core/utils/serialize';
import { OneSignal } from 'react-native-onesignal';
import { Address } from '@/core/types/location';
import Mapbox from '@rnmapbox/maps';
import { useNavigation } from '@react-navigation/native';
import { handleNotificationClickOnSystemTray } from '@/core/push-notification';
import { NotificationPrefs } from '@/core/types/notification';
import Purchases, {
  LOG_LEVEL,
  PurchasesEntitlementInfo,
} from 'react-native-purchases';
import { subscriptionEntitlementId } from '@/core/types/subscription-plan';

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
  user?: User;
  session?: Session;
  bootstrapState?: IBootstrapState;
  signupPending?: boolean;
  saveLoginState?: (
    user: User,
    session: Session,
    onBootstrap?: boolean,
  ) => void;
  saveBootstrapState?: (state?: IBootstrapState) => void;
  updateUserData?: (user?: User) => void;
  logout?: () => void;
  invalidateAndRefresh?: () => void;
  subscription?: PurchasesEntitlementInfo;
};

const initialUserState: UserState = {
  bootstrapState: BootstrapState.loading,
};

export const UserContext = createContext<Partial<UserState>>(initialUserState);

export const UserConsumer = UserContext.Consumer;

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

    // MapBox
    Mapbox.setAccessToken(mapBoxPublicKey);

    // RevenueCat
    Purchases.setLogLevel(LOG_LEVEL.VERBOSE);
    Purchases.configure({
      apiKey: revenueCatKey,
    });

    // Mixpanel
    mixpanel.init();
    mixpanel.track(fpAnalyticsEventIds.appLaunch);
  }, []);

  // Check subscription
  useEffect(() => {
    if (state.user) {
      (async () => {
        try {
          const customerInfo = await Purchases.getCustomerInfo();
          if (
            typeof customerInfo.entitlements.active[
              subscriptionEntitlementId
            ] !== 'undefined'
          ) {
            const subscription =
              customerInfo.entitlements.active[subscriptionEntitlementId];
            setState({ ...state, subscription });
            mixpanel.getPeople().set({
              membership: subscription.productIdentifier,
            });
          } else {
            setState({
              ...state,
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
    }
  }, [state.user]);

  useEffect(() => {
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        const cachedData = deserialize<User>(
          storage.getItem(storageKey.user.data),
        );
        if (cachedData) {
          saveLoginState(cachedData, session, true);
        }

        const { data: user, error } = await supabase
          .from('members')
          .select()
          .eq('id', session.user.id)
          .single();

        if (!error) {
          saveLoginState(user, session, true);
        }
      } else {
        const signupData = deserialize<User>(
          storage.getItem(storageKey.user.signupData),
        );
        if (signupData) {
          setState({
            ...state,
            bootstrapState: BootstrapState.notAuthenticated,
            user: signupData,
            signupPending: true,
          });
        } else {
          setState({
            ...state,
            bootstrapState: BootstrapState.notAuthenticated,
          });
        }
      }
    })();
  }, []);

  // Save user data & session to storage and context
  // onBootstrap is true if the user is successfully authenticated during
  // bootstrapState without login/signup
  const saveLoginState = (
    user: User,
    session: Session,
    onBootstrap?: boolean,
  ) => {
    if (storage.has(storageKey.user.signupData)) {
      storage.removeItem(storageKey.user.signupData);
    }
    storage.setItem(storageKey.user.data, serialize(user));

    if (onBootstrap) {
      setState({
        ...state,
        user,
        session,
        bootstrapState: BootstrapState.authenticated,
      });
    } else {
      mixpanel.identify(user?.id);
      mixpanel.getPeople().set({
        name: `${user?.first_name} ${user?.last_name}`,
        email: user?.email,
        phone: user?.phone_number,
        created_at: user?.created_at,
        city: user?.address['city'],
        zipcode: user?.address['zip_code'],
      });
      mixpanel.track(fpAnalyticsEventIds.login);

      Purchases.logIn(user?.id);

      OneSignal.login(user?.id);
      OneSignal.User.addTag('All', 'true');
      OneSignal.User.addTag(user.address['city'], 'true');

      setState({ ...state, user, session });
    }
  };

  const invalidateAndRefresh = async () => {
    const { data: updatedData, error } = await supabase
      .from('members')
      .select()
      .eq('id', state.user.id)
      .single();

    if (!error) {
      setState({ ...state, user: updatedData });
    }
  };

  const saveBootstrapState = (state?: IBootstrapState) => {
    setState({
      ...state,
      bootstrapState: state ?? BootstrapState.authenticated,
    });
  };

  const logout = async () => {
    mixpanel.reset();

    await supabase.auth.signOut();
    storage.clearAll();
    setState({ bootstrapState: BootstrapState.notAuthenticated });
  };

  const updateUserData = async (
    data?: Omit<User, 'id' | 'email' | 'birthday'>,
  ) => {
    const address = data?.address as Address;

    if (address) {
      const oldAddress = state.user.address as { [key: string]: any };
      data.address = {
        ...oldAddress,
        ...address,
      };

      OneSignal.User.removeTag(oldAddress['city']);
      OneSignal.User.addTag(address['city'], 'true');
    }

    const notificationPrefs = data?.notification_prefs as NotificationPrefs;

    if (notificationPrefs) {
      const oldPrefs = state.user.notification_prefs as NotificationPrefs;
      data.notification_prefs = {
        ...oldPrefs,
        ...notificationPrefs,
      };

      if (notificationPrefs.all) {
        OneSignal.User.removeTag('All');
        OneSignal.User.removeTag((data.address ?? state.user.address)['city']);
      }
    }

    if (Object.keys(data).length === 0) return;

    const { data: updatedData, error } = await supabase
      .from('members')
      .update(data)
      .eq('id', state.user.id)
      .select()
      .single();

    if (!error) {
      setState({ ...state, user: updatedData });
    }
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        saveLoginState,
        saveBootstrapState,
        logout,
        updateUserData,
        invalidateAndRefresh,
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

  return {
    ...context,
    member_id: context.user?.id,
    avatar_url:
      context.user?.avatar_url == undefined
        ? `https://api.dicebear.com/9.x/dylan/png?seed=${context.user?.first_name}+${context.user?.last_name}&hair=bangs,buns,flatTop,fluffy,longCurls,parting,plain,roundBob,shortCurls,spiky,wavy&mood=angry,happy,neutral,sad,superHappy`
        : context.user?.avatar_url + `?v=${Date.now()}`,
  };
};
