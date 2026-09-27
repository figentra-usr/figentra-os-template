export interface TracingConfig {
  enabled: boolean;
  exporter: string;
  endpoint?: string;
  sampleRate: number;
}

export const tracing: TracingConfig = {
  enabled: process.env.TRACING_ENABLED !== 'false',
  exporter: process.env.TRACING_EXPORTER ?? 'otlp',
  endpoint: process.env.TRACING_ENDPOINT,
  sampleRate: Number(process.env.TRACING_SAMPLE_RATE ?? '1'),
};
