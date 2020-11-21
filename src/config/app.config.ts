import { registerAs } from "@nestjs/config";

export default registerAs(
    'appConfig',
    () => ({
        environment: process.env.NODE_ENV || 'development',
        database: {
            host: process.env.DATABASE_HOST,
            port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            databaseName: process.env.DATABASE_NAME
        }
    }));