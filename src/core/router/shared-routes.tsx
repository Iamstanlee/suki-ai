import { StackRouter } from '@/core/router/app-router';
import SubscriptionPage, {
  SubscriptionPageTag,
} from '@/app/subscription/subscription.page';
import LocationNotSupportedPage, {
  LocationNotSupportedPageTag,
} from '@/app/vendor/location-not-supported.page';

export default function SharedRoutes({
  navigationKey,
}: {
  navigationKey: any;
}) {
  return (
    <>
      <StackRouter.Screen
        navigationKey={`${navigationKey}`}
        name={SubscriptionPageTag}
        component={SubscriptionPage}
      />
      <StackRouter.Screen
        name={LocationNotSupportedPageTag}
        component={LocationNotSupportedPage}
      />
    </>
  );
}
