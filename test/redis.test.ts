import * as redis from 'redis';
import {
  afterAll,
  beforeAll,
  describe,
  expect,
  it,
  MockInstance,
  vi,
} from 'vitest';

import { checkRedisConnection } from '../src/redis';

beforeAll(() => {
  vi.mock('redis', () => {
    return { createClient: vi.fn() };
  });
});

afterAll(() => {
  vi.resetAllMocks();
});

describe('redis.ts', () => {
  it('handles connection success', async () => {
    (redis.createClient as unknown as MockInstance).mockReturnValue({
      connect: () => Promise.resolve(),
      quit: () => Promise.resolve(),
    });

    const result = await checkRedisConnection();

    expect(result).to.eql(true);
  });

  it('handles connection failure', async () => {
    (redis.createClient as unknown as MockInstance).mockReturnValue({
      connect: () => Promise.reject('Example error'),
      quit: () => Promise.resolve(),
    });

    try {
      await checkRedisConnection();
    } catch (error) {
      expect(error).to.eql('Example error');
    }
  });

  it('creates connection with default options', async () => {
    (redis.createClient as unknown as MockInstance).mockReturnValue({
      connect: () => Promise.resolve(),
      quit: () => Promise.resolve(),
    });

    const result = await checkRedisConnection();

    expect(result).to.eql(true);
    expect(redis.createClient).toHaveBeenCalledWith({
      username: undefined,
      password: undefined,
      socket: {
        host: undefined,
        port: undefined,
      },
    });
  });

  it('creates connection with custom options', async () => {
    (redis.createClient as unknown as MockInstance).mockReturnValue({
      connect: () => Promise.resolve(),
      quit: () => Promise.resolve(),
    });

    const result = await checkRedisConnection({
      host: 'customhost',
      port: 12345,
      user: 'user',
      password: 'password',
    });

    expect(result).to.eql(true);
    expect(redis.createClient).toHaveBeenCalledWith({
      username: 'user',
      password: 'password',
      socket: {
        host: 'customhost',
        port: 12345,
      },
    });
  });
});
