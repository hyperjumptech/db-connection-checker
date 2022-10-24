import { Client } from 'pg';

import { CheckConnectionOptions } from './interface';
import { DEFAULT_TIMEOUT_MS } from './constant';

export async function checkPostgresConnection(
  options?: CheckConnectionOptions
) {
  const client = new Client({
    host: options?.host,
    port: options?.port,
    user: options?.user,
    password: options?.password,
    database: options?.database,

    connectionTimeoutMillis: options?.timeout || DEFAULT_TIMEOUT_MS,
  });

  await client.connect();
  await client.end();

  return true;
}
