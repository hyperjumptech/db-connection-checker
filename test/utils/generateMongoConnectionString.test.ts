import { describe, expect, it } from 'vitest';
import { generateMongoConnectionString } from '../../src/utils/generateMongoConnectionString';

describe('generateMongoConnectionString.ts', () => {
  it('returns default connection string', () => {
    const result = generateMongoConnectionString();

    expect(result).to.eql('mongodb://localhost:27017');
  });

  it('returns connection string with custom host and port', () => {
    const result = generateMongoConnectionString({
      host: 'customhost',
      port: 12345,
    });

    expect(result).to.eql('mongodb://customhost:12345');
  });

  it('returns connection string with database', () => {
    const result = generateMongoConnectionString({
      database: 'database',
    });

    expect(result).to.eql('mongodb://localhost:27017/database');
  });

  it('returns connection string with user and password', () => {
    const result = generateMongoConnectionString({
      user: 'user',
      password: 'password',
    });

    expect(result).to.eql('mongodb://user:password@localhost:27017');
  });

  it('returns connection string with user, password and database', () => {
    const result = generateMongoConnectionString({
      user: 'user',
      password: 'password',
      database: 'database',
    });

    expect(result).to.eql('mongodb://user:password@localhost:27017/database');
  });
});
