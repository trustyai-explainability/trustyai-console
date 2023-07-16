import React from 'react';
import { EmptyState, EmptyStateBody, EmptyStateIcon } from '@patternfly/react-core';
import { CubesIcon } from '@patternfly/react-icons';

const MetricsEmptyState: React.FC = () => (
  <EmptyState>
    <EmptyStateIcon icon={CubesIcon} />
    <EmptyStateBody>No metrics are configured for this model.</EmptyStateBody>
  </EmptyState>
);

export default MetricsEmptyState;
