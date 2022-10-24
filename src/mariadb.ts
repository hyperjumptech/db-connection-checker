import { createConnection } from 'mariadb';

import { CheckConnectionOptions } from './interface';
import { DEFAULT_TIMEOUT_MS } from './constant';

export async function checkMariaDBConnection(options?: CheckConnectionOptions) {
  const client = await createConnection({
    host: options?.host,
    port: options?.port,
    user: options?.user,
    password: options?.password,
    database: options?.database,

    connectTimeout: options?.timeout || DEFAULT_TIMEOUT_MS,
  });

  await client.end();

  return true;
}
