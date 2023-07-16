export enum DataTypes {
  BOOL = 'BOOL',
  FLOAT = 'FLOAT',
  DOUBLE = 'DOUBLE',
  INT32 = 'INT32',
  INT64 = 'INT64',
  STRING = 'STRING',
}

export type ModelAttribute = string | number | boolean;

export type SchemaItem = {
  type: DataTypes;
  name: string;
  index: number;
  values: ModelAttribute[];
};

export type Schema = {
  items: Record<string, SchemaItem>;
};

export type ModelMetaData = {
  metrics: {
    scheduledMetadata: {
      spd: number;
      dir: number;
    };
  };
  data: {
    inputSchema: Schema;
    outputSchema: Schema;
    observations: number;
    modelId: string;
  };
};

export enum BiasMetricType {
  SPD = 'SPD',
  DIR = 'DIR',
}

export type TypedValue = {
  type: DataTypes;
  value: string;
};

export type BaseMetric = {
  protectedAttribute: string;
  outcomeName: string;
  modelId: string;
  requestName: string;
  thresholdDelta?: number;
  batchSize?: number;
};

export type BaseMetricResponse = {
  id: string;
  request: {
    metricName: BiasMetricType;
    favorableOutcome: TypedValue;
    privilegedAttribute: TypedValue;
    unprivilegedAttribute: TypedValue;
  } & BaseMetric;
};

export type BaseMetricListResponse = {
  requests: BaseMetricResponse[];
};
