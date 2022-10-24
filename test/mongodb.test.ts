import * as mongodb from 'mongodb';
import {
  afterAll,
  beforeAll,
  describe,
  expect,
  it,
  MockInstance,
  vi,
} from 'vitest';
import { DEFAULT_TIMEOUT_MS } from '../src/constant';

import { checkMongoDBConnection } from '../src/mongodb';

beforeAll(() => {
  vi.mock('mongodb', () => {
    const MongoClient = vi.fn();
    MongoClient.prototype.connect = vi.fn();
    MongoClient.prototype.close = vi.fn();

    return { MongoClient };
  });
});

afterAll(() => {
  vi.resetAllMocks();
});

describe('mongodb.ts', () => {
  it('handles connection success', async () => {
    const client = new mongodb.MongoClient('');

    (client.connect as unknown as MockInstance).mockReturnValue({
      connect: () => Promise.resolve(),
    });

    const result = await checkMongoDBConnection();

    expect(result).to.eql(true);
  });

  it('handles connection failure', async () => {
    const client = new mongodb.MongoClient('');

    (client.connect as unknown as MockInstance).mockReturnValue({
      connect: () => Promise.reject('Example error'),
    });

    try {
      await checkMongoDBConnection();
    } catch (error) {
      expect(error).to.eql('Example error');
    }
  });
});
