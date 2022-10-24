import { Client } from 'pg';

import { CheckConnectionOptions } from './interface';
import { CONNECT_TIMEOUT_S } from './constant';

export async function checkPostgresConnection(
  options?: CheckConnectionOptions
) {
  const client = new Client({
    host: options?.host,
    port: options?.port,
    user: options?.user,
    password: options?.password,
    database: options?.database,

    connectionTimeoutMillis: options?.timeout || CONNECT_TIMEOUT_S,
  });

  await client.connect();
  await client.end();

  return true;
}
