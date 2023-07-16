import PageLayout from '@app/pages/PageLayout';
import PageContent from '@app/pages/PageContent';
import React from 'react';
import { Stack, StackItem } from '@patternfly/react-core';
import MetadataDebugCard from '@app/pages/Debug/MetadataDebugCard';
import RequestsDebugCard from '@app/pages/Debug/RequestsDebugCard';

const DebugPage: React.FC = () => (
  <PageLayout title="Debug data">
    <PageContent>
      <Stack hasGutter>
        <StackItem>
          <MetadataDebugCard />
        </StackItem>
        <StackItem>
          <RequestsDebugCard />
        </StackItem>
      </Stack>
    </PageContent>
  </PageLayout>
);

export default DebugPage;
