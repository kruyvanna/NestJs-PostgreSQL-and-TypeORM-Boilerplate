import { DataSource } from 'typeorm';

export const CliDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'doremi',
  database: 'eia',
  synchronize: false,
  logging: false,
  migrationsRun: true,
  subscribers: [],
  entities: ['./src/api/**/*.entity.ts'],
  migrations: ['./src/migrations/*.ts'],
});
