import ld from 'lodash';

export type Formats = 'camelCase' | 'snakeCase';

export const changeKeys = (object: Record<string, unknown>, format: Formats, shallow: boolean = true) => {
  return Object.entries(object).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [ld[format](key)]: value,
    }),
    {},
  );
};
