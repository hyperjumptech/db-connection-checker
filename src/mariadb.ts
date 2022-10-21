import { createConnection } from 'mariadb';

import { CheckConnectionOptions } from './interface';

const CONNECT_TIMEOUT_S = 3_000;

export async function checkMariaDBConnection(options?: CheckConnectionOptions) {
  const client = await createConnection({
    host: options?.host,
    port: options?.port,
    user: options?.user,
    password: options?.password,
    database: options?.database,

    connectTimeout: CONNECT_TIMEOUT_S,
  });

  await client.end();

  return true;
}
