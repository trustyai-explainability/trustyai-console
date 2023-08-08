import React from 'react';
import { EmptyState, EmptyStateBody, EmptyStateIcon, EmptyStateHeader,  } from '@patternfly/react-core';
import { ExclamationTriangleIcon } from '@patternfly/react-icons';

type ErrorGuardProps = {
  children: React.ReactElement;
  error?: Error;
};
const ErrorGuard: React.FC<ErrorGuardProps> = ({ children, error }) => {
  if (error) {
    return (
      <EmptyState variant="full">
        <EmptyStateHeader titleText="Error" icon={<EmptyStateIcon icon={ExclamationTriangleIcon} />} headingLevel="h4" />
        <EmptyStateBody>{error?.message}</EmptyStateBody>
      </EmptyState>
    );
  }

  return children;
};

export default ErrorGuard;
