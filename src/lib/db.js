// @ts-nocheck
import { createClient } from 'redis';
import 'dotenv/config'

const REDIS_HOST = process.env.REDIS_HOST
// const REDIS_USER = process.env.REDIS_USER
// const REDIS_PW = encodeURIComponent(process.env.REDIS_PW)

export const REDISDB_URI = `redis://${REDIS_HOST}`
export const REDISDB_DB = 'svern'

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.redis;

if (!cached) {
    cached = global.redis = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    const client = createClient();
    await client.connect();
    cached.conn = client
    return client;
}
