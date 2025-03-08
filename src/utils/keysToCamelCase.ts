import { camelCase, isNil } from 'lodash';

interface AnyObject {
  [key: string]: any;
}

export const keysToCamelCase = (object: AnyObject): AnyObject => {
  if (!isNil(object) && typeof object !== 'object' || Array.isArray(object)) {
    throw new Error('keysToCamelCase only accepts objects');
  }
  return Object.entries(object).reduce((acc, [key, value]) => {
    acc[camelCase(key) as string] = value;
    return acc;
  }, {} as AnyObject);
};
