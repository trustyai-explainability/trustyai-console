import { Table /* data-codemods */, Th, Thead, Tr } from '@patternfly/react-table';
import React from 'react';
import { BaseMetricResponse } from '@app/integrations/trustyai-service/api/types';
import RequestTableRow from '@app/pages/Metrics/RequestTableRow';
import MetricsEmptyState from '@app/pages/Metrics/MetricsEmptyState';
import { Card } from '@patternfly/react-core';

type RequestsTableProps = {
  requests: BaseMetricResponse[];
};
const RequestsTable: React.FC<RequestsTableProps> = ({ requests }) => {
  if (requests.length === 0) {
    return (
      <Card>
        <MetricsEmptyState />
      </Card>
    );
  }
  return (
    <Table aria-label="Simple table">
      <Thead>
        <Tr>
          <Th />
          <Th>Name</Th>
          <Th>Metric</Th>
          <Th>Protected attribute</Th>
          <Th>Privileged value</Th>
          <Th>Unprivileged value</Th>
          <Th>Output</Th>
          <Th>Output value</Th>
        </Tr>
      </Thead>
      {requests.map((r, i) => (
        <RequestTableRow key={r.id} request={r.request} rowIndex={i} />
      ))}
    </Table>
  );
};

export default RequestsTable;
