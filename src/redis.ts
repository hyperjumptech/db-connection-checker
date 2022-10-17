import { createClient } from 'redis';

import { CheckConnectionOptions } from './interface';

export async function checkRedisConnection(options?: CheckConnectionOptions) {
  const client = createClient({
    socket: {
      host: options?.host,
      port: options?.port,
    },
    username: options?.user,
    password: options?.password,
  });

  await client.connect();
  await client.quit();

  return true;
}
