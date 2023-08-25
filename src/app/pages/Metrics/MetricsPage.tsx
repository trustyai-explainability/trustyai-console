import React from 'react';
import { Bullseye, Card, CardBody, CardTitle, Gallery, PageSection, Title } from '@patternfly/react-core';
import PageLayout from '@app/pages/PageLayout';
import RequestsTable from '@app/pages/Metrics/RequestsTable';
import { TrustyAiContext } from '@app/integrations/trustyai-service/TrustyAiContext';
import ModelContextSelector from '@app/integrations/trustyai-service/components/ModelContextSelector';

const MetricsPage = () => {
  const { loaded, errors, activeModel: model, requestsForActiveModel: requests } = React.useContext(TrustyAiContext);

  if (!model) {
    return (
      <Bullseye>
        <Title headingLevel="h1">Error - no model selected</Title>
      </Bullseye>
    );
  }
  return (
    <PageLayout title={<ModelContextSelector />} loaded={loaded} error={errors.length > 0 ? errors[0] : undefined}>
      <PageSection>
        <Gallery hasGutter style={{ '--pf-l-gallery--GridTemplateColumns--min': '260px' } as never}>
          <Card>
            <CardTitle style={{ textAlign: 'center' }}>Observations</CardTitle>
            <CardBody style={{ textAlign: 'center' }}>
              <Title headingLevel="h1">{model.data.observations}</Title>
            </CardBody>
          </Card>
          <Card>
            <CardTitle style={{ textAlign: 'center' }}>SPD</CardTitle>
            <CardBody style={{ textAlign: 'center' }}>
              <Title headingLevel="h1">{model.metrics.scheduledMetadata.metricCounts.SPD}</Title>
            </CardBody>
          </Card>
          <Card>
            <CardTitle style={{ textAlign: 'center' }}>DIR</CardTitle>
            <CardBody style={{ textAlign: 'center' }}>
              <Title headingLevel="h1">{model.metrics.scheduledMetadata.metricCounts.DIR}</Title>
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
