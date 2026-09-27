export interface DatabaseConfig {
  driver: string;
  url?: string;
  poolMin: number;
  poolMax: number;
}

export const database: DatabaseConfig = {
  driver: process.env.DATABASE_DRIVER ?? 'postgres',
  url: process.env.DATABASE_URL,
  poolMin: Number(process.env.DATABASE_POOL_MIN ?? '2'),
  poolMax: Number(process.env.DATABASE_POOL_MAX ?? '10'),
};
