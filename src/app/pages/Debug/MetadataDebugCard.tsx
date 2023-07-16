import React from 'react';
import { useGetModelMetadata } from '@app/integrations/trustyai-service/api/hooks';
import DebugCard from '@app/pages/Debug/DebugCard';

const MetadataDebugCard: React.FC = () => {
  const { data, loaded, error, refresh } = useGetModelMetadata();

  return <DebugCard data={data} title="Model Metadata" loaded={loaded} error={error} refresh={refresh} />;
};

export default MetadataDebugCard;
