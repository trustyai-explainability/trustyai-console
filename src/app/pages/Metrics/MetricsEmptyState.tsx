import React from 'react';
import { EmptyState, EmptyStateBody, EmptyStateIcon, EmptyStateHeader } from '@patternfly/react-core';
import { CubesIcon } from '@patternfly/react-icons';

const MetricsEmptyState: React.FC = () => (
  <EmptyState>
    <EmptyStateHeader icon={<EmptyStateIcon icon={CubesIcon} />} /><EmptyStateBody>No metrics are configured for this model.</EmptyStateBody>
  </EmptyState>
);

export default MetricsEmptyState;
