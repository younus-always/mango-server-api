import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
      node_env: process.env.NODE_ENV,
      port: process.env.PORT,
      database_url: process.env.DATABASE_URL as string,
      bcrypt_salt: Number(process.env.BCRYPT_SALT),
      jwt_secret_token: process.env.JWT_SECRET_TOKEN as string,
      jwt_refresh_token: process.env.JWT_REFRESH_TOKEN as string,
      jwt_expiresIn:process.env.JWT_EXPIRES
};