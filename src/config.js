import {config} from 'dotenv';
config();

export const uriDb = process.env.MONGODB_INTEGRAL_DB;
export const CORS = process.env.VERCEL_URL_CORS;