export interface RealtimeConfig {
  enabled: boolean;
  driver: string;
  heartbeatSeconds: number;
}

export const realtime: RealtimeConfig = {
  enabled: process.env.REALTIME_ENABLED !== 'false',
  driver: process.env.REALTIME_DRIVER ?? 'memory',
  heartbeatSeconds: Number(process.env.REALTIME_HEARTBEAT_SECONDS ?? '30'),
};
