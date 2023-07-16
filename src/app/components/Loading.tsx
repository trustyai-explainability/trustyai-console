import { EmptyState, EmptyStateIcon, Spinner, Title } from '@patternfly/react-core';
import React from 'react';

type LoadingProps = {
  children: React.ReactElement;
  loaded: boolean;
};
const Loading: React.FC<LoadingProps> = ({ children, loaded }) => {
  const loadingContent = (
    <EmptyState>
      <EmptyStateIcon variant="container" component={Spinner} />
      <Title size="lg" headingLevel="h4">
        Loading
      </Title>
    </EmptyState>
  );

  if (!loaded) {
    return loadingContent;
  }

  return children;
};

export default Loading;
