export interface SchedulerConfig {
  enabled: boolean;
  driver: string;
  timezone: string;
}

export const scheduler: SchedulerConfig = {
  enabled: process.env.SCHEDULER_ENABLED !== 'false',
  driver: process.env.SCHEDULER_DRIVER ?? 'memory',
  timezone: process.env.APP_TIMEZONE ?? 'UTC',
};
