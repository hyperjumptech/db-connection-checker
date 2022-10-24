import { MongoClient } from 'mongodb';

import { CheckConnectionOptions } from './interface';
import { generateMongoConnectionString } from './utils/generateMongoConnectionString';
import { CONNECT_TIMEOUT_S } from './constant';

export async function checkMongoDBConnection(options?: CheckConnectionOptions) {
  const url = generateMongoConnectionString(options);
  const client = new MongoClient(url, {
    connectTimeoutMS: options?.timeout || CONNECT_TIMEOUT_S,
  });

  await client.connect();
  await client.close();

  return true;
}
