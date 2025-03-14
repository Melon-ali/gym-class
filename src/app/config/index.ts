/* eslint-disable no-undef */
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  default_user_pass: process.env.DEFAULT_USER_PASS,
  default_admin_pass: process.env.DEFAULT_ADMIN_PASS,
  default_trainer_pass: process.env.DEFAULT_TRAINER_PASS,
  default_trainee_pass: process.env.DEFAULT_TRAINEE_PASS,
  bycrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  unsplash_access_key: process.env.UNSPLASH_ACCESS_KEY,
  jwt: {
    secret: process.env.JWT_SECRET,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
    expires_in: process.env.JWT_EXPIRES_IN,
    refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  },
  cloudinary: {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  },
};
