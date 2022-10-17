import { createConnection } from 'mariadb';

import { CheckConnectionOptions } from './interface';

export async function checkMariaDBConnection(options?: CheckConnectionOptions) {
  const client = await createConnection({
    host: options?.host,
    port: options?.port,
    user: options?.user,
    password: options?.password,
    database: options?.database,
  });

  await client.end();

  return true;
}
