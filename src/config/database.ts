import { DataSource } from "typeorm"

const isProduction = process.env.NODE_ENV === 'production';
const entities = isProduction
  ? ['dist/app/models/*.js']
  : ['src/app/models/*.ts'];

const migrations = isProduction
  ? ['src/database/migrations/*.js']
  : ['src/database/migrations/*.ts'];
const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  username: process.env.DB_USERNAME || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'nodemantra',
  synchronize: true,
  logging: true,
  entities,
  // subscribers: [],
  migrations
});

export default AppDataSource;