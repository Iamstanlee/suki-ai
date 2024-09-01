import { useQueryClient } from '@tanstack/react-query';

// a wrapper on react-query useQueryClient with APIs we need
export const useQ = () => {
  const query = useQueryClient();

  return {
    invalidate: (...args: Parameters<typeof query.invalidateQueries>) =>
      query.invalidateQueries(...args),
    refetch: (...args: Parameters<typeof query.refetchQueries>) =>
      query.refetchQueries(...args),
    reset: (...args: Parameters<typeof query.resetQueries>) =>
      query.resetQueries(...args),
    setQueryData: (...args: Parameters<typeof query.setQueryData>) =>
      query.setQueryData(...args),
    getQueryData: (...args: Parameters<typeof query.getQueryData>) =>
      query.getQueryData(...args),
  };
};
