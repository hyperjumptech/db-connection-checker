# @hyperjumptech/db-connection-checker

A Node.js library for checking database connection

## Installation

```bash
npm i @hyperjumptech/db-connection-checker
```

## Database Supports

1. [MariaDB](#mariadb)
2. [MongoDB](#mongodb)
3. [Postgres](#postgres)
4. [Redis](#redis)

## API

### CheckConnectionOptions

```ts
type CheckConnectionOptions = {
  host?: string;
  port?: number;
  user?: string;
  password?: string;
  database?: string;
};
```

---

### MariaDB

**`checkMariaDBConnection(options?: CheckConnectionOptions): Promise<boolean>`**

Checks MariaDB connection.

```ts
import { checkMariaDBConnnection } from '@hyperjumptech/db-connection-checker';

const isConnected = await checkMariaDBConnnection();
```

---

### MongoDB

**`checkMongoDBConnection(options?: CheckConnectionOptions): Promise<boolean>`**

Checks MongoDB connection.

```ts
import { checkMongoDBConnection } from '@hyperjumptech/db-connection-checker';

const isConnected = await checkMongoDBConnection();
```

---

### Postgres

**`checkPostgresConnection(options?: CheckConnectionOptions): Promise<boolean>`**

Checks Postgres connection.

```ts
import { checkPostgresConnection } from '@hyperjumptech/db-connection-checker';

const isConnected = await checkPostgresConnection();
```

---

### Redis

**`checkRedisConnection(options?: CheckConnectionOptions): Promise<boolean>`**

Checks Redis connection.

```ts
import { checkRedisConnection } from '@hyperjumptech/db-connection-checker';

const isConnected = await checkRedisConnection();
```

## Acknowledgments

1. [mariadb-connector-nodejs](https://github.com/mariadb-corporation/mariadb-connector-nodejs)
2. [node-mongodb-native](https://github.com/mongodb/node-mongodb-native)
3. [node-postgres](https://github.com/brianc/node-postgres)
4. [node-redis](https://github.com/redis/node-redis)

## License

```txt
MIT License

Copyright (c) 2022 Hyperjump Technology

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
