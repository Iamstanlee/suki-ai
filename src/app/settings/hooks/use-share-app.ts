import { useHttp } from '@/core/hooks/use-http';
import { Share } from 'react-native';
import { useUser } from '@/core/context/user-context';

export const useShareApp = () => {
  const {
    user: { id, referral_code },
  } = useUser();
  const http = useHttp();

  const shareReferralCode = async () => {
    const message = `
Join FeastPass and enjoy exclusive discounts on your favorite restaurants and eateries.
Use my code to get started: ${referral_code ?? 'n/a'}.

Download the app here: https://onelink.to/48shrg`;

    await Share.share({ title: 'FeastPass', message: message });
    setTimeout(async () => {
      await http.post(`/members/${id}/earn-share-points`);
    }, 3000);
  };

  return {
    shareReferralCode,
  };
};
