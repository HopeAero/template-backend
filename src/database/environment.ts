import { config as dotenvConfig } from "dotenv";
dotenvConfig({ path: ".env" });

const envConfig = {
  DB_HOST: process.env.DB_HOST,
  DB_PORT: +process.env.DB_PORT,
  DB_NAME: process.env.DB_NAME,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_EXPIRATION_TIME: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
  PORT: process.env.PORT,
  BCRYPT_SALT: +process.env.BCRYPT_SALT,
  EMAIL_PORT: +process.env.EMAIL_PORT,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_SENDER: process.env.EMAIL_SENDER,
  API_BASE_URL: process.env.API_BASE_URL,
  FRONTEND_BASE_URL: process.env.FRONTEND_BASE_URL,
  API_BASE_URL_DEV: process.env.API_BASE_URL_DEV,
  URL_FRONTEND_DEV: process.env.URL_FRONTEND_DEV,
  DEV_MODE: process.env.DEV_MODE,
};

export default envConfig;
