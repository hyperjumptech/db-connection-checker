import type { CheckConnectionOptions } from '../interface';

export function generateMongoConnectionString(
  options?: CheckConnectionOptions
) {
  const host = options?.host || 'localhost';
  const port = options?.port || 27017;
  const user = options?.user;
  const password = options?.password;
  const database = options?.database ? `/${options?.database}` : '';

  if (user && password) {
    return `mongodb://${user}:${password}@${host}:${port}${database}`;
  }

  return `mongodb://${host}:${port}${database}`;
}
