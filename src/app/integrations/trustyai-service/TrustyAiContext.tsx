import { ResponseWrapper } from '@app/utils/useAxios';
import { BaseMetricResponse, ModelMetaData } from '@app/integrations/trustyai-service/api/types';
import React from 'react';
import { noop } from '@app/utils';
import { useGetAllRequests, useGetModelMetadata } from '@app/integrations/trustyai-service/api/hooks';

type TrustyAiContextProps = {
  requests: ResponseWrapper<BaseMetricResponse[]>;
  info: ResponseWrapper<ModelMetaData[]>;
  refresh: () => void;
  loaded: boolean;
  errors: Error[];
};

type TrustyAiContextProviderProps = {
  children: React.ReactNode;
};

const createEmptyResponseWrapper = <T,>(data: T): ResponseWrapper<T> => {
  return {
    data,
    loaded: false,
    refresh: noop,
    error: undefined,
  };
};

const TrustyAiContext = React.createContext<TrustyAiContextProps>({
  requests: createEmptyResponseWrapper([]),
  info: createEmptyResponseWrapper([]),
  refresh: noop,
  loaded: false,
  errors: [],
});

export const TrustyAiContextProvider: React.FC<TrustyAiContextProviderProps> = ({ children }) => {
  // const { data: requestData, loaded: requestsDataLoaded, error: requestsError, refresh: refreshRequests } = useGetAllRequests();
  // const { data: infoData, loaded: infoLoaded, error: infoError, refresh: refreshInfo } = useGetModelMetadata();

  const requestsWrapper = useGetAllRequests();
  const info = useGetModelMetadata();

  const requests = React.useMemo(() => {
    return {
      data: requestsWrapper.loaded ? requestsWrapper.data.requests : [],
      loaded: requestsWrapper.loaded,
      error: requestsWrapper.error,
      refresh: requestsWrapper.refresh,
    };
  }, [requestsWrapper.data.requests, requestsWrapper.error, requestsWrapper.loaded, requestsWrapper.refresh]);

  const refresh = React.useCallback(() => {
    requestsWrapper.refresh();
    info.refresh();
  }, [info, requestsWrapper]);

  const loaded = React.useMemo(() => requestsWrapper.loaded && info.loaded, [info.loaded, requestsWrapper.loaded]);

  const errors = React.useMemo(() => {
    const retVal: Error[] = [];
    if (requestsWrapper.error) {
      retVal.push(requestsWrapper.error);
    }

    if (info.error) {
      retVal.push(info.error);
    }
    return retVal;
  }, [info.error, requestsWrapper.error]);

  return (
    <TrustyAiContext.Provider
      value={{
        requests,
        info,
        refresh,
        loaded,
        errors,
      }}
    >
      {children}
    </TrustyAiContext.Provider>
  );
};
