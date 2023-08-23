import React from 'react';
import { Card, CardBody, CardHeader, Flex } from '@patternfly/react-core';

type GrafanaChartProps = {
  title: React.ReactNode;
  baseUrl: string;
  params: Record<string, string>;
  theme?: GrafanaThemes;
};
const GrafanaChart: React.FC<GrafanaChartProps> = ({ title, baseUrl, params, theme = GrafanaThemes.LIGHT }) => {
  const url = React.useMemo(() => {
    const queryParams = new URLSearchParams(params);
    queryParams.set('theme', theme);

    return `${baseUrl}?${queryParams.toString()}`;
  }, [baseUrl, params, theme]);

  return (
    <Card>
      <CardHeader>{title}</CardHeader>
      <CardBody>
        <Flex grow={{ default: 'grow' }}>
          <iframe src={url} style={{ flexGrow: 1, border: 'none', margin: 0, padding: 0, height: '500px' }}></iframe>
        </Flex>
      </CardBody>
    </Card>
  );
};

export enum GrafanaThemes {
  DARK = 'dark',
  LIGHT = 'light',
}

export default GrafanaChart;
