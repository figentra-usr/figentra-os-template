export interface LoggingConfig {
  level: string;
  format: string;
}

export const logging: LoggingConfig = {
  level: process.env.LOG_LEVEL ?? 'info',
  format: process.env.LOG_FORMAT ?? 'json',
};
