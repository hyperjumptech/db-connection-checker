import { MongoClient } from 'mongodb';

import { CheckConnectionOptions } from './interface';
import { generateMongoConnectionString } from './utils/generateMongoConnectionString';

const CONNECT_TIMEOUT_S = 3_000;

export async function checkMongoDBConnection(options?: CheckConnectionOptions) {
  const url = generateMongoConnectionString(options);
  const client = new MongoClient(url, {
    connectTimeoutMS: CONNECT_TIMEOUT_S,
    maxIdleTimeMS: CONNECT_TIMEOUT_S,
    serverSelectionTimeoutMS: CONNECT_TIMEOUT_S,
  });

  await client.connect();
  await client.close();

  return true;
}
