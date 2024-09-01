import OnboardingPage, { OnboardingPageTag } from '@/app/auth/onboarding.page';
import VerifyEmailAddressPage, {
  VerifyEmailAddressPageTag,
} from '@/app/auth/signup/verify-email-address.page';
import SignupOnboardingPage, {
  SignupOnboardingPageTag,
} from '@/app/auth/signup/signup-onboarding.page';
import SignupPage, { SignupPageTag } from '@/app/auth/signup/signup.page';
import LoginPage, { LoginPageTag } from '@/app/auth/login/login.page';
import SuccessfulSignupPage, {
  SuccessfulSignupPageTag,
} from '@/app/auth/signup/successful-signup.page';
import ForgotPasswordPage, {
  ForgotPasswordPageTag,
} from '@/app/auth/forgot-password/forgot-password.page';
import ResetPasswordPage, {
  ResetPasswordPageTag,
} from '@/app/auth/forgot-password/reset-password.page';
import SetupPage, { SetupPageTag } from '@/app/auth/signup/setup.page';
import WalkthroughPage, {
  WalkthroughPageTag,
} from '@/app/auth/signup/walkthrough.page';
import WatchTutorialPage, {
  WatchTutorialPageTag,
} from '@/app/auth/signup/watch-tutorial.page';
import { StackRouter } from '@/core/router/app-router';

export default function UnauthenticatedRoutes() {
  return (
    <>
      <StackRouter.Screen name={OnboardingPageTag} component={OnboardingPage} />
      <StackRouter.Screen
        name={VerifyEmailAddressPageTag}
        component={VerifyEmailAddressPage}
      />
      <StackRouter.Screen
        name={SignupOnboardingPageTag}
        component={SignupOnboardingPage}
      />
      <StackRouter.Screen name={SignupPageTag} component={SignupPage} />
      <StackRouter.Screen name={LoginPageTag} component={LoginPage} />
      <StackRouter.Screen
        name={SuccessfulSignupPageTag}
        component={SuccessfulSignupPage}
      />
      <StackRouter.Screen
        name={ForgotPasswordPageTag}
        component={ForgotPasswordPage}
      />
      <StackRouter.Screen
        name={ResetPasswordPageTag}
        component={ResetPasswordPage}
      />
      <StackRouter.Screen name={SetupPageTag} component={SetupPage} />
      <StackRouter.Screen
        name={WalkthroughPageTag}
        component={WalkthroughPage}
      />
      <StackRouter.Screen
        name={WatchTutorialPageTag}
        component={WatchTutorialPage}
      />
    </>
  );
}
