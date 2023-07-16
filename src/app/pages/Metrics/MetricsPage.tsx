import React from 'react';
import { Card, CardBody, CardTitle, Gallery, PageSection, Title } from '@patternfly/react-core';
import PageLayout from '@app/pages/PageLayout';
import { useGetAllRequests, useGetModelMetadata } from '@app/integrations/trustyai-service/api/hooks';
import RequestsTable from '@app/pages/Metrics/RequestsTable';

const MetricsPage: React.FC = () => {
  const { data, loaded, error } = useGetModelMetadata();

  const { data: requestData } = useGetAllRequests();

  const model = data[0];

  const requests = requestData.requests;

  return (
    <PageLayout title="Metrics" loaded={loaded} error={error}>
      <PageSection>
        <Gallery hasGutter style={{ '--pf-l-gallery--GridTemplateColumns--min': '260px' } as never}>
          <Card>
            <CardTitle style={{ textAlign: 'center' }}>Observations</CardTitle>
            <CardBody style={{ textAlign: 'center' }}>
              <Title headingLevel="h1">{model?.data.observations}</Title>
            </CardBody>
          </Card>
          <Card>
            <CardTitle style={{ textAlign: 'center' }}>SPD</CardTitle>
            <CardBody style={{ textAlign: 'center' }}>
              <Title headingLevel="h1">{model?.metrics.scheduledMetadata.spd}</Title>
            </CardBody>
          </Card>
          <Card>
            <CardTitle style={{ textAlign: 'center' }}>DIR</CardTitle>
            <CardBody style={{ textAlign: 'center' }}>
              <Title headingLevel="h1">{model?.metrics.scheduledMetadata.dir}</Title>
            </CardBody>
          </Card>
        </Gallery>
      </PageSection>
      <PageSection isFilled>
        <RequestsTable requests={requests} />
      </PageSection>
    </PageLayout>
  );
};

export default MetricsPage;
