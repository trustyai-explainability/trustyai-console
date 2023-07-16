import React from 'react';
import RefreshIconButton from '@app/components/RefreshIconButton';
import { Icon } from '@patternfly/react-core';
import { ExclamationCircleIcon } from '@patternfly/react-icons';
import ErrorGuard from '@app/components/ErrorGuard';
import Loading from '@app/components/Loading';
import ExpandableCard from '@app/components/ExpandableCard';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/1337.css';

type DebugCardProps<T> = {
  data: T;
  title: string;
  loaded: boolean;
  error?: Error;
  refresh: () => void;
};
const DebugCard = <T,>({ data, title, loaded, error, refresh }: DebugCardProps<T>) => {
  return (
    <ExpandableCard
      title={title}
      id={`${title}-debug-card`}
      actions={<RefreshIconButton onClick={() => refresh()} />}
      icon={
        error && (
          <Icon status="danger">
            <ExclamationCircleIcon />
          </Icon>
        )
      }
    >
      <ErrorGuard error={error}>
        <Loading loaded={loaded}>
          <JSONPretty data={JSON.stringify(data)} mainStyle="padding:1em" />
        </Loading>
      </ErrorGuard>
    </ExpandableCard>
  );
};

export default DebugCard;
