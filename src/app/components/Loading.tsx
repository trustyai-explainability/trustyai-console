import { EmptyState, EmptyStateIcon, Spinner, EmptyStateHeader,  } from '@patternfly/react-core';
import React from 'react';

type LoadingProps = {
  children: React.ReactElement;
  loaded: boolean;
};
const Loading: React.FC<LoadingProps> = ({ children, loaded }) => {
  const loadingContent = (
    <EmptyState>
      <EmptyStateHeader titleText="Loading" icon={<EmptyStateIcon  icon={Spinner} />} headingLevel="h4" />
    </EmptyState>
  );

  if (!loaded) {
    return loadingContent;
  }

  return children;
};

export default Loading;
