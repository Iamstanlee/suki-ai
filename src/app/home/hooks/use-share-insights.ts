import { Share } from 'react-native';

export const useShareInsights = () => {
  const share = async ({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) => {
    const message = `
${title}

${content}

To get insights like this, Download the Suki AI here: https://onelink.to/u4n5zk
`;
    await Share.share({ title: 'Suki AI', message: message });
  };

  return {
    share,
  };
};
