import { BaseMetricListResponse } from '@app/integrations/trustyai-service/api/types';

export const TRUSTYAI_BASE_PATH = '/p/trustyai';
export const TRUSTYAI_INFO_PATH = '/info';

export const TRUSTY_AI_ALL_REQUESTS_PATH = '/metrics/all/requests';

export const EMPTY_REQUESTS_RESPONSE: BaseMetricListResponse = Object.freeze({ requests: [] });
