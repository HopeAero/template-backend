import { ConfigModule } from "@nestjs/config";
import { SeederOptions } from "typeorm-extension";
import { DataSourceOptions } from "typeorm";

ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: ".env",
});
const databaseConfig: DataSourceOptions & SeederOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + "../../**/**/*entity{.ts,.js}"],
  synchronize: true,
  migrationsRun: false,
  logging: true,
  migrations: [__dirname + "/../migrations/*{.ts,.js}"],
};

export default databaseConfig;
