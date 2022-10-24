import { createConnection } from 'mariadb';

import { CheckConnectionOptions } from './interface';
import { CONNECT_TIMEOUT_S } from './constant';

export async function checkMariaDBConnection(options?: CheckConnectionOptions) {
  const client = await createConnection({
    host: options?.host,
    port: options?.port,
    user: options?.user,
    password: options?.password,
    database: options?.database,

    connectTimeout: options?.timeout || CONNECT_TIMEOUT_S,
  });

  await client.end();

  return true;
}
