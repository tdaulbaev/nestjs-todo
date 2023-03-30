import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  env: process.env.NODE_ENV,
  address: process.env.ADDRESS,
  apiPrefix: process.env.API_PREFIX || 'api',
  port: parseInt(process.env.APP_PORT || process.env.PORT, 10) || 3000,
}));
