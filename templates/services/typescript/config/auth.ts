export interface AuthConfig {
  enabled: boolean;
  issuer?: string;
  audience?: string;
}

export const auth: AuthConfig = {
  enabled: process.env.AUTH_ENABLED !== 'false',
  issuer: process.env.AUTH_ISSUER,
  audience: process.env.AUTH_AUDIENCE,
};
