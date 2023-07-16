import { PageSection, Stack, StackItem } from '@patternfly/react-core';
import React from 'react';

type PageContentProps = {
  children: React.ReactElement;
};
const PageContent: React.FC<PageContentProps> = ({ children }) => <PageSection isFilled>{children}</PageSection>;

export default PageContent;
