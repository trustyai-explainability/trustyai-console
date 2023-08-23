import React from 'react';
import { Stack, StackItem } from '@patternfly/react-core';
import PageLayout from '@app/pages/PageLayout';
import PageContent from '@app/pages/PageContent';
import GrafanaChart from '@app/pages/Charts/GrafanaChart';
import { useGetAllRequests } from '@app/integrations/trustyai-service/api/hooks';

const ChartsPage = () => {
  const { data, loaded, error } = useGetAllRequests();

  if (data.requests.length === 0) {
    return <h1>No Requests</h1>;
  }

  return (
    <PageLayout title="Charts" loaded={loaded} error={error}>
      <PageContent>
        <Stack hasGutter>
          {data.requests.map((request) => (
            <StackItem key={request.id} height={100}>
              <GrafanaChart
                title={request.request.requestName}
                baseUrl="/grafana/d-solo/default-dashboard/trustyai-default-dashboard"
                params={{
                  orgId: '1',
                  'var-model': request.request.modelId,
                  'var-metric': 'All',
                  'var-request': request.id,
                  panelId: '8',
                }}
              />
            </StackItem>
          ))}
        </Stack>
      </PageContent>
    </PageLayout>
  );
};

export default ChartsPage;
