import * as mariadb from 'mariadb';
import { CONNECT_TIMEOUT_S } from '../src/constant';
import {
  afterAll,
  beforeAll,
  describe,
  expect,
  it,
  MockInstance,
  vi,
} from 'vitest';

import { checkMariaDBConnection } from '../src/mariadb';

beforeAll(() => {
  vi.mock('mariadb', () => {
    return { createConnection: vi.fn() };
  });
});

afterAll(() => {
  vi.resetAllMocks();
});

describe('mariadb.ts', () => {
  it('handles connection success', async () => {
    (mariadb.createConnection as unknown as MockInstance).mockResolvedValue({
      end: () => Promise.resolve(),
    });

    const result = await checkMariaDBConnection();

    expect(result).to.eql(true);
  });

  it('handles connection failure', async () => {
    (mariadb.createConnection as unknown as MockInstance).mockRejectedValue(
      'Example error'
    );

    try {
      await checkMariaDBConnection();
    } catch (error) {
      expect(error).to.eql('Example error');
    }
  });

  it('creates connection with default options', async () => {
    (mariadb.createConnection as unknown as MockInstance).mockResolvedValue({
      end: () => Promise.resolve(),
    });

    const result = await checkMariaDBConnection();

    expect(result).to.eql(true);
    expect(mariadb.createConnection).toHaveBeenCalledWith({
      host: undefined,
      port: undefined,
      username: undefined,
      password: undefined,
      database: undefined,
      connectTimeout: CONNECT_TIMEOUT_S,
    });
  });

  it('creates connection with custom options', async () => {
    (mariadb.createConnection as unknown as MockInstance).mockResolvedValue({
      end: () => Promise.resolve(),
    });

    const result = await checkMariaDBConnection({
      host: 'customhost',
      port: 12345,
      user: 'user',
      password: 'password',
      database: 'database',
      timeout: 5_000,
    });

    expect(result).to.eql(true);
    expect(mariadb.createConnection).toHaveBeenCalledWith({
      host: 'customhost',
      port: 12345,
      user: 'user',
      password: 'password',
      database: 'database',
      connectTimeout: 5_000,
    });
  });
});
