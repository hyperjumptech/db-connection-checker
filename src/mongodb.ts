import { MongoClient } from 'mongodb';

import { CheckConnectionOptions } from './interface';
import { generateMongoConnectionString } from './utils/generateMongoConnectionString';
import { DEFAULT_TIMEOUT_MS } from './constant';

export async function checkMongoDBConnection(options?: CheckConnectionOptions) {
  const url = generateMongoConnectionString(options);
  const client = new MongoClient(url, {
    connectTimeoutMS: options?.timeout || DEFAULT_TIMEOUT_MS,
  });

  await client.connect();
  await client.close();

  return true;
}
