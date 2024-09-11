import { StatusBar } from 'react-native';

export default function FpStatusBar({ type }: { type?: 'dark' | 'light' }) {
  if (type === 'dark') {
    return <StatusBar barStyle='light-content' backgroundColor='#000' />;
  }
  return <StatusBar barStyle='dark-content' backgroundColor='#C7C4EF' />;
}
