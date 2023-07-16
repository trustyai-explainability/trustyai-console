import React from 'react';
import { EmptyState, EmptyStateBody, EmptyStateIcon, Title } from '@patternfly/react-core';
import { ExclamationTriangleIcon } from '@patternfly/react-icons';

type ErrorGuardProps = {
  children: React.ReactElement;
  error?: Error;
};
const ErrorGuard: React.FC<ErrorGuardProps> = ({ children, error }) => {
  if (error) {
    return (
      <EmptyState variant="full">
        <EmptyStateIcon icon={ExclamationTriangleIcon} />
        <Title headingLevel="h4" size="lg">
          Error
        </Title>
        <EmptyStateBody>{error?.message}</EmptyStateBody>
      </EmptyState>
    );
  }

  return children;
};

export default ErrorGuard;
