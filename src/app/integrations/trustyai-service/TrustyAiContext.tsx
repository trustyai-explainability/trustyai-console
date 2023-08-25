import { ResponseWrapper } from '@app/utils/useAxios';
import { BaseMetricResponse, ModelMetaData } from '@app/integrations/trustyai-service/api/types';
import React from 'react';
import { noop } from '@app/utils';
import { useGetAllRequests, useGetModelMetadata } from '@app/integrations/trustyai-service/api/hooks';

type TrustyAiContextProps = {
  requests: ResponseWrapper<BaseMetricResponse[]>;
  info: ResponseWrapper<ModelMetaData[]>;
  modelIds: string[];
  activeModelId: string | null;
  setActiveModelId: React.Dispatch<React.SetStateAction<string | null>>;
  activeModel: ModelMetaData | null;
  getModelById: (id: string) => ModelMetaData;
  requestsForActiveModel: BaseMetricResponse[];
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

export const TrustyAiContext = React.createContext<TrustyAiContextProps>({
  requests: createEmptyResponseWrapper([]),
  info: createEmptyResponseWrapper([]),
  modelIds: [],
  activeModelId: null,
  setActiveModelId: noop,
  activeModel: null,
  getModelById: () => undefined as unknown as ModelMetaData,
  requestsForActiveModel: [],
  refresh: noop,
  loaded: false,
  errors: [],
});

export const TrustyAiContextProvider: React.FC<TrustyAiContextProviderProps> = ({ children }) => {
  const requestsWrapper = useGetAllRequests();
  const info = useGetModelMetadata();

  const [activeModelId, setActiveModelId] = React.useState<string | null>(null);

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

  const modelIds = React.useMemo(() => {
    if (info.loaded) {
      return info.data.map((modelDef) => modelDef.data.modelId);
    } else {
      return [];
    }
  }, [info.data, info.loaded]);

  const getModelById = React.useCallback(
    (id: string) => {
      const modelVal = info.data.find((m) => m.data.modelId === id);
      if (!modelVal) {
        // This shouldn't happen, there's an error in your code if you see this.
        throw new Error(`No such model with id: ${id}`);
      }
      return modelVal;
    },
    [info.data],
  );

  // Automatically set an active model if the user has not yet selected one.
  React.useEffect(() => {
    if (!activeModelId && modelIds.length > 0) {
      setActiveModelId(modelIds[0]);
    }
  }, [activeModelId, modelIds]);

  const requestsForActiveModel = React.useMemo(() => {
    if (!requests.loaded || !activeModelId) {
      return [];
    }
    return requests.data.filter((r) => r.request.modelId === activeModelId);
  }, [activeModelId, requests.data, requests.loaded]);

  const activeModel = React.useMemo(() => {
    if (!activeModelId) {
      return null;
    }
    return getModelById(activeModelId);
  }, [activeModelId, getModelById]);

  return (
    <TrustyAiContext.Provider
      value={{
        requests,
        info,
        modelIds,
        activeModelId,
        setActiveModelId,
        activeModel,
        getModelById,
        requestsForActiveModel,
        refresh,
        loaded,
        errors,
      }}
    >
      {children}
    </TrustyAiContext.Provider>
  );
};
