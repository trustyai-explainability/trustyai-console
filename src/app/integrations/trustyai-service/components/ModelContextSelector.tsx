import ContextSelector, { ContextSelectorVariants } from '@app/components/ContextSelector';
import React from 'react';
import { TrustyAiContext } from '@app/integrations/trustyai-service/TrustyAiContext';

const ModelContextSelector: React.FC = () => {
  const { modelIds, setActiveModelId } = React.useContext(TrustyAiContext);

  return (
    <ContextSelector
      label="Model"
      variant={ContextSelectorVariants.PLAIN_TEXT}
      items={modelIds}
      onSelect={(modelId) => {
        setActiveModelId(modelId);
      }}
      isDisabled={modelIds.length === 0}
    />
  );
};

export default ModelContextSelector;
