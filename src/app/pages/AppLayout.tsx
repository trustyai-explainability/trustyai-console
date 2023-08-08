import { Nav, NavItem, NavList, Page, PageSidebar, PageSidebarBody, SkipToContent } from '@patternfly/react-core';
import * as React from 'react';
import { PageHeader } from '@patternfly/react-core/deprecated';
import logo from '@app/bgimages/trustyai_logo_hori_reverse.svg';
import { NavLink, useLocation } from 'react-router-dom';

type AppLayoutProps = {
  children: React.ReactNode;
};

const pageId = 'primary-app-container';
const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = React.useState(true);
  const [isMobileView, setIsMobileView] = React.useState(true);
  const [isNavOpenMobile, setIsNavOpenMobile] = React.useState(false);

  const location = useLocation();
  const onNavToggleMobile = () => {
    setIsNavOpenMobile(!isNavOpenMobile);
  };
  const onNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };
  const onPageResize = (props: { mobileView: boolean; windowSize: number }) => {
    setIsMobileView(props.mobileView);
  };
  const Header = () => (
    <PageHeader
      logo={<img src={logo} alt="TrustyAI" style={{ height: '36px', width: 'auto' }} />}
      showNavToggle
      isNavOpen={isNavOpen}
      onNavToggle={isMobileView ? onNavToggleMobile : onNavToggle}
    />
  );

  const Navigation = () => (
    <Nav id="nav-primary-simple" theme="dark">
      <NavList id="nav-list-simple">
        <NavItem id="nav-default-link0" to="/" itemId={0} isActive={'/' === location.pathname}>
          <NavLink to="/">Metrics</NavLink>
        </NavItem>
        <NavItem id="nav-default-link1" itemId={1} isActive={'/debug' === location.pathname}>
          <NavLink to="/debug">Debug data</NavLink>
        </NavItem>
      </NavList>
    </Nav>
  );

  const Sidebar = () => (
    <PageSidebar theme="dark" isSidebarOpen={isMobileView ? isNavOpenMobile : isNavOpen}>
      <PageSidebarBody>
        <Navigation />
      </PageSidebarBody>
    </PageSidebar>
  );

  const PageSkipToContent = () => (
    <SkipToContent
      onClick={(event) => {
        event.preventDefault();
        const primaryContentContainer = document.getElementById(pageId);
        primaryContentContainer && primaryContentContainer.focus();
      }}
      href={`#${pageId}`}
    >
      Skip to Content
    </SkipToContent>
  );

  return (
    <Page
      mainContainerId={pageId}
      header={<Header />}
      sidebar={<Sidebar />}
      onPageResize={(_event, props: { mobileView: boolean; windowSize: number }) => onPageResize(props)}
      skipToContent={<PageSkipToContent />}
    >
      {children}
    </Page>
  );
};

export default AppLayout;
