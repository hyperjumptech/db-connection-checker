import { Client } from 'pg';

import { CheckConnectionOptions } from './interface';

const CONNECT_TIMEOUT_S = 3_000;

export async function checkPostgresConnection(
  options?: CheckConnectionOptions
) {
  const client = new Client({
    host: options?.host,
    port: options?.port,
    user: options?.user,
    password: options?.password,
    database: options?.database,

    connectionTimeoutMillis: CONNECT_TIMEOUT_S,
  });

  await client.connect();
  await client.end();

  return true;
}
