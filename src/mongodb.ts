import { MongoClient } from 'mongodb';

import { CheckConnectionOptions } from './interface';
import { generateMongoConnectionString } from './utils/generateMongoConnectionString';

export async function checkMongoDBConnection(options?: CheckConnectionOptions) {
  const url = generateMongoConnectionString(options);
  const client = new MongoClient(url);

  await client.connect();
  await client.close();

  return true;
}
