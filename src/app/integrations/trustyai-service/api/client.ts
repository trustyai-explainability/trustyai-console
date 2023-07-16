import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { BaseMetricListResponse, ModelMetaData } from '@app/integrations/trustyai-service/api/types';
import {
  TRUSTY_AI_ALL_REQUESTS_PATH,
  TRUSTYAI_BASE_PATH,
  TRUSTYAI_INFO_PATH,
} from '@app/integrations/trustyai-service/api/const';

export const trustyApi = axios.create({
  baseURL: TRUSTYAI_BASE_PATH,
});

export const getModelMetadata = (config?: AxiosRequestConfig): Promise<AxiosResponse<ModelMetaData[]>> =>
  trustyApi.get(TRUSTYAI_INFO_PATH, config);

export const getAllRequests = (config?: AxiosRequestConfig): Promise<AxiosResponse<BaseMetricListResponse>> =>
  trustyApi.get(TRUSTY_AI_ALL_REQUESTS_PATH, config);
