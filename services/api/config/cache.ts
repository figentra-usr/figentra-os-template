export interface CacheConfig {
  enabled: boolean;
  driver: string;
  prefix: string;
}

export const cache: CacheConfig = {
  enabled: process.env.CACHE_ENABLED !== 'false',
  driver: process.env.CACHE_DRIVER ?? 'memory',
  prefix: process.env.CACHE_PREFIX ?? 'figentra:',
};
