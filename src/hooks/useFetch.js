import { useCallback, useEffect, useRef, useState } from 'react';

export function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetcherRef = useRef(fetcher);
  const controllerRef = useRef(null);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    fetcherRef.current = fetcher;
  }, [fetcher]);

  const refetch = useCallback(() => {
    setReloadToken((value) => value + 1);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const controller = new AbortController();
    controllerRef.current = controller;

    let isCancelled = false;

    const run = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetcherRef.current({
          signal: controller.signal
        });

        if (controller.signal.aborted || isCancelled) {
          return;
        }

        setData(result);
      } catch (err) {
        if (controller.signal.aborted || isCancelled) {
          return;
        }

        setError(err);
      } finally {
        if (!controller.signal.aborted && !isCancelled) {
          setLoading(false);
        }
      }
    };

    void run();

    return () => {
      isCancelled = true;
      controller.abort();
    };
  }, [reloadToken, ...deps]);

  return {
    data,
    isLoading,
    error,
    refetch
  };
}