import { createClient } from 'redis';

import { CheckConnectionOptions } from './interface';

const CONNECT_TIMEOUT_S = 3_000;

export async function checkRedisConnection(options?: CheckConnectionOptions) {
  const client = createClient({
    socket: {
      host: options?.host,
      port: options?.port,
      connectTimeout: CONNECT_TIMEOUT_S,
    },
    username: options?.user,
    password: options?.password,
  });

  await client.connect();
  await client.quit();

  return true;
}
