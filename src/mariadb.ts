import { createConnection } from 'mariadb';

import { CheckConnectionOptions } from './interface';
import { DEFAULT_TIMEOUT_MS } from './constant';

export async function checkMariaDBConnection(options?: CheckConnectionOptions) {
  let params : Object = {};
  if (options){
    for ( const [key, value] of Object.entries(options) ) {
      if (key==="timeout"){
        params = {
          connectionTimeout: value || DEFAULT_TIMEOUT_MS,
          ...params
        }
      } else if(key==="others") {
        for ( const [k, v] of Object.entries(value) ) {
          params = {
            k: v,
            ...params
          }
        }
      } else {
        params = {
          key: value,
          ...params
        }
      }
    }
  }
  
  const client = await createConnection(params);

  await client.end();

  return true;
}
