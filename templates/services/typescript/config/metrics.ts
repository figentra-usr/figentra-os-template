export interface MetricsConfig {
  enabled: boolean;
  exporter: string;
  endpoint?: string;
}

export const metrics: MetricsConfig = {
  enabled: process.env.METRICS_ENABLED !== 'false',
  exporter: process.env.METRICS_EXPORTER ?? 'otlp',
  endpoint: process.env.METRICS_ENDPOINT,
};
