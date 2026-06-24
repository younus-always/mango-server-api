import dotenv from "dotenv";
dotenv.config();

interface EnvConfig {
      PORT: string;
      DB_URL: string;
      NODE_ENV: "development" | "production";
      BCRYPT_SALT: number;
      SUPER_ADMIN_EMAIL: string;
      SUPER_ADMIN_PASSWORD: string;
      JWT: {
            ACCESS_SECRET_TOKEN: string;
            REFRESH_SECRET_TOKEN: string;
            ACCESS_EXPIRES: string;
            REFRESH_EXPIRES: string;
      };
      
};

const loadEnvVariables = (): EnvConfig => {
      const requireEnvVariables: string[] = ["PORT", "DB_URL", "NODE_ENV", "BCRYPT_SALT", "SUPER_ADMIN_EMAIL", "SUPER_ADMIN_PASSWORD", "ACCESS_SECRET_TOKEN", "REFRESH_SECRET_TOKEN", "ACCESS_EXPIRES", "REFRESH_EXPIRES"];

      requireEnvVariables.forEach((key) => {
            if (!process.env[key]) {
                  throw new Error(`Missing env variable: ${key}`)
            };
      });

      return {
            PORT: process.env.PORT as string,
            NODE_ENV: process.env.NODE_ENV as "development" | "production",
            DB_URL: process.env.DB_URL as string,
            BCRYPT_SALT: Number(process.env.BCRYPT_SALT),
            SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
            SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
            JWT: {
                  ACCESS_SECRET_TOKEN: process.env.ACCESS_SECRET_TOKEN as string,
                  REFRESH_SECRET_TOKEN: process.env.REFRESH_SECRET_TOKEN as string,
                  ACCESS_EXPIRES: process.env.ACCESS_EXPIRES as string,
                  REFRESH_EXPIRES: process.env.REFRESH_EXPIRES as string,
            }
      }
};

export const envVars = loadEnvVariables();