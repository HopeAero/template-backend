import envConfig from "./environment";

const DATABASE_CONFIG = {
  DB_HOST: envConfig.DB_HOST,
  DB_PORT: +envConfig.DB_PORT,
  DB_NAME: envConfig.DB_NAME,
  DB_USERNAME: envConfig.DB_USERNAME,
  DB_PASSWORD: envConfig.DB_PASSWORD,
};

export default DATABASE_CONFIG;
