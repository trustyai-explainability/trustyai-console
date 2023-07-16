import { BaseMetricResponse } from '@app/integrations/trustyai-service/api/types';
import { ExpandableRowContent, Tbody, Td, Tr } from '@patternfly/react-table';
import React from 'react';
import {
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
} from '@patternfly/react-core';

type RequestTableRowProps = {
  rowIndex: number;
  request: BaseMetricResponse['request'];
};
const RequestTableRow: React.FC<RequestTableRowProps> = ({ rowIndex, request }) => {
  const [isExpanded, setExpanded] = React.useState(false);
  return (
    <Tbody isExpanded={isExpanded}>
      <Tr>
        <Td
          expand={{
            rowIndex,
            expandId: 'request-table-row-item',
            isExpanded,
            onToggle: () => setExpanded(!isExpanded),
          }}
        />
        <Td>{request.requestName}</Td>
        <Td>{request.metricName}</Td>
        <Td>{request.protectedAttribute}</Td>
        <Td>{request.privilegedAttribute.value}</Td>
        <Td>{request.unprivilegedAttribute.value}</Td>
        <Td>{request.outcomeName}</Td>
        <Td>{request.favorableOutcome.value}</Td>
      </Tr>
      <Tr isExpanded={isExpanded}>
        <Td />
        <Td dataLabel="Other configurations" colSpan={4}>
          <ExpandableRowContent>
            <DescriptionList isHorizontal horizontalTermWidthModifier={{ default: '24ch' }}>
              <DescriptionListGroup>
                <DescriptionListTerm>Violation threshold</DescriptionListTerm>
                <DescriptionListDescription>{request.thresholdDelta}</DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>Metric batch size</DescriptionListTerm>
                <DescriptionListDescription>{request.batchSize}</DescriptionListDescription>
              </DescriptionListGroup>
            </DescriptionList>
          </ExpandableRowContent>
        </Td>
      </Tr>
    </Tbody>
  );
};

export default RequestTableRow;
