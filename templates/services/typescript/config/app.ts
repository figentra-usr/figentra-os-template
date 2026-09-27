export interface AppConfig {
  name: string;
  environment: string;
  timezone: string;
  locale: string;
  debug: boolean;
}

export const app: AppConfig = {
  name: process.env.APP_NAME ?? 'figentra-service',
  environment: process.env.NODE_ENV ?? 'development',
  timezone: process.env.APP_TIMEZONE ?? 'UTC',
  locale: process.env.APP_LOCALE ?? 'en',
  debug: process.env.APP_DEBUG === 'true',
};
