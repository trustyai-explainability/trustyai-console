import { Card, CardExpandableContent, CardHeader, CardTitle } from '@patternfly/react-core';
import React from 'react';

type ExpandableCardProps = {
  children: React.ReactNode;
  title: React.ReactNode;
  actions?: React.ReactNode;
  icon?: React.ReactNode;
  id: string;
  isToggleRightAligned?: boolean;
};
const ExpandableCard: React.FC<ExpandableCardProps> = ({
  actions,
  children,
  icon,
  id,
  title,
  isToggleRightAligned = false,
}) => {
  const [isExpanded, setExpanded] = React.useState(false);

  const toggleButtonId = `${id}-toggle-button`;
  const cardTitleId = `${id}-title`;

  return (
    <Card id={id} isExpanded={isExpanded}>
      <CardHeader {...(actions && {actions: { actions: <>{actions}</>, hasNoOffset: false, className: undefined}})} 
        onExpand={() => setExpanded(!isExpanded)}
        isToggleRightAligned={isToggleRightAligned}
        toggleButtonProps={{
          id: toggleButtonId,
          'aria-label': 'Details',
          'aria-labelledby': `${cardTitleId} ${toggleButtonId}`,
          'aria-expanded': isExpanded,
        }}
      >
        {icon && icon}
        
        <CardTitle id={cardTitleId}>{title}</CardTitle>
      </CardHeader>
      <CardExpandableContent>{children}</CardExpandableContent>
    </Card>
  );
};

export default ExpandableCard;
