export interface EventsConfig {
  enabled: boolean;
  driver: string;
  namespace: string;
}

export const events: EventsConfig = {
  enabled: process.env.EVENTS_ENABLED !== 'false',
  driver: process.env.EVENTS_DRIVER ?? 'memory',
  namespace: process.env.EVENTS_NAMESPACE ?? 'default',
};
