import { setStringAsync, setUrlAsync } from 'expo-clipboard';

export const copyTextToClipboard = async (text?: string) => {
  try {
    await setStringAsync(text || '');
  } catch (e) {
    console.error(e);
  }
};

export const copyUrlToClipboard = async (url?: string) => {
  try {
    await setUrlAsync(url || 'https://');
  } catch (e) {
    console.error(e);
  }
};
