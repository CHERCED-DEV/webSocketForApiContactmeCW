import {config} from 'dotenv';
config();

export const uriDb = process.env.MONGODB_INTEGRAL_DB;
console.log(uriDb)