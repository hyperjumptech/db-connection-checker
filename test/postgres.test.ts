import * as postgres from 'pg';
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

import { checkPostgresConnection } from '../src/postgres';

beforeAll(() => {
  vi.mock('pg', () => {
    const Client = vi.fn();
    Client.prototype.connect = vi.fn();
    Client.prototype.end = vi.fn();

    return { Client };
  });
});

afterAll(() => {
  vi.resetAllMocks();
});

describe('postgres.ts', () => {
  it('handles connection success', async () => {
    const client = new postgres.Client();

    (client.connect as unknown as MockInstance).mockReturnValue({
      connect: () => Promise.resolve(),
    });

    const result = await checkPostgresConnection();

    expect(result).to.eql(true);
  });

  it('handles connection failure', async () => {
    const client = new postgres.Client();

    (client.connect as unknown as MockInstance).mockReturnValue({
      connect: () => Promise.reject('Example error'),
    });

    try {
      await checkPostgresConnection();
    } catch (error) {
      expect(error).to.eql('Example error');
    }
  });

  it('creates connection with default options', async () => {
    const client = new postgres.Client();

    (client.connect as unknown as MockInstance).mockReturnValue({
      connect: () => Promise.resolve(),
    });

    const result = await checkPostgresConnection();

    expect(result).to.eql(true);
    expect(postgres.Client).toHaveBeenCalledWith({
      host: undefined,
      port: undefined,
      user: undefined,
      password: undefined,
      connectionTimeoutMillis: CONNECT_TIMEOUT_S,
    });
  });

  it('creates connection with custom options', async () => {
    const client = new postgres.Client();

    (client.connect as unknown as MockInstance).mockReturnValue({
      connect: () => Promise.resolve(),
    });

    const result = await checkPostgresConnection({
      host: 'customhost',
      port: 12345,
      user: 'user',
      password: 'password',
      timeout: 5_000,
    });

    expect(result).to.eql(true);
    expect(postgres.Client).toHaveBeenCalledWith({
      host: 'customhost',
      port: 12345,
      user: 'user',
      password: 'password',
      connectionTimeoutMillis: 5_000,
    });
  });
});
