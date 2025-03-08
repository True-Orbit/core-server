import { snakeCase, isNil } from 'lodash';

interface AnyObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const keysToSnakeCase = (object: AnyObject): AnyObject => {
  if ((!isNil(object) && typeof object !== 'object') || Array.isArray(object)) {
    throw new Error('keysToSnakeCase only accepts objects');
  }
  return Object.entries(object).reduce((acc, [key, value]) => {
    acc[snakeCase(key) as string] = value;
    return acc;
  }, {} as AnyObject);
};
