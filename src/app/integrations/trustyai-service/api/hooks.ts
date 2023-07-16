import useAxios, { ResponseWrapper } from '@app/utils/useAxios';
import { BaseMetricListResponse, ModelMetaData } from '@app/integrations/trustyai-service/api/types';
import { getAllRequests, getModelMetadata } from '@app/integrations/trustyai-service/api/client';
import { EMPTY_REQUESTS_RESPONSE } from '@app/integrations/trustyai-service/api/const';

export const useGetModelMetadata = (): ResponseWrapper<ModelMetaData[]> => useAxios(getModelMetadata, []);

export const useGetAllRequests = (): ResponseWrapper<BaseMetricListResponse> =>
  useAxios(getAllRequests, EMPTY_REQUESTS_RESPONSE);
