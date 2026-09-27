export interface QueueConfig {
  enabled: boolean;
  driver: string;
  defaultRetryAttempts: number;
  defaultBackoffMs: number;
}

export const queue: QueueConfig = {
  enabled: process.env.QUEUE_ENABLED !== 'false',
  driver: process.env.QUEUE_DRIVER ?? 'memory',
  defaultRetryAttempts: Number(process.env.QUEUE_RETRY_ATTEMPTS ?? '3'),
  defaultBackoffMs: Number(process.env.QUEUE_BACKOFF_MS ?? '1000'),
};
