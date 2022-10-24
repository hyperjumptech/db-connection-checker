import { createClient } from 'redis';

import { CheckConnectionOptions } from './interface';
import { CONNECT_TIMEOUT_S } from './constant';

export async function checkRedisConnection(options?: CheckConnectionOptions) {
  const client = createClient({
    socket: {
      host: options?.host,
      port: options?.port,
      connectTimeout: options?.timeout || CONNECT_TIMEOUT_S,
    },
    username: options?.user,
    password: options?.password,
  });

  await client.connect();
  await client.quit();

  return true;
}
