import React from 'react';
import { useGetAllRequests } from '@app/integrations/trustyai-service/api/hooks';
import DebugCard from '@app/pages/Debug/DebugCard';

const RequestsDebugCard: React.FC = () => {
  const { data, loaded, error, refresh } = useGetAllRequests();

  return <DebugCard data={data} title="Requests" loaded={loaded} error={error} refresh={refresh} />;
};

export default RequestsDebugCard;
