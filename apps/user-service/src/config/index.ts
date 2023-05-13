import * as dotenv from 'dotenv';

dotenv.config();

const env = (key: string) => process.env[key];

export const config = {
  database: {
    connectionString: env('DATABASE_CONNECTION_STRING'),
  },
  jwt: {
    secret: env('JWT_SECRET'),
  },
};
