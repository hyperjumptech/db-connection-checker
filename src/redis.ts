import { createClient } from 'redis';

import { CheckConnectionOptions } from './interface';
import { DEFAULT_TIMEOUT_MS } from './constant';

export async function checkRedisConnection(options?: CheckConnectionOptions) {
  const client = createClient({
    socket: {
      host: options?.host,
      port: options?.port,
      connectTimeout: options?.timeout || DEFAULT_TIMEOUT_MS,
    },
    username: options?.user,
    password: options?.password,
  });

  await client.connect();
  await client.quit();

  return true;
}
