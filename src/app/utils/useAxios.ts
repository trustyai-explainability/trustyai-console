import React from 'react';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type ResponseWrapper<T, D extends T = T> = {
  data: T | D;
  loaded: boolean;
  error?: Error;
  refresh: () => void;
};

const useAxios = <T, D extends T = T>(
  fetchFn: (config: AxiosRequestConfig) => Promise<AxiosResponse<T>>,
  defaultValue: D
): ResponseWrapper<T, D> => {
  const [data, setData] = React.useState<T | D>(defaultValue);
  const [loaded, setLoaded] = React.useState(false);
  const [error, setError] = React.useState<Error>();
  const [invalidate, setInvalidate] = React.useState<boolean>(false);

  const refresh = React.useCallback(() => {
    setLoaded(false);
    setError(undefined);
    setInvalidate(!invalidate);
  }, [invalidate]);

  React.useEffect(() => {
    const controller = new AbortController();

    fetchFn({ signal: controller.signal })
      .then((r) => setData(r.data))
      .catch((e) => setError(e))
      .finally(() => setLoaded(true));

    return () => controller.abort();
  }, [fetchFn, invalidate]);

  return {
    data,
    loaded,
    error,
    refresh,
  };
};

export default useAxios;
