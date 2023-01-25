export type CheckConnectionOptions = {
  host?: string;
  port?: number;
  user?: string;
  password?: string;
  database?: string;
  timeout?: number;

  others?: any[string];
};
