import { useEffect, useState } from 'react';

interface UseLoadingStateOptions<T> {
  fetchFn: () => Promise<T>;
  onError?: (error: Error) => void;
}

export function useLoadingState<T>({ fetchFn, onError }: UseLoadingStateOptions<T>) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const result = await fetchFn();
        setData(result);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Something went wrong');
        setError(error);
        onError?.(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [fetchFn, onError]);

  return { data, isLoading, error };
}
