import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.POSTGRES_URL_PROD,
        port: Number(process.env.POSTGRES_PORT_PROD),
        username: process.env.POSTGRES_USERNAME_PROD,
        password: process.env.POSTGRES_PASSWORD_PROD,
        database: process.env.POSTGRES_DB_PROD,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
