import { Button } from '@patternfly/react-core';
import { SyncAltIcon } from '@patternfly/react-icons';
import React from 'react';

type RefreshIconButtonProps = {
  onClick: () => void;
};
const RefreshIconButton: React.FC<RefreshIconButtonProps> = ({ onClick }) => (
  <Button variant="plain" onClick={onClick} aria-label="refresh">
    <SyncAltIcon />
  </Button>
);

export default RefreshIconButton;
