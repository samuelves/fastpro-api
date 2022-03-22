import * as dotenv from 'dotenv';
dotenv.config();

module.exports = {
  type: process.env.TYPEORM_TYPE,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  logging: true,
  migrations: ['./src/presentation/infrastructure/typeorm/migrations/*.ts'],
  entities: ['./src/infra/typeorm/entities/*.ts'],
  cli: {
    migrationsDir: './src/presentation/infrastructure/typeorm/migrations',
  },
};
