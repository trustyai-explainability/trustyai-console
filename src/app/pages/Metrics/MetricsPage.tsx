import React from 'react';
import { Bullseye, Card, CardBody, CardTitle, Gallery, PageSection, Spinner, Title } from '@patternfly/react-core';
import PageLayout from '@app/pages/PageLayout';
import { useGetAllRequests, useGetModelMetadata } from '@app/integrations/trustyai-service/api/hooks';
import RequestsTable from '@app/pages/Metrics/RequestsTable';
import ContextSelector, { ContextSelectorVariants } from '@app/components/ContextSelector';
import { BaseMetricResponse, ModelMetaData } from '@app/integrations/trustyai-service/api/types';

const MetricsPage = () => {
  const [modelId, setModelId] = React.useState<string>();
  const { data, loaded, error } = useGetModelMetadata();
  const { data: requestData, loaded: requestDataLoaded } = useGetAllRequests();
  const [model, setModel] = React.useState<ModelMetaData>();
  const [models, setModels] = React.useState<string[]>([]);
  const [requests, setRequests] = React.useState<BaseMetricResponse[]>([]);

  const getModelById = React.useCallback(
    (id: string) => {
      const modelVal = data.find((m) => m.data.modelId === id);
      if (!modelVal) {
        // This shouldn't happen, something is wrong if we're here.
        throw new Error(`No such model with id: ${id}`);
      }
      return modelVal;
    },
    [data],
  );

  React.useEffect(() => {
    if (loaded && requestDataLoaded) {
      if (!modelId) {
        setModelId(data[0]?.data?.modelId);
      }

      if (modelId) {
        setModel(getModelById(modelId));
        setRequests(requestData.requests.filter((r) => r.request.modelId === model?.data.modelId));
        setModels(data.map((r) => r.data.modelId));
      }
    }
  }, [data, getModelById, loaded, model?.data.modelId, modelId, requestData.requests, requestDataLoaded]);

  if (!loaded || !requestDataLoaded) {
    return (
      <Bullseye>
        <Spinner />
      </Bullseye>
    );
  }

  if (!modelId || models.length === 0) {
    return (
      <Bullseye>
        <Title headingLevel="h1">Error - no model selected</Title>
      </Bullseye>
    );
  }

  return (
    <PageLayout
      title={
        <ContextSelector
          label="Model"
          variant={ContextSelectorVariants.PLAIN_TEXT}
          items={models}
          onSelect={(modelId) => {
            setModelId(modelId);
          }}
        />
      }
      loaded={loaded && requestDataLoaded}
      error={error}
    >
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
