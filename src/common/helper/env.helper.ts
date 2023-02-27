import { existsSync } from 'fs';
import { resolve } from 'path';

export function getEnvPath(dest: string): string {
  const fallback: string = resolve(`${dest}/.env`);

  let fileName = '';
  switch (process.env.ENV) {
    case 'dev': {
      fileName = 'development.env';
      break;
    }

    case 'staging': {
      fileName = 'staging.env';
      break;
    }

    case 'prod': {
      fileName = 'production.env';
      break;
    }

    case undefined: {
      fileName = 'development.env';
    }
  }
  let filePath: string = resolve(`${dest}/${fileName}`);

  if (!existsSync(filePath)) {
    filePath = fallback;
  }

  return filePath;
}
