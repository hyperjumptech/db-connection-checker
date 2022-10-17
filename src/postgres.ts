import { Client } from 'pg';

import { CheckConnectionOptions } from './interface';

export async function checkPostgresConnection(
  options?: CheckConnectionOptions
) {
  const client = new Client({
    host: options?.host,
    port: options?.port,
    user: options?.user,
    password: options?.password,
    database: options?.database,
  });

  await client.connect();
  await client.end();

  return true;
}
