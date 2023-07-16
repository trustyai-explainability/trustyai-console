import {
  Bullseye,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  PageSection,
  PageSectionVariants,
  Spinner,
  Split,
  SplitItem,
  Stack,
  TextContent,
  Title,
} from '@patternfly/react-core';
import React from 'react';
import { ExclamationTriangleIcon } from '@patternfly/react-icons';

type PageLayoutProps = {
  children: React.ReactNode;
  title: React.ReactNode;
  loaded?: boolean;
  error?: Error;
};

const PageLayout: React.FC<PageLayoutProps> = ({ children, title, loaded, error }) => {
  if (loaded === false) {
    return (
      <PageSection variant={PageSectionVariants.light}>
        <Bullseye>
          <EmptyState>
            <EmptyStateIcon variant="container" component={Spinner} />
            <Title size="lg" headingLevel="h4">
              Loading
            </Title>
          </EmptyState>
        </Bullseye>
      </PageSection>
    );
  }

  const renderContent = () => {
    if (error) {
      return (
        <PageSection>
          <Bullseye>
            <EmptyState variant="full">
              <EmptyStateIcon icon={ExclamationTriangleIcon} />
              <Title headingLevel="h1" size="lg">
                Error loading content
              </Title>
              <EmptyStateBody>{error?.message}</EmptyStateBody>
            </EmptyState>
          </Bullseye>
        </PageSection>
      );
    }

    return children;
  };

  return (
    <>
      <PageSection variant={PageSectionVariants.light}>
        <Stack hasGutter>
          <Split>
            <SplitItem>
              <TextContent>
                <Title headingLevel="h1" size="lg">
                  {title}
                </Title>
              </TextContent>
            </SplitItem>
          </Split>
        </Stack>
      </PageSection>
      {renderContent()}
    </>
  );
};

export default PageLayout;
